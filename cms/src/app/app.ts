import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Header } from './header';
import { Contacts } from './contacts/contacts';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Header,Contacts], // <-- import the standalone component here
  standalone: true
})
export class App {}

bootstrapApplication(App);