import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {KeyboardCode} from '../../../../enums/keyboard-code.enum';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
    @Input() public boardWidth: number = 150;
    @Input() public boardHeight: number = 120;

    @Input() public gridSize: number = 20;

    @ViewChild('container') public container!: ElementRef<HTMLDivElement>;

    public mouseIsDown: boolean = false;

    public zoom: number = 1;
    public zoomChangeCount: number = 0;

    public resizeClickHandler(dx: number, dy: number): void {
        this.boardWidth += dx;
        this.boardHeight += dy;
    }

    public onKeyUp(event: KeyboardEvent): void {
        console.log(event.code);
        switch (event.code) {
            case KeyboardCode.EQUAL:
            case KeyboardCode.NUMPAD_ADD:
                this.zoom += 0.25;
                break;
            case KeyboardCode.MINUS:
            case KeyboardCode.NUMPAD_SUBTRACT:
                this.zoom -= 0.25;
                this.zoom = Math.max(this.zoom, 0);
                break;
            case KeyboardCode.DIGIT_0:
            case KeyboardCode.NUMPAD_0:
                this.zoom = 1;
                break;
            default:
                return;
        }
        this.zoomChangeCount++;
        setTimeout(() => this.zoomChangeCount--, 500);
    }

    public mouseMoveHandler(event: MouseEvent): void {
        if (this.mouseIsDown) {
            this.container.nativeElement.scrollTop -= event.movementY;
            this.container.nativeElement.scrollLeft -= event.movementX;
        }
    }
}
