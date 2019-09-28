import {Injectable} from "@angular/core";
import {CognitoUtil} from "./cognito.service";
import {environment} from "../../environments/environment";

import {Stuff} from "../secure/useractivity/useractivity.component";
import * as AWS from "aws-sdk/global";
import * as DynamoDB from "aws-sdk/clients/dynamodb";
import { integer } from "aws-sdk/clients/lightsail";

/**
 * Created by Vladimir Budilov
 */

@Injectable()
export class DynamoDBService {

    constructor(public cognitoUtil: CognitoUtil) {
        console.log("DynamoDBService: constructor");
    }

    getAWS() {
        return AWS;
    }

    getLogEntries(mapArray: Array<Stuff>) {
        console.log("DynamoDBService: reading from DDB with creds - " + AWS.config.credentials);
        var params = {
            TableName: environment.ddbTableName,
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": this.cognitoUtil.getCognitoIdentity()
            }
        };

        var clientParams:any = {};
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        var docClient = new DynamoDB.DocumentClient(clientParams);
        docClient.query(params, onQuery);

        function onQuery(err, data) {
            if (err) {
                console.error("DynamoDBService: Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log("DynamoDBService: Query succeeded.");
                data.Items.forEach(function (logitem) {
                    // console.log('This is the user object currently in Dynamo DB', logitem)
                    mapArray.push({
                        type: logitem.type, 
                        contentCount: logitem.contentCount,
                        date: logitem.activityDate
                    });
                });
            }
        }
    }

    createNewUser(type: string) {
        try {
            let date = "NO RANGE KEY"
            console.log("DynamoDBService: Writing log entry. Type:" + type + " ID: " + this.cognitoUtil.getCognitoIdentity() + " Date: " + date);
            this.write(this.cognitoUtil.getCognitoIdentity(), date, type);
        } catch (exc) {
            console.log(exc)
            console.log("DynamoDBService: Couldn't write to DDB");
        }

    }
    

    getUserId(): any{
        let cognitoUser = this.cognitoUtil.getCurrentUser();

        cognitoUser.getSession(function (err, session) {
            if (err)
                console.log("UserParametersService: Couldn't retrieve the user");
            else {
                cognitoUser.getUserAttributes(function (err, result) {
                    if (err) {
                        console.log("UserParametersService: in getParameters: " + err);
                    } else {
                        let response = result[0].getValue();
                        console.log(response)
                        return response;
                    }
                });
            }

        });
    }

    getUserObjectFunc(userSubId) {
        let clientParams:any = {
            params: {TableName: environment.ddbTableName}
        };
        console.log(environment.ddbTableName)
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        var DDB = new DynamoDB(clientParams);

        var getParams =
        {
            TableName: environment.ddbTableName,
            Key: {
                'userId' : {S: userSubId},
            }
        };

        DDB.getItem(getParams, function (err, result) {
            if (err){
                console.log(err)
                return err; 
            } else {
                console.log("DynamoDBService got user object: " + JSON.stringify(result));
            }
        });
    } 


    async getUserObject(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {


                let cognitoUser = this.cognitoUtil.getCurrentUser();

                cognitoUser.getSession(function (err, session) {
                if (err)
                    console.log("UserParametersService: Couldn't retrieve the user");
                else {
                    //Here were grabbing the subId and returning a promise 
                    cognitoUser.getUserAttributes(
                        function getSubId(err, result) {
                            let cognitoSubIdPromise = new Promise((resolve,reject) => {
                                setTimeout(() => {
                                    if (err) {
                                        reject('error');
                                    } else {
                                        let response: any = result[0].getValue();
                                        resolve(response);
                                    }
                                }, 1000);
                            });
                            //Once we've resolved the subId from Cognito we can plug it into our dynamodb query
                            cognitoSubIdPromise.then((val) => {
                                let clientParams:any = {
                                    params: {TableName: environment.ddbTableName}
                                };
                                if (environment.dynamodb_endpoint) {
                                    clientParams.endpoint = environment.dynamodb_endpoint;
                                }
                                var DDB = new DynamoDB(clientParams);
                                var getParams = {
                                    TableName: environment.ddbTableName,
                                    Key: {
                                        'userId' : {S: val.toString()},
                                    }
                                };
                                //Here we are executing the query
                                DDB.getItem(getParams, 
                                    function (err, result) {
                                        if (err){
                                            console.log(err)
                                        } else {
                                            //Here we first save our user object key value pairs to local storage to use throughout the app 
                                            console.log("DynamoDBService got user object: " + JSON.stringify(result));
                                            localStorage.setItem('userSubId', result.Item.userId.S);
                                            localStorage.setItem('name', result.Item.name.S);
                                            localStorage.setItem('phoneNumber', result.Item.phoneNumber.S);
                                            localStorage.setItem('email', result.Item.email.S);
                                            localStorage.setItem('contentWatched', result.Item.contentWatched.S);
                                            localStorage.setItem('contentCount', result.Item.contentCount.N);
                                            resolve(result);
                                        }
                                    }
                                );
                            });
                        });
                    }
                });
              console.log("Async Work Complete");
            }, 1000);
          });

          return promise;
    }
    

    updateUserContentWatched(): void {
        let clientParams:any = {
            params: {TableName: environment.ddbTableName}
        };
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        var DDB = new DynamoDB(clientParams);

        let userSubId =  this.getUserId()
        var updateParams =
        {
            TableName: environment.ddbTableName,
            Key: {
                userId:{S: userSubId},
            },
            UpdateExpression: "set contentWatched = :r",
            ExpressionAttributeValues:{
                ":r":{S: "TRUE"}
            }
        };

        DDB.updateItem(updateParams, function (result) {
        console.log("DynamoDBService Updated Content watch " + JSON.stringify(result));
        });
    }

    //implemtn DB call to read content count of user



    write(data: string, date: string, type: string): void {
        console.log("DynamoDBService: writing " + type + " entry");

        let clientParams:any = {
            params: {TableName: environment.ddbTableName}
        };
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        var DDB = new DynamoDB(clientParams);

        // Write the item to the table
        var itemParams =
            {
                TableName: environment.ddbTableName,
                Item: {
                    userId: {S: data},
                    activityDate: {S: date},
                    type: {S: type}
                }
            };
        DDB.putItem(itemParams, function (result) {
            console.log("DynamoDBService: wrote entry: " + JSON.stringify(result));
        });
    }

}


