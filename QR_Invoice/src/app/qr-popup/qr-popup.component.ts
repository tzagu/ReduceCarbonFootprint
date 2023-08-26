import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-qr-popup',
  templateUrl: './qr-popup.component.html',
  styleUrls: ['./qr-popup.component.scss']
})
export class QrPopupComponent implements OnInit {
  // popup dialog to show the QR code
  // take the qr png as a parameter and display it
  qrCodeURL: string = '';

  constructor(public dialogRef: MatDialogRef<QrPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.qrCodeURL = this.data.qrCode;
  }

}
