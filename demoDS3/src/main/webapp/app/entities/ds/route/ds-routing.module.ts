import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DSComponent } from '../list/ds.component';
import { DSDetailComponent } from '../detail/ds-detail.component';
import { DSRoutingResolveService } from './ds-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';
import { UserManagementUpdateComponent } from '../../../admin/user-management/update/user-management-update.component';
import { UserManagementResolve } from '../../../admin/user-management/user-management.route';

const dSRoute: Routes = [
  {
    path: '',
    component: DSComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DSDetailComponent,
    resolve: {
      dS: DSRoutingResolveService,
    },
  },
  {
    path: 'edit/:id',
    component: DSDetailComponent,
    resolve: {
      dS: DSRoutingResolveService,
    },
  },
  {
    path: ':id/view',
    component: DSDetailComponent,

    resolve: {
      dS: DSRoutingResolveService,
    },

    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dSRoute)],
  exports: [RouterModule],
})
export class DSRoutingModule {}
