from __future__ import print_function # Python 2/3 compatibility
import boto3
from boto3.dynamodb.conditions import Key
import json
import decimal
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event,context):
    
        userIdFromCognito = event['request']['userAttributes']['sub']
        nameFromCognitio = event['request']['userAttributes']['nickname']
        phoneNumberFromCognito = event['request']['userAttributes']['phone_number']
        emailFromCognito = event['request']['userAttributes']['email']
        
        try:
            table = dynamodb.Table('userObject')
            response = table.put_item(
               Item={
                    'userId': userIdFromCognito,
                    'name': nameFromCognitio,
                    'phoneNumber' : phoneNumberFromCognito,
                    'email' : emailFromCognito,
                    'notifications':True,
                    'contentWatched' : "FALSE",
                    "prevContentCount" : 1,
                    'contentCount' : 3,
                    'contentWatchedArray':{
                        "content1":False,
                        "content2":False,
                        "content3":False,
                        "content4":False,
                        "content5":False,
                        "content6":False
                        "content7":False,
                        "content8":False,
                        "content9":False,
                        "content10":False,
                        "content11":False,
                        "content12":False,
                        "content13":False,
                        "content14":False,
                        "content15":False,
                        "content16":False,
                        "content17":False,
                        "content18":False,
                        "content19":False
                        "content20":False,
                        "content21":False,
                        "content22":False,
                        "content23":False,
                        "content24":False,
                        "content25":False,
                        "content26":False
                        "content27":False,
                        "content28":False,
                        "content29":False,
                        "content30":False,
                        "content31":False,
                        "content32":False
                        "content33":False,
                        "content34":False,
                        "content35":False,
                        "content36":False,
                        "content37":False,
                        "content38":False,
                        "content39":False,
                        "content40":False,
                        "content41":False,
                        "content42":False
                        "content43":False,
                        "content44":False,
                        "content45":False,
                        "content46":False,
                        "content47":False,
                        "content48":False,
                        "content49":False
                        "content50":False,
                        "content51":False,
                        "content52":False
                        "content53":False,
                        "content54":False,
                        "content55":False,
                        "content56":False,
                        "content57":False,
                        "content58":False,
                        "content59":False,
                        "content60":False,
                        "content61":False,
                        "content62":False
                        "content63":False,
                        "content64":False,
                        "content65":False,
                        "content66":False,
                        "content67":False,
                        "content68":False,
                    }
                }
            )
            
            return event
            
        except Exception as e:
            print(e)
            raise e 