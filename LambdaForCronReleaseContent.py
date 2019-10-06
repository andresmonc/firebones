from __future__ import print_function # Python 2/3 compatibility
import boto3
from boto3.dynamodb.conditions import Key
import json
import decimal

dynamodb = boto3.resource('dynamodb')
sns = boto3.client('sns', region_name='us-west-2')

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

def incrementContentCountDB(userIdfromDb):
    table = dynamodb.Table('userObject')

    response = table.update_item(
        Key={
            'userId' : userIdfromDb,
        },
        UpdateExpression="set contentCount = contentCount + :val, contentWatched = :setContentWatch",
        ExpressionAttributeValues={
            ':val': decimal.Decimal(1) , 
            ':setContentWatch': 'FALSE',
        },
        ReturnValues="UPDATED_NEW"
    )
    print("UpdateItem succeeded:")
    print(json.dumps(response, indent=4, cls=DecimalEncoder))
    
def queryContentWatchedUsers():
  table = dynamodb.Table('userObject')
  
  resp = table.query(
    IndexName="contentWatched-index",
    KeyConditionExpression=Key('contentWatched').eq('TRUE'),)
    
  for item in resp['Items']:
    incrementContentCountDB(item['userId'])
    sns.publish(PhoneNumber = item['phoneNumber'], 
    Message='You got new firebones content bitch!' )
    
    #send text message or email to each user about their new content 
    


def lambda_handler(event,context):
        try:
            queryContentWatchedUsers()
        except Exception as e:
            print(e)
            raise e 
    