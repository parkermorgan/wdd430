import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact';
import { Contact } from '../../contacts/contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrl: './message-item.css',
})
export class MessageItem implements OnInit, OnDestroy {
  @Input() message!: Message;
  messageSender!: string;
  subscription!: Subscription;

  constructor(private contactService: ContactService, private cdr: ChangeDetectorRef) {}

  getSenderName(): void {
    const contact: Contact | null = this.contactService.getContact(this.message.sender);
    this.messageSender = contact?.name ?? this.message.sender;
  }

  ngOnInit() {
    this.getSenderName();

    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        if (contacts && contacts.length > 0) {
          this.getSenderName();
          this.cdr.detectChanges();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}