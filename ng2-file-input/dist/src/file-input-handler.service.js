var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var FileInputHandlerService = /** @class */ (function () {
    function FileInputHandlerService() {
        this.fileInputs = [];
    }
    FileInputHandlerService.prototype.add = function (id) {
        this.fileInputs.push({
            id: id,
            currentFiles: []
        });
        return true;
    };
    FileInputHandlerService.prototype.remove = function (id) {
        for (var i = 0; this.fileInputs.length; i++) {
            if (this.fileInputs[i].id === id) {
                this.fileInputs.splice(i, 1);
                i = this.fileInputs.length;
                return true;
            }
        }
        return false;
    };
    FileInputHandlerService.prototype.reset = function (id) {
        var fileInput = this.getFileInput(id);
        fileInput.currentFiles = [];
        return true;
    };
    FileInputHandlerService.prototype.addFiles = function (fileInputId, files) {
        var _this = this;
        var fileInput = this.getFileInput(fileInputId);
        var notAdded = [];
        files.forEach(function (file) {
            if (!_this.addFile(file, fileInput.currentFiles)) {
                notAdded.push(file);
            }
        });
        return notAdded;
    };
    FileInputHandlerService.prototype.removeFiles = function (fileInputId, files) {
        var _this = this;
        var fileInput = this.getFileInput(fileInputId);
        var notRemoved = [];
        files.forEach(function (file) {
            if (!_this.removeFile(file, fileInput.currentFiles)) {
                notRemoved.push(file);
            }
        });
        return notRemoved;
    };
    FileInputHandlerService.prototype.getFileInput = function (id) {
        for (var i = 0; this.fileInputs.length; i++) {
            if (this.fileInputs[i].id === id) {
                return this.fileInputs[i];
            }
        }
    };
    FileInputHandlerService.prototype.addFile = function (file, toFiles) {
        toFiles.push(file);
        return true;
    };
    FileInputHandlerService.prototype.removeFile = function (file, fromFiles) {
        for (var i = 0; fromFiles.length; i++) {
            if (this.isSameFile(file, fromFiles[i])) {
                fromFiles.splice(i, 1);
                i = fromFiles.length;
                return true;
            }
        }
        return false;
    };
    FileInputHandlerService.prototype.isSameFile = function (file1, file2) {
        return file1.name === file2.name && file1.size === file2.size && file1.type === file2.type;
    };
    FileInputHandlerService = __decorate([
        Injectable()
    ], FileInputHandlerService);
    return FileInputHandlerService;
}());
export { FileInputHandlerService };
//# sourceMappingURL=file-input-handler.service.js.map