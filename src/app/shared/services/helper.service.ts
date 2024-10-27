import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

export enum KeyboardEscMode {
  rest = 'Rest',
  back = 'Back',
  closeDialog = 'Close Dialog',
}

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(
    private location: Location,
  ) { }

    /**
   * go back using browser location back
   */
    previousPage() {
      this.location.back();
    }

}
