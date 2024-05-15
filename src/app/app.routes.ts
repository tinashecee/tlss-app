import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'chiefs',
    loadComponent: () =>
      import('./components/chiefs-list/chiefs-list.component').then(
        (m) => m.ChiefsListComponent
      ),
  },
  {
    path: 'headman',
    loadComponent: () =>
      import('./components/headman-list/headman-list.component').then(
        (m) => m.HeadmanListComponent
      ),
  },
  {
    path: 'villagehead',
    loadComponent: () =>
      import('./components/villagehead-list/villagehead-list.component').then(
        (m) => m.VillageheadListComponent
      ),
  },
  {
    path: 'chief-info/:id',
    loadComponent: () =>
      import('./components/chief-view/chief-view.component').then(
        (m) => m.ChiefViewComponent
      ),
  },
  {
    path: 'chieftainship',
    loadComponent: () =>
      import(
        './components/chieftainship-list/chieftainship-list.component'
      ).then((m) => m.ChieftainshipListComponent),
  },
  {
    path: 'chieftainship-view/:id',
    loadComponent: () =>
      import(
        './components/chieftainship-view/chieftainship-view.component'
      ).then((m) => m.ChieftainshipViewComponent),
  },
  {
    path: 'headmanship',
    loadComponent: () =>
      import('./components/headmanship-list/headmanship-list.component').then(
        (m) => m.HeadmanshipListComponent
      ),
  },
  {
    path: 'headmanship-view/:id',
    loadComponent: () =>
      import('./components/headmanship-view/headmanship-view.component').then(
        (m) => m.HeadmanshipViewComponent
      ),
  },
  {
    path: 'villages',
    loadComponent: () =>
      import('./components/villages-list/villages-list.component').then(
        (m) => m.VillagesListComponent
      ),
  },
  {
    path: 'village-view/:id',
    loadComponent: () =>
      import('./components/village-view/village-view.component').then(
        (m) => m.VillageViewComponent
      ),
  },
];
