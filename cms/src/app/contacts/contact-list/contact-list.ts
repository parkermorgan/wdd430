import { Component, EventEmitter, Output } from '@angular/core';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  group: any;
}

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})

export class ContactList {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    {
      id: 1,
      name: 'R. Kent Jackson',
      email: 'jacksonk@byui.edu',
      phone: '208-496-3771',
      imageUrl: 'assets/images/jacksonk.jpg',
      group: null
    },
    {
      id: 2,
      name: 'Rex Barzee',
      email: 'barzeer@byui.edu',
      phone: '208-496-3768',
      imageUrl: 'assets/images/barzeer.jpg',
      group: null
    }
  ];

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}
