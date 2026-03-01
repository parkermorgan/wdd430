import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css'],
})
export class ContactList implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  subscription!: Subscription;
  term: string = '';

  constructor(public contactService: ContactService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
        this.filteredContacts = contactsList;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isMemberActive(member: Contact): boolean {
    return this.contacts.some(c => c.id === member.id);
  }

  search(value: string) {
    this.term = value;
    if (value && value.trim().length > 0) {
      this.filteredContacts = this.contacts.filter(
        (contact: Contact) => contact.name.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filteredContacts = this.contacts;
    }
    this.cdr.detectChanges();
  }
}