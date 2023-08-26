import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit{
  // invoiceId from params
  invoiceId: any;
  private sub: any;
  // invoice data from server
  // invoiceData: any;

  displayedColumns = ['item', 'units', 'total'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private route: ActivatedRoute, public serverService: ServerService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(async params => {
      this.invoiceId = params['id'];
      console.log(this.invoiceId);
      await this.serverService.getInvoice(this.invoiceId).then((data) => {
        // this.invoiceData = JSON.stringify(data);
        // console.log(this.invoiceData);
        this.dataSource.data = data?.['items'].map((item: any) => {
          return {
            name: item.name,
            price: item.price,
            units: item.units,
            total: item.price * item.units
          }
        });
      }
      );
    });
  }

  getTotalCost() {
    return  this.dataSource.data.map((t: any) => t.total).reduce((acc: any, value: any) => acc + value, 0);
  }
}
