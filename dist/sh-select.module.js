"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var virtual_scroll_1 = require("./virtual-scroll");
var sh_select_menu_component_1 = require("./sh-select-menu.component");
var sh_select_component_1 = require("./sh-select.component");
var common_1 = require("@angular/common");
var ShSelectRootModule = (function () {
    function ShSelectRootModule() {
    }
    return ShSelectRootModule;
}());
ShSelectRootModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    virtual_scroll_1.VirtualScrollModule
                ],
                declarations: [
                    sh_select_component_1.ShSelectComponent,
                    sh_select_menu_component_1.ShSelectMenuComponent
                ],
                exports: [sh_select_component_1.ShSelectComponent]
            },] },
];
/** @nocollapse */
ShSelectRootModule.ctorParameters = function () { return []; };
exports.ShSelectRootModule = ShSelectRootModule;
var ShSelectModule = (function () {
    function ShSelectModule() {
    }
    ShSelectModule.forRoot = function () {
        return {
            ngModule: ShSelectRootModule
        };
    };
    return ShSelectModule;
}());
exports.ShSelectModule = ShSelectModule;
//# sourceMappingURL=sh-select.module.js.map