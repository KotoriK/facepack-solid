import { createFaceRenderer } from '../src/renderer/renderer'
import DefaultFacePack from './dev_importer'
import { render } from 'solid-js/web'
import { FacePackage } from '../src/FacePackage'
import { createFaceSelector } from '../src/selector/components/FaceSelector'
import { Peak } from '../src/peak'
import { setStyleSetting, defaultStyle } from '../src'
import { createSignal } from 'solid-js'

(async () => {
    const commentArea = document.getElementById('comment') as HTMLTextAreaElement
    const facePacks = DefaultFacePack as FacePackage[]
    /*     new PopcornFaceSelectorDeployer({
            popcorn: document.getElementById('show-fs'),
            tooltip: document.getElementById('fs-c'),
            facePackages: facePacks,
            onFaceSelected:
                (pack, face) => {
                    commentArea.value += `:${pack.id}.${face.id}:`
                }, popperOptions: { placement: 'top' },peakPopperOptions:{
                    placement: "right-start", modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 20],
                            },
                        },
                    ],
                },style:{width:200}
        }).render().switchHide() */

    const display = createFaceRenderer({ facePackages: facePacks })
    commentArea
        .addEventListener('input', (e) => {
            document.getElementById('display')!.innerText = commentArea.value
            display(document.getElementById('display')!)
        })

    setStyleSetting(defaultStyle)

    const [{ inspecting }, FaceSelector] = createFaceSelector()

    const [hide, setHide] = createSignal(true)
    const showFs = document.getElementById('show-fs')
    showFs?.addEventListener('click', () => setHide(prev => !prev))
    let anchor: HTMLDivElement | undefined
    render(() => <FaceSelector
        ref={anchor}
        facePacks={facePacks}
        style={{ display: hide() ? 'none' : 'block' }}
        onSelect={(facepack, face) => {
            commentArea.value += `:${facepack.id}.${face?.id}:`
        }}
        handleHide={() => { setHide(true) }}
        loadContent

    />, document.getElementById('selector')!)

    const peak = document.createElement('div')
    document.body.append(peak)

    render(() => {

        const imgCaption = () => {
            const face = inspecting()
            return face ? (face.descr ?? face.id) : undefined
        }
        return <Peak src={inspecting()?.url} descr={imgCaption()} anchor={anchor} show />
    }, peak)

})()
