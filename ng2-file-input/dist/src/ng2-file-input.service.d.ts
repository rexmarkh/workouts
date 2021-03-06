import { FileInputHandlerService } from './file-input-handler.service';
export declare class Ng2FileInputService {
    private fileInputHandlerService;
    constructor(fileInputHandlerService: FileInputHandlerService);
    reset(id: string): boolean;
    remove(id: string, files: File[]): File[];
    add(id: string, files: File[]): File[];
    getCurrentFiles(id: string): File[];
}
