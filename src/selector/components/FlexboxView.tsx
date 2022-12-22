import { css } from "@emotion/css";
import { For } from "solid-js";
import { FacePackage } from "../../FacePackage";
import FaceView from './FaceView'

const styleItem = css({
    width: "45px", height: "45px", padding: 1
})
const styleGrid = css({
    overflow: "auto", minHeight: 0, flex: '1 1 0', textAlign: 'center'
})

export interface FlexboxViewProp {
    /**
     *
     * 要显示的表情包
     * @type {FacePackage}
     * @memberof TableViewProps
     */
    facePackage: FacePackage
}

export default function FlexboxView(props: FlexboxViewProp) {
    return <div class={styleGrid}>
        <For each={props.facePackage.faces}>
            {
                face => <FaceView
                    face={face}
                    class={styleItem} />
            }
        </For>
    </div>

}