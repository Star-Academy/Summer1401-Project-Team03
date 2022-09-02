import {Component, ElementRef, Input, ViewChild} from '@angular/core';

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

    public resizeClickHandler(dx: number, dy: number): void {
        this.boardWidth += dx;
        this.boardHeight += dy;
    }

    public mouseMoveHandler(event: MouseEvent): void {
        if (this.mouseIsDown) {
            this.container.nativeElement.scrollTop -= event.movementY;
            this.container.nativeElement.scrollLeft -= event.movementX;
        }
    }
}
