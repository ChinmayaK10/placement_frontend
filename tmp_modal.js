(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/AuthModal.jsx
  var import_react = __toESM(__require("react"), 1);
  var import_framer_motion = __require("framer-motion");
  var import_lucide_react = __require("lucide-react");
  var import_AuthPanel = __toESM(__require("./AuthPanel"), 1);
  var import_AuthModal = __require("./AuthModal.css");
  var AuthModal = ({ isOpen, onClose, initialMode = "login", onAuthSuccess }) => {
    (0, import_react.useEffect)(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);
    const handleSuccess = (user) => {
      onAuthSuccess?.(user);
      onClose();
    };
    return /* @__PURE__ */ import_react.default.createElement(import_framer_motion.AnimatePresence, null, isOpen && /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-overlay" }, /* @__PURE__ */ import_react.default.createElement(
      import_framer_motion.motion.div,
      {
        className: "auth-backdrop",
        initial: { opacity: 0, backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" },
        animate: { opacity: 1, backdropFilter: "blur(20px)", backgroundColor: "rgba(5, 8, 16, 0.75)" },
        exit: { opacity: 0, backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" },
        onClick: onClose
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-particles" }, [...Array(15)].map((_, i) => /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          key: i,
          className: "auth-particle",
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 12}s`
          }
        }
      )))
    ), /* @__PURE__ */ import_react.default.createElement(
      import_framer_motion.motion.div,
      {
        className: "auth-modal-container",
        initial: { opacity: 0, scale: 0.9, y: 40, rotateX: 15 },
        animate: { opacity: 1, scale: 1, y: 0, rotateX: 0 },
        exit: { opacity: 0, scale: 0.9, y: 40, rotateX: 15 },
        transition: {
          type: "spring",
          damping: 30,
          stiffness: 180,
          mass: 1.2
        }
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-glass-card" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-glow-top" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-glow-bottom" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-noise-overlay" }), /* @__PURE__ */ import_react.default.createElement("button", { type: "button", className: "auth-close-btn", onClick: onClose, "aria-label": "Close" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.X, { size: 20 })), /* @__PURE__ */ import_react.default.createElement(import_AuthPanel.default, { key: initialMode, mode: initialMode, onSuccess: handleSuccess, compact: false }), /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-holographic-scan" }))
    )));
  };
  var AuthModal_default = AuthModal;
})();
