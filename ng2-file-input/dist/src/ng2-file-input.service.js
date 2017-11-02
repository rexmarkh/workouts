var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { FileInputHandlerService } from './file-input-handler.service';
import { forwardRef, Inject, Injectable } from '@angular/core';
var Ng2FileInputService = /** @class */ (function () {
    function Ng2FileInputService(fileInputHandlerService) {
        this.fileInputHandlerService = fileInputHandlerService;
    }
    Ng2FileInputService.prototype.reset = function (id) {
        return this.fileInputHandlerService.reset(id);
    };
    Ng2FileInputService.prototype.remove = function (id, files) {
        return this.fileInputHandlerService.removeFiles(id, files);
    };
    Ng2FileInputService.prototype.add = function (id, files) {
        return this.fileInputHandlerService.addFiles(id, files);
    };
    Ng2FileInputService.prototype.getCurrentFiles = function (id) {
        var fileInput = this.fileInputHandlerService.getFileInput(id);
        return fileInput ? fileInput.currentFiles : [];
    };
    Ng2FileInputService = __decorate([
        Injectable(),
        __param(0, Inject(forwardRef(function () { return FileInputHandlerService; })))
    ], Ng2FileInputService);
    return Ng2FileInputService;
}());
export { Ng2FileInputService };
//# sourceMappingURL=ng2-file-input.service.js.map