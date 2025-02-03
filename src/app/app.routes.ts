import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './_service/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
  },
  {
    path: 'chiefs',
    loadComponent: () =>
      import('./components/chiefs-list/chiefs-list.component').then(
        (m) => m.ChiefsListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'headman',
    loadComponent: () =>
      import('./components/headman-list/headman-list.component').then(
        (m) => m.HeadmanListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'villagehead',
    loadComponent: () =>
      import('./components/villagehead-list/villagehead-list.component').then(
        (m) => m.VillageheadListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'chief-info/:id',
    loadComponent: () =>
      import('./components/chief-view/chief-view.component').then(
        (m) => m.ChiefViewComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'headman-info/:id',
    loadComponent: () =>
      import('./components/headman-view/headman-view.component').then(
        (m) => m.HeadmanViewComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'villagehead-info/:id',
    loadComponent: () =>
      import('./components/villagehead-view/villagehead-view.component').then(
        (m) => m.VillageheadViewComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'chieftainship',
    loadComponent: () =>
      import(
        './components/chieftainship-list/chieftainship-list.component'
      ).then((m) => m.ChieftainshipListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'chieftainship-view/:id',
    loadComponent: () =>
      import(
        './components/chieftainship-view/chieftainship-view.component'
      ).then((m) => m.ChieftainshipViewComponent),
    canActivate: [authGuard],
  },
  {
    path: 'headmanship',
    loadComponent: () =>
      import('./components/headmanship-list/headmanship-list.component').then(
        (m) => m.HeadmanshipListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'headmanship-view/:id',
    loadComponent: () =>
      import('./components/headmanship-view/headmanship-view.component').then(
        (m) => m.HeadmanshipViewComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'villages',
    loadComponent: () =>
      import('./components/villages-list/villages-list.component').then(
        (m) => m.VillagesListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'village-view/:id',
    loadComponent: () =>
      import('./components/village-view/village-view.component').then(
        (m) => m.VillageViewComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'chief-lineage',
    loadComponent: () =>
      import('./components/chief-lineage/chief-lineage.component').then(
        (m) => m.ChiefLineageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'headman-lineage',
    loadComponent: () =>
      import('./components/headman-lineage/headman-lineage.component').then(
        (m) => m.HeadmanLineageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'villagehead-lineage',
    loadComponent: () =>
      import(
        './components/villagehead-lineage/villagehead-lineage.component'
      ).then((m) => m.VillageheadLineageComponent),
    canActivate: [authGuard],
  },
  {
    path: 'appoint-chief',
    loadComponent: () =>
      import('./components/appoint-chief/appoint-chief.component').then(
        (m) => m.AppointChiefComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'appoint-headman',
    loadComponent: () =>
      import('./components/appoint-headman/appoint-headman.component').then(
        (m) => m.AppointHeadmanComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'edit-chief/:id',
    loadComponent: () =>
      import('./components/edit-chief/edit-chief.component').then(
        (m) => m.EditChiefComponent
      ),
    canActivate: [authGuard],
  },
  // Add a wildcard route to redirect to login
  {
    path: '**',
    redirectTo: 'login',
  },
];
