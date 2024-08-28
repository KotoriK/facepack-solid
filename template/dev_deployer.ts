import { importExternalFacePacks } from '../src/FacePacksImporter'
import { deployRenderer, deploySelector } from '../src/SakurairoDeployer'

importExternalFacePacks('https://cdn.jsdelivr.net/gh/YukiCat-Dev/yukicat.facepack/facepacks.json')
    .then(fp => {
        deployRenderer(fp)
        deploySelector(fp)
    })