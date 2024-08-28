import { render, createComponent } from 'solid-js/web';
import { createSignal } from 'solid-js';
import { c as createFaceSelector, P as Peak } from './FaceSelector-CWUP-Gsv.js';

function deploySelector(facePackages) {
  const emotionBox = document.querySelector(".emotion-box");
  const commentArea = document.querySelector("#comment");
  if (emotionBox && commentArea) {
    document.querySelector(".motion-switcher-table th:last-child")?.insertAdjacentHTML("afterend", `<th onclick="motionSwitch('.custom')" class="custom-bar">YukiCat 特供</th>`);
    const container = document.createElement("div");
    container.className = "custom-container";
    container.style.cssText = "display:none;height:110px;overflow-y:auto;width:100%;";
    emotionBox.append(container);
    const [{
      inspecting
    }, FaceSelector] = createFaceSelector();
    const [loadContent, setLoadContent] = createSignal(false);
    render(() => createComponent(FaceSelector, {
      facePacks: facePackages,
      get loadContent() {
        return loadContent();
      },
      onSelect: (pack, face) => {
        const insertion = `:${pack.id}.${face.id}:`;
        if (commentArea.selectionStart === null) {
          return;
        }
        if (commentArea.selectionStart || commentArea.selectionStart === 0) {
          const startPos = commentArea.selectionStart, endPos = commentArea.selectionEnd;
          let cursorPos = endPos;
          commentArea.value = commentArea.value.substring(0, startPos) + insertion + commentArea.value.substring(endPos, commentArea.value.length);
          cursorPos += insertion.length;
          commentArea.focus();
          commentArea.selectionStart = cursorPos;
          commentArea.selectionEnd = cursorPos;
        } else {
          commentArea.value += insertion;
          commentArea.focus();
        }
      }
    }), container);
    document.getElementById("emotion-toggle")?.addEventListener("click", () => {
      setLoadContent(true);
    }, {
      once: true
    });
    const peak = document.createElement("div");
    document.body.append(peak);
    render(() => {
      const imgCaption = () => {
        const face = inspecting();
        return face ? face.descr ?? face.id : void 0;
      };
      return createComponent(Peak, {
        get src() {
          return inspecting()?.url;
        },
        get descr() {
          return imgCaption();
        },
        anchor: emotionBox
      });
    }, peak);
  }
}

export { deploySelector };
//# sourceMappingURL=SakurairoDeployer.js.map
