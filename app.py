from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_migrate import Migrate
from flask_seeder import FlaskSeeder
from resources import trend, auth, post, like
from models.db import db
from alembic import op
from datetime import datetime
import os
from flask import render_template, request, redirect, url_for
from werkzeug.utils import secure_filename
from werkzeug.datastructures import  FileStorage

app = Flask(__name__)
CORS(app)
api = Api(app)

# Init db and migrate here
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://localhost:5432/trending_db"
app.config['SQLALCHEMY_ECHO'] = True

# Init db and migrate here
db.init_app(app)
seeder = FlaskSeeder()
seeder.init_app(app, db)
migrate = Migrate(app, db)

# Leave resources
api.add_resource(trend.Trends, '/trends')
api.add_resource(trend.TrendDetail, '/trends/<int:trend_id>')
api.add_resource(trend.TrendsByDate, '/trends/date/<string:time_frame_id>')
api.add_resource(auth.Login, '/auth/login')
api.add_resource(auth.Register, '/auth/register')
api.add_resource(auth.UserLikes, '/user/likes/<int:user_id>')
api.add_resource(post.Posts, '/posts')
api.add_resource(post.PostDetail, '/posts/<int:post_id>')
api.add_resource(like.Likes, '/likes')
api.add_resource(like.LikeDetail, '/likes/<int:like_id>')

# @app.route('/upload', methods=['GET', 'POST'])
# def upload():
#     if request.method == 'POST':
#         # save the single "profile" file
#         file = request.files['image']
#         newFile= Image(name=file.filename, data=file.read())
#         db.session.add(newFile)
#         db.session.commit()
#         return ('Saved to the database!')
#     images= Image.find_all()
#     for x in images:
#         print(x.name)
#         print(x.data)
#     return('hi')
#     # images.get_data()
#     # return images

if __name__ == '__main__':
    app.run(debug=True)
