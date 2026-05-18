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

  // src/AuthPanel.jsx
  var import_react = __toESM(__require("react"), 1);
  var import_framer_motion = __require("framer-motion");
  var import_gsap = __toESM(__require("gsap"), 1);
  var import_lucide_react = __require("lucide-react");
  var import_session = __require("./auth/session");
  var import_AuthModal = __require("./AuthModal.css");
  var emptySignup = {
    name: "",
    college: "",
    year: "3",
    degree: "",
    branch: "",
    targetRole: "",
    github: "",
    leetcode: "",
    linkedin: ""
  };
  var AuthPanel = ({ mode: initialMode = "login", onSuccess, onModeChange, compact = false }) => {
    const [mode, setMode] = (0, import_react.useState)(initialMode);
    const [isLoading, setIsLoading] = (0, import_react.useState)(false);
    const [error, setError] = (0, import_react.useState)("");
    const [showPassword, setShowPassword] = (0, import_react.useState)(false);
    const [remember, setRemember] = (0, import_react.useState)(true);
    const [email, setEmail] = (0, import_react.useState)("");
    const [password, setPassword] = (0, import_react.useState)("");
    const [signup, setSignup] = (0, import_react.useState)(emptySignup);
    const panelRef = (0, import_react.useRef)(null);
    (0, import_react.useEffect)(() => {
      setMode(initialMode);
    }, [initialMode]);
    const handleMouseMove = (e) => {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      import_gsap.default.to(panelRef.current, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    const handleMouseLeave = () => {
      import_gsap.default.to(panelRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    };
    const switchMode = (next) => {
      setMode(next);
      setError("");
      onModeChange?.(next);
    };
    const handleSocial = async (provider) => {
      setError("");
      setIsLoading(true);
      try {
        const user = await (0, import_session.signInWithProvider)(provider);
        onSuccess?.(user);
      } catch (err) {
        setError(err.message || "Holographic link failed. Try again.");
      } finally {
        setIsLoading(false);
      }
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);
      try {
        let user;
        if (mode === "login") {
          user = await (0, import_session.signInWithCredentials)({ email, password, remember });
        } else {
          user = await (0, import_session.signUpWithCredentials)({
            ...signup,
            email,
            password
          });
        }
        onSuccess?.(user);
      } catch (err) {
        setError(err.message || "System error detected.");
      } finally {
        setIsLoading(false);
      }
    };
    const updateSignup = (field, value) => {
      setSignup((prev) => ({ ...prev, [field]: value }));
    };
    const containerVariants = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08
        }
      }
    };
    const itemVariants = {
      hidden: { opacity: 0, y: 15 },
      show: { opacity: 1, y: 0 }
    };
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        ref: panelRef,
        className: `auth-panel-wrapper ${mode === "signup" ? "mode-signup" : "mode-login"}`,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-header-premium" }, /* @__PURE__ */ import_react.default.createElement(
        import_framer_motion.motion.div,
        {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          className: "auth-logo-pulse-container"
        },
        /* @__PURE__ */ import_react.default.createElement("img", { src: "/assets/9026a31c-LOGO.svg", alt: "Reality Check AI", className: "auth-logo-neon" }),
        /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-logo-rings" })
      ), /* @__PURE__ */ import_react.default.createElement(
        import_framer_motion.motion.h2,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "auth-title-premium"
        },
        mode === "login" ? "Enter the Future" : "Join the Network"
      ), /* @__PURE__ */ import_react.default.createElement(
        import_framer_motion.motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.3 },
          className: "auth-subtitle-premium"
        },
        mode === "login" ? "Initialize your placement intelligence session." : "Build your career profile and become industry-ready."
      )),
      /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-tabs-premium" }, /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          className: `auth-tab-btn ${mode === "login" ? "active" : ""}`,
          onClick: () => switchMode("login")
        },
        "SESSION_INIT"
      ), /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          className: `auth-tab-btn ${mode === "signup" ? "active" : ""}`,
          onClick: () => switchMode("signup")
        },
        "USER_REGISTER"
      ), /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-tab-glow", style: { left: mode === "login" ? "2px" : "calc(50% + 2px)" } })),
      /* @__PURE__ */ import_react.default.createElement(
        import_framer_motion.motion.div,
        {
          variants: containerVariants,
          initial: "hidden",
          animate: "show",
          className: "auth-content-scrollable"
        },
        error && /* @__PURE__ */ import_react.default.createElement(import_framer_motion.motion.div, { variants: itemVariants, className: "auth-error-chip" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.AlertCircle, { size: 14 }), /* @__PURE__ */ import_react.default.createElement("span", null, error)),
        /* @__PURE__ */ import_react.default.createElement(import_framer_motion.motion.div, { variants: itemVariants, className: "auth-social-stack" }, /* @__PURE__ */ import_react.default.createElement("button", { className: "social-btn-premium google", onClick: () => handleSocial("google") }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Globe, { size: 18 }), /* @__PURE__ */ import_react.default.createElement("span", null, "Continue with Google")), /* @__PURE__ */ import_react.default.createElement("button", { className: "social-btn-premium github", onClick: () => handleSocial("github") }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Github, { size: 18 }), /* @__PURE__ */ import_react.default.createElement("div", { className: "social-btn-content" }, /* @__PURE__ */ import_react.default.createElement("span", null, "Continue with GitHub"), /* @__PURE__ */ import_react.default.createElement("small", null, "Connect technical profile")), /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Terminal, { size: 14, className: "social-corner-icon" })), /* @__PURE__ */ import_react.default.createElement("button", { className: "social-btn-premium linkedin", onClick: () => handleSocial("linkedin") }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Linkedin, { size: 18 }), /* @__PURE__ */ import_react.default.createElement("div", { className: "social-btn-content" }, /* @__PURE__ */ import_react.default.createElement("span", null, "Continue with LinkedIn"), /* @__PURE__ */ import_react.default.createElement("small", null, "Professional network")), /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Globe, { size: 14, className: "social-corner-icon" }))),
        /* @__PURE__ */ import_react.default.createElement(import_framer_motion.motion.div, { variants: itemVariants, className: "auth-divider-premium" }, /* @__PURE__ */ import_react.default.createElement("span", null, "OR QUANTUM AUTH")),
        /* @__PURE__ */ import_react.default.createElement("form", { className: "auth-form-premium", onSubmit: handleSubmit }, /* @__PURE__ */ import_react.default.createElement(import_framer_motion.AnimatePresence, { mode: "wait" }, mode === "signup" && /* @__PURE__ */ import_react.default.createElement(
          import_framer_motion.motion.div,
          {
            key: "signup-ext",
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "signup-advanced-fields"
          },
          /* @__PURE__ */ import_react.default.createElement("div", { className: "input-group-premium" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.User, { size: 14, className: "input-icon-left" }), /* @__PURE__ */ import_react.default.createElement(
            "input",
            {
              type: "text",
              placeholder: "Full Name",
              value: signup.name,
              onChange: (e) => updateSignup("name", e.target.value),
              required: true
            }
          )),
          /* @__PURE__ */ import_react.default.createElement("div", { className: "input-row-premium" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "input-group-premium" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.GraduationCap, { size: 14, className: "input-icon-left" }), /* @__PURE__ */ import_react.default.createElement(
            "input",
            {
              type: "text",
              placeholder: "University / College",
              value: signup.college,
              onChange: (e) => updateSignup("college", e.target.value),
              required: true
            }
          )), /* @__PURE__ */ import_react.default.createElement("div", { className: "input-group-premium" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Monitor, { size: 14, className: "input-icon-left" }), /* @__PURE__ */ import_react.default.createElement(
            "input",
            {
              type: "text",
              placeholder: "Degree / Branch",
              value: signup.degree,
              onChange: (e) => updateSignup("degree", e.target.value),
              required: true
            }
          ))),
          /* @__PURE__ */ import_react.default.createElement("div", { className: "input-group-premium" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Briefcase, { size: 14, className: "input-icon-left" }), /* @__PURE__ */ import_react.default.createElement(
            "input",
            {
              type: "text",
              placeholder: "Target Role (e.g. SDE at Google)",
              value: signup.targetRole,
              onChange: (e) => updateSignup("targetRole", e.target.value)
            }
          )),
          /* @__PURE__ */ import_react.default.createElement("div", { className: "input-row-premium" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "input-group-premium select" }, /* @__PURE__ */ import_react.default.createElement("select", { value: signup.year, onChange: (e) => updateSignup("year", e.target.value) }, /* @__PURE__ */ import_react.default.createElement("option", { value: "1" }, "1st Year"), /* @__PURE__ */ import_react.default.createElement("option", { value: "2" }, "2nd Year"), /* @__PURE__ */ import_react.default.createElement("option", { value: "3" }, "3rd Year"), /* @__PURE__ */ import_react.default.createElement("option", { value: "4" }, "4th Year"), /* @__PURE__ */ import_react.default.createElement("option", { value: "grad" }, "Graduate"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "input-group-premium" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Linkedin, { size: 14, className: "input-icon-left" }), /* @__PURE__ */ import_react.default.createElement(
            "input",
            {
              type: "text",
              placeholder: "LinkedIn Profile",
              value: signup.linkedin,
              onChange: (e) => updateSignup("linkedin", e.target.value)
            }
          ))),
          /* @__PURE__ */ import_react.default.createElement("div", { className: "input-row-premium" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "input-group-premium" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Terminal, { size: 14, className: "input-icon-left" }), /* @__PURE__ */ import_react.default.createElement(
            "input",
            {
              type: "text",
              placeholder: "GitHub username",
              value: signup.github,
              onChange: (e) => updateSignup("github", e.target.value)
            }
          )), /* @__PURE__ */ import_react.default.createElement("div", { className: "input-group-premium" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Code2, { size: 14, className: "input-icon-left" }), /* @__PURE__ */ import_react.default.createElement(
            "input",
            {
              type: "text",
              placeholder: "LeetCode",
              value: signup.leetcode,
              onChange: (e) => updateSignup("leetcode", e.target.value)
            }
          )))
        )), /* @__PURE__ */ import_react.default.createElement("div", { className: "input-group-premium" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Mail, { size: 14, className: "input-icon-left" }), /* @__PURE__ */ import_react.default.createElement(
          "input",
          {
            type: "email",
            placeholder: "Email address",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true
          }
        )), /* @__PURE__ */ import_react.default.createElement("div", { className: "input-group-premium password" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Lock, { size: 14, className: "input-icon-left" }), /* @__PURE__ */ import_react.default.createElement(
          "input",
          {
            type: showPassword ? "text" : "password",
            placeholder: "Password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true
          }
        ), /* @__PURE__ */ import_react.default.createElement(
          "button",
          {
            type: "button",
            className: "password-toggle-premium",
            onClick: () => setShowPassword(!showPassword)
          },
          showPassword ? /* @__PURE__ */ import_react.default.createElement(import_lucide_react.EyeOff, { size: 16 }) : /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, { size: 16 })
        )), mode === "login" && /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-options-premium" }, /* @__PURE__ */ import_react.default.createElement("label", { className: "remember-me" }, /* @__PURE__ */ import_react.default.createElement("input", { type: "checkbox", checked: remember, onChange: (e) => setRemember(e.target.checked) }), /* @__PURE__ */ import_react.default.createElement("span", null, "Stay Synced")), /* @__PURE__ */ import_react.default.createElement("button", { type: "button", className: "forgot-btn" }, "Forgot_ID?")), /* @__PURE__ */ import_react.default.createElement(
          import_framer_motion.motion.button,
          {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            className: "auth-submit-premium",
            disabled: isLoading
          },
          isLoading ? /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Loader2, { className: "auth-spin", size: 20 }) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("span", null, mode === "login" ? "INITIALIZE_SESSION" : "ESTABLISH_CONNECTION"), /* @__PURE__ */ import_react.default.createElement(import_lucide_react.ArrowRight, { size: 18 }))
        )),
        /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-footer-premium" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.CheckCircle2, { size: 12 }), /* @__PURE__ */ import_react.default.createElement("span", null, "Secured by Neural-Shield AI Encryption"))
      )
    );
  };
  var AuthPanel_default = AuthPanel;
})();
