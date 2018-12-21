import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailerService {
  urlContact: string = 'http://localhost:3000/contact';
  urlTask: string = 'http://localhost:3000/send';
  constructor(private http: HttpClient) { }

  sendMessage(messageContent: any) {
    console.log(JSON.stringify(messageContent));
    return this.http.post(this.urlContact,
        JSON.stringify(messageContent),
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
  }

  sendNotification(messageContent: any) {
    console.log(JSON.stringify(messageContent));
    return this.http.post(this.urlTask,
        JSON.stringify(messageContent),
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
  }
}