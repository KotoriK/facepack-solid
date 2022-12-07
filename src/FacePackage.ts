import { processTemplate } from "./util/template";

export interface FacePackage {
    id: string

    /**
     * 表情包的友好名称
     *
     * @type {string}
     * @memberof FacePackage
     */
    name: string
    faces: Array<Face>
    p_url?: string
    default?: string
}
export interface FacePackageDefine {
    id: string

    /**
     * 表情包的友好名称
     *
     * @type {string}
     * @memberof FacePackage
     */
    name: string
    faces: Array<FaceDefine>
    p_url?: string
    default?: string
}
export interface Face {

    /**
     * 与php方互通的表情id
     *
     * @type {string}
     * @memberof Face
     */
    id: string

    /**
     *
     * 表情的url
     * @type {string}
     * @memberof Face
     */
    url: string

}
export type FaceDefine = {
    id: string
    url?: string
} | string
export function getFaceFullUrl(face: FaceDefine, parentPack: FacePackageDefine | FacePackage) {
    const _face = typeof face == "string" ? { id: face } : face
    const _process = (ph: string) => processTemplate('{', '}', (str) => {
        if(str=='id'){
            return _face.id
        }else if (str in parentPack){
            return parentPack[str]
        }else{
            return `{${str}}`
        }
    }, ph)
    const { url, ...other_key } = _face
    return {
        ...other_key, url: _process(url && _process(url) || parentPack.default)
    }
}