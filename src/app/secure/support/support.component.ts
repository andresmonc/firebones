import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../service/email.service';
import { EmailReturn } from '../../models/emailResponse';



@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  public submitted: boolean = false;

  public response: EmailReturn;

  constructor(private emailService: EmailService) { }

  ngOnInit() {

  }

  submit() {
    this.emailService.postContact('jaime', 'jaimeamonc@gmail.com', 'Help me everything is so broken :-(').subscribe((res) => {
      this.response = res;
    });
  }

}
