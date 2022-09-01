import {Injectable} from '@angular/core';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';
import {SnackbarObject} from '../components/snackbar/models/snackbar-object.model';
import {SnackbarTheme} from '../components/snackbar/enums/snackbar-theme';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    public snackbars: {[id: number]: SnackbarObject} = {};

    public component!: SnackbarComponent;

    private get newId(): number {
        if (Object.keys(this.snackbars).length === 0) return 0;
        return Math.max(...Object.keys(this.snackbars).map((s) => Number(s))) + 1;
    }

    private show(snackbar: SnackbarObject): void {
        this.snackbars[snackbar.id] = snackbar;
        setTimeout(() => this.hide(snackbar.id), 3000);
    }

    public showNewId(snackbar: SnackbarObject): void {
        this.show({...snackbar, id: this.newId, hidden: false, gone: false});
    }

    public hide(id: number): void {
        this.snackbars[id].hidden = true;
        setTimeout(() => (this.snackbars[id].gone = true), 150);
    }

    public hideAll(): void {
        for (let snackId in this.snackbars) this.hide(Number(snackId));
    }
}
