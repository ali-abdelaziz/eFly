import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TextButtonComponent } from '../text-button/text-button.component';

@Component({
  selector: 'app-save-cancel-button',
  standalone: true,
  imports: [PrimaryButtonComponent, TextButtonComponent, TranslateModule, CommonModule],
  templateUrl: './save-cancel-button.component.html',
  styleUrl: './save-cancel-button.component.scss'
})
export class SaveCancelButtonComponent {

  @Input() saveLabel = 'common.save';
  @Input() draftLabel = 'common.draft';
  @Input() cancelLabel = 'common.cancel';
  @Input() isLoading: boolean = false;
  @Input() isSecondaryLoading: boolean = false;
  @Input() showSave: boolean = true;
  @Input() showCancel: boolean = true;
  @Input() showSecondary: boolean = false;
  @Output() handleSave = new EventEmitter<any>();
  @Output() handleSecondarySave = new EventEmitter<any>();
  @Output() handleCancel = new EventEmitter<any>();

  constructor() {}

  save() {
    this.handleSave.emit();
  }

  cancel() {
    this.handleCancel.emit();
  }

}
