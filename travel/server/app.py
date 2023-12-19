# Remote library imports
from flask import Flask, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData


# Local imports
from models import *

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)

class Users(Resource):
    def get(self):
        user_list = [users.to_dict(rules =("-followed_by", "-follows", "-user_groups", "-created_at",)) for users in User.query.all()]
        return user_list, 200
    
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(first_name = data["first_name"]).first()
        if not user:
            try:
                new_user = User(
                    first_name = data["first_name"],
                    last_name = data["last_name"]
                )
                db.session.add(new_user)
                db.session.commit()

                return new_user.to_dict(), 201
            
            except ValueError as e:
                print(e.__str__())
                return {"errors": ["validation errors"]}, 400
        return user.to_dict(), 201

api.add_resource(Users, "/users")

class UsersById(Resource):
    def get(self, id):
        users = User.query.filter_by(id = id).first()
        if not users:
            return {"error": "User not found"}, 404
        return users.to_dict(), 200
    
    def patch(self, id):
        users = User.query.filter_by(id = id).first()
        if not users:
            return {"error": "User not found"}, 404

        try:
            data = request.get_json()
            for key in data:
                setattr(users, key, data[key])
            db.session.commit()
            return users.to_dict(), 202
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400
        
api.add_resource(UsersById, "/users/<int:id>")

class UserGroups(Resource):
    def get(self):
        user_group_list = [user_group.to_dict() for user_group in UserGroup.query.all()]
        return user_group_list, 200
    
    def post(self):
        data = request.get_json()
        try:
            new_user_group = UserGroup(
                user_group_number = data["user_group_number"],
            )
            db.session.add(new_user_group)
            db.session.commit()
            return new_user_group.to_dict(), 201
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400
    
api.add_resource(UserGroups, "/usergroups")

class UserGroupsById(Resource):
    def get(self, id):
        user_group = UserGroup.query.filter_by(id = id).first()
        if not user_group:
            return {"error": "User Group not found"}, 404
        return user_group.to_dict(), 200
    
    def patch(self, id):
        user_group = UserGroup.query.filter_by(id = id).first()
        if not user_group:
            return {"error": "User Group not found"}, 404

        try:
            data = request.get_json()
            for key in data:
                setattr(user_group, key, data[key])
            db.session.commit()
            return user_group.to_dict(), 202
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400
    
api.add_resource(UserGroupsById, "/usergroups/<int:id>")

class Groups(Resource):
    def get(self):
        group_list = [groups.to_dict(rules =("-user_groups", "-created_at",)) for groups in Group.query.all()]
        return group_list, 200
    
    def post(self):
        data = request.get_json()
        try:
            new_group = Group(
                group_name = data["group_name"],
            )
            db.session.add(new_group)
            db.session.commit()

            return new_group.to_dict(), 201
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400
        
api.add_resource(Groups, "/groups")

class GroupsById(Resource):
    def get(self, id):
        group = Group.query.filter_by(id = id).first()
        if not group:
            return {"error": "Group not found"}, 404
        return group.to_dict(), 200
    
    def patch(self, id):
        group = Group.query.filter_by(id = id).first()
        if not group:
            return {"error": "Group not found"}, 404

        try:
            data = request.get_json()
            for key in data:
                setattr(group, key, data[key])
            db.session.commit()
            return group.to_dict(), 202
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400
        
    def delete(self, id):
        group = Group.query.filter_by(id = id).first()
        if not group:
            return {"error": "Group not found"}, 404
        db.session.delete(group)
        db.session.commit()

        return "", 204
        
api.add_resource(GroupsById, "/groups/<int:id>")

class Posts(Resource):
    def get(self):
        post_list = [posts.to_dict(rules = ("-group_post",)) for posts in Post.query.all()]
        return post_list, 200
    
    def post(self):
        data = request.get_json()
        try:
            new_post = Post(
                title = data["title"],
                body = data["body"],
                liker = data["liker"],
            )
            db.session.add(new_post)
            db.session.commit()

            return new_post.to_dict(rules = ("-group_post",)), 201
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400
        
api.add_resource(Posts, "/posts")

class PostsById(Resource):
    def get(self, id):
        posts = Post.query.filter_by(id = id).first()
        if not posts:
            return {"error": "Post not found"}, 404
        return posts.to_dict(rules = ("-group_post",)), 200
    
    def patch(self, id):
        posts = Post.query.filter_by(id = id).first()
        if not posts:
            return {"error": "Post not found"}, 404

        try:
            data = request.get_json()
            for key in data:
                setattr(posts, key, data[key])
            db.session.commit()
            return posts.to_dict(rules = ("-group_post",)), 202
        
        except ValueError as e:
            print(e.__str__())
            return {"errors": ["validation errors"]}, 400
        
    def delete(self, id):
        posts = Post.query.filter_by(id = id).first()
        if not posts:
            return {"error": "Post not found"}, 404
        db.session.delete(posts)
        db.session.commit()

        return "", 204
        
api.add_resource(PostsById, "/posts/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)