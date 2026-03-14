import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  public documents: Document[] = [];
  public documentSelectedEvent = new EventEmitter<Document>();
  public documentChangedEvent = new EventEmitter<Document[]>();
  public documentListChangedEvent = new BehaviorSubject<Document[]>([]);
  public maxDocumentId: number = 0;

  constructor(private http: HttpClient) {
    console.log('service created');
    this.getDocuments();
  }

  sortAndSend() {
    this.documents.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocuments(): void {
    this.http.get<{ message: string, obj: Document[] }>('http://localhost:3000/documents')
      .subscribe(
        (responseData) => {
          this.documents = responseData.obj;
          this.sortAndSend();
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

  addDocument(document: Document): void {
    if (!document) {
      return;
    }

    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
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
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: any) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

  deleteDocument(document: Document): void {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: any) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}