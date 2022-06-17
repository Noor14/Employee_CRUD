import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  @Input() data : any= {};

  constructor(
    public readonly _activeModal: NgbActiveModal 
  ) { }

  ngOnInit(): void {
  }
  close(response: boolean) {
    this._activeModal.close(response);
  }
}
