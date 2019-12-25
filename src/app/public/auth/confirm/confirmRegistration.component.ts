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
            localStorage.setItem('contentWatchedArray',
            JSON.stringify(
                {
                    content47: {
                        BOOL: false
                    },
                    content48: {
                        BOOL: false
                    },
                    content49: {
                        BOOL: false
                    },
                    content43: {
                        BOOL: false
                    },
                    content44: {
                        BOOL: false
                    },
                    content45: {
                        BOOL: false
                    },
                    content46: {
                        BOOL: false
                    },
                    content40: {
                        BOOL: false
                    },
                    content41: {
                        BOOL: false
                    },
                    content42: {
                        BOOL: false
                    },
                    content36: {
                        BOOL: false
                    },
                    content37: {
                        BOOL: false
                    },
                    content38: {
                        BOOL: false
                    },
                    content39: {
                        BOOL: false
                    },
                    content32: {
                        BOOL: false
                    },
                    content33: {
                        BOOL: false
                    },
                    content34: {
                        BOOL: false
                    },
                    content35: {
                        BOOL: false
                    },
                    content30: {
                        BOOL: false
                    },
                    content31: {
                        BOOL: false
                    },
                    content29: {
                        BOOL: false
                    },
                    content25: {
                        BOOL: false
                    },
                    content26: {
                        BOOL: false
                    },
                    content27: {
                        BOOL: false
                    },
                    content28: {
                        BOOL: false
                    },
                    content21: {
                        BOOL: false
                    },
                    content65: {
                        BOOL: false
                    },
                    content22: {
                        BOOL: false
                    },
                    content66: {
                        BOOL: false
                    },
                    content23: {
                        BOOL: false
                    },
                    content67: {
                        BOOL: false
                    },
                    content24: {
                        BOOL: false
                    },
                    content68: {
                        BOOL: false
                    },
                    content61: {
                        BOOL: false
                    },
                    content62: {
                        BOOL: false
                    },
                    content63: {
                        BOOL: false
                    },
                    content20: {
                        BOOL: false
                    },
                    content64: {
                        BOOL: false
                    },
                    content9: {
                        BOOL: false
                    },
                    content60: {
                        BOOL: false
                    },
                    content18: {
                        BOOL: false
                    },
                    content19: {
                        BOOL: false
                    },
                    content14: {
                        BOOL: false
                    },
                    content58: {
                        BOOL: false
                    },
                    content15: {
                        BOOL: false
                    },
                    content59: {
                        BOOL: false
                    },
                    content16: {
                        BOOL: false
                    },
                    content17: {
                        BOOL: false
                    },
                    content10: {
                        BOOL: false
                    },
                    content54: {
                        BOOL: false
                    },
                    content11: {
                        BOOL: false
                    },
                    content55: {
                        BOOL: false
                    },
                    content12: {
                        BOOL: false
                    },
                    content56: {
                        BOOL: false
                    },
                    content13: {
                        BOOL: false
                    },
                    content57: {
                        BOOL: false
                    },
                    content50: {
                        BOOL: false
                    },
                    content51: {
                        BOOL: false
                    },
                    content52: {
                        BOOL: false
                    },
                    content53: {
                        BOOL: false
                    },
                    content8: {
                        BOOL: false
                    },
                    content7: {
                        BOOL: false
                    },
                    content6: {
                        BOOL: false
                    },
                    content5: {
                        BOOL: false
                    },
                    content4: {
                        BOOL: false
                    },
                    content3: {
                        BOOL: false
                    },
                    content2: {
                        BOOL: false
                    },
                    content1: {
                        BOOL: false
                    }
                }
            ));
            // this.configs.curUser = result.user;
            this.router.navigate(['/securehome']);
        }
    }
}





