(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/common'), require('bergben-angular2-file-drop')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', '@angular/common', 'bergben-angular2-file-drop'], factory) :
	(factory((global['ng2-file-input'] = global['ng2-file-input'] || {}),global.ng.core,global._angular_platformBrowser,global._angular_common,global.bergbenAngular2FileDrop));
}(this, (function (exports,_angular_core,_angular_platformBrowser,_angular_common,bergbenAngular2FileDrop) { 'use strict';

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    FileInputHandlerService = __decorate$1([
        _angular_core.Injectable()
    ], FileInputHandlerService);
    return FileInputHandlerService;
}());

var Ng2FileInputOptions = /** @class */ (function () {
    function Ng2FileInputOptions() {
        this.dropText = "";
        this.browseText = "";
        this.removeText = "Remove";
        this.invalidFileText = "You have picked an invalid or disallowed file.";
        this.invalidFileTimeout = 8000;
        this.removable = true;
        this.multiple = false;
        this.showPreviews = true;
        this.extensions = [];
    }
    return Ng2FileInputOptions;
}());

(function (Ng2FileInputAction) {
    Ng2FileInputAction[Ng2FileInputAction["Removed"] = 0] = "Removed";
    Ng2FileInputAction[Ng2FileInputAction["Added"] = 1] = "Added";
    Ng2FileInputAction[Ng2FileInputAction["InvalidDenied"] = 2] = "InvalidDenied";
    Ng2FileInputAction[Ng2FileInputAction["CouldNotRemove"] = 3] = "CouldNotRemove";
    Ng2FileInputAction[Ng2FileInputAction["CouldNotAdd"] = 4] = "CouldNotAdd";
})(exports.Ng2FileInputAction || (exports.Ng2FileInputAction = {}));

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
        this.outputAction = new _angular_core.EventEmitter();
        this.outputRemoved = new _angular_core.EventEmitter();
        this.outputAdded = new _angular_core.EventEmitter();
        this.outputInvalidDenied = new _angular_core.EventEmitter();
        this.outputCouldNotRemove = new _angular_core.EventEmitter();
        this.outputCouldNotAdd = new _angular_core.EventEmitter();
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
                this.emitOutput(file, exports.Ng2FileInputAction.Removed);
            }
            else {
                this.emitOutput(file, exports.Ng2FileInputAction.CouldNotRemove);
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
                this.emitOutput(file, exports.Ng2FileInputAction.Added);
            }
            else {
                this.emitOutput(file, exports.Ng2FileInputAction.CouldNotAdd);
            }
        }
        else {
            this.emitOutput(file, exports.Ng2FileInputAction.InvalidDenied);
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
            case exports.Ng2FileInputAction.Added:
                this.outputAdded.emit({
                    id: this.id,
                    currentFiles: this.getCurrentFiles(),
                    file: file
                });
                break;
            case exports.Ng2FileInputAction.Removed:
                this.outputRemoved.emit({
                    id: this.id,
                    currentFiles: this.getCurrentFiles(),
                    file: file
                });
                break;
            case exports.Ng2FileInputAction.InvalidDenied:
                this.outputInvalidDenied.emit({
                    id: this.id,
                    currentFiles: this.getCurrentFiles(),
                    file: file
                });
                break;
            case exports.Ng2FileInputAction.CouldNotAdd:
                this.outputCouldNotAdd.emit({
                    id: this.id,
                    currentFiles: this.getCurrentFiles(),
                    file: file
                });
                break;
            case exports.Ng2FileInputAction.CouldNotRemove:
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
        _angular_core.Input()
    ], Ng2FileInputComponent.prototype, "id", void 0);
    __decorate([
        _angular_core.Input('drop-text')
    ], Ng2FileInputComponent.prototype, "dropText", void 0);
    __decorate([
        _angular_core.Input('browse-text')
    ], Ng2FileInputComponent.prototype, "browseText", void 0);
    __decorate([
        _angular_core.Input('remove-text')
    ], Ng2FileInputComponent.prototype, "removeText", void 0);
    __decorate([
        _angular_core.Input('invalid-file-text')
    ], Ng2FileInputComponent.prototype, "invalidFileText", void 0);
    __decorate([
        _angular_core.Input('invalid-file-timeout')
    ], Ng2FileInputComponent.prototype, "invalidFileTimeout", void 0);
    __decorate([
        _angular_core.Input('multiple')
    ], Ng2FileInputComponent.prototype, "multiple", void 0);
    __decorate([
        _angular_core.Input('removable')
    ], Ng2FileInputComponent.prototype, "removable", void 0);
    __decorate([
        _angular_core.Input('show-previews')
    ], Ng2FileInputComponent.prototype, "showPreviews", void 0);
    __decorate([
        _angular_core.Input('extensions')
    ], Ng2FileInputComponent.prototype, "extensions", void 0);
    __decorate([
        _angular_core.Output('onAction')
    ], Ng2FileInputComponent.prototype, "outputAction", void 0);
    __decorate([
        _angular_core.Output('onRemoved')
    ], Ng2FileInputComponent.prototype, "outputRemoved", void 0);
    __decorate([
        _angular_core.Output('onAdded')
    ], Ng2FileInputComponent.prototype, "outputAdded", void 0);
    __decorate([
        _angular_core.Output('onInvalidDenied')
    ], Ng2FileInputComponent.prototype, "outputInvalidDenied", void 0);
    __decorate([
        _angular_core.Output('onCouldNotRemove')
    ], Ng2FileInputComponent.prototype, "outputCouldNotRemove", void 0);
    __decorate([
        _angular_core.Output('onCouldNotAdd')
    ], Ng2FileInputComponent.prototype, "outputCouldNotAdd", void 0);
    Ng2FileInputComponent = __decorate([
        _angular_core.Component({
            selector: 'ng2-file-input',
            template: "<div class=\"ng2-file-input\">\n                    <div class=\"ng2-file-input-invalid text-danger\" [hidden]=\"!invalidFile\" [innerHTML]=\"invalidFileText\"></div>\n                    <div fileDrop class=\"ng2-file-input-drop-container\" [ngClass]=\"{'file-is-over': fileIsOver}\" (fileOver)=\"fileOver($event)\"\n                        (onFileDrop)=\"onFileDrop($event)\">\n                        <span [innerHTML]=\"dropText\"></span>\n                        <button type=\"button\" (click)=\"ng2FileInputSelect.click()\" class=\"btn btn-primary\" [innerHTML]=\"browseText\"></button>\n                    </div>\n                    <div class=\"ng2-file-input-files\" *ngIf=\"showPreviews\">\n                        <div *ngFor=\"let file of getCurrentFiles()\" class=\"ng2-file-input-file\" [ngClass]=\"{'image':file.type.indexOf('image')!==-1}\">\n                            <span [innerHTML]=\"file.name\" class=\"ng2-file-input-file-text\"></span>\n                            <img [src]=\"getObjectUrl(file)\" *ngIf=\"file.type.indexOf('image')!==-1\">\n                            <span class=\"ng2-file-input-file-text remove\" (click)=\"removeFile(file)\" *ngIf=\"removable\">\n                                <p [innerHTML]=\"removeText\"></p>\n                            </span> \n                        </div>\n                    </div>\n                    <input type=\"file\" #ng2FileInputSelect (change)=\"fileSelected($event)\" [attr.multiple]=\"multiple ? true : null\">\n                </div>",
        }),
        __param(0, _angular_core.Inject(_angular_core.forwardRef(function () { return FileInputHandlerService; }))), __param(1, _angular_core.Inject(_angular_core.forwardRef(function () { return _angular_platformBrowser.DomSanitizer; }))), __param(2, _angular_core.Inject(_angular_core.forwardRef(function () { return Ng2FileInputOptions; })))
    ], Ng2FileInputComponent);
    return Ng2FileInputComponent;
}());

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param$1 = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
    Ng2FileInputService = __decorate$2([
        _angular_core.Injectable(),
        __param$1(0, _angular_core.Inject(_angular_core.forwardRef(function () { return FileInputHandlerService; })))
    ], Ng2FileInputService);
    return Ng2FileInputService;
}());

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var USER_OPTIONS = new _angular_core.OpaqueToken('ng2 file input custom user options');
function optionsFactory(userOptions) {
    var options = new Ng2FileInputOptions();
    Object.assign(options, userOptions);
    return options;
}
var Ng2FileInputModule = /** @class */ (function () {
    function Ng2FileInputModule() {
    }
    Ng2FileInputModule_1 = Ng2FileInputModule;
    Ng2FileInputModule.forRoot = function (options) {
        if (options === void 0) { options = {}; }
        return {
            ngModule: Ng2FileInputModule_1,
            providers: [{
                    provide: USER_OPTIONS,
                    useValue: options
                }, {
                    provide: Ng2FileInputOptions,
                    useFactory: optionsFactory,
                    deps: [USER_OPTIONS]
                }]
        };
    };
    Ng2FileInputModule = Ng2FileInputModule_1 = __decorate$3([
        _angular_core.NgModule({
            imports: [
                _angular_common.CommonModule,
                bergbenAngular2FileDrop.FileDropModule
            ],
            providers: [Ng2FileInputService, FileInputHandlerService],
            declarations: [Ng2FileInputComponent],
            exports: [Ng2FileInputComponent]
        })
    ], Ng2FileInputModule);
    return Ng2FileInputModule;
    var Ng2FileInputModule_1;
}());

exports.Ng2FileInputComponent = Ng2FileInputComponent;
exports.FileInputHandlerService = FileInputHandlerService;
exports.Ng2FileInputService = Ng2FileInputService;
exports.Ng2FileInputOptions = Ng2FileInputOptions;
exports.Ng2FileInputModule = Ng2FileInputModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
