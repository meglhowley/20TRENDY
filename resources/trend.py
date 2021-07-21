from models.trend import Trend
from flask import request
from flask_restful import Resource
from models.trend import Trend
from models.db import db
from pytrends.request import TrendReq

pytrends = TrendReq(hl='en-US')


def check_trends(keywords, time_frame):
    pytrends.build_payload(keywords, cat='0',
                           timeframe=time_frame, geo='', gprop='')
    data = pytrends.interest_over_time()
    return data

def related_queries(keywords, time_frame):
    pytrends.build_payload(keywords, cat='0',
                           timeframe=time_frame, geo='', gprop='')
    data = pytrends.related_queries()
    kw1_arr= data[keywords[0]]['top']['query'].tolist()[:5]
    kw2_arr= data[keywords[1]]['top']['query'].tolist()[:5]
    strkw1_arr= [str(x) for x in kw1_arr]
    hyphons_kw1=[x.replace(' ', '-') for x in strkw1_arr]
    strkw2_arr= [str(x) for x in kw2_arr]
    hyphons_kw2=[x.replace(' ', '-') for x in strkw2_arr]
    queries_arr= hyphons_kw1+ hyphons_kw2
    queries_str=' '.join(queries_arr)
    return(queries_str)


class Trends(Resource):
    def get(self):
        trends = Trend.find_all()
        return [t.json() for t in trends], 200

    def post(self):
        try:
            data = request.get_json()
            trend = Trend(**data)
            trend.create()
            return trend.json(), 201
        except:
            return {"msg": "Oops! There is no data on one or more of your words."}, 401


class TrendDetail(Resource):
    def put(self, trend_id):
        data = request.get_json()
        trend = Trend.find_by_id(trend_id)
        if not trend:
            return {"msg": "Trend not found"}, 404
        setattr(trend, "key_word_1", data["key_word_1"])
        setattr(trend, "key_word_2", data["key_word_2"])
        result= check_trends([data["key_word_1"], data["key_word_2"]], data["time_frame"])
        queries= related_queries([data["key_word_1"], data["key_word_2"]], data["time_frame"])
        setattr(trend, "related", queries)
        arr_kw_1 = result[data["key_word_1"]].tolist()
        arr_kw_2 = result[data["key_word_2"]].tolist()
        arr_strings_kw_1 = [str(x) for x in arr_kw_1]
        arr_strings_kw_2 = [str(x) for x in arr_kw_2]
        setattr(trend, "trend_kw_1", " ".join(arr_strings_kw_1))
        setattr(trend, "trend_kw_2", " ".join(arr_strings_kw_2))
        mean_kw_1 = int(result[data["key_word_1"]].mean())
        mean_kw_2 = int(result[data["key_word_2"]].mean())
        if mean_kw_1 > mean_kw_2:
            setattr(trend, "winner", data["key_word_1"])
        else:
            setattr(trend, "winner", data["key_word_2"])
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
