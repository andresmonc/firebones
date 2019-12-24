from __future__ import print_function # Python 2/3 compatibility
import boto3
from boto3.dynamodb.conditions import Key
import json
import decimal
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

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
        

# Update query method to increment a user whose contentWatch flag is set to FALSE
def incrementContentCountDB(userIdfromDb, newPrevCount, newContentCount):
    table = dynamodb.Table('userObject')

    response = table.update_item(
        Key={
            'userId' : userIdfromDb,
        },
        UpdateExpression="set contentCount = :newContentCt, prevContentCount = :newPrevCt, contentWatched = :setContentWatch",
        ExpressionAttributeValues={
            ':newContentCt': decimal.Decimal(newContentCount) , 
            ':newPrevCt': decimal.Decimal(newPrevCount) , 
            ':setContentWatch': 'FALSE',
        },
        ReturnValues="UPDATED_NEW"
    )
    # logger.info("UpdateItem succeeded: for", userIdfromDb)
    print(json.dumps(response, indent=4, cls=DecimalEncoder))

# Query to get all users whose contentWatch has been set to True
def queryContentWatchedUsers():
  table = dynamodb.Table('userObject')
  resp = table.query(
    IndexName="contentWatched-index",
    KeyConditionExpression=Key('contentWatched').eq('TRUE'),)
    
    
    
# Loop through that response of all users whose contentWatch flag is set to true
  logger.info(resp)
  for item in resp['Items']:
      
    prevContentCount = item['prevContentCount']
    contentCount = item['contentCount']
    
    newPrevCount = contentCount + 1
    
    if (contentCount not in(18, 28)):
        newContentCount = contentCount + 3
    else:
        newContentCount = contentCount + 4
    
    # execution of update query to increment content counts
    incrementContentCountDB(item['userId'], newPrevCount, newContentCount)
    
    #send text message or email to each user about their new content if they have notifications on
    if item['notifications'] == True:
        sns.publish(PhoneNumber = item['phoneNumber'], Message='You got new firebones content bitch!' )
        # logger.info(str(item['userId']), str(item['name']), "had notification sent out of new content")
        

def lambda_handler(event,context):
        try:
            queryContentWatchedUsers()
        except Exception as e:
            print(e)
            raise e 
    