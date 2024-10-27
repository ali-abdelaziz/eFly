import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-text-button',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './text-button.component.html',
  styleUrl: './text-button.component.scss'
})
export class TextButtonComponent {


  @Input() label:string = ""
  @Input() icon:string = ""
  @Input() textColorClass:string = "blue-600"
  @Input() fontClass:string = "label-regular"
  @Input() showIcon:boolean = true

  @Output() handleClick = new EventEmitter<any>()

  classesList:any[]=[]

  ngOnInit() {
  this.classesList.push(this.textColorClass);
  this.classesList.push(this.fontClass);

  }

  click(){
    this.handleClick.emit()
  }


}
