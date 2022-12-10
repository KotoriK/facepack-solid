import { css } from "@emotion/css";
import { For } from "solid-js";
import { FacePackage } from "../../FacePackage";
import FaceView from './FaceView'

const styleCol = css({
    flex: 1, width: "45px", height: "45px", padding: "1px 1px 1px 1px"
})
const styleRow = css({
    flexWrap: "wrap", overflow: "auto", gap: 2
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
    return <div class={styleRow}>
        <For each={props.facePackage.faces}>
            {
                face => <FaceView
                    face={face}
                    class={styleCol} />
            }
        </For>
    </div>

}