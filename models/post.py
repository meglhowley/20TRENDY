from models.db import db
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title= db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    bio = db.Column(db.String, nullable=True)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(
    ), nullable=False, onupdate=datetime.utcnow)
    user = db.relationship("User", backref=db.backref('users', lazy=True))
    likes = db.relationship("Like", cascade='all', backref=db.backref('likes2', lazy=True))

    def __init__(self, user_id, title, image, bio):
        self.user_id= user_id
        self.title= title
        self.image = image
        self.bio= bio

    def json(self):
        return {"id": self.id, "user_id": self.user_id, "title": self.title, "image": self.image, "bio": self.bio, "created_at": str(self.created_at), "updated_at": str(self.updated_at)}

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self.json()

    @classmethod
    def find_all(cls):
        posts = Post.query.all()
        return posts

    @classmethod
    def find_by_id(cls, post_id):
        post = Post.query.filter_by(id=post_id).first()
        return post
