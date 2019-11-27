import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../service/email.service';
import { EmailReturn } from '../../models/emailResponse';



@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  public submitted = false;
  public supportTextData: string;
  public response: EmailReturn;
  public supportEmail: 'jaimeamonc@gmail.com';

  constructor(private emailService: EmailService) { }

  ngOnInit() {

  }

  submit() {
    this.emailService.postContact(this.supportEmail, this.supportTextData).subscribe((res) => {
      this.response = res;
      console.log(res);
    });
  }

}
