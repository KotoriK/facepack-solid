import { createSignal, } from 'solid-js'
import { render } from 'solid-js/web'
import { FacePackage } from '.'
import { Peak } from './peak'
import { createFaceSelector } from './selector/components/FaceSelector'

/* export function deployRenderer(facePackages: FacePackage[]) {
    const render = createFaceRenderer({
        facePackages: facePackages
    })
    setStyleSetting(defaultStyle)

    document.querySelectorAll('article.hentry p:not(.ct-respond-form-textarea):not(.form-submit)').forEach(render)
} */
export function deploySelector(facePackages: FacePackage[]) {
    const emotionBox: HTMLElement | null = document.querySelector<HTMLElement>('.emotion-box')!
    const commentArea: HTMLTextAreaElement | HTMLInputElement | null = document.querySelector('#comment')!
    if (emotionBox && commentArea) {
        document.querySelector('.motion-switcher-table th:last-child')?.insertAdjacentHTML('afterend', `<th onclick="motionSwitch('.custom')" class="custom-bar">YukiCat 特供</th>`)
        const container = document.createElement('div')
        container.className = 'custom-container'
        container.style.cssText = "display:none;height:110px;overflow-y:auto;width:100%;"
        emotionBox.append(container)
        const [{ inspecting }, FaceSelector] = createFaceSelector()
/*         const [hide, setHide] = createSignal(true)
 */        const [loadContent, setLoadContent] = createSignal(false)

        render(() => <FaceSelector facePacks={facePackages}
            loadContent={loadContent()}
          //  handleHide={() => setHide(true)}
/*             style={`display:${hide() ? 'none' : 'block'}`}
 */            onSelect={(pack, face) => {
                // 替换当前选中部分的文本
                const insertion = `:${pack.id}.${face.id}:`
                if (commentArea.selectionStart === null) {
                    return
                }
                // from Sakurairo-Script grin()
                if (commentArea.selectionStart || commentArea.selectionStart === 0) {
                    const startPos = commentArea.selectionStart,
                        endPos = commentArea.selectionEnd!
                    let cursorPos = endPos;
                    commentArea.value = commentArea.value.substring(0, startPos) + insertion + commentArea.value.substring(endPos, commentArea.value.length);
                    cursorPos += insertion.length;
                    commentArea.focus();
                    commentArea.selectionStart = cursorPos;
                    commentArea.selectionEnd = cursorPos;
                } else {
                    commentArea.value += insertion;
                    commentArea.focus();
                }
                // end quote
            }} />, container)
        // init toggler
        document.getElementById('emotion-toggle')?.addEventListener('click', () => {
            setLoadContent(true)
/*             setHide(prev => !prev)
 */        }, { once: true })

        // init Peak
        const peak = document.createElement('div')
        document.body.append(peak)
        render(() => {
            const imgCaption = () => {
                const face = inspecting()
                return face ? (face.descr ?? face.id) : undefined
            }
            return <Peak src={inspecting()?.url} descr={imgCaption()} anchor={emotionBox!} />
        }, peak)
    }
}