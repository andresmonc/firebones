import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {UserRegistrationService} from "../../../service/user-registration.service";
import {CognitoCallback} from "../../../service/cognito.service";

export class RegistrationUser {
    name: string;
    email: string;
    phone_number: string;
    password: string;
}
/**
 * This component is responsible for displaying and controlling
 * the registration of the user.
 */
@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './registration.html',
    styleUrls: ['./registration.css']
})
export class RegisterComponent implements CognitoCallback {
    registrationUser: RegistrationUser;
    router: Router;
    errorMessage: string;
    validated = false;

    constructor(public userRegistration: UserRegistrationService, router: Router) {
        this.router = router;
        this.onInit();
    }

    onInit() {
        this.registrationUser = new RegistrationUser();
        this.errorMessage = null;
    }

    onRegister() {
        this.errorMessage = null;
        this.validation()
        if (this.validated == true){
            this.userRegistration.register(this.registrationUser, this);
        }

    }

    cognitoCallback(message: string, result: any) {
        if (message != null) { //error
            this.errorMessage = message;
            console.log("result: " + this.errorMessage);
        } else { //success
            //move to the next step
            console.log("redirecting");
            this.router.navigate(['/home/confirmRegistration', result.user.username]);
        }
    }

    phoneValidation(){
        let phone_num = this.registrationUser.phone_number
        if(phone_num.length < 13){
            this.errorMessage = "Phone number must be 13 digits in this format +15555555555"
            return false;
        }
        let i = 1;
        while (i <= phone_num.length - 1){
            console.log(phone_num.charAt(i))
            let current_digit = parseInt(phone_num.charAt(i));
            if(isNaN(current_digit)){
                this.errorMessage = "Please use only numbers in this format +15555555555"
                console.log(current_digit);
                return false;
            };
            i++;
        } 
        
        if(phone_num.charAt(0) != "+"){
            this.errorMessage = "Missing '+' symbol; Phone number must be 13 digits in this format +01555555555"
            return false;
        }
        else {
            return true;
        }
    }

    nameValidation(){
        return true;
    }

    emailValidation(){
        return true;
    }

    passwordValidation(){
        return true;
    }

    validation(){
        if (
            this.nameValidation() == true &&
            this.phoneValidation() == true && 
            this.emailValidation() == true && 
            this.passwordValidation() == true){
                this.validated = true;
            }
    }





}
