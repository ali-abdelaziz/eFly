import { NgModule } from '@angular/core';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [TruncatePipe],
  exports: [TruncatePipe]
})
export class SharedModule {}
