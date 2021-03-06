"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var VirtualScrollComponent = (function () {
    function VirtualScrollComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.items = [];
        this.update = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        this.startupLoop = true;
    }
    VirtualScrollComponent.prototype.ngOnInit = function () {
        this.onScrollListener = this.renderer.listen(this.element.nativeElement, 'scroll', this.refresh.bind(this));
        this.scrollbarWidth = 0; // this.element.nativeElement.offsetWidth - this.element.nativeElement.clientWidth;
        this.scrollbarHeight = 0; // this.element.nativeElement.offsetHeight - this.element.nativeElement.clientHeight;
    };
    VirtualScrollComponent.prototype.ngOnChanges = function (changes) {
        this.previousStart = undefined;
        this.previousEnd = undefined;
        this.refresh();
    };
    VirtualScrollComponent.prototype.ngOnDestroy = function () {
        this.onScrollListener();
    };
    VirtualScrollComponent.prototype.refresh = function () {
        requestAnimationFrame(this.calculateItems.bind(this));
    };
    VirtualScrollComponent.prototype.scrollInto = function (item) {
        var index = (this.items || []).indexOf(item);
        if (index < 0 || index >= (this.items || []).length)
            return;
        var d = this.calculateDimensions();
        this.element.nativeElement.scrollTop = Math.floor(index / d.itemsPerRow) *
            d.childHeight - Math.max(0, (d.itemsPerCol - 1)) * d.childHeight;
        this.refresh();
    };
    VirtualScrollComponent.prototype.countItemsPerRow = function () {
        var offsetTop;
        var itemsPerRow;
        var children = this.contentElementRef.nativeElement.children;
        for (itemsPerRow = 0; itemsPerRow < children.length; itemsPerRow++) {
            if (offsetTop != undefined && offsetTop !== children[itemsPerRow].offsetTop)
                break;
            offsetTop = children[itemsPerRow].offsetTop;
        }
        return itemsPerRow;
    };
    VirtualScrollComponent.prototype.calculateDimensions = function () {
        var el = this.element.nativeElement;
        var content = this.contentElementRef.nativeElement;
        var items = this.items || [];
        var itemCount = items.length;
        var viewWidth = el.clientWidth - this.scrollbarWidth;
        var viewHeight = el.clientHeight - this.scrollbarHeight;
        var contentDimensions;
        if (this.childWidth == undefined || this.childHeight == undefined) {
            contentDimensions = content.children[0] ? content.children[0].getBoundingClientRect() : {
                width: viewWidth,
                height: viewHeight
            };
        }
        var childWidth = this.childWidth || contentDimensions.width;
        var childHeight = this.childHeight || contentDimensions.height;
        var itemsPerRow = Math.max(1, this.countItemsPerRow());
        var itemsPerRowByCalc = Math.max(1, Math.floor(viewWidth / childWidth));
        var itemsPerCol = Math.max(1, Math.floor(viewHeight / childHeight));
        if (itemsPerCol === 1 && Math.floor(el.scrollTop / this.scrollHeight * itemCount) + itemsPerRowByCalc >= itemCount) {
            itemsPerRow = itemsPerRowByCalc;
        }
        return {
            itemCount: itemCount,
            viewWidth: viewWidth,
            viewHeight: viewHeight,
            childWidth: childWidth,
            childHeight: childHeight,
            itemsPerRow: itemsPerRow,
            itemsPerCol: itemsPerCol,
            itemsPerRowByCalc: itemsPerRowByCalc
        };
    };
    VirtualScrollComponent.prototype.calculateItems = function () {
        var el = this.element.nativeElement;
        var d = this.calculateDimensions();
        var items = this.items || [];
        this.scrollHeight = d.childHeight * d.itemCount / d.itemsPerRow;
        if (this.element.nativeElement.scrollTop > this.scrollHeight) {
            this.element.nativeElement.scrollTop = this.scrollHeight;
        }
        var start = Math.floor(el.scrollTop / this.scrollHeight * d.itemCount / d.itemsPerRow) * d.itemsPerRow;
        var end = Math.min(d.itemCount, Math.ceil(el.scrollTop / this.scrollHeight * d.itemCount / d.itemsPerRow) * d.itemsPerRow +
            d.itemsPerRow * (d.itemsPerCol + 1));
        this.topPadding = d.childHeight * Math.ceil(start / d.itemsPerRow);
        if (start !== this.previousStart || end !== this.previousEnd) {
            this.update.emit(items.slice(start, end));
            this.previousStart = start;
            this.previousEnd = end;
            if (this.startupLoop === true) {
                this.refresh();
            }
            else {
                this.change.emit({
                    start: start,
                    end: end
                });
            }
        }
        else {
            this.startupLoop = false;
        }
    };
    return VirtualScrollComponent;
}());
VirtualScrollComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'virtual-scroll',
                template: "\n        <div class=\"total-padding\" [style.height]=\"scrollHeight + 'px'\"></div>\n        <div class=\"scrollable-content\" #content [style.transform]=\"'translateY(' + topPadding + 'px)'\">\n            <ng-content></ng-content>\n        </div>\n    ",
                styles: ["\n        :host {\n            overflow: auto;\n            overflow-y: auto;\n            position: relative;\n            -webkit-overflow-scrolling: touch;\n        }\n        .scrollable-content {\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            position: absolute;\n        }\n        .total-padding {\n            width: 1px;\n            opacity: 0;\n        }\n    "]
            },] },
];
/** @nocollapse */
VirtualScrollComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer, },
]; };
VirtualScrollComponent.propDecorators = {
    'items': [{ type: core_1.Input },],
    'scrollbarWidth': [{ type: core_1.Input },],
    'scrollbarHeight': [{ type: core_1.Input },],
    'childWidth': [{ type: core_1.Input },],
    'childHeight': [{ type: core_1.Input },],
    'update': [{ type: core_1.Output },],
    'change': [{ type: core_1.Output },],
    'contentElementRef': [{ type: core_1.ViewChild, args: ['content', { read: core_1.ElementRef },] },],
};
exports.VirtualScrollComponent = VirtualScrollComponent;
var VirtualScrollModule = (function () {
    function VirtualScrollModule() {
    }
    return VirtualScrollModule;
}());
VirtualScrollModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [VirtualScrollComponent],
                exports: [VirtualScrollComponent]
            },] },
];
/** @nocollapse */
VirtualScrollModule.ctorParameters = function () { return []; };
exports.VirtualScrollModule = VirtualScrollModule;
//# sourceMappingURL=virtual-scroll.js.map