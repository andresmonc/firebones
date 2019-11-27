import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AwsUtil } from './service/aws.service';
import { UserLoginService } from './service/user-login.service';
import { CognitoUtil, LoggedInCallback } from './service/cognito.service';
import { LoadingScreenService } from './service/loading-screen/loading-screen.service';
import { fadeInAnimation } from './animations';

@Component({
    selector: 'app-root',
    templateUrl: 'template/app.html'
})
export class AppComponent implements OnInit, LoggedInCallback, AfterViewInit {

    constructor(private loadingScreenService: LoadingScreenService,
        public awsUtil: AwsUtil,
        public userService: UserLoginService,
        public cognito: CognitoUtil) {
        // this.loadingScreenService.startLoading();
        console.log('AppComponent: constructor');
    }

    ngOnInit() {
        console.log('AppComponent: Checking if the user is already authenticated');
        this.userService.isAuthenticated(this);
    }

    ngAfterViewInit() {
        // this.loadingScreenService.stopLoading();
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        console.log('AppComponent: the user is authenticated: ' + isLoggedIn);
        const mythis = this;
        this.cognito.getIdToken({
            callback() {

            },
            callbackWithParam(token: any) {
                // Include the passed-in callback here as well so that it's executed downstream
                console.log('AppComponent: calling initAwsService in callback');
                mythis.awsUtil.initAwsService(null, isLoggedIn, token);
            }
        });
    }
}

