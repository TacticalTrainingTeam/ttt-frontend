import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/main/home/home.component').then((m) => m.HomeComponent),
        title: 'Tactical Training Team – Deutsche Arma 3 & Arma Reforger MilSim Community',
        pathMatch: 'full',
    },
    {
        path: 'impressum',
        loadComponent: () => import('./components/main/impressum/impressum.component').then((m) => m.ImpressumComponent),
        title: 'Impressum | Tactical Training Team',
    },
    {
        path: 'datenschutz',
        loadComponent: () => import('./components/main/datenschutz/datenschutz.component').then((m) => m.DatenschutzComponent),
        title: 'Datenschutz | Tactical Training Team',
    },
    {
        path: 'datenschutz/social-media',
        loadComponent: () =>
            import('./components/main/datenschutz/datenschutz-social-media.component').then((m) => m.DatenschutzSocialMediaComponent),
        title: 'Datenschutz für Social Media | Tactical Training Team',
    },
    {
        path: 'chronik',
        loadComponent: () => import('./components/main/chronik/chronik.component').then((m) => m.ChronikComponent),
        title: 'Chronik – Unsere Geschichte seit 2013 | Tactical Training Team',
    },
    {
        path: 'mitmachen',
        loadComponent: () => import('./components/main/mitmachen/mitmachen.component').then((m) => m.MitmachenComponent),
        title: 'Mitmachen – Arma Events | Tactical Training Team',
    },
    {
        path: 'medien',
        loadComponent: () => import('./components/main/medien/medien.component').then((m) => m.MedienComponent),
        title: 'Medien & Streams | Tactical Training Team',
    },
    {
        path: 'aufstellung',
        loadComponent: () => import('./components/main/aufstellung/aufstellung.component').then((m) => m.AufstellungComponent),
        title: 'Aufstellung & Mitglieder | Tactical Training Team',
    },
    {
        path: 'intern',
        loadChildren: () => import('./components/main/intern/intern.routes').then((m) => m.INTERN_ROUTES),
    },
    // Wildcard route - redirect unknown routes to home
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
