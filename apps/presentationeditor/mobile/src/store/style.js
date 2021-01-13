import {action, observable} from 'mobx';

export class storeStyle {
    @observable fillColor = undefined;

    @action getFillColor (slideObject) {
    
        let color = 'transparent';

        let fill = slideObject.get_background(),
            fillType = fill.get_type();

        if (fillType == Asc.c_oAscFill.FILL_TYPE_SOLID) {
            fill = fill.get_fill();
            const sdkColor = fill.get_color();

            if (sdkColor) {
                if (sdkColor.get_type() == Asc.c_oAscColor.COLOR_TYPE_SCHEME) {
                    color = {color: Common.Utils.ThemeColor.getHexColor(sdkColor.get_r(), sdkColor.get_g(), sdkColor.get_b()), effectValue: sdkColor.get_value()};
                } else {
                    color = Common.Utils.ThemeColor.getHexColor(sdkColor.get_r(), sdkColor.get_g(), sdkColor.get_b());
                }
            }
        }
        
        this.fillColor = color;
    }

    @action changeCustomColors (colors) {
        this.customColors = colors;
    }

}