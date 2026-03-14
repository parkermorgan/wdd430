import { Message } from './message.model';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public messages: Message[] = [];
  messageChangedEvent = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  getMessages(): void {
    this.http.get<{ message: string, obj: Message[] }>('http://localhost:3000/messages')
      .subscribe(
        (responseData) => {
          this.messages = responseData.obj;
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMessage(id: string): Message | null {
    const message = this.messages.find(msg => msg.id === id);
    return message || null;
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, obj: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.obj);
          this.messageChangedEvent.next(this.messages.slice());
        }
      );
  }

  updateMessage(originalMessage: Message, newMessage: Message): void {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === originalMessage.id);
    if (pos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;
    newMessage._id = originalMessage._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/messages/' + originalMessage.id,
      newMessage, { headers: headers })
      .subscribe(
        (response: any) => {
          this.messages[pos] = newMessage;
          this.messageChangedEvent.next(this.messages.slice());
        }
      );
  }

  deleteMessage(message: Message): void {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === message.id);
    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/messages/' + message.id)
      .subscribe(
        (response: any) => {
          this.messages.splice(pos, 1);
          this.messageChangedEvent.next(this.messages.slice());
        }
      );
  }
}