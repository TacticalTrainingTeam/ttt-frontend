import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { HomeFeaturesJoinComponent } from './sections/features-join/home-features-join.component';
import { HomeHeroSliderComponent } from './sections/hero-slider/home-hero-slider.component';
import { HomeGalleryComponent } from './sections/gallery/home-gallery.component';
import { HomeOrbatComponent } from './sections/orbat/home-orbat.component';
import { HomeBannerSlide, HomeCommunityStat, HomeGalleryImage } from '../../../shared/types/home.types';

@Component({
    selector: 'ttt-home',
    standalone: true,
    imports: [HomeHeroSliderComponent, HomeFeaturesJoinComponent, HomeGalleryComponent, HomeOrbatComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    // Services
    private readonly memberService = inject(MemberService);

    // Public readonly properties
    readonly bannerSlides: HomeBannerSlide[] = [
        {
            image: '/img/home-banner/home-banner1.webp',
            title: 'TACTICAL TRAINING <span class="text-tttRed">TEAM</span>',
            titleText: 'TACTICAL TRAINING TEAM',
            subtitle:
                'Als eine der größeren Arma-Gemeinschaften im deutschsprachigen Raum bieten wir dir das volle Paket: Von Ausbildung und Training bis hin zu Events und Kampagnen ist alles dabei.',
        },
        {
            image: '/img/home-banner/home-banner2.webp',
            title: 'REALISTISCHES <span class="text-tttRed">MILSIM</span>',
            titleText: 'REALISTISCHES MILSIM',
            subtitle:
                'Erlebe authentische militärische Simulation in Arma 3 und Arma Reforger mit taktischem Tiefgang und koordinierten Großoperationen.',
        },
        {
            image: '/img/home-banner/home-banner3.webp',
            title: 'STARKE <span class="text-tttRed">COMMUNITY</span>',
            titleText: 'STARKE COMMUNITY',
            subtitle:
                'Über 80 aktive Community-Mitglieder, regelmäßige Missionen und eine europaweite vernetzte MilSim-Community erwarten dich.',
        },
    ];
    readonly galleryImages: HomeGalleryImage[] = [
        {
            itemImageSrc: '/img/home-gallery/gallery-img1.webp',
            alt: 'TTT Community Moment 1',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img2.webp',
            alt: 'TTT Community Moment 2',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img3.webp',
            alt: 'TTT Community Moment 3',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img4.webp',
            alt: 'TTT Community Moment 4',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img5.webp',
            alt: 'TTT Community Moment 5',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img6.webp',
            alt: 'TTT Community Moment 6',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img7.webp',
            alt: 'TTT Community Moment 7',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img8.webp',
            alt: 'TTT Community Moment 8',
        },
    ];

    // Public mutable state
    readonly communityStats = signal<HomeCommunityStat[]>([
        { value: '80+', label: 'Mitglieder', color: 'text-tttGreen' },
        { value: '2013', label: 'Gegründet', color: 'text-tttGreen' },
        { value: '2', label: 'Events/Woche', color: 'text-tttGreen' },
    ]);
    // Lifecycle hooks
    ngOnInit(): void {
        this.memberService.getMemberStats().subscribe((stats) => {
            const total = Object.values(stats).reduce((sum, n) => sum + n, 0);
            this.communityStats.update((current) => [{ ...current[0], value: total.toString() }, ...current.slice(1)]);
        });
    }
}
