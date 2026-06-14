import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/main/home/home.component').then((m) => m.HomeComponent),
        title: 'Tactical Training Team',
        pathMatch: 'full',
    },
    {
        path: 'impressum',
        loadComponent: () => import('./components/main/impressum/impressum.component').then((m) => m.ImpressumComponent),
        title: 'Impressum - Tactical Training Team',
    },
    {
        path: 'datenschutz',
        loadComponent: () => import('./components/main/datenschutz/datenschutz.component').then((m) => m.DatenschutzComponent),
        title: 'Datenschutz - Tactical Training Team',
    },
    {
        path: 'datenschutz/social-media',
        loadComponent: () =>
            import('./components/main/datenschutz/datenschutz-social-media.component').then((m) => m.DatenschutzSocialMediaComponent),
        title: 'Datenschutz für Social Media - Tactical Training Team',
    },
    {
        path: 'chronik',
        loadComponent: () => import('./components/main/chronik/chronik.component').then((m) => m.ChronikComponent),
        title: 'Chronik - Tactical Training Team',
    },
    {
        path: 'mitmachen',
        loadComponent: () => import('./components/main/mitmachen/mitmachen.component').then((m) => m.MitmachenComponent),
        title: 'Mitmachen - Tactical Training Team',
    },
    {
        path: 'medien',
        loadComponent: () => import('./components/main/medien/medien.component').then((m) => m.MedienComponent),
        title: 'Medien - Tactical Training Team',
    },
    {
        path: 'aufstellung',
        loadComponent: () => import('./components/main/aufstellung/aufstellung.component').then((m) => m.AufstellungComponent),
        title: 'Aufstellung - Tactical Training Team',
    },
    // Wildcard route - redirect unknown routes to home
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
