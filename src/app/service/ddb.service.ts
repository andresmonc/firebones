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

    writeLogEntry(type: string) {
        try {
            let date = "NO RANGE KEY"
            console.log("DynamoDBService: Writing log entry. Type:" + type + " ID: " + this.cognitoUtil.getCognitoIdentity() + " Date: " + date);
            this.write(this.cognitoUtil.getCognitoIdentity(), date, type);
        } catch (exc) {
            console.log(exc)
            console.log("DynamoDBService: Couldn't write to DDB");
        }

    }

    // incrementContentCount(currentContentCount: number){
    //     try {
    //         let contentCount = currentContentCount + 1;
    //         let date = new Date().toString();
    //         console.log("DynamoDBService: Incrementing User's Content Count"  + " ID: " + this.cognitoUtil.getCognitoIdentity() + " Date: " + date);
    //         this.updateUserContentCount(currentContentCount);
    //     } catch (exc) {
    //         console.log("DynamoDBService: Couldn't write to DDB");
    //     }
    // }

    // updateUserContentCount(contentCount: number): void {
    //     console.log("DynamoDBService: updating entrty");

    //     let clientParams:any = {
    //         params: {TableName: environment.ddbTableName}
    //     };
    //     if (environment.dynamodb_endpoint) {
    //         clientParams.endpoint = environment.dynamodb_endpoint;
    //     }
    //     var DDB = new DynamoDB(clientParams);
    //     console.log(this.cognitoUtil.getCognitoIdentity())


    //     // Write the item to the table
    //     var updateParams =
    //         {
    //             TableName: environment.ddbTableName,
    //             Key: {
    //                 userId:{S: this.cognitoUtil.getCognitoIdentity()},
    //                 activityDate:{S: "Sat May 11 2019 10:54:37 GMT-0700 (Pacific Daylight Time)"}
    //             },
    //             UpdateExpression: "set contentCount = :r",
    //             ExpressionAttributeValues:{
    //                 ":r":{N: contentCount.toString()}
    //             }
    //         };

    //     DDB.updateItem(updateParams, function (result) {
    //         console.log("DynamoDBService: updated entry: " + JSON.stringify(result));
    //     });
    // }


    getUserId() {
        let cognitoUser = this.cognitoUtil.getCurrentUser();

        cognitoUser.getSession(function (err, session) {
            if (err)
                console.log("UserParametersService: Couldn't retrieve the user");
            else {
                cognitoUser.getUserAttributes(function (err, result) {
                    if (err) {
                        console.log("UserParametersService: in getParameters: " + err);
                    } else {
                        console.log("THIS IS THE USER ID (SUB)", result[0].Value);
                    }
                });
            }

        });
    }

    updateUserContentWatched(): void {
        console.log("hello world")

        let cognitoUser = this.cognitoUtil.getCurrentUser();

        cognitoUser.getSession(function (err, session) {
            if (err)
                console.log("UserParametersService: Couldn't retrieve the user");
            else {
                cognitoUser.getUserAttributes(function (err, result) {
                    if (err) {
                        console.log("UserParametersService: in getParameters: " + err);
                    } else {
                        console.log("THIS IS THE USER ID (SUB)", result[0].Value);

                        // block of code that should be in own fucntion

                        console.log("DynamoDBService: updating entrty");

                        let clientParams:any = {
                            params: {TableName: environment.ddbTableName}
                        };
                        if (environment.dynamodb_endpoint) {
                            clientParams.endpoint = environment.dynamodb_endpoint;
                        }
                        var DDB = new DynamoDB(clientParams);

                        let userSubId =  result[0].Value;
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

                        //
                    }
                });
            }

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


