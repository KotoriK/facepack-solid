export interface FacePackage {
    id: string;
    /**
     * 表情包的友好名称
     *
     * @type {string}
     * @memberof FacePackage
     */
    name: string;
    faces: Array<Face>;
    p_url?: string;
    default?: string;
}
export interface FacePackageDefine {
    id: string;
    /**
     * 表情包的友好名称
     *
     * @type {string}
     * @memberof FacePackage
     */
    name: string;
    faces: Array<FaceDefine>;
    p_url?: string;
    default?: string;
}
export interface Face {
    /**
     * 与php方互通的表情id
     *
     * @type {string}
     * @memberof Face
     */
    id: string;
    /**
     *
     * 表情的url
     * @type {string}
     * @memberof Face
     */
    url: string;
    /**
     * 表情描述
     */
    descr?: string;
}
export declare type FaceDefine = {
    id: string;
    url?: string;
} | string;
export declare function getFaceFullUrl(face: FaceDefine, parentPack: FacePackageDefine | FacePackage): {
    url: string;
    id: string;
};
