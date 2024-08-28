import { JSX } from 'solid-js/jsx-runtime';
import { Face } from '../../FacePackage';
export interface FaceViewProps extends Omit<JSX.ImgHTMLAttributes<HTMLImageElement> & JSX.VideoHTMLAttributes<HTMLVideoElement>, 'onPointerOut' | 'onPointerEnter' | 'onLoad' | 'onError' | 'src' | 'alt' | 'hidden'> {
    face: Face;
}
/**
 * 表情的渲染
 *
 * @author KotoriK
 * @param {FaceViewProps} props
 * @returns
 */
export default function FaceView(props: FaceViewProps): JSX.Element;
