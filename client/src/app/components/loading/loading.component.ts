import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent<V> implements OnInit {
    @Input() public callback!: () => Promise<V | null>;

    public isError = false;
    public isLoading = true;
    public value: V | null = null;

    public async ngOnInit(): Promise<void> {
        this.value = await this.callback();
        this.isLoading = false;
        this.isError = !this.value;
    }
}
