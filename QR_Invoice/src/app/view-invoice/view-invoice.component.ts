import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';
import { MatTableDataSource } from '@angular/material/table';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit{
  // invoiceId from params
  invoiceId: any;
  private sub: any;
  isLoading = true;

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
        this.isLoading = false;
      }
      );
    });
  }

  getTotalCost() {
    return  this.dataSource.data.map((t: any) => t.total).reduce((acc: any, value: any) => acc + value, 0);
  }

  downloadInvoice() {
    console.log('download invoice');
    const doc = new jsPDF();
    autoTable(doc, { html: '#table' });
    doc.save(this.invoiceId + '.pdf');
  }
}
