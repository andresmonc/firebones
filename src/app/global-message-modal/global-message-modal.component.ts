import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-global-message-modal',
  templateUrl: './global-message-modal.component.html',
  styleUrls: ['./global-message-modal.component.css']
})
export class GlobalMessageModalComponent implements OnInit {
    modalHeader: string;
    modalText: string;
    modalButtonText: string;


    constructor(
        private dialogRef: MatDialogRef<GlobalMessageModalComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.modalHeader = data.modalHeader;
        this.modalText = data.modalText;
        this.modalButtonText = data.modalButtonText;
    }

    ngOnInit() {

    }


    close() {
        this.dialogRef.close();
    }
}
