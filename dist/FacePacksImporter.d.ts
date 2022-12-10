import { FacePackage, FacePackageDefine } from './FacePackage';
export declare function importExternalFacePacks(url: string): Promise<FacePackage[]>;
export declare function preprocessFacePack(facepacks: Array<FacePackageDefine>): void;
