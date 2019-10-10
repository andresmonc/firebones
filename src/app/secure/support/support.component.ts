import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../service/email.service';
import { EmailReturn } from '../../models/emailResponse';


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  public response: EmailReturn;

  constructor(private emailService: EmailService) { }

  ngOnInit() {

  }

  submit() {
    this.emailService.postContact('jaime', 'jaimeamonc@gmail.com', 'Itsame').subscribe((res) => {
      this.response = res;
    });
  }

}
