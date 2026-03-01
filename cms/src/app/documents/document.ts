import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  public documents: Document[] = [];
  public documentSelectedEvent = new EventEmitter<Document>();
  public documentChangedEvent = new EventEmitter<Document[]>();
  public documentListChangedEvent = new BehaviorSubject<Document[]>([]);
  public maxDocumentId: number = 0;

  private url = 'https://pjmcms-default-rtdb.firebaseio.com/documents.json';

  constructor(private http: HttpClient) {
    console.log('service created');
    this.getDocuments();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getDocuments(): void {
    console.log('getDocuments called');
    this.http.get<Document[]>(this.url)
      .subscribe(
        (documents: Document[]) => {
          console.log('documents received:', documents);
          this.documents = documents || [];
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getDocument(id: string): Document | null {
    const document = this.documents.find(doc => doc.id === id);
    return document || null;
  }

  saveDocuments(): void {
    this.documentListChangedEvent.next(this.documents.slice());
    this.http.put(this.url, this.documents)
      .subscribe(
        () => {},
        (error: any) => {
          console.log(error);
        }
      );
  }

  addDocument(newDocument: Document): void {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.saveDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.saveDocuments();
  }

  deleteDocument(document: Document): void {
    if (!document) {
      return;
    }
    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.saveDocuments();
  }
}