import {action, observable, computed, makeObservable} from 'mobx';
import EditorUIController from '../lib/patch'

export class storeFocusObjects {
    constructor() {
        makeObservable(this, {
            _focusObjects: observable,
            _headerType: observable,
            resetFocusObjects: action,
            settings: computed,
            headerType: computed,
            headerObject: computed,
            paragraphObject: computed,
            shapeObject: computed,
            imageObject: computed,
            tableObject: computed,
            isTableInStack: computed,
            chartObject: computed,
            linkObject: computed
        });
    }

    _focusObjects = [];
    _headerType = 1;

    resetFocusObjects (objects) {
        this._focusObjects = objects;
    }

    get settings() {
        return !!this.intf ? this.intf.filterFocusObjects() : null;
    }

    get headerType() {
        for (let object of this._focusObjects) {
            const type = object.get_ObjectType();
            if (Asc.c_oAscTypeSelectElement.Header === type) {
                return object.get_ObjectValue().get_Type();
            }
        }
        return this._headerType;
    }

    get headerObject() {
        return !!this.intf ? this.intf.getHeaderObject() : null;
    }

    get paragraphObject() {
        return !!this.intf ? this.intf.getParagraphObject() : null;
    }

    get shapeObject() {
        return !!this.intf ? this.intf.getShapeObject() : null;
    }

    get imageObject() {
        return !!this.intf ? this.intf.getImageObject() : null;
    }

    get tableObject() {
        return !!this.intf ? this.intf.getTableObject() : null;
    }

    get isTableInStack() {
        for (let object of this._focusObjects) {
            if (object.get_ObjectType() == Asc.c_oAscTypeSelectElement.Table) {
                return true;
            }
        }
        return false;
    }

    get chartObject() {
        return !!this.intf ? this.intf.getChartObject() : null;
    }
    
    get linkObject() {
        return !!this.intf ? this.intf.getLinkObject() : null;
    }
}