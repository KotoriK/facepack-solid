import { importJSON } from './util/importJSON'
import { FacePackage, FacePackageDefine, getFaceFullUrl } from './FacePackage'
export async function importExternalFacePacks(url: string) {
    const json: Array<FacePackageDefine> = await importJSON(url)
    if (json) {
        preprocessFacePack(json)
        return json as Array<FacePackage>
    }
    throw new Error(`Try to load FacePacks from '${url}' failed.`)
}
export function preprocessFacePack(facepacks: Array<FacePackageDefine>) {
    for (const pack of facepacks) {
        pack.faces = pack.faces.map((face) => getFaceFullUrl(face, pack))
    }
}