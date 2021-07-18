from models.db import db
from datetime import datetime
from pytrends.request import TrendReq

pytrends = TrendReq(hl='en-US')


# def check_trends(keywords, time_frame):
#     pytrends.build_payload(keywords, cat='0',
#                            timeframe=time_frame, geo='', gprop='')
#     data = pytrends.related_queries()
#     print(data['food']['top']['query'].tolist())
#     print(data['sex']['top']['query'].tolist())


# check_trends(['food', 'sex'], "2020-01-01 2020-01-31")

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
    print(queries_str)

related_queries(['food', 'trump'], '2020-01-01 2020-01-31')