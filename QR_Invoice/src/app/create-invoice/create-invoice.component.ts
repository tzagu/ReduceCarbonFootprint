import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from '../server.service';
import { MatDialog } from '@angular/material/dialog';
import { QrPopupComponent } from '../qr-popup/qr-popup.component';

interface BuyingItem {
  name: string;
  units: number;
  price: number;
}

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent {

  isLoading = false;

  items: BuyingItem[] = [
    {
      name: 'Caffe Latte',
      price: 3.5,
      units: 1
    },
    {
      name: 'Caffe Mocha',
      price: 4.5,
      units: 1
    },
    {
      name: 'Cappuccino',
      price: 3.5,
      units: 1
    },
    {
      name: 'Caffe Americano',
      price: 3.5,
      units: 1
    },
    {
      name: 'Espresso',
      price: 2.5,
      units: 1
    },
    {
      name: 'Espresso Macchiato',
      price: 3.0,
      units: 1
    },
    {
      name: 'Caramel Macchiato',
      price: 4.5,
      units: 1
    },
    {
      name: 'White Chocolate Mocha',
      price: 4.5,
      units: 1
    },
    {
      name: 'Flat White',
      price: 4.0,
      units: 1
    },
    {
      name: 'Classic Hot Chocolate',
      price: 4.5,
      units: 1
    },
    {
      name: 'Pour Over',
      price: 2.0,
      units: 1
    },
    {
      name: 'Cookie',
      price: 2.0,
      units: 1
    },
  ]

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  buyingItems: BuyingItem[] = [

  ];

  displayedColumns = ['item', 'units', 'total'];

  constructor(public serverService: ServerService, public dialog: MatDialog) { }

  getTotalCost() {
    return this.buyingItems.map(t => t.price * t.units).reduce((acc, value) => acc + value, 0);
  }

  addItem(item: BuyingItem) { // add items to the table
    const index = this.buyingItems.findIndex((buyingItem: BuyingItem) => buyingItem.name === item.name);
    if (index !== -1) {
      this.buyingItems[index].units++;
    }
    else {
      this.buyingItems.push(item);
    }
    console.log(this.buyingItems);
    this.dataSource.data = this.buyingItems;
  }

  async generateQRCode() {
    this.isLoading = true;
    const firestoreDoc = {
      items: this.buyingItems,
    };
    try {
      const qrCodeURL = await this.serverService.addInvoice(firestoreDoc);
      this.isLoading = false;
  
      this.dialog.open(QrPopupComponent, {
        data: {
          qrCode: qrCodeURL,
        },
      }).afterClosed().subscribe(() => {
        this.buyingItems = [];
        this.dataSource.data = [];
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      this.isLoading = false;
    }
  }
  
}

// this.serverService.addInvoice(firestoreDoc).then((res) => {
//   this.isLoading = false;
//   // open the QR code popup
//   console.log("response received to create invoice to pass to popup", res);
//   this.dialog.open(QrPopupComponent, {
//     data: res
//   })
// }
// ).catch((err) => {
//   this.isLoading = false;
//   console.log(err);
// }
// );

// send the invoice to the server and get the QR code. Receiving an observable