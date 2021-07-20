from flask_seeder import Seeder, Faker, generator
from models import trend
from models import post


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

data2= [
{
    "user_id": None,
    "title": "What is essential?",
    "image": "https://static01.nyt.com/images/2020/05/24/arts/24museum-covidittem9/merlin_172435299_47ec9fd1-ccb6-43ef-ba57-ee39491693cb-superJumbo.jpg?quality=90&auto=webp",
    "bio": "What Is Essential” by Russ Rowland, taken in NYC",
    }, 
{  
    "user_id": None,
    "title": "P.P.E",
    "image": "https://static01.nyt.com/images/2020/05/24/arts/24museum-covidittem3/merlin_172514514_6bec3319-9576-4b30-bf1b-78a934e44bc3-superJumbo.jpg?quality=90&auto=webp",
    "bio": "Brighid Pulskamp at her sewing machine, where she creates her Navajo-inspired P.P.E. masks to distribute on the reservation. Some will be in the Autry Museum collection",
},
{  
    "user_id": None,
    "title": "Dancing Through Chaos",
    "image": "https://assets.weforum.org/editor/responsive_large_webp_b73XtT5wLaYHhEWmPnC_jOvEn7FzWNEdHjATB3ZcNPQ.webp",
    "bio": "Streets and famous landmarks are deserted as cities go into lockdown. Ballet dancer and performer Ashlee Montague dances in an empty Times Square in New York, which has become an epicentre of the disease",
},
{  
    "user_id": None,
    "title": "Out of Stock",
    "image": "https://www.gannett-cdn.com/presto/2020/03/13/USAT/69316b84-b880-4b2b-9403-77da5b60f70f-XXX_BMW_grocery4.jpg?width=660&height=438&fit=crop&format=pjpg&auto=webp",
    "bio": "Customers at grocery store chain HEB in Austin look for products among increasingly empty shelves as the city responds to concerns of the spread of coronavirus on March 13 - James Gregg",
},
{  
    "user_id": None,
    "title": "Empty Pews",
    "image": "https://www.gannett-cdn.com/presto/2020/03/15/USAT/de9c42ea-1c41-405f-9950-84ee0ab324c5-XXX_03152020_First_United_03.jpg?crop=4989,3331,x0,y0&width=660&height=441&format=pjpg&auto=webp",
    "bio": "Rev. Roger Grimmett delivers his message to an empty sanctiary and a camera crew for First United Methodist Church's Sunday morning Service in Springfield, Illinois",
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
        for datum in data2:
            newposts = Faker(
                cls=post.Post,
                init=datum
            )
            for y in newposts.create():
                self.db.session.add(y)
