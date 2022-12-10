'use strict';

Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

const web = require('solid-js/web');
const solidJs = require('solid-js');
const css = require('@emotion/css');
const dom = require('@floating-ui/dom');
const store = require('solid-js/store');

const mainHeight = 325;
const borderShadow = css.css({
  boxShadow: "2px 2px 15px #888888",
  border: "0.5px #888888 solid",
  zIndex: 999
});
const bgWhiteBlur = css.css({
  backgroundColor: "rgba(255,255,255,0.6)",
  backdropFilter: "blur(3px)"
});
const main = css.css({
  padding: "2px",
  height: mainHeight
});

const _tmpl$$5 = /*#__PURE__*/web.template(`<figure><img height="200"><hr><figcaption></figcaption></figure>`, 6);
const styleFigCaption = css.css({
  textAlign: "center",
  backgroundColor: 'rgba(255,255,255,0.65)'
});
const styleHr = css.css({
  marginTop: 0,
  marginBottom: 0
});
function Peak(props) {
  const [style, setStyle] = solidJs.createSignal({
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'max-content'
  });
  let refSelf;
  const updatePosition = async () => {
    const position = await dom.computePosition(props.anchor, refSelf, {
      middleware: [dom.shift(), dom.flip()]
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
  solidJs.onCleanup(() => cleanup?.());
  solidJs.createEffect(async () => {
    if (props.anchor && refSelf) {
      cleanup = dom.autoUpdate(props.anchor, refSelf, updatePosition);
    } else {
      cleanup?.();
      cleanup = undefined;
    }
  });
  const show = () => Boolean(props.imgUrl) && props.show;
  return (() => {
    const _el$ = _tmpl$$5.cloneNode(true),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.nextSibling,
      _el$4 = _el$3.nextSibling;
    const _ref$ = refSelf;
    typeof _ref$ === "function" ? web.use(_ref$, _el$) : refSelf = _el$;
    web.className(_el$3, styleHr);
    web.insert(_el$4, () => props.imgCaption);
    web.effect(_p$ => {
      const _v$ = {
          display: show() ? 'block' : 'none',
          /*  ...props.style */...style()
        },
        _v$2 = {
          ...(props.class ? {
            [props.class]: true
          } : {}),
          [borderShadow]: true,
          [bgWhiteBlur]: true
        },
        _v$3 = props.imgUrl,
        _v$4 = {
          [styleFigCaption]: true,
          [bgWhiteBlur]: true
        };
      _p$._v$ = web.style(_el$, _v$, _p$._v$);
      _p$._v$2 = web.classList(_el$, _v$2, _p$._v$2);
      _v$3 !== _p$._v$3 && web.setAttribute(_el$2, "src", _p$._v$3 = _v$3);
      _p$._v$4 = web.classList(_el$4, _v$4, _p$._v$4);
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
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
      return `<img class="${imgClassName}" src="${url}" style="${imgInlineStyle}" alt="${leftBracket}${placeHolder}${rightBracket}"/>`;
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

const _tmpl$$4 = /*#__PURE__*/web.template(`<option></option>`, 2),
  _tmpl$2 = /*#__PURE__*/web.template(`<select></select>`, 2);
/**
 *选项卡的单个标签
 *
 * @author KotoriK
 * @export
 * @param {TabProps} props
 * @returns
 */
function Tab(props) {
  return (() => {
    const _el$ = _tmpl$$4.cloneNode(true);
    web.insert(_el$, () => props.name);
    web.effect(_p$ => {
      const _v$ = props.selected,
        _v$2 = props.style,
        _v$3 = props.class;
      _v$ !== _p$._v$ && (_el$.selected = _p$._v$ = _v$);
      _p$._v$2 = web.style(_el$, _v$2, _p$._v$2);
      _v$3 !== _p$._v$3 && web.className(_el$, _p$._v$3 = _v$3);
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    web.effect(() => _el$.value = props.pos);
    return _el$;
  })();
}
const styles = css.css({
  width: "100%",
  border: 0,
  fontWeight: 'bold'
});
/**
 * 选项卡的一行标签（一行Tab
 *
 * @author KotoriK
 */
function Tabs(props) {
  const isSelected = solidJs.createSelector(() => props.selectedPos);
  return (() => {
    const _el$2 = _tmpl$2.cloneNode(true);
    _el$2.addEventListener("change", e => props.onSelect(parseInt(e.currentTarget.value)));
    const _ref$ = props.ref;
    typeof _ref$ === "function" ? web.use(_ref$, _el$2) : props.ref = _el$2;
    web.insert(_el$2, web.createComponent(solidJs.For, {
      get each() {
        return props.facePackages;
      },
      children: (item, index) => web.createComponent(Tab, {
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
    web.effect(_$p => web.classList(_el$2, {
      [styles]: true,
      [bgWhiteBlur]: true
    }, _$p));
    return _el$2;
  })();
}

const SelectorContext = solidJs.createContext();

const PendingIndicator = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHN0eWxlPSJtYXJnaW46IGF1dG87IGJhY2tncm91bmQ6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyBzaGFwZS1yZW5kZXJpbmc6IGF1dG87IiB3aWR0aD0iMjM3cHgiIGhlaWdodD0iMjM3cHgiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzkuNDk5NiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODVhMmI2IiBzdHJva2Utd2lkdGg9IjMiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuMjk4NzAxMjk4NzAxMjk4N3MiIHZhbHVlcz0iMDs0MCIga2V5VGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGNhbGNNb2RlPSJzcGxpbmUiIGJlZ2luPSItMC42NDkzNTA2NDkzNTA2NDkzcyI+PC9hbmltYXRlPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuMjk4NzAxMjk4NzAxMjk4N3MiIHZhbHVlcz0iMTswIiBrZXlUaW1lcz0iMDsxIiBrZXlTcGxpbmVzPSIwLjIgMCAwLjggMSIgY2FsY01vZGU9InNwbGluZSIgYmVnaW49Ii0wLjY0OTM1MDY0OTM1MDY0OTNzIj48L2FuaW1hdGU+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMjMuODUzMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYmJjZWRkIiBzdHJva2Utd2lkdGg9IjMiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuMjk4NzAxMjk4NzAxMjk4N3MiIHZhbHVlcz0iMDs0MCIga2V5VGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGNhbGNNb2RlPSJzcGxpbmUiPjwvYW5pbWF0ZT48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjI5ODcwMTI5ODcwMTI5ODdzIiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGNhbGNNb2RlPSJzcGxpbmUiPjwvYW5pbWF0ZT48L2NpcmNsZT48IS0tIFtsZGlvXSBnZW5lcmF0ZWQgYnkgaHR0cHM6Ly9sb2FkaW5nLmlvLyAtLT48L3N2Zz4=";

const ErrorIndicator = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTkyMjA4MTM2OTkwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMzOTAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDEwMDAuNzI3MjczYTQ4OC43MjcyNzMgNDg4LjcyNzI3MyAwIDEgMSA0ODguNzI3MjczLTQ4OC43MjcyNzMgNDg4LjcyNzI3MyA0ODguNzI3MjczIDAgMCAxLTQ4OC43MjcyNzMgNDg4LjcyNzI3M3ogbTAtOTE5LjI3MjcyOGE0MzAuNTQ1NDU1IDQzMC41NDU0NTUgMCAxIDAgNDMwLjU0NTQ1NSA0MzAuNTQ1NDU1QTQzMC41NDU0NTUgNDMwLjU0NTQ1NSAwIDAgMCA1MTIgODEuNDU0NTQ1eiIgZmlsbD0iIiBwLWlkPSIzMzkxIj48L3BhdGg+PHBhdGggZD0iTTcyMS40NTQ1NDUgNzUwLjU0NTQ1NWEyOC45NzQ1NDUgMjguOTc0NTQ1IDAgMCAxLTIwLjU5NjM2My04LjQ5NDU0NkwyODEuNiAzMjIuNDQzNjM2YTI5LjA5MDkwOSAyOS4wOTA5MDkgMCAwIDEgNDEuMTkyNzI3LTQxLjE5MjcyN0w3NDIuNCA3MDAuODU4MTgyQTI5LjA5MDkwOSAyOS4wOTA5MDkgMCAwIDEgNzIxLjQ1NDU0NSA3NTAuNTQ1NDU1eiIgZmlsbD0iIiBwLWlkPSIzMzkyIj48L3BhdGg+PHBhdGggZD0iTTMwMi41NDU0NTUgNzUwLjU0NTQ1NWEyOS4wOTA5MDkgMjkuMDkwOTA5IDAgMCAxLTIwLjU5NjM2NC00OS42ODcyNzNsNDE5LjI1ODE4Mi00MTkuNjA3MjczYTI5LjA5MDkwOSAyOS4wOTA5MDkgMCAwIDEgNDEuMTkyNzI3IDQxLjE5MjcyN0wzMjIuNzkyNzI3IDc0Mi4wNTA5MDlhMjguOTc0NTQ1IDI4Ljk3NDU0NSAwIDAgMS0yMC4yNDcyNzIgOC40OTQ1NDZ6IiBmaWxsPSIiIHAtaWQ9IjMzOTMiPjwvcGF0aD48L3N2Zz4=";

const [styleSetting, setStyleSetting] = store.createStore({});
const defaultStyle = {
  svg: {
    pending: PendingIndicator,
    error: ErrorIndicator
  }
};

const _tmpl$$3 = /*#__PURE__*/web.template(`<img>`, 1);
/**
 *一个指示错误的组件
 *
 * @author KotoriK
 * @export
 * @param {IndicatorProps} props
 * @returns
 */

function Indicator(prop) {
  const [{
    level
  }, otherProp] = solidJs.splitProps(prop, ['level']);
  return (() => {
    const _el$ = _tmpl$$3.cloneNode(true);
    web.spread(_el$, web.mergeProps({
      get src() {
        return styleSetting.svg[level];
      }
    }, otherProp), false, false);
    return _el$;
  })();
}

const _tmpl$$2 = /*#__PURE__*/web.template(`<img>`, 1);
/**
 * 表情的渲染
 *
 * @author KotoriK
 * @param {FaceViewProps} props
 * @returns
 */
function FaceView(props) {
  const [loaded, setLoaded] = solidJs.createSignal(false);
  const [error, setError] = solidJs.createSignal(false);
  const handleError = () => {
    setLoaded(false);
    setError(true);
  };
  const handleLoad = () => {
    setLoaded(true);
    setError(false);
  };
  const [face, forwardProp] = solidJs.splitProps(props, ['face']);
  const context = solidJs.useContext(SelectorContext);
  return [web.memo((() => {
    const _c$ = web.memo(() => !!(!loaded() || error()));
    return () => _c$() && web.createComponent(Indicator, web.mergeProps({
      get level() {
        return error() ? 'error' : 'pending';
      },
      get alt() {
        return face.face.descr ?? face.face.id;
      },
      style: {
        /* ...props.style, */transition: "opacity 2s ease"
      }
    }, forwardProp));
  })()), (() => {
    const _el$ = _tmpl$$2.cloneNode(true);
    web.spread(_el$, web.mergeProps(forwardProp, {
      get src() {
        return face.face.url;
      },
      get alt() {
        return face.face.descr ?? face.face.id;
      },
      get onClick() {
        return context?.select.bind(undefined, face.face);
      },
      get onPointerEnter() {
        return context?.inspect.bind(undefined, face.face);
      },
      get onPointerOut() {
        return context?.inspect.bind(undefined, undefined);
      },
      "onLoad": handleLoad,
      "hidden": !loaded,
      "onError": handleError
    }), false, false);
    return _el$;
  })()];
}

const _tmpl$$1 = /*#__PURE__*/web.template(`<div></div>`, 2);
const styleCol = css.css({
  flex: 1,
  width: "45px",
  height: "45px",
  padding: "1px 1px 1px 1px"
});
const styleRow = css.css({
  flexWrap: "wrap",
  overflow: "auto",
  gap: 2
});
function FlexboxView(props) {
  return (() => {
    const _el$ = _tmpl$$1.cloneNode(true);
    web.className(_el$, styleRow);
    web.insert(_el$, web.createComponent(solidJs.For, {
      get each() {
        return props.facePackage.faces;
      },
      children: face => web.createComponent(FaceView, {
        face: face,
        "class": styleCol
      })
    }));
    return _el$;
  })();
}

const _tmpl$ = /*#__PURE__*/web.template(`<div></div>`, 2);
/**
 * 创建一个表情包选择器组件
 *
 * @author KotoriK
 * @returns 一个selectorState，和一个FaceSelector组件
 */
function createFaceSelector() {
  const [inspecting, inspect] = solidJs.createSignal();
  return [{
    inspecting
  },
  /**
   *表情包选择器的完整主体
   *
   * @author KotoriK
   * @export
   * @param { children }
   * @returns
   */
  function FaceSelector(props) {
    const [_nowPackagePos, setPos] = solidJs.createSignal(0);

    /*     const head = useRef<HTMLSelectElement>()
        const body = useRef<HTMLDivElement>() */
    /*     const handleFaceSelected = useCallback((face_pos: number) => {
            const nowPackage = facePacks[_nowPackagePos()]
            onFaceSelected(nowPackage, nowPackage.faces[face_pos])
            handleHide()
        }, [handleHide, onFaceSelected, facePacks, _nowPackagePos]) */
    /*     useEffect(() => {
            //设定内网格高度
            if (loadContent) body.current.style.height = classes.mainHeight - head.current.clientHeight + 'px'
        }, [loadContent]) */

    const nowPackagePos = () => {
      const maxPos = props.facePacks.length - 1;
      const _now = _nowPackagePos();
      if (_now > maxPos) return maxPos; //防止prop发生改动带来越界
      return _now;
    };
    return web.createComponent(SelectorContext.Provider, {
      value: {
        select: face => props.onSelect(props.facePacks[nowPackagePos()], face),
        inspect
      },
      get children() {
        const _el$ = _tmpl$.cloneNode(true);
        const _ref$ = props.ref;
        typeof _ref$ === "function" ? web.use(_ref$, _el$) : props.ref = _el$;
        web.insert(_el$, web.createComponent(Tabs, {
          get facePackages() {
            return props.facePacks;
          },
          get selectedPos() {
            return nowPackagePos();
          },
          onSelect: setPos
        }), null);
        web.insert(_el$, (() => {
          const _c$ = web.memo(() => !!props.loadContent);
          return () => _c$() && web.createComponent(FlexboxView, {
            get facePackage() {
              return props.facePacks[nowPackagePos()];
            }
          });
        })(), null);
        web.effect(_p$ => {
          const _v$ = props.class ? {
              [props.class]: true
            } : {
              [borderShadow]: true,
              [bgWhiteBlur]: true,
              [main]: true
            },
            _v$2 = props.style;
          _p$._v$ = web.classList(_el$, _v$, _p$._v$);
          _p$._v$2 = web.style(_el$, _v$2, _p$._v$2);
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
    const [hide, setHide] = solidJs.createSignal(true);
    const [loadContent, setLoadContent] = solidJs.createSignal(false);
    web.render(() => web.createComponent(FaceSelector, {
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
    web.render(() => {
      const imgCaption = () => {
        const face = inspecting();
        return face ? face.descr ?? face.id : undefined;
      };
      return web.createComponent(Peak, {
        get imgUrl() {
          return inspecting()?.url;
        },
        get imgCaption() {
          return imgCaption();
        },
        anchor: emotionBox,
        show: true
      });
    }, peak);
  }
}

exports.deployRenderer = deployRenderer;
exports.deploySelector = deploySelector;
//# sourceMappingURL=SakurairoDeployer.js.map
