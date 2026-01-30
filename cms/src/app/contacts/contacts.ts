import { Component } from '@angular/core';
import { ContactList } from './contact-list/contact-list';
import { ContactDetail } from './contact-detail/contact-detail';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.css'],
  imports: [ContactList, ContactDetail] 
})
export class Contacts {}