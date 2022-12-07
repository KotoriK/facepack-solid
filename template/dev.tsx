import PopcornFaceSelectorDeployer from '../src/selector/deployer/PopcornFaceSelectorDeployer'
import { createFaceDisplay } from '../src/display/FaceDisplay'
import DefaultFacePack from './dev_importer'
(async () => {
    const commentArea = document.getElementById('comment') as HTMLTextAreaElement
    const facePacks = DefaultFacePack as any
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

    const display = createFaceDisplay({ facePackages: facePacks })
    commentArea
        .addEventListener('change', (e) => {
            console.log(e)
            document.getElementById('display')!.innerText = commentArea.value
            display(document.getElementById('display')!)

        })
    display(document.getElementById('display')!)
})()