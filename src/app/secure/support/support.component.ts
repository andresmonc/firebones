import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../service/email.service';
import { EmailReturn } from '../../models/emailResponse';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalMessageModalComponent } from '../../global-message-modal/global-message-modal.component';

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

  constructor(private emailService: EmailService, private dialog: MatDialog) { }

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

  ngOnInit() {

  }

  submit() {
    this.emailService.postContact(this.supportEmail, this.supportTextData).subscribe((res) => {
      this.response = res;
      if (res.statusCode === 200) {
        this.openDialog('', 'Support request sucessfully sent!', 'Close');

        this.supportTextData = '';
      } else {
        this.openDialog('', 'An Error occured', 'Close');
      }
      console.log(res);
    });
  }

}
