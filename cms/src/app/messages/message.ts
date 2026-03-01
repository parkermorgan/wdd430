import { Message } from './message.model';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public messages: Message[] = [];
  public maxMessageId: number = 0;
  messageChangedEvent = new BehaviorSubject<Message[]>([]);

  private url = 'https://pjmcms-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages(): void {
    this.http.get<Message[]>(this.url)
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages || [];
          this.maxMessageId = this.getMaxId();
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

  storeMessages(): void {
    this.messageChangedEvent.next(this.messages.slice());
    this.http.put(this.url, this.messages)
      .subscribe(
        () => {},
        (error: any) => {
          console.log(error);
        }
      );
  }

  addMessage(message: Message) {
    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }
}