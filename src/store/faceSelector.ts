import { Accessor } from "solid-js"
import { Face } from "../FacePackage"

export interface FaceSelectorState {
    /**
     * 当前正在查看详情的表情
     */
    inspecting: Accessor<Face | undefined>
}