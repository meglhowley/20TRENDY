from models.db import db
from datetime import datetime
from pytrends.request import TrendReq

pytrends = TrendReq(hl='en-US')


def check_trends(keywords, time_frame):
    pytrends.build_payload(keywords, cat='0',
                           timeframe=time_frame, geo='', gprop='')
    data = pytrends.interest_over_time()
    return data


class Trend(db.Model):
    __tablename__ = 'trends'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    time_frame = db.Column(db.String, nullable=False)
    key_word_1 = db.Column(db.String, nullable=False)
    key_word_2 = db.Column(db.String, nullable=False)
    trend_kw_1 = db.Column(db.String, nullable=False)
    trend_kw_2 = db.Column(db.String, nullable=False)
    winner = db.Column(db.String, nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(
    ), nullable=False, onupdate=datetime.utcnow)
    user = db.relationship("User", backref=db.backref('users', lazy=True))

    def __init__(self, user_id, time_frame, key_word_1, key_word_2):
        self.user_id = user_id
        self.time_frame = time_frame
        self.key_word_1 = key_word_1
        self.key_word_2 = key_word_2
        data = check_trends([key_word_1, key_word_2], time_frame)
        arr_kw_1 = data[key_word_1].tolist()
        arr_kw_2 = data[key_word_2].tolist()
        arr_strings_kw_1 = [str(x) for x in arr_kw_1]
        arr_strings_kw_2 = [str(x) for x in arr_kw_2]
        self.trend_kw_1 = " ".join(arr_strings_kw_1)
        self.trend_kw_2 = " ".join(arr_strings_kw_2)
        mean_kw_1 = int(data[key_word_1].mean())
        mean_kw_2 = int(data[key_word_2].mean())
        if mean_kw_1 > mean_kw_2:
            self.winner = key_word_1
        else:
            self.winner = key_word_2

    def json(self):
        return {"id": self.id, "user_id": self.user_id, "time_frame": self.time_frame, "key_word_1": self.key_word_1, "key_word_2": self.key_word_2, "trend_kw_1": self.trend_kw_1, "trend_kw_2": self.trend_kw_2, "winner": self.winner, "created_at": str(self.created_at), "updated_at": str(self.updated_at)}

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self.json()

    @classmethod
    def find_all(cls):
        trends = Trend.query.all()
        return trends

    @classmethod
    def find_by_id(cls, trend_id):
        trend = Trend.query.filter_by(id=trend_id).first()
        return trend

    @classmethod
    def find_by_date(cls, time_frame_id):
        trend = Trend.query.filter_by(time_frame=time_frame_id).all()
        return trend

    @classmethod
    def find_by_user_id(cls, id):
        trend = Trend.query.filter_by(user_id=id).first()
        return trend
