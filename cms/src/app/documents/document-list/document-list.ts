import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Angular Guide', 'Official Angular documentation', 'https://angular.io/docs', []),
    new Document('2', 'TypeScript Handbook', 'Learn TypeScript basics and advanced topics', 'https://www.typescriptlang.org/docs', []),
    new Document('3', 'MDN Web Docs', 'Comprehensive web development reference', 'https://developer.mozilla.org', []),
    new Document('4', 'RxJS Documentation', 'Reactive programming with RxJS', 'https://rxjs.dev', []),
    new Document('5', 'Node.js Docs', 'Node.js runtime documentation', 'https://nodejs.org/en/docs', [])
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
