from flask import request
from flask_restful import Resource
from models.post import Post
from models.db import db
from sqlalchemy.orm import joinedload

# from sqlalchemy.orm import joinedload

class Posts(Resource):
    def get(self):
        posts = Post.find_all()
        posts_with_likes= []
        for p in posts:
            post= Post.query.options(joinedload('likes')).filter_by(id=p.id).first()
            likes= [l.json() for l in post.likes]
            posts_with_likes.append({**post.json(), "likes": likes})
        return posts_with_likes

    def post(self):
      data = request.get_json()
      post = Post(**data)
      post.create()
      return post.json(), 201

class PostDetail(Resource):
    def get(self, post_id):
        post = Post.query.options(joinedload('likes')).filter_by(id=post_id).first()
        likes = [l.json() for l in post.likes]
        return {**post.json(), "likes": likes}, 200

    def put(self, post_id):
        data = request.get_json()
        print(data)
        post = Post.find_by_id(post_id)
        if not post:
            return {"msg": "post not found"}, 404
        for k in data.keys():
            setattr(post, k, data[k])
        db.session.commit()
        return post.json(), 200

    def delete(self, post_id):
        post = Post.find_by_id(post_id)
        if not post:
            return {"msg": "post not found"}, 404
        db.session.delete(post)
        db.session.commit()
        return {"msg": "post Deleted", "payload": post_id}
