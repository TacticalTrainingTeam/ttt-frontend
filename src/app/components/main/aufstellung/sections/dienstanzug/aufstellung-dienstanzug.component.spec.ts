import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AufstellungDienstanzugComponent, UniformBadge } from './aufstellung-dienstanzug.component';

describe('AufstellungDienstanzugComponent', () => {
    let component: AufstellungDienstanzugComponent;
    let fixture: ComponentFixture<AufstellungDienstanzugComponent>;

    const badge = (id: string): UniformBadge => ({ id, image: `/img/${id}.svg`, label: id });

    const setRibbons = (ribbons: UniformBadge[]) => {
        fixture.componentRef.setInput('ribbons', ribbons);
        fixture.detectChanges();
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AufstellungDienstanzugComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AufstellungDienstanzugComponent);
        component = fixture.componentInstance;
        setRibbons([]);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should place nothing without ribbons', () => {
        expect(component.placedRibbons()).toEqual([]);
    });

    it('should place every ribbon', () => {
        setRibbons([badge('a'), badge('b'), badge('c'), badge('d'), badge('e')]);

        expect(component.placedRibbons()).toHaveLength(5);
    });

    it('should keep the last row anchored above the pocket', () => {
        setRibbons([badge('a')]);
        const single = component.placedRibbons()[0].y;

        setRibbons([badge('a'), badge('b'), badge('c'), badge('d'), badge('e')]);
        const placed = component.placedRibbons();

        expect(placed[placed.length - 1].y).toBe(single);
    });

    it('should center an incomplete top row', () => {
        setRibbons([badge('a'), badge('b'), badge('c'), badge('d'), badge('e')]);
        const placed = component.placedRibbons();

        expect(placed[0].y).toBeLessThan(placed[1].y);
        expect(placed[0].x).toBeGreaterThan(placed[1].x);
    });

    it('should hang at most three departments', () => {
        fixture.componentRef.setInput('departments', [badge('a'), badge('b'), badge('c'), badge('d')]);
        fixture.detectChanges();

        expect(component.placedDepartments()).toHaveLength(3);
    });

    it('should chain each department below the previous one', () => {
        fixture.componentRef.setInput('departments', [badge('a'), badge('b')]);
        fixture.detectChanges();
        const [first, second] = component.placedDepartments();

        expect(second.y).toBeGreaterThan(first.y);
        expect(second.strapY).toBeGreaterThan(first.y);
    });

    it('should resolve the shoulder board of the rank', () => {
        fixture.componentRef.setInput('rank', 'offizier');
        fixture.detectChanges();

        expect(component.rankImage()).toBe('/img/ranks/ttt-schulterklappe-offizier.svg');
    });

    it('should have no shoulder board without a rank', () => {
        expect(component.rankImage()).toBeNull();
    });

    it('should show the label of a clicked badge', () => {
        setRibbons([badge('a'), badge('b')]);
        const [first] = component.placedRibbons();

        component.selectBadge(first.id, first.label, first.anchorX, first.anchorY);

        expect(component.activeLabel()?.text).toBe('a');
    });

    it('should hide the label when the same badge is clicked again', () => {
        setRibbons([badge('a')]);
        const [first] = component.placedRibbons();

        component.selectBadge(first.id, first.label, first.anchorX, first.anchorY);
        component.selectBadge(first.id, first.label, first.anchorX, first.anchorY);

        expect(component.activeLabel()).toBeNull();
    });

    it('should switch the label when another badge is clicked', () => {
        setRibbons([badge('a'), badge('b')]);
        const [first, second] = component.placedRibbons();

        component.selectBadge(first.id, first.label, first.anchorX, first.anchorY);
        component.selectBadge(second.id, second.label, second.anchorX, second.anchorY);

        expect(component.activeLabel()?.text).toBe('b');
    });

    it('should anchor the label inside the viewBox', () => {
        setRibbons([badge('a')]);
        const [first] = component.placedRibbons();

        component.selectBadge(first.id, first.label, first.anchorX, first.anchorY);
        const active = component.activeLabel()!;

        expect(Number.parseFloat(active.left)).toBeGreaterThan(0);
        expect(Number.parseFloat(active.left)).toBeLessThan(100);
        expect(Number.parseFloat(active.top)).toBeGreaterThan(0);
        expect(Number.parseFloat(active.top)).toBeLessThan(100);
    });
});
