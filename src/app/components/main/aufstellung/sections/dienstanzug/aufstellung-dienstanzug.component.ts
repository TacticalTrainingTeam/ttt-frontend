import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ActivableDirective } from '../../../../../shared/directives/activable.directive';
import { RankType } from '../../../../../shared/types/member.types';

export interface UniformBadge {
    id: string;
    image: string;
    label: string;
}

interface PlacedBadge extends UniformBadge {
    x: number;
    y: number;
    /** Center of the upper edge, where the label is anchored */
    anchorX: number;
    anchorY: number;
}

interface HangerBadge extends PlacedBadge {
    strapY: number;
    strapHeight: number;
}

interface ActiveLabel {
    id: string;
    text: string;
    left: string;
    top: string;
}

const VIEW = { x: 0, y: 14, width: 430, height: 290 };
const RACK = { x: 262, bottom: 173, columns: 4, width: 20.5, height: 5.61 };
const HANGER = {
    buttonX: 140.52,
    buttonY: 193.9,
    size: 27,
    step: 30,
    firstTop: 208,
    strapWidth: 4.8,
    strapRadius: 2.4,
    /** the first strap starts behind the button so the plaque does not stick to it */
    strapLift: 5,
    max: 3,
};
/** The rank overlay covers the whole jacket, so only these hit areas make the shoulder boards clickable */
const SHOULDER = {
    left: { x: 55, y: 46, width: 70, height: 40 },
    right: { x: 305, y: 46, width: 70, height: 40 },
};
/** scaleX approximates the CSS perspective(107px) rotateY(22deg) */
const CREST = { x: 374, y: 121, width: 47, height: 53.9, rotate: -4, scaleX: 0.927 };
const MEDAL = { x: 277.4, y: 190, width: 50, height: 85.7 };
const RIGHT_FLAP = {
    button: { x: 303.38, y: 192.4, radius: 6.3 },
    path:
        'M 265.68,174.87 H 341.08 A 4.5 4.5 0 0 1 345.58,179.37 V 191.87 ' +
        'C 345.58,198.87 318.38,202.67 303.38,203.87 ' +
        'C 288.38,202.67 261.18,198.87 261.18,191.87 V 179.37 ' +
        'A 4.5 4.5 0 0 1 265.68,174.87 Z',
};

@Component({
    selector: 'ttt-aufstellung-dienstanzug',
    standalone: true,
    imports: [ActivableDirective],
    templateUrl: './aufstellung-dienstanzug.component.html',
    styleUrl: './aufstellung-dienstanzug.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AufstellungDienstanzugComponent {
    ribbons = input.required<UniformBadge[]>();
    departments = input<UniformBadge[]>([]);
    medal = input<UniformBadge | null>(null);
    rank = input<RankType | null>(null);
    rankLabel = input<string | null>(null);
    crest = input(true);

    /** Label shown after clicking a badge; null while nothing is selected */
    readonly activeLabel = signal<ActiveLabel | null>(null);

    protected readonly viewBox = `${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`;
    protected readonly rack = RACK;
    protected readonly hangerGeometry = HANGER;
    protected readonly shoulder = SHOULDER;
    protected readonly crestGeometry = CREST;
    protected readonly medalGeometry = MEDAL;
    protected readonly rightFlap = RIGHT_FLAP;

    protected readonly crestTransform =
        `translate(${CREST.x + CREST.width / 2} ${CREST.y + CREST.height / 2}) ` +
        `rotate(${CREST.rotate}) scale(${CREST.scaleX} 1) ` +
        `translate(${-(CREST.x + CREST.width / 2)} ${-(CREST.y + CREST.height / 2)})`;

    /** Bottom-anchored above the pocket; an incomplete row sits centered on top, as on a real ribbon bar */
    readonly placedRibbons = computed<PlacedBadge[]>(() => {
        const items = this.ribbons();
        const rows = Math.ceil(items.length / RACK.columns);
        const placed: PlacedBadge[] = [];
        let index = 0;

        for (let row = 0; row < rows; row++) {
            const count = row === 0 ? items.length - (rows - 1) * RACK.columns : RACK.columns;
            const rowX = RACK.x + ((RACK.columns - count) * RACK.width) / 2;

            for (let column = 0; column < count; column++) {
                const x = rowX + column * RACK.width;
                const y = RACK.bottom - (rows - row) * RACK.height;
                placed.push({ ...items[index++], x, y, anchorX: x + RACK.width / 2, anchorY: y });
            }
        }

        return placed;
    });

    /** Chain below the left pocket button; further departments stay in the list under the uniform */
    readonly placedDepartments = computed<HangerBadge[]>(() =>
        this.departments()
            .slice(0, HANGER.max)
            .map((department, index) => {
                const y = HANGER.firstTop + index * HANGER.step;
                const strapY = index === 0 ? HANGER.buttonY - HANGER.strapLift : y - (HANGER.step - HANGER.size);
                return {
                    ...department,
                    x: HANGER.buttonX - HANGER.size / 2,
                    y,
                    strapY,
                    strapHeight: y - strapY + 0.6,
                    anchorX: HANGER.buttonX,
                    anchorY: y,
                };
            })
    );

    readonly rankImage = computed(() => (this.rank() ? `/img/ranks/ttt-schulterklappe-${this.rank()}.svg` : null));

    protected readonly medalAnchor = { x: MEDAL.x + MEDAL.width / 2, y: MEDAL.y + MEDAL.height / 2 };
    protected readonly rankAnchor = {
        left: { x: SHOULDER.left.x + SHOULDER.left.width / 2, y: SHOULDER.left.y },
        right: { x: SHOULDER.right.x + SHOULDER.right.width / 2, y: SHOULDER.right.y },
    };

    /** Clicking the same badge again hides its label */
    selectBadge(id: string, text: string, anchorX: number, anchorY: number): void {
        if (this.activeLabel()?.id === id) {
            this.clearLabel();
            return;
        }
        this.activeLabel.set({
            id,
            text,
            left: `${((anchorX - VIEW.x) / VIEW.width) * 100}%`,
            top: `${((anchorY - VIEW.y) / VIEW.height) * 100}%`,
        });
    }

    clearLabel(): void {
        this.activeLabel.set(null);
    }

    readonly label = computed(() => {
        const parts = ['TTT Dienstanzug', `${this.placedRibbons().length} Auszeichnungen`];
        if (this.rank()) {
            parts.push(`Rang ${this.rank()}`);
        }
        if (this.placedDepartments().length > 0) {
            parts.push(`${this.placedDepartments().length} Abteilungen`);
        }
        const medal = this.medal();
        if (medal) {
            parts.push(medal.label);
        }
        return parts.join(', ');
    });
}
