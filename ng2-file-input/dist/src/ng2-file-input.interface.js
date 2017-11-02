var Ng2FileInputOptions = /** @class */ (function () {
    function Ng2FileInputOptions() {
        this.dropText = "";
        this.browseText = "Upload File";
        this.removeText = "Remove File";
        this.invalidFileText = "You have picked an invalid file.";
        this.invalidFileTimeout = 8000;
        this.removable = false;
        this.multiple = false;
        this.showPreviews = true;
        this.extensions = [];
    }
    return Ng2FileInputOptions;
}());
export { Ng2FileInputOptions };
export var Ng2FileInputAction;
(function (Ng2FileInputAction) {
    Ng2FileInputAction[Ng2FileInputAction["Removed"] = 0] = "Removed";
    Ng2FileInputAction[Ng2FileInputAction["Added"] = 1] = "Added";
    Ng2FileInputAction[Ng2FileInputAction["InvalidDenied"] = 2] = "InvalidDenied";
    Ng2FileInputAction[Ng2FileInputAction["CouldNotRemove"] = 3] = "CouldNotRemove";
    Ng2FileInputAction[Ng2FileInputAction["CouldNotAdd"] = 4] = "CouldNotAdd";
})(Ng2FileInputAction || (Ng2FileInputAction = {}));
//# sourceMappingURL=ng2-file-input.interface.js.map