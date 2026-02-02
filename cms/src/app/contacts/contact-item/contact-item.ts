import { Component, Input } from '@angular/core';
import { Contact } from '../contact-list/contact-list';

@Component({
  selector: 'cms-contact-item',
  standalone: false,
  templateUrl: './contact-item.html',
  styleUrls: ['./contact-item.css'],
})
export class ContactItem {
  @Input() contact!: Contact; 
}