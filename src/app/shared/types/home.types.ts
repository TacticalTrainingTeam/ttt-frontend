export interface HomeBannerSlide {
    image: string;
    title: string;
    /** Last part of the title, rendered in the TTT accent color */
    titleAccent: string;
    subtitle: string;
}

export interface HomeGalleryImage {
    itemImageSrc: string;
    alt: string;
}

export interface HomeCommunityStat {
    value: string;
    label: string;
    color: string;
}

export interface HomeBranch {
    id: string;
    name: string;
    icon: string;
    description: string;
}
