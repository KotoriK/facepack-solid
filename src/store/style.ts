import { createStore } from 'solid-js/store'

import PendingIndicator from '../../static/Ripple-1.3s-237px.svg'
import ErrorIndicator from '../../static/error.svg'

export interface FaceSelectorStyle {
    svg: {
        pending: string,
        error: string
    }
}
export const [styleSetting, setStyleSetting] = createStore<FaceSelectorStyle>({} as any)

export const defaultStyle: FaceSelectorStyle = {
    svg: {
        pending: PendingIndicator,
        error: ErrorIndicator,
    }
}
/**
 * defaultStyle，但是从JSDelivr拉SVG
 */
export const defaultStyleJSDelivr: FaceSelectorStyle = {
    svg: {
        pending: "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/Ripple-1.3s-237px.svg",
        error: "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/error.svg",
    }
}
