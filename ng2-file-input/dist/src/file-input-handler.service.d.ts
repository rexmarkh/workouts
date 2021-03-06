import { FileInput } from './ng2-file-input.interface';
export declare class FileInputHandlerService {
    private fileInputs;
    constructor();
    add(id: string): boolean;
    remove(id: string): boolean;
    reset(id: string): boolean;
    addFiles(fileInputId: string, files: File[]): File[];
    removeFiles(fileInputId: string, files: File[]): File[];
    getFileInput(id: string): FileInput;
    private addFile(file, toFiles);
    private removeFile(file, fromFiles);
    private isSameFile(file1, file2);
}
