import { ModuleWithProviders, OpaqueToken } from '@angular/core';
import { Ng2FileInputOptionsInterface, Ng2FileInputOptions } from './ng2-file-input.interface';
export declare const USER_OPTIONS: OpaqueToken;
export declare function optionsFactory(userOptions: Ng2FileInputOptions): Ng2FileInputOptions;
export declare class Ng2FileInputModule {
    static forRoot(options?: Ng2FileInputOptionsInterface): ModuleWithProviders;
}
