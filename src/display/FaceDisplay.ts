import { FacePackage } from "../FacePackage"
import { processTemplate } from "../util/template"
/**
 * 可选字段
 */
interface FaceDisplayPropOptional {
    imgClassName?: string
    imgInlineStyle?: string
    leftBracket?: string
    rightBracket?: string
}
export interface FaceDisplayProp extends FaceDisplayPropOptional {
    facePackages: Array<FacePackage>
}

/**
 * 创建渲染器
 * @param param0 
 * @returns 
 */
export function createFaceDisplay(
    {
        facePackages,
        imgClassName = '',
        imgInlineStyle = 'max-height:6vh;',
        leftBracket = ':',
        rightBracket = ':'
    }: FaceDisplayProp) {
    const map: Record<string, string> = {}
    for (const pack of facePackages) {
        for (const face of pack.faces) {
            map[`${pack.id}.${face.id}`] = face.url
        }
    }
    const replacePlaceHolder = (placeHolder: string) => {
        const url = map[placeHolder]
        if (url) {
            return `<img class="${imgClassName}" src="${url}" style="${imgInlineStyle}" alt="${leftBracket}${placeHolder}${rightBracket}"/>`
        } else {
            return `${leftBracket}${placeHolder}${rightBracket}`
        }
    }
    const renderText = (text: string) => processTemplate(leftBracket, rightBracket, replacePlaceHolder, text)

    return function display(displayOn: Element | string) {
        if (typeof displayOn === 'string') {
            return renderText(displayOn)
        } else {
            const raw = displayOn.innerHTML
            const result = renderText(raw)
            if (result !== raw) displayOn.innerHTML = result
        }
    }
}