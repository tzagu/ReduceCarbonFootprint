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

   async addInvoice(invoice: any) {
    try {
      const invoiceCollection = collection(this.firestore, 'invoices');
      const invoiceRef = await addDoc(invoiceCollection, invoice);
      console.log('Invoice added with ID: ', invoiceRef.id);
      const qrCodeBlob: Blob | undefined = await this.generateQrCode(invoiceRef.id);
      
      if (qrCodeBlob) {
        return URL.createObjectURL(qrCodeBlob); // Convert Blob to Object URL
      } else {
        throw new Error('Failed to generate QR code.');
      }
    } catch (error) {
      console.error('Error adding invoice:', error);
      throw error;
    }
  }

  async generateQrCode(id: any) {
    const url = `http://localhost:4200/view-invoice/${id.toString()}`;
    console.log('fetching qr code for url: ', url);
    const qr = this.http.get('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + url, { responseType: 'blob' });
    return qr.toPromise(); // Convert Observable to Promise
  }

  async getInvoice(id: any){
    const invoiceRef = doc(this.firestore, 'invoices', id);
    const invoiceSnap = await getDoc(invoiceRef);
    if (invoiceSnap.exists()) {
      console.log('Document data:', invoiceSnap.data());
      return invoiceSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
      return null;
    }
  }
}
