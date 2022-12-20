'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const web = require('solid-js/web');
const css = require('@emotion/css');
const solidJs = require('solid-js');
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

const PendingIndicator = "<?xml version=\"1.0\" encoding=\"utf-8\"?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"margin: auto; background: none; display: block; shape-rendering: auto;\" width=\"237px\" height=\"237px\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\"><circle cx=\"50\" cy=\"50\" r=\"39.4996\" fill=\"none\" stroke=\"#85a2b6\" stroke-width=\"3\"><animate attributeName=\"r\" repeatCount=\"indefinite\" dur=\"1.2987012987012987s\" values=\"0;40\" keyTimes=\"0;1\" keySplines=\"0 0.2 0.8 1\" calcMode=\"spline\" begin=\"-0.6493506493506493s\"></animate><animate attributeName=\"opacity\" repeatCount=\"indefinite\" dur=\"1.2987012987012987s\" values=\"1;0\" keyTimes=\"0;1\" keySplines=\"0.2 0 0.8 1\" calcMode=\"spline\" begin=\"-0.6493506493506493s\"></animate></circle><circle cx=\"50\" cy=\"50\" r=\"23.8531\" fill=\"none\" stroke=\"#bbcedd\" stroke-width=\"3\"><animate attributeName=\"r\" repeatCount=\"indefinite\" dur=\"1.2987012987012987s\" values=\"0;40\" keyTimes=\"0;1\" keySplines=\"0 0.2 0.8 1\" calcMode=\"spline\"></animate><animate attributeName=\"opacity\" repeatCount=\"indefinite\" dur=\"1.2987012987012987s\" values=\"1;0\" keyTimes=\"0;1\" keySplines=\"0.2 0 0.8 1\" calcMode=\"spline\"></animate></circle><!-- [ldio] generated by https://loading.io/ --></svg>";

const ErrorIndicator = "<?xml version=\"1.0\" standalone=\"no\"?><!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"><svg t=\"1592208136990\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3390\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"200\" height=\"200\"><defs><style type=\"text/css\"></style></defs><path d=\"M512 1000.727273a488.727273 488.727273 0 1 1 488.727273-488.727273 488.727273 488.727273 0 0 1-488.727273 488.727273z m0-919.272728a430.545455 430.545455 0 1 0 430.545455 430.545455A430.545455 430.545455 0 0 0 512 81.454545z\" fill=\"\" p-id=\"3391\"></path><path d=\"M721.454545 750.545455a28.974545 28.974545 0 0 1-20.596363-8.494546L281.6 322.443636a29.090909 29.090909 0 0 1 41.192727-41.192727L742.4 700.858182A29.090909 29.090909 0 0 1 721.454545 750.545455z\" fill=\"\" p-id=\"3392\"></path><path d=\"M302.545455 750.545455a29.090909 29.090909 0 0 1-20.596364-49.687273l419.258182-419.607273a29.090909 29.090909 0 0 1 41.192727 41.192727L322.792727 742.050909a28.974545 28.974545 0 0 1-20.247272 8.494546z\" fill=\"\" p-id=\"3393\"></path></svg>";

const [styleSetting, setStyleSetting] = store.createStore({});
const defaultStyle = {
  svg: {
    pending: "data:image/svg+xml;utf8," + PendingIndicator,
    error: "data:image/svg+xml;utf8," + ErrorIndicator
  }
};
const defaultStyleJSDelivr = {
  svg: {
    pending: "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/Ripple-1.3s-237px.svg",
    error: "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/error.svg"
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

exports.Peak = Peak;
exports.createFaceRenderer = createFaceRenderer;
exports.createFaceSelector = createFaceSelector;
exports.defaultStyle = defaultStyle;
exports.defaultStyleJSDelivr = defaultStyleJSDelivr;
exports.deployRenderer = deployRenderer;
exports.deploySelector = deploySelector;
exports.getFaceFullUrl = getFaceFullUrl;
exports.importExternalFacePacks = importExternalFacePacks;
exports.preprocessFacePack = preprocessFacePack;
exports.setStyleSetting = setStyleSetting;
exports.styleSetting = styleSetting;
//# sourceMappingURL=index.js.map
