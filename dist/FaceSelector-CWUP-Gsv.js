import { use, insert, memo, className, effect, setAttribute, style, classList, template, createComponent, spread, mergeProps } from 'solid-js/web';
import { css } from '@emotion/css';
import { createSignal, onCleanup, createEffect, createSelector, For, createContext, splitProps, useContext, mergeProps as mergeProps$1 } from 'solid-js';
import { autoUpdate, computePosition } from '@floating-ui/dom';
import { R as REG_IMAGE } from './isImage-DdKfefTy.js';
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

var _tmpl$$5 = /* @__PURE__ */ template(`<figure><hr><figcaption>`), _tmpl$2$2 = /* @__PURE__ */ template(`<img>`), _tmpl$3 = /* @__PURE__ */ template(`<video playsinline loop muted autoplay>`);
const styleFigCaption = css({
  textAlign: "center",
  backgroundColor: "rgba(255,255,255,0.65)"
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
    position: "absolute",
    top: 0,
    left: 0,
    width: "max-content",
    "min-width": "auto"
  });
  let refSelf;
  const updatePosition = async () => {
    const position = await computePosition(props.anchor, refSelf, {
      placement: "right-start"
    });
    setStyle((prevStyle) => {
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
      cleanup = void 0;
    }
  });
  const show = () => Boolean(props.src);
  const isImage = () => Boolean(props.src?.match(REG_IMAGE));
  return (() => {
    var _el$ = _tmpl$$5(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
    var _ref$ = refSelf;
    typeof _ref$ === "function" ? use(_ref$, _el$) : refSelf = _el$;
    insert(_el$, (() => {
      var _c$ = memo(() => !!isImage());
      return () => _c$() ? (() => {
        var _el$4 = _tmpl$2$2();
        className(_el$4, styleFace);
        effect(() => setAttribute(_el$4, "src", props.src));
        return _el$4;
      })() : (() => {
        var _el$5 = _tmpl$3();
        className(_el$5, styleFace);
        effect(() => setAttribute(_el$5, "src", props.src));
        return _el$5;
      })();
    })(), _el$2);
    className(_el$2, styleHr);
    insert(_el$3, () => props.descr);
    effect((_p$) => {
      var _v$ = {
        display: show() ? "block" : "none",
        /*  ...props.style */
        ...style$1()
      }, _v$2 = {
        ...props.class ? {
          [props.class]: true
        } : {},
        [borderShadow]: true,
        [bgWhiteBlur]: true
      }, _v$3 = {
        [styleFigCaption]: true,
        [bgWhiteBlur]: true
      };
      _p$.e = style(_el$, _v$, _p$.e);
      _p$.t = classList(_el$, _v$2, _p$.t);
      _p$.a = classList(_el$3, _v$3, _p$.a);
      return _p$;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    });
    return _el$;
  })();
}

var _tmpl$$4 = /* @__PURE__ */ template(`<option>`), _tmpl$2$1 = /* @__PURE__ */ template(`<select>`);
function Tab(props) {
  return (() => {
    var _el$ = _tmpl$$4();
    insert(_el$, () => props.name);
    effect((_p$) => {
      var _v$ = props.selected, _v$2 = props.style, _v$3 = props.class;
      _v$ !== _p$.e && (_el$.selected = _p$.e = _v$);
      _p$.t = style(_el$, _v$2, _p$.t);
      _v$3 !== _p$.a && className(_el$, _p$.a = _v$3);
      return _p$;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    });
    effect(() => _el$.value = props.pos);
    return _el$;
  })();
}
const styles = css({
  width: "100%",
  border: 0,
  fontWeight: "bold"
});
function Tabs(props) {
  const isSelected = createSelector(() => props.selectedPos);
  return (() => {
    var _el$2 = _tmpl$2$1();
    _el$2.addEventListener("change", (e) => props.onSelect(parseInt(e.currentTarget.value)));
    var _ref$ = props.ref;
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
    effect((_$p) => classList(_el$2, {
      [styles]: true,
      [bgWhiteBlur]: true
    }, _$p));
    return _el$2;
  })();
}

const SelectorContext = createContext();

