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
import { Component, Input, Output, EventEmitter, Inject, forwardRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng2FileInputAction, Ng2FileInputOptions, } from './ng2-file-input.interface';
var Ng2FileInputComponent = /** @class */ (function () {
    function Ng2FileInputComponent(fileInputHandlerService, sanitizer, defaultOptions) {
        this.fileInputHandlerService = fileInputHandlerService;
        this.sanitizer = sanitizer;
        this.defaultOptions = defaultOptions;
        this.alreadyEmitted = false;
        this.fileIsOver = false;
        this.invalidFile = false;
        this.multiple = null;
        this.removable = null;
        this.showPreviews = null;
        this.outputAction = new EventEmitter();
        this.outputRemoved = new EventEmitter();
        this.outputAdded = new EventEmitter();
        this.outputInvalidDenied = new EventEmitter();
        this.outputCouldNotRemove = new EventEmitter();
        this.outputCouldNotAdd = new EventEmitter();
    }
    Ng2FileInputComponent.prototype.ngOnInit = function () {
        this.dropText = this.dropText || this.defaultOptions.dropText;
        this.browseText = this.browseText || this.defaultOptions.browseText;
        this.removeText = this.removeText || this.defaultOptions.removeText;
        this.invalidFileText = this.invalidFileText || this.defaultOptions.invalidFileText;
        this.invalidFileTimeout = this.invalidFileTimeout || this.defaultOptions.invalidFileTimeout;
        this.multiple = this.multiple !== null ? this.multiple : this.defaultOptions.multiple;
        this.removable = this.removable !== null ? this.removable : this.defaultOptions.removable;
        this.showPreviews = this.showPreviews !== null ? this.showPreviews : this.defaultOptions.showPreviews;
        this.extensions = this.extensions || this.defaultOptions.extensions;
        if (typeof (this.id) === "undefined" || !this.id || this.id === null) {
            this.id = this.generateId();
        }
        this.fileInputHandlerService.add(this.id);
    };
    Ng2FileInputComponent.prototype.ngOnDestroy = function () {
        this.fileInputHandlerService.remove(this.id);
    };
    Ng2FileInputComponent.prototype.fileOver = function (fileIsOver) {
        this.fileIsOver = fileIsOver;
    };
    Ng2FileInputComponent.prototype.onFileDrop = function (file) {
        var _this = this;
        if (!this.multiple) {
            //make sure only to emit once
            if (!this.alreadyEmitted) {
                this.alreadyEmitted = true;
                this.handleFile(file);
                setTimeout(function () { _this.alreadyEmitted = false; }, 0);
            }
        }
        else {
            this.handleFile(file);
        }
    };
    Ng2FileInputComponent.prototype.fileSelected = function (event) {
        this.invalidFile = false;
        var files = event.target.files;
        if (files && files.length) {
            if (!this.multiple) {
                //make sure only to emit one
                this.handleFile(files[0]);
            }
            else {
                for (var i = 0; i < files.length; i++) {
                    this.handleFile(files[i]);
                }
            }
        }
        setTimeout(function () { event.target.value = ""; }, 0);
    };
    Ng2FileInputComponent.prototype.getCurrentFiles = function () {
        var fileInput = this.fileInputHandlerService.getFileInput(this.id);
        return fileInput ? fileInput.currentFiles : [];
    };
    Ng2FileInputComponent.prototype.removeFile = function (file) {
        if (this.removable) {
            var notRemovedFiles = this.fileInputHandlerService.removeFiles(this.id, [file]);
            if (notRemovedFiles.length === 0) {
                this.emitOutput(file, Ng2FileInputAction.Removed);
            }
            else {
                this.emitOutput(file, Ng2FileInputAction.CouldNotRemove);
            }
        }
    };
    Ng2FileInputComponent.prototype.getObjectUrl = function (file) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
    };
    Ng2FileInputComponent.prototype.handleFile = function (file) {
        if (this.isValidFile(file)) {
            if (!this.multiple) {
                this.fileInputHandlerService.reset(this.id);
            }
            var notAddedFiles = this.fileInputHandlerService.addFiles(this.id, [file]);
            if (notAddedFiles.length === 0) {
                this.emitOutput(file, Ng2FileInputAction.Added);
            }
            else {
                this.emitOutput(file, Ng2FileInputAction.CouldNotAdd);
            }
        }
        else {
            this.emitOutput(file, Ng2FileInputAction.InvalidDenied);
        }
    };
    Ng2FileInputComponent.prototype.emitOutput = function (file, action) {
        this.outputAction.emit({
            id: this.id,
            currentFiles: this.getCurrentFiles(),
            action: action,
            file: file
        });
        switch (action) {
            case Ng2FileInputAction.Added:
                this.outputAdded.emit({
                    id: this.id,
                    currentFiles: this.getCurrentFiles(),
                    file: file
                });
                break;
            case Ng2FileInputAction.Removed:
                this.outputRemoved.emit({
                    id: this.id,
                    currentFiles: this.getCurrentFiles(),
                    file: file
                });
                break;
            case Ng2FileInputAction.InvalidDenied:
                this.outputInvalidDenied.emit({
                    id: this.id,
                    currentFiles: this.getCurrentFiles(),
                    file: file
                });
                break;
            case Ng2FileInputAction.CouldNotAdd:
                this.outputCouldNotAdd.emit({
                    id: this.id,
                    currentFiles: this.getCurrentFiles(),
                    file: file
                });
                break;
            case Ng2FileInputAction.CouldNotRemove:
                this.outputCouldNotRemove.emit({
                    id: this.id,
                    currentFiles: this.getCurrentFiles(),
                    file: file
                });
                break;
        }
    };
    Ng2FileInputComponent.prototype.isValidFile = function (file) {
        var _this = this;
        if (this.extensions.length > 0) {
            var ext = file.name.split('.').pop();
            if ((this.extensions.indexOf('image/jpg') !== -1) && (this.extensions.indexOf('image/jpeg') === -1)) {
                this.extensions.push('image/jpeg');
            }
            ;
            if (this.extensions.indexOf(file.type) === -1 && this.extensions.indexOf(ext) === -1) {
                this.invalidFile = true;
                if (this.invalidFileTimeout !== 0) {
                    setTimeout(function () {
                        _this.invalidFile = false;
                    }, this.invalidFileTimeout);
                }
                return false;
            }
        }
        return true;
    };
    Ng2FileInputComponent.prototype.generateId = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    __decorate([
        Input()
    ], Ng2FileInputComponent.prototype, "id", void 0);
    __decorate([
        Input('drop-text')
    ], Ng2FileInputComponent.prototype, "dropText", void 0);
    __decorate([
        Input('browse-text')
    ], Ng2FileInputComponent.prototype, "browseText", void 0);
    __decorate([
        Input('remove-text')
    ], Ng2FileInputComponent.prototype, "removeText", void 0);
    __decorate([
        Input('invalid-file-text')
    ], Ng2FileInputComponent.prototype, "invalidFileText", void 0);
    __decorate([
        Input('invalid-file-timeout')
    ], Ng2FileInputComponent.prototype, "invalidFileTimeout", void 0);
    __decorate([
        Input('multiple')
    ], Ng2FileInputComponent.prototype, "multiple", void 0);
    __decorate([
        Input('removable')
    ], Ng2FileInputComponent.prototype, "removable", void 0);
    __decorate([
        Input('show-previews')
    ], Ng2FileInputComponent.prototype, "showPreviews", void 0);
    __decorate([
        Input('extensions')
    ], Ng2FileInputComponent.prototype, "extensions", void 0);
    __decorate([
        Output('onAction')
    ], Ng2FileInputComponent.prototype, "outputAction", void 0);
    __decorate([
        Output('onRemoved')
    ], Ng2FileInputComponent.prototype, "outputRemoved", void 0);
    __decorate([
        Output('onAdded')
    ], Ng2FileInputComponent.prototype, "outputAdded", void 0);
    __decorate([
        Output('onInvalidDenied')
    ], Ng2FileInputComponent.prototype, "outputInvalidDenied", void 0);
    __decorate([
        Output('onCouldNotRemove')
    ], Ng2FileInputComponent.prototype, "outputCouldNotRemove", void 0);
    __decorate([
        Output('onCouldNotAdd')
    ], Ng2FileInputComponent.prototype, "outputCouldNotAdd", void 0);
    Ng2FileInputComponent = __decorate([
        Component({
            selector: 'ng2-file-input',
            template: "<div class=\"ng2-file-input\">\n                    <div class=\"ng2-file-input-invalid text-danger\" [hidden]=\"!invalidFile\" [innerHTML]=\"invalidFileText\"></div>\n                    <div fileDrop class=\"ng2-file-input-drop-container\" [ngClass]=\"{'file-is-over': fileIsOver}\" (fileOver)=\"fileOver($event)\"\n                        (onFileDrop)=\"onFileDrop($event)\">\n                        <span [innerHTML]=\"dropText\"></span>\n                        <button type=\"button\" (click)=\"ng2FileInputSelect.click()\" class=\"btn btn-primary\" [innerHTML]=\"browseText\"></button>\n                    </div>\n                    <div class=\"ng2-file-input-files\" *ngIf=\"showPreviews\">\n                        <div *ngFor=\"let file of getCurrentFiles()\" class=\"ng2-file-input-file\" [ngClass]=\"{'image':file.type.indexOf('image')!==-1}\">\n                            <span [innerHTML]=\"file.name\" class=\"ng2-file-input-file-text\"></span>\n                            <img [src]=\"getObjectUrl(file)\" *ngIf=\"file.type.indexOf('image')!==-1\">\n                            <span class=\"ng2-file-input-file-text remove\" (click)=\"removeFile(file)\" *ngIf=\"removable\">\n                                <p [innerHTML]=\"removeText\"></p>\n                            </span> \n                        </div>\n                    </div>\n                    <input type=\"file\" #ng2FileInputSelect (change)=\"fileSelected($event)\" [attr.multiple]=\"multiple ? true : null\">\n                </div>",
        }),
        __param(0, Inject(forwardRef(function () { return FileInputHandlerService; }))), __param(1, Inject(forwardRef(function () { return DomSanitizer; }))), __param(2, Inject(forwardRef(function () { return Ng2FileInputOptions; })))
    ], Ng2FileInputComponent);
    return Ng2FileInputComponent;
}());
export { Ng2FileInputComponent };
//# sourceMappingURL=ng2-file-input.component.js.map