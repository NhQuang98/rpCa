import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DSComponent } from './list/ds.component';
import { DSDetailComponent } from './detail/ds-detail.component';
import { DSRoutingModule } from './route/ds-routing.module';

@NgModule({
  imports: [SharedModule, DSRoutingModule],
  declarations: [DSComponent, DSDetailComponent],
})
export class DSModule {}
