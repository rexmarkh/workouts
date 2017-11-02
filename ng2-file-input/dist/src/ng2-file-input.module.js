var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { FileInputHandlerService } from './file-input-handler.service';
import { Ng2FileInputService } from './ng2-file-input.service';
import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropModule } from 'bergben-angular2-file-drop';
import { Ng2FileInputComponent } from './ng2-file-input.component';
import { Ng2FileInputOptions } from './ng2-file-input.interface';
export var USER_OPTIONS = new OpaqueToken('ng2 file input custom user options');
export function optionsFactory(userOptions) {
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
    Ng2FileInputModule = Ng2FileInputModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FileDropModule
            ],
            providers: [Ng2FileInputService, FileInputHandlerService],
            declarations: [Ng2FileInputComponent],
            exports: [Ng2FileInputComponent]
        })
    ], Ng2FileInputModule);
    return Ng2FileInputModule;
    var Ng2FileInputModule_1;
}());
export { Ng2FileInputModule };
//# sourceMappingURL=ng2-file-input.module.js.map