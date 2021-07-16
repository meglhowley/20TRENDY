from models.db import db
from datetime import datetime
from sqlalchemy.sql import table, column


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password_digest = db.Column(db.String(255), nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(
    ), nullable=False, onupdate=datetime.utcnow)
    trends = db.relationship("Trend", cascade='all',
                             backref=db.backref('trends', lazy=True))
    posts = db.relationship("Post", cascade='all', backref=db.backref('posts', lazy=True))
    likes = db.relationship("Like", cascade='all', backref=db.backref('likes', lazy=True))

    def __init__(self, first_name, last_name, email, password_digest):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password_digest = password_digest

    def json(self):
        return {"id": self.id, "first_name": self.first_name, "last_name": self.last_name, "email": self.email, "password_digest": self.password_digest, "created_at": str(self.created_at), "updated_at": str(self.updated_at)}

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self.json()

    @classmethod
    def find_one(cls, email):
        user = User.query.filter_by(email=email).first()
        return user
