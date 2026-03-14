import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public contacts: Contact[] = [];
  public contactSelectedEvent = new EventEmitter<Contact>();
  public contactChangedEvent = new EventEmitter<Contact[]>();
  public contactListChangedEvent = new BehaviorSubject<Contact[]>([]);

  constructor(private http: HttpClient) {
    this.getContacts();
  }

  sortAndSend() {
    this.contacts.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getContacts(): void {
    this.http.get<{ message: string, obj: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(
        (responseData) => {
          this.contacts = responseData.obj;
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getContact(id: string): Contact | null {
    const contact = this.contacts.find(contact => contact.id === id);
    return contact ? contact : null;
  }

  addContact(newContact: Contact): void {
    if (!newContact) {
      return;
    }

    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, obj: Contact }>('http://localhost:3000/contacts',
      newContact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.obj);
          this.sortAndSend();
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: any) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: any) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}