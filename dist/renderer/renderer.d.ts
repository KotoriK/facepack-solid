import { FacePackage } from '../FacePackage';
/**
 * 可选字段
 */
interface FaceRendererPropOptional {
    imgClassName?: string;
    imgInlineStyle?: string;
    leftBracket?: string;
    rightBracket?: string;
}
export interface FaceRendererProp extends FaceRendererPropOptional {
    facePackages: Array<FacePackage>;
}
/**
 * 创建渲染器
 * @param param0
 * @returns
 */
export declare function createFaceRenderer({ facePackages, imgClassName, imgInlineStyle, leftBracket, rightBracket }: FaceRendererProp): (displayOn: Element | string) => string | undefined;
export {};
