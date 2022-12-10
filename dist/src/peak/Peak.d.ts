import { JSX } from 'solid-js';
export interface PeakProps {
    /**
     * 未提供时不会渲染
     */
    imgUrl?: string;
    imgCaption?: string;
    show: boolean;
    class?: string;
    anchor?: HTMLElement;
}
export declare function Peak(props: PeakProps): JSX.Element;
