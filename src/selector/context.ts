import { createContext } from "solid-js";
import { Face } from "../FacePackage";

export const SelectorContext = createContext<SelectorContextType>()
export interface SelectorContextType {
    select: (face: Face) => void,
    inspect: (face?: Face) => void
}