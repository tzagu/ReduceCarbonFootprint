import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServerService } from '../server.service';

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

  constructor(public serverService: ServerService) { }

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

  generateQRCode() { // send table data to the QR code generator
    const firestoreDoc = {
      items: this.buyingItems,
    }
    this.serverService.addInvoice(firestoreDoc);
  }

}
