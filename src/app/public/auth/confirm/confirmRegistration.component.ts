import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRegistrationService} from '../../../service/user-registration.service';
import {UserLoginService} from '../../../service/user-login.service';
import {LoggedInCallback} from '../../../service/cognito.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalMessageModalComponent } from '../../../global-message-modal/global-message-modal.component';

@Component({
    selector: 'awscognito-angular2-app',
    template: ''
})
export class LogoutComponent implements LoggedInCallback {

    constructor(public router: Router,
                public userService: UserLoginService) {
        this.userService.isAuthenticated(this);
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.userService.logout();
            this.router.navigate(['/home']);
        }

        this.router.navigate(['/home']);
    }
}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './confirmRegistration.html',
    styleUrls: ['./confirmRegistration.css']
})
export class RegistrationConfirmationComponent implements OnInit, OnDestroy {
    confirmationCode: string;
    email: string;
    errorMessage: string;
    private sub: any;

    constructor(
        public regService: UserRegistrationService,
        public router: Router,
        public route: ActivatedRoute,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.email = params.username;

        });

        this.errorMessage = null;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
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

    onConfirmRegistration() {
        this.errorMessage = null;
        this.regService.confirmRegistration(this.email, this.confirmationCode, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message != null) { // error
            this.errorMessage = message;
            this.openDialog('', this.errorMessage, 'Close');
            console.log('message: ' + this.errorMessage);
        } else { // success
            // move to the next step
            console.log('Moving to securehome');
            // this.configs.curUser = result.user;
            this.router.navigate(['/securehome']);
        }
    }
}





