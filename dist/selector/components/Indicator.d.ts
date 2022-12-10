import type { JSX } from "solid-js/jsx-runtime";
import { FaceSelectorStyle } from "../../store/style";
export declare type IndicateLevel = keyof FaceSelectorStyle['svg'];
export interface IndicatorProps extends Omit<JSX.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    level: IndicateLevel;
}
/**
 *一个指示错误的组件
 *
 * @author KotoriK
 * @export
 * @param {IndicatorProps} props
 * @returns
 */
export default function Indicator(prop: IndicatorProps): JSX.Element;
