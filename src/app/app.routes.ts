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
    path: 'headman-info/:id',
    loadComponent: () =>
      import('./components/headman-view/headman-view.component').then(
        (m) => m.HeadmanViewComponent
      ),
  },
  {
    path: 'villagehead-info/:id',
    loadComponent: () =>
      import('./components/villagehead-view/villagehead-view.component').then(
        (m) => m.VillageheadViewComponent
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
  {
    path: 'chief-lineage',
    loadComponent: () =>
      import('./components/chief-lineage/chief-lineage.component').then(
        (m) => m.ChiefLineageComponent
      ),
  },
  {
    path: 'headman-lineage',
    loadComponent: () =>
      import('./components/headman-lineage/headman-lineage.component').then(
        (m) => m.HeadmanLineageComponent
      ),
  },
  {
    path: 'villagehead-lineage',
    loadComponent: () =>
      import(
        './components/villagehead-lineage/villagehead-lineage.component'
      ).then((m) => m.VillageheadLineageComponent),
  },
  {
    path: 'appoint-chief',
    loadComponent: () =>
      import('./components/appoint-chief/appoint-chief.component').then(
        (m) => m.AppointChiefComponent
      ),
  },
  {
    path: 'appoint-headman',
    loadComponent: () =>
      import('./components/appoint-headman/appoint-headman.component').then(
        (m) => m.AppointHeadmanComponent
      ),
  },
];
