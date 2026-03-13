import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitmachenJoinPathsComponent } from './mitmachen-join-paths.component';

describe('MitmachenJoinPathsComponent', () => {
    let component: MitmachenJoinPathsComponent;
    let fixture: ComponentFixture<MitmachenJoinPathsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MitmachenJoinPathsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MitmachenJoinPathsComponent);
        component = fixture.componentInstance;
        component.discordUrl = 'https://discord.tacticalteam.de';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
