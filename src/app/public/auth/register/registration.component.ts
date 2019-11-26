import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserRegistrationService} from '../../../service/user-registration.service';
import {CognitoCallback} from '../../../service/cognito.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalMessageModalComponent } from '../../../global-message-modal/global-message-modal.component';


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
    phoneNumberEntered: string;

    constructor(public userRegistration: UserRegistrationService, router: Router, private dialog: MatDialog) {
        this.router = router;
        this.onInit();
    }

    onInit() {
        this.registrationUser = new RegistrationUser();
        this.errorMessage = null;
    }

    openDialog(headerText: string, text: string, buttonText: string) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        // dialogConfig.height = '180px';
        // dialogConfig.width = '250px';

        dialogConfig.data = {
            modalHeader: headerText,
            modalText: text,
            modalButtonText: buttonText
        };

        this.dialog.open(GlobalMessageModalComponent, dialogConfig);
    }

    onRegister() {
        this.errorMessage = null;
        this.validation();
        if (this.validated === true) {
            this.phoneNumberEntered = this.registrationUser.phone_number;
            this.registrationUser.phone_number = '+1' + this.registrationUser.phone_number;
            this.userRegistration.register(this.registrationUser, this);
        }

    }

    cognitoCallback(message: string, result: any) {
        if (message != null) { // error
            this.registrationUser.phone_number = this.phoneNumberEntered;
            this.errorMessage = message;
            this.openDialog('', this.errorMessage, 'Close');
            console.log('result: ' + this.errorMessage);
        } else { // success
            // move to the next step
            console.log('redirecting');
            this.router.navigate(['/home/confirmRegistration', result.user.username]);
        }
    }

    phoneValidation() {
        return true;
    }

    nameValidation() {
        return true;
    }

    emailValidation() {
        return true;
    }

    passwordValidation() {
        return true;
    }

    validation() {
        if (
            this.nameValidation() === true &&
            this.phoneValidation() === true &&
            this.emailValidation() === true &&
            this.passwordValidation() === true) {
                this.validated = true;
            }
    }





}
