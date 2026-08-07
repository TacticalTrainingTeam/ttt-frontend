import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
// Temporaer deaktiviert bis die Member-API live ist
// import { OnInit, inject } from '@angular/core';
// import { MemberService } from '../../../core/services/member.service';
import { HomeFeaturesJoinComponent } from './sections/features-join/home-features-join.component';
import { HomeHeroSliderComponent } from './sections/hero-slider/home-hero-slider.component';
import { HomeBranchesComponent } from './sections/branches/home-branches.component';
import { HomeGalleryComponent } from './sections/gallery/home-gallery.component';
import { HomeOrbatComponent } from './sections/orbat/home-orbat.component';
import { HomeBannerSlide, HomeBranch, HomeCommunityStat, HomeGalleryImage } from '../../../shared/types/home.types';

@Component({
    selector: 'ttt-home',
    standalone: true,
    imports: [HomeHeroSliderComponent, HomeFeaturesJoinComponent, HomeBranchesComponent, HomeGalleryComponent, HomeOrbatComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    // Temporaer deaktiviert bis die Member-API live ist
    // private readonly memberService = inject(MemberService);

    readonly bannerSlides: HomeBannerSlide[] = [
        {
            image: '/img/banner/banner-img1.webp',
            title: 'TACTICAL TRAINING',
            titleAccent: 'TEAM',
            subtitle:
                'Als eine der größeren Arma-Gemeinschaften im deutschsprachigen Raum bieten wir dir das volle Paket: Von Ausbildung und Training bis hin zu Events und Kampagnen ist alles dabei.',
        },
        {
            image: '/img/banner/banner-img2.webp',
            title: 'REALISTISCHES',
            titleAccent: 'MILSIM',
            subtitle:
                'Erlebe authentische militärische Simulation in Arma 3 und Arma Reforger mit taktischem Tiefgang und koordinierten Großoperationen.',
        },
        {
            image: '/img/banner/banner-img3.webp',
            title: 'STARKE',
            titleAccent: 'COMMUNITY',
            subtitle:
                'Über 80 aktive Community-Mitglieder, regelmäßige Missionen und eine europaweite vernetzte MilSim-Community erwarten dich.',
        },
    ];
    readonly galleryImages: HomeGalleryImage[] = [
        {
            itemImageSrc: '/img/gallery/gallery-img1.webp',
            alt: 'TTT Community Moment 1',
        },
        {
            itemImageSrc: '/img/gallery/gallery-img2.webp',
            alt: 'TTT Community Moment 2',
        },
        {
            itemImageSrc: '/img/gallery/gallery-img3.webp',
            alt: 'TTT Community Moment 3',
        },
        {
            itemImageSrc: '/img/gallery/gallery-img4.webp',
            alt: 'TTT Community Moment 4',
        },
        {
            itemImageSrc: '/img/gallery/gallery-img5.webp',
            alt: 'TTT Community Moment 5',
        },
        {
            itemImageSrc: '/img/gallery/gallery-img6.webp',
            alt: 'TTT Community Moment 6',
        },
        {
            itemImageSrc: '/img/gallery/gallery-img7.webp',
            alt: 'TTT Community Moment 7',
        },
        {
            itemImageSrc: '/img/gallery/gallery-img8.webp',
            alt: 'TTT Community Moment 8',
        },
    ];

    readonly branches: HomeBranch[] = [
        {
            id: 'infanterie',
            name: 'Infanterie',
            icon: '/img/truppengattungen/icon-infanterie.webp',
            description: 'Aufklärung, Angriff und Häuserkampf im Trupp.',
        },
        {
            id: 'gepanzerte-kraefte',
            name: 'Gepanzerte Kräfte',
            icon: '/img/truppengattungen/icon-gepanzertekraefte.webp',
            description: 'Kampf- und Schützenpanzer im Verbund.',
        },
        {
            id: 'luftstreitkraefte',
            name: 'Luftstreitkräfte',
            icon: '/img/truppengattungen/icon-luftstreitkraefte.webp',
            description: 'Transport, Aufklärung und Luftnahunterstützung.',
        },
        {
            id: 'kampfunterstuetzung',
            name: 'Kampfunterstützungskräfte',
            icon: '/img/truppengattungen/icon-kampfunterstuetzungskraefte.webp',
            description: 'Artillerie, Mörser, Pioniere und JTAC.',
        },
        {
            id: 'nachschubkraefte',
            name: 'Nachschubkräfte',
            icon: '/img/truppengattungen/icon-nachschubkraefte.webp',
            description: 'Logistik und Sanitätsdienst.',
        },
    ];

    readonly communityStats = signal<HomeCommunityStat[]>([
        { value: '80+', label: 'Mitglieder', color: 'text-tttGreen' },
        { value: '2013', label: 'Gegründet', color: 'text-tttGreen' },
        { value: '2', label: 'Events/Woche', color: 'text-tttGreen' },
    ]);
    // Temporaer deaktiviert bis die Member-API live ist - zeigt solange die statischen Kennzahlen
    // ngOnInit(): void {
    //     this.memberService.getMemberStats().subscribe({
    //         next: (stats) => {
    //             const total = Object.values(stats).reduce((sum, n) => sum + n, 0);
    //             this.communityStats.update((current) => [{ ...current[0], value: total.toString() }, ...current.slice(1)]);
    //         },
    //         error: () => undefined,
    //     });
    // }
}
