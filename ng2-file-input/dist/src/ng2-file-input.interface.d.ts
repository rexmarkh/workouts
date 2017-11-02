export interface Ng2FileInputOptionsInterface {
    dropText?: string;
    browseText?: string;
    removeText?: string;
    invalidFileText?: string;
    invalidFileTimeout?: number;
    removable?: boolean;
    multiple?: boolean;
    showPreviews?: boolean;
    extensions?: string[];
}
export declare class Ng2FileInputOptions implements Ng2FileInputOptionsInterface {
    dropText: string;
    browseText: string;
    removeText: string;
    invalidFileText: string;
    invalidFileTimeout: number;
    removable: boolean;
    multiple: boolean;
    showPreviews: boolean;
    extensions: string[];
}
export declare enum Ng2FileInputAction {
    Removed = 0,
    Added = 1,
    InvalidDenied = 2,
    CouldNotRemove = 3,
    CouldNotAdd = 4,
}
export interface FileInput {
    id: string;
    currentFiles: File[];
}
