
import { createSignal, mergeProps, onCleanup, splitProps, useContext } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { Face } from '../../FacePackage';
import { SelectorContext } from '../context';
import Indicator, { } from './Indicator';
import { REG_IMAGE } from '../../util/isImage';
export interface FaceViewProps extends Omit<JSX.ImgHTMLAttributes<HTMLImageElement> & JSX.VideoHTMLAttributes<HTMLVideoElement>, 'onPointerOut' | 'onPointerEnter' | 'onLoad' | 'onError' | 'src' | 'alt' | 'hidden'> {
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

    const [local, forwardProp] = splitProps(props, ['face'])
    const context = useContext(SelectorContext)
    const isImage = () => local.face.url.match(REG_IMAGE)

    const publicProp = {
        src: local.face.url,
        onClick: context?.select.bind(undefined, local.face),
        onPointerEnter: context?.inspect.bind(undefined, local.face),
        onPointerOut: context?.inspect.bind(undefined, undefined),
        get hidden() { return !loaded() },
        onError: handleError
    }

    return (
        <>
            {(!loaded() || error()) &&
                <Indicator
                    level={error() ? 'error' : 'pending'}
                    alt={local.face.descr ?? local.face.id}
                    style={{ /* ...props.style, */ transition: "opacity 2s ease" }}
                    {...forwardProp}
                />}
            {isImage() ? <img {...mergeProps(publicProp, forwardProp)} alt={local.face.descr ?? local.face.id} onLoad={handleLoad} /> :
                <FaceViewVideoAutoPlay {...mergeProps(publicProp, forwardProp)} muted loop playsinline onCanPlay={handleLoad} />
            }
        </>
    )
}

function FaceViewVideoAutoPlay(props: JSX.VideoHTMLAttributes<HTMLVideoElement> & { onCanPlay: JSX.EventHandler<HTMLVideoElement, Event> }) {
    let ref: HTMLVideoElement | undefined = undefined
    let timer: number
    const [local, forward] = splitProps(props, ['onCanPlay'])

    onCleanup(() => { clearTimeout(timer) })

    return <video ref={ref} {...forward} onCanPlay={(e) => {
        if (ref?.paused) {
            local.onCanPlay(e)
            timer = requestIdleCallback(() => {
                if (document.contains(ref!)) {
                    ref!.play()
                }
            }, { timeout: 1000 })
        }
    }} />
}