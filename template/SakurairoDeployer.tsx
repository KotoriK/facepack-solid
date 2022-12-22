import { createSignal, } from 'solid-js'
import { render } from 'solid-js/web'
import { createFaceRenderer, defaultStyle, FacePackage, setStyleSetting } from '../src'
import { Peak } from '../src/peak'
import { createFaceSelector } from '../src/selector/components/FaceSelector'

export function deployRenderer(facePackages: FacePackage[]) {
    const render = createFaceRenderer({
        facePackages: facePackages
    })
    setStyleSetting(defaultStyle)

    document.querySelectorAll('article.hentry p:not(.ct-respond-form-textarea):not(.form-submit)').forEach(render)
}
export function deploySelector(facePackages: FacePackage[]) {
    let emotionBox: HTMLElement | null
    let commentArea: HTMLTextAreaElement | HTMLInputElement | null
    if ((emotionBox = document.querySelector<HTMLElement>('.emotion-box'))
        && (commentArea = document.querySelector('#comment'))
    ) {
        const [{ inspecting }, FaceSelector] = createFaceSelector()
        const [hide, setHide] = createSignal(true)
        const [loadContent, setLoadContent] = createSignal(false)

        render(() => <FaceSelector facePacks={facePackages}
            loadContent={loadContent()}
            handleHide={() => setHide(true)}
            style={`display:${hide() ? 'none' : 'block'}`}
            onSelect={(pack, face) => {
                commentArea!.value += `:${pack.id}.${face.id}:`
            }} />, emotionBox)
        // init toggler
        document.getElementById('emotion-toggle')?.addEventListener('click', () => {
            setLoadContent(true)
            setHide(prev => !prev)
        })

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