import {SnackbarTheme} from '../enums/snackbar-theme';

export class SnackbarObject {
    public id!: number;
    public hidden: boolean = false;
    public gone: boolean = false;

    public constructor(public text: string, public theme: SnackbarTheme) {}
}
