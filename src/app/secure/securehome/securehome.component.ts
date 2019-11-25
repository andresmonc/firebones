import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserLoginService } from '../../service/user-login.service';
import { LoggedInCallback } from '../../service/cognito.service';
import { slideInAnimation } from '../../animations';

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './secureHome.html',
    animations: [slideInAnimation]
    // styleUrls: ['/assets/css/sb-admin.css']
})
export class SecureHomeComponent implements OnInit, LoggedInCallback {

    constructor(public router: Router, public userService: UserLoginService) {
        this.userService.isAuthenticated(this);
        console.log('SecureHomeComponent: constructor');
    }

    ngOnInit() {

    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        }
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }

}

