import math
import datetime
import json
import time
import os
import logging
from botocore.vendored import requests

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)


""" --- Helpers to build responses which match the structure of the necessary dialog actions --- """


def get_slots(intent_request):
    return intent_request['currentIntent']['slots']


def close(fulfillment_state, message):
    response = {
        'dialogAction': {
            'type': 'Close',
            'fulfillmentState': fulfillment_state,
            'message': message
        }
    }

    return response



def datetime_timestamp(dt): #change time into unix form
     time.strptime(dt, '%Y-%m-%d %H:%M:%S')
     s = time.mktime(time.strptime(dt, '%Y-%m-%d %H:%M:%S'))
     return int(s)

def book_resturant(intent_request):

    Location = get_slots(intent_request)["Location"]
    time = get_slots(intent_request)["Time"]
    Cuisine = get_slots(intent_request)["Cuisine"]
    number = get_slots(intent_request)["Number"]
    date = get_slots(intent_request)["Date"]
    source = intent_request['invocationSource']
    dt = date +' '+ time + ':00' 
    dt = datetime_timestamp(dt)
    # call yelp api and get three restaurants #
    url = 'https://api.yelp.com/v3/businesses/search?term=food&location='+str(Location)+'&categories='+str(Cuisine)+'&open_at='+str(dt)+'&sort_by=best_match&limit=3'
    h = {'Authorization': 'Bearer jMl4MmpTag7jlzckSaLO2zgE5RTUtZ0cfOPCJSJJmwvnlcGFkKpWco7UYaKLXoU7laSeUC4ioBSCDE5xm7Q3FcvxTdNF26Z6kx7PuUO0qOtuawy10EEf-vScRkeEXHYx'}
    response = requests.get(url, headers=h)
    response = json.loads(response.text)
    if len(response['businesses']) == 0:
        message = 'Sorry, there are no available resturants'
    else:
        n_1 = response['businesses'][0]['name']
        loc_1 = response['businesses'][0]['location']['address1']
        n_2 = response['businesses'][1]['name']
        loc_2 = response['businesses'][1]['location']['address1']
        n_3 = response['businesses'][2]['name']
        loc_3 = response['businesses'][2]['location']['address1']
        pre = 'Thanks for waiting! Here are the recommended ' + str(Cuisine) + ' restaurants for ' + str(number)+' people based on your description.'
        message = pre + '1:' + str(n_1) +'location:'+ str(loc_1) + '2:'+ str(n_2) + 'location'+ str(loc_2) + '3.' + str(n_3) + ' location' + str(loc_3)
        

    return close('Fulfilled',
                 {'contentType': 'PlainText',
                  'content': message})
    

""" --- Intents --- """


def dispatch(intent_request):

    logger.debug('dispatch userId={}, intentName={}'.format(intent_request['userId'], intent_request['currentIntent']['name']))

    intent_name = intent_request['currentIntent']['name']

    # Dispatch to your bot's intent handlers
    if intent_name == 'DiningSuggestionsIntent':
        return book_resturant(intent_request)

    raise Exception('Intent with name ' + intent_name + ' not supported')


""" --- Main handler --- """


def lambda_handler(event, context):
    os.environ['TZ'] = 'America/New_York'
    time.tzset()
    logger.debug('event.bot.name={}'.format(event['bot']['name']))
    return dispatch(event)
