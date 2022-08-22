import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-board2',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
    @Input() public containerWidth: number = 40;
    @Input() public containerHeight: number = 30;

    @Input() public boardWidth: number = 150;
    @Input() public boardHeight: number = 120;

    @Input() public gridSize: string = '20px';

    public resizeClickHandler(dx: number, dy: number): void {
        this.boardWidth += dx;
        this.boardHeight += dy;
    }
}
