import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailReturn } from '../models/emailResponse';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class EmailService {

    constructor(private http: HttpClient) { }


    private serverAPI = 'https://t2cxbnod53.execute-api.us-east-1.amazonaws.com/default'


    public postContact(name, email, message) {

        const apiEndpoint = this.serverAPI + '/fireBonesContactUs';
        const body = JSON.stringify({
            body: {
                name: {name},
                email: {email},
                message: {message}
            }
        });
        return this.http.post<EmailReturn>(apiEndpoint, body).pipe(map(res => res));

    }


}
