import { UserLoginService } from '../../service/user-login.service';
import { LoggedInCallback } from '../../service/cognito.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { DynamoDBService } from '../../service/ddb.service';
import { LoadingScreenService } from '../../service/loading-screen/loading-screen.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalMessageModalComponent } from '../../global-message-modal/global-message-modal.component';

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './myprofile.html',
    styleUrls: ['./myprofile.css', './toggleswitch.css']
})
export class MyProfileComponent implements LoggedInCallback {

    public cognitoId: string;
    public errorMessage: string;
    public phoneInput = '';
    public editMode: boolean;

    public notifications: boolean = this.ddb.getLocalStorageNotifications() === 'true';
    public phoneNumber = this.ddb.getLocalStoragePhoneNumber();
    public email: string = this.ddb.getLocalStorageEmail();

    constructor(
        private dialog: MatDialog,
        public router: Router,
        public userService: UserLoginService,
        private location: Location,
        public ddb: DynamoDBService,
        private loadingScreen: LoadingScreenService
    ) {
        this.userService.isAuthenticated(this);
    }
    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
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
            this.ddb.updateUserPhoneNumber('+1' + this.phoneInput);
            this.ddb.setLocalStoragePhoneNumber('+1' + this.phoneInput);
            console.log('fuck');
            this.openDialog('', 'Successfully updated phone number', 'Close');
        } else {
            this.openDialog('', this.errorMessage, 'Close');
        }
    }

    updateNotifications() {
        if (this.notifications === false) {
            this.notifications = true;
            this.ddb.updateUserNotifications(true);
            this.ddb.setLocalStorageNotifications('true');
        } else if (this.notifications === true) {
            this.notifications = false;
            this.ddb.updateUserNotifications(false);
            this.ddb.setLocalStorageNotifications('false');
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

    phoneValidation(phoneNumber) {
        try {
            if (phoneNumber.length < 10) {
                this.errorMessage = 'Phone number must be 10 digits';
                return false;
            }
            let i = 1;
            while (i <= phoneNumber.length - 1) {
                const currentDigit = parseInt(phoneNumber.charAt(i));
                if (isNaN(currentDigit)) {
                    this.errorMessage = 'Please use only numbers';
                    console.log(currentDigit);
                    return false;
                }
                i++;
            }
            return true;
        } catch {
            this.errorMessage = 'Please enter a phone number.';
            return false;
        }

    }


}
