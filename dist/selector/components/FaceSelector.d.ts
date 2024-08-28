import { FacePackage, Face } from '../../FacePackage';
import { JSX } from 'solid-js';
import { FaceSelectorState } from '../../store';
export interface FaceSelectorProps {
    /**
    *  加载的表情包集
    */
    facePacks: Array<FacePackage>;
    /**
    *  实现隐藏FaceSelector的方法
    */
    handleHide?: () => void;
    /**
    * 指示是否加载表情
    */
    loadContent: boolean;
    class?: string;
    style?: JSX.CSSProperties | string;
    ref?: HTMLDivElement;
    onSelect: (facePack: FacePackage, face: Face) => void;
}
/**
 * 创建一个表情包选择器组件
 *
 * @author KotoriK
 * @returns 一个selectorState，和一个FaceSelector组件
 */
export declare function createFaceSelector(): readonly [FaceSelectorState, (props: FaceSelectorProps) => JSX.Element];
