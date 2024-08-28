import { R as REG_IMAGE } from './isImage-DdKfefTy.js';
import { p as processTemplate } from './template-BmwbrKSM.js';

function createFaceRenderer({
  facePackages,
  imgClassName = "",
  imgInlineStyle = "max-height:6vh;",
  leftBracket = ":",
  rightBracket = ":"
}) {
  const map = {};
  for (const pack of facePackages) {
    for (const face of pack.faces) {
      map[`${pack.id}.${face.id}`] = face.url;
    }
  }
  const replacePlaceHolder = (placeHolder) => {
    const url = map[placeHolder];
    if (url) {
      if (url.match(REG_IMAGE)) {
        return `<img class="${imgClassName}" src="${url}" style="${imgInlineStyle}" alt="${leftBracket}${placeHolder}${rightBracket}"/>`;
      } else {
        return `<video class="${imgClassName}" src="${url}" style="${imgInlineStyle}" title="${leftBracket}${placeHolder}${rightBracket}" playsinline muted loop autoplay></video>`;
      }
    } else {
      return `${leftBracket}${placeHolder}${rightBracket}`;
    }
  };
  const renderText = (text) => processTemplate(leftBracket, rightBracket, replacePlaceHolder, text);
  return function renderFace(displayOn) {
    if (typeof displayOn === "string") {
      return renderText(displayOn);
    } else {
      const raw = displayOn.innerHTML;
      const result = renderText(raw);
      if (result !== raw) displayOn.innerHTML = result;
    }
  };
}

export { createFaceRenderer };
//# sourceMappingURL=renderer.js.map
