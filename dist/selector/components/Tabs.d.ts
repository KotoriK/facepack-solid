import { FacePackage } from '../../FacePackage';
import { JSX } from 'solid-js';
export interface TabProps extends JSX.OptionHTMLAttributes<HTMLOptionElement> {
    pos: number;
    name: string;
    selected: boolean;
}
export interface TabsProps extends JSX.CustomAttributes<HTMLSelectElement> {
    facePackages: Array<FacePackage>;
    onSelect: (newPos: number) => void;
    selectedPos: number;
}
/**
 * 选项卡的一行标签（一行Tab
 *
 * @author KotoriK
 */
export default function Tabs(props: TabsProps): JSX.Element;
