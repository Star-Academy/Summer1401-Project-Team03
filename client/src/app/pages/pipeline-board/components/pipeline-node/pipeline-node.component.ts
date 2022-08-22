import {AfterViewInit, Component, ElementRef} from '@angular/core';

@Component({
    selector: 'app-pipeline-node',
    templateUrl: './pipeline-node.component.html',
    styleUrls: ['./pipeline-node.component.scss'],
})
export class PipelineNodeComponent implements AfterViewInit {
    public constructor(private elementRef: ElementRef) {}

    public ngAfterViewInit(): void {
        const nodeEl = this.elementRef.nativeElement.querySelector('.wrapper');
        dragElement(nodeEl);
        function dragElement(elmnt: any): void {
            let pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;

            elmnt.onmousedown = dragMouseDown;

            function dragMouseDown(e: any): void {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }

            function elementDrag(e: any): void {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
                elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
            }

            function closeDragElement(): void {
                /* stop moving when mouse button is released:*/
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }
}
