import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routes } from 'app/app.routes';
import { PortfolioListComponent } from 'app/components';
import { AuthGuard } from 'app/guards/auth.guard';
import { DefaultLayoutComponent } from 'app/layouts/default-layout/default-layout.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        canActivate: [AuthGuard],
        path: routes.dashboard.index,
        children: [
          {
            path: routes.dashboard.portfolios,
            component: PortfolioListComponent,
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
