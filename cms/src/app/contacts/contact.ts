import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public contacts: Contact[] = [];
  public contactSelectedEvent = new EventEmitter<Contact>();
  public contactChangedEvent = new EventEmitter<Contact[]>();
  public contactListChangedEvent = new BehaviorSubject<Contact[]>([]);
  public maxContactId: number = 0;

  private url = 'https://pjmcms-default-rtdb.firebaseio.com/contacts.json';

  constructor(private http: HttpClient) {
    this.getContacts();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getContacts(): void {
    this.http.get<Contact[]>(this.url)
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts || [];
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          this.contactListChangedEvent.next(this.contacts.slice());
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

  saveContacts(): void {
    this.contactListChangedEvent.next(this.contacts.slice());
    this.http.put(this.url, this.contacts)
      .subscribe(
        () => {},
        (error: any) => {
          console.log(error);
        }
      );
  }

  addContact(newContact: Contact): void {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.saveContacts();
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
    this.contacts[pos] = newContact;

    // update references to this contact inside other contacts' group arrays
    this.contacts.forEach(contact => {
      if (contact.group) {
        const groupPos = contact.group.findIndex(m => m.id === originalContact.id);
        if (groupPos >= 0) {
          contact.group[groupPos] = newContact;
        }
      }
    });

    this.saveContacts();
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.saveContacts();
  }
}