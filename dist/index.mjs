import { use, insert, memo, className, effect, setAttribute, style, classList, template, createComponent, spread, mergeProps, render } from 'solid-js/web';
import { css } from '@emotion/css';
import { createSignal, onCleanup, createEffect, createSelector, For, createContext, splitProps, useContext, mergeProps as mergeProps$1 } from 'solid-js';
import { autoUpdate, computePosition, shift, flip } from '@floating-ui/dom';
import { createStore } from 'solid-js/store';

const mainHeight = 325;
const borderShadow = css({
  boxShadow: "2px 2px 15px #888888",
  border: "0.5px #888888 solid",
  zIndex: 999
});
const bgWhiteBlur = css({
  backgroundColor: "rgba(255,255,255,0.6)",
  backdropFilter: "blur(3px)"
});

const REG_IMAGE = /\.(jpg|png|gif)$/i;

const _tmpl$$5 = /*#__PURE__*/template(`<figure><hr><figcaption></figcaption></figure>`, 5),
  _tmpl$2$2 = /*#__PURE__*/template(`<img>`, 1),
  _tmpl$3 = /*#__PURE__*/template(`<video playsinline loop muted autoplay></video>`, 2);
const styleFigCaption = css({
  textAlign: "center",
  backgroundColor: 'rgba(255,255,255,0.65)'
});
const styleHr = css({
  marginTop: 0,
  marginBottom: 0
});
const styleFace = css({
  minWidth: 200,
  height: 200
});
function Peak(props) {
  const [style$1, setStyle] = createSignal({
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'max-content',
    "min-width": 'auto'
  });
  let refSelf;
  const updatePosition = async () => {
    const position = await computePosition(props.anchor, refSelf, {
      middleware: [shift(), flip()]
    });
    setStyle(prevStyle => {
      return {
        ...prevStyle,
        left: `${position.x}px`,
        top: `${position.y}px`
      };
    });
  };
  let cleanup;
  onCleanup(() => cleanup?.());
  createEffect(async () => {
    if (props.anchor && refSelf) {
      cleanup = autoUpdate(props.anchor, refSelf, updatePosition);
    } else {
      cleanup?.();
      cleanup = undefined;
    }
  });
  const show = () => Boolean(props.src); /* && props.show */
  const isImage = () => Boolean(props.src?.match(REG_IMAGE));
  return (() => {
    const _el$ = _tmpl$$5.cloneNode(true),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling;
    const _ref$ = refSelf;
    typeof _ref$ === "function" ? use(_ref$, _el$) : refSelf = _el$;
    insert(_el$, (() => {
      const _c$ = memo(() => !!isImage());
      return () => _c$() ? (() => {
        const _el$4 = _tmpl$2$2.cloneNode(true);
        className(_el$4, styleFace);
        effect(() => setAttribute(_el$4, "src", props.src));
        return _el$4;
      })() : (() => {
        const _el$5 = _tmpl$3.cloneNode(true);
        className(_el$5, styleFace);
        effect(() => setAttribute(_el$5, "src", props.src));
        return _el$5;
      })();
    })(), _el$2);
    className(_el$2, styleHr);
    insert(_el$3, () => props.descr);
    effect(_p$ => {
      const _v$ = {
          display: show() ? 'block' : 'none',
          /*  ...props.style */...style$1()
        },
        _v$2 = {
          ...(props.class ? {
            [props.class]: true
          } : {}),
          [borderShadow]: true,
          [bgWhiteBlur]: true
        },
        _v$3 = {
          [styleFigCaption]: true,
          [bgWhiteBlur]: true
        };
      _p$._v$ = style(_el$, _v$, _p$._v$);
      _p$._v$2 = classList(_el$, _v$2, _p$._v$2);
      _p$._v$3 = classList(_el$3, _v$3, _p$._v$3);
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
}

function processTemplate(left_bracket, right_bracket, replacePlaceHolder, str) {
  let inBracket = false, newText = "", bracketContent = "";
  for (const char of str) {
    switch (char) {
      case left_bracket:
        if (inBracket) {
          if (left_bracket == right_bracket) {
            inBracket = false;
            newText += replacePlaceHolder(bracketContent);
            bracketContent = "";
          } else {
            inBracket = false;
            newText += `${left_bracket}${bracketContent}${left_bracket}`;
            bracketContent = "";
          }
        } else {
          inBracket = true;
        }
        break;
      case right_bracket:
        if (inBracket) {
          inBracket = false;
          newText += replacePlaceHolder(bracketContent);
          bracketContent = "";
        } else {
          newText += char;
        }
        break;
      case " ":
      case "\n":
      case "\r":
      case "	":
      case "\v":
      case "\f":
        if (inBracket) {
          inBracket = false;
          newText += `${left_bracket}${bracketContent}${char}`;
          bracketContent = "";
        } else {
          newText += char;
        }
        break;
      default:
        if (inBracket) {
          bracketContent += char;
        } else {
          newText += char;
        }
    }
  }
  if (bracketContent != "") {
    newText += left_bracket + bracketContent;
    inBracket = false;
  }
  if (inBracket) {
    newText += left_bracket;
  }
  return newText;
}

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
      if (result !== raw)
        displayOn.innerHTML = result;
    }
  };
}

const _tmpl$$4 = /*#__PURE__*/template(`<option></option>`, 2),
  _tmpl$2$1 = /*#__PURE__*/template(`<select></select>`, 2);
/**
 *????????????????????????
 *
 * @author KotoriK
 * @export
 * @param {TabProps} props
 * @returns
 */
function Tab(props) {
  return (() => {
    const _el$ = _tmpl$$4.cloneNode(true);
    insert(_el$, () => props.name);
    effect(_p$ => {
      const _v$ = props.selected,
        _v$2 = props.style,
        _v$3 = props.class;
      _v$ !== _p$._v$ && (_el$.selected = _p$._v$ = _v$);
      _p$._v$2 = style(_el$, _v$2, _p$._v$2);
      _v$3 !== _p$._v$3 && className(_el$, _p$._v$3 = _v$3);
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    effect(() => _el$.value = props.pos);
    return _el$;
  })();
}
const styles = css({
  width: "100%",
  border: 0,
  fontWeight: 'bold'
});
/**
 * ?????????????????????????????????Tab
 *
 * @author KotoriK
 */
function Tabs(props) {
  const isSelected = createSelector(() => props.selectedPos);
  return (() => {
    const _el$2 = _tmpl$2$1.cloneNode(true);
    _el$2.addEventListener("change", e => props.onSelect(parseInt(e.currentTarget.value)));
    const _ref$ = props.ref;
    typeof _ref$ === "function" ? use(_ref$, _el$2) : props.ref = _el$2;
    insert(_el$2, createComponent(For, {
      get each() {
        return props.facePackages;
      },
      children: (item, index) => createComponent(Tab, {
        get pos() {
          return index();
        },
        get name() {
          return item.name;
        },
        get selected() {
          return isSelected(index());
        }
      })
    }));
    effect(_$p => classList(_el$2, {
      [styles]: true,
      [bgWhiteBlur]: true
    }, _$p));
    return _el$2;
  })();
}

const SelectorContext = createContext();

const PendingIndicator = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHN0eWxlPSJtYXJnaW46IGF1dG87IGJhY2tncm91bmQ6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyBzaGFwZS1yZW5kZXJpbmc6IGF1dG87IiB3aWR0aD0iMjM3cHgiIGhlaWdodD0iMjM3cHgiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzkuNDk5NiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODVhMmI2IiBzdHJva2Utd2lkdGg9IjMiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuMjk4NzAxMjk4NzAxMjk4N3MiIHZhbHVlcz0iMDs0MCIga2V5VGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGNhbGNNb2RlPSJzcGxpbmUiIGJlZ2luPSItMC42NDkzNTA2NDkzNTA2NDkzcyI+PC9hbmltYXRlPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuMjk4NzAxMjk4NzAxMjk4N3MiIHZhbHVlcz0iMTswIiBrZXlUaW1lcz0iMDsxIiBrZXlTcGxpbmVzPSIwLjIgMCAwLjggMSIgY2FsY01vZGU9InNwbGluZSIgYmVnaW49Ii0wLjY0OTM1MDY0OTM1MDY0OTNzIj48L2FuaW1hdGU+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMjMuODUzMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYmJjZWRkIiBzdHJva2Utd2lkdGg9IjMiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuMjk4NzAxMjk4NzAxMjk4N3MiIHZhbHVlcz0iMDs0MCIga2V5VGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGNhbGNNb2RlPSJzcGxpbmUiPjwvYW5pbWF0ZT48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjI5ODcwMTI5ODcwMTI5ODdzIiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGNhbGNNb2RlPSJzcGxpbmUiPjwvYW5pbWF0ZT48L2NpcmNsZT48IS0tIFtsZGlvXSBnZW5lcmF0ZWQgYnkgaHR0cHM6Ly9sb2FkaW5nLmlvLyAtLT48L3N2Zz4=";

const ErrorIndicator = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTkyMjA4MTM2OTkwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMzOTAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDEwMDAuNzI3MjczYTQ4OC43MjcyNzMgNDg4LjcyNzI3MyAwIDEgMSA0ODguNzI3MjczLTQ4OC43MjcyNzMgNDg4LjcyNzI3MyA0ODguNzI3MjczIDAgMCAxLTQ4OC43MjcyNzMgNDg4LjcyNzI3M3ogbTAtOTE5LjI3MjcyOGE0MzAuNTQ1NDU1IDQzMC41NDU0NTUgMCAxIDAgNDMwLjU0NTQ1NSA0MzAuNTQ1NDU1QTQzMC41NDU0NTUgNDMwLjU0NTQ1NSAwIDAgMCA1MTIgODEuNDU0NTQ1eiIgZmlsbD0iIiBwLWlkPSIzMzkxIj48L3BhdGg+PHBhdGggZD0iTTcyMS40NTQ1NDUgNzUwLjU0NTQ1NWEyOC45NzQ1NDUgMjguOTc0NTQ1IDAgMCAxLTIwLjU5NjM2My04LjQ5NDU0NkwyODEuNiAzMjIuNDQzNjM2YTI5LjA5MDkwOSAyOS4wOTA5MDkgMCAwIDEgNDEuMTkyNzI3LTQxLjE5MjcyN0w3NDIuNCA3MDAuODU4MTgyQTI5LjA5MDkwOSAyOS4wOTA5MDkgMCAwIDEgNzIxLjQ1NDU0NSA3NTAuNTQ1NDU1eiIgZmlsbD0iIiBwLWlkPSIzMzkyIj48L3BhdGg+PHBhdGggZD0iTTMwMi41NDU0NTUgNzUwLjU0NTQ1NWEyOS4wOTA5MDkgMjkuMDkwOTA5IDAgMCAxLTIwLjU5NjM2NC00OS42ODcyNzNsNDE5LjI1ODE4Mi00MTkuNjA3MjczYTI5LjA5MDkwOSAyOS4wOTA5MDkgMCAwIDEgNDEuMTkyNzI3IDQxLjE5MjcyN0wzMjIuNzkyNzI3IDc0Mi4wNTA5MDlhMjguOTc0NTQ1IDI4Ljk3NDU0NSAwIDAgMS0yMC4yNDcyNzIgOC40OTQ1NDZ6IiBmaWxsPSIiIHAtaWQ9IjMzOTMiPjwvcGF0aD48L3N2Zz4=";

const [styleSetting, setStyleSetting] = createStore({});
const defaultStyle = {
  svg: {
    pending: PendingIndicator,
    error: ErrorIndicator
  }
};
const defaultStyleJSDelivr = {
  svg: {
    pending: "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/Ripple-1.3s-237px.svg",
    error: "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/error.svg"
  }
};

const _tmpl$$3 = /*#__PURE__*/template(`<img>`, 1);
/**
 *???????????????????????????
 *
 * @author KotoriK
 * @export
 * @param {IndicatorProps} props
 * @returns
 */

function Indicator(prop) {
  const [{
    level
  }, otherProp] = splitProps(prop, ['level']);
  return (() => {
    const _el$ = _tmpl$$3.cloneNode(true);
    spread(_el$, mergeProps({
      get src() {
        return styleSetting.svg[level];
      }
    }, otherProp), false, false);
    return _el$;
  })();
}

const _tmpl$$2 = /*#__PURE__*/template(`<img>`, 1),
  _tmpl$2 = /*#__PURE__*/template(`<video></video>`, 2);
/**
 * ???????????????
 *
 * @author KotoriK
 * @param {FaceViewProps} props
 * @returns
 */
function FaceView(props) {
  const [loaded, setLoaded] = createSignal(false);
  const [error, setError] = createSignal(false);
  const handleError = () => {
    setLoaded(false);
    setError(true);
  };
  const handleLoad = () => {
    setLoaded(true);
    setError(false);
  };
  const [local, forwardProp] = splitProps(props, ['face']);
  const context = useContext(SelectorContext);
  const isImage = () => local.face.url.match(REG_IMAGE);
  const publicProp = {
    src: local.face.url,
    onClick: context?.select.bind(undefined, local.face),
    onPointerEnter: context?.inspect.bind(undefined, local.face),
    onPointerOut: context?.inspect.bind(undefined, undefined),
    get hidden() {
      return !loaded();
    },
    onError: handleError
  };
  return [memo((() => {
    const _c$ = memo(() => !!(!loaded() || error()));
    return () => _c$() && createComponent(Indicator, mergeProps({
      get level() {
        return error() ? 'error' : 'pending';
      },
      get alt() {
        return local.face.descr ?? local.face.id;
      },
      style: {
        /* ...props.style, */transition: "opacity 2s ease"
      }
    }, forwardProp));
  })()), memo((() => {
    const _c$2 = memo(() => !!isImage());
    return () => _c$2() ? (() => {
      const _el$ = _tmpl$$2.cloneNode(true);
      spread(_el$, mergeProps(() => mergeProps$1(publicProp, forwardProp), {
        get alt() {
          return local.face.descr ?? local.face.id;
        },
        "onLoad": handleLoad
      }), false, false);
      return _el$;
    })() : createComponent(FaceViewVideoAutoPlay, mergeProps(() => mergeProps$1(publicProp, forwardProp), {
      muted: true,
      loop: true,
      playsinline: true,
      onCanPlay: handleLoad
    }));
  })())];
}
function FaceViewVideoAutoPlay(props) {
  let ref = undefined;
  let timer;
  const [local, forward] = splitProps(props, ['onCanPlay']);
  onCleanup(() => {
    clearTimeout(timer);
  });
  return (() => {
    const _el$2 = _tmpl$2.cloneNode(true);
    const _ref$ = ref;
    typeof _ref$ === "function" ? use(_ref$, _el$2) : ref = _el$2;
    spread(_el$2, mergeProps(forward, {
      "onCanPlay": e => {
        if (ref?.paused) {
          local.onCanPlay(e);
          timer = requestIdleCallback(() => {
            if (document.contains(ref)) {
              ref.play();
            }
          }, {
            timeout: 1000
          });
        }
      }
    }), false, false);
    return _el$2;
  })();
}

const _tmpl$$1 = /*#__PURE__*/template(`<div></div>`, 2);
const styleItem = css({
  width: "45px",
  height: "45px",
  padding: 1
});
const styleGrid = css({
  overflow: "auto",
  minHeight: 0,
  flex: '1 1 0',
  textAlign: 'center'
});
function FlexboxView(props) {
  return (() => {
    const _el$ = _tmpl$$1.cloneNode(true);
    className(_el$, styleGrid);
    insert(_el$, createComponent(For, {
      get each() {
        return props.facePackage.faces;
      },
      children: face => createComponent(FaceView, {
        face: face,
        "class": styleItem
      })
    }));
    return _el$;
  })();
}

const _tmpl$ = /*#__PURE__*/template(`<div><div></div></div>`, 4);
const main = css({
  padding: '2px',
  maxHeight: mainHeight,
  width: '100%'
});
const styleInner = css({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column'
});
/**
 * ????????????????????????????????????
 *
 * @author KotoriK
 * @returns ??????selectorState????????????FaceSelector??????
 */
function createFaceSelector() {
  const [inspecting, inspect] = createSignal();
  return [{
    inspecting
  },
  /**
   *?????????????????????????????????
   *
   * @author KotoriK
   * @export
   * @param { children }
   * @returns
   */
  function FaceSelector(props) {
    const [_nowPackagePos, setPos] = createSignal(0);

    /*     const head = useRef<HTMLSelectElement>()
        const body = useRef<HTMLDivElement>() */
    /*     const handleFaceSelected = useCallback((face_pos: number) => {
            const nowPackage = facePacks[_nowPackagePos()]
            onFaceSelected(nowPackage, nowPackage.faces[face_pos])
            handleHide()
        }, [handleHide, onFaceSelected, facePacks, _nowPackagePos]) */
    /*     useEffect(() => {
            //?????????????????????
            if (loadContent) body.current.style.height = classes.mainHeight - head.current.clientHeight + 'px'
        }, [loadContent]) */

    const nowPackagePos = () => {
      const maxPos = props.facePacks.length - 1;
      const _now = _nowPackagePos();
      if (_now > maxPos) return maxPos; //??????prop????????????????????????
      return _now;
    };
    return createComponent(SelectorContext.Provider, {
      value: {
        select: face => props.onSelect(props.facePacks[nowPackagePos()], face),
        inspect
      },
      get children() {
        const _el$ = _tmpl$.cloneNode(true),
          _el$2 = _el$.firstChild;
        const _ref$ = props.ref;
        typeof _ref$ === "function" ? use(_ref$, _el$) : props.ref = _el$;
        className(_el$2, styleInner);
        insert(_el$2, createComponent(Tabs, {
          get facePackages() {
            return props.facePacks;
          },
          get selectedPos() {
            return nowPackagePos();
          },
          onSelect: setPos
        }), null);
        insert(_el$2, (() => {
          const _c$ = memo(() => !!props.loadContent);
          return () => _c$() && createComponent(FlexboxView, {
            get facePackage() {
              return props.facePacks[nowPackagePos()];
            }
          });
        })(), null);
        effect(_p$ => {
          const _v$ = props.class ? {
              [props.class]: true
            } : {
              [borderShadow]: true,
              [bgWhiteBlur]: true,
              [main]: true
            },
            _v$2 = props.style;
          _p$._v$ = classList(_el$, _v$, _p$._v$);
          _p$._v$2 = style(_el$, _v$2, _p$._v$2);
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined
        });
        return _el$;
      }
    });
  }];
}

function getFaceFullUrl(face, parentPack) {
  const _face = typeof face == "string" ? { id: face } : face;
  const _process = (ph) => processTemplate("{", "}", (str) => {
    if (str == "id") {
      return _face.id;
    } else if (str in parentPack) {
      return parentPack[str];
    } else {
      return `{${str}}`;
    }
  }, ph);
  const { url, ...other_key } = _face;
  return {
    ...other_key,
    url: _process(url && _process(url) || parentPack.default)
  };
}

const importJSON = (url) => fetch(url).then(
  (response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Fetch Error:Return HTTP ${response.status}, ${response.statusText}`);
    }
  }
);

async function importExternalFacePacks(url) {
  const json = await importJSON(url);
  if (json) {
    preprocessFacePack(json);
    return json;
  }
  throw new Error(`Try to load FacePacks from '${url}' failed.`);
}
function preprocessFacePack(facepacks) {
  for (const pack of facepacks) {
    pack.faces = pack.faces.map((face) => getFaceFullUrl(face, pack));
  }
}

function deployRenderer(facePackages) {
  const render = createFaceRenderer({
    facePackages: facePackages
  });
  setStyleSetting(defaultStyle);
  document.querySelectorAll('article.hentry p:not(.ct-respond-form-textarea):not(.form-submit)').forEach(render);
}
function deploySelector(facePackages) {
  let emotionBox;
  let commentArea;
  if ((emotionBox = document.querySelector('.emotion-box')) && (commentArea = document.querySelector('#comment'))) {
    const [{
      inspecting
    }, FaceSelector] = createFaceSelector();
    const [hide, setHide] = createSignal(true);
    const [loadContent, setLoadContent] = createSignal(false);
    render(() => createComponent(FaceSelector, {
      facePacks: facePackages,
      get loadContent() {
        return loadContent();
      },
      handleHide: () => setHide(true),
      get style() {
        return `display:${hide() ? 'none' : 'block'}`;
      },
      onSelect: (pack, face) => {
        commentArea.value += `:${pack.id}.${face.id}:`;
      }
    }), emotionBox);
    // init toggler
    document.getElementById('emotion-toggle')?.addEventListener('click', () => {
      setLoadContent(true);
      setHide(prev => !prev);
    });

    // init Peak
    const peak = document.createElement('div');
    document.body.append(peak);
    render(() => {
      const imgCaption = () => {
        const face = inspecting();
        return face ? face.descr ?? face.id : undefined;
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

export { Peak, createFaceRenderer, createFaceSelector, defaultStyle, defaultStyleJSDelivr, deployRenderer, deploySelector, getFaceFullUrl, importExternalFacePacks, preprocessFacePack, setStyleSetting, styleSetting };
//# sourceMappingURL=index.mjs.map
