export interface FaceSelectorStyle {
    svg: {
        pending: string;
        error: string;
    };
}
export declare const styleSetting: FaceSelectorStyle, setStyleSetting: import("solid-js/store").SetStoreFunction<FaceSelectorStyle>;
export declare const defaultStyle: FaceSelectorStyle;
/**
 * defaultStyle，但是从JSDelivr拉SVG
 */
export declare const defaultStyleJSDelivr: FaceSelectorStyle;
