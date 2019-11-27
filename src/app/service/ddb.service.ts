import { Injectable } from '@angular/core';
import { CognitoUtil } from './cognito.service';
import { environment } from '../../environments/environment';

import { Stuff } from '../secure/useractivity/useractivity.component';
import * as AWS from 'aws-sdk/global';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import { integer } from 'aws-sdk/clients/lightsail';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalMessageModalComponent } from '../global-message-modal/global-message-modal.component';

/**
 * Created by Vladimir Budilov
 */

@Injectable()
export class DynamoDBService {

    constructor(public cognitoUtil: CognitoUtil, private dialog: MatDialog) {
        console.log('DynamoDBService: constructor');
    }

    openDialog(headerText: string, text: string, buttonText: string) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            modalHeader: headerText,
            modalText: text,
            modalButtonText: buttonText
        };

        this.dialog.open(GlobalMessageModalComponent, dialogConfig);
    }

    getLocalStorageSubId() {
        return localStorage.getItem('userSubId');
    }

    getLocalStorageContentCount() {
        console.log('were rendering the table now by content count');
        return localStorage.getItem('contentCount');
    }

    getLocalStorageContentWatched() {
       return localStorage.getItem('contentWatched');
    }

    getLocalStorageNotifications() {
        return localStorage.getItem('notifications');
    }

    getLocalStoragePhoneNumber() {
        return localStorage.getItem('phoneNumber');
    }

    getLocalStorageEmail() {
        return localStorage.getItem('email');
    }

    getLocalStorageName() {
        return localStorage.getItem('name');
    }

    getLocalStorageTimeStamp() {
        return localStorage.getItem('timeStamp');
    }

    setLocalStoragePhoneNumber(phoneInput) {
        localStorage.setItem('phoneNumber', phoneInput);
    }

    setLocalStorageNotifications(notificationsBoolean) {
        localStorage.setItem('notifications', notificationsBoolean);
    }

    setLocalStorageContentWatchedTrue() {
        localStorage.setItem('contentWatched', 'TRUE');
    }

    setLocalStorageTimeStamp() {
        const currentTime = new Date();
        console.log('currentTime', currentTime);

        // Time for content release cron job for current day
        const contentReleaseTimeToday = new Date();
        contentReleaseTimeToday.setHours(17);

        // Time for content release cron job for next day
        const contentReleaseTimeNextDay = new Date();
        contentReleaseTimeNextDay.setHours(41);

        if (currentTime.getTime() > contentReleaseTimeToday.getTime()) {
            // set untilTime to nextDay at 6
            console.log('nextDayAt6', contentReleaseTimeNextDay);
            localStorage.setItem('timeStamp', contentReleaseTimeNextDay.toString());
        } else {
            // set untilTime to currentDay at 6
            console.log('todayAt6', contentReleaseTimeToday);
            localStorage.setItem('timeStamp', contentReleaseTimeToday.toString());
        }
    }

    getAWS() {
        return AWS;
    }

    getLogEntries(mapArray: Array<Stuff>) {
        console.log('DynamoDBService: reading from DDB with creds - ' + AWS.config.credentials);
        const params = {
            TableName: environment.ddbTableName,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': this.cognitoUtil.getCognitoIdentity()
            }
        };

        const clientParams: any = {};
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        const docClient = new DynamoDB.DocumentClient(clientParams);
        docClient.query(params, onQuery);

        function onQuery(err, data) {
            if (err) {
                console.error('DynamoDBService: Unable to query the table. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log('DynamoDBService: Query succeeded.');
                data.Items.forEach(function(logitem) {
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
            const date = 'NO RANGE KEY';
            console.log('DynamoDBService: Writing log entry. Type:' + type
                + ' ID: ' +
                this.cognitoUtil.getCognitoIdentity() + ' Date: ' + date);
            this.write(this.cognitoUtil.getCognitoIdentity(), date, type);
        } catch (exc) {
            console.log(exc);
            console.log('DynamoDBService: Couldn\'t write to DDB');
        }

    }


    getUserIdCognito(): any {
        const cognitoUser = this.cognitoUtil.getCurrentUser();

        cognitoUser.getSession(function(err, session) {
            if (err) {
                console.log('UserParametersService: Couldn\'t retrieve the user');
            } else {
                cognitoUser.getUserAttributes(function(err, result) {
                    if (err) {
                        console.log('UserParametersService: in getParameters: ' + err);
                    } else {
                        const response = result[0].getValue();
                        console.log(response);
                        return response;
                    }
                });
            }

        });
    }

    async getUserContent(): Promise<any> {
        const userSubId = this.getLocalStorageSubId();
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const clientParams: any = {
                    params: { TableName: environment.ddbTableName }
                };
                if (environment.dynamodb_endpoint) {
                    clientParams.endpoint = environment.dynamodb_endpoint;
                }
                const DDB = new DynamoDB(clientParams);
                const getParams = {
                    TableName: environment.ddbTableName,
                    Key: {
                        userId: { S: userSubId },
                    }
                };

                DDB.getItem(getParams, function(err, result) {
                    if (err) {
                        console.log(err);
                        return err;
                    } else {
                        console.log('DynamoDBService called for user contentWatch!!!!: ' + (result.Item.contentWatched.S));
                        console.log('DynamoDBService called for user contentCount!!!!: ' + (result.Item.contentCount.N));
                        localStorage.setItem('contentWatched', result.Item.contentWatched.S);
                        if (result.Item.contentWatched.S === 'FALSE') {
                            localStorage.setItem('timeStamp', 'NO DB CALL');
                        }
                        localStorage.setItem('contentCount', result.Item.contentCount.N);
                        resolve(result.Item.contentCount.N);
                    }
                });
            }, 1000);
        });

        return promise;
    }

    async getUserObject(): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const cognitoUser = this.cognitoUtil.getCurrentUser();
                cognitoUser.getSession(function(err, session) {
                    if (err) {
                        console.log('UserParametersService: Couldn\'t retrieve the user');
                    } else {
                        // Here were grabbing the subId and returning a promise
                        cognitoUser.getUserAttributes(
                            function getSubId(err, result) {
                                const cognitoSubIdPromise = new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        if (err) {
                                            reject('error');
                                        } else {
                                            const response: any = result[0].getValue();
                                            resolve(response);
                                        }
                                    }, 1000);
                                });
                                // Once we've resolved the subId from Cognito we can plug it into our dynamodb query
                                cognitoSubIdPromise.then((val) => {
                                    const clientParams: any = {
                                        params: { TableName: environment.ddbTableName }
                                    };
                                    if (environment.dynamodb_endpoint) {
                                        clientParams.endpoint = environment.dynamodb_endpoint;
                                    }
                                    const DDB = new DynamoDB(clientParams);
                                    const getParams = {
                                        TableName: environment.ddbTableName,
                                        Key: {
                                            userId: { S: val.toString() },
                                        }
                                    };
                                    // Here we are executing the query
                                    DDB.getItem(getParams,
                                        function(err, result) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                // Here we first save our user object key value pairs to
                                                // local storage to use throughout the app
                                                // console.log('DynamoDBService got user object: ' + JSON.stringify(result));
                                                localStorage.setItem('userSubId', result.Item.userId.S);
                                                localStorage.setItem('name', result.Item.name.S);
                                                localStorage.setItem('phoneNumber', result.Item.phoneNumber.S);
                                                localStorage.setItem('email', result.Item.email.S);
                                                localStorage.setItem('contentWatched', result.Item.contentWatched.S);
                                                localStorage.setItem('contentCount', result.Item.contentCount.N);
                                                localStorage.setItem('notifications', (result.Item.notifications.BOOL).toString());
                                                resolve(result);
                                            }
                                        }
                                    );
                                });
                            });
                    }
                });
                console.log('Async Work Complete');
            }, 1000);
        });

        return promise;
    }

    // update notifications
    updateUserNotifications(notificationInd: boolean): void {
        const userSubId = localStorage.getItem('userSubId');
        const clientParams: any = {
            params: { TableName: environment.ddbTableName }
        };
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        const DDB = new DynamoDB(clientParams);

        const updateParams = {
            TableName: environment.ddbTableName,
            Key: {
                userId: { S: userSubId },
            },
            UpdateExpression: 'set notifications = :r',
            ExpressionAttributeValues: {
                ':r': { BOOL : notificationInd }
            }
        };

        DDB.updateItem(updateParams, function(result) {
            console.log('DynamoDBService Updated notifications ' + JSON.stringify(result));
        });
    }




    updateUserPhoneNumber(phoneNumber): void {
        const userSubId = localStorage.getItem('userSubId');
        const clientParams: any = {
            params: { TableName: environment.ddbTableName }
        };
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        const DDB = new DynamoDB(clientParams);

        const updateParams = {
            TableName: environment.ddbTableName,
            Key: {
                userId: { S: userSubId },
            },
            UpdateExpression: 'set phoneNumber = :r',
            ExpressionAttributeValues: {
                ':r': { S: phoneNumber }
            }
        };

        DDB.updateItem(updateParams, function(result) {
            console.log('DynamoDBService Updated Phone Number ' + JSON.stringify(result));
        });
    }

    updateUserContentWatched(): void {
        const userSubId = localStorage.getItem('userSubId');
        const clientParams: any = {
            params: { TableName: environment.ddbTableName }
        };
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        const DDB = new DynamoDB(clientParams);

        const updateParams = {
            TableName: environment.ddbTableName,
            Key: {
                userId: { S: userSubId },
            },
            UpdateExpression: 'set contentWatched = :r',
            ExpressionAttributeValues: {
                ':r': { S: 'TRUE' }
            }
        };

        DDB.updateItem(updateParams, function(result) {
            console.log('DynamoDBService Updated Content watch ' + JSON.stringify(result));
        });
    }


    write(data: string, date: string, type: string): void {
        console.log('DynamoDBService: writing ' + type + ' entry');

        const clientParams: any = {
            params: { TableName: environment.ddbTableName }
        };
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        const DDB = new DynamoDB(clientParams);

        // Write the item to the table
        const itemParams = {
            TableName: environment.ddbTableName,
            Item: {
                userId: { S: data },
                activityDate: { S: date },
                type: { S: type }
            }
        };
        DDB.putItem(itemParams, function(result) {
            console.log('DynamoDBService: wrote entry: ' + JSON.stringify(result));
        });
    }

}


