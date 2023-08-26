import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { environment } from '../app/env/env.prod';
import { initializeApp } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private app: any; // Firebase app instance

  firestore: Firestore = inject(Firestore);
  constructor( private http: HttpClient) {
    this.app = initializeApp(environment.firebaseConfig);
    console.log(this.app);
   }

  async addInvoice(invoice: any){
    const invoiceCollection = collection(this.firestore, 'invoices');
    const invoiceRef = await addDoc(invoiceCollection, invoice);
    console.log('Invoice added with ID: ', invoiceRef.id);
    const qrCode = await this.generateQrCode(invoiceRef.id);
    console.log(qrCode);
    return invoiceRef.id;
  }

  async generateQrCode(id: any) {
    const url = `localhost:4200/invoice/?id=${id}`;
    return this.http.get('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + url);
  }
}
