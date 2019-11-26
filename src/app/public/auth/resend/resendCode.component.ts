import {Component} from '@angular/core';
import {UserRegistrationService} from '../../../service/user-registration.service';
import {CognitoCallback} from '../../../service/cognito.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalMessageModalComponent } from '../../../global-message-modal/global-message-modal.component';
@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './resendCode.html',
    styleUrls: ['./resendCode.css']
})
export class ResendCodeComponent implements CognitoCallback {

    email: string;
    errorMessage: string;

    constructor(public registrationService: UserRegistrationService, private dialog: MatDialog, public router: Router) {

    }

    resendCode() {
        this.registrationService.resendCode(this.email, this);
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

    cognitoCallback(error: any, result: any) {
        if (error != null) {
            this.errorMessage = error;
            this.openDialog('', this.errorMessage, 'Close');
            console.log('message: ' + this.errorMessage);
        } else {
            this.router.navigate(['/home/confirmRegistration', this.email]);
        }
    }
}
