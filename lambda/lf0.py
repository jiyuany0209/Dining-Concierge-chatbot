import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    client = boto3.client('lex-runtime')
    response1 = client.post_text(
        botName = 'Concierge',
        botAlias = 'jy',
        userId = 'yjyyyyyyy',
        inputText = event['input']
    )
    
    return {
        'statusCode': 200,
        'body': response1['message']
    }
