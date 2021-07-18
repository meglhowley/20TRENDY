from models.db import db
from datetime import datetime


class Like(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(
    ), nullable=False, onupdate=datetime.utcnow)
    user = db.relationship("User", backref=db.backref('users2', lazy=True))
    post = db.relationship("Post", backref=db.backref('posts2', lazy=True))

    def __init__(self, user_id, post_id):
        self.user_id= user_id
        self.post_id= post_id

    def json(self):
        return {"id": self.id, "user_id": self.user_id, "post_id": self.post_id, "created_at": str(self.created_at), "updated_at": str(self.updated_at)}

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self.json()
 
    @classmethod
    def find_all(cls):
        likes = Like.query.all()
        return likes

    @classmethod
    def find_by_id(cls, like_id):
        like = Like.query.filter_by(id=like_id).first()
        return like
