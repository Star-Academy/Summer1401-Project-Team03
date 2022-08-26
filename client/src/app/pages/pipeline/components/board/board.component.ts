import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
    @Input() public boardWidth: number = 150;
    @Input() public boardHeight: number = 120;

    @Input() public gridSize: string = '20px';

    public zoom: number = 1;
    public zoomChangeCount: number = 0;

    public resizeClickHandler(dx: number, dy: number): void {
        this.boardWidth += dx;
        this.boardHeight += dy;
    }

    public onKeyUp(event: KeyboardEvent): void {
        switch (event.code) {
            case 'Equal':
                this.zoom += 0.25;
                break;
            case 'Minus':
                this.zoom -= 0.25;
                this.zoom = Math.max(this.zoom, 0);
                break;
            case 'Digit0':
                this.zoom = 1;
                break;
            default:
                return;
        }
        this.zoomChangeCount++;
        setTimeout(() => this.zoomChangeCount--, 500);
    }
}
