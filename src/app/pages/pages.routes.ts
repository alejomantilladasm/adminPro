import { Routes, RouterModule } from '@angular/router';

import { DashBoardComponent } from './dash-board/dash-board.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';

const pagesRoutes: Routes = [
  { path: '',
  component: PagesComponent,
  children: [
    { path: 'dashboard', component: DashBoardComponent },
    { path: 'progress', component: ProgressComponent },
    { path: 'graficas1', component: Graficas1Component },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
  ]
}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
