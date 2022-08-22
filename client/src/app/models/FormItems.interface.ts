export interface SelectItem {
    label: string;
    optionsProvided: boolean;
    options?: string[];
    value?: string;
    optionsURL?: string;
}

export interface TextItem {
    label: string;
    value?: string;
    type?: string;
}

export interface SwitchItem {
    label: string;
    value?: boolean;
}
