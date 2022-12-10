
import { createSignal, splitProps, useContext } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { Face } from '../../FacePackage';
import { SelectorContext } from '../context';
import Indicator, { } from './Indicator';
export interface FaceViewProps extends Omit<JSX.ImgHTMLAttributes<HTMLImageElement>, 'onPointerOut' | 'onPointerEnter' | 'onLoad' | 'onError' | 'src' | 'alt' | 'hidden'> {
    face: Face
}
/**
 * 表情的渲染
 *
 * @author KotoriK
 * @param {FaceViewProps} props
 * @returns
 */
export default function FaceView(props: FaceViewProps) {
    const [loaded, setLoaded] = createSignal(false)
    const [error, setError] = createSignal(false)
    const handleError = () => {
        setLoaded(false)
        setError(true)
    }
    const handleLoad = () => {
        setLoaded(true)
        setError(false)
    }

    const [face, forwardProp] = splitProps(props, ['face'])
    const context = useContext(SelectorContext)
    return (
        <>
            {(!loaded() || error()) &&
                <Indicator
                    level={error() ? 'error' : 'pending'}
                    alt={face.face.descr ?? face.face.id}
                    style={{ /* ...props.style, */ transition: "opacity 2s ease" }}
                    {...forwardProp}
                />}
            <img {...forwardProp}
                src={face.face.url}
                alt={face.face.descr ?? face.face.id}
                onClick={context?.select.bind(undefined, face.face)}
                onPointerEnter={context?.inspect.bind(undefined, face.face)}
                onPointerOut={context?.inspect.bind(undefined, undefined)}
                onLoad={handleLoad}
                hidden={!loaded}
                onError={handleError} />
        </>
    )
}