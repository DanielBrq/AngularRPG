import { Routes } from '@angular/router';
import { Menu } from '@src/app/ui/scene/menu/menu';
import { NotFound } from '@src/app/ui/scene/not-found/not-found';

export const routes: Routes = [
    { path: 'menu', component: Menu },
    { path: '**', component: NotFound }
];
