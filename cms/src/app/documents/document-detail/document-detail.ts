import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document';
import { Document } from '../document.model';
import { WinRefService } from '../../win-ref';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css',
})
export class DocumentDetail implements OnInit {
  nativeWindow: any;
  document: Document | null = null;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private windowRefService: WinRefService
  ) {}

  ngOnInit(): void {
    this.nativeWindow = this.windowRefService.getNativeWindow();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
    });
  }

  onView() {
    if (this.document?.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
  if (this.document) {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
}
