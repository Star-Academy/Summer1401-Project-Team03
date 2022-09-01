import {Injectable} from '@angular/core';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';
import {SnackbarObject} from '../components/snackbar/models/snackbar-object.model';
import {SnackbarTheme} from '../components/snackbar/enums/snackbar-theme';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    public snackbars: {[id: number]: SnackbarObject} = {
        1: {id: 1, text: 'hello 1 hello 1 hello 1', theme: SnackbarTheme.PRIMARY, hidden: false, gone: false},
        2: {id: 2, text: 'hello 2 hello 2 hello 2', theme: SnackbarTheme.DANGER, hidden: false, gone: false},
        3: {id: 3, text: 'hello 3 hello 3 hello 3', theme: SnackbarTheme.SUCCESS, hidden: false, gone: false},
        4: {id: 4, text: 'hello 4 hello 4 hello 4', theme: SnackbarTheme.WARNING, hidden: false, gone: false},
    };

    public component!: SnackbarComponent;

    private get newId(): number {
        if (Object.keys(this.snackbars).length === 0) return 0;
        return Math.max(...Object.keys(this.snackbars).map((s) => Number(s))) + 1;
    }

    private show(snackbar: SnackbarObject): void {
        this.snackbars[snackbar.id] = snackbar;
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
