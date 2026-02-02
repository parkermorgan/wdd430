import { Component, Input } from '@angular/core';
import { Contact } from '../contact-list/contact-list';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css',
})
export class ContactDetail {
  @Input() contact!: Contact;
}
