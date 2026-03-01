import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document';
import { Document as CmsDocument } from '../document.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrls: ['./document-list.css']
})
export class DocumentListComponent implements OnInit {

  constructor(public documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.getDocuments();
  }

}