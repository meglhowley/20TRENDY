from flask_seeder import Seeder, Faker, generator
from models import trend


data = [
    {
        "user_id": "1",
        "time_frame": "2020-01-01 2020-01-31",
        "key_word_1": "test",
        "key_word_2": "dogs"
    }, {
        "user_id": "1",
        "time_frame": "2020-01-01 2020-01-31",
        "key_word_1": "test",
        "key_word_2": "resolutions"
    }
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
