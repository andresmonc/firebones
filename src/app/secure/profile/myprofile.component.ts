import { Component } from "@angular/core";
import { UserLoginService } from "../../service/user-login.service";
import { Callback, CognitoUtil, LoggedInCallback } from "../../service/cognito.service";
import { UserParametersService } from "../../service/user-parameters.service";
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { DynamoDBService } from '../../service/ddb.service';


@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './myprofile.html',
    styleUrls: ['./myprofile.css', './toggleswitch.css']
})
export class MyProfileComponent implements LoggedInCallback {

    public parameters: Array<Parameters> = [];
    public cognitoId: string;
    public errorMessage: string;
    public phoneInput = '';
    public editMode: boolean;
    public notifications: boolean = localStorage.getItem('notifications') === 'true';

    public phoneNumber = localStorage.getItem('phoneNumber');


    constructor(
        public router: Router,
        public userService: UserLoginService,
        public userParams: UserParametersService,
        public cognitoUtil: CognitoUtil,
        private location: Location,
        public ddb: DynamoDBService,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.userService.isAuthenticated(this);
    }
    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            this.userParams.getParameters(new GetParametersCallback(this, this.cognitoUtil));
        }
    }

    backClicked() {
        this.location.back();
    }

    updatePhoneNumber() {
        if (this.phoneValidation(this.phoneInput)) {
            this.phoneNumber = this.phoneInput;
            this.editMode = false;
            this.errorMessage = null;
            this.ddb.updateUserPhoneNumber(this.phoneInput);
            localStorage.setItem('phoneNumber', this.phoneInput);
        }
    }

    updateNotifications() {
        if (this.notifications === false) {
            this.notifications = true;
            this.ddb.updateUserNotifications(true);
            localStorage.setItem('notifications', 'true');
        } else if (this.notifications === true) {
            this.notifications = false;
            this.ddb.updateUserNotifications(false);
            localStorage.setItem('notifications', 'false');
        }

    }

    phoneValidation(phoneNumber) {
        try {
            if (phoneNumber.length < 13) {
                this.errorMessage = 'Phone number must be 13 digits in this format +015555555555';
                return false;
            }
            let i = 1;
            while (i <= phoneNumber.length - 1) {
                const currentDigit = parseInt(phoneNumber.charAt(i));
                if (isNaN(currentDigit)) {
                    this.errorMessage = 'Please use only numbers in this format +015555555555'
                    console.log(currentDigit);
                    return false;
                };
                i++;
            }
            if (phoneNumber.charAt(0) !== '+') {
                this.errorMessage = 'Missing "+" symbol; Phone number must be 13 digits in this format +015555555555';
                return false;
            } else {
                return true;
            }
        } catch {
            this.errorMessage = 'Please enter a phone number.'
            return false;
        }

    }


}

export class Parameters {
    name: string;
    value: string;
}

export class GetParametersCallback implements Callback {

    constructor(public me: MyProfileComponent, public cognitoUtil: CognitoUtil) {

    }

    callback() {

    }

    callbackWithParam(result: any) {

        for (let i = 0; i < result.length; i++) {
            let parameter = new Parameters();
            parameter.name = result[i].getName();
            parameter.value = result[i].getValue();
            this.me.parameters.push(parameter);
        }
        let param = new Parameters()
        param.name = "cognito ID";
        param.value = this.cognitoUtil.getCognitoIdentity();
        this.me.parameters.push(param)
    }

}
