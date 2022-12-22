import { FacePackage, Face } from '../../FacePackage';
import Tabs from './Tabs';
import FlexboxView from './FlexboxView';
import { createSignal, JSX } from 'solid-js';
import { borderShadow, bgWhiteBlur, mainHeight } from '../../style';
import { SelectorContext } from '../context';
import { FaceSelectorState } from '../../store';
import { css } from '@emotion/css'

const main = css({
    padding: '2px',
    maxHeight: mainHeight,
    width: '100%',
})
const styleInner = css({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
})
export interface FaceSelectorProps {
    /**
    *  加载的表情包集
    */
    facePacks: Array<FacePackage>,
    /**
    *  实现隐藏FaceSelector的方法
    */
    handleHide: Function
    /**
    * 指示是否加载表情
    */
    loadContent: boolean
    class?: string
    style?: JSX.CSSProperties | string
    ref?: HTMLDivElement
    onSelect: (facePack: FacePackage, face: Face) => void
}

/**
 * 创建一个表情包选择器组件
 *
 * @author KotoriK
 * @returns 一个selectorState，和一个FaceSelector组件
 */
export function createFaceSelector() {
    const [inspecting, inspect] = createSignal<Face | undefined>()

    return [{
        inspecting,
    } as FaceSelectorState,
    /**
     *表情包选择器的完整主体
     *
     * @author KotoriK
     * @export
     * @param { children }
     * @returns
     */
    function FaceSelector(props: FaceSelectorProps) {
        const [_nowPackagePos, setPos] = createSignal(0)

        /*     const head = useRef<HTMLSelectElement>()
            const body = useRef<HTMLDivElement>() */
        /*     const handleFaceSelected = useCallback((face_pos: number) => {
                const nowPackage = facePacks[_nowPackagePos()]
                onFaceSelected(nowPackage, nowPackage.faces[face_pos])
                handleHide()
            }, [handleHide, onFaceSelected, facePacks, _nowPackagePos]) */
        /*     useEffect(() => {
                //设定内网格高度
                if (loadContent) body.current.style.height = classes.mainHeight - head.current.clientHeight + 'px'
            }, [loadContent]) */

        const nowPackagePos = () => {
            const maxPos = props.facePacks.length - 1
            const _now = _nowPackagePos()
            if (_now > maxPos) return maxPos //防止prop发生改动带来越界
            return _now
        }

        return <SelectorContext.Provider value={
            {
                select: (face) => props.onSelect(props.facePacks[nowPackagePos()], face),
                inspect
            }
        }>
            <div ref={props.ref}/* style={{ ...style }} */
                classList={props.class ? {
                    [props.class]: true
                } : {
                    [borderShadow]: true,
                    [bgWhiteBlur]: true,
                    [main]: true
                }}
                style={props.style}
            >
                <div class={styleInner}>
                    <Tabs facePackages={props.facePacks}
                        selectedPos={nowPackagePos()}
                        onSelect={setPos}
                    />
                    {
                        props.loadContent &&
                        <FlexboxView facePackage={props.facePacks[nowPackagePos()]} />
                    }
                </div>
            </div>
        </SelectorContext.Provider>
    }] as const
}