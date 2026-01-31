import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  group: any;
}

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ContactList {
  contacts: Contact[] = [
    {
      id: '1',
      name: 'R. Kent Jackson',
      email: 'jacksonk@byui.edu',
      phone: '208-496-3771',
      imageUrl: 'assets/images/jacksonk.jpg',
      group: null
    },
    {
      id: '2',
      name: 'Rex Barzee',
      email: 'barzeer@byui.edu',
      phone: '208-496-3768',
      imageUrl: 'assets/images/barzeer.jpg',
      group: null
    }
  ];
}