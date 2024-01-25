import { Accessor } from 'solid-js';
import { JSX } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';

/**
 * 创建渲染器
 * @param param0
 * @returns
 */
export declare function createFaceRenderer({ facePackages, imgClassName, imgInlineStyle, leftBracket, rightBracket }: FaceRendererProp): (displayOn: Element | string) => string | undefined;

/**
 * 创建一个表情包选择器组件
 *
 * @author KotoriK
 * @returns 一个selectorState，和一个FaceSelector组件
 */
export declare function createFaceSelector(): readonly [FaceSelectorState, (props: FaceSelectorProps) => JSX.Element];

export declare const defaultStyle: FaceSelectorStyle;

/**
 * defaultStyle，但是从JSDelivr拉SVG
 */
export declare const defaultStyleJSDelivr: FaceSelectorStyle;

export declare function deployRenderer(facePackages: FacePackage[]): void;

export declare function deploySelector(facePackages: FacePackage[]): void;

export declare interface Face {
    /**
     * 与php方互通的表情id
     *
     * @type {string}
     * @memberof Face
     */
    id: string;
    /**
     *
     * 表情的url
     * @type {string}
     * @memberof Face
     */
    url: string;
    /**
     * 表情描述
     */
    descr?: string;
}

export declare type FaceDefine = {
    id: string;
    url?: string;
} | string;

export declare interface FacePackage {
    id: string;
    /**
     * 表情包的友好名称
     *
     * @type {string}
     * @memberof FacePackage
     */
    name: string;
    faces: Array<Face>;
    p_url?: string;
    default?: string;
}

export declare interface FacePackageDefine {
    id: string;
    /**
     * 表情包的友好名称
     *
     * @type {string}
     * @memberof FacePackage
     */
    name: string;
    faces: Array<FaceDefine>;
    p_url?: string;
    default?: string;
}

export declare interface FaceRendererProp extends FaceRendererPropOptional {
    facePackages: Array<FacePackage>;
}

/**
 * 可选字段
 */
declare interface FaceRendererPropOptional {
    imgClassName?: string;
    imgInlineStyle?: string;
    leftBracket?: string;
    rightBracket?: string;
}

declare interface FaceSelectorProps {
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

export declare interface FaceSelectorState {
    /**
     * 当前正在查看详情的表情
     */
    inspecting: Accessor<Face | undefined>;
}

export declare interface FaceSelectorStyle {
    svg: {
        pending: string;
        error: string;
    };
}

export declare function getFaceFullUrl(face: FaceDefine, parentPack: FacePackageDefine | FacePackage): {
    url: string;
    id: string;
};

export declare function importExternalFacePacks(url: string): Promise<FacePackage[]>;

export declare function Peak(props: PeakProps): JSX.Element;

export declare interface PeakProps {
    /**
     * 未提供时不会渲染
     */
    src?: string;
    descr?: string;
    class?: string;
    anchor?: HTMLElement;
}

export declare function preprocessFacePack(facepacks: Array<FacePackageDefine>): void;

export declare const setStyleSetting: SetStoreFunction<FaceSelectorStyle>;

export declare const styleSetting: FaceSelectorStyle;

export { }
