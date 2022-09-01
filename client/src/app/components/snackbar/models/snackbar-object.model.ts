import {SnackbarTheme} from '../enums/snackbar-theme';

export interface SnackbarObject {
    id: number;
    text: string;
    theme: SnackbarTheme;
    hidden: boolean;
    gone: boolean;
}
