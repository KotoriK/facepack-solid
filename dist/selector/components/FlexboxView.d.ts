import { FacePackage } from '../../FacePackage';
export interface FlexboxViewProp {
    /**
     *
     * 要显示的表情包
     * @type {FacePackage}
     * @memberof TableViewProps
     */
    facePackage: FacePackage;
}
export default function FlexboxView(props: FlexboxViewProp): import("solid-js").JSX.Element;
