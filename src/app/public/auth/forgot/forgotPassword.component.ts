import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserLoginService } from "../../../service/user-login.service";
import { CognitoCallback } from "../../../service/cognito.service";


@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './forgotPassword.html',
    styleUrls: ['./forgotPassword.css']
})
export class ForgotPasswordStep1Component implements CognitoCallback {
    public currentRoute = this.router.url;
    public componentName: String;
    public nextRoute: String = '/home/forgotPassword';

    email: string;
    errorMessage: string;

    constructor(public router: Router,
        public userService: UserLoginService) {
        this.errorMessage = null;
        this.createName();
    }

    onNext() {
        this.errorMessage = null;
        this.userService.forgotPassword(this.email, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message == null && result == null) { //error
            this.router.navigate([this.nextRoute, this.email]);
        } else { //success
            this.errorMessage = message;
        }
    }

    createName(){
        if(this.currentRoute.search('change') != -1){
            this.componentName = "Change Password"
            this.nextRoute = "/securehome/changepassword"
        } else {
            this.componentName = "Forgot Password"
        }
    }



}


@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './forgotPasswordStep2.html',
    styleUrls: ['./forgotPassword.css']
})
export class ForgotPassword2Component implements CognitoCallback, OnInit, OnDestroy {

    public currentRoute = this.router.url;
    public componentName: String;



    verificationCode: string;
    email: string;
    password: string;
    errorMessage: string;
    private sub: any;

    constructor(public router: Router, public route: ActivatedRoute,
        public userService: UserLoginService) {
        console.log("email from the url: " + this.email);
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.email = params['email'];

        });
        this.errorMessage = null;
        this.createName();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onNext() {
        this.errorMessage = null;
        this.userService.confirmNewPassword(this.email, this.verificationCode, this.password, this);
    }

    cognitoCallback(message: string) {
        if (message != null) { //error
            this.errorMessage = message;
            console.log("result: " + this.errorMessage);
        } else { //success
            this.router.navigate(['/home/login']);
        }
    }

    createName(){
        if(this.currentRoute.search('change') != -1){
            this.componentName = "Change Password"
        } else {
            this.componentName = "Forgot Password"
        }
    }


}