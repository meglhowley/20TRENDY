from models.trend import Trend
from flask import request
from flask_restful import Resource
from models.trend import Trend
from models.db import db


class Trends(Resource):
    def get(self):
        trends = Trend.find_all()
        return [t.json() for t in trends], 200

    def post(self):
        data = request.get_json()
        trend = Trend(**data)
        trend.create()
        return trend.json(), 201


class TrendDetail(Resource):
    def put(self, trend_id):
        data = request.get_json()
        trend = Trend.find_by_id(trend_id)
        if not trend:
            return {"msg": "Trend not found"}, 404
        for k in data.keys():
            setattr(trend, k, data[k])
        db.session.commit()
        return trend.json(), 200

    def delete(self, trend_id):
        trend = Trend.find_by_id(trend_id)
        if not trend:
            return {"msg": "Trend not found"}, 404
        db.session.delete(trend)
        db.session.commit()
        return {"msg": "Trend Deleted", "payload": trend_id}


class TrendsByDate(Resource):
    def get(self, time_frame_id):
        trends = Trend.find_by_date(time_frame_id)
        return [t.json() for t in trends], 200


class GetTrendsByUserId(Resource):
    def get(self, user_id):
        trend = Trend.find_by_user_id(user_id)
        return trend.json()
