from flask_restful import Resource
from flask import request
from models.user import User
from middleware import create_token, gen_password, strip_token, read_token, compare_password
from sqlalchemy.orm import joinedload

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.find_one(data['email'])
        if user and compare_password(data['password'], user.password_digest):
            payload = {
                "id": user.id,
                "email": user.email
            }
            token = create_token(payload)
            return {'user': payload, 'token': token}, 200
        return {'msg': 'Unauthorized'}, 401

    def get(self):
        token = strip_token(request)
        if token:
            try:
                payload = read_token(token)
                return payload
            except:
                return {"msg": "Unauthorized"}, 401
        return {"msg": "Please sign in"}, 401


class Register(Resource):
    def post(self):
        try:
            data = request.get_json()
            params = {
                "first_name": data['first_name'],
                "last_name": data['last_name'],
                "email": data['email'],
                "password_digest": gen_password(data['password'])
                }
            user = User(**params)
            user.create()
            return user.json(), 201
        except:
            return {"msg": "That email is already in use."}, 401

class UserLikes(Resource):
    def get(self, user_id):
        user = User.query.options(joinedload('likes')).filter_by(id=user_id).first()
        likes = [l.json() for l in user.likes]
        return {**user.json(), "likes": likes}, 200

