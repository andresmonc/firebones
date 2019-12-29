import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from '../../../service/user-login.service';
import { ChallengeParameters, CognitoCallback, LoggedInCallback } from '../../../service/cognito.service';
import { DynamoDBService } from '../../../service/ddb.service';
import { LoadingScreenService } from '../../../service/loading-screen/loading-screen.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalMessageModalComponent } from '../../../global-message-modal/global-message-modal.component';

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent implements CognitoCallback, LoggedInCallback, OnInit, OnChanges {
    email: string;
    password: string;
    hide = false;
    errorMessage: string;
    mfaStep = false;
    showModal: boolean;
    mfaData = {
        destination: '',
        callback: null
    };

    constructor(public router: Router,
                public ddb: DynamoDBService,
                public userService: UserLoginService,
                private loadingScreenService: LoadingScreenService,
                private changeDetect: ChangeDetectorRef,
                private dialog: MatDialog) {
        console.log('LoginComponent constructor');
    }

    ngOnInit() {
        this.showModal = true;
        this.errorMessage = null;
        console.log('Checking if the user is already authenticated. If so, then redirect to the secure site');
        this.userService.isAuthenticated(this);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.changeDetect.detectChanges();
    }

    keyDownFunction(event) {
        if (event.keyCode === 13) {
            this.onLogin();
          // rest of your code
        }
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

    onLogin() {
        if (this.email == null || this.password == null) {
            this.errorMessage = 'All fields are required';
            this.openDialog('Login Failed', this.errorMessage, 'Close');
            return;
        }
        this.loadingScreenService.startLoading();
        this.errorMessage = null;
        this.userService.authenticate(this.email, this.password, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message != null) { // error
            this.loadingScreenService.stopLoading();
            this.errorMessage = message;
            this.openDialog('Login Failed', this.errorMessage, 'Close');
            console.log('result: ' + this.errorMessage);
            if (this.errorMessage === 'User is not confirmed.') {
                console.log('redirecting');
                this.router.navigate(['/home/confirmRegistration', this.email]);
            } else if (this.errorMessage === 'User needs to set password.') {
                console.log('redirecting to set new password');
                this.router.navigate(['/home/newPassword']);
            }
        } else { // success
           this.loadingScreenService.stopLoading();
           this.router.navigate(['/securehome']);
        }
    }

    handleMFAStep(challengeName: string, challengeParameters: ChallengeParameters, callback: (confirmationCode: string) => any): void {
        this.mfaStep = true;
        this.mfaData.destination = challengeParameters.CODE_DELIVERY_DESTINATION;
        this.mfaData.callback = (code: string) => {
            if (code == null || code.length === 0) {
                this.errorMessage = 'Code is required';
                return;
            }
            this.errorMessage = null;
            callback(code);
        };
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.router.navigate(['/securehome']);
        }
    }

    cancelMFA(): boolean {
        this.mfaStep = false;
        return false;   // necessary to prevent href navigation
    }
}
