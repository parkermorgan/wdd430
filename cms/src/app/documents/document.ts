import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  public documents: Document[] = [];
  public documentSelectedEvent = new EventEmitter<Document>();
  public documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    const document = this.documents.find(doc => doc.id === id);
    return document || null;
  }

  deleteDocument(document: Document): void {
    if (!document) {
      return;
    }
    const index = this.documents.indexOf(document);
    if (index > -1) {
      this.documents.splice(index, 1);
      this.documentChangedEvent.emit(this.documents.slice());
    }
  }
}