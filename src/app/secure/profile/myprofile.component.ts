import { Component } from "@angular/core";
import { UserLoginService } from "../../service/user-login.service";
import { Callback, CognitoUtil, LoggedInCallback } from "../../service/cognito.service";
import { UserParametersService } from "../../service/user-parameters.service";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './myprofile.html',
    styleUrls: ['./myprofile.css', './toggleswitch.css']
})
export class MyProfileComponent implements LoggedInCallback {

    public parameters: Array<Parameters> = [];
    public cognitoId: String;
    

    constructor(
        public router: Router,
        public userService: UserLoginService,
        public userParams: UserParametersService,
        public cognitoUtil: CognitoUtil,
        private _location: Location
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
        this._location.back();
    }

    updatePhoneNumber() {
        console.log('I WAS UPDATED!!!!!!')
    }

    updateNotifications(){
        console.log('WHY WOULDN\'T YOU WANT NOTIFCATIONS')
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
