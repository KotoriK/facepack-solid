import { Face } from '../FacePackage';
export declare const SelectorContext: import('solid-js').Context<SelectorContextType | undefined>;
export interface SelectorContextType {
    select: (face: Face) => void;
    inspect: (face?: Face) => void;
}