const PendingIndicator = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20style='margin:%20auto;%20background:%20none;%20display:%20block;%20shape-rendering:%20auto;'%20width='237px'%20height='237px'%20viewBox='0%200%20100%20100'%20preserveAspectRatio='xMidYMid'%3e%3ccircle%20cx='50'%20cy='50'%20r='39.4996'%20fill='none'%20stroke='%2385a2b6'%20stroke-width='3'%3e%3canimate%20attributeName='r'%20repeatCount='indefinite'%20dur='1.2987012987012987s'%20values='0;40'%20keyTimes='0;1'%20keySplines='0%200.2%200.8%201'%20calcMode='spline'%20begin='-0.6493506493506493s'%3e%3c/animate%3e%3canimate%20attributeName='opacity'%20repeatCount='indefinite'%20dur='1.2987012987012987s'%20values='1;0'%20keyTimes='0;1'%20keySplines='0.2%200%200.8%201'%20calcMode='spline'%20begin='-0.6493506493506493s'%3e%3c/animate%3e%3c/circle%3e%3ccircle%20cx='50'%20cy='50'%20r='23.8531'%20fill='none'%20stroke='%23bbcedd'%20stroke-width='3'%3e%3canimate%20attributeName='r'%20repeatCount='indefinite'%20dur='1.2987012987012987s'%20values='0;40'%20keyTimes='0;1'%20keySplines='0%200.2%200.8%201'%20calcMode='spline'%3e%3c/animate%3e%3canimate%20attributeName='opacity'%20repeatCount='indefinite'%20dur='1.2987012987012987s'%20values='1;0'%20keyTimes='0;1'%20keySplines='0.2%200%200.8%201'%20calcMode='spline'%3e%3c/animate%3e%3c/circle%3e%3c!--%20[ldio]%20generated%20by%20https://loading.io/%20--%3e%3c/svg%3e";

const ErrorIndicator = "data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg%20t='1592208136990'%20class='icon'%20viewBox='0%200%201024%201024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20p-id='3390'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='200'%20height='200'%3e%3cdefs%3e%3cstyle%20type='text/css'%3e%3c/style%3e%3c/defs%3e%3cpath%20d='M512%201000.727273a488.727273%20488.727273%200%201%201%20488.727273-488.727273%20488.727273%20488.727273%200%200%201-488.727273%20488.727273z%20m0-919.272728a430.545455%20430.545455%200%201%200%20430.545455%20430.545455A430.545455%20430.545455%200%200%200%20512%2081.454545z'%20fill=''%20p-id='3391'%3e%3c/path%3e%3cpath%20d='M721.454545%20750.545455a28.974545%2028.974545%200%200%201-20.596363-8.494546L281.6%20322.443636a29.090909%2029.090909%200%200%201%2041.192727-41.192727L742.4%20700.858182A29.090909%2029.090909%200%200%201%20721.454545%20750.545455z'%20fill=''%20p-id='3392'%3e%3c/path%3e%3cpath%20d='M302.545455%20750.545455a29.090909%2029.090909%200%200%201-20.596364-49.687273l419.258182-419.607273a29.090909%2029.090909%200%200%201%2041.192727%2041.192727L322.792727%20742.050909a28.974545%2028.974545%200%200%201-20.247272%208.494546z'%20fill=''%20p-id='3393'%3e%3c/path%3e%3c/svg%3e";

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

var _tmpl$$3 = /* @__PURE__ */ template(`<img>`);
function Indicator(prop) {
  const [{
    level
  }, otherProp] = splitProps(prop, ["level"]);
  return (() => {
    var _el$ = _tmpl$$3();
    spread(_el$, mergeProps({
      get src() {
        return styleSetting.svg[level];
      }
    }, otherProp), false, false);
    return _el$;
  })();
}

