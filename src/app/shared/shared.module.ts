import { NgModule } from '@angular/core';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [TruncatePipe, FilterPipe],
  exports: [TruncatePipe, FilterPipe]
})
export class SharedModule {}
