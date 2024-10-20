import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-custom-check-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss'],
})
export class CustomCheckBoxComponent {
  @Output() handleClick = new EventEmitter<any>()
  @Input() id: string = "";
  @Input() isChecked?: boolean = false;
  @Input() value?: any = "";
  @Input() isDisabled?: boolean = false;
  @Input() isIndeterminate?: boolean = false;
  @Input() label?: string = '';
  @Input() showfocusShadow?: boolean = true;

  click(event: any) {
    this.handleClick.emit(event)
  }
}
