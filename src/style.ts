import { css } from "@emotion/css";
/**
 * 定义主体高度
 */
export const mainHeight = 325

export const borderShadow = css({
    boxShadow: '2px 2px 15px #888888',
    border: '0.5px #888888 solid',
    zIndex: 999,
})
export const bgWhiteBlur = css({
    backgroundColor: 'rgba(255,255,255,0.6)',
    backdropFilter: 'blur(3px)'
})
export const main = css({
    padding: '2px',
    height: mainHeight
})