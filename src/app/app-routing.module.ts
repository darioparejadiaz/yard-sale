import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/shared/pages/not-found/not-found.component';
// import { PreloadAllModules } from '@angular/router';
// import { CustomPreloadService } from './modules/shared/services/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';

import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/website/website.module').then((m) => m.WebsiteModule),
    // data: {
    //   preload: true,
    // },
  },
  {
    path: 'cms',
    loadChildren: () =>
      import('./modules/cms/cms.module').then((m) => m.CmsModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
