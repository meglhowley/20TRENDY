from flask_seeder import Seeder, Faker, generator
from models import trend


data = [
    {
        "user_id": None,
        "time_frame": "2020-01-01 2020-01-31",
        "key_word_1": "coronavirus",
        "key_word_2": "kobe bryant"
    }, 
{  
    "user_id": None,
    "time_frame": "2020-04-01 2020-04-30",
    "key_word_1": "carole baskin",
    "key_word_2": "joe exotic"
},
{  
    "user_id": None,
    "time_frame": "2020-06-01 2020-06-30",
    "key_word_1": "protests near me",
    "key_word_2": "where to donate"
},
{  
    "user_id": None,
    "time_frame": "2020-11-01 2020-11-30",
    "key_word_1": "vote by mail",
    "key_word_2": "voter fraud"
},
]


class InitialSeed(Seeder):

    def run(self):
        for dict in data:
            entries = Faker(
                cls=trend.Trend,
                init=dict
            )
            for x in entries.create():
                self.db.session.add(x)
