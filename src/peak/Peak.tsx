import * as generic from '../style';
import { css } from '@emotion/css';
import { createEffect, createSignal, JSX, onCleanup, onMount } from 'solid-js';
import { autoUpdate, computePosition, flip, shift } from '@floating-ui/dom'

export interface PeakProps {
    /**
     * 未提供时不会渲染
     */
    imgUrl?: string
    imgCaption?: string
    show: boolean
    class?: string
    anchor?: HTMLElement
}

const styleFigCaption = css({
    textAlign: "center", backgroundColor: 'rgba(255,255,255,0.65)'
})
const styleHr = css({
    marginTop: 0, marginBottom: 0
})

export function Peak(props: PeakProps) {
    const [style, setStyle] = createSignal<JSX.CSSProperties>({
        position: 'absolute',
        top: 0,
        left: 0,
        width: 'max-content'
    })
    let refSelf: HTMLElement | undefined

    const updatePosition = async () => {
        const position = await computePosition(
            props.anchor!,
            refSelf!,
            {
                middleware: [shift(), flip()]
            }
        )
        setStyle((prevStyle) => {
            return {
                ...prevStyle,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }
        })
    }
    let cleanup: (() => void) | undefined
    onCleanup(() => cleanup?.())


    createEffect(async () => {
        if (props.anchor && refSelf) {
            cleanup = autoUpdate(
                props.anchor,
                refSelf,
                updatePosition
            );
        } else {
            cleanup?.();
            cleanup = undefined
        }
    })
    const show = () => Boolean(props.imgUrl) && props.show
    return (
        <figure style={{ display: show() ? 'block' : 'none',/*  ...props.style */ ...style() }}
            classList={{
                ...props.class ? { [props.class]: true } : {},
                [generic.borderShadow]: true,
                [generic.bgWhiteBlur]: true,
            }}
            ref={refSelf}
        >
            <img src={props.imgUrl} height={200} />
            <hr class={styleHr} />
            <figcaption
                classList={{
                    [styleFigCaption]: true,
                    [generic.bgWhiteBlur]: true,
                }}
            >
                {props.imgCaption}
            </figcaption>
        </figure>
    );
}