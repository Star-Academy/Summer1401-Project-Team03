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

    public resizeClickHandler(dx: number, dy: number): void {
        this.boardWidth += dx;
        this.boardHeight += dy;
    }
}
