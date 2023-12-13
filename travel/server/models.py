from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_`%(constraint_name)s`",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s"
      })

db = SQLAlchemy(metadata=metadata)


class Follower(db.Model, SerializerMixin):
    __tablename__ = "follows"
    id = db.Column(db.Integer, primary_key=True)
    following_user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    followed_user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    follower = db.relationship("User", back_populates="follows", foreign_keys=[following_user_id])
    following = db.relationship("User", back_populates="followed_by", foreign_keys=[followed_user_id])

    serialize_rules = ("-follower.follows", "-following.followed_by", )

    def __repr__(self):
        return f'<Follower {self.id}>'
    
class User(db.Model, SerializerMixin):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    group_leader = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user_groups = db.relationship("UserGroup", back_populates="users")
    follows = db.relationship("Follower", back_populates="follower", foreign_keys="Follower.following_user_id", cascade="all, delete-orphan")
    followed_by = db.relationship("Follower", back_populates="following", foreign_keys="Follower.followed_user_id", cascade="all, delete-orphan")

    serialize_rules = ('-user_groups.users', "-follows.follower", "-followed_by.following", )

    @validates("first_name", "last_name")
    def validate_names(self, key, value):
        if not value:
            raise ValueError("You are missing a first or last name")
        return value

    def __repr__(self):
        return f'<User {self.id}>'
    
class UserGroup(db.Model, SerializerMixin):
    __tablename__ = "user_group"
    id = db.Column(db.Integer, primary_key=True)
    user_group_number = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
    group_id = db.Column(db.Integer, db.ForeignKey("group.id"), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    users = db.relationship("User", back_populates="user_groups")
    groups = db.relationship("Group", back_populates="user_groups")

    serialize_rules = ('-users.user_groups', "-groups.user_groups")

    def __repr__(self):
        return f'<UserGroup {self.id}>'
    
class Group(db.Model, SerializerMixin):
    __tablename__ = "group"
    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String)
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user_groups = db.relationship("UserGroup", back_populates="groups", cascade="all, delete-orphan")
    posts = db.relationship("Post", back_populates="group_post", cascade="all, delete-orphan")

    serialize_rules = ('-posts.group_post', "-user_groups.groups",)

    def __repr__(self):
        return f'<Group {self.id}>'
    
class Post(db.Model, SerializerMixin):
    __tablename__ = "post"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    body = db.Column(db.String)
    liker = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    group_post = db.relationship("Group", back_populates="posts")

    serialize_rules = ('-group_post.posts',)

    def __repr__(self):
        return f'<Post {self.id}>'