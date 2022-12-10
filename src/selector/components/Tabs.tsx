import { FacePackage } from '../../FacePackage';
import { bgWhiteBlur } from '../../style';
import { css } from '@emotion/css';
import { createSelector, For, JSX } from 'solid-js';

export interface TabProps extends JSX.OptionHTMLAttributes<HTMLOptionElement> {
    pos: number
    name: string
    selected: boolean
}
/**
 *选项卡的单个标签
 *
 * @author KotoriK
 * @export
 * @param {TabProps} props
 * @returns
 */
function Tab(props: TabProps) {
    return (
        <option selected={props.selected} style={props.style} class={props.class}
            value={props.pos}>
            {props.name}
        </option>
    )
}

export interface TabsProps extends JSX.CustomAttributes<HTMLSelectElement> {
    facePackages: Array<FacePackage>,
    onSelect: (newPos: number) => void,
    selectedPos: number
}

const styles = css({
    width: "100%", border: 0, fontWeight: 'bold'
})
/**
 * 选项卡的一行标签（一行Tab
 *
 * @author KotoriK
 */
export default function Tabs(props: TabsProps) {
    const isSelected = createSelector(() => props.selectedPos)
    return (
        <select ref={props.ref}
            classList={{ [styles]: true, [bgWhiteBlur]: true }}
            onChange={(e) => props.onSelect(parseInt(e.currentTarget.value))}>
            <For each={props.facePackages}>
                {(item, index) =>
                    <Tab pos={index()} name={item.name}
                        selected={isSelected(index())} />
                }
            </For>
        </select>
    )
}