import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss'
})
export class PrimaryButtonComponent {
  @Input() label: string = '';
  @Input() prefixIcon: string = '';
  @Input() suffixIcon: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() hasDropdown: boolean = false;

  @Output() handleClick = new EventEmitter<any>();

  click() {
    this.handleClick.emit();
  }

}
