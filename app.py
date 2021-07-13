from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_migrate import Migrate
from resources import trend, auth
from models.db import db

app = Flask(__name__)
CORS(app)
api = Api(app)

# Init db and migrate here
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://localhost:5432/20TRENDY_db"
app.config['SQLALCHEMY_ECHO'] = True

# Init db and migrate here
db.init_app(app)
migrate = Migrate(app, db)

# Leave resources
api.add_resource(trend.Trends, '/trends')
api.add_resource(trend.TrendDetail, '/trends/<int:trend_id>')
api.add_resource(auth.Login, '/auth/login')
api.add_resource(auth.Register, '/auth/register')

if __name__ == '__main__':
    app.run(debug=True)
