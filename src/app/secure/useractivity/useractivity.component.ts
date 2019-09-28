import {Component} from "@angular/core";
import {UserLoginService} from "../../service/user-login.service";
import {LoggedInCallback} from "../../service/cognito.service";
import {Router} from "@angular/router";
import {DynamoDBService} from "../../service/ddb.service";

export class Stuff {
    public type: string;
    public date: string;
    public contentCount: number;
}

interface userObj{
     type: string;
     date: string;
     contentCount: number;
}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './useractivity.html'
})
export class UseractivityComponent implements LoggedInCallback {
    public logdata: Array<Stuff> = [];
    
    constructor(public router: Router, public ddb: DynamoDBService, public userService: UserLoginService) {
        this.userService.isAuthenticated(this);
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            const userObject = this.ddb.getUserObject()
            console.log("this is the user object", userObject)
        }
    }
}
