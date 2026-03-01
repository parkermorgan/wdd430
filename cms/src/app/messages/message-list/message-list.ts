import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList implements OnInit {
  messages: Message[] = [];

  constructor(public messageService: MessageService) {}

  ngOnInit() {
    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  onAddMessage(message: Message) {
    this.messageService.addMessage(message);
  }
}