var _tmpl$$2 = /* @__PURE__ */ template(`<img>`), _tmpl$2 = /* @__PURE__ */ template(`<video>`);
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
  const [local, forwardProp] = splitProps(props, ["face"]);
  const context = useContext(SelectorContext);
  const isImage = () => local.face.url.match(REG_IMAGE);
  const publicProp = {
    src: local.face.url,
    onClick: context?.select.bind(void 0, local.face),
    onPointerEnter: context?.inspect.bind(void 0, local.face),
    onPointerOut: context?.inspect.bind(void 0, void 0),
    get hidden() {
      return !loaded();
    },
    onError: handleError
  };
  return [memo(() => memo(() => !!(!loaded() || error()))() && createComponent(Indicator, mergeProps({
    get level() {
      return error() ? "error" : "pending";
    },
    get alt() {
      return local.face.descr ?? local.face.id;
    },
    style: {
      /* ...props.style, */
      transition: "opacity 2s ease"
    }
  }, forwardProp))), memo(() => memo(() => !!isImage())() ? (() => {
    var _el$ = _tmpl$$2();
    spread(_el$, mergeProps(() => mergeProps$1(publicProp, forwardProp), {
      get alt() {
        return local.face.descr ?? local.face.id;
      },
      "onLoad": handleLoad
    }), false, false);
    return _el$;
  })() : createComponent(FaceViewVideoAutoPlay, mergeProps(() => mergeProps$1(publicProp, forwardProp), {
    onCanPlayThrough: handleLoad
  })))];
}
function FaceViewVideoAutoPlay(props) {
  let ref;
  let timer;
  const [local, forward] = splitProps(props, ["onCanPlayThrough"]);
  onCleanup(() => {
    cancelIdleCallback(timer);
  });
  return (() => {
    var _el$2 = _tmpl$2();
    var _ref$ = ref;
    typeof _ref$ === "function" ? use(_ref$, _el$2) : ref = _el$2;
    spread(_el$2, mergeProps(forward, {
      "muted": true,
      "loop": true,
      "playsinline": true,
      "onCanPlayThrough": (e) => {
        if (ref?.paused) {
          local.onCanPlayThrough(e);
          timer = requestIdleCallback(() => {
            if (!ref?.parentNode) return;
            ref.play();
          }, {
            timeout: 2e3
          });
        }
      }
    }), false, false);
    return _el$2;
  })();
}

var _tmpl$$1 = /* @__PURE__ */ template(`<div>`);
const styleItem = css({
  width: "45px",
  height: "45px",
  padding: 1
});
const styleGrid = css({
  overflow: "auto",
  minHeight: 0,
  flex: "1 1 0",
  textAlign: "start",
  height: 300
});
function FlexboxView(props) {
  return (() => {
    var _el$ = _tmpl$$1();
    className(_el$, styleGrid);
    insert(_el$, createComponent(For, {
      get each() {
        return props.facePackage.faces;
      },
      children: (face) => createComponent(FaceView, {
        face,
        "class": styleItem
      })
    }));
    return _el$;
  })();
}

var _tmpl$ = /* @__PURE__ */ template(`<div><div>`);
const main = css({
  padding: "2px",
  maxHeight: mainHeight,
  width: "100%"
});
const styleInner = css({
  minHeight: 250,
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column"
});
function createFaceSelector() {
  const [inspecting, inspect] = createSignal();
  return [
    {
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
      const [_nowPackagePos, setPos] = createSignal(0);
      const nowPackagePos = () => {
        const maxPos = props.facePacks.length - 1;
        const _now = _nowPackagePos();
        if (_now > maxPos) return maxPos;
        return _now;
      };
      return createComponent(SelectorContext.Provider, {
        value: {
          select: (face) => props.onSelect(props.facePacks[nowPackagePos()], face),
          inspect
        },
        get children() {
          var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
          var _ref$ = props.ref;
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
            var _c$ = memo(() => !!props.loadContent);
            return () => _c$() && createComponent(FlexboxView, {
              get facePackage() {
                return props.facePacks[nowPackagePos()];
              }
            });
          })(), null);
          effect((_p$) => {
            var _v$ = props.class ? {
              [props.class]: true
            } : {
              [borderShadow]: true,
              [bgWhiteBlur]: true,
              [main]: true
            }, _v$2 = props.style;
            _p$.e = classList(_el$, _v$, _p$.e);
            _p$.t = style(_el$, _v$2, _p$.t);
            return _p$;
          }, {
            e: void 0,
            t: void 0
          });
          return _el$;
        }
      });
    }
  ];
}

export { Peak as P, setStyleSetting as a, defaultStyleJSDelivr as b, createFaceSelector as c, defaultStyle as d, styleSetting as s };
//# sourceMappingURL=FaceSelector-CWUP-Gsv.js.map
