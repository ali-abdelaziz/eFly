import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [PrimaryButtonComponent, TranslateModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  constructor(private helper: HelperService) { }

  goBack() {
    this.helper.previousPage();
  }

}
