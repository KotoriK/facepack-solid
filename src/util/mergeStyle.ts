import { JSX } from "solid-js/jsx-runtime";

export default function mergeStyle(...args: Array<JSX.CSSProperties | string>): JSX.CSSProperties | string {
    return args.map(span =>
        typeof span === 'string' ? span : object2string(span)
    ).join('')
}
function object2string(input: JSX.CSSProperties): string {
    return Object.entries(input).map((arr) => arr.join(':')).join(';')
}