import facepacks from './facepacks.json'
import { preprocessFacePack } from '../src/FacePacksImporter'
preprocessFacePack(facepacks)
const FacePacks = facepacks
export default FacePacks