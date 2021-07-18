from flask import request
from flask_restful import Resource
from models.like import Like
from models.db import db


class Likes(Resource):
    def get(self):
        likes = Like.find_all()
        return [p.json() for p in likes], 200

    def post(self):
      data = request.get_json()
      like = Like(**data)
      like.create()
      return like.json(), 201

class LikeDetail(Resource):
    def get(self, like_id):
        like = Like.find_by_id(like_id)
        return {**like.json()}, 200

    def delete(self, like_id):
        like = Like.find_by_id(like_id)
        if not like:
            return {"msg": "like not found"}, 404
        db.session.delete(like)
        db.session.commit()
        return {"msg": "like Deleted", "payload": like_id}