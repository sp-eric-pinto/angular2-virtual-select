"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var virtual_scroll_1 = require("./virtual-scroll");
var ShSelectMenuComponent = (function () {
    function ShSelectMenuComponent() {
        this.noToggleClick = new core_1.EventEmitter();
        this.math = Math;
    }
    Object.defineProperty(ShSelectMenuComponent.prototype, "rows", {
        set: function (val) {
            if (this.virtualScrollElm) {
                this.virtualScrollElm.scrollInto(this._rows[0]);
            }
            this._rows = val;
            if (this.virtualScrollElm) {
                this.virtualScrollElm.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    ShSelectMenuComponent.prototype.toggleSelected = function (row) {
        this.noToggleClick.emit(row);
    };
    return ShSelectMenuComponent;
}());
ShSelectMenuComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'sh-select-menu',
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                template: "\n        <div class=\"menu\" *ngIf=\"isOpen && _rows\" style=\"min-height: 35px;background-color: white\">\n          <!--virtual-->\n          <virtual-scroll [items]=\"_rows\" (update)=\"viewPortItems = $event\"\n            [style.height]=\"math.min(290,38 * _rows.length) + 'px'\"\n            style=\"display: block\">         \n            <div class=\"item\"\n                 *ngFor=\"let row of viewPortItems\"\n                 [class.selected]=\"selectedValues?.indexOf(row) !== -1\"\n                 (click)=\"toggleSelected(row)\">\n              {{row.name || row}}\n            </div>\n          </virtual-scroll>\n        </div>",
                styles: [".menu{\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  background-color: white;\n  width: 100%;\n  max-height: 300px;\n  overflow: auto;\n  box-sizing: border-box;\n  z-index: 999;\n  box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);\n  border-bottom: 1px solid rgba(34,36,38,.15);\n  border-left: 1px solid rgba(34,36,38,.15);\n  border-right: 1px solid rgba(34,36,38,.15);\n  border-radius: 0 0 2px 2px;\n  min-width: max-content;\n}\n\n.item{\n  padding: 4px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.item:hover{\n  background-color: #efefef;\n}\n\n\n.item.selected{\n  font-weight: 900;\n}"]
            },] },
];
/** @nocollapse */
ShSelectMenuComponent.ctorParameters = function () { return []; };
ShSelectMenuComponent.propDecorators = {
    'selectedValues': [{ type: core_1.Input },],
    'isOpen': [{ type: core_1.Input },],
    'noToggleClick': [{ type: core_1.Output },],
    'virtualScrollElm': [{ type: core_1.ViewChild, args: [virtual_scroll_1.VirtualScrollComponent,] },],
    'rows': [{ type: core_1.Input },],
};
exports.ShSelectMenuComponent = ShSelectMenuComponent;
//# sourceMappingURL=sh-select-menu.component.js.map