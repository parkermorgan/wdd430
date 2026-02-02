import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  messages: Message[] = [
    new Message(1, 'Dementors', 'Expecto Patronum!', 'harrypotter@hogwarts.com'),
    new Message(2, 'Rebellion', 'May the force be with you.', 'skywalker@tatooine.com'),
    new Message(3, 'Snakes', 'Why does it have to be snakes?', 'doctorjones@marshall.com')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
