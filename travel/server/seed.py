# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import *

fake = Faker()

def seed_users():
    users = []
    for _ in range(5):
        u = User(
            first_name = fake.first_name(),
            last_name = fake.last_name(),
            group_leader = fake.boolean(chance_of_getting_true=25)
        )
        users.append(u)
    return users

def seed_group():
    groups = []
    for _ in range(5):
        g = Group(
            group_name = fake.company()
        )
        groups.append(g)
    return groups

def seed_posts():
    posts = []
    for _ in range(5):
        p = Post(
            title = fake.street_name(),
            body = fake.address(),
            liker = fake.random_digit()
        )
        posts.append(p)
    return posts

def seed_user_groups():
    user_group = []
    ug = UserGroup(
        user_id = 6,
        group_id = 4
    )
    user_group.append(ug)
    return user_group


if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        try:
            User.query.delete()
        except:
            print("No User")
        try:
            Group.query.delete()
        except:
            print("No Group")
        try:
            Post.query.delete()
        except:
            print("No Post")
        try:
            UserGroup.query.delete()
        except:
            print("No UserGroup")

        print("Seeding the users..")
        the_users = seed_users()
        db.session.add_all(the_users)
        db.session.commit()

        print("Seeding the groups...")
        the_groups = seed_group()
        db.session.add_all(the_groups)
        db.session.commit()

        print("Seeding the user groups...")
        the_user_groups = seed_user_groups()
        db.session.add_all(the_user_groups)
        db.session.commit()

        print("Seeding the posts...")
        the_post = seed_posts()
        db.session.add_all(the_post)
        db.session.commit()
        print("Done seeding!")