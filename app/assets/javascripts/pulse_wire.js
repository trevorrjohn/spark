(function (exports) {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _assertClassBrand(e, t, n) {
    if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
    throw new TypeError("Private element is not present on this object");
  }
  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c),
        u = i.value;
    } catch (n) {
      return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function () {
      var t = this,
        e = arguments;
      return new Promise(function (r, o) {
        var a = n.apply(t, e);
        function _next(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
        }
        function _throw(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
        }
        _next(void 0);
      });
    };
  }
  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _checkPrivateRedeclaration(e, t) {
    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _classPrivateFieldGet2(s, a) {
    return s.get(_assertClassBrand(s, a));
  }
  function _classPrivateFieldInitSpec(e, t, a) {
    _checkPrivateRedeclaration(e, t), t.set(e, a);
  }
  function _classPrivateFieldSet2(s, a, r) {
    return s.set(_assertClassBrand(s, a), r), r;
  }
  function _classPrivateGetter(s, r, a) {
    return a(_assertClassBrand(s, r));
  }
  function _classPrivateMethodInitSpec(e, a) {
    _checkPrivateRedeclaration(e, a), a.add(e);
  }
  function _construct(t, e, r) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && _setPrototypeOf(p, r.prototype), p;
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _get() {
    return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
      var p = _superPropBase(e, t);
      if (p) {
        var n = Object.getOwnPropertyDescriptor(p, t);
        return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
      }
    }, _get.apply(null, arguments);
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperty(t, "prototype", {
      writable: !1
    }), e && _setPrototypeOf(t, e);
  }
  function _isNativeFunction(t) {
    try {
      return -1 !== Function.toString.call(t).indexOf("[native code]");
    } catch (n) {
      return "function" == typeof t;
    }
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o,
      r,
      i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
  }
  function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
      if (e.includes(n)) continue;
      t[n] = r[n];
    }
    return t;
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return e;
    };
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function (t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function (t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(typeof e + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function (e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _superPropBase(t, o) {
    for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
    return t;
  }
  function _superPropGet(t, o, e, r) {
    var p = _get(_getPrototypeOf(t.prototype ), o, e);
    return "function" == typeof p ? function (t) {
      return p.apply(e, t);
    } : p;
  }
  function _taggedTemplateLiteral(e, t) {
    return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
      raw: {
        value: Object.freeze(t)
      }
    }));
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }
  function _wrapNativeSuper(t) {
    var r = "function" == typeof Map ? new Map() : void 0;
    return _wrapNativeSuper = function (t) {
      if (null === t || !_isNativeFunction(t)) return t;
      if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== r) {
        if (r.has(t)) return r.get(t);
        r.set(t, Wrapper);
      }
      function Wrapper() {
        return _construct(t, arguments, _getPrototypeOf(this).constructor);
      }
      return Wrapper.prototype = Object.create(t.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), _setPrototypeOf(Wrapper, t);
    }, _wrapNativeSuper(t);
  }

  var _templateObject, _templateObject2;
  var _excluded = ["callbacks"];
  /*!
  Turbo 8.0.12
  Copyright © 2024 37signals LLC
   */
  /**
   * The MIT License (MIT)
   *
   * Copyright (c) 2019 Javan Makhmali
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */

  (function (prototype) {
    if (typeof prototype.requestSubmit == "function") return;
    prototype.requestSubmit = function (submitter) {
      if (submitter) {
        validateSubmitter(submitter, this);
        submitter.click();
      } else {
        submitter = document.createElement("input");
        submitter.type = "submit";
        submitter.hidden = true;
        this.appendChild(submitter);
        submitter.click();
        this.removeChild(submitter);
      }
    };
    function validateSubmitter(submitter, form) {
      submitter instanceof HTMLElement || raise(TypeError, "parameter 1 is not of type 'HTMLElement'");
      submitter.type == "submit" || raise(TypeError, "The specified element is not a submit button");
      submitter.form == form || raise(DOMException, "The specified element is not owned by this form element", "NotFoundError");
    }
    function raise(errorConstructor, message, name) {
      throw new errorConstructor("Failed to execute 'requestSubmit' on 'HTMLFormElement': " + message + ".", name);
    }
  })(HTMLFormElement.prototype);
  var submittersByForm = new WeakMap();
  function findSubmitterFromClickTarget(target) {
    var element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
    var candidate = element ? element.closest("input, button") : null;
    return (candidate === null || candidate === void 0 ? void 0 : candidate.type) == "submit" ? candidate : null;
  }
  function clickCaptured(event) {
    var submitter = findSubmitterFromClickTarget(event.target);
    if (submitter && submitter.form) {
      submittersByForm.set(submitter.form, submitter);
    }
  }
  (function () {
    if ("submitter" in Event.prototype) return;
    var prototype = window.Event.prototype;
    // Certain versions of Safari 15 have a bug where they won't
    // populate the submitter. This hurts TurboDrive's enable/disable detection.
    // See https://bugs.webkit.org/show_bug.cgi?id=229660
    if ("SubmitEvent" in window) {
      var prototypeOfSubmitEvent = window.SubmitEvent.prototype;
      if (/Apple Computer/.test(navigator.vendor) && !("submitter" in prototypeOfSubmitEvent)) {
        prototype = prototypeOfSubmitEvent;
      } else {
        return; // polyfill not needed
      }
    }
    addEventListener("click", clickCaptured, true);
    Object.defineProperty(prototype, "submitter", {
      get: function get() {
        if (this.type == "submit" && this.target instanceof HTMLFormElement) {
          return submittersByForm.get(this.target);
        }
      }
    });
  })();
  var FrameLoadingStyle = {
    eager: "eager",
    lazy: "lazy"
  };

  /**
   * Contains a fragment of HTML which is updated based on navigation within
   * it (e.g. via links or form submissions).
   *
   * @customElement turbo-frame
   * @example
   *   <turbo-frame id="messages">
   *     <a href="/messages/expanded">
   *       Show all expanded messages in this frame.
   *     </a>
   *
   *     <form action="/messages">
   *       Show response from this form within this frame.
   *     </form>
   *   </turbo-frame>
   */
  var FrameElement = /*#__PURE__*/function (_HTMLElement) {
    function FrameElement() {
      var _this;
      _classCallCheck(this, FrameElement);
      _this = _callSuper(this, FrameElement);
      _defineProperty(_this, "loaded", Promise.resolve());
      _this.delegate = new FrameElement.delegateConstructor(_this);
      return _this;
    }
    _inherits(FrameElement, _HTMLElement);
    return _createClass(FrameElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.delegate.connect();
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.delegate.disconnect();
      }
    }, {
      key: "reload",
      value: function reload() {
        return this.delegate.sourceURLReloaded();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name == "loading") {
          this.delegate.loadingStyleChanged();
        } else if (name == "src") {
          this.delegate.sourceURLChanged();
        } else if (name == "disabled") {
          this.delegate.disabledChanged();
        }
      }

      /**
       * Gets the URL to lazily load source HTML from
       */
    }, {
      key: "src",
      get: function get() {
        return this.getAttribute("src");
      }

      /**
       * Sets the URL to lazily load source HTML from
       */,
      set: function set(value) {
        if (value) {
          this.setAttribute("src", value);
        } else {
          this.removeAttribute("src");
        }
      }

      /**
       * Gets the refresh mode for the frame.
       */
    }, {
      key: "refresh",
      get: function get() {
        return this.getAttribute("refresh");
      }

      /**
       * Sets the refresh mode for the frame.
       */,
      set: function set(value) {
        if (value) {
          this.setAttribute("refresh", value);
        } else {
          this.removeAttribute("refresh");
        }
      }
    }, {
      key: "shouldReloadWithMorph",
      get: function get() {
        return this.src && this.refresh === "morph";
      }

      /**
       * Determines if the element is loading
       */
    }, {
      key: "loading",
      get: function get() {
        return frameLoadingStyleFromString(this.getAttribute("loading") || "");
      }

      /**
       * Sets the value of if the element is loading
       */,
      set: function set(value) {
        if (value) {
          this.setAttribute("loading", value);
        } else {
          this.removeAttribute("loading");
        }
      }

      /**
       * Gets the disabled state of the frame.
       *
       * If disabled, no requests will be intercepted by the frame.
       */
    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      }

      /**
       * Sets the disabled state of the frame.
       *
       * If disabled, no requests will be intercepted by the frame.
       */,
      set: function set(value) {
        if (value) {
          this.setAttribute("disabled", "");
        } else {
          this.removeAttribute("disabled");
        }
      }

      /**
       * Gets the autoscroll state of the frame.
       *
       * If true, the frame will be scrolled into view automatically on update.
       */
    }, {
      key: "autoscroll",
      get: function get() {
        return this.hasAttribute("autoscroll");
      }

      /**
       * Sets the autoscroll state of the frame.
       *
       * If true, the frame will be scrolled into view automatically on update.
       */,
      set: function set(value) {
        if (value) {
          this.setAttribute("autoscroll", "");
        } else {
          this.removeAttribute("autoscroll");
        }
      }

      /**
       * Determines if the element has finished loading
       */
    }, {
      key: "complete",
      get: function get() {
        return !this.delegate.isLoading;
      }

      /**
       * Gets the active state of the frame.
       *
       * If inactive, source changes will not be observed.
       */
    }, {
      key: "isActive",
      get: function get() {
        return this.ownerDocument === document && !this.isPreview;
      }

      /**
       * Sets the active state of the frame.
       *
       * If inactive, source changes will not be observed.
       */
    }, {
      key: "isPreview",
      get: function get() {
        var _this$ownerDocument;
        return (_this$ownerDocument = this.ownerDocument) === null || _this$ownerDocument === void 0 || (_this$ownerDocument = _this$ownerDocument.documentElement) === null || _this$ownerDocument === void 0 ? void 0 : _this$ownerDocument.hasAttribute("data-turbo-preview");
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["disabled", "loading", "src"];
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
  _defineProperty(FrameElement, "delegateConstructor", undefined);
  function frameLoadingStyleFromString(style) {
    switch (style.toLowerCase()) {
      case "lazy":
        return FrameLoadingStyle.lazy;
      default:
        return FrameLoadingStyle.eager;
    }
  }
  var drive = {
    enabled: true,
    progressBarDelay: 500,
    unvisitableExtensions: new Set([".7z", ".aac", ".apk", ".avi", ".bmp", ".bz2", ".css", ".csv", ".deb", ".dmg", ".doc", ".docx", ".exe", ".gif", ".gz", ".heic", ".heif", ".ico", ".iso", ".jpeg", ".jpg", ".js", ".json", ".m4a", ".mkv", ".mov", ".mp3", ".mp4", ".mpeg", ".mpg", ".msi", ".ogg", ".ogv", ".pdf", ".pkg", ".png", ".ppt", ".pptx", ".rar", ".rtf", ".svg", ".tar", ".tif", ".tiff", ".txt", ".wav", ".webm", ".webp", ".wma", ".wmv", ".xls", ".xlsx", ".xml", ".zip"])
  };
  function activateScriptElement(element) {
    if (element.getAttribute("data-turbo-eval") == "false") {
      return element;
    } else {
      var createdScriptElement = document.createElement("script");
      var cspNonce = getCspNonce();
      if (cspNonce) {
        createdScriptElement.nonce = cspNonce;
      }
      createdScriptElement.textContent = element.textContent;
      createdScriptElement.async = false;
      copyElementAttributes(createdScriptElement, element);
      return createdScriptElement;
    }
  }
  function copyElementAttributes(destinationElement, sourceElement) {
    var _iterator = _createForOfIteratorHelper(sourceElement.attributes),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _step.value,
          name = _step$value.name,
          value = _step$value.value;
        destinationElement.setAttribute(name, value);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  function createDocumentFragment(html) {
    var template = document.createElement("template");
    template.innerHTML = html;
    return template.content;
  }
  function dispatch(eventName) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      target = _ref.target,
      cancelable = _ref.cancelable,
      detail = _ref.detail;
    var event = new CustomEvent(eventName, {
      cancelable: cancelable,
      bubbles: true,
      composed: true,
      detail: detail
    });
    if (target && target.isConnected) {
      target.dispatchEvent(event);
    } else {
      document.documentElement.dispatchEvent(event);
    }
    return event;
  }
  function cancelEvent(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  function nextRepaint() {
    if (document.visibilityState === "hidden") {
      return nextEventLoopTick();
    } else {
      return nextAnimationFrame();
    }
  }
  function nextAnimationFrame() {
    return new Promise(function (resolve) {
      return requestAnimationFrame(function () {
        return resolve();
      });
    });
  }
  function nextEventLoopTick() {
    return new Promise(function (resolve) {
      return setTimeout(function () {
        return resolve();
      }, 0);
    });
  }
  function nextMicrotask() {
    return Promise.resolve();
  }
  function parseHTMLDocument() {
    var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return new DOMParser().parseFromString(html, "text/html");
  }
  function unindent(strings) {
    for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }
    var lines = interpolate(strings, values).replace(/^\n/, "").split("\n");
    var match = lines[0].match(/^\s+/);
    var indent = match ? match[0].length : 0;
    return lines.map(function (line) {
      return line.slice(indent);
    }).join("\n");
  }
  function interpolate(strings, values) {
    return strings.reduce(function (result, string, i) {
      var value = values[i] == undefined ? "" : values[i];
      return result + string + value;
    }, "");
  }
  function uuid() {
    return Array.from({
      length: 36
    }).map(function (_, i) {
      if (i == 8 || i == 13 || i == 18 || i == 23) {
        return "-";
      } else if (i == 14) {
        return "4";
      } else if (i == 19) {
        return (Math.floor(Math.random() * 4) + 8).toString(16);
      } else {
        return Math.floor(Math.random() * 15).toString(16);
      }
    }).join("");
  }
  function getAttribute(attributeName) {
    for (var _len2 = arguments.length, elements = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      elements[_key2 - 1] = arguments[_key2];
    }
    var _iterator2 = _createForOfIteratorHelper(elements.map(function (element) {
        return element === null || element === void 0 ? void 0 : element.getAttribute(attributeName);
      })),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var value = _step2.value;
        if (typeof value == "string") return value;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return null;
  }
  function hasAttribute(attributeName) {
    for (var _len3 = arguments.length, elements = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      elements[_key3 - 1] = arguments[_key3];
    }
    return elements.some(function (element) {
      return element && element.hasAttribute(attributeName);
    });
  }
  function markAsBusy() {
    for (var _len4 = arguments.length, elements = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      elements[_key4] = arguments[_key4];
    }
    for (var _i = 0, _elements = elements; _i < _elements.length; _i++) {
      var element = _elements[_i];
      if (element.localName == "turbo-frame") {
        element.setAttribute("busy", "");
      }
      element.setAttribute("aria-busy", "true");
    }
  }
  function clearBusyState() {
    for (var _len5 = arguments.length, elements = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      elements[_key5] = arguments[_key5];
    }
    for (var _i2 = 0, _elements2 = elements; _i2 < _elements2.length; _i2++) {
      var element = _elements2[_i2];
      if (element.localName == "turbo-frame") {
        element.removeAttribute("busy");
      }
      element.removeAttribute("aria-busy");
    }
  }
  function waitForLoad(element) {
    var timeoutInMilliseconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
    return new Promise(function (resolve) {
      var _onComplete = function onComplete() {
        element.removeEventListener("error", _onComplete);
        element.removeEventListener("load", _onComplete);
        resolve();
      };
      element.addEventListener("load", _onComplete, {
        once: true
      });
      element.addEventListener("error", _onComplete, {
        once: true
      });
      setTimeout(resolve, timeoutInMilliseconds);
    });
  }
  function getHistoryMethodForAction(action) {
    switch (action) {
      case "replace":
        return history.replaceState;
      case "advance":
      case "restore":
        return history.pushState;
    }
  }
  function isAction(action) {
    return action == "advance" || action == "replace" || action == "restore";
  }
  function getVisitAction() {
    for (var _len6 = arguments.length, elements = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      elements[_key6] = arguments[_key6];
    }
    var action = getAttribute.apply(void 0, ["data-turbo-action"].concat(elements));
    return isAction(action) ? action : null;
  }
  function getMetaElement(name) {
    return document.querySelector("meta[name=\"".concat(name, "\"]"));
  }
  function getMetaContent(name) {
    var element = getMetaElement(name);
    return element && element.content;
  }
  function getCspNonce() {
    var element = getMetaElement("csp-nonce");
    if (element) {
      var nonce = element.nonce,
        content = element.content;
      return nonce == "" ? content : nonce;
    }
  }
  function setMetaContent(name, content) {
    var element = getMetaElement(name);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("name", name);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
    return element;
  }
  function findClosestRecursively(element, selector) {
    if (element instanceof Element) {
      var _element$getRootNode;
      return element.closest(selector) || findClosestRecursively(element.assignedSlot || ((_element$getRootNode = element.getRootNode()) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.host), selector);
    }
  }
  function elementIsFocusable(element) {
    var inertDisabledOrHidden = "[inert], :disabled, [hidden], details:not([open]), dialog:not([open])";
    return !!element && element.closest(inertDisabledOrHidden) == null && typeof element.focus == "function";
  }
  function queryAutofocusableElement(elementOrDocumentFragment) {
    return Array.from(elementOrDocumentFragment.querySelectorAll("[autofocus]")).find(elementIsFocusable);
  }
  function around(_x, _x2) {
    return _around.apply(this, arguments);
  }
  function _around() {
    _around = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee46(callback, reader) {
      var before, after;
      return _regeneratorRuntime().wrap(function _callee46$(_context46) {
        while (1) switch (_context46.prev = _context46.next) {
          case 0:
            before = reader();
            callback();
            _context46.next = 4;
            return nextAnimationFrame();
          case 4:
            after = reader();
            return _context46.abrupt("return", [before, after]);
          case 6:
          case "end":
            return _context46.stop();
        }
      }, _callee46);
    }));
    return _around.apply(this, arguments);
  }
  function doesNotTargetIFrame(name) {
    if (name === "_blank") {
      return false;
    } else if (name) {
      var _iterator3 = _createForOfIteratorHelper(document.getElementsByName(name)),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var element = _step3.value;
          if (element instanceof HTMLIFrameElement) return false;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return true;
    } else {
      return true;
    }
  }
  function findLinkFromClickTarget(target) {
    return findClosestRecursively(target, "a[href]:not([target^=_]):not([download])");
  }
  function getLocationForLink(link) {
    return expandURL(link.getAttribute("href") || "");
  }
  function debounce(fn, delay) {
    var _this2 = this;
    var timeoutId = null;
    return function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      var callback = function callback() {
        return fn.apply(_this2, args);
      };
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  }
  var submitter = {
    "aria-disabled": {
      beforeSubmit: function beforeSubmit(submitter) {
        submitter.setAttribute("aria-disabled", "true");
        submitter.addEventListener("click", cancelEvent);
      },
      afterSubmit: function afterSubmit(submitter) {
        submitter.removeAttribute("aria-disabled");
        submitter.removeEventListener("click", cancelEvent);
      }
    },
    "disabled": {
      beforeSubmit: function beforeSubmit(submitter) {
        return submitter.disabled = true;
      },
      afterSubmit: function afterSubmit(submitter) {
        return submitter.disabled = false;
      }
    }
  };
  var _submitter = /*#__PURE__*/new WeakMap();
  var Config = /*#__PURE__*/function () {
    function Config(config) {
      _classCallCheck(this, Config);
      _classPrivateFieldInitSpec(this, _submitter, null);
      Object.assign(this, config);
    }
    return _createClass(Config, [{
      key: "submitter",
      get: function get() {
        return _classPrivateFieldGet2(_submitter, this);
      },
      set: function set(value) {
        _classPrivateFieldSet2(_submitter, this, submitter[value] || value);
      }
    }]);
  }();
  var forms = new Config({
    mode: "on",
    submitter: "disabled"
  });
  var config = {
    drive: drive,
    forms: forms
  };
  function expandURL(locatable) {
    return new URL(locatable.toString(), document.baseURI);
  }
  function getAnchor(url) {
    var anchorMatch;
    if (url.hash) {
      return url.hash.slice(1);
      // eslint-disable-next-line no-cond-assign
    } else if (anchorMatch = url.href.match(/#(.*)$/)) {
      return anchorMatch[1];
    }
  }
  function getAction$1(form, submitter) {
    var action = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("formaction")) || form.getAttribute("action") || form.action;
    return expandURL(action);
  }
  function getExtension(url) {
    return (getLastPathComponent(url).match(/\.[^.]*$/) || [])[0] || "";
  }
  function isPrefixedBy(baseURL, url) {
    var prefix = getPrefix(url);
    return baseURL.href === expandURL(prefix).href || baseURL.href.startsWith(prefix);
  }
  function locationIsVisitable(location, rootLocation) {
    return isPrefixedBy(location, rootLocation) && !config.drive.unvisitableExtensions.has(getExtension(location));
  }
  function getRequestURL(url) {
    var anchor = getAnchor(url);
    return anchor != null ? url.href.slice(0, -(anchor.length + 1)) : url.href;
  }
  function toCacheKey(url) {
    return getRequestURL(url);
  }
  function urlsAreEqual(left, right) {
    return expandURL(left).href == expandURL(right).href;
  }
  function getPathComponents(url) {
    return url.pathname.split("/").slice(1);
  }
  function getLastPathComponent(url) {
    return getPathComponents(url).slice(-1)[0];
  }
  function getPrefix(url) {
    return addTrailingSlash(url.origin + url.pathname);
  }
  function addTrailingSlash(value) {
    return value.endsWith("/") ? value : value + "/";
  }
  var FetchResponse = /*#__PURE__*/function () {
    function FetchResponse(response) {
      _classCallCheck(this, FetchResponse);
      this.response = response;
    }
    return _createClass(FetchResponse, [{
      key: "succeeded",
      get: function get() {
        return this.response.ok;
      }
    }, {
      key: "failed",
      get: function get() {
        return !this.succeeded;
      }
    }, {
      key: "clientError",
      get: function get() {
        return this.statusCode >= 400 && this.statusCode <= 499;
      }
    }, {
      key: "serverError",
      get: function get() {
        return this.statusCode >= 500 && this.statusCode <= 599;
      }
    }, {
      key: "redirected",
      get: function get() {
        return this.response.redirected;
      }
    }, {
      key: "location",
      get: function get() {
        return expandURL(this.response.url);
      }
    }, {
      key: "isHTML",
      get: function get() {
        return this.contentType && this.contentType.match(/^(?:text\/([^\s;,]+\b)?html|application\/xhtml\+xml)\b/);
      }
    }, {
      key: "statusCode",
      get: function get() {
        return this.response.status;
      }
    }, {
      key: "contentType",
      get: function get() {
        return this.header("Content-Type");
      }
    }, {
      key: "responseText",
      get: function get() {
        return this.response.clone().text();
      }
    }, {
      key: "responseHTML",
      get: function get() {
        if (this.isHTML) {
          return this.response.clone().text();
        } else {
          return Promise.resolve(undefined);
        }
      }
    }, {
      key: "header",
      value: function header(name) {
        return this.response.headers.get(name);
      }
    }]);
  }();
  var LimitedSet = /*#__PURE__*/function (_Set) {
    function LimitedSet(maxSize) {
      var _this3;
      _classCallCheck(this, LimitedSet);
      _this3 = _callSuper(this, LimitedSet);
      _this3.maxSize = maxSize;
      return _this3;
    }
    _inherits(LimitedSet, _Set);
    return _createClass(LimitedSet, [{
      key: "add",
      value: function add(value) {
        if (this.size >= this.maxSize) {
          var iterator = this.values();
          var oldestValue = iterator.next().value;
          this["delete"](oldestValue);
        }
        _superPropGet(LimitedSet, "add", this)([value]);
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(Set));
  var recentRequests = new LimitedSet(20);
  var nativeFetch = window.fetch;
  function fetchWithTurboHeaders(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var modifiedHeaders = new Headers(options.headers || {});
    var requestUID = uuid();
    recentRequests.add(requestUID);
    modifiedHeaders.append("X-Turbo-Request-Id", requestUID);
    return nativeFetch(url, _objectSpread2(_objectSpread2({}, options), {}, {
      headers: modifiedHeaders
    }));
  }
  function fetchMethodFromString(method) {
    switch (method.toLowerCase()) {
      case "get":
        return FetchMethod.get;
      case "post":
        return FetchMethod.post;
      case "put":
        return FetchMethod.put;
      case "patch":
        return FetchMethod.patch;
      case "delete":
        return FetchMethod["delete"];
    }
  }
  var FetchMethod = {
    get: "get",
    post: "post",
    put: "put",
    patch: "patch",
    "delete": "delete"
  };
  function fetchEnctypeFromString(encoding) {
    switch (encoding.toLowerCase()) {
      case FetchEnctype.multipart:
        return FetchEnctype.multipart;
      case FetchEnctype.plain:
        return FetchEnctype.plain;
      default:
        return FetchEnctype.urlEncoded;
    }
  }
  var FetchEnctype = {
    urlEncoded: "application/x-www-form-urlencoded",
    multipart: "multipart/form-data",
    plain: "text/plain"
  };
  var _resolveRequestPromise = /*#__PURE__*/new WeakMap();
  var _FetchRequest_brand = /*#__PURE__*/new WeakSet();
  var FetchRequest = /*#__PURE__*/function () {
    function FetchRequest(delegate, method, location) {
      var _this$delegate$referr;
      var requestBody = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new URLSearchParams();
      var target = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var enctype = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : FetchEnctype.urlEncoded;
      _classCallCheck(this, FetchRequest);
      _classPrivateMethodInitSpec(this, _FetchRequest_brand);
      _defineProperty(this, "abortController", new AbortController());
      _classPrivateFieldInitSpec(this, _resolveRequestPromise, function (_value) {});
      var _buildResourceAndBody = buildResourceAndBody(expandURL(location), method, requestBody, enctype),
        _buildResourceAndBody2 = _slicedToArray(_buildResourceAndBody, 2),
        url = _buildResourceAndBody2[0],
        body = _buildResourceAndBody2[1];
      this.delegate = delegate;
      this.url = url;
      this.target = target;
      this.fetchOptions = {
        credentials: "same-origin",
        redirect: "follow",
        method: method.toUpperCase(),
        headers: _objectSpread2({}, this.defaultHeaders),
        body: body,
        signal: this.abortSignal,
        referrer: (_this$delegate$referr = this.delegate.referrer) === null || _this$delegate$referr === void 0 ? void 0 : _this$delegate$referr.href
      };
      this.enctype = enctype;
    }
    return _createClass(FetchRequest, [{
      key: "method",
      get: function get() {
        return this.fetchOptions.method;
      },
      set: function set(value) {
        var fetchBody = this.isSafe ? this.url.searchParams : this.fetchOptions.body || new FormData();
        var fetchMethod = fetchMethodFromString(value) || FetchMethod.get;
        this.url.search = "";
        var _buildResourceAndBody3 = buildResourceAndBody(this.url, fetchMethod, fetchBody, this.enctype),
          _buildResourceAndBody4 = _slicedToArray(_buildResourceAndBody3, 2),
          url = _buildResourceAndBody4[0],
          body = _buildResourceAndBody4[1];
        this.url = url;
        this.fetchOptions.body = body;
        this.fetchOptions.method = fetchMethod.toUpperCase();
      }
    }, {
      key: "headers",
      get: function get() {
        return this.fetchOptions.headers;
      },
      set: function set(value) {
        this.fetchOptions.headers = value;
      }
    }, {
      key: "body",
      get: function get() {
        if (this.isSafe) {
          return this.url.searchParams;
        } else {
          return this.fetchOptions.body;
        }
      },
      set: function set(value) {
        this.fetchOptions.body = value;
      }
    }, {
      key: "location",
      get: function get() {
        return this.url;
      }
    }, {
      key: "params",
      get: function get() {
        return this.url.searchParams;
      }
    }, {
      key: "entries",
      get: function get() {
        return this.body ? Array.from(this.body.entries()) : [];
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.abortController.abort();
      }
    }, {
      key: "perform",
      value: function () {
        var _perform = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var fetchOptions, event, response;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                fetchOptions = this.fetchOptions;
                this.delegate.prepareRequest(this);
                _context.next = 4;
                return _assertClassBrand(_FetchRequest_brand, this, _allowRequestToBeIntercepted).call(this, fetchOptions);
              case 4:
                event = _context.sent;
                _context.prev = 5;
                this.delegate.requestStarted(this);
                if (event.detail.fetchRequest) {
                  this.response = event.detail.fetchRequest.response;
                } else {
                  this.response = fetchWithTurboHeaders(this.url.href, fetchOptions);
                }
                _context.next = 10;
                return this.response;
              case 10:
                response = _context.sent;
                _context.next = 13;
                return this.receive(response);
              case 13:
                return _context.abrupt("return", _context.sent);
              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](5);
                if (!(_context.t0.name !== "AbortError")) {
                  _context.next = 21;
                  break;
                }
                if (_assertClassBrand(_FetchRequest_brand, this, _willDelegateErrorHandling).call(this, _context.t0)) {
                  this.delegate.requestErrored(this, _context.t0);
                }
                throw _context.t0;
              case 21:
                _context.prev = 21;
                this.delegate.requestFinished(this);
                return _context.finish(21);
              case 24:
              case "end":
                return _context.stop();
            }
          }, _callee, this, [[5, 16, 21, 24]]);
        }));
        function perform() {
          return _perform.apply(this, arguments);
        }
        return perform;
      }()
    }, {
      key: "receive",
      value: function () {
        var _receive = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(response) {
          var fetchResponse, event;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                fetchResponse = new FetchResponse(response);
                event = dispatch("turbo:before-fetch-response", {
                  cancelable: true,
                  detail: {
                    fetchResponse: fetchResponse
                  },
                  target: this.target
                });
                if (event.defaultPrevented) {
                  this.delegate.requestPreventedHandlingResponse(this, fetchResponse);
                } else if (fetchResponse.succeeded) {
                  this.delegate.requestSucceededWithResponse(this, fetchResponse);
                } else {
                  this.delegate.requestFailedWithResponse(this, fetchResponse);
                }
                return _context2.abrupt("return", fetchResponse);
              case 4:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this);
        }));
        function receive(_x3) {
          return _receive.apply(this, arguments);
        }
        return receive;
      }()
    }, {
      key: "defaultHeaders",
      get: function get() {
        return {
          Accept: "text/html, application/xhtml+xml"
        };
      }
    }, {
      key: "isSafe",
      get: function get() {
        return isSafe(this.method);
      }
    }, {
      key: "abortSignal",
      get: function get() {
        return this.abortController.signal;
      }
    }, {
      key: "acceptResponseType",
      value: function acceptResponseType(mimeType) {
        this.headers["Accept"] = [mimeType, this.headers["Accept"]].join(", ");
      }
    }]);
  }();
  function _allowRequestToBeIntercepted(_x40) {
    return _allowRequestToBeIntercepted2.apply(this, arguments);
  }
  function _allowRequestToBeIntercepted2() {
    _allowRequestToBeIntercepted2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee50(fetchOptions) {
      var _this54 = this;
      var requestInterception, event;
      return _regeneratorRuntime().wrap(function _callee50$(_context50) {
        while (1) switch (_context50.prev = _context50.next) {
          case 0:
            requestInterception = new Promise(function (resolve) {
              return _classPrivateFieldSet2(_resolveRequestPromise, _this54, resolve);
            });
            event = dispatch("turbo:before-fetch-request", {
              cancelable: true,
              detail: {
                fetchOptions: fetchOptions,
                url: this.url,
                resume: _classPrivateFieldGet2(_resolveRequestPromise, this)
              },
              target: this.target
            });
            this.url = event.detail.url;
            if (!event.defaultPrevented) {
              _context50.next = 6;
              break;
            }
            _context50.next = 6;
            return requestInterception;
          case 6:
            return _context50.abrupt("return", event);
          case 7:
          case "end":
            return _context50.stop();
        }
      }, _callee50, this);
    }));
    return _allowRequestToBeIntercepted2.apply(this, arguments);
  }
  function _willDelegateErrorHandling(error) {
    var event = dispatch("turbo:fetch-request-error", {
      target: this.target,
      cancelable: true,
      detail: {
        request: this,
        error: error
      }
    });
    return !event.defaultPrevented;
  }
  function isSafe(fetchMethod) {
    return fetchMethodFromString(fetchMethod) == FetchMethod.get;
  }
  function buildResourceAndBody(resource, method, requestBody, enctype) {
    var searchParams = Array.from(requestBody).length > 0 ? new URLSearchParams(entriesExcludingFiles(requestBody)) : resource.searchParams;
    if (isSafe(method)) {
      return [mergeIntoURLSearchParams(resource, searchParams), null];
    } else if (enctype == FetchEnctype.urlEncoded) {
      return [resource, searchParams];
    } else {
      return [resource, requestBody];
    }
  }
  function entriesExcludingFiles(requestBody) {
    var entries = [];
    var _iterator4 = _createForOfIteratorHelper(requestBody),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _step4$value = _slicedToArray(_step4.value, 2),
          name = _step4$value[0],
          value = _step4$value[1];
        if (value instanceof File) continue;else entries.push([name, value]);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return entries;
  }
  function mergeIntoURLSearchParams(url, requestBody) {
    var searchParams = new URLSearchParams(entriesExcludingFiles(requestBody));
    url.search = searchParams.toString();
    return url;
  }
  var AppearanceObserver = /*#__PURE__*/function () {
    function AppearanceObserver(delegate, element) {
      var _this4 = this;
      _classCallCheck(this, AppearanceObserver);
      _defineProperty(this, "started", false);
      _defineProperty(this, "intersect", function (entries) {
        var lastEntry = entries.slice(-1)[0];
        if (lastEntry !== null && lastEntry !== void 0 && lastEntry.isIntersecting) {
          _this4.delegate.elementAppearedInViewport(_this4.element);
        }
      });
      this.delegate = delegate;
      this.element = element;
      this.intersectionObserver = new IntersectionObserver(this.intersect);
    }
    return _createClass(AppearanceObserver, [{
      key: "start",
      value: function start() {
        if (!this.started) {
          this.started = true;
          this.intersectionObserver.observe(this.element);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.started) {
          this.started = false;
          this.intersectionObserver.unobserve(this.element);
        }
      }
    }]);
  }();
  var StreamMessage = /*#__PURE__*/function () {
    function StreamMessage(fragment) {
      _classCallCheck(this, StreamMessage);
      this.fragment = importStreamElements(fragment);
    }
    return _createClass(StreamMessage, null, [{
      key: "wrap",
      value: function wrap(message) {
        if (typeof message == "string") {
          return new this(createDocumentFragment(message));
        } else {
          return message;
        }
      }
    }]);
  }();
  _defineProperty(StreamMessage, "contentType", "text/vnd.turbo-stream.html");
  function importStreamElements(fragment) {
    var _iterator5 = _createForOfIteratorHelper(fragment.querySelectorAll("turbo-stream")),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var element = _step5.value;
        var streamElement = document.importNode(element, true);
        var _iterator6 = _createForOfIteratorHelper(streamElement.templateElement.content.querySelectorAll("script")),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var inertScriptElement = _step6.value;
            inertScriptElement.replaceWith(activateScriptElement(inertScriptElement));
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
        element.replaceWith(streamElement);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    return fragment;
  }
  var PREFETCH_DELAY = 100;
  var _prefetchTimeout = /*#__PURE__*/new WeakMap();
  var _prefetched = /*#__PURE__*/new WeakMap();
  var PrefetchCache = /*#__PURE__*/function () {
    function PrefetchCache() {
      _classCallCheck(this, PrefetchCache);
      _classPrivateFieldInitSpec(this, _prefetchTimeout, null);
      _classPrivateFieldInitSpec(this, _prefetched, null);
    }
    return _createClass(PrefetchCache, [{
      key: "get",
      value: function get(url) {
        if (_classPrivateFieldGet2(_prefetched, this) && _classPrivateFieldGet2(_prefetched, this).url === url && _classPrivateFieldGet2(_prefetched, this).expire > Date.now()) {
          return _classPrivateFieldGet2(_prefetched, this).request;
        }
      }
    }, {
      key: "setLater",
      value: function setLater(url, request, ttl) {
        var _this5 = this;
        this.clear();
        _classPrivateFieldSet2(_prefetchTimeout, this, setTimeout(function () {
          request.perform();
          _this5.set(url, request, ttl);
          _classPrivateFieldSet2(_prefetchTimeout, _this5, null);
        }, PREFETCH_DELAY));
      }
    }, {
      key: "set",
      value: function set(url, request, ttl) {
        _classPrivateFieldSet2(_prefetched, this, {
          url: url,
          request: request,
          expire: new Date(new Date().getTime() + ttl)
        });
      }
    }, {
      key: "clear",
      value: function clear() {
        if (_classPrivateFieldGet2(_prefetchTimeout, this)) clearTimeout(_classPrivateFieldGet2(_prefetchTimeout, this));
        _classPrivateFieldSet2(_prefetched, this, null);
      }
    }]);
  }();
  var cacheTtl = 10 * 1000;
  var prefetchCache = new PrefetchCache();
  var FormSubmissionState = {
    initialized: "initialized",
    requesting: "requesting",
    waiting: "waiting",
    receiving: "receiving",
    stopping: "stopping",
    stopped: "stopped"
  };
  var FormSubmission = /*#__PURE__*/function () {
    function FormSubmission(delegate, formElement, submitter) {
      var mustRedirect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      _classCallCheck(this, FormSubmission);
      _defineProperty(this, "state", FormSubmissionState.initialized);
      var method = getMethod(formElement, submitter);
      var action = getAction(getFormAction(formElement, submitter), method);
      var body = buildFormData(formElement, submitter);
      var enctype = getEnctype(formElement, submitter);
      this.delegate = delegate;
      this.formElement = formElement;
      this.submitter = submitter;
      this.fetchRequest = new FetchRequest(this, method, action, body, formElement, enctype);
      this.mustRedirect = mustRedirect;
    }
    return _createClass(FormSubmission, [{
      key: "method",
      get: function get() {
        return this.fetchRequest.method;
      },
      set: function set(value) {
        this.fetchRequest.method = value;
      }
    }, {
      key: "action",
      get: function get() {
        return this.fetchRequest.url.toString();
      },
      set: function set(value) {
        this.fetchRequest.url = expandURL(value);
      }
    }, {
      key: "body",
      get: function get() {
        return this.fetchRequest.body;
      }
    }, {
      key: "enctype",
      get: function get() {
        return this.fetchRequest.enctype;
      }
    }, {
      key: "isSafe",
      get: function get() {
        return this.fetchRequest.isSafe;
      }
    }, {
      key: "location",
      get: function get() {
        return this.fetchRequest.url;
      }

      // The submission process
    }, {
      key: "start",
      value: function () {
        var _start = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var initialized, requesting, confirmationMessage, confirmMethod, answer;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                initialized = FormSubmissionState.initialized, requesting = FormSubmissionState.requesting;
                confirmationMessage = getAttribute("data-turbo-confirm", this.submitter, this.formElement);
                if (!(typeof confirmationMessage === "string")) {
                  _context3.next = 9;
                  break;
                }
                confirmMethod = typeof config.forms.confirm === "function" ? config.forms.confirm : FormSubmission.confirmMethod;
                _context3.next = 6;
                return confirmMethod(confirmationMessage, this.formElement, this.submitter);
              case 6:
                answer = _context3.sent;
                if (answer) {
                  _context3.next = 9;
                  break;
                }
                return _context3.abrupt("return");
              case 9:
                if (!(this.state == initialized)) {
                  _context3.next = 12;
                  break;
                }
                this.state = requesting;
                return _context3.abrupt("return", this.fetchRequest.perform());
              case 12:
              case "end":
                return _context3.stop();
            }
          }, _callee3, this);
        }));
        function start() {
          return _start.apply(this, arguments);
        }
        return start;
      }()
    }, {
      key: "stop",
      value: function stop() {
        var stopping = FormSubmissionState.stopping,
          stopped = FormSubmissionState.stopped;
        if (this.state != stopping && this.state != stopped) {
          this.state = stopping;
          this.fetchRequest.cancel();
          return true;
        }
      }

      // Fetch request delegate
    }, {
      key: "prepareRequest",
      value: function prepareRequest(request) {
        if (!request.isSafe) {
          var token = getCookieValue(getMetaContent("csrf-param")) || getMetaContent("csrf-token");
          if (token) {
            request.headers["X-CSRF-Token"] = token;
          }
        }
        if (this.requestAcceptsTurboStreamResponse(request)) {
          request.acceptResponseType(StreamMessage.contentType);
        }
      }
    }, {
      key: "requestStarted",
      value: function requestStarted(_request) {
        this.state = FormSubmissionState.waiting;
        if (this.submitter) config.forms.submitter.beforeSubmit(this.submitter);
        this.setSubmitsWith();
        markAsBusy(this.formElement);
        dispatch("turbo:submit-start", {
          target: this.formElement,
          detail: {
            formSubmission: this
          }
        });
        this.delegate.formSubmissionStarted(this);
      }
    }, {
      key: "requestPreventedHandlingResponse",
      value: function requestPreventedHandlingResponse(request, response) {
        prefetchCache.clear();
        this.result = {
          success: response.succeeded,
          fetchResponse: response
        };
      }
    }, {
      key: "requestSucceededWithResponse",
      value: function requestSucceededWithResponse(request, response) {
        if (response.clientError || response.serverError) {
          this.delegate.formSubmissionFailedWithResponse(this, response);
          return;
        }
        prefetchCache.clear();
        if (this.requestMustRedirect(request) && responseSucceededWithoutRedirect(response)) {
          var error = new Error("Form responses must redirect to another location");
          this.delegate.formSubmissionErrored(this, error);
        } else {
          this.state = FormSubmissionState.receiving;
          this.result = {
            success: true,
            fetchResponse: response
          };
          this.delegate.formSubmissionSucceededWithResponse(this, response);
        }
      }
    }, {
      key: "requestFailedWithResponse",
      value: function requestFailedWithResponse(request, response) {
        this.result = {
          success: false,
          fetchResponse: response
        };
        this.delegate.formSubmissionFailedWithResponse(this, response);
      }
    }, {
      key: "requestErrored",
      value: function requestErrored(request, error) {
        this.result = {
          success: false,
          error: error
        };
        this.delegate.formSubmissionErrored(this, error);
      }
    }, {
      key: "requestFinished",
      value: function requestFinished(_request) {
        this.state = FormSubmissionState.stopped;
        if (this.submitter) config.forms.submitter.afterSubmit(this.submitter);
        this.resetSubmitterText();
        clearBusyState(this.formElement);
        dispatch("turbo:submit-end", {
          target: this.formElement,
          detail: _objectSpread2({
            formSubmission: this
          }, this.result)
        });
        this.delegate.formSubmissionFinished(this);
      }

      // Private
    }, {
      key: "setSubmitsWith",
      value: function setSubmitsWith() {
        if (!this.submitter || !this.submitsWith) return;
        if (this.submitter.matches("button")) {
          this.originalSubmitText = this.submitter.innerHTML;
          this.submitter.innerHTML = this.submitsWith;
        } else if (this.submitter.matches("input")) {
          var input = this.submitter;
          this.originalSubmitText = input.value;
          input.value = this.submitsWith;
        }
      }
    }, {
      key: "resetSubmitterText",
      value: function resetSubmitterText() {
        if (!this.submitter || !this.originalSubmitText) return;
        if (this.submitter.matches("button")) {
          this.submitter.innerHTML = this.originalSubmitText;
        } else if (this.submitter.matches("input")) {
          var input = this.submitter;
          input.value = this.originalSubmitText;
        }
      }
    }, {
      key: "requestMustRedirect",
      value: function requestMustRedirect(request) {
        return !request.isSafe && this.mustRedirect;
      }
    }, {
      key: "requestAcceptsTurboStreamResponse",
      value: function requestAcceptsTurboStreamResponse(request) {
        return !request.isSafe || hasAttribute("data-turbo-stream", this.submitter, this.formElement);
      }
    }, {
      key: "submitsWith",
      get: function get() {
        var _this$submitter;
        return (_this$submitter = this.submitter) === null || _this$submitter === void 0 ? void 0 : _this$submitter.getAttribute("data-turbo-submits-with");
      }
    }], [{
      key: "confirmMethod",
      value: function confirmMethod(message) {
        return Promise.resolve(confirm(message));
      }
    }]);
  }();
  function buildFormData(formElement, submitter) {
    var formData = new FormData(formElement);
    var name = submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("name");
    var value = submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("value");
    if (name) {
      formData.append(name, value || "");
    }
    return formData;
  }
  function getCookieValue(cookieName) {
    if (cookieName != null) {
      var cookies = document.cookie ? document.cookie.split("; ") : [];
      var cookie = cookies.find(function (cookie) {
        return cookie.startsWith(cookieName);
      });
      if (cookie) {
        var value = cookie.split("=").slice(1).join("=");
        return value ? decodeURIComponent(value) : undefined;
      }
    }
  }
  function responseSucceededWithoutRedirect(response) {
    return response.statusCode == 200 && !response.redirected;
  }
  function getFormAction(formElement, submitter) {
    var formElementAction = typeof formElement.action === "string" ? formElement.action : null;
    if (submitter !== null && submitter !== void 0 && submitter.hasAttribute("formaction")) {
      return submitter.getAttribute("formaction") || "";
    } else {
      return formElement.getAttribute("action") || formElementAction || "";
    }
  }
  function getAction(formAction, fetchMethod) {
    var action = expandURL(formAction);
    if (isSafe(fetchMethod)) {
      action.search = "";
    }
    return action;
  }
  function getMethod(formElement, submitter) {
    var method = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("formmethod")) || formElement.getAttribute("method") || "";
    return fetchMethodFromString(method.toLowerCase()) || FetchMethod.get;
  }
  function getEnctype(formElement, submitter) {
    return fetchEnctypeFromString((submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("formenctype")) || formElement.enctype);
  }
  var Snapshot = /*#__PURE__*/function () {
    function Snapshot(element) {
      _classCallCheck(this, Snapshot);
      this.element = element;
    }
    return _createClass(Snapshot, [{
      key: "activeElement",
      get: function get() {
        return this.element.ownerDocument.activeElement;
      }
    }, {
      key: "children",
      get: function get() {
        return _toConsumableArray(this.element.children);
      }
    }, {
      key: "hasAnchor",
      value: function hasAnchor(anchor) {
        return this.getElementForAnchor(anchor) != null;
      }
    }, {
      key: "getElementForAnchor",
      value: function getElementForAnchor(anchor) {
        return anchor ? this.element.querySelector("[id='".concat(anchor, "'], a[name='").concat(anchor, "']")) : null;
      }
    }, {
      key: "isConnected",
      get: function get() {
        return this.element.isConnected;
      }
    }, {
      key: "firstAutofocusableElement",
      get: function get() {
        return queryAutofocusableElement(this.element);
      }
    }, {
      key: "permanentElements",
      get: function get() {
        return queryPermanentElementsAll(this.element);
      }
    }, {
      key: "getPermanentElementById",
      value: function getPermanentElementById(id) {
        return _getPermanentElementById(this.element, id);
      }
    }, {
      key: "getPermanentElementMapForSnapshot",
      value: function getPermanentElementMapForSnapshot(snapshot) {
        var permanentElementMap = {};
        var _iterator7 = _createForOfIteratorHelper(this.permanentElements),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var currentPermanentElement = _step7.value;
            var id = currentPermanentElement.id;
            var newPermanentElement = snapshot.getPermanentElementById(id);
            if (newPermanentElement) {
              permanentElementMap[id] = [currentPermanentElement, newPermanentElement];
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        return permanentElementMap;
      }
    }]);
  }();
  function _getPermanentElementById(node, id) {
    return node.querySelector("#".concat(id, "[data-turbo-permanent]"));
  }
  function queryPermanentElementsAll(node) {
    return node.querySelectorAll("[id][data-turbo-permanent]");
  }
  var FormSubmitObserver = /*#__PURE__*/function () {
    function FormSubmitObserver(delegate, eventTarget) {
      var _this6 = this;
      _classCallCheck(this, FormSubmitObserver);
      _defineProperty(this, "started", false);
      _defineProperty(this, "submitCaptured", function () {
        _this6.eventTarget.removeEventListener("submit", _this6.submitBubbled, false);
        _this6.eventTarget.addEventListener("submit", _this6.submitBubbled, false);
      });
      _defineProperty(this, "submitBubbled", function (event) {
        if (!event.defaultPrevented) {
          var form = event.target instanceof HTMLFormElement ? event.target : undefined;
          var _submitter2 = event.submitter || undefined;
          if (form && submissionDoesNotDismissDialog(form, _submitter2) && submissionDoesNotTargetIFrame(form, _submitter2) && _this6.delegate.willSubmitForm(form, _submitter2)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            _this6.delegate.formSubmitted(form, _submitter2);
          }
        }
      });
      this.delegate = delegate;
      this.eventTarget = eventTarget;
    }
    return _createClass(FormSubmitObserver, [{
      key: "start",
      value: function start() {
        if (!this.started) {
          this.eventTarget.addEventListener("submit", this.submitCaptured, true);
          this.started = true;
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.started) {
          this.eventTarget.removeEventListener("submit", this.submitCaptured, true);
          this.started = false;
        }
      }
    }]);
  }();
  function submissionDoesNotDismissDialog(form, submitter) {
    var method = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("formmethod")) || form.getAttribute("method");
    return method != "dialog";
  }
  function submissionDoesNotTargetIFrame(form, submitter) {
    var target = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("formtarget")) || form.getAttribute("target");
    return doesNotTargetIFrame(target);
  }
  var _resolveRenderPromise = /*#__PURE__*/new WeakMap();
  var _resolveInterceptionPromise = /*#__PURE__*/new WeakMap();
  var View = /*#__PURE__*/function () {
    function View(delegate, element) {
      _classCallCheck(this, View);
      _classPrivateFieldInitSpec(this, _resolveRenderPromise, function (_value) {});
      _classPrivateFieldInitSpec(this, _resolveInterceptionPromise, function (_value) {});
      this.delegate = delegate;
      this.element = element;
    }

    // Scrolling
    return _createClass(View, [{
      key: "scrollToAnchor",
      value: function scrollToAnchor(anchor) {
        var element = this.snapshot.getElementForAnchor(anchor);
        if (element) {
          this.scrollToElement(element);
          this.focusElement(element);
        } else {
          this.scrollToPosition({
            x: 0,
            y: 0
          });
        }
      }
    }, {
      key: "scrollToAnchorFromLocation",
      value: function scrollToAnchorFromLocation(location) {
        this.scrollToAnchor(getAnchor(location));
      }
    }, {
      key: "scrollToElement",
      value: function scrollToElement(element) {
        element.scrollIntoView();
      }
    }, {
      key: "focusElement",
      value: function focusElement(element) {
        if (element instanceof HTMLElement) {
          if (element.hasAttribute("tabindex")) {
            element.focus();
          } else {
            element.setAttribute("tabindex", "-1");
            element.focus();
            element.removeAttribute("tabindex");
          }
        }
      }
    }, {
      key: "scrollToPosition",
      value: function scrollToPosition(_ref2) {
        var x = _ref2.x,
          y = _ref2.y;
        this.scrollRoot.scrollTo(x, y);
      }
    }, {
      key: "scrollToTop",
      value: function scrollToTop() {
        this.scrollToPosition({
          x: 0,
          y: 0
        });
      }
    }, {
      key: "scrollRoot",
      get: function get() {
        return window;
      }

      // Rendering
    }, {
      key: "render",
      value: function () {
        var _render = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(renderer) {
          var _this7 = this;
          var isPreview, shouldRender, willRender, snapshot, shouldInvalidate, renderInterception, options, immediateRender;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                isPreview = renderer.isPreview, shouldRender = renderer.shouldRender, willRender = renderer.willRender, snapshot = renderer.newSnapshot; // A workaround to ignore tracked element mismatch reloads when performing
                // a promoted Visit from a frame navigation
                shouldInvalidate = willRender;
                if (!shouldRender) {
                  _context4.next = 26;
                  break;
                }
                _context4.prev = 3;
                this.renderPromise = new Promise(function (resolve) {
                  return _classPrivateFieldSet2(_resolveRenderPromise, _this7, resolve);
                });
                this.renderer = renderer;
                _context4.next = 8;
                return this.prepareToRenderSnapshot(renderer);
              case 8:
                renderInterception = new Promise(function (resolve) {
                  return _classPrivateFieldSet2(_resolveInterceptionPromise, _this7, resolve);
                });
                options = {
                  resume: _classPrivateFieldGet2(_resolveInterceptionPromise, this),
                  render: this.renderer.renderElement,
                  renderMethod: this.renderer.renderMethod
                };
                immediateRender = this.delegate.allowsImmediateRender(snapshot, options);
                if (immediateRender) {
                  _context4.next = 14;
                  break;
                }
                _context4.next = 14;
                return renderInterception;
              case 14:
                _context4.next = 16;
                return this.renderSnapshot(renderer);
              case 16:
                this.delegate.viewRenderedSnapshot(snapshot, isPreview, this.renderer.renderMethod);
                this.delegate.preloadOnLoadLinksForView(this.element);
                this.finishRenderingSnapshot(renderer);
              case 19:
                _context4.prev = 19;
                delete this.renderer;
                _classPrivateFieldGet2(_resolveRenderPromise, this).call(this, undefined);
                delete this.renderPromise;
                return _context4.finish(19);
              case 24:
                _context4.next = 27;
                break;
              case 26:
                if (shouldInvalidate) {
                  this.invalidate(renderer.reloadReason);
                }
              case 27:
              case "end":
                return _context4.stop();
            }
          }, _callee4, this, [[3,, 19, 24]]);
        }));
        function render(_x4) {
          return _render.apply(this, arguments);
        }
        return render;
      }()
    }, {
      key: "invalidate",
      value: function invalidate(reason) {
        this.delegate.viewInvalidated(reason);
      }
    }, {
      key: "prepareToRenderSnapshot",
      value: function () {
        var _prepareToRenderSnapshot = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(renderer) {
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                this.markAsPreview(renderer.isPreview);
                _context5.next = 3;
                return renderer.prepareToRender();
              case 3:
              case "end":
                return _context5.stop();
            }
          }, _callee5, this);
        }));
        function prepareToRenderSnapshot(_x5) {
          return _prepareToRenderSnapshot.apply(this, arguments);
        }
        return prepareToRenderSnapshot;
      }()
    }, {
      key: "markAsPreview",
      value: function markAsPreview(isPreview) {
        if (isPreview) {
          this.element.setAttribute("data-turbo-preview", "");
        } else {
          this.element.removeAttribute("data-turbo-preview");
        }
      }
    }, {
      key: "markVisitDirection",
      value: function markVisitDirection(direction) {
        this.element.setAttribute("data-turbo-visit-direction", direction);
      }
    }, {
      key: "unmarkVisitDirection",
      value: function unmarkVisitDirection() {
        this.element.removeAttribute("data-turbo-visit-direction");
      }
    }, {
      key: "renderSnapshot",
      value: function () {
        var _renderSnapshot = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(renderer) {
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return renderer.render();
              case 2:
              case "end":
                return _context6.stop();
            }
          }, _callee6);
        }));
        function renderSnapshot(_x6) {
          return _renderSnapshot.apply(this, arguments);
        }
        return renderSnapshot;
      }()
    }, {
      key: "finishRenderingSnapshot",
      value: function finishRenderingSnapshot(renderer) {
        renderer.finishRendering();
      }
    }]);
  }();
  var FrameView = /*#__PURE__*/function (_View2) {
    function FrameView() {
      _classCallCheck(this, FrameView);
      return _callSuper(this, FrameView, arguments);
    }
    _inherits(FrameView, _View2);
    return _createClass(FrameView, [{
      key: "missing",
      value: function missing() {
        this.element.innerHTML = "<strong class=\"turbo-frame-error\">Content missing</strong>";
      }
    }, {
      key: "snapshot",
      get: function get() {
        return new Snapshot(this.element);
      }
    }]);
  }(View);
  var LinkInterceptor = /*#__PURE__*/function () {
    function LinkInterceptor(delegate, element) {
      var _this8 = this;
      _classCallCheck(this, LinkInterceptor);
      _defineProperty(this, "clickBubbled", function (event) {
        if (_this8.clickEventIsSignificant(event)) {
          _this8.clickEvent = event;
        } else {
          delete _this8.clickEvent;
        }
      });
      _defineProperty(this, "linkClicked", function (event) {
        if (_this8.clickEvent && _this8.clickEventIsSignificant(event)) {
          if (_this8.delegate.shouldInterceptLinkClick(event.target, event.detail.url, event.detail.originalEvent)) {
            _this8.clickEvent.preventDefault();
            event.preventDefault();
            _this8.delegate.linkClickIntercepted(event.target, event.detail.url, event.detail.originalEvent);
          }
        }
        delete _this8.clickEvent;
      });
      _defineProperty(this, "willVisit", function (_event) {
        delete _this8.clickEvent;
      });
      this.delegate = delegate;
      this.element = element;
    }
    return _createClass(LinkInterceptor, [{
      key: "start",
      value: function start() {
        this.element.addEventListener("click", this.clickBubbled);
        document.addEventListener("turbo:click", this.linkClicked);
        document.addEventListener("turbo:before-visit", this.willVisit);
      }
    }, {
      key: "stop",
      value: function stop() {
        this.element.removeEventListener("click", this.clickBubbled);
        document.removeEventListener("turbo:click", this.linkClicked);
        document.removeEventListener("turbo:before-visit", this.willVisit);
      }
    }, {
      key: "clickEventIsSignificant",
      value: function clickEventIsSignificant(event) {
        var _event$target;
        var target = event.composed ? (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.parentElement : event.target;
        var element = findLinkFromClickTarget(target) || target;
        return element instanceof Element && element.closest("turbo-frame, html") == this.element;
      }
    }]);
  }();
  var LinkClickObserver = /*#__PURE__*/function () {
    function LinkClickObserver(delegate, eventTarget) {
      var _this9 = this;
      _classCallCheck(this, LinkClickObserver);
      _defineProperty(this, "started", false);
      _defineProperty(this, "clickCaptured", function () {
        _this9.eventTarget.removeEventListener("click", _this9.clickBubbled, false);
        _this9.eventTarget.addEventListener("click", _this9.clickBubbled, false);
      });
      _defineProperty(this, "clickBubbled", function (event) {
        if (event instanceof MouseEvent && _this9.clickEventIsSignificant(event)) {
          var target = event.composedPath && event.composedPath()[0] || event.target;
          var link = findLinkFromClickTarget(target);
          if (link && doesNotTargetIFrame(link.target)) {
            var _location2 = getLocationForLink(link);
            if (_this9.delegate.willFollowLinkToLocation(link, _location2, event)) {
              event.preventDefault();
              _this9.delegate.followedLinkToLocation(link, _location2);
            }
          }
        }
      });
      this.delegate = delegate;
      this.eventTarget = eventTarget;
    }
    return _createClass(LinkClickObserver, [{
      key: "start",
      value: function start() {
        if (!this.started) {
          this.eventTarget.addEventListener("click", this.clickCaptured, true);
          this.started = true;
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.started) {
          this.eventTarget.removeEventListener("click", this.clickCaptured, true);
          this.started = false;
        }
      }
    }, {
      key: "clickEventIsSignificant",
      value: function clickEventIsSignificant(event) {
        return !(event.target && event.target.isContentEditable || event.defaultPrevented || event.which > 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
      }
    }]);
  }();
  var FormLinkClickObserver = /*#__PURE__*/function () {
    function FormLinkClickObserver(delegate, element) {
      _classCallCheck(this, FormLinkClickObserver);
      this.delegate = delegate;
      this.linkInterceptor = new LinkClickObserver(this, element);
    }
    return _createClass(FormLinkClickObserver, [{
      key: "start",
      value: function start() {
        this.linkInterceptor.start();
      }
    }, {
      key: "stop",
      value: function stop() {
        this.linkInterceptor.stop();
      }

      // Link hover observer delegate
    }, {
      key: "canPrefetchRequestToLocation",
      value: function canPrefetchRequestToLocation(link, location) {
        return false;
      }
    }, {
      key: "prefetchAndCacheRequestToLocation",
      value: function prefetchAndCacheRequestToLocation(link, location) {
        return;
      }

      // Link click observer delegate
    }, {
      key: "willFollowLinkToLocation",
      value: function willFollowLinkToLocation(link, location, originalEvent) {
        return this.delegate.willSubmitFormLinkToLocation(link, location, originalEvent) && (link.hasAttribute("data-turbo-method") || link.hasAttribute("data-turbo-stream"));
      }
    }, {
      key: "followedLinkToLocation",
      value: function followedLinkToLocation(link, location) {
        var form = document.createElement("form");
        var type = "hidden";
        var _iterator8 = _createForOfIteratorHelper(location.searchParams),
          _step8;
        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var _step8$value = _slicedToArray(_step8.value, 2),
              name = _step8$value[0],
              value = _step8$value[1];
            form.append(Object.assign(document.createElement("input"), {
              type: type,
              name: name,
              value: value
            }));
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
        var action = Object.assign(location, {
          search: ""
        });
        form.setAttribute("data-turbo", "true");
        form.setAttribute("action", action.href);
        form.setAttribute("hidden", "");
        var method = link.getAttribute("data-turbo-method");
        if (method) form.setAttribute("method", method);
        var turboFrame = link.getAttribute("data-turbo-frame");
        if (turboFrame) form.setAttribute("data-turbo-frame", turboFrame);
        var turboAction = getVisitAction(link);
        if (turboAction) form.setAttribute("data-turbo-action", turboAction);
        var turboConfirm = link.getAttribute("data-turbo-confirm");
        if (turboConfirm) form.setAttribute("data-turbo-confirm", turboConfirm);
        var turboStream = link.hasAttribute("data-turbo-stream");
        if (turboStream) form.setAttribute("data-turbo-stream", "");
        this.delegate.submittedFormLinkToLocation(link, location, form);
        document.body.appendChild(form);
        form.addEventListener("turbo:submit-end", function () {
          return form.remove();
        }, {
          once: true
        });
        requestAnimationFrame(function () {
          return form.requestSubmit();
        });
      }
    }]);
  }();
  var Bardo = /*#__PURE__*/function () {
    function Bardo(delegate, permanentElementMap) {
      _classCallCheck(this, Bardo);
      this.delegate = delegate;
      this.permanentElementMap = permanentElementMap;
    }
    return _createClass(Bardo, [{
      key: "enter",
      value: function enter() {
        for (var id in this.permanentElementMap) {
          var _this$permanentElemen = _slicedToArray(this.permanentElementMap[id], 2),
            currentPermanentElement = _this$permanentElemen[0],
            newPermanentElement = _this$permanentElemen[1];
          this.delegate.enteringBardo(currentPermanentElement, newPermanentElement);
          this.replaceNewPermanentElementWithPlaceholder(newPermanentElement);
        }
      }
    }, {
      key: "leave",
      value: function leave() {
        for (var id in this.permanentElementMap) {
          var _this$permanentElemen2 = _slicedToArray(this.permanentElementMap[id], 1),
            currentPermanentElement = _this$permanentElemen2[0];
          this.replaceCurrentPermanentElementWithClone(currentPermanentElement);
          this.replacePlaceholderWithPermanentElement(currentPermanentElement);
          this.delegate.leavingBardo(currentPermanentElement);
        }
      }
    }, {
      key: "replaceNewPermanentElementWithPlaceholder",
      value: function replaceNewPermanentElementWithPlaceholder(permanentElement) {
        var placeholder = createPlaceholderForPermanentElement(permanentElement);
        permanentElement.replaceWith(placeholder);
      }
    }, {
      key: "replaceCurrentPermanentElementWithClone",
      value: function replaceCurrentPermanentElementWithClone(permanentElement) {
        var clone = permanentElement.cloneNode(true);
        permanentElement.replaceWith(clone);
      }
    }, {
      key: "replacePlaceholderWithPermanentElement",
      value: function replacePlaceholderWithPermanentElement(permanentElement) {
        var placeholder = this.getPlaceholderById(permanentElement.id);
        placeholder === null || placeholder === void 0 || placeholder.replaceWith(permanentElement);
      }
    }, {
      key: "getPlaceholderById",
      value: function getPlaceholderById(id) {
        return this.placeholders.find(function (element) {
          return element.content == id;
        });
      }
    }, {
      key: "placeholders",
      get: function get() {
        return _toConsumableArray(document.querySelectorAll("meta[name=turbo-permanent-placeholder][content]"));
      }
    }], [{
      key: "preservingPermanentElements",
      value: function () {
        var _preservingPermanentElements = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(delegate, permanentElementMap, callback) {
          var bardo;
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                bardo = new this(delegate, permanentElementMap);
                bardo.enter();
                _context7.next = 4;
                return callback();
              case 4:
                bardo.leave();
              case 5:
              case "end":
                return _context7.stop();
            }
          }, _callee7, this);
        }));
        function preservingPermanentElements(_x7, _x8, _x9) {
          return _preservingPermanentElements.apply(this, arguments);
        }
        return preservingPermanentElements;
      }()
    }]);
  }();
  function createPlaceholderForPermanentElement(permanentElement) {
    var element = document.createElement("meta");
    element.setAttribute("name", "turbo-permanent-placeholder");
    element.setAttribute("content", permanentElement.id);
    return element;
  }
  var _activeElement = /*#__PURE__*/new WeakMap();
  var Renderer = /*#__PURE__*/function () {
    function Renderer(currentSnapshot, newSnapshot, isPreview) {
      var _this10 = this;
      var willRender = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      _classCallCheck(this, Renderer);
      _classPrivateFieldInitSpec(this, _activeElement, null);
      this.currentSnapshot = currentSnapshot;
      this.newSnapshot = newSnapshot;
      this.isPreview = isPreview;
      this.willRender = willRender;
      this.renderElement = this.constructor.renderElement;
      this.promise = new Promise(function (resolve, reject) {
        return _this10.resolvingFunctions = {
          resolve: resolve,
          reject: reject
        };
      });
    }
    return _createClass(Renderer, [{
      key: "shouldRender",
      get: function get() {
        return true;
      }
    }, {
      key: "shouldAutofocus",
      get: function get() {
        return true;
      }
    }, {
      key: "reloadReason",
      get: function get() {
        return;
      }
    }, {
      key: "prepareToRender",
      value: function prepareToRender() {
        return;
      }
    }, {
      key: "render",
      value: function render() {
        // Abstract method
      }
    }, {
      key: "finishRendering",
      value: function finishRendering() {
        if (this.resolvingFunctions) {
          this.resolvingFunctions.resolve();
          delete this.resolvingFunctions;
        }
      }
    }, {
      key: "preservingPermanentElements",
      value: function () {
        var _preservingPermanentElements2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(callback) {
          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return Bardo.preservingPermanentElements(this, this.permanentElementMap, callback);
              case 2:
              case "end":
                return _context8.stop();
            }
          }, _callee8, this);
        }));
        function preservingPermanentElements(_x10) {
          return _preservingPermanentElements2.apply(this, arguments);
        }
        return preservingPermanentElements;
      }()
    }, {
      key: "focusFirstAutofocusableElement",
      value: function focusFirstAutofocusableElement() {
        if (this.shouldAutofocus) {
          var element = this.connectedSnapshot.firstAutofocusableElement;
          if (element) {
            element.focus();
          }
        }
      }

      // Bardo delegate
    }, {
      key: "enteringBardo",
      value: function enteringBardo(currentPermanentElement) {
        if (_classPrivateFieldGet2(_activeElement, this)) return;
        if (currentPermanentElement.contains(this.currentSnapshot.activeElement)) {
          _classPrivateFieldSet2(_activeElement, this, this.currentSnapshot.activeElement);
        }
      }
    }, {
      key: "leavingBardo",
      value: function leavingBardo(currentPermanentElement) {
        if (currentPermanentElement.contains(_classPrivateFieldGet2(_activeElement, this)) && _classPrivateFieldGet2(_activeElement, this) instanceof HTMLElement) {
          _classPrivateFieldGet2(_activeElement, this).focus();
          _classPrivateFieldSet2(_activeElement, this, null);
        }
      }
    }, {
      key: "connectedSnapshot",
      get: function get() {
        return this.newSnapshot.isConnected ? this.newSnapshot : this.currentSnapshot;
      }
    }, {
      key: "currentElement",
      get: function get() {
        return this.currentSnapshot.element;
      }
    }, {
      key: "newElement",
      get: function get() {
        return this.newSnapshot.element;
      }
    }, {
      key: "permanentElementMap",
      get: function get() {
        return this.currentSnapshot.getPermanentElementMapForSnapshot(this.newSnapshot);
      }
    }, {
      key: "renderMethod",
      get: function get() {
        return "replace";
      }
    }], [{
      key: "renderElement",
      value: function renderElement(currentElement, newElement) {
        // Abstract method
      }
    }]);
  }();
  var FrameRenderer = /*#__PURE__*/function (_Renderer2) {
    function FrameRenderer(delegate, currentSnapshot, newSnapshot, renderElement, isPreview) {
      var _this11;
      var willRender = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      _classCallCheck(this, FrameRenderer);
      _this11 = _callSuper(this, FrameRenderer, [currentSnapshot, newSnapshot, renderElement, isPreview, willRender]);
      _this11.delegate = delegate;
      return _this11;
    }
    _inherits(FrameRenderer, _Renderer2);
    return _createClass(FrameRenderer, [{
      key: "shouldRender",
      get: function get() {
        return true;
      }
    }, {
      key: "render",
      value: function () {
        var _render2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
          var _this12 = this;
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return nextRepaint();
              case 2:
                this.preservingPermanentElements(function () {
                  _this12.loadFrameElement();
                });
                this.scrollFrameIntoView();
                _context9.next = 6;
                return nextRepaint();
              case 6:
                this.focusFirstAutofocusableElement();
                _context9.next = 9;
                return nextRepaint();
              case 9:
                this.activateScriptElements();
              case 10:
              case "end":
                return _context9.stop();
            }
          }, _callee9, this);
        }));
        function render() {
          return _render2.apply(this, arguments);
        }
        return render;
      }()
    }, {
      key: "loadFrameElement",
      value: function loadFrameElement() {
        this.delegate.willRenderFrame(this.currentElement, this.newElement);
        this.renderElement(this.currentElement, this.newElement);
      }
    }, {
      key: "scrollFrameIntoView",
      value: function scrollFrameIntoView() {
        if (this.currentElement.autoscroll || this.newElement.autoscroll) {
          var element = this.currentElement.firstElementChild;
          var block = readScrollLogicalPosition(this.currentElement.getAttribute("data-autoscroll-block"), "end");
          var behavior = readScrollBehavior(this.currentElement.getAttribute("data-autoscroll-behavior"), "auto");
          if (element) {
            element.scrollIntoView({
              block: block,
              behavior: behavior
            });
            return true;
          }
        }
        return false;
      }
    }, {
      key: "activateScriptElements",
      value: function activateScriptElements() {
        var _iterator9 = _createForOfIteratorHelper(this.newScriptElements),
          _step9;
        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var inertScriptElement = _step9.value;
            var activatedScriptElement = activateScriptElement(inertScriptElement);
            inertScriptElement.replaceWith(activatedScriptElement);
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      }
    }, {
      key: "newScriptElements",
      get: function get() {
        return this.currentElement.querySelectorAll("script");
      }
    }], [{
      key: "renderElement",
      value: function renderElement(currentElement, newElement) {
        var _frameElement$ownerDo;
        var destinationRange = document.createRange();
        destinationRange.selectNodeContents(currentElement);
        destinationRange.deleteContents();
        var frameElement = newElement;
        var sourceRange = (_frameElement$ownerDo = frameElement.ownerDocument) === null || _frameElement$ownerDo === void 0 ? void 0 : _frameElement$ownerDo.createRange();
        if (sourceRange) {
          sourceRange.selectNodeContents(frameElement);
          currentElement.appendChild(sourceRange.extractContents());
        }
      }
    }]);
  }(Renderer);
  function readScrollLogicalPosition(value, defaultValue) {
    if (value == "end" || value == "start" || value == "center" || value == "nearest") {
      return value;
    } else {
      return defaultValue;
    }
  }
  function readScrollBehavior(value, defaultValue) {
    if (value == "auto" || value == "smooth") {
      return value;
    } else {
      return defaultValue;
    }
  }

  // base IIFE to define idiomorph
  var Idiomorph$1 = function () {
    //=============================================================================
    // AND NOW IT BEGINS...
    //=============================================================================
    var EMPTY_SET = new Set();

    // default configuration values, updatable by users now
    var defaults = {
      morphStyle: "outerHTML",
      callbacks: {
        beforeNodeAdded: noOp,
        afterNodeAdded: noOp,
        beforeNodeMorphed: noOp,
        afterNodeMorphed: noOp,
        beforeNodeRemoved: noOp,
        afterNodeRemoved: noOp,
        beforeAttributeUpdated: noOp
      },
      head: {
        style: 'merge',
        shouldPreserve: function shouldPreserve(elt) {
          return elt.getAttribute("im-preserve") === "true";
        },
        shouldReAppend: function shouldReAppend(elt) {
          return elt.getAttribute("im-re-append") === "true";
        },
        shouldRemove: noOp,
        afterHeadMorphed: noOp
      }
    };

    //=============================================================================
    // Core Morphing Algorithm - morph, morphNormalizedContent, morphOldNodeTo, morphChildren
    //=============================================================================
    function morph(oldNode, newContent) {
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (oldNode instanceof Document) {
        oldNode = oldNode.documentElement;
      }
      if (typeof newContent === 'string') {
        newContent = parseContent(newContent);
      }
      var normalizedContent = normalizeContent(newContent);
      var ctx = createMorphContext(oldNode, normalizedContent, config);
      return morphNormalizedContent(oldNode, normalizedContent, ctx);
    }
    function morphNormalizedContent(oldNode, normalizedNewContent, ctx) {
      if (ctx.head.block) {
        var oldHead = oldNode.querySelector('head');
        var newHead = normalizedNewContent.querySelector('head');
        if (oldHead && newHead) {
          var promises = handleHeadElement(newHead, oldHead, ctx);
          // when head promises resolve, call morph again, ignoring the head tag
          Promise.all(promises).then(function () {
            morphNormalizedContent(oldNode, normalizedNewContent, Object.assign(ctx, {
              head: {
                block: false,
                ignore: true
              }
            }));
          });
          return;
        }
      }
      if (ctx.morphStyle === "innerHTML") {
        // innerHTML, so we are only updating the children
        morphChildren(normalizedNewContent, oldNode, ctx);
        return oldNode.children;
      } else if (ctx.morphStyle === "outerHTML" || ctx.morphStyle == null) {
        // otherwise find the best element match in the new content, morph that, and merge its siblings
        // into either side of the best match
        var bestMatch = findBestNodeMatch(normalizedNewContent, oldNode, ctx);

        // stash the siblings that will need to be inserted on either side of the best match
        var previousSibling = bestMatch === null || bestMatch === void 0 ? void 0 : bestMatch.previousSibling;
        var nextSibling = bestMatch === null || bestMatch === void 0 ? void 0 : bestMatch.nextSibling;

        // morph it
        var morphedNode = morphOldNodeTo(oldNode, bestMatch, ctx);
        if (bestMatch) {
          // if there was a best match, merge the siblings in too and return the
          // whole bunch
          return insertSiblings(previousSibling, morphedNode, nextSibling);
        } else {
          // otherwise nothing was added to the DOM
          return [];
        }
      } else {
        throw "Do not understand how to morph style " + ctx.morphStyle;
      }
    }

    /**
     * @param possibleActiveElement
     * @param ctx
     * @returns {boolean}
     */
    function ignoreValueOfActiveElement(possibleActiveElement, ctx) {
      return ctx.ignoreActiveValue && possibleActiveElement === document.activeElement && possibleActiveElement !== document.body;
    }

    /**
     * @param oldNode root node to merge content into
     * @param newContent new content to merge
     * @param ctx the merge context
     * @returns {Element} the element that ended up in the DOM
     */
    function morphOldNodeTo(oldNode, newContent, ctx) {
      if (ctx.ignoreActive && oldNode === document.activeElement) ;else if (newContent == null) {
        if (ctx.callbacks.beforeNodeRemoved(oldNode) === false) return oldNode;
        oldNode.remove();
        ctx.callbacks.afterNodeRemoved(oldNode);
        return null;
      } else if (!isSoftMatch(oldNode, newContent)) {
        if (ctx.callbacks.beforeNodeRemoved(oldNode) === false) return oldNode;
        if (ctx.callbacks.beforeNodeAdded(newContent) === false) return oldNode;
        oldNode.parentElement.replaceChild(newContent, oldNode);
        ctx.callbacks.afterNodeAdded(newContent);
        ctx.callbacks.afterNodeRemoved(oldNode);
        return newContent;
      } else {
        if (ctx.callbacks.beforeNodeMorphed(oldNode, newContent) === false) return oldNode;
        if (oldNode instanceof HTMLHeadElement && ctx.head.ignore) ;else if (oldNode instanceof HTMLHeadElement && ctx.head.style !== "morph") {
          handleHeadElement(newContent, oldNode, ctx);
        } else {
          syncNodeFrom(newContent, oldNode, ctx);
          if (!ignoreValueOfActiveElement(oldNode, ctx)) {
            morphChildren(newContent, oldNode, ctx);
          }
        }
        ctx.callbacks.afterNodeMorphed(oldNode, newContent);
        return oldNode;
      }
    }

    /**
     * This is the core algorithm for matching up children.  The idea is to use id sets to try to match up
     * nodes as faithfully as possible.  We greedily match, which allows us to keep the algorithm fast, but
     * by using id sets, we are able to better match up with content deeper in the DOM.
     *
     * Basic algorithm is, for each node in the new content:
     *
     * - if we have reached the end of the old parent, append the new content
     * - if the new content has an id set match with the current insertion point, morph
     * - search for an id set match
     * - if id set match found, morph
     * - otherwise search for a "soft" match
     * - if a soft match is found, morph
     * - otherwise, prepend the new node before the current insertion point
     *
     * The two search algorithms terminate if competing node matches appear to outweigh what can be achieved
     * with the current node.  See findIdSetMatch() and findSoftMatch() for details.
     *
     * @param {Element} newParent the parent element of the new content
     * @param {Element } oldParent the old content that we are merging the new content into
     * @param ctx the merge context
     */
    function morphChildren(newParent, oldParent, ctx) {
      var nextNewChild = newParent.firstChild;
      var insertionPoint = oldParent.firstChild;
      var newChild;

      // run through all the new content
      while (nextNewChild) {
        newChild = nextNewChild;
        nextNewChild = newChild.nextSibling;

        // if we are at the end of the exiting parent's children, just append
        if (insertionPoint == null) {
          if (ctx.callbacks.beforeNodeAdded(newChild) === false) return;
          oldParent.appendChild(newChild);
          ctx.callbacks.afterNodeAdded(newChild);
          removeIdsFromConsideration(ctx, newChild);
          continue;
        }

        // if the current node has an id set match then morph
        if (isIdSetMatch(newChild, insertionPoint, ctx)) {
          morphOldNodeTo(insertionPoint, newChild, ctx);
          insertionPoint = insertionPoint.nextSibling;
          removeIdsFromConsideration(ctx, newChild);
          continue;
        }

        // otherwise search forward in the existing old children for an id set match
        var idSetMatch = findIdSetMatch(newParent, oldParent, newChild, insertionPoint, ctx);

        // if we found a potential match, remove the nodes until that point and morph
        if (idSetMatch) {
          insertionPoint = removeNodesBetween(insertionPoint, idSetMatch, ctx);
          morphOldNodeTo(idSetMatch, newChild, ctx);
          removeIdsFromConsideration(ctx, newChild);
          continue;
        }

        // no id set match found, so scan forward for a soft match for the current node
        var softMatch = findSoftMatch(newParent, oldParent, newChild, insertionPoint, ctx);

        // if we found a soft match for the current node, morph
        if (softMatch) {
          insertionPoint = removeNodesBetween(insertionPoint, softMatch, ctx);
          morphOldNodeTo(softMatch, newChild, ctx);
          removeIdsFromConsideration(ctx, newChild);
          continue;
        }

        // abandon all hope of morphing, just insert the new child before the insertion point
        // and move on
        if (ctx.callbacks.beforeNodeAdded(newChild) === false) return;
        oldParent.insertBefore(newChild, insertionPoint);
        ctx.callbacks.afterNodeAdded(newChild);
        removeIdsFromConsideration(ctx, newChild);
      }

      // remove any remaining old nodes that didn't match up with new content
      while (insertionPoint !== null) {
        var tempNode = insertionPoint;
        insertionPoint = insertionPoint.nextSibling;
        removeNode(tempNode, ctx);
      }
    }

    //=============================================================================
    // Attribute Syncing Code
    //=============================================================================

    /**
     * @param attr {String} the attribute to be mutated
     * @param to {Element} the element that is going to be updated
     * @param updateType {("update"|"remove")}
     * @param ctx the merge context
     * @returns {boolean} true if the attribute should be ignored, false otherwise
     */
    function ignoreAttribute(attr, to, updateType, ctx) {
      if (attr === 'value' && ctx.ignoreActiveValue && to === document.activeElement) {
        return true;
      }
      return ctx.callbacks.beforeAttributeUpdated(attr, to, updateType) === false;
    }

    /**
     * syncs a given node with another node, copying over all attributes and
     * inner element state from the 'from' node to the 'to' node
     *
     * @param {Element} from the element to copy attributes & state from
     * @param {Element} to the element to copy attributes & state to
     * @param ctx the merge context
     */
    function syncNodeFrom(from, to, ctx) {
      var type = from.nodeType;

      // if is an element type, sync the attributes from the
      // new node into the new node
      if (type === 1 /* element type */) {
        var fromAttributes = from.attributes;
        var toAttributes = to.attributes;
        var _iterator10 = _createForOfIteratorHelper(fromAttributes),
          _step10;
        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var fromAttribute = _step10.value;
            if (ignoreAttribute(fromAttribute.name, to, 'update', ctx)) {
              continue;
            }
            if (to.getAttribute(fromAttribute.name) !== fromAttribute.value) {
              to.setAttribute(fromAttribute.name, fromAttribute.value);
            }
          }
          // iterate backwards to avoid skipping over items when a delete occurs
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
        for (var i = toAttributes.length - 1; 0 <= i; i--) {
          var toAttribute = toAttributes[i];
          if (ignoreAttribute(toAttribute.name, to, 'remove', ctx)) {
            continue;
          }
          if (!from.hasAttribute(toAttribute.name)) {
            to.removeAttribute(toAttribute.name);
          }
        }
      }

      // sync text nodes
      if (type === 8 /* comment */ || type === 3 /* text */) {
        if (to.nodeValue !== from.nodeValue) {
          to.nodeValue = from.nodeValue;
        }
      }
      if (!ignoreValueOfActiveElement(to, ctx)) {
        // sync input values
        syncInputValue(from, to, ctx);
      }
    }

    /**
     * @param from {Element} element to sync the value from
     * @param to {Element} element to sync the value to
     * @param attributeName {String} the attribute name
     * @param ctx the merge context
     */
    function syncBooleanAttribute(from, to, attributeName, ctx) {
      if (from[attributeName] !== to[attributeName]) {
        var ignoreUpdate = ignoreAttribute(attributeName, to, 'update', ctx);
        if (!ignoreUpdate) {
          to[attributeName] = from[attributeName];
        }
        if (from[attributeName]) {
          if (!ignoreUpdate) {
            to.setAttribute(attributeName, from[attributeName]);
          }
        } else {
          if (!ignoreAttribute(attributeName, to, 'remove', ctx)) {
            to.removeAttribute(attributeName);
          }
        }
      }
    }

    /**
     * NB: many bothans died to bring us information:
     *
     *  https://github.com/patrick-steele-idem/morphdom/blob/master/src/specialElHandlers.js
     *  https://github.com/choojs/nanomorph/blob/master/lib/morph.jsL113
     *
     * @param from {Element} the element to sync the input value from
     * @param to {Element} the element to sync the input value to
     * @param ctx the merge context
     */
    function syncInputValue(from, to, ctx) {
      if (from instanceof HTMLInputElement && to instanceof HTMLInputElement && from.type !== 'file') {
        var fromValue = from.value;
        var toValue = to.value;

        // sync boolean attributes
        syncBooleanAttribute(from, to, 'checked', ctx);
        syncBooleanAttribute(from, to, 'disabled', ctx);
        if (!from.hasAttribute('value')) {
          if (!ignoreAttribute('value', to, 'remove', ctx)) {
            to.value = '';
            to.removeAttribute('value');
          }
        } else if (fromValue !== toValue) {
          if (!ignoreAttribute('value', to, 'update', ctx)) {
            to.setAttribute('value', fromValue);
            to.value = fromValue;
          }
        }
      } else if (from instanceof HTMLOptionElement) {
        syncBooleanAttribute(from, to, 'selected', ctx);
      } else if (from instanceof HTMLTextAreaElement && to instanceof HTMLTextAreaElement) {
        var _fromValue = from.value;
        var _toValue = to.value;
        if (ignoreAttribute('value', to, 'update', ctx)) {
          return;
        }
        if (_fromValue !== _toValue) {
          to.value = _fromValue;
        }
        if (to.firstChild && to.firstChild.nodeValue !== _fromValue) {
          to.firstChild.nodeValue = _fromValue;
        }
      }
    }

    //=============================================================================
    // the HEAD tag can be handled specially, either w/ a 'merge' or 'append' style
    //=============================================================================
    function handleHeadElement(newHeadTag, currentHead, ctx) {
      var added = [];
      var removed = [];
      var preserved = [];
      var nodesToAppend = [];
      var headMergeStyle = ctx.head.style;

      // put all new head elements into a Map, by their outerHTML
      var srcToNewHeadNodes = new Map();
      var _iterator11 = _createForOfIteratorHelper(newHeadTag.children),
        _step11;
      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var newHeadChild = _step11.value;
          srcToNewHeadNodes.set(newHeadChild.outerHTML, newHeadChild);
        }

        // for each elt in the current head
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
      var _iterator12 = _createForOfIteratorHelper(currentHead.children),
        _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var currentHeadElt = _step12.value;
          // If the current head element is in the map
          var inNewContent = srcToNewHeadNodes.has(currentHeadElt.outerHTML);
          var isReAppended = ctx.head.shouldReAppend(currentHeadElt);
          var isPreserved = ctx.head.shouldPreserve(currentHeadElt);
          if (inNewContent || isPreserved) {
            if (isReAppended) {
              // remove the current version and let the new version replace it and re-execute
              removed.push(currentHeadElt);
            } else {
              // this element already exists and should not be re-appended, so remove it from
              // the new content map, preserving it in the DOM
              srcToNewHeadNodes["delete"](currentHeadElt.outerHTML);
              preserved.push(currentHeadElt);
            }
          } else {
            if (headMergeStyle === "append") {
              // we are appending and this existing element is not new content
              // so if and only if it is marked for re-append do we do anything
              if (isReAppended) {
                removed.push(currentHeadElt);
                nodesToAppend.push(currentHeadElt);
              }
            } else {
              // if this is a merge, we remove this content since it is not in the new head
              if (ctx.head.shouldRemove(currentHeadElt) !== false) {
                removed.push(currentHeadElt);
              }
            }
          }
        }

        // Push the remaining new head elements in the Map into the
        // nodes to append to the head tag
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
      nodesToAppend.push.apply(nodesToAppend, _toConsumableArray(srcToNewHeadNodes.values()));
      var promises = [];
      var _loop = function _loop() {
        var newNode = _nodesToAppend[_i3];
        var newElt = document.createRange().createContextualFragment(newNode.outerHTML).firstChild;
        if (ctx.callbacks.beforeNodeAdded(newElt) !== false) {
          if (newElt.href || newElt.src) {
            var resolve = null;
            var promise = new Promise(function (_resolve) {
              resolve = _resolve;
            });
            newElt.addEventListener('load', function () {
              resolve();
            });
            promises.push(promise);
          }
          currentHead.appendChild(newElt);
          ctx.callbacks.afterNodeAdded(newElt);
          added.push(newElt);
        }
      };
      for (var _i3 = 0, _nodesToAppend = nodesToAppend; _i3 < _nodesToAppend.length; _i3++) {
        _loop();
      }

      // remove all removed elements, after we have appended the new elements to avoid
      // additional network requests for things like style sheets
      for (var _i4 = 0, _removed = removed; _i4 < _removed.length; _i4++) {
        var removedElement = _removed[_i4];
        if (ctx.callbacks.beforeNodeRemoved(removedElement) !== false) {
          currentHead.removeChild(removedElement);
          ctx.callbacks.afterNodeRemoved(removedElement);
        }
      }
      ctx.head.afterHeadMorphed(currentHead, {
        added: added,
        kept: preserved,
        removed: removed
      });
      return promises;
    }
    function noOp() {}

    /*
      Deep merges the config object and the Idiomoroph.defaults object to
      produce a final configuration object
     */
    function mergeDefaults(config) {
      var finalConfig = {};
      // copy top level stuff into final config
      Object.assign(finalConfig, defaults);
      Object.assign(finalConfig, config);

      // copy callbacks into final config (do this to deep merge the callbacks)
      finalConfig.callbacks = {};
      Object.assign(finalConfig.callbacks, defaults.callbacks);
      Object.assign(finalConfig.callbacks, config.callbacks);

      // copy head config into final config  (do this to deep merge the head)
      finalConfig.head = {};
      Object.assign(finalConfig.head, defaults.head);
      Object.assign(finalConfig.head, config.head);
      return finalConfig;
    }
    function createMorphContext(oldNode, newContent, config) {
      config = mergeDefaults(config);
      return {
        target: oldNode,
        newContent: newContent,
        config: config,
        morphStyle: config.morphStyle,
        ignoreActive: config.ignoreActive,
        ignoreActiveValue: config.ignoreActiveValue,
        idMap: createIdMap(oldNode, newContent),
        deadIds: new Set(),
        callbacks: config.callbacks,
        head: config.head
      };
    }
    function isIdSetMatch(node1, node2, ctx) {
      if (node1 == null || node2 == null) {
        return false;
      }
      if (node1.nodeType === node2.nodeType && node1.tagName === node2.tagName) {
        if (node1.id !== "" && node1.id === node2.id) {
          return true;
        } else {
          return getIdIntersectionCount(ctx, node1, node2) > 0;
        }
      }
      return false;
    }
    function isSoftMatch(node1, node2) {
      if (node1 == null || node2 == null) {
        return false;
      }
      return node1.nodeType === node2.nodeType && node1.tagName === node2.tagName;
    }
    function removeNodesBetween(startInclusive, endExclusive, ctx) {
      while (startInclusive !== endExclusive) {
        var tempNode = startInclusive;
        startInclusive = startInclusive.nextSibling;
        removeNode(tempNode, ctx);
      }
      removeIdsFromConsideration(ctx, endExclusive);
      return endExclusive.nextSibling;
    }

    //=============================================================================
    // Scans forward from the insertionPoint in the old parent looking for a potential id match
    // for the newChild.  We stop if we find a potential id match for the new child OR
    // if the number of potential id matches we are discarding is greater than the
    // potential id matches for the new child
    //=============================================================================
    function findIdSetMatch(newContent, oldParent, newChild, insertionPoint, ctx) {
      // max id matches we are willing to discard in our search
      var newChildPotentialIdCount = getIdIntersectionCount(ctx, newChild, oldParent);
      var potentialMatch = null;

      // only search forward if there is a possibility of an id match
      if (newChildPotentialIdCount > 0) {
        var _potentialMatch = insertionPoint;
        // if there is a possibility of an id match, scan forward
        // keep track of the potential id match count we are discarding (the
        // newChildPotentialIdCount must be greater than this to make it likely
        // worth it)
        var otherMatchCount = 0;
        while (_potentialMatch != null) {
          // If we have an id match, return the current potential match
          if (isIdSetMatch(newChild, _potentialMatch, ctx)) {
            return _potentialMatch;
          }

          // computer the other potential matches of this new content
          otherMatchCount += getIdIntersectionCount(ctx, _potentialMatch, newContent);
          if (otherMatchCount > newChildPotentialIdCount) {
            // if we have more potential id matches in _other_ content, we
            // do not have a good candidate for an id match, so return null
            return null;
          }

          // advanced to the next old content child
          _potentialMatch = _potentialMatch.nextSibling;
        }
      }
      return potentialMatch;
    }

    //=============================================================================
    // Scans forward from the insertionPoint in the old parent looking for a potential soft match
    // for the newChild.  We stop if we find a potential soft match for the new child OR
    // if we find a potential id match in the old parents children OR if we find two
    // potential soft matches for the next two pieces of new content
    //=============================================================================
    function findSoftMatch(newContent, oldParent, newChild, insertionPoint, ctx) {
      var potentialSoftMatch = insertionPoint;
      var nextSibling = newChild.nextSibling;
      var siblingSoftMatchCount = 0;
      while (potentialSoftMatch != null) {
        if (getIdIntersectionCount(ctx, potentialSoftMatch, newContent) > 0) {
          // the current potential soft match has a potential id set match with the remaining new
          // content so bail out of looking
          return null;
        }

        // if we have a soft match with the current node, return it
        if (isSoftMatch(newChild, potentialSoftMatch)) {
          return potentialSoftMatch;
        }
        if (isSoftMatch(nextSibling, potentialSoftMatch)) {
          // the next new node has a soft match with this node, so
          // increment the count of future soft matches
          siblingSoftMatchCount++;
          nextSibling = nextSibling.nextSibling;

          // If there are two future soft matches, bail to allow the siblings to soft match
          // so that we don't consume future soft matches for the sake of the current node
          if (siblingSoftMatchCount >= 2) {
            return null;
          }
        }

        // advanced to the next old content child
        potentialSoftMatch = potentialSoftMatch.nextSibling;
      }
      return potentialSoftMatch;
    }
    function parseContent(newContent) {
      var parser = new DOMParser();

      // remove svgs to avoid false-positive matches on head, etc.
      var contentWithSvgsRemoved = newContent.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, '');

      // if the newContent contains a html, head or body tag, we can simply parse it w/o wrapping
      if (contentWithSvgsRemoved.match(/<\/html>/) || contentWithSvgsRemoved.match(/<\/head>/) || contentWithSvgsRemoved.match(/<\/body>/)) {
        var content = parser.parseFromString(newContent, "text/html");
        // if it is a full HTML document, return the document itself as the parent container
        if (contentWithSvgsRemoved.match(/<\/html>/)) {
          content.generatedByIdiomorph = true;
          return content;
        } else {
          // otherwise return the html element as the parent container
          var htmlElement = content.firstChild;
          if (htmlElement) {
            htmlElement.generatedByIdiomorph = true;
            return htmlElement;
          } else {
            return null;
          }
        }
      } else {
        // if it is partial HTML, wrap it in a template tag to provide a parent element and also to help
        // deal with touchy tags like tr, tbody, etc.
        var responseDoc = parser.parseFromString("<body><template>" + newContent + "</template></body>", "text/html");
        var _content = responseDoc.body.querySelector('template').content;
        _content.generatedByIdiomorph = true;
        return _content;
      }
    }
    function normalizeContent(newContent) {
      if (newContent == null) {
        // noinspection UnnecessaryLocalVariableJS
        var dummyParent = document.createElement('div');
        return dummyParent;
      } else if (newContent.generatedByIdiomorph) {
        // the template tag created by idiomorph parsing can serve as a dummy parent
        return newContent;
      } else if (newContent instanceof Node) {
        // a single node is added as a child to a dummy parent
        var _dummyParent = document.createElement('div');
        _dummyParent.append(newContent);
        return _dummyParent;
      } else {
        // all nodes in the array or HTMLElement collection are consolidated under
        // a single dummy parent element
        var _dummyParent2 = document.createElement('div');
        for (var _i5 = 0, _arr = _toConsumableArray(newContent); _i5 < _arr.length; _i5++) {
          var elt = _arr[_i5];
          _dummyParent2.append(elt);
        }
        return _dummyParent2;
      }
    }
    function insertSiblings(previousSibling, morphedNode, nextSibling) {
      var stack = [];
      var added = [];
      while (previousSibling != null) {
        stack.push(previousSibling);
        previousSibling = previousSibling.previousSibling;
      }
      while (stack.length > 0) {
        var node = stack.pop();
        added.push(node); // push added preceding siblings on in order and insert
        morphedNode.parentElement.insertBefore(node, morphedNode);
      }
      added.push(morphedNode);
      while (nextSibling != null) {
        stack.push(nextSibling);
        added.push(nextSibling); // here we are going in order, so push on as we scan, rather than add
        nextSibling = nextSibling.nextSibling;
      }
      while (stack.length > 0) {
        morphedNode.parentElement.insertBefore(stack.pop(), morphedNode.nextSibling);
      }
      return added;
    }
    function findBestNodeMatch(newContent, oldNode, ctx) {
      var currentElement;
      currentElement = newContent.firstChild;
      var bestElement = currentElement;
      var score = 0;
      while (currentElement) {
        var newScore = scoreElement(currentElement, oldNode, ctx);
        if (newScore > score) {
          bestElement = currentElement;
          score = newScore;
        }
        currentElement = currentElement.nextSibling;
      }
      return bestElement;
    }
    function scoreElement(node1, node2, ctx) {
      if (isSoftMatch(node1, node2)) {
        return .5 + getIdIntersectionCount(ctx, node1, node2);
      }
      return 0;
    }
    function removeNode(tempNode, ctx) {
      removeIdsFromConsideration(ctx, tempNode);
      if (ctx.callbacks.beforeNodeRemoved(tempNode) === false) return;
      tempNode.remove();
      ctx.callbacks.afterNodeRemoved(tempNode);
    }

    //=============================================================================
    // ID Set Functions
    //=============================================================================

    function isIdInConsideration(ctx, id) {
      return !ctx.deadIds.has(id);
    }
    function idIsWithinNode(ctx, id, targetNode) {
      var idSet = ctx.idMap.get(targetNode) || EMPTY_SET;
      return idSet.has(id);
    }
    function removeIdsFromConsideration(ctx, node) {
      var idSet = ctx.idMap.get(node) || EMPTY_SET;
      var _iterator13 = _createForOfIteratorHelper(idSet),
        _step13;
      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var id = _step13.value;
          ctx.deadIds.add(id);
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
    }
    function getIdIntersectionCount(ctx, node1, node2) {
      var sourceSet = ctx.idMap.get(node1) || EMPTY_SET;
      var matchCount = 0;
      var _iterator14 = _createForOfIteratorHelper(sourceSet),
        _step14;
      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var id = _step14.value;
          // a potential match is an id in the source and potentialIdsSet, but
          // that has not already been merged into the DOM
          if (isIdInConsideration(ctx, id) && idIsWithinNode(ctx, id, node2)) {
            ++matchCount;
          }
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }
      return matchCount;
    }

    /**
     * A bottom up algorithm that finds all elements with ids inside of the node
     * argument and populates id sets for those nodes and all their parents, generating
     * a set of ids contained within all nodes for the entire hierarchy in the DOM
     *
     * @param node {Element}
     * @param {Map<Node, Set<String>>} idMap
     */
    function populateIdMapForNode(node, idMap) {
      var nodeParent = node.parentElement;
      // find all elements with an id property
      var idElements = node.querySelectorAll('[id]');
      var _iterator15 = _createForOfIteratorHelper(idElements),
        _step15;
      try {
        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
          var elt = _step15.value;
          var current = elt;
          // walk up the parent hierarchy of that element, adding the id
          // of element to the parent's id set
          while (current !== nodeParent && current != null) {
            var idSet = idMap.get(current);
            // if the id set doesn't exist, create it and insert it in the  map
            if (idSet == null) {
              idSet = new Set();
              idMap.set(current, idSet);
            }
            idSet.add(elt.id);
            current = current.parentElement;
          }
        }
      } catch (err) {
        _iterator15.e(err);
      } finally {
        _iterator15.f();
      }
    }

    /**
     * This function computes a map of nodes to all ids contained within that node (inclusive of the
     * node).  This map can be used to ask if two nodes have intersecting sets of ids, which allows
     * for a looser definition of "matching" than tradition id matching, and allows child nodes
     * to contribute to a parent nodes matching.
     *
     * @param {Element} oldContent  the old content that will be morphed
     * @param {Element} newContent  the new content to morph to
     * @returns {Map<Node, Set<String>>} a map of nodes to id sets for the
     */
    function createIdMap(oldContent, newContent) {
      var idMap = new Map();
      populateIdMapForNode(oldContent, idMap);
      populateIdMapForNode(newContent, idMap);
      return idMap;
    }

    //=============================================================================
    // This is what ends up becoming the Idiomorph global object
    //=============================================================================
    return {
      morph: morph,
      defaults: defaults
    };
  }();
  function morphElements(currentElement, newElement) {
    var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      callbacks = _ref3.callbacks,
      options = _objectWithoutProperties(_ref3, _excluded);
    Idiomorph$1.morph(currentElement, newElement, _objectSpread2(_objectSpread2({}, options), {}, {
      callbacks: new DefaultIdiomorphCallbacks(callbacks)
    }));
  }
  function morphChildren(currentElement, newElement) {
    morphElements(currentElement, newElement.children, {
      morphStyle: "innerHTML"
    });
  }
  var _beforeNodeMorphed = /*#__PURE__*/new WeakMap();
  var DefaultIdiomorphCallbacks = /*#__PURE__*/_createClass(function DefaultIdiomorphCallbacks() {
    var _this13 = this;
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      beforeNodeMorphed = _ref4.beforeNodeMorphed;
    _classCallCheck(this, DefaultIdiomorphCallbacks);
    _classPrivateFieldInitSpec(this, _beforeNodeMorphed, void 0);
    _defineProperty(this, "beforeNodeAdded", function (node) {
      return !(node.id && node.hasAttribute("data-turbo-permanent") && document.getElementById(node.id));
    });
    _defineProperty(this, "beforeNodeMorphed", function (currentElement, newElement) {
      if (currentElement instanceof Element) {
        if (!currentElement.hasAttribute("data-turbo-permanent") && _classPrivateFieldGet2(_beforeNodeMorphed, _this13).call(_this13, currentElement, newElement)) {
          var event = dispatch("turbo:before-morph-element", {
            cancelable: true,
            target: currentElement,
            detail: {
              currentElement: currentElement,
              newElement: newElement
            }
          });
          return !event.defaultPrevented;
        } else {
          return false;
        }
      }
    });
    _defineProperty(this, "beforeAttributeUpdated", function (attributeName, target, mutationType) {
      var event = dispatch("turbo:before-morph-attribute", {
        cancelable: true,
        target: target,
        detail: {
          attributeName: attributeName,
          mutationType: mutationType
        }
      });
      return !event.defaultPrevented;
    });
    _defineProperty(this, "beforeNodeRemoved", function (node) {
      return _this13.beforeNodeMorphed(node);
    });
    _defineProperty(this, "afterNodeMorphed", function (currentElement, newElement) {
      if (currentElement instanceof Element) {
        dispatch("turbo:morph-element", {
          target: currentElement,
          detail: {
            currentElement: currentElement,
            newElement: newElement
          }
        });
      }
    });
    _classPrivateFieldSet2(_beforeNodeMorphed, this, beforeNodeMorphed || function () {
      return true;
    });
  });
  var MorphingFrameRenderer = /*#__PURE__*/function (_FrameRenderer) {
    function MorphingFrameRenderer() {
      _classCallCheck(this, MorphingFrameRenderer);
      return _callSuper(this, MorphingFrameRenderer, arguments);
    }
    _inherits(MorphingFrameRenderer, _FrameRenderer);
    return _createClass(MorphingFrameRenderer, [{
      key: "preservingPermanentElements",
      value: function () {
        var _preservingPermanentElements3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(callback) {
          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return callback();
              case 2:
                return _context10.abrupt("return", _context10.sent);
              case 3:
              case "end":
                return _context10.stop();
            }
          }, _callee10);
        }));
        function preservingPermanentElements(_x11) {
          return _preservingPermanentElements3.apply(this, arguments);
        }
        return preservingPermanentElements;
      }()
    }], [{
      key: "renderElement",
      value: function renderElement(currentElement, newElement) {
        dispatch("turbo:before-frame-morph", {
          target: currentElement,
          detail: {
            currentElement: currentElement,
            newElement: newElement
          }
        });
        morphChildren(currentElement, newElement);
      }
    }]);
  }(FrameRenderer);
  var ProgressBar = /*#__PURE__*/function () {
    function ProgressBar() {
      var _this14 = this;
      _classCallCheck(this, ProgressBar);
      _defineProperty(this, "hiding", false);
      _defineProperty(this, "value", 0);
      _defineProperty(this, "visible", false);
      _defineProperty(this, "trickle", function () {
        _this14.setValue(_this14.value + Math.random() / 100);
      });
      this.stylesheetElement = this.createStylesheetElement();
      this.progressElement = this.createProgressElement();
      this.installStylesheetElement();
      this.setValue(0);
    }
    return _createClass(ProgressBar, [{
      key: "show",
      value: function show() {
        if (!this.visible) {
          this.visible = true;
          this.installProgressElement();
          this.startTrickling();
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this15 = this;
        if (this.visible && !this.hiding) {
          this.hiding = true;
          this.fadeProgressElement(function () {
            _this15.uninstallProgressElement();
            _this15.stopTrickling();
            _this15.visible = false;
            _this15.hiding = false;
          });
        }
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        this.refresh();
      }

      // Private
    }, {
      key: "installStylesheetElement",
      value: function installStylesheetElement() {
        document.head.insertBefore(this.stylesheetElement, document.head.firstChild);
      }
    }, {
      key: "installProgressElement",
      value: function installProgressElement() {
        this.progressElement.style.width = "0";
        this.progressElement.style.opacity = "1";
        document.documentElement.insertBefore(this.progressElement, document.body);
        this.refresh();
      }
    }, {
      key: "fadeProgressElement",
      value: function fadeProgressElement(callback) {
        this.progressElement.style.opacity = "0";
        setTimeout(callback, ProgressBar.animationDuration * 1.5);
      }
    }, {
      key: "uninstallProgressElement",
      value: function uninstallProgressElement() {
        if (this.progressElement.parentNode) {
          document.documentElement.removeChild(this.progressElement);
        }
      }
    }, {
      key: "startTrickling",
      value: function startTrickling() {
        if (!this.trickleInterval) {
          this.trickleInterval = window.setInterval(this.trickle, ProgressBar.animationDuration);
        }
      }
    }, {
      key: "stopTrickling",
      value: function stopTrickling() {
        window.clearInterval(this.trickleInterval);
        delete this.trickleInterval;
      }
    }, {
      key: "refresh",
      value: function refresh() {
        var _this16 = this;
        requestAnimationFrame(function () {
          _this16.progressElement.style.width = "".concat(10 + _this16.value * 90, "%");
        });
      }
    }, {
      key: "createStylesheetElement",
      value: function createStylesheetElement() {
        var element = document.createElement("style");
        element.type = "text/css";
        element.textContent = ProgressBar.defaultCSS;
        var cspNonce = getCspNonce();
        if (cspNonce) {
          element.nonce = cspNonce;
        }
        return element;
      }
    }, {
      key: "createProgressElement",
      value: function createProgressElement() {
        var element = document.createElement("div");
        element.className = "turbo-progress-bar";
        return element;
      }
    }], [{
      key: "defaultCSS",
      get: /*ms*/

      function get() {
        return unindent(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      .turbo-progress-bar {\n        position: fixed;\n        display: block;\n        top: 0;\n        left: 0;\n        height: 3px;\n        background: #0076ff;\n        z-index: 2147483647;\n        transition:\n          width ", "ms ease-out,\n          opacity ", "ms ", "ms ease-in;\n        transform: translate3d(0, 0, 0);\n      }\n    "])), ProgressBar.animationDuration, ProgressBar.animationDuration / 2, ProgressBar.animationDuration / 2);
      }
    }]);
  }();
  _defineProperty(ProgressBar, "animationDuration", 300);
  var HeadSnapshot = /*#__PURE__*/function (_Snapshot) {
    function HeadSnapshot() {
      var _this17;
      _classCallCheck(this, HeadSnapshot);
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      _this17 = _callSuper(this, HeadSnapshot, [].concat(args));
      _defineProperty(_this17, "detailsByOuterHTML", _this17.children.filter(function (element) {
        return !elementIsNoscript(element);
      }).map(function (element) {
        return elementWithoutNonce(element);
      }).reduce(function (result, element) {
        var outerHTML = element.outerHTML;
        var details = outerHTML in result ? result[outerHTML] : {
          type: elementType(element),
          tracked: elementIsTracked(element),
          elements: []
        };
        return _objectSpread2(_objectSpread2({}, result), {}, _defineProperty({}, outerHTML, _objectSpread2(_objectSpread2({}, details), {}, {
          elements: [].concat(_toConsumableArray(details.elements), [element])
        })));
      }, {}));
      return _this17;
    }
    _inherits(HeadSnapshot, _Snapshot);
    return _createClass(HeadSnapshot, [{
      key: "trackedElementSignature",
      get: function get() {
        var _this18 = this;
        return Object.keys(this.detailsByOuterHTML).filter(function (outerHTML) {
          return _this18.detailsByOuterHTML[outerHTML].tracked;
        }).join("");
      }
    }, {
      key: "getScriptElementsNotInSnapshot",
      value: function getScriptElementsNotInSnapshot(snapshot) {
        return this.getElementsMatchingTypeNotInSnapshot("script", snapshot);
      }
    }, {
      key: "getStylesheetElementsNotInSnapshot",
      value: function getStylesheetElementsNotInSnapshot(snapshot) {
        return this.getElementsMatchingTypeNotInSnapshot("stylesheet", snapshot);
      }
    }, {
      key: "getElementsMatchingTypeNotInSnapshot",
      value: function getElementsMatchingTypeNotInSnapshot(matchedType, snapshot) {
        var _this19 = this;
        return Object.keys(this.detailsByOuterHTML).filter(function (outerHTML) {
          return !(outerHTML in snapshot.detailsByOuterHTML);
        }).map(function (outerHTML) {
          return _this19.detailsByOuterHTML[outerHTML];
        }).filter(function (_ref5) {
          var type = _ref5.type;
          return type == matchedType;
        }).map(function (_ref6) {
          var _ref6$elements = _slicedToArray(_ref6.elements, 1),
            element = _ref6$elements[0];
          return element;
        });
      }
    }, {
      key: "provisionalElements",
      get: function get() {
        var _this20 = this;
        return Object.keys(this.detailsByOuterHTML).reduce(function (result, outerHTML) {
          var _this20$detailsByOute = _this20.detailsByOuterHTML[outerHTML],
            type = _this20$detailsByOute.type,
            tracked = _this20$detailsByOute.tracked,
            elements = _this20$detailsByOute.elements;
          if (type == null && !tracked) {
            return [].concat(_toConsumableArray(result), _toConsumableArray(elements));
          } else if (elements.length > 1) {
            return [].concat(_toConsumableArray(result), _toConsumableArray(elements.slice(1)));
          } else {
            return result;
          }
        }, []);
      }
    }, {
      key: "getMetaValue",
      value: function getMetaValue(name) {
        var element = this.findMetaElementByName(name);
        return element ? element.getAttribute("content") : null;
      }
    }, {
      key: "findMetaElementByName",
      value: function findMetaElementByName(name) {
        var _this21 = this;
        return Object.keys(this.detailsByOuterHTML).reduce(function (result, outerHTML) {
          var _this21$detailsByOute = _slicedToArray(_this21.detailsByOuterHTML[outerHTML].elements, 1),
            element = _this21$detailsByOute[0];
          return elementIsMetaElementWithName(element, name) ? element : result;
        }, undefined | undefined);
      }
    }]);
  }(Snapshot);
  function elementType(element) {
    if (elementIsScript(element)) {
      return "script";
    } else if (elementIsStylesheet(element)) {
      return "stylesheet";
    }
  }
  function elementIsTracked(element) {
    return element.getAttribute("data-turbo-track") == "reload";
  }
  function elementIsScript(element) {
    var tagName = element.localName;
    return tagName == "script";
  }
  function elementIsNoscript(element) {
    var tagName = element.localName;
    return tagName == "noscript";
  }
  function elementIsStylesheet(element) {
    var tagName = element.localName;
    return tagName == "style" || tagName == "link" && element.getAttribute("rel") == "stylesheet";
  }
  function elementIsMetaElementWithName(element, name) {
    var tagName = element.localName;
    return tagName == "meta" && element.getAttribute("name") == name;
  }
  function elementWithoutNonce(element) {
    if (element.hasAttribute("nonce")) {
      element.setAttribute("nonce", "");
    }
    return element;
  }
  var PageSnapshot = /*#__PURE__*/function (_Snapshot2) {
    function PageSnapshot(documentElement, body, headSnapshot) {
      var _this22;
      _classCallCheck(this, PageSnapshot);
      _this22 = _callSuper(this, PageSnapshot, [body]);
      _this22.documentElement = documentElement;
      _this22.headSnapshot = headSnapshot;
      return _this22;
    }
    _inherits(PageSnapshot, _Snapshot2);
    return _createClass(PageSnapshot, [{
      key: "clone",
      value: function clone() {
        var clonedElement = this.element.cloneNode(true);
        var selectElements = this.element.querySelectorAll("select");
        var clonedSelectElements = clonedElement.querySelectorAll("select");
        var _iterator16 = _createForOfIteratorHelper(selectElements.entries()),
          _step16;
        try {
          for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
            var _step16$value = _slicedToArray(_step16.value, 2),
              index = _step16$value[0],
              source = _step16$value[1];
            var _clone = clonedSelectElements[index];
            var _iterator18 = _createForOfIteratorHelper(_clone.selectedOptions),
              _step18;
            try {
              for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
                var option = _step18.value;
                option.selected = false;
              }
            } catch (err) {
              _iterator18.e(err);
            } finally {
              _iterator18.f();
            }
            var _iterator19 = _createForOfIteratorHelper(source.selectedOptions),
              _step19;
            try {
              for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
                var _option = _step19.value;
                _clone.options[_option.index].selected = true;
              }
            } catch (err) {
              _iterator19.e(err);
            } finally {
              _iterator19.f();
            }
          }
        } catch (err) {
          _iterator16.e(err);
        } finally {
          _iterator16.f();
        }
        var _iterator17 = _createForOfIteratorHelper(clonedElement.querySelectorAll('input[type="password"]')),
          _step17;
        try {
          for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
            var clonedPasswordInput = _step17.value;
            clonedPasswordInput.value = "";
          }
        } catch (err) {
          _iterator17.e(err);
        } finally {
          _iterator17.f();
        }
        return new PageSnapshot(this.documentElement, clonedElement, this.headSnapshot);
      }
    }, {
      key: "lang",
      get: function get() {
        return this.documentElement.getAttribute("lang");
      }
    }, {
      key: "headElement",
      get: function get() {
        return this.headSnapshot.element;
      }
    }, {
      key: "rootLocation",
      get: function get() {
        var _this$getSetting;
        var root = (_this$getSetting = this.getSetting("root")) !== null && _this$getSetting !== void 0 ? _this$getSetting : "/";
        return expandURL(root);
      }
    }, {
      key: "cacheControlValue",
      get: function get() {
        return this.getSetting("cache-control");
      }
    }, {
      key: "isPreviewable",
      get: function get() {
        return this.cacheControlValue != "no-preview";
      }
    }, {
      key: "isCacheable",
      get: function get() {
        return this.cacheControlValue != "no-cache";
      }
    }, {
      key: "isVisitable",
      get: function get() {
        return this.getSetting("visit-control") != "reload";
      }
    }, {
      key: "prefersViewTransitions",
      get: function get() {
        return this.headSnapshot.getMetaValue("view-transition") === "same-origin";
      }
    }, {
      key: "shouldMorphPage",
      get: function get() {
        return this.getSetting("refresh-method") === "morph";
      }
    }, {
      key: "shouldPreserveScrollPosition",
      get: function get() {
        return this.getSetting("refresh-scroll") === "preserve";
      }

      // Private
    }, {
      key: "getSetting",
      value: function getSetting(name) {
        return this.headSnapshot.getMetaValue("turbo-".concat(name));
      }
    }], [{
      key: "fromHTMLString",
      value: function fromHTMLString() {
        var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        return this.fromDocument(parseHTMLDocument(html));
      }
    }, {
      key: "fromElement",
      value: function fromElement(element) {
        return this.fromDocument(element.ownerDocument);
      }
    }, {
      key: "fromDocument",
      value: function fromDocument(_ref7) {
        var documentElement = _ref7.documentElement,
          body = _ref7.body,
          head = _ref7.head;
        return new this(documentElement, body, new HeadSnapshot(head));
      }
    }]);
  }(Snapshot);
  var _viewTransitionStarted = /*#__PURE__*/new WeakMap();
  var _lastOperation = /*#__PURE__*/new WeakMap();
  var ViewTransitioner = /*#__PURE__*/function () {
    function ViewTransitioner() {
      _classCallCheck(this, ViewTransitioner);
      _classPrivateFieldInitSpec(this, _viewTransitionStarted, false);
      _classPrivateFieldInitSpec(this, _lastOperation, Promise.resolve());
    }
    return _createClass(ViewTransitioner, [{
      key: "renderChange",
      value: function renderChange(useViewTransition, render) {
        if (useViewTransition && this.viewTransitionsAvailable && !_classPrivateFieldGet2(_viewTransitionStarted, this)) {
          _classPrivateFieldSet2(_viewTransitionStarted, this, true);
          _classPrivateFieldSet2(_lastOperation, this, _classPrivateFieldGet2(_lastOperation, this).then(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
            return _regeneratorRuntime().wrap(function _callee11$(_context11) {
              while (1) switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.next = 2;
                  return document.startViewTransition(render).finished;
                case 2:
                case "end":
                  return _context11.stop();
              }
            }, _callee11);
          }))));
        } else {
          _classPrivateFieldSet2(_lastOperation, this, _classPrivateFieldGet2(_lastOperation, this).then(render));
        }
        return _classPrivateFieldGet2(_lastOperation, this);
      }
    }, {
      key: "viewTransitionsAvailable",
      get: function get() {
        return document.startViewTransition;
      }
    }]);
  }();
  var defaultOptions = {
    action: "advance",
    historyChanged: false,
    visitCachedSnapshot: function visitCachedSnapshot() {},
    willRender: true,
    updateHistory: true,
    shouldCacheSnapshot: true,
    acceptsStreamResponse: false
  };
  var TimingMetric = {
    visitStart: "visitStart",
    requestStart: "requestStart",
    requestEnd: "requestEnd",
    visitEnd: "visitEnd"
  };
  var VisitState = {
    initialized: "initialized",
    started: "started",
    canceled: "canceled",
    failed: "failed",
    completed: "completed"
  };
  var SystemStatusCode = {
    networkFailure: 0,
    timeoutFailure: -1,
    contentTypeMismatch: -2
  };
  var Direction = {
    advance: "forward",
    restore: "back",
    replace: "none"
  };
  var Visit = /*#__PURE__*/function () {
    function Visit(delegate, location, restorationIdentifier) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      _classCallCheck(this, Visit);
      _defineProperty(this, "identifier", uuid());
      // Required by turbo-ios
      _defineProperty(this, "timingMetrics", {});
      _defineProperty(this, "followedRedirect", false);
      _defineProperty(this, "historyChanged", false);
      _defineProperty(this, "scrolled", false);
      _defineProperty(this, "shouldCacheSnapshot", true);
      _defineProperty(this, "acceptsStreamResponse", false);
      _defineProperty(this, "snapshotCached", false);
      _defineProperty(this, "state", VisitState.initialized);
      _defineProperty(this, "viewTransitioner", new ViewTransitioner());
      this.delegate = delegate;
      this.location = location;
      this.restorationIdentifier = restorationIdentifier || uuid();
      var _defaultOptions$optio = _objectSpread2(_objectSpread2({}, defaultOptions), options),
        action = _defaultOptions$optio.action,
        historyChanged = _defaultOptions$optio.historyChanged,
        referrer = _defaultOptions$optio.referrer,
        snapshot = _defaultOptions$optio.snapshot,
        snapshotHTML = _defaultOptions$optio.snapshotHTML,
        response = _defaultOptions$optio.response,
        visitCachedSnapshot = _defaultOptions$optio.visitCachedSnapshot,
        willRender = _defaultOptions$optio.willRender,
        updateHistory = _defaultOptions$optio.updateHistory,
        shouldCacheSnapshot = _defaultOptions$optio.shouldCacheSnapshot,
        acceptsStreamResponse = _defaultOptions$optio.acceptsStreamResponse,
        direction = _defaultOptions$optio.direction;
      this.action = action;
      this.historyChanged = historyChanged;
      this.referrer = referrer;
      this.snapshot = snapshot;
      this.snapshotHTML = snapshotHTML;
      this.response = response;
      this.isSamePage = this.delegate.locationWithActionIsSamePage(this.location, this.action);
      this.isPageRefresh = this.view.isPageRefresh(this);
      this.visitCachedSnapshot = visitCachedSnapshot;
      this.willRender = willRender;
      this.updateHistory = updateHistory;
      this.scrolled = !willRender;
      this.shouldCacheSnapshot = shouldCacheSnapshot;
      this.acceptsStreamResponse = acceptsStreamResponse;
      this.direction = direction || Direction[action];
    }
    return _createClass(Visit, [{
      key: "adapter",
      get: function get() {
        return this.delegate.adapter;
      }
    }, {
      key: "view",
      get: function get() {
        return this.delegate.view;
      }
    }, {
      key: "history",
      get: function get() {
        return this.delegate.history;
      }
    }, {
      key: "restorationData",
      get: function get() {
        return this.history.getRestorationDataForIdentifier(this.restorationIdentifier);
      }
    }, {
      key: "silent",
      get: function get() {
        return this.isSamePage;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.state == VisitState.initialized) {
          this.recordTimingMetric(TimingMetric.visitStart);
          this.state = VisitState.started;
          this.adapter.visitStarted(this);
          this.delegate.visitStarted(this);
        }
      }
    }, {
      key: "cancel",
      value: function cancel() {
        if (this.state == VisitState.started) {
          if (this.request) {
            this.request.cancel();
          }
          this.cancelRender();
          this.state = VisitState.canceled;
        }
      }
    }, {
      key: "complete",
      value: function complete() {
        if (this.state == VisitState.started) {
          this.recordTimingMetric(TimingMetric.visitEnd);
          this.adapter.visitCompleted(this);
          this.state = VisitState.completed;
          this.followRedirect();
          if (!this.followedRedirect) {
            this.delegate.visitCompleted(this);
          }
        }
      }
    }, {
      key: "fail",
      value: function fail() {
        if (this.state == VisitState.started) {
          this.state = VisitState.failed;
          this.adapter.visitFailed(this);
          this.delegate.visitCompleted(this);
        }
      }
    }, {
      key: "changeHistory",
      value: function changeHistory() {
        if (!this.historyChanged && this.updateHistory) {
          var _this$referrer;
          var actionForHistory = this.location.href === ((_this$referrer = this.referrer) === null || _this$referrer === void 0 ? void 0 : _this$referrer.href) ? "replace" : this.action;
          var method = getHistoryMethodForAction(actionForHistory);
          this.history.update(method, this.location, this.restorationIdentifier);
          this.historyChanged = true;
        }
      }
    }, {
      key: "issueRequest",
      value: function issueRequest() {
        if (this.hasPreloadedResponse()) {
          this.simulateRequest();
        } else if (this.shouldIssueRequest() && !this.request) {
          this.request = new FetchRequest(this, FetchMethod.get, this.location);
          this.request.perform();
        }
      }
    }, {
      key: "simulateRequest",
      value: function simulateRequest() {
        if (this.response) {
          this.startRequest();
          this.recordResponse();
          this.finishRequest();
        }
      }
    }, {
      key: "startRequest",
      value: function startRequest() {
        this.recordTimingMetric(TimingMetric.requestStart);
        this.adapter.visitRequestStarted(this);
      }
    }, {
      key: "recordResponse",
      value: function recordResponse() {
        var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.response;
        this.response = response;
        if (response) {
          var statusCode = response.statusCode;
          if (isSuccessful(statusCode)) {
            this.adapter.visitRequestCompleted(this);
          } else {
            this.adapter.visitRequestFailedWithStatusCode(this, statusCode);
          }
        }
      }
    }, {
      key: "finishRequest",
      value: function finishRequest() {
        this.recordTimingMetric(TimingMetric.requestEnd);
        this.adapter.visitRequestFinished(this);
      }
    }, {
      key: "loadResponse",
      value: function loadResponse() {
        var _this23 = this;
        if (this.response) {
          var _this$response = this.response,
            statusCode = _this$response.statusCode,
            responseHTML = _this$response.responseHTML;
          this.render(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
            var snapshot;
            return _regeneratorRuntime().wrap(function _callee12$(_context12) {
              while (1) switch (_context12.prev = _context12.next) {
                case 0:
                  if (_this23.shouldCacheSnapshot) _this23.cacheSnapshot();
                  if (!_this23.view.renderPromise) {
                    _context12.next = 4;
                    break;
                  }
                  _context12.next = 4;
                  return _this23.view.renderPromise;
                case 4:
                  if (!(isSuccessful(statusCode) && responseHTML != null)) {
                    _context12.next = 12;
                    break;
                  }
                  snapshot = PageSnapshot.fromHTMLString(responseHTML);
                  _context12.next = 8;
                  return _this23.renderPageSnapshot(snapshot, false);
                case 8:
                  _this23.adapter.visitRendered(_this23);
                  _this23.complete();
                  _context12.next = 16;
                  break;
                case 12:
                  _context12.next = 14;
                  return _this23.view.renderError(PageSnapshot.fromHTMLString(responseHTML), _this23);
                case 14:
                  _this23.adapter.visitRendered(_this23);
                  _this23.fail();
                case 16:
                case "end":
                  return _context12.stop();
              }
            }, _callee12);
          })));
        }
      }
    }, {
      key: "getCachedSnapshot",
      value: function getCachedSnapshot() {
        var snapshot = this.view.getCachedSnapshotForLocation(this.location) || this.getPreloadedSnapshot();
        if (snapshot && (!getAnchor(this.location) || snapshot.hasAnchor(getAnchor(this.location)))) {
          if (this.action == "restore" || snapshot.isPreviewable) {
            return snapshot;
          }
        }
      }
    }, {
      key: "getPreloadedSnapshot",
      value: function getPreloadedSnapshot() {
        if (this.snapshotHTML) {
          return PageSnapshot.fromHTMLString(this.snapshotHTML);
        }
      }
    }, {
      key: "hasCachedSnapshot",
      value: function hasCachedSnapshot() {
        return this.getCachedSnapshot() != null;
      }
    }, {
      key: "loadCachedSnapshot",
      value: function loadCachedSnapshot() {
        var _this24 = this;
        var snapshot = this.getCachedSnapshot();
        if (snapshot) {
          var isPreview = this.shouldIssueRequest();
          this.render(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
            return _regeneratorRuntime().wrap(function _callee13$(_context13) {
              while (1) switch (_context13.prev = _context13.next) {
                case 0:
                  _this24.cacheSnapshot();
                  if (!(_this24.isSamePage || _this24.isPageRefresh)) {
                    _context13.next = 5;
                    break;
                  }
                  _this24.adapter.visitRendered(_this24);
                  _context13.next = 12;
                  break;
                case 5:
                  if (!_this24.view.renderPromise) {
                    _context13.next = 8;
                    break;
                  }
                  _context13.next = 8;
                  return _this24.view.renderPromise;
                case 8:
                  _context13.next = 10;
                  return _this24.renderPageSnapshot(snapshot, isPreview);
                case 10:
                  _this24.adapter.visitRendered(_this24);
                  if (!isPreview) {
                    _this24.complete();
                  }
                case 12:
                case "end":
                  return _context13.stop();
              }
            }, _callee13);
          })));
        }
      }
    }, {
      key: "followRedirect",
      value: function followRedirect() {
        var _this$response2;
        if (this.redirectedToLocation && !this.followedRedirect && (_this$response2 = this.response) !== null && _this$response2 !== void 0 && _this$response2.redirected) {
          this.adapter.visitProposedToLocation(this.redirectedToLocation, {
            action: "replace",
            response: this.response,
            shouldCacheSnapshot: false,
            willRender: false
          });
          this.followedRedirect = true;
        }
      }
    }, {
      key: "goToSamePageAnchor",
      value: function goToSamePageAnchor() {
        var _this25 = this;
        if (this.isSamePage) {
          this.render(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
            return _regeneratorRuntime().wrap(function _callee14$(_context14) {
              while (1) switch (_context14.prev = _context14.next) {
                case 0:
                  _this25.cacheSnapshot();
                  _this25.performScroll();
                  _this25.changeHistory();
                  _this25.adapter.visitRendered(_this25);
                case 4:
                case "end":
                  return _context14.stop();
              }
            }, _callee14);
          })));
        }
      }

      // Fetch request delegate
    }, {
      key: "prepareRequest",
      value: function prepareRequest(request) {
        if (this.acceptsStreamResponse) {
          request.acceptResponseType(StreamMessage.contentType);
        }
      }
    }, {
      key: "requestStarted",
      value: function requestStarted() {
        this.startRequest();
      }
    }, {
      key: "requestPreventedHandlingResponse",
      value: function requestPreventedHandlingResponse(_request, _response) {}
    }, {
      key: "requestSucceededWithResponse",
      value: function () {
        var _requestSucceededWithResponse = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(request, response) {
          var responseHTML, redirected, statusCode;
          return _regeneratorRuntime().wrap(function _callee15$(_context15) {
            while (1) switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return response.responseHTML;
              case 2:
                responseHTML = _context15.sent;
                redirected = response.redirected, statusCode = response.statusCode;
                if (responseHTML == undefined) {
                  this.recordResponse({
                    statusCode: SystemStatusCode.contentTypeMismatch,
                    redirected: redirected
                  });
                } else {
                  this.redirectedToLocation = response.redirected ? response.location : undefined;
                  this.recordResponse({
                    statusCode: statusCode,
                    responseHTML: responseHTML,
                    redirected: redirected
                  });
                }
              case 5:
              case "end":
                return _context15.stop();
            }
          }, _callee15, this);
        }));
        function requestSucceededWithResponse(_x12, _x13) {
          return _requestSucceededWithResponse.apply(this, arguments);
        }
        return requestSucceededWithResponse;
      }()
    }, {
      key: "requestFailedWithResponse",
      value: function () {
        var _requestFailedWithResponse = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(request, response) {
          var responseHTML, redirected, statusCode;
          return _regeneratorRuntime().wrap(function _callee16$(_context16) {
            while (1) switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return response.responseHTML;
              case 2:
                responseHTML = _context16.sent;
                redirected = response.redirected, statusCode = response.statusCode;
                if (responseHTML == undefined) {
                  this.recordResponse({
                    statusCode: SystemStatusCode.contentTypeMismatch,
                    redirected: redirected
                  });
                } else {
                  this.recordResponse({
                    statusCode: statusCode,
                    responseHTML: responseHTML,
                    redirected: redirected
                  });
                }
              case 5:
              case "end":
                return _context16.stop();
            }
          }, _callee16, this);
        }));
        function requestFailedWithResponse(_x14, _x15) {
          return _requestFailedWithResponse.apply(this, arguments);
        }
        return requestFailedWithResponse;
      }()
    }, {
      key: "requestErrored",
      value: function requestErrored(_request, _error) {
        this.recordResponse({
          statusCode: SystemStatusCode.networkFailure,
          redirected: false
        });
      }
    }, {
      key: "requestFinished",
      value: function requestFinished() {
        this.finishRequest();
      }

      // Scrolling
    }, {
      key: "performScroll",
      value: function performScroll() {
        if (!this.scrolled && !this.view.forceReloaded && !this.view.shouldPreserveScrollPosition(this)) {
          if (this.action == "restore") {
            this.scrollToRestoredPosition() || this.scrollToAnchor() || this.view.scrollToTop();
          } else {
            this.scrollToAnchor() || this.view.scrollToTop();
          }
          if (this.isSamePage) {
            this.delegate.visitScrolledToSamePageLocation(this.view.lastRenderedLocation, this.location);
          }
          this.scrolled = true;
        }
      }
    }, {
      key: "scrollToRestoredPosition",
      value: function scrollToRestoredPosition() {
        var scrollPosition = this.restorationData.scrollPosition;
        if (scrollPosition) {
          this.view.scrollToPosition(scrollPosition);
          return true;
        }
      }
    }, {
      key: "scrollToAnchor",
      value: function scrollToAnchor() {
        var anchor = getAnchor(this.location);
        if (anchor != null) {
          this.view.scrollToAnchor(anchor);
          return true;
        }
      }

      // Instrumentation
    }, {
      key: "recordTimingMetric",
      value: function recordTimingMetric(metric) {
        this.timingMetrics[metric] = new Date().getTime();
      }
    }, {
      key: "getTimingMetrics",
      value: function getTimingMetrics() {
        return _objectSpread2({}, this.timingMetrics);
      }

      // Private
    }, {
      key: "getHistoryMethodForAction",
      value: function getHistoryMethodForAction(action) {
        switch (action) {
          case "replace":
            return history.replaceState;
          case "advance":
          case "restore":
            return history.pushState;
        }
      }
    }, {
      key: "hasPreloadedResponse",
      value: function hasPreloadedResponse() {
        return _typeof(this.response) == "object";
      }
    }, {
      key: "shouldIssueRequest",
      value: function shouldIssueRequest() {
        if (this.isSamePage) {
          return false;
        } else if (this.action == "restore") {
          return !this.hasCachedSnapshot();
        } else {
          return this.willRender;
        }
      }
    }, {
      key: "cacheSnapshot",
      value: function cacheSnapshot() {
        var _this26 = this;
        if (!this.snapshotCached) {
          this.view.cacheSnapshot(this.snapshot).then(function (snapshot) {
            return snapshot && _this26.visitCachedSnapshot(snapshot);
          });
          this.snapshotCached = true;
        }
      }
    }, {
      key: "render",
      value: function () {
        var _render3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(callback) {
          var _this27 = this;
          return _regeneratorRuntime().wrap(function _callee17$(_context17) {
            while (1) switch (_context17.prev = _context17.next) {
              case 0:
                this.cancelRender();
                _context17.next = 3;
                return new Promise(function (resolve) {
                  _this27.frame = document.visibilityState === "hidden" ? setTimeout(function () {
                    return resolve();
                  }, 0) : requestAnimationFrame(function () {
                    return resolve();
                  });
                });
              case 3:
                _context17.next = 5;
                return callback();
              case 5:
                delete this.frame;
              case 6:
              case "end":
                return _context17.stop();
            }
          }, _callee17, this);
        }));
        function render(_x16) {
          return _render3.apply(this, arguments);
        }
        return render;
      }()
    }, {
      key: "renderPageSnapshot",
      value: function () {
        var _renderPageSnapshot = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(snapshot, isPreview) {
          var _this28 = this;
          return _regeneratorRuntime().wrap(function _callee19$(_context19) {
            while (1) switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return this.viewTransitioner.renderChange(this.view.shouldTransitionTo(snapshot), /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
                  return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                    while (1) switch (_context18.prev = _context18.next) {
                      case 0:
                        _context18.next = 2;
                        return _this28.view.renderPage(snapshot, isPreview, _this28.willRender, _this28);
                      case 2:
                        _this28.performScroll();
                      case 3:
                      case "end":
                        return _context18.stop();
                    }
                  }, _callee18);
                })));
              case 2:
              case "end":
                return _context19.stop();
            }
          }, _callee19, this);
        }));
        function renderPageSnapshot(_x17, _x18) {
          return _renderPageSnapshot.apply(this, arguments);
        }
        return renderPageSnapshot;
      }()
    }, {
      key: "cancelRender",
      value: function cancelRender() {
        if (this.frame) {
          cancelAnimationFrame(this.frame);
          delete this.frame;
        }
      }
    }]);
  }();
  function isSuccessful(statusCode) {
    return statusCode >= 200 && statusCode < 300;
  }
  var BrowserAdapter = /*#__PURE__*/function () {
    function BrowserAdapter(session) {
      var _this29 = this;
      _classCallCheck(this, BrowserAdapter);
      _defineProperty(this, "progressBar", new ProgressBar());
      _defineProperty(this, "showProgressBar", function () {
        _this29.progressBar.show();
      });
      this.session = session;
    }
    return _createClass(BrowserAdapter, [{
      key: "visitProposedToLocation",
      value: function visitProposedToLocation(location, options) {
        if (locationIsVisitable(location, this.navigator.rootLocation)) {
          this.navigator.startVisit(location, (options === null || options === void 0 ? void 0 : options.restorationIdentifier) || uuid(), options);
        } else {
          window.location.href = location.toString();
        }
      }
    }, {
      key: "visitStarted",
      value: function visitStarted(visit) {
        this.location = visit.location;
        visit.loadCachedSnapshot();
        visit.issueRequest();
        visit.goToSamePageAnchor();
      }
    }, {
      key: "visitRequestStarted",
      value: function visitRequestStarted(visit) {
        this.progressBar.setValue(0);
        if (visit.hasCachedSnapshot() || visit.action != "restore") {
          this.showVisitProgressBarAfterDelay();
        } else {
          this.showProgressBar();
        }
      }
    }, {
      key: "visitRequestCompleted",
      value: function visitRequestCompleted(visit) {
        visit.loadResponse();
      }
    }, {
      key: "visitRequestFailedWithStatusCode",
      value: function visitRequestFailedWithStatusCode(visit, statusCode) {
        switch (statusCode) {
          case SystemStatusCode.networkFailure:
          case SystemStatusCode.timeoutFailure:
          case SystemStatusCode.contentTypeMismatch:
            return this.reload({
              reason: "request_failed",
              context: {
                statusCode: statusCode
              }
            });
          default:
            return visit.loadResponse();
        }
      }
    }, {
      key: "visitRequestFinished",
      value: function visitRequestFinished(_visit) {}
    }, {
      key: "visitCompleted",
      value: function visitCompleted(_visit) {
        this.progressBar.setValue(1);
        this.hideVisitProgressBar();
      }
    }, {
      key: "pageInvalidated",
      value: function pageInvalidated(reason) {
        this.reload(reason);
      }
    }, {
      key: "visitFailed",
      value: function visitFailed(_visit) {
        this.progressBar.setValue(1);
        this.hideVisitProgressBar();
      }
    }, {
      key: "visitRendered",
      value: function visitRendered(_visit) {}

      // Form Submission Delegate
    }, {
      key: "formSubmissionStarted",
      value: function formSubmissionStarted(_formSubmission) {
        this.progressBar.setValue(0);
        this.showFormProgressBarAfterDelay();
      }
    }, {
      key: "formSubmissionFinished",
      value: function formSubmissionFinished(_formSubmission) {
        this.progressBar.setValue(1);
        this.hideFormProgressBar();
      }

      // Private
    }, {
      key: "showVisitProgressBarAfterDelay",
      value: function showVisitProgressBarAfterDelay() {
        this.visitProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
      }
    }, {
      key: "hideVisitProgressBar",
      value: function hideVisitProgressBar() {
        this.progressBar.hide();
        if (this.visitProgressBarTimeout != null) {
          window.clearTimeout(this.visitProgressBarTimeout);
          delete this.visitProgressBarTimeout;
        }
      }
    }, {
      key: "showFormProgressBarAfterDelay",
      value: function showFormProgressBarAfterDelay() {
        if (this.formProgressBarTimeout == null) {
          this.formProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
        }
      }
    }, {
      key: "hideFormProgressBar",
      value: function hideFormProgressBar() {
        this.progressBar.hide();
        if (this.formProgressBarTimeout != null) {
          window.clearTimeout(this.formProgressBarTimeout);
          delete this.formProgressBarTimeout;
        }
      }
    }, {
      key: "reload",
      value: function reload(reason) {
        var _this$location;
        dispatch("turbo:reload", {
          detail: reason
        });
        window.location.href = ((_this$location = this.location) === null || _this$location === void 0 ? void 0 : _this$location.toString()) || window.location.href;
      }
    }, {
      key: "navigator",
      get: function get() {
        return this.session.navigator;
      }
    }]);
  }();
  var CacheObserver = /*#__PURE__*/function () {
    function CacheObserver() {
      var _this30 = this;
      _classCallCheck(this, CacheObserver);
      _defineProperty(this, "selector", "[data-turbo-temporary]");
      _defineProperty(this, "deprecatedSelector", "[data-turbo-cache=false]");
      _defineProperty(this, "started", false);
      _defineProperty(this, "removeTemporaryElements", function (_event) {
        var _iterator20 = _createForOfIteratorHelper(_this30.temporaryElements),
          _step20;
        try {
          for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
            var element = _step20.value;
            element.remove();
          }
        } catch (err) {
          _iterator20.e(err);
        } finally {
          _iterator20.f();
        }
      });
    }
    return _createClass(CacheObserver, [{
      key: "start",
      value: function start() {
        if (!this.started) {
          this.started = true;
          addEventListener("turbo:before-cache", this.removeTemporaryElements, false);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.started) {
          this.started = false;
          removeEventListener("turbo:before-cache", this.removeTemporaryElements, false);
        }
      }
    }, {
      key: "temporaryElements",
      get: function get() {
        return [].concat(_toConsumableArray(document.querySelectorAll(this.selector)), _toConsumableArray(this.temporaryElementsWithDeprecation));
      }
    }, {
      key: "temporaryElementsWithDeprecation",
      get: function get() {
        var elements = document.querySelectorAll(this.deprecatedSelector);
        if (elements.length) {
          console.warn("The ".concat(this.deprecatedSelector, " selector is deprecated and will be removed in a future version. Use ").concat(this.selector, " instead."));
        }
        return _toConsumableArray(elements);
      }
    }]);
  }();
  var _FrameRedirector_brand = /*#__PURE__*/new WeakSet();
  var FrameRedirector = /*#__PURE__*/function () {
    function FrameRedirector(session, _element) {
      _classCallCheck(this, FrameRedirector);
      _classPrivateMethodInitSpec(this, _FrameRedirector_brand);
      this.session = session;
      this.element = _element;
      this.linkInterceptor = new LinkInterceptor(this, _element);
      this.formSubmitObserver = new FormSubmitObserver(this, _element);
    }
    return _createClass(FrameRedirector, [{
      key: "start",
      value: function start() {
        this.linkInterceptor.start();
        this.formSubmitObserver.start();
      }
    }, {
      key: "stop",
      value: function stop() {
        this.linkInterceptor.stop();
        this.formSubmitObserver.stop();
      }

      // Link interceptor delegate
    }, {
      key: "shouldInterceptLinkClick",
      value: function shouldInterceptLinkClick(element, _location, _event) {
        return _assertClassBrand(_FrameRedirector_brand, this, _shouldRedirect).call(this, element);
      }
    }, {
      key: "linkClickIntercepted",
      value: function linkClickIntercepted(element, url, event) {
        var frame = _assertClassBrand(_FrameRedirector_brand, this, _findFrameElement).call(this, element);
        if (frame) {
          frame.delegate.linkClickIntercepted(element, url, event);
        }
      }

      // Form submit observer delegate
    }, {
      key: "willSubmitForm",
      value: function willSubmitForm(element, submitter) {
        return element.closest("turbo-frame") == null && _assertClassBrand(_FrameRedirector_brand, this, _shouldSubmit).call(this, element, submitter) && _assertClassBrand(_FrameRedirector_brand, this, _shouldRedirect).call(this, element, submitter);
      }
    }, {
      key: "formSubmitted",
      value: function formSubmitted(element, submitter) {
        var frame = _assertClassBrand(_FrameRedirector_brand, this, _findFrameElement).call(this, element, submitter);
        if (frame) {
          frame.delegate.formSubmitted(element, submitter);
        }
      }
    }]);
  }();
  function _shouldSubmit(form, submitter) {
    var _meta$content2;
    var action = getAction$1(form, submitter);
    var meta = this.element.ownerDocument.querySelector("meta[name=\"turbo-root\"]");
    var rootLocation = expandURL((_meta$content2 = meta === null || meta === void 0 ? void 0 : meta.content) !== null && _meta$content2 !== void 0 ? _meta$content2 : "/");
    return _assertClassBrand(_FrameRedirector_brand, this, _shouldRedirect).call(this, form, submitter) && locationIsVisitable(action, rootLocation);
  }
  function _shouldRedirect(element, submitter) {
    var isNavigatable = element instanceof HTMLFormElement ? this.session.submissionIsNavigatable(element, submitter) : this.session.elementIsNavigatable(element);
    if (isNavigatable) {
      var frame = _assertClassBrand(_FrameRedirector_brand, this, _findFrameElement).call(this, element, submitter);
      return frame ? frame != element.closest("turbo-frame") : false;
    } else {
      return false;
    }
  }
  function _findFrameElement(element, submitter) {
    var id = (submitter === null || submitter === void 0 ? void 0 : submitter.getAttribute("data-turbo-frame")) || element.getAttribute("data-turbo-frame");
    if (id && id != "_top") {
      var frame = this.element.querySelector("#".concat(id, ":not([disabled])"));
      if (frame instanceof FrameElement) {
        return frame;
      }
    }
  }
  var History = /*#__PURE__*/function () {
    function History(delegate) {
      var _this31 = this;
      _classCallCheck(this, History);
      _defineProperty(this, "location", void 0);
      _defineProperty(this, "restorationIdentifier", uuid());
      _defineProperty(this, "restorationData", {});
      _defineProperty(this, "started", false);
      _defineProperty(this, "pageLoaded", false);
      _defineProperty(this, "currentIndex", 0);
      // Event handlers
      _defineProperty(this, "onPopState", function (event) {
        if (_this31.shouldHandlePopState()) {
          var _ref13 = event.state || {},
            turbo = _ref13.turbo;
          if (turbo) {
            _this31.location = new URL(window.location.href);
            var restorationIdentifier = turbo.restorationIdentifier,
              restorationIndex = turbo.restorationIndex;
            _this31.restorationIdentifier = restorationIdentifier;
            var direction = restorationIndex > _this31.currentIndex ? "forward" : "back";
            _this31.delegate.historyPoppedToLocationWithRestorationIdentifierAndDirection(_this31.location, restorationIdentifier, direction);
            _this31.currentIndex = restorationIndex;
          }
        }
      });
      _defineProperty(this, "onPageLoad", /*#__PURE__*/function () {
        var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(_event) {
          return _regeneratorRuntime().wrap(function _callee20$(_context20) {
            while (1) switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return nextMicrotask();
              case 2:
                _this31.pageLoaded = true;
              case 3:
              case "end":
                return _context20.stop();
            }
          }, _callee20);
        }));
        return function (_x19) {
          return _ref14.apply(this, arguments);
        };
      }());
      this.delegate = delegate;
    }
    return _createClass(History, [{
      key: "start",
      value: function start() {
        if (!this.started) {
          var _history$state;
          addEventListener("popstate", this.onPopState, false);
          addEventListener("load", this.onPageLoad, false);
          this.currentIndex = ((_history$state = history.state) === null || _history$state === void 0 || (_history$state = _history$state.turbo) === null || _history$state === void 0 ? void 0 : _history$state.restorationIndex) || 0;
          this.started = true;
          this.replace(new URL(window.location.href));
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.started) {
          removeEventListener("popstate", this.onPopState, false);
          removeEventListener("load", this.onPageLoad, false);
          this.started = false;
        }
      }
    }, {
      key: "push",
      value: function push(location, restorationIdentifier) {
        this.update(history.pushState, location, restorationIdentifier);
      }
    }, {
      key: "replace",
      value: function replace(location, restorationIdentifier) {
        this.update(history.replaceState, location, restorationIdentifier);
      }
    }, {
      key: "update",
      value: function update(method, location) {
        var restorationIdentifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : uuid();
        if (method === history.pushState) ++this.currentIndex;
        var state = {
          turbo: {
            restorationIdentifier: restorationIdentifier,
            restorationIndex: this.currentIndex
          }
        };
        method.call(history, state, "", location.href);
        this.location = location;
        this.restorationIdentifier = restorationIdentifier;
      }

      // Restoration data
    }, {
      key: "getRestorationDataForIdentifier",
      value: function getRestorationDataForIdentifier(restorationIdentifier) {
        return this.restorationData[restorationIdentifier] || {};
      }
    }, {
      key: "updateRestorationData",
      value: function updateRestorationData(additionalData) {
        var restorationIdentifier = this.restorationIdentifier;
        var restorationData = this.restorationData[restorationIdentifier];
        this.restorationData[restorationIdentifier] = _objectSpread2(_objectSpread2({}, restorationData), additionalData);
      }

      // Scroll restoration
    }, {
      key: "assumeControlOfScrollRestoration",
      value: function assumeControlOfScrollRestoration() {
        if (!this.previousScrollRestoration) {
          var _history$scrollRestor;
          this.previousScrollRestoration = (_history$scrollRestor = history.scrollRestoration) !== null && _history$scrollRestor !== void 0 ? _history$scrollRestor : "auto";
          history.scrollRestoration = "manual";
        }
      }
    }, {
      key: "relinquishControlOfScrollRestoration",
      value: function relinquishControlOfScrollRestoration() {
        if (this.previousScrollRestoration) {
          history.scrollRestoration = this.previousScrollRestoration;
          delete this.previousScrollRestoration;
        }
      }
    }, {
      key: "shouldHandlePopState",
      value:
      // Private

      function shouldHandlePopState() {
        // Safari dispatches a popstate event after window's load event, ignore it
        return this.pageIsLoaded();
      }
    }, {
      key: "pageIsLoaded",
      value: function pageIsLoaded() {
        return this.pageLoaded || document.readyState == "complete";
      }
    }]);
  }();
  var _prefetchedLink = /*#__PURE__*/new WeakMap();
  var _enable = /*#__PURE__*/new WeakMap();
  var _tryToPrefetchRequest = /*#__PURE__*/new WeakMap();
  var _cancelRequestIfObsolete = /*#__PURE__*/new WeakMap();
  var _cancelPrefetchRequest = /*#__PURE__*/new WeakMap();
  var _tryToUsePrefetchedRequest = /*#__PURE__*/new WeakMap();
  var _LinkPrefetchObserver_brand = /*#__PURE__*/new WeakSet();
  var LinkPrefetchObserver = /*#__PURE__*/function () {
    function LinkPrefetchObserver(delegate, eventTarget) {
      var _this33 = this;
      _classCallCheck(this, LinkPrefetchObserver);
      _classPrivateMethodInitSpec(this, _LinkPrefetchObserver_brand);
      _defineProperty(this, "started", false);
      _classPrivateFieldInitSpec(this, _prefetchedLink, null);
      _classPrivateFieldInitSpec(this, _enable, function () {
        _this33.eventTarget.addEventListener("mouseenter", _classPrivateFieldGet2(_tryToPrefetchRequest, _this33), {
          capture: true,
          passive: true
        });
        _this33.eventTarget.addEventListener("mouseleave", _classPrivateFieldGet2(_cancelRequestIfObsolete, _this33), {
          capture: true,
          passive: true
        });
        _this33.eventTarget.addEventListener("turbo:before-fetch-request", _classPrivateFieldGet2(_tryToUsePrefetchedRequest, _this33), true);
        _this33.started = true;
      });
      _classPrivateFieldInitSpec(this, _tryToPrefetchRequest, function (event) {
        if (getMetaContent("turbo-prefetch") === "false") return;
        var target = event.target;
        var isLink = target.matches && target.matches("a[href]:not([target^=_]):not([download])");
        if (isLink && _assertClassBrand(_LinkPrefetchObserver_brand, _this33, _isPrefetchable).call(_this33, target)) {
          var link = target;
          var _location3 = getLocationForLink(link);
          if (_this33.delegate.canPrefetchRequestToLocation(link, _location3)) {
            _classPrivateFieldSet2(_prefetchedLink, _this33, link);
            var fetchRequest = new FetchRequest(_this33, FetchMethod.get, _location3, new URLSearchParams(), target);
            prefetchCache.setLater(_location3.toString(), fetchRequest, _classPrivateGetter(_LinkPrefetchObserver_brand, _this33, _get_cacheTtl));
          }
        }
      });
      _classPrivateFieldInitSpec(this, _cancelRequestIfObsolete, function (event) {
        if (event.target === _classPrivateFieldGet2(_prefetchedLink, _this33)) _classPrivateFieldGet2(_cancelPrefetchRequest, _this33).call(_this33);
      });
      _classPrivateFieldInitSpec(this, _cancelPrefetchRequest, function () {
        prefetchCache.clear();
        _classPrivateFieldSet2(_prefetchedLink, _this33, null);
      });
      _classPrivateFieldInitSpec(this, _tryToUsePrefetchedRequest, function (event) {
        if (event.target.tagName !== "FORM" && event.detail.fetchOptions.method === "GET") {
          var cached = prefetchCache.get(event.detail.url.toString());
          if (cached) {
            // User clicked link, use cache response
            event.detail.fetchRequest = cached;
          }
          prefetchCache.clear();
        }
      });
      this.delegate = delegate;
      this.eventTarget = eventTarget;
    }
    return _createClass(LinkPrefetchObserver, [{
      key: "start",
      value: function start() {
        if (this.started) return;
        if (this.eventTarget.readyState === "loading") {
          this.eventTarget.addEventListener("DOMContentLoaded", _classPrivateFieldGet2(_enable, this), {
            once: true
          });
        } else {
          _classPrivateFieldGet2(_enable, this).call(this);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (!this.started) return;
        this.eventTarget.removeEventListener("mouseenter", _classPrivateFieldGet2(_tryToPrefetchRequest, this), {
          capture: true,
          passive: true
        });
        this.eventTarget.removeEventListener("mouseleave", _classPrivateFieldGet2(_cancelRequestIfObsolete, this), {
          capture: true,
          passive: true
        });
        this.eventTarget.removeEventListener("turbo:before-fetch-request", _classPrivateFieldGet2(_tryToUsePrefetchedRequest, this), true);
        this.started = false;
      }
    }, {
      key: "prepareRequest",
      value: function prepareRequest(request) {
        var link = request.target;
        request.headers["X-Sec-Purpose"] = "prefetch";
        var turboFrame = link.closest("turbo-frame");
        var turboFrameTarget = link.getAttribute("data-turbo-frame") || (turboFrame === null || turboFrame === void 0 ? void 0 : turboFrame.getAttribute("target")) || (turboFrame === null || turboFrame === void 0 ? void 0 : turboFrame.id);
        if (turboFrameTarget && turboFrameTarget !== "_top") {
          request.headers["Turbo-Frame"] = turboFrameTarget;
        }
      }

      // Fetch request interface
    }, {
      key: "requestSucceededWithResponse",
      value: function requestSucceededWithResponse() {}
    }, {
      key: "requestStarted",
      value: function requestStarted(fetchRequest) {}
    }, {
      key: "requestErrored",
      value: function requestErrored(fetchRequest) {}
    }, {
      key: "requestFinished",
      value: function requestFinished(fetchRequest) {}
    }, {
      key: "requestPreventedHandlingResponse",
      value: function requestPreventedHandlingResponse(fetchRequest, fetchResponse) {}
    }, {
      key: "requestFailedWithResponse",
      value: function requestFailedWithResponse(fetchRequest, fetchResponse) {}
    }]);
  }();
  function _get_cacheTtl(_this32) {
    return Number(getMetaContent("turbo-prefetch-cache-time")) || cacheTtl;
  }
  function _isPrefetchable(link) {
    var href = link.getAttribute("href");
    if (!href) return false;
    if (unfetchableLink(link)) return false;
    if (linkToTheSamePage(link)) return false;
    if (linkOptsOut(link)) return false;
    if (nonSafeLink(link)) return false;
    if (eventPrevented(link)) return false;
    return true;
  }
  var unfetchableLink = function unfetchableLink(link) {
    return link.origin !== document.location.origin || !["http:", "https:"].includes(link.protocol) || link.hasAttribute("target");
  };
  var linkToTheSamePage = function linkToTheSamePage(link) {
    return link.pathname + link.search === document.location.pathname + document.location.search || link.href.startsWith("#");
  };
  var linkOptsOut = function linkOptsOut(link) {
    if (link.getAttribute("data-turbo-prefetch") === "false") return true;
    if (link.getAttribute("data-turbo") === "false") return true;
    var turboPrefetchParent = findClosestRecursively(link, "[data-turbo-prefetch]");
    if (turboPrefetchParent && turboPrefetchParent.getAttribute("data-turbo-prefetch") === "false") return true;
    return false;
  };
  var nonSafeLink = function nonSafeLink(link) {
    var turboMethod = link.getAttribute("data-turbo-method");
    if (turboMethod && turboMethod.toLowerCase() !== "get") return true;
    if (isUJS(link)) return true;
    if (link.hasAttribute("data-turbo-confirm")) return true;
    if (link.hasAttribute("data-turbo-stream")) return true;
    return false;
  };
  var isUJS = function isUJS(link) {
    return link.hasAttribute("data-remote") || link.hasAttribute("data-behavior") || link.hasAttribute("data-confirm") || link.hasAttribute("data-method");
  };
  var eventPrevented = function eventPrevented(link) {
    var event = dispatch("turbo:before-prefetch", {
      target: link,
      cancelable: true
    });
    return event.defaultPrevented;
  };
  var _Navigator_brand = /*#__PURE__*/new WeakSet();
  var Navigator = /*#__PURE__*/function () {
    function Navigator(delegate) {
      _classCallCheck(this, Navigator);
      _classPrivateMethodInitSpec(this, _Navigator_brand);
      this.delegate = delegate;
    }
    return _createClass(Navigator, [{
      key: "proposeVisit",
      value: function proposeVisit(location) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (this.delegate.allowsVisitingLocationWithAction(location, options.action)) {
          this.delegate.visitProposedToLocation(location, options);
        }
      }
    }, {
      key: "startVisit",
      value: function startVisit(locatable, restorationIdentifier) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        this.stop();
        this.currentVisit = new Visit(this, expandURL(locatable), restorationIdentifier, _objectSpread2({
          referrer: this.location
        }, options));
        this.currentVisit.start();
      }
    }, {
      key: "submitForm",
      value: function submitForm(form, submitter) {
        this.stop();
        this.formSubmission = new FormSubmission(this, form, submitter, true);
        this.formSubmission.start();
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.formSubmission) {
          this.formSubmission.stop();
          delete this.formSubmission;
        }
        if (this.currentVisit) {
          this.currentVisit.cancel();
          delete this.currentVisit;
        }
      }
    }, {
      key: "adapter",
      get: function get() {
        return this.delegate.adapter;
      }
    }, {
      key: "view",
      get: function get() {
        return this.delegate.view;
      }
    }, {
      key: "rootLocation",
      get: function get() {
        return this.view.snapshot.rootLocation;
      }
    }, {
      key: "history",
      get: function get() {
        return this.delegate.history;
      }

      // Form submission delegate
    }, {
      key: "formSubmissionStarted",
      value: function formSubmissionStarted(formSubmission) {
        // Not all adapters implement formSubmissionStarted
        if (typeof this.adapter.formSubmissionStarted === "function") {
          this.adapter.formSubmissionStarted(formSubmission);
        }
      }
    }, {
      key: "formSubmissionSucceededWithResponse",
      value: function () {
        var _formSubmissionSucceededWithResponse = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(formSubmission, fetchResponse) {
          var responseHTML, shouldCacheSnapshot, statusCode, redirected, action, visitOptions;
          return _regeneratorRuntime().wrap(function _callee21$(_context21) {
            while (1) switch (_context21.prev = _context21.next) {
              case 0:
                if (!(formSubmission == this.formSubmission)) {
                  _context21.next = 5;
                  break;
                }
                _context21.next = 3;
                return fetchResponse.responseHTML;
              case 3:
                responseHTML = _context21.sent;
                if (responseHTML) {
                  shouldCacheSnapshot = formSubmission.isSafe;
                  if (!shouldCacheSnapshot) {
                    this.view.clearSnapshotCache();
                  }
                  statusCode = fetchResponse.statusCode, redirected = fetchResponse.redirected;
                  action = _assertClassBrand(_Navigator_brand, this, _getActionForFormSubmission).call(this, formSubmission, fetchResponse);
                  visitOptions = {
                    action: action,
                    shouldCacheSnapshot: shouldCacheSnapshot,
                    response: {
                      statusCode: statusCode,
                      responseHTML: responseHTML,
                      redirected: redirected
                    }
                  };
                  this.proposeVisit(fetchResponse.location, visitOptions);
                }
              case 5:
              case "end":
                return _context21.stop();
            }
          }, _callee21, this);
        }));
        function formSubmissionSucceededWithResponse(_x20, _x21) {
          return _formSubmissionSucceededWithResponse.apply(this, arguments);
        }
        return formSubmissionSucceededWithResponse;
      }()
    }, {
      key: "formSubmissionFailedWithResponse",
      value: function () {
        var _formSubmissionFailedWithResponse = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(formSubmission, fetchResponse) {
          var responseHTML, snapshot;
          return _regeneratorRuntime().wrap(function _callee22$(_context22) {
            while (1) switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return fetchResponse.responseHTML;
              case 2:
                responseHTML = _context22.sent;
                if (!responseHTML) {
                  _context22.next = 14;
                  break;
                }
                snapshot = PageSnapshot.fromHTMLString(responseHTML);
                if (!fetchResponse.serverError) {
                  _context22.next = 10;
                  break;
                }
                _context22.next = 8;
                return this.view.renderError(snapshot, this.currentVisit);
              case 8:
                _context22.next = 12;
                break;
              case 10:
                _context22.next = 12;
                return this.view.renderPage(snapshot, false, true, this.currentVisit);
              case 12:
                if (!snapshot.shouldPreserveScrollPosition) {
                  this.view.scrollToTop();
                }
                this.view.clearSnapshotCache();
              case 14:
              case "end":
                return _context22.stop();
            }
          }, _callee22, this);
        }));
        function formSubmissionFailedWithResponse(_x22, _x23) {
          return _formSubmissionFailedWithResponse.apply(this, arguments);
        }
        return formSubmissionFailedWithResponse;
      }()
    }, {
      key: "formSubmissionErrored",
      value: function formSubmissionErrored(formSubmission, error) {
        console.error(error);
      }
    }, {
      key: "formSubmissionFinished",
      value: function formSubmissionFinished(formSubmission) {
        // Not all adapters implement formSubmissionFinished
        if (typeof this.adapter.formSubmissionFinished === "function") {
          this.adapter.formSubmissionFinished(formSubmission);
        }
      }

      // Visit delegate
    }, {
      key: "visitStarted",
      value: function visitStarted(visit) {
        this.delegate.visitStarted(visit);
      }
    }, {
      key: "visitCompleted",
      value: function visitCompleted(visit) {
        this.delegate.visitCompleted(visit);
        delete this.currentVisit;
      }
    }, {
      key: "locationWithActionIsSamePage",
      value: function locationWithActionIsSamePage(location, action) {
        var anchor = getAnchor(location);
        var currentAnchor = getAnchor(this.view.lastRenderedLocation);
        var isRestorationToTop = action === "restore" && typeof anchor === "undefined";
        return action !== "replace" && getRequestURL(location) === getRequestURL(this.view.lastRenderedLocation) && (isRestorationToTop || anchor != null && anchor !== currentAnchor);
      }
    }, {
      key: "visitScrolledToSamePageLocation",
      value: function visitScrolledToSamePageLocation(oldURL, newURL) {
        this.delegate.visitScrolledToSamePageLocation(oldURL, newURL);
      }

      // Visits
    }, {
      key: "location",
      get: function get() {
        return this.history.location;
      }
    }, {
      key: "restorationIdentifier",
      get: function get() {
        return this.history.restorationIdentifier;
      }
    }]);
  }();
  function _getActionForFormSubmission(formSubmission, fetchResponse) {
    var submitter = formSubmission.submitter,
      formElement = formSubmission.formElement;
    return getVisitAction(submitter, formElement) || _assertClassBrand(_Navigator_brand, this, _getDefaultAction).call(this, fetchResponse);
  }
  function _getDefaultAction(fetchResponse) {
    var _this$location2;
    var sameLocationRedirect = fetchResponse.redirected && fetchResponse.location.href === ((_this$location2 = this.location) === null || _this$location2 === void 0 ? void 0 : _this$location2.href);
    return sameLocationRedirect ? "replace" : "advance";
  }
  var PageStage = {
    initial: 0,
    loading: 1,
    interactive: 2,
    complete: 3
  };
  var PageObserver = /*#__PURE__*/function () {
    function PageObserver(delegate) {
      var _this34 = this;
      _classCallCheck(this, PageObserver);
      _defineProperty(this, "stage", PageStage.initial);
      _defineProperty(this, "started", false);
      _defineProperty(this, "interpretReadyState", function () {
        var readyState = _this34.readyState;
        if (readyState == "interactive") {
          _this34.pageIsInteractive();
        } else if (readyState == "complete") {
          _this34.pageIsComplete();
        }
      });
      _defineProperty(this, "pageWillUnload", function () {
        _this34.delegate.pageWillUnload();
      });
      this.delegate = delegate;
    }
    return _createClass(PageObserver, [{
      key: "start",
      value: function start() {
        if (!this.started) {
          if (this.stage == PageStage.initial) {
            this.stage = PageStage.loading;
          }
          document.addEventListener("readystatechange", this.interpretReadyState, false);
          addEventListener("pagehide", this.pageWillUnload, false);
          this.started = true;
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.started) {
          document.removeEventListener("readystatechange", this.interpretReadyState, false);
          removeEventListener("pagehide", this.pageWillUnload, false);
          this.started = false;
        }
      }
    }, {
      key: "pageIsInteractive",
      value: function pageIsInteractive() {
        if (this.stage == PageStage.loading) {
          this.stage = PageStage.interactive;
          this.delegate.pageBecameInteractive();
        }
      }
    }, {
      key: "pageIsComplete",
      value: function pageIsComplete() {
        this.pageIsInteractive();
        if (this.stage == PageStage.interactive) {
          this.stage = PageStage.complete;
          this.delegate.pageLoaded();
        }
      }
    }, {
      key: "readyState",
      get: function get() {
        return document.readyState;
      }
    }]);
  }();
  var ScrollObserver = /*#__PURE__*/function () {
    function ScrollObserver(delegate) {
      var _this35 = this;
      _classCallCheck(this, ScrollObserver);
      _defineProperty(this, "started", false);
      _defineProperty(this, "onScroll", function () {
        _this35.updatePosition({
          x: window.pageXOffset,
          y: window.pageYOffset
        });
      });
      this.delegate = delegate;
    }
    return _createClass(ScrollObserver, [{
      key: "start",
      value: function start() {
        if (!this.started) {
          addEventListener("scroll", this.onScroll, false);
          this.onScroll();
          this.started = true;
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.started) {
          removeEventListener("scroll", this.onScroll, false);
          this.started = false;
        }
      }
    }, {
      key: "updatePosition",
      value:
      // Private

      function updatePosition(position) {
        this.delegate.scrollPositionChanged(position);
      }
    }]);
  }();
  var StreamMessageRenderer = /*#__PURE__*/function () {
    function StreamMessageRenderer() {
      _classCallCheck(this, StreamMessageRenderer);
    }
    return _createClass(StreamMessageRenderer, [{
      key: "render",
      value: function render(_ref15) {
        var fragment = _ref15.fragment;
        Bardo.preservingPermanentElements(this, getPermanentElementMapForFragment(fragment), function () {
          withAutofocusFromFragment(fragment, function () {
            withPreservedFocus(function () {
              document.documentElement.appendChild(fragment);
            });
          });
        });
      }

      // Bardo delegate
    }, {
      key: "enteringBardo",
      value: function enteringBardo(currentPermanentElement, newPermanentElement) {
        newPermanentElement.replaceWith(currentPermanentElement.cloneNode(true));
      }
    }, {
      key: "leavingBardo",
      value: function leavingBardo() {}
    }]);
  }();
  function getPermanentElementMapForFragment(fragment) {
    var permanentElementsInDocument = queryPermanentElementsAll(document.documentElement);
    var permanentElementMap = {};
    var _iterator21 = _createForOfIteratorHelper(permanentElementsInDocument),
      _step21;
    try {
      for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
        var permanentElementInDocument = _step21.value;
        var id = permanentElementInDocument.id;
        var _iterator22 = _createForOfIteratorHelper(fragment.querySelectorAll("turbo-stream")),
          _step22;
        try {
          for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
            var streamElement = _step22.value;
            var elementInStream = _getPermanentElementById(streamElement.templateElement.content, id);
            if (elementInStream) {
              permanentElementMap[id] = [permanentElementInDocument, elementInStream];
            }
          }
        } catch (err) {
          _iterator22.e(err);
        } finally {
          _iterator22.f();
        }
      }
    } catch (err) {
      _iterator21.e(err);
    } finally {
      _iterator21.f();
    }
    return permanentElementMap;
  }
  function withAutofocusFromFragment(_x24, _x25) {
    return _withAutofocusFromFragment.apply(this, arguments);
  }
  function _withAutofocusFromFragment() {
    _withAutofocusFromFragment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee47(fragment, callback) {
      var generatedID, turboStreams, elementWithAutofocus, willAutofocusId, hasNoActiveElement, elementToAutofocus;
      return _regeneratorRuntime().wrap(function _callee47$(_context47) {
        while (1) switch (_context47.prev = _context47.next) {
          case 0:
            generatedID = "turbo-stream-autofocus-".concat(uuid());
            turboStreams = fragment.querySelectorAll("turbo-stream");
            elementWithAutofocus = firstAutofocusableElementInStreams(turboStreams);
            willAutofocusId = null;
            if (elementWithAutofocus) {
              if (elementWithAutofocus.id) {
                willAutofocusId = elementWithAutofocus.id;
              } else {
                willAutofocusId = generatedID;
              }
              elementWithAutofocus.id = willAutofocusId;
            }
            callback();
            _context47.next = 8;
            return nextRepaint();
          case 8:
            hasNoActiveElement = document.activeElement == null || document.activeElement == document.body;
            if (hasNoActiveElement && willAutofocusId) {
              elementToAutofocus = document.getElementById(willAutofocusId);
              if (elementIsFocusable(elementToAutofocus)) {
                elementToAutofocus.focus();
              }
              if (elementToAutofocus && elementToAutofocus.id == generatedID) {
                elementToAutofocus.removeAttribute("id");
              }
            }
          case 10:
          case "end":
            return _context47.stop();
        }
      }, _callee47);
    }));
    return _withAutofocusFromFragment.apply(this, arguments);
  }
  function withPreservedFocus(_x26) {
    return _withPreservedFocus.apply(this, arguments);
  }
  function _withPreservedFocus() {
    _withPreservedFocus = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee48(callback) {
      var _yield$around, _yield$around2, activeElementBeforeRender, activeElementAfterRender, restoreFocusTo, elementToFocus;
      return _regeneratorRuntime().wrap(function _callee48$(_context48) {
        while (1) switch (_context48.prev = _context48.next) {
          case 0:
            _context48.next = 2;
            return around(callback, function () {
              return document.activeElement;
            });
          case 2:
            _yield$around = _context48.sent;
            _yield$around2 = _slicedToArray(_yield$around, 2);
            activeElementBeforeRender = _yield$around2[0];
            activeElementAfterRender = _yield$around2[1];
            restoreFocusTo = activeElementBeforeRender && activeElementBeforeRender.id;
            if (restoreFocusTo) {
              elementToFocus = document.getElementById(restoreFocusTo);
              if (elementIsFocusable(elementToFocus) && elementToFocus != activeElementAfterRender) {
                elementToFocus.focus();
              }
            }
          case 8:
          case "end":
            return _context48.stop();
        }
      }, _callee48);
    }));
    return _withPreservedFocus.apply(this, arguments);
  }
  function firstAutofocusableElementInStreams(nodeListOfStreamElements) {
    var _iterator23 = _createForOfIteratorHelper(nodeListOfStreamElements),
      _step23;
    try {
      for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
        var streamElement = _step23.value;
        var elementWithAutofocus = queryAutofocusableElement(streamElement.templateElement.content);
        if (elementWithAutofocus) return elementWithAutofocus;
      }
    } catch (err) {
      _iterator23.e(err);
    } finally {
      _iterator23.f();
    }
    return null;
  }
  var _started = /*#__PURE__*/new WeakMap();
  var StreamObserver = /*#__PURE__*/function () {
    function StreamObserver(delegate) {
      var _this36 = this;
      _classCallCheck(this, StreamObserver);
      _defineProperty(this, "sources", new Set());
      _classPrivateFieldInitSpec(this, _started, false);
      _defineProperty(this, "inspectFetchResponse", function (event) {
        var response = fetchResponseFromEvent(event);
        if (response && fetchResponseIsStream(response)) {
          event.preventDefault();
          _this36.receiveMessageResponse(response);
        }
      });
      _defineProperty(this, "receiveMessageEvent", function (event) {
        if (_classPrivateFieldGet2(_started, _this36) && typeof event.data == "string") {
          _this36.receiveMessageHTML(event.data);
        }
      });
      this.delegate = delegate;
    }
    return _createClass(StreamObserver, [{
      key: "start",
      value: function start() {
        if (!_classPrivateFieldGet2(_started, this)) {
          _classPrivateFieldSet2(_started, this, true);
          addEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (_classPrivateFieldGet2(_started, this)) {
          _classPrivateFieldSet2(_started, this, false);
          removeEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
        }
      }
    }, {
      key: "connectStreamSource",
      value: function connectStreamSource(source) {
        if (!this.streamSourceIsConnected(source)) {
          this.sources.add(source);
          source.addEventListener("message", this.receiveMessageEvent, false);
        }
      }
    }, {
      key: "disconnectStreamSource",
      value: function disconnectStreamSource(source) {
        if (this.streamSourceIsConnected(source)) {
          this.sources["delete"](source);
          source.removeEventListener("message", this.receiveMessageEvent, false);
        }
      }
    }, {
      key: "streamSourceIsConnected",
      value: function streamSourceIsConnected(source) {
        return this.sources.has(source);
      }
    }, {
      key: "receiveMessageResponse",
      value: function () {
        var _receiveMessageResponse = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(response) {
          var html;
          return _regeneratorRuntime().wrap(function _callee23$(_context23) {
            while (1) switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return response.responseHTML;
              case 2:
                html = _context23.sent;
                if (html) {
                  this.receiveMessageHTML(html);
                }
              case 4:
              case "end":
                return _context23.stop();
            }
          }, _callee23, this);
        }));
        function receiveMessageResponse(_x27) {
          return _receiveMessageResponse.apply(this, arguments);
        }
        return receiveMessageResponse;
      }()
    }, {
      key: "receiveMessageHTML",
      value: function receiveMessageHTML(html) {
        this.delegate.receivedMessageFromStream(StreamMessage.wrap(html));
      }
    }]);
  }();
  function fetchResponseFromEvent(event) {
    var _event$detail;
    var fetchResponse = (_event$detail = event.detail) === null || _event$detail === void 0 ? void 0 : _event$detail.fetchResponse;
    if (fetchResponse instanceof FetchResponse) {
      return fetchResponse;
    }
  }
  function fetchResponseIsStream(response) {
    var _response$contentType;
    var contentType = (_response$contentType = response.contentType) !== null && _response$contentType !== void 0 ? _response$contentType : "";
    return contentType.startsWith(StreamMessage.contentType);
  }
  var ErrorRenderer = /*#__PURE__*/function (_Renderer3) {
    function ErrorRenderer() {
      _classCallCheck(this, ErrorRenderer);
      return _callSuper(this, ErrorRenderer, arguments);
    }
    _inherits(ErrorRenderer, _Renderer3);
    return _createClass(ErrorRenderer, [{
      key: "render",
      value: function () {
        var _render4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
          return _regeneratorRuntime().wrap(function _callee24$(_context24) {
            while (1) switch (_context24.prev = _context24.next) {
              case 0:
                this.replaceHeadAndBody();
                this.activateScriptElements();
              case 2:
              case "end":
                return _context24.stop();
            }
          }, _callee24, this);
        }));
        function render() {
          return _render4.apply(this, arguments);
        }
        return render;
      }()
    }, {
      key: "replaceHeadAndBody",
      value: function replaceHeadAndBody() {
        var _document = document,
          documentElement = _document.documentElement,
          head = _document.head;
        documentElement.replaceChild(this.newHead, head);
        this.renderElement(this.currentElement, this.newElement);
      }
    }, {
      key: "activateScriptElements",
      value: function activateScriptElements() {
        var _iterator24 = _createForOfIteratorHelper(this.scriptElements),
          _step24;
        try {
          for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
            var replaceableElement = _step24.value;
            var parentNode = replaceableElement.parentNode;
            if (parentNode) {
              var element = activateScriptElement(replaceableElement);
              parentNode.replaceChild(element, replaceableElement);
            }
          }
        } catch (err) {
          _iterator24.e(err);
        } finally {
          _iterator24.f();
        }
      }
    }, {
      key: "newHead",
      get: function get() {
        return this.newSnapshot.headSnapshot.element;
      }
    }, {
      key: "scriptElements",
      get: function get() {
        return document.documentElement.querySelectorAll("script");
      }
    }], [{
      key: "renderElement",
      value: function renderElement(currentElement, newElement) {
        var _document2 = document,
          documentElement = _document2.documentElement,
          body = _document2.body;
        documentElement.replaceChild(newElement, body);
      }
    }]);
  }(Renderer);
  var _PageRenderer_brand = /*#__PURE__*/new WeakSet();
  var PageRenderer = /*#__PURE__*/function (_Renderer4) {
    function PageRenderer() {
      var _this37;
      _classCallCheck(this, PageRenderer);
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      _this37 = _callSuper(this, PageRenderer, [].concat(args));
      _classPrivateMethodInitSpec(_this37, _PageRenderer_brand);
      return _this37;
    }
    _inherits(PageRenderer, _Renderer4);
    return _createClass(PageRenderer, [{
      key: "shouldRender",
      get: function get() {
        return this.newSnapshot.isVisitable && this.trackedElementsAreIdentical;
      }
    }, {
      key: "reloadReason",
      get: function get() {
        if (!this.newSnapshot.isVisitable) {
          return {
            reason: "turbo_visit_control_is_reload"
          };
        }
        if (!this.trackedElementsAreIdentical) {
          return {
            reason: "tracked_element_mismatch"
          };
        }
      }
    }, {
      key: "prepareToRender",
      value: function () {
        var _prepareToRender = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25() {
          return _regeneratorRuntime().wrap(function _callee25$(_context25) {
            while (1) switch (_context25.prev = _context25.next) {
              case 0:
                _assertClassBrand(_PageRenderer_brand, this, _setLanguage).call(this);
                _context25.next = 3;
                return this.mergeHead();
              case 3:
              case "end":
                return _context25.stop();
            }
          }, _callee25, this);
        }));
        function prepareToRender() {
          return _prepareToRender.apply(this, arguments);
        }
        return prepareToRender;
      }()
    }, {
      key: "render",
      value: function () {
        var _render5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26() {
          return _regeneratorRuntime().wrap(function _callee26$(_context26) {
            while (1) switch (_context26.prev = _context26.next) {
              case 0:
                if (!this.willRender) {
                  _context26.next = 3;
                  break;
                }
                _context26.next = 3;
                return this.replaceBody();
              case 3:
              case "end":
                return _context26.stop();
            }
          }, _callee26, this);
        }));
        function render() {
          return _render5.apply(this, arguments);
        }
        return render;
      }()
    }, {
      key: "finishRendering",
      value: function finishRendering() {
        _superPropGet(PageRenderer, "finishRendering", this)([]);
        if (!this.isPreview) {
          this.focusFirstAutofocusableElement();
        }
      }
    }, {
      key: "currentHeadSnapshot",
      get: function get() {
        return this.currentSnapshot.headSnapshot;
      }
    }, {
      key: "newHeadSnapshot",
      get: function get() {
        return this.newSnapshot.headSnapshot;
      }
    }, {
      key: "newElement",
      get: function get() {
        return this.newSnapshot.element;
      }
    }, {
      key: "mergeHead",
      value: function () {
        var _mergeHead = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27() {
          var mergedHeadElements, newStylesheetElements;
          return _regeneratorRuntime().wrap(function _callee27$(_context27) {
            while (1) switch (_context27.prev = _context27.next) {
              case 0:
                mergedHeadElements = this.mergeProvisionalElements();
                newStylesheetElements = this.copyNewHeadStylesheetElements();
                this.copyNewHeadScriptElements();
                _context27.next = 5;
                return mergedHeadElements;
              case 5:
                _context27.next = 7;
                return newStylesheetElements;
              case 7:
                if (this.willRender) {
                  this.removeUnusedDynamicStylesheetElements();
                }
              case 8:
              case "end":
                return _context27.stop();
            }
          }, _callee27, this);
        }));
        function mergeHead() {
          return _mergeHead.apply(this, arguments);
        }
        return mergeHead;
      }()
    }, {
      key: "replaceBody",
      value: function () {
        var _replaceBody = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee29() {
          var _this38 = this;
          return _regeneratorRuntime().wrap(function _callee29$(_context29) {
            while (1) switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return this.preservingPermanentElements(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28() {
                  return _regeneratorRuntime().wrap(function _callee28$(_context28) {
                    while (1) switch (_context28.prev = _context28.next) {
                      case 0:
                        _this38.activateNewBody();
                        _context28.next = 3;
                        return _this38.assignNewBody();
                      case 3:
                      case "end":
                        return _context28.stop();
                    }
                  }, _callee28);
                })));
              case 2:
              case "end":
                return _context29.stop();
            }
          }, _callee29, this);
        }));
        function replaceBody() {
          return _replaceBody.apply(this, arguments);
        }
        return replaceBody;
      }()
    }, {
      key: "trackedElementsAreIdentical",
      get: function get() {
        return this.currentHeadSnapshot.trackedElementSignature == this.newHeadSnapshot.trackedElementSignature;
      }
    }, {
      key: "copyNewHeadStylesheetElements",
      value: function () {
        var _copyNewHeadStylesheetElements = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee30() {
          var loadingElements, _iterator25, _step25, element;
          return _regeneratorRuntime().wrap(function _callee30$(_context30) {
            while (1) switch (_context30.prev = _context30.next) {
              case 0:
                loadingElements = [];
                _iterator25 = _createForOfIteratorHelper(this.newHeadStylesheetElements);
                try {
                  for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
                    element = _step25.value;
                    loadingElements.push(waitForLoad(element));
                    document.head.appendChild(element);
                  }
                } catch (err) {
                  _iterator25.e(err);
                } finally {
                  _iterator25.f();
                }
                _context30.next = 5;
                return Promise.all(loadingElements);
              case 5:
              case "end":
                return _context30.stop();
            }
          }, _callee30, this);
        }));
        function copyNewHeadStylesheetElements() {
          return _copyNewHeadStylesheetElements.apply(this, arguments);
        }
        return copyNewHeadStylesheetElements;
      }()
    }, {
      key: "copyNewHeadScriptElements",
      value: function copyNewHeadScriptElements() {
        var _iterator26 = _createForOfIteratorHelper(this.newHeadScriptElements),
          _step26;
        try {
          for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
            var element = _step26.value;
            document.head.appendChild(activateScriptElement(element));
          }
        } catch (err) {
          _iterator26.e(err);
        } finally {
          _iterator26.f();
        }
      }
    }, {
      key: "removeUnusedDynamicStylesheetElements",
      value: function removeUnusedDynamicStylesheetElements() {
        var _iterator27 = _createForOfIteratorHelper(this.unusedDynamicStylesheetElements),
          _step27;
        try {
          for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
            var element = _step27.value;
            document.head.removeChild(element);
          }
        } catch (err) {
          _iterator27.e(err);
        } finally {
          _iterator27.f();
        }
      }
    }, {
      key: "mergeProvisionalElements",
      value: function () {
        var _mergeProvisionalElements = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee31() {
          var newHeadElements, _iterator28, _step28, element, _iterator29, _step29, _element2;
          return _regeneratorRuntime().wrap(function _callee31$(_context31) {
            while (1) switch (_context31.prev = _context31.next) {
              case 0:
                newHeadElements = _toConsumableArray(this.newHeadProvisionalElements);
                _iterator28 = _createForOfIteratorHelper(this.currentHeadProvisionalElements);
                try {
                  for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
                    element = _step28.value;
                    if (!this.isCurrentElementInElementList(element, newHeadElements)) {
                      document.head.removeChild(element);
                    }
                  }
                } catch (err) {
                  _iterator28.e(err);
                } finally {
                  _iterator28.f();
                }
                _iterator29 = _createForOfIteratorHelper(newHeadElements);
                try {
                  for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
                    _element2 = _step29.value;
                    document.head.appendChild(_element2);
                  }
                } catch (err) {
                  _iterator29.e(err);
                } finally {
                  _iterator29.f();
                }
              case 5:
              case "end":
                return _context31.stop();
            }
          }, _callee31, this);
        }));
        function mergeProvisionalElements() {
          return _mergeProvisionalElements.apply(this, arguments);
        }
        return mergeProvisionalElements;
      }()
    }, {
      key: "isCurrentElementInElementList",
      value: function isCurrentElementInElementList(element, elementList) {
        var _iterator30 = _createForOfIteratorHelper(elementList.entries()),
          _step30;
        try {
          for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
            var _step30$value = _slicedToArray(_step30.value, 2),
              index = _step30$value[0],
              newElement = _step30$value[1];
            // if title element...
            if (element.tagName == "TITLE") {
              if (newElement.tagName != "TITLE") {
                continue;
              }
              if (element.innerHTML == newElement.innerHTML) {
                elementList.splice(index, 1);
                return true;
              }
            }

            // if any other element...
            if (newElement.isEqualNode(element)) {
              elementList.splice(index, 1);
              return true;
            }
          }
        } catch (err) {
          _iterator30.e(err);
        } finally {
          _iterator30.f();
        }
        return false;
      }
    }, {
      key: "removeCurrentHeadProvisionalElements",
      value: function removeCurrentHeadProvisionalElements() {
        var _iterator31 = _createForOfIteratorHelper(this.currentHeadProvisionalElements),
          _step31;
        try {
          for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
            var element = _step31.value;
            document.head.removeChild(element);
          }
        } catch (err) {
          _iterator31.e(err);
        } finally {
          _iterator31.f();
        }
      }
    }, {
      key: "copyNewHeadProvisionalElements",
      value: function copyNewHeadProvisionalElements() {
        var _iterator32 = _createForOfIteratorHelper(this.newHeadProvisionalElements),
          _step32;
        try {
          for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
            var element = _step32.value;
            document.head.appendChild(element);
          }
        } catch (err) {
          _iterator32.e(err);
        } finally {
          _iterator32.f();
        }
      }
    }, {
      key: "activateNewBody",
      value: function activateNewBody() {
        document.adoptNode(this.newElement);
        this.activateNewBodyScriptElements();
      }
    }, {
      key: "activateNewBodyScriptElements",
      value: function activateNewBodyScriptElements() {
        var _iterator33 = _createForOfIteratorHelper(this.newBodyScriptElements),
          _step33;
        try {
          for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
            var inertScriptElement = _step33.value;
            var activatedScriptElement = activateScriptElement(inertScriptElement);
            inertScriptElement.replaceWith(activatedScriptElement);
          }
        } catch (err) {
          _iterator33.e(err);
        } finally {
          _iterator33.f();
        }
      }
    }, {
      key: "assignNewBody",
      value: function () {
        var _assignNewBody = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee32() {
          return _regeneratorRuntime().wrap(function _callee32$(_context32) {
            while (1) switch (_context32.prev = _context32.next) {
              case 0:
                _context32.next = 2;
                return this.renderElement(this.currentElement, this.newElement);
              case 2:
              case "end":
                return _context32.stop();
            }
          }, _callee32, this);
        }));
        function assignNewBody() {
          return _assignNewBody.apply(this, arguments);
        }
        return assignNewBody;
      }()
    }, {
      key: "unusedDynamicStylesheetElements",
      get: function get() {
        return this.oldHeadStylesheetElements.filter(function (element) {
          return element.getAttribute("data-turbo-track") === "dynamic";
        });
      }
    }, {
      key: "oldHeadStylesheetElements",
      get: function get() {
        return this.currentHeadSnapshot.getStylesheetElementsNotInSnapshot(this.newHeadSnapshot);
      }
    }, {
      key: "newHeadStylesheetElements",
      get: function get() {
        return this.newHeadSnapshot.getStylesheetElementsNotInSnapshot(this.currentHeadSnapshot);
      }
    }, {
      key: "newHeadScriptElements",
      get: function get() {
        return this.newHeadSnapshot.getScriptElementsNotInSnapshot(this.currentHeadSnapshot);
      }
    }, {
      key: "currentHeadProvisionalElements",
      get: function get() {
        return this.currentHeadSnapshot.provisionalElements;
      }
    }, {
      key: "newHeadProvisionalElements",
      get: function get() {
        return this.newHeadSnapshot.provisionalElements;
      }
    }, {
      key: "newBodyScriptElements",
      get: function get() {
        return this.newElement.querySelectorAll("script");
      }
    }], [{
      key: "renderElement",
      value: function renderElement(currentElement, newElement) {
        if (document.body && newElement instanceof HTMLBodyElement) {
          document.body.replaceWith(newElement);
        } else {
          document.documentElement.appendChild(newElement);
        }
      }
    }]);
  }(Renderer);
  function _setLanguage() {
    var documentElement = this.currentSnapshot.documentElement;
    var lang = this.newSnapshot.lang;
    if (lang) {
      documentElement.setAttribute("lang", lang);
    } else {
      documentElement.removeAttribute("lang");
    }
  }
  var MorphingPageRenderer = /*#__PURE__*/function (_PageRenderer2) {
    function MorphingPageRenderer() {
      _classCallCheck(this, MorphingPageRenderer);
      return _callSuper(this, MorphingPageRenderer, arguments);
    }
    _inherits(MorphingPageRenderer, _PageRenderer2);
    return _createClass(MorphingPageRenderer, [{
      key: "preservingPermanentElements",
      value: function () {
        var _preservingPermanentElements4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee33(callback) {
          return _regeneratorRuntime().wrap(function _callee33$(_context33) {
            while (1) switch (_context33.prev = _context33.next) {
              case 0:
                _context33.next = 2;
                return callback();
              case 2:
                return _context33.abrupt("return", _context33.sent);
              case 3:
              case "end":
                return _context33.stop();
            }
          }, _callee33);
        }));
        function preservingPermanentElements(_x28) {
          return _preservingPermanentElements4.apply(this, arguments);
        }
        return preservingPermanentElements;
      }()
    }, {
      key: "renderMethod",
      get: function get() {
        return "morph";
      }
    }, {
      key: "shouldAutofocus",
      get: function get() {
        return false;
      }
    }], [{
      key: "renderElement",
      value: function renderElement(currentElement, newElement) {
        morphElements(currentElement, newElement, {
          callbacks: {
            beforeNodeMorphed: function beforeNodeMorphed(element) {
              return !canRefreshFrame(element);
            }
          }
        });
        var _iterator34 = _createForOfIteratorHelper(currentElement.querySelectorAll("turbo-frame")),
          _step34;
        try {
          for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
            var frame = _step34.value;
            if (canRefreshFrame(frame)) frame.reload();
          }
        } catch (err) {
          _iterator34.e(err);
        } finally {
          _iterator34.f();
        }
        dispatch("turbo:morph", {
          detail: {
            currentElement: currentElement,
            newElement: newElement
          }
        });
      }
    }]);
  }(PageRenderer);
  function canRefreshFrame(frame) {
    return frame instanceof FrameElement && frame.src && frame.refresh === "morph" && !frame.closest("[data-turbo-permanent]");
  }
  var SnapshotCache = /*#__PURE__*/function () {
    function SnapshotCache(size) {
      _classCallCheck(this, SnapshotCache);
      _defineProperty(this, "keys", []);
      _defineProperty(this, "snapshots", {});
      this.size = size;
    }
    return _createClass(SnapshotCache, [{
      key: "has",
      value: function has(location) {
        return toCacheKey(location) in this.snapshots;
      }
    }, {
      key: "get",
      value: function get(location) {
        if (this.has(location)) {
          var snapshot = this.read(location);
          this.touch(location);
          return snapshot;
        }
      }
    }, {
      key: "put",
      value: function put(location, snapshot) {
        this.write(location, snapshot);
        this.touch(location);
        return snapshot;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.snapshots = {};
      }

      // Private
    }, {
      key: "read",
      value: function read(location) {
        return this.snapshots[toCacheKey(location)];
      }
    }, {
      key: "write",
      value: function write(location, snapshot) {
        this.snapshots[toCacheKey(location)] = snapshot;
      }
    }, {
      key: "touch",
      value: function touch(location) {
        var key = toCacheKey(location);
        var index = this.keys.indexOf(key);
        if (index > -1) this.keys.splice(index, 1);
        this.keys.unshift(key);
        this.trim();
      }
    }, {
      key: "trim",
      value: function trim() {
        var _iterator35 = _createForOfIteratorHelper(this.keys.splice(this.size)),
          _step35;
        try {
          for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
            var key = _step35.value;
            delete this.snapshots[key];
          }
        } catch (err) {
          _iterator35.e(err);
        } finally {
          _iterator35.f();
        }
      }
    }]);
  }();
  var PageView = /*#__PURE__*/function (_View3) {
    function PageView() {
      var _this39;
      _classCallCheck(this, PageView);
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }
      _this39 = _callSuper(this, PageView, [].concat(args));
      _defineProperty(_this39, "snapshotCache", new SnapshotCache(10));
      _defineProperty(_this39, "lastRenderedLocation", new URL(location.href));
      _defineProperty(_this39, "forceReloaded", false);
      return _this39;
    }
    _inherits(PageView, _View3);
    return _createClass(PageView, [{
      key: "shouldTransitionTo",
      value: function shouldTransitionTo(newSnapshot) {
        return this.snapshot.prefersViewTransitions && newSnapshot.prefersViewTransitions;
      }
    }, {
      key: "renderPage",
      value: function renderPage(snapshot) {
        var isPreview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var willRender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var visit = arguments.length > 3 ? arguments[3] : undefined;
        var shouldMorphPage = this.isPageRefresh(visit) && this.snapshot.shouldMorphPage;
        var rendererClass = shouldMorphPage ? MorphingPageRenderer : PageRenderer;
        var renderer = new rendererClass(this.snapshot, snapshot, isPreview, willRender);
        if (!renderer.shouldRender) {
          this.forceReloaded = true;
        } else {
          visit === null || visit === void 0 || visit.changeHistory();
        }
        return this.render(renderer);
      }
    }, {
      key: "renderError",
      value: function renderError(snapshot, visit) {
        visit === null || visit === void 0 || visit.changeHistory();
        var renderer = new ErrorRenderer(this.snapshot, snapshot, false);
        return this.render(renderer);
      }
    }, {
      key: "clearSnapshotCache",
      value: function clearSnapshotCache() {
        this.snapshotCache.clear();
      }
    }, {
      key: "cacheSnapshot",
      value: function () {
        var _cacheSnapshot = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee34() {
          var snapshot,
            _location4,
            cachedSnapshot,
            _args34 = arguments;
          return _regeneratorRuntime().wrap(function _callee34$(_context34) {
            while (1) switch (_context34.prev = _context34.next) {
              case 0:
                snapshot = _args34.length > 0 && _args34[0] !== undefined ? _args34[0] : this.snapshot;
                if (!snapshot.isCacheable) {
                  _context34.next = 9;
                  break;
                }
                this.delegate.viewWillCacheSnapshot();
                _location4 = this.lastRenderedLocation;
                _context34.next = 6;
                return nextEventLoopTick();
              case 6:
                cachedSnapshot = snapshot.clone();
                this.snapshotCache.put(_location4, cachedSnapshot);
                return _context34.abrupt("return", cachedSnapshot);
              case 9:
              case "end":
                return _context34.stop();
            }
          }, _callee34, this);
        }));
        function cacheSnapshot() {
          return _cacheSnapshot.apply(this, arguments);
        }
        return cacheSnapshot;
      }()
    }, {
      key: "getCachedSnapshotForLocation",
      value: function getCachedSnapshotForLocation(location) {
        return this.snapshotCache.get(location);
      }
    }, {
      key: "isPageRefresh",
      value: function isPageRefresh(visit) {
        return !visit || this.lastRenderedLocation.pathname === visit.location.pathname && visit.action === "replace";
      }
    }, {
      key: "shouldPreserveScrollPosition",
      value: function shouldPreserveScrollPosition(visit) {
        return this.isPageRefresh(visit) && this.snapshot.shouldPreserveScrollPosition;
      }
    }, {
      key: "snapshot",
      get: function get() {
        return PageSnapshot.fromElement(this.element);
      }
    }]);
  }(View);
  var _preloadAll = /*#__PURE__*/new WeakMap();
  var Preloader = /*#__PURE__*/function () {
    function Preloader(delegate, snapshotCache) {
      var _this40 = this;
      _classCallCheck(this, Preloader);
      _defineProperty(this, "selector", "a[data-turbo-preload]");
      _classPrivateFieldInitSpec(this, _preloadAll, function () {
        _this40.preloadOnLoadLinksForView(document.body);
      });
      this.delegate = delegate;
      this.snapshotCache = snapshotCache;
    }
    return _createClass(Preloader, [{
      key: "start",
      value: function start() {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", _classPrivateFieldGet2(_preloadAll, this));
        } else {
          this.preloadOnLoadLinksForView(document.body);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        document.removeEventListener("DOMContentLoaded", _classPrivateFieldGet2(_preloadAll, this));
      }
    }, {
      key: "preloadOnLoadLinksForView",
      value: function preloadOnLoadLinksForView(element) {
        var _iterator36 = _createForOfIteratorHelper(element.querySelectorAll(this.selector)),
          _step36;
        try {
          for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
            var link = _step36.value;
            if (this.delegate.shouldPreloadLink(link)) {
              this.preloadURL(link);
            }
          }
        } catch (err) {
          _iterator36.e(err);
        } finally {
          _iterator36.f();
        }
      }
    }, {
      key: "preloadURL",
      value: function () {
        var _preloadURL = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee35(link) {
          var location, fetchRequest;
          return _regeneratorRuntime().wrap(function _callee35$(_context35) {
            while (1) switch (_context35.prev = _context35.next) {
              case 0:
                location = new URL(link.href);
                if (!this.snapshotCache.has(location)) {
                  _context35.next = 3;
                  break;
                }
                return _context35.abrupt("return");
              case 3:
                fetchRequest = new FetchRequest(this, FetchMethod.get, location, new URLSearchParams(), link);
                _context35.next = 6;
                return fetchRequest.perform();
              case 6:
              case "end":
                return _context35.stop();
            }
          }, _callee35, this);
        }));
        function preloadURL(_x29) {
          return _preloadURL.apply(this, arguments);
        }
        return preloadURL;
      }() // Fetch request delegate
    }, {
      key: "prepareRequest",
      value: function prepareRequest(fetchRequest) {
        fetchRequest.headers["X-Sec-Purpose"] = "prefetch";
      }
    }, {
      key: "requestSucceededWithResponse",
      value: function () {
        var _requestSucceededWithResponse2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee36(fetchRequest, fetchResponse) {
          var responseHTML, snapshot;
          return _regeneratorRuntime().wrap(function _callee36$(_context36) {
            while (1) switch (_context36.prev = _context36.next) {
              case 0:
                _context36.prev = 0;
                _context36.next = 3;
                return fetchResponse.responseHTML;
              case 3:
                responseHTML = _context36.sent;
                snapshot = PageSnapshot.fromHTMLString(responseHTML);
                this.snapshotCache.put(fetchRequest.url, snapshot);
                _context36.next = 10;
                break;
              case 8:
                _context36.prev = 8;
                _context36.t0 = _context36["catch"](0);
              case 10:
              case "end":
                return _context36.stop();
            }
          }, _callee36, this, [[0, 8]]);
        }));
        function requestSucceededWithResponse(_x30, _x31) {
          return _requestSucceededWithResponse2.apply(this, arguments);
        }
        return requestSucceededWithResponse;
      }()
    }, {
      key: "requestStarted",
      value: function requestStarted(fetchRequest) {}
    }, {
      key: "requestErrored",
      value: function requestErrored(fetchRequest) {}
    }, {
      key: "requestFinished",
      value: function requestFinished(fetchRequest) {}
    }, {
      key: "requestPreventedHandlingResponse",
      value: function requestPreventedHandlingResponse(fetchRequest, fetchResponse) {}
    }, {
      key: "requestFailedWithResponse",
      value: function requestFailedWithResponse(fetchRequest, fetchResponse) {}
    }]);
  }();
  var _Cache_brand = /*#__PURE__*/new WeakSet();
  var Cache = /*#__PURE__*/function () {
    function Cache(session) {
      _classCallCheck(this, Cache);
      _classPrivateMethodInitSpec(this, _Cache_brand);
      this.session = session;
    }
    return _createClass(Cache, [{
      key: "clear",
      value: function clear() {
        this.session.clearCache();
      }
    }, {
      key: "resetCacheControl",
      value: function resetCacheControl() {
        _assertClassBrand(_Cache_brand, this, _setCacheControl).call(this, "");
      }
    }, {
      key: "exemptPageFromCache",
      value: function exemptPageFromCache() {
        _assertClassBrand(_Cache_brand, this, _setCacheControl).call(this, "no-cache");
      }
    }, {
      key: "exemptPageFromPreview",
      value: function exemptPageFromPreview() {
        _assertClassBrand(_Cache_brand, this, _setCacheControl).call(this, "no-preview");
      }
    }]);
  }();
  function _setCacheControl(value) {
    setMetaContent("turbo-cache-control", value);
  }
  var _pageRefreshDebouncePeriod = /*#__PURE__*/new WeakMap();
  var Session = /*#__PURE__*/function () {
    function Session(recentRequests) {
      _classCallCheck(this, Session);
      _defineProperty(this, "navigator", new Navigator(this));
      _defineProperty(this, "history", new History(this));
      _defineProperty(this, "view", new PageView(this, document.documentElement));
      _defineProperty(this, "adapter", new BrowserAdapter(this));
      _defineProperty(this, "pageObserver", new PageObserver(this));
      _defineProperty(this, "cacheObserver", new CacheObserver());
      _defineProperty(this, "linkPrefetchObserver", new LinkPrefetchObserver(this, document));
      _defineProperty(this, "linkClickObserver", new LinkClickObserver(this, window));
      _defineProperty(this, "formSubmitObserver", new FormSubmitObserver(this, document));
      _defineProperty(this, "scrollObserver", new ScrollObserver(this));
      _defineProperty(this, "streamObserver", new StreamObserver(this));
      _defineProperty(this, "formLinkClickObserver", new FormLinkClickObserver(this, document.documentElement));
      _defineProperty(this, "frameRedirector", new FrameRedirector(this, document.documentElement));
      _defineProperty(this, "streamMessageRenderer", new StreamMessageRenderer());
      _defineProperty(this, "cache", new Cache(this));
      _defineProperty(this, "enabled", true);
      _defineProperty(this, "started", false);
      _classPrivateFieldInitSpec(this, _pageRefreshDebouncePeriod, 150);
      this.recentRequests = recentRequests;
      this.preloader = new Preloader(this, this.view.snapshotCache);
      this.debouncedRefresh = this.refresh;
      this.pageRefreshDebouncePeriod = this.pageRefreshDebouncePeriod;
    }
    return _createClass(Session, [{
      key: "start",
      value: function start() {
        if (!this.started) {
          this.pageObserver.start();
          this.cacheObserver.start();
          this.linkPrefetchObserver.start();
          this.formLinkClickObserver.start();
          this.linkClickObserver.start();
          this.formSubmitObserver.start();
          this.scrollObserver.start();
          this.streamObserver.start();
          this.frameRedirector.start();
          this.history.start();
          this.preloader.start();
          this.started = true;
          this.enabled = true;
        }
      }
    }, {
      key: "disable",
      value: function disable() {
        this.enabled = false;
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.started) {
          this.pageObserver.stop();
          this.cacheObserver.stop();
          this.linkPrefetchObserver.stop();
          this.formLinkClickObserver.stop();
          this.linkClickObserver.stop();
          this.formSubmitObserver.stop();
          this.scrollObserver.stop();
          this.streamObserver.stop();
          this.frameRedirector.stop();
          this.history.stop();
          this.preloader.stop();
          this.started = false;
        }
      }
    }, {
      key: "registerAdapter",
      value: function registerAdapter(adapter) {
        this.adapter = adapter;
      }
    }, {
      key: "visit",
      value: function visit(location) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var frameElement = options.frame ? document.getElementById(options.frame) : null;
        if (frameElement instanceof FrameElement) {
          var action = options.action || getVisitAction(frameElement);
          frameElement.delegate.proposeVisitIfNavigatedWithAction(frameElement, action);
          frameElement.src = location.toString();
        } else {
          this.navigator.proposeVisit(expandURL(location), options);
        }
      }
    }, {
      key: "refresh",
      value: function refresh(url, requestId) {
        var isRecentRequest = requestId && this.recentRequests.has(requestId);
        if (!isRecentRequest && !this.navigator.currentVisit) {
          this.visit(url, {
            action: "replace",
            shouldCacheSnapshot: false
          });
        }
      }
    }, {
      key: "connectStreamSource",
      value: function connectStreamSource(source) {
        this.streamObserver.connectStreamSource(source);
      }
    }, {
      key: "disconnectStreamSource",
      value: function disconnectStreamSource(source) {
        this.streamObserver.disconnectStreamSource(source);
      }
    }, {
      key: "renderStreamMessage",
      value: function renderStreamMessage(message) {
        this.streamMessageRenderer.render(StreamMessage.wrap(message));
      }
    }, {
      key: "clearCache",
      value: function clearCache() {
        this.view.clearSnapshotCache();
      }
    }, {
      key: "setProgressBarDelay",
      value: function setProgressBarDelay(delay) {
        console.warn("Please replace `session.setProgressBarDelay(delay)` with `session.progressBarDelay = delay`. The function is deprecated and will be removed in a future version of Turbo.`");
        this.progressBarDelay = delay;
      }
    }, {
      key: "progressBarDelay",
      get: function get() {
        return config.drive.progressBarDelay;
      },
      set: function set(delay) {
        config.drive.progressBarDelay = delay;
      }
    }, {
      key: "drive",
      get: function get() {
        return config.drive.enabled;
      },
      set: function set(value) {
        config.drive.enabled = value;
      }
    }, {
      key: "formMode",
      get: function get() {
        return config.forms.mode;
      },
      set: function set(value) {
        config.forms.mode = value;
      }
    }, {
      key: "location",
      get: function get() {
        return this.history.location;
      }
    }, {
      key: "restorationIdentifier",
      get: function get() {
        return this.history.restorationIdentifier;
      }
    }, {
      key: "pageRefreshDebouncePeriod",
      get: function get() {
        return _classPrivateFieldGet2(_pageRefreshDebouncePeriod, this);
      },
      set: function set(value) {
        this.refresh = debounce(this.debouncedRefresh.bind(this), value);
        _classPrivateFieldSet2(_pageRefreshDebouncePeriod, this, value);
      }

      // Preloader delegate
    }, {
      key: "shouldPreloadLink",
      value: function shouldPreloadLink(element) {
        var isUnsafe = element.hasAttribute("data-turbo-method");
        var isStream = element.hasAttribute("data-turbo-stream");
        var frameTarget = element.getAttribute("data-turbo-frame");
        var frame = frameTarget == "_top" ? null : document.getElementById(frameTarget) || findClosestRecursively(element, "turbo-frame:not([disabled])");
        if (isUnsafe || isStream || frame instanceof FrameElement) {
          return false;
        } else {
          var _location5 = new URL(element.href);
          return this.elementIsNavigatable(element) && locationIsVisitable(_location5, this.snapshot.rootLocation);
        }
      }

      // History delegate
    }, {
      key: "historyPoppedToLocationWithRestorationIdentifierAndDirection",
      value: function historyPoppedToLocationWithRestorationIdentifierAndDirection(location, restorationIdentifier, direction) {
        if (this.enabled) {
          this.navigator.startVisit(location, restorationIdentifier, {
            action: "restore",
            historyChanged: true,
            direction: direction
          });
        } else {
          this.adapter.pageInvalidated({
            reason: "turbo_disabled"
          });
        }
      }

      // Scroll observer delegate
    }, {
      key: "scrollPositionChanged",
      value: function scrollPositionChanged(position) {
        this.history.updateRestorationData({
          scrollPosition: position
        });
      }

      // Form click observer delegate
    }, {
      key: "willSubmitFormLinkToLocation",
      value: function willSubmitFormLinkToLocation(link, location) {
        return this.elementIsNavigatable(link) && locationIsVisitable(location, this.snapshot.rootLocation);
      }
    }, {
      key: "submittedFormLinkToLocation",
      value: function submittedFormLinkToLocation() {}

      // Link hover observer delegate
    }, {
      key: "canPrefetchRequestToLocation",
      value: function canPrefetchRequestToLocation(link, location) {
        return this.elementIsNavigatable(link) && locationIsVisitable(location, this.snapshot.rootLocation);
      }

      // Link click observer delegate
    }, {
      key: "willFollowLinkToLocation",
      value: function willFollowLinkToLocation(link, location, event) {
        return this.elementIsNavigatable(link) && locationIsVisitable(location, this.snapshot.rootLocation) && this.applicationAllowsFollowingLinkToLocation(link, location, event);
      }
    }, {
      key: "followedLinkToLocation",
      value: function followedLinkToLocation(link, location) {
        var action = this.getActionForLink(link);
        var acceptsStreamResponse = link.hasAttribute("data-turbo-stream");
        this.visit(location.href, {
          action: action,
          acceptsStreamResponse: acceptsStreamResponse
        });
      }

      // Navigator delegate
    }, {
      key: "allowsVisitingLocationWithAction",
      value: function allowsVisitingLocationWithAction(location, action) {
        return this.locationWithActionIsSamePage(location, action) || this.applicationAllowsVisitingLocation(location);
      }
    }, {
      key: "visitProposedToLocation",
      value: function visitProposedToLocation(location, options) {
        extendURLWithDeprecatedProperties(location);
        this.adapter.visitProposedToLocation(location, options);
      }

      // Visit delegate
    }, {
      key: "visitStarted",
      value: function visitStarted(visit) {
        if (!visit.acceptsStreamResponse) {
          markAsBusy(document.documentElement);
          this.view.markVisitDirection(visit.direction);
        }
        extendURLWithDeprecatedProperties(visit.location);
        if (!visit.silent) {
          this.notifyApplicationAfterVisitingLocation(visit.location, visit.action);
        }
      }
    }, {
      key: "visitCompleted",
      value: function visitCompleted(visit) {
        this.view.unmarkVisitDirection();
        clearBusyState(document.documentElement);
        this.notifyApplicationAfterPageLoad(visit.getTimingMetrics());
      }
    }, {
      key: "locationWithActionIsSamePage",
      value: function locationWithActionIsSamePage(location, action) {
        return this.navigator.locationWithActionIsSamePage(location, action);
      }
    }, {
      key: "visitScrolledToSamePageLocation",
      value: function visitScrolledToSamePageLocation(oldURL, newURL) {
        this.notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL);
      }

      // Form submit observer delegate
    }, {
      key: "willSubmitForm",
      value: function willSubmitForm(form, submitter) {
        var action = getAction$1(form, submitter);
        return this.submissionIsNavigatable(form, submitter) && locationIsVisitable(expandURL(action), this.snapshot.rootLocation);
      }
    }, {
      key: "formSubmitted",
      value: function formSubmitted(form, submitter) {
        this.navigator.submitForm(form, submitter);
      }

      // Page observer delegate
    }, {
      key: "pageBecameInteractive",
      value: function pageBecameInteractive() {
        this.view.lastRenderedLocation = this.location;
        this.notifyApplicationAfterPageLoad();
      }
    }, {
      key: "pageLoaded",
      value: function pageLoaded() {
        this.history.assumeControlOfScrollRestoration();
      }
    }, {
      key: "pageWillUnload",
      value: function pageWillUnload() {
        this.history.relinquishControlOfScrollRestoration();
      }

      // Stream observer delegate
    }, {
      key: "receivedMessageFromStream",
      value: function receivedMessageFromStream(message) {
        this.renderStreamMessage(message);
      }

      // Page view delegate
    }, {
      key: "viewWillCacheSnapshot",
      value: function viewWillCacheSnapshot() {
        var _this$navigator$curre;
        if (!((_this$navigator$curre = this.navigator.currentVisit) !== null && _this$navigator$curre !== void 0 && _this$navigator$curre.silent)) {
          this.notifyApplicationBeforeCachingSnapshot();
        }
      }
    }, {
      key: "allowsImmediateRender",
      value: function allowsImmediateRender(_ref17, options) {
        var element = _ref17.element;
        var event = this.notifyApplicationBeforeRender(element, options);
        var defaultPrevented = event.defaultPrevented,
          render = event.detail.render;
        if (this.view.renderer && render) {
          this.view.renderer.renderElement = render;
        }
        return !defaultPrevented;
      }
    }, {
      key: "viewRenderedSnapshot",
      value: function viewRenderedSnapshot(_snapshot, _isPreview, renderMethod) {
        this.view.lastRenderedLocation = this.history.location;
        this.notifyApplicationAfterRender(renderMethod);
      }
    }, {
      key: "preloadOnLoadLinksForView",
      value: function preloadOnLoadLinksForView(element) {
        this.preloader.preloadOnLoadLinksForView(element);
      }
    }, {
      key: "viewInvalidated",
      value: function viewInvalidated(reason) {
        this.adapter.pageInvalidated(reason);
      }

      // Frame element
    }, {
      key: "frameLoaded",
      value: function frameLoaded(frame) {
        this.notifyApplicationAfterFrameLoad(frame);
      }
    }, {
      key: "frameRendered",
      value: function frameRendered(fetchResponse, frame) {
        this.notifyApplicationAfterFrameRender(fetchResponse, frame);
      }

      // Application events
    }, {
      key: "applicationAllowsFollowingLinkToLocation",
      value: function applicationAllowsFollowingLinkToLocation(link, location, ev) {
        var event = this.notifyApplicationAfterClickingLinkToLocation(link, location, ev);
        return !event.defaultPrevented;
      }
    }, {
      key: "applicationAllowsVisitingLocation",
      value: function applicationAllowsVisitingLocation(location) {
        var event = this.notifyApplicationBeforeVisitingLocation(location);
        return !event.defaultPrevented;
      }
    }, {
      key: "notifyApplicationAfterClickingLinkToLocation",
      value: function notifyApplicationAfterClickingLinkToLocation(link, location, event) {
        return dispatch("turbo:click", {
          target: link,
          detail: {
            url: location.href,
            originalEvent: event
          },
          cancelable: true
        });
      }
    }, {
      key: "notifyApplicationBeforeVisitingLocation",
      value: function notifyApplicationBeforeVisitingLocation(location) {
        return dispatch("turbo:before-visit", {
          detail: {
            url: location.href
          },
          cancelable: true
        });
      }
    }, {
      key: "notifyApplicationAfterVisitingLocation",
      value: function notifyApplicationAfterVisitingLocation(location, action) {
        return dispatch("turbo:visit", {
          detail: {
            url: location.href,
            action: action
          }
        });
      }
    }, {
      key: "notifyApplicationBeforeCachingSnapshot",
      value: function notifyApplicationBeforeCachingSnapshot() {
        return dispatch("turbo:before-cache");
      }
    }, {
      key: "notifyApplicationBeforeRender",
      value: function notifyApplicationBeforeRender(newBody, options) {
        return dispatch("turbo:before-render", {
          detail: _objectSpread2({
            newBody: newBody
          }, options),
          cancelable: true
        });
      }
    }, {
      key: "notifyApplicationAfterRender",
      value: function notifyApplicationAfterRender(renderMethod) {
        return dispatch("turbo:render", {
          detail: {
            renderMethod: renderMethod
          }
        });
      }
    }, {
      key: "notifyApplicationAfterPageLoad",
      value: function notifyApplicationAfterPageLoad() {
        var timing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return dispatch("turbo:load", {
          detail: {
            url: this.location.href,
            timing: timing
          }
        });
      }
    }, {
      key: "notifyApplicationAfterVisitingSamePageLocation",
      value: function notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL) {
        dispatchEvent(new HashChangeEvent("hashchange", {
          oldURL: oldURL.toString(),
          newURL: newURL.toString()
        }));
      }
    }, {
      key: "notifyApplicationAfterFrameLoad",
      value: function notifyApplicationAfterFrameLoad(frame) {
        return dispatch("turbo:frame-load", {
          target: frame
        });
      }
    }, {
      key: "notifyApplicationAfterFrameRender",
      value: function notifyApplicationAfterFrameRender(fetchResponse, frame) {
        return dispatch("turbo:frame-render", {
          detail: {
            fetchResponse: fetchResponse
          },
          target: frame,
          cancelable: true
        });
      }

      // Helpers
    }, {
      key: "submissionIsNavigatable",
      value: function submissionIsNavigatable(form, submitter) {
        if (config.forms.mode == "off") {
          return false;
        } else {
          var submitterIsNavigatable = submitter ? this.elementIsNavigatable(submitter) : true;
          if (config.forms.mode == "optin") {
            return submitterIsNavigatable && form.closest('[data-turbo="true"]') != null;
          } else {
            return submitterIsNavigatable && this.elementIsNavigatable(form);
          }
        }
      }
    }, {
      key: "elementIsNavigatable",
      value: function elementIsNavigatable(element) {
        var container = findClosestRecursively(element, "[data-turbo]");
        var withinFrame = findClosestRecursively(element, "turbo-frame");

        // Check if Drive is enabled on the session or we're within a Frame.
        if (config.drive.enabled || withinFrame) {
          // Element is navigatable by default, unless `data-turbo="false"`.
          if (container) {
            return container.getAttribute("data-turbo") != "false";
          } else {
            return true;
          }
        } else {
          // Element isn't navigatable by default, unless `data-turbo="true"`.
          if (container) {
            return container.getAttribute("data-turbo") == "true";
          } else {
            return false;
          }
        }
      }

      // Private
    }, {
      key: "getActionForLink",
      value: function getActionForLink(link) {
        return getVisitAction(link) || "advance";
      }
    }, {
      key: "snapshot",
      get: function get() {
        return this.view.snapshot;
      }
    }]);
  }(); // Older versions of the Turbo Native adapters referenced the
  // `Location#absoluteURL` property in their implementations of
  // the `Adapter#visitProposedToLocation()` and `#visitStarted()`
  // methods. The Location class has since been removed in favor
  // of the DOM URL API, and accordingly all Adapter methods now
  // receive URL objects.
  //
  // We alias #absoluteURL to #toString() here to avoid crashing
  // older adapters which do not expect URL objects. We should
  // consider removing this support at some point in the future.
  function extendURLWithDeprecatedProperties(url) {
    Object.defineProperties(url, deprecatedLocationPropertyDescriptors);
  }
  var deprecatedLocationPropertyDescriptors = {
    absoluteURL: {
      get: function get() {
        return this.toString();
      }
    }
  };
  var session = new Session(recentRequests);
  var cache = session.cache,
    navigator$1 = session.navigator;

  /**
   * Starts the main session.
   * This initialises any necessary observers such as those to monitor
   * link interactions.
   */
  function start() {
    session.start();
  }

  /**
   * Registers an adapter for the main session.
   *
   * @param adapter Adapter to register
   */
  function registerAdapter(adapter) {
    session.registerAdapter(adapter);
  }

  /**
   * Performs an application visit to the given location.
   *
   * @param location Location to visit (a URL or path)
   * @param options Options to apply
   * @param options.action Type of history navigation to apply ("restore",
   * "replace" or "advance")
   * @param options.historyChanged Specifies whether the browser history has
   * already been changed for this visit or not
   * @param options.referrer Specifies the referrer of this visit such that
   * navigations to the same page will not result in a new history entry.
   * @param options.snapshotHTML Cached snapshot to render
   * @param options.response Response of the specified location
   */
  function visit(location, options) {
    session.visit(location, options);
  }

  /**
   * Connects a stream source to the main session.
   *
   * @param source Stream source to connect
   */
  function connectStreamSource(source) {
    session.connectStreamSource(source);
  }

  /**
   * Disconnects a stream source from the main session.
   *
   * @param source Stream source to disconnect
   */
  function disconnectStreamSource(source) {
    session.disconnectStreamSource(source);
  }

  /**
   * Renders a stream message to the main session by appending it to the
   * current document.
   *
   * @param message Message to render
   */
  function renderStreamMessage(message) {
    session.renderStreamMessage(message);
  }

  /**
   * Removes all entries from the Turbo Drive page cache.
   * Call this when state has changed on the server that may affect cached pages.
   *
   * @deprecated since version 7.2.0 in favor of `Turbo.cache.clear()`
   */
  function clearCache() {
    console.warn("Please replace `Turbo.clearCache()` with `Turbo.cache.clear()`. The top-level function is deprecated and will be removed in a future version of Turbo.`");
    session.clearCache();
  }

  /**
   * Sets the delay after which the progress bar will appear during navigation.
   *
   * The progress bar appears after 500ms by default.
   *
   * Note that this method has no effect when used with the iOS or Android
   * adapters.
   *
   * @param delay Time to delay in milliseconds
   */
  function setProgressBarDelay(delay) {
    console.warn("Please replace `Turbo.setProgressBarDelay(delay)` with `Turbo.config.drive.progressBarDelay = delay`. The top-level function is deprecated and will be removed in a future version of Turbo.`");
    config.drive.progressBarDelay = delay;
  }
  function setConfirmMethod(confirmMethod) {
    console.warn("Please replace `Turbo.setConfirmMethod(confirmMethod)` with `Turbo.config.forms.confirm = confirmMethod`. The top-level function is deprecated and will be removed in a future version of Turbo.`");
    config.forms.confirm = confirmMethod;
  }
  function setFormMode(mode) {
    console.warn("Please replace `Turbo.setFormMode(mode)` with `Turbo.config.forms.mode = mode`. The top-level function is deprecated and will be removed in a future version of Turbo.`");
    config.forms.mode = mode;
  }
  var Turbo = /*#__PURE__*/Object.freeze({
    __proto__: null,
    navigator: navigator$1,
    session: session,
    cache: cache,
    PageRenderer: PageRenderer,
    PageSnapshot: PageSnapshot,
    FrameRenderer: FrameRenderer,
    fetch: fetchWithTurboHeaders,
    config: config,
    start: start,
    registerAdapter: registerAdapter,
    visit: visit,
    connectStreamSource: connectStreamSource,
    disconnectStreamSource: disconnectStreamSource,
    renderStreamMessage: renderStreamMessage,
    clearCache: clearCache,
    setProgressBarDelay: setProgressBarDelay,
    setConfirmMethod: setConfirmMethod,
    setFormMode: setFormMode
  });
  var TurboFrameMissingError = /*#__PURE__*/function (_Error) {
    function TurboFrameMissingError() {
      _classCallCheck(this, TurboFrameMissingError);
      return _callSuper(this, TurboFrameMissingError, arguments);
    }
    _inherits(TurboFrameMissingError, _Error);
    return _createClass(TurboFrameMissingError);
  }(/*#__PURE__*/_wrapNativeSuper(Error));
  var _currentFetchRequest = /*#__PURE__*/new WeakMap();
  var _resolveVisitPromise = /*#__PURE__*/new WeakMap();
  var _connected = /*#__PURE__*/new WeakMap();
  var _hasBeenLoaded = /*#__PURE__*/new WeakMap();
  var _ignoredAttributes = /*#__PURE__*/new WeakMap();
  var _shouldMorphFrame = /*#__PURE__*/new WeakMap();
  var _FrameController_brand = /*#__PURE__*/new WeakSet();
  var FrameController = /*#__PURE__*/function () {
    function FrameController(_element3) {
      var _this41 = this;
      _classCallCheck(this, FrameController);
      _classPrivateMethodInitSpec(this, _FrameController_brand);
      _defineProperty(this, "fetchResponseLoaded", function (_fetchResponse) {
        return Promise.resolve();
      });
      _classPrivateFieldInitSpec(this, _currentFetchRequest, null);
      _classPrivateFieldInitSpec(this, _resolveVisitPromise, function () {});
      _classPrivateFieldInitSpec(this, _connected, false);
      _classPrivateFieldInitSpec(this, _hasBeenLoaded, false);
      _classPrivateFieldInitSpec(this, _ignoredAttributes, new Set());
      _classPrivateFieldInitSpec(this, _shouldMorphFrame, false);
      _defineProperty(this, "action", null);
      _defineProperty(this, "visitCachedSnapshot", function (_ref8) {
        var element = _ref8.element;
        var frame = element.querySelector("#" + _this41.element.id);
        if (frame && _this41.previousFrameElement) {
          frame.replaceChildren.apply(frame, _toConsumableArray(_this41.previousFrameElement.children));
        }
        delete _this41.previousFrameElement;
      });
      this.element = _element3;
      this.view = new FrameView(this, this.element);
      this.appearanceObserver = new AppearanceObserver(this, this.element);
      this.formLinkClickObserver = new FormLinkClickObserver(this, this.element);
      this.linkInterceptor = new LinkInterceptor(this, this.element);
      this.restorationIdentifier = uuid();
      this.formSubmitObserver = new FormSubmitObserver(this, this.element);
    }

    // Frame delegate
    return _createClass(FrameController, [{
      key: "connect",
      value: function connect() {
        if (!_classPrivateFieldGet2(_connected, this)) {
          _classPrivateFieldSet2(_connected, this, true);
          if (this.loadingStyle == FrameLoadingStyle.lazy) {
            this.appearanceObserver.start();
          } else {
            _assertClassBrand(_FrameController_brand, this, _loadSourceURL).call(this);
          }
          this.formLinkClickObserver.start();
          this.linkInterceptor.start();
          this.formSubmitObserver.start();
        }
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        if (_classPrivateFieldGet2(_connected, this)) {
          _classPrivateFieldSet2(_connected, this, false);
          this.appearanceObserver.stop();
          this.formLinkClickObserver.stop();
          this.linkInterceptor.stop();
          this.formSubmitObserver.stop();
        }
      }
    }, {
      key: "disabledChanged",
      value: function disabledChanged() {
        if (this.loadingStyle == FrameLoadingStyle.eager) {
          _assertClassBrand(_FrameController_brand, this, _loadSourceURL).call(this);
        }
      }
    }, {
      key: "sourceURLChanged",
      value: function sourceURLChanged() {
        if (_assertClassBrand(_FrameController_brand, this, _isIgnoringChangesTo).call(this, "src")) return;
        if (this.element.isConnected) {
          this.complete = false;
        }
        if (this.loadingStyle == FrameLoadingStyle.eager || _classPrivateFieldGet2(_hasBeenLoaded, this)) {
          _assertClassBrand(_FrameController_brand, this, _loadSourceURL).call(this);
        }
      }
    }, {
      key: "sourceURLReloaded",
      value: function sourceURLReloaded() {
        var _this$element = this.element,
          refresh = _this$element.refresh,
          src = _this$element.src;
        _classPrivateFieldSet2(_shouldMorphFrame, this, src && refresh === "morph");
        this.element.removeAttribute("complete");
        this.element.src = null;
        this.element.src = src;
        return this.element.loaded;
      }
    }, {
      key: "loadingStyleChanged",
      value: function loadingStyleChanged() {
        if (this.loadingStyle == FrameLoadingStyle.lazy) {
          this.appearanceObserver.start();
        } else {
          this.appearanceObserver.stop();
          _assertClassBrand(_FrameController_brand, this, _loadSourceURL).call(this);
        }
      }
    }, {
      key: "loadResponse",
      value: function () {
        var _loadResponse = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee37(fetchResponse) {
          var html, _document3, pageSnapshot;
          return _regeneratorRuntime().wrap(function _callee37$(_context37) {
            while (1) switch (_context37.prev = _context37.next) {
              case 0:
                if (fetchResponse.redirected || fetchResponse.succeeded && fetchResponse.isHTML) {
                  this.sourceURL = fetchResponse.response.url;
                }
                _context37.prev = 1;
                _context37.next = 4;
                return fetchResponse.responseHTML;
              case 4:
                html = _context37.sent;
                if (!html) {
                  _context37.next = 15;
                  break;
                }
                _document3 = parseHTMLDocument(html);
                pageSnapshot = PageSnapshot.fromDocument(_document3);
                if (!pageSnapshot.isVisitable) {
                  _context37.next = 13;
                  break;
                }
                _context37.next = 11;
                return _assertClassBrand(_FrameController_brand, this, _loadFrameResponse).call(this, fetchResponse, _document3);
              case 11:
                _context37.next = 15;
                break;
              case 13:
                _context37.next = 15;
                return _assertClassBrand(_FrameController_brand, this, _handleUnvisitableFrameResponse).call(this, fetchResponse);
              case 15:
                _context37.prev = 15;
                _classPrivateFieldSet2(_shouldMorphFrame, this, false);
                this.fetchResponseLoaded = function () {
                  return Promise.resolve();
                };
                return _context37.finish(15);
              case 19:
              case "end":
                return _context37.stop();
            }
          }, _callee37, this, [[1,, 15, 19]]);
        }));
        function loadResponse(_x32) {
          return _loadResponse.apply(this, arguments);
        }
        return loadResponse;
      }() // Appearance observer delegate
    }, {
      key: "elementAppearedInViewport",
      value: function elementAppearedInViewport(element) {
        this.proposeVisitIfNavigatedWithAction(element, getVisitAction(element));
        _assertClassBrand(_FrameController_brand, this, _loadSourceURL).call(this);
      }

      // Form link click observer delegate
    }, {
      key: "willSubmitFormLinkToLocation",
      value: function willSubmitFormLinkToLocation(link) {
        return _assertClassBrand(_FrameController_brand, this, _shouldInterceptNavigation).call(this, link);
      }
    }, {
      key: "submittedFormLinkToLocation",
      value: function submittedFormLinkToLocation(link, _location, form) {
        var frame = _assertClassBrand(_FrameController_brand, this, _findFrameElement2).call(this, link);
        if (frame) form.setAttribute("data-turbo-frame", frame.id);
      }

      // Link interceptor delegate
    }, {
      key: "shouldInterceptLinkClick",
      value: function shouldInterceptLinkClick(element, _location, _event) {
        return _assertClassBrand(_FrameController_brand, this, _shouldInterceptNavigation).call(this, element);
      }
    }, {
      key: "linkClickIntercepted",
      value: function linkClickIntercepted(element, location) {
        _assertClassBrand(_FrameController_brand, this, _navigateFrame).call(this, element, location);
      }

      // Form submit observer delegate
    }, {
      key: "willSubmitForm",
      value: function willSubmitForm(element, submitter) {
        return element.closest("turbo-frame") == this.element && _assertClassBrand(_FrameController_brand, this, _shouldInterceptNavigation).call(this, element, submitter);
      }
    }, {
      key: "formSubmitted",
      value: function formSubmitted(element, submitter) {
        if (this.formSubmission) {
          this.formSubmission.stop();
        }
        this.formSubmission = new FormSubmission(this, element, submitter);
        var fetchRequest = this.formSubmission.fetchRequest;
        this.prepareRequest(fetchRequest);
        this.formSubmission.start();
      }

      // Fetch request delegate
    }, {
      key: "prepareRequest",
      value: function prepareRequest(request) {
        var _this$currentNavigati;
        request.headers["Turbo-Frame"] = this.id;
        if ((_this$currentNavigati = this.currentNavigationElement) !== null && _this$currentNavigati !== void 0 && _this$currentNavigati.hasAttribute("data-turbo-stream")) {
          request.acceptResponseType(StreamMessage.contentType);
        }
      }
    }, {
      key: "requestStarted",
      value: function requestStarted(_request) {
        markAsBusy(this.element);
      }
    }, {
      key: "requestPreventedHandlingResponse",
      value: function requestPreventedHandlingResponse(_request, _response) {
        _classPrivateFieldGet2(_resolveVisitPromise, this).call(this);
      }
    }, {
      key: "requestSucceededWithResponse",
      value: function () {
        var _requestSucceededWithResponse3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee38(request, response) {
          return _regeneratorRuntime().wrap(function _callee38$(_context38) {
            while (1) switch (_context38.prev = _context38.next) {
              case 0:
                _context38.next = 2;
                return this.loadResponse(response);
              case 2:
                _classPrivateFieldGet2(_resolveVisitPromise, this).call(this);
              case 3:
              case "end":
                return _context38.stop();
            }
          }, _callee38, this);
        }));
        function requestSucceededWithResponse(_x33, _x34) {
          return _requestSucceededWithResponse3.apply(this, arguments);
        }
        return requestSucceededWithResponse;
      }()
    }, {
      key: "requestFailedWithResponse",
      value: function () {
        var _requestFailedWithResponse2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee39(request, response) {
          return _regeneratorRuntime().wrap(function _callee39$(_context39) {
            while (1) switch (_context39.prev = _context39.next) {
              case 0:
                _context39.next = 2;
                return this.loadResponse(response);
              case 2:
                _classPrivateFieldGet2(_resolveVisitPromise, this).call(this);
              case 3:
              case "end":
                return _context39.stop();
            }
          }, _callee39, this);
        }));
        function requestFailedWithResponse(_x35, _x36) {
          return _requestFailedWithResponse2.apply(this, arguments);
        }
        return requestFailedWithResponse;
      }()
    }, {
      key: "requestErrored",
      value: function requestErrored(request, error) {
        console.error(error);
        _classPrivateFieldGet2(_resolveVisitPromise, this).call(this);
      }
    }, {
      key: "requestFinished",
      value: function requestFinished(_request) {
        clearBusyState(this.element);
      }

      // Form submission delegate
    }, {
      key: "formSubmissionStarted",
      value: function formSubmissionStarted(_ref9) {
        var formElement = _ref9.formElement;
        markAsBusy(formElement, _assertClassBrand(_FrameController_brand, this, _findFrameElement2).call(this, formElement));
      }
    }, {
      key: "formSubmissionSucceededWithResponse",
      value: function formSubmissionSucceededWithResponse(formSubmission, response) {
        var frame = _assertClassBrand(_FrameController_brand, this, _findFrameElement2).call(this, formSubmission.formElement, formSubmission.submitter);
        frame.delegate.proposeVisitIfNavigatedWithAction(frame, getVisitAction(formSubmission.submitter, formSubmission.formElement, frame));
        frame.delegate.loadResponse(response);
        if (!formSubmission.isSafe) {
          session.clearCache();
        }
      }
    }, {
      key: "formSubmissionFailedWithResponse",
      value: function formSubmissionFailedWithResponse(formSubmission, fetchResponse) {
        this.element.delegate.loadResponse(fetchResponse);
        session.clearCache();
      }
    }, {
      key: "formSubmissionErrored",
      value: function formSubmissionErrored(formSubmission, error) {
        console.error(error);
      }
    }, {
      key: "formSubmissionFinished",
      value: function formSubmissionFinished(_ref10) {
        var formElement = _ref10.formElement;
        clearBusyState(formElement, _assertClassBrand(_FrameController_brand, this, _findFrameElement2).call(this, formElement));
      }

      // View delegate
    }, {
      key: "allowsImmediateRender",
      value: function allowsImmediateRender(_ref11, options) {
        var newFrame = _ref11.element;
        var event = dispatch("turbo:before-frame-render", {
          target: this.element,
          detail: _objectSpread2({
            newFrame: newFrame
          }, options),
          cancelable: true
        });
        var defaultPrevented = event.defaultPrevented,
          render = event.detail.render;
        if (this.view.renderer && render) {
          this.view.renderer.renderElement = render;
        }
        return !defaultPrevented;
      }
    }, {
      key: "viewRenderedSnapshot",
      value: function viewRenderedSnapshot(_snapshot, _isPreview, _renderMethod) {}
    }, {
      key: "preloadOnLoadLinksForView",
      value: function preloadOnLoadLinksForView(element) {
        session.preloadOnLoadLinksForView(element);
      }
    }, {
      key: "viewInvalidated",
      value: function viewInvalidated() {}

      // Frame renderer delegate
    }, {
      key: "willRenderFrame",
      value: function willRenderFrame(currentElement, _newElement) {
        this.previousFrameElement = currentElement.cloneNode(true);
      }
    }, {
      key: "proposeVisitIfNavigatedWithAction",
      value: function proposeVisitIfNavigatedWithAction(frame) {
        var _this42 = this;
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        this.action = action;
        if (this.action) {
          var pageSnapshot = PageSnapshot.fromElement(frame).clone();
          var visitCachedSnapshot = frame.delegate.visitCachedSnapshot;
          frame.delegate.fetchResponseLoaded = /*#__PURE__*/function () {
            var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee40(fetchResponse) {
              var statusCode, redirected, responseHTML, response, options;
              return _regeneratorRuntime().wrap(function _callee40$(_context40) {
                while (1) switch (_context40.prev = _context40.next) {
                  case 0:
                    if (!frame.src) {
                      _context40.next = 9;
                      break;
                    }
                    statusCode = fetchResponse.statusCode, redirected = fetchResponse.redirected;
                    _context40.next = 4;
                    return fetchResponse.responseHTML;
                  case 4:
                    responseHTML = _context40.sent;
                    response = {
                      statusCode: statusCode,
                      redirected: redirected,
                      responseHTML: responseHTML
                    };
                    options = {
                      response: response,
                      visitCachedSnapshot: visitCachedSnapshot,
                      willRender: false,
                      updateHistory: false,
                      restorationIdentifier: _this42.restorationIdentifier,
                      snapshot: pageSnapshot
                    };
                    if (_this42.action) options.action = _this42.action;
                    session.visit(frame.src, options);
                  case 9:
                  case "end":
                    return _context40.stop();
                }
              }, _callee40);
            }));
            return function (_x37) {
              return _ref12.apply(this, arguments);
            };
          }();
        }
      }
    }, {
      key: "changeHistory",
      value: function changeHistory() {
        if (this.action) {
          var method = getHistoryMethodForAction(this.action);
          session.history.update(method, expandURL(this.element.src || ""), this.restorationIdentifier);
        }
      }
    }, {
      key: "extractForeignFrameElement",
      value: function () {
        var _extractForeignFrameElement = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee41(container) {
          var element, id;
          return _regeneratorRuntime().wrap(function _callee41$(_context41) {
            while (1) switch (_context41.prev = _context41.next) {
              case 0:
                id = CSS.escape(this.id);
                _context41.prev = 1;
                element = activateElement(container.querySelector("turbo-frame#".concat(id)), this.sourceURL);
                if (!element) {
                  _context41.next = 5;
                  break;
                }
                return _context41.abrupt("return", element);
              case 5:
                element = activateElement(container.querySelector("turbo-frame[src][recurse~=".concat(id, "]")), this.sourceURL);
                if (!element) {
                  _context41.next = 12;
                  break;
                }
                _context41.next = 9;
                return element.loaded;
              case 9:
                _context41.next = 11;
                return this.extractForeignFrameElement(element);
              case 11:
                return _context41.abrupt("return", _context41.sent);
              case 12:
                _context41.next = 18;
                break;
              case 14:
                _context41.prev = 14;
                _context41.t0 = _context41["catch"](1);
                console.error(_context41.t0);
                return _context41.abrupt("return", new FrameElement());
              case 18:
                return _context41.abrupt("return", null);
              case 19:
              case "end":
                return _context41.stop();
            }
          }, _callee41, this, [[1, 14]]);
        }));
        function extractForeignFrameElement(_x38) {
          return _extractForeignFrameElement.apply(this, arguments);
        }
        return extractForeignFrameElement;
      }()
    }, {
      key: "id",
      get:
      // Computed properties

      function get() {
        return this.element.id;
      }
    }, {
      key: "enabled",
      get: function get() {
        return !this.element.disabled;
      }
    }, {
      key: "sourceURL",
      get: function get() {
        if (this.element.src) {
          return this.element.src;
        }
      },
      set: function set(sourceURL) {
        var _this43 = this;
        _assertClassBrand(_FrameController_brand, this, _ignoringChangesToAttribute).call(this, "src", function () {
          _this43.element.src = sourceURL !== null && sourceURL !== void 0 ? sourceURL : null;
        });
      }
    }, {
      key: "loadingStyle",
      get: function get() {
        return this.element.loading;
      }
    }, {
      key: "isLoading",
      get: function get() {
        return this.formSubmission !== undefined || _classPrivateFieldGet2(_resolveVisitPromise, this).call(this) !== undefined;
      }
    }, {
      key: "complete",
      get: function get() {
        return this.element.hasAttribute("complete");
      },
      set: function set(value) {
        if (value) {
          this.element.setAttribute("complete", "");
        } else {
          this.element.removeAttribute("complete");
        }
      }
    }, {
      key: "isActive",
      get: function get() {
        return this.element.isActive && _classPrivateFieldGet2(_connected, this);
      }
    }, {
      key: "rootLocation",
      get: function get() {
        var _meta$content;
        var meta = this.element.ownerDocument.querySelector("meta[name=\"turbo-root\"]");
        var root = (_meta$content = meta === null || meta === void 0 ? void 0 : meta.content) !== null && _meta$content !== void 0 ? _meta$content : "/";
        return expandURL(root);
      }
    }]);
  }();
  function _loadSourceURL() {
    return _loadSourceURL2.apply(this, arguments);
  }
  function _loadSourceURL2() {
    _loadSourceURL2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee51() {
      return _regeneratorRuntime().wrap(function _callee51$(_context51) {
        while (1) switch (_context51.prev = _context51.next) {
          case 0:
            if (!(this.enabled && this.isActive && !this.complete && this.sourceURL)) {
              _context51.next = 6;
              break;
            }
            this.element.loaded = _assertClassBrand(_FrameController_brand, this, _visit2).call(this, expandURL(this.sourceURL));
            this.appearanceObserver.stop();
            _context51.next = 5;
            return this.element.loaded;
          case 5:
            _classPrivateFieldSet2(_hasBeenLoaded, this, true);
          case 6:
          case "end":
            return _context51.stop();
        }
      }, _callee51, this);
    }));
    return _loadSourceURL2.apply(this, arguments);
  }
  // Private
  function _loadFrameResponse(_x41, _x42) {
    return _loadFrameResponse2.apply(this, arguments);
  }
  function _loadFrameResponse2() {
    _loadFrameResponse2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee52(fetchResponse, document) {
      var newFrameElement, rendererClass, snapshot, renderer;
      return _regeneratorRuntime().wrap(function _callee52$(_context52) {
        while (1) switch (_context52.prev = _context52.next) {
          case 0:
            _context52.next = 2;
            return this.extractForeignFrameElement(document.body);
          case 2:
            newFrameElement = _context52.sent;
            rendererClass = _classPrivateFieldGet2(_shouldMorphFrame, this) ? MorphingFrameRenderer : FrameRenderer;
            if (!newFrameElement) {
              _context52.next = 20;
              break;
            }
            snapshot = new Snapshot(newFrameElement);
            renderer = new rendererClass(this, this.view.snapshot, snapshot, false, false);
            if (!this.view.renderPromise) {
              _context52.next = 10;
              break;
            }
            _context52.next = 10;
            return this.view.renderPromise;
          case 10:
            this.changeHistory();
            _context52.next = 13;
            return this.view.render(renderer);
          case 13:
            this.complete = true;
            session.frameRendered(fetchResponse, this.element);
            session.frameLoaded(this.element);
            _context52.next = 18;
            return this.fetchResponseLoaded(fetchResponse);
          case 18:
            _context52.next = 21;
            break;
          case 20:
            if (_assertClassBrand(_FrameController_brand, this, _willHandleFrameMissingFromResponse).call(this, fetchResponse)) {
              _assertClassBrand(_FrameController_brand, this, _handleFrameMissingFromResponse).call(this, fetchResponse);
            }
          case 21:
          case "end":
            return _context52.stop();
        }
      }, _callee52, this);
    }));
    return _loadFrameResponse2.apply(this, arguments);
  }
  function _visit2(_x43) {
    return _visit3.apply(this, arguments);
  }
  function _visit3() {
    _visit3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee53(url) {
      var _classPrivateFieldGet2$1,
        _this55 = this;
      var request;
      return _regeneratorRuntime().wrap(function _callee53$(_context53) {
        while (1) switch (_context53.prev = _context53.next) {
          case 0:
            request = new FetchRequest(this, FetchMethod.get, url, new URLSearchParams(), this.element);
            (_classPrivateFieldGet2$1 = _classPrivateFieldGet2(_currentFetchRequest, this)) === null || _classPrivateFieldGet2$1 === void 0 || _classPrivateFieldGet2$1.cancel();
            _classPrivateFieldSet2(_currentFetchRequest, this, request);
            return _context53.abrupt("return", new Promise(function (resolve) {
              _classPrivateFieldSet2(_resolveVisitPromise, _this55, function () {
                _classPrivateFieldSet2(_resolveVisitPromise, _this55, function () {});
                _classPrivateFieldSet2(_currentFetchRequest, _this55, null);
                resolve();
              });
              request.perform();
            }));
          case 4:
          case "end":
            return _context53.stop();
        }
      }, _callee53, this);
    }));
    return _visit3.apply(this, arguments);
  }
  function _navigateFrame(element, url, submitter) {
    var frame = _assertClassBrand(_FrameController_brand, this, _findFrameElement2).call(this, element, submitter);
    frame.delegate.proposeVisitIfNavigatedWithAction(frame, getVisitAction(submitter, element, frame));
    _assertClassBrand(_FrameController_brand, this, _withCurrentNavigationElement).call(this, element, function () {
      frame.src = url;
    });
  }
  function _handleUnvisitableFrameResponse(_x44) {
    return _handleUnvisitableFrameResponse2.apply(this, arguments);
  }
  function _handleUnvisitableFrameResponse2() {
    _handleUnvisitableFrameResponse2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee54(fetchResponse) {
      return _regeneratorRuntime().wrap(function _callee54$(_context54) {
        while (1) switch (_context54.prev = _context54.next) {
          case 0:
            console.warn("The response (".concat(fetchResponse.statusCode, ") from <turbo-frame id=\"").concat(this.element.id, "\"> is performing a full page visit due to turbo-visit-control."));
            _context54.next = 3;
            return _assertClassBrand(_FrameController_brand, this, _visitResponse).call(this, fetchResponse.response);
          case 3:
          case "end":
            return _context54.stop();
        }
      }, _callee54, this);
    }));
    return _handleUnvisitableFrameResponse2.apply(this, arguments);
  }
  function _willHandleFrameMissingFromResponse(fetchResponse) {
    var _this53 = this;
    this.element.setAttribute("complete", "");
    var response = fetchResponse.response;
    var visit = /*#__PURE__*/function () {
      var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee49(url, options) {
        return _regeneratorRuntime().wrap(function _callee49$(_context49) {
          while (1) switch (_context49.prev = _context49.next) {
            case 0:
              if (url instanceof Response) {
                _assertClassBrand(_FrameController_brand, _this53, _visitResponse).call(_this53, url);
              } else {
                session.visit(url, options);
              }
            case 1:
            case "end":
              return _context49.stop();
          }
        }, _callee49);
      }));
      return function visit(_x45, _x46) {
        return _ref18.apply(this, arguments);
      };
    }();
    var event = dispatch("turbo:frame-missing", {
      target: this.element,
      detail: {
        response: response,
        visit: visit
      },
      cancelable: true
    });
    return !event.defaultPrevented;
  }
  function _handleFrameMissingFromResponse(fetchResponse) {
    this.view.missing();
    _assertClassBrand(_FrameController_brand, this, _throwFrameMissingError).call(this, fetchResponse);
  }
  function _throwFrameMissingError(fetchResponse) {
    var message = "The response (".concat(fetchResponse.statusCode, ") did not contain the expected <turbo-frame id=\"").concat(this.element.id, "\"> and will be ignored. To perform a full page visit instead, set turbo-visit-control to reload.");
    throw new TurboFrameMissingError(message);
  }
  function _visitResponse(_x47) {
    return _visitResponse2.apply(this, arguments);
  }
  function _visitResponse2() {
    _visitResponse2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee55(response) {
      var wrapped, responseHTML, location, redirected, statusCode;
      return _regeneratorRuntime().wrap(function _callee55$(_context55) {
        while (1) switch (_context55.prev = _context55.next) {
          case 0:
            wrapped = new FetchResponse(response);
            _context55.next = 3;
            return wrapped.responseHTML;
          case 3:
            responseHTML = _context55.sent;
            location = wrapped.location, redirected = wrapped.redirected, statusCode = wrapped.statusCode;
            return _context55.abrupt("return", session.visit(location, {
              response: {
                redirected: redirected,
                statusCode: statusCode,
                responseHTML: responseHTML
              }
            }));
          case 6:
          case "end":
            return _context55.stop();
        }
      }, _callee55);
    }));
    return _visitResponse2.apply(this, arguments);
  }
  function _findFrameElement2(element, submitter) {
    var _getFrameElementById;
    var id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");
    return (_getFrameElementById = getFrameElementById(id)) !== null && _getFrameElementById !== void 0 ? _getFrameElementById : this.element;
  }
  function _formActionIsVisitable(form, submitter) {
    var action = getAction$1(form, submitter);
    return locationIsVisitable(expandURL(action), this.rootLocation);
  }
  function _shouldInterceptNavigation(element, submitter) {
    var id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");
    if (element instanceof HTMLFormElement && !_assertClassBrand(_FrameController_brand, this, _formActionIsVisitable).call(this, element, submitter)) {
      return false;
    }
    if (!this.enabled || id == "_top") {
      return false;
    }
    if (id) {
      var frameElement = getFrameElementById(id);
      if (frameElement) {
        return !frameElement.disabled;
      }
    }
    if (!session.elementIsNavigatable(element)) {
      return false;
    }
    if (submitter && !session.elementIsNavigatable(submitter)) {
      return false;
    }
    return true;
  }
  function _isIgnoringChangesTo(attributeName) {
    return _classPrivateFieldGet2(_ignoredAttributes, this).has(attributeName);
  }
  function _ignoringChangesToAttribute(attributeName, callback) {
    _classPrivateFieldGet2(_ignoredAttributes, this).add(attributeName);
    callback();
    _classPrivateFieldGet2(_ignoredAttributes, this)["delete"](attributeName);
  }
  function _withCurrentNavigationElement(element, callback) {
    this.currentNavigationElement = element;
    callback();
    delete this.currentNavigationElement;
  }
  function getFrameElementById(id) {
    if (id != null) {
      var element = document.getElementById(id);
      if (element instanceof FrameElement) {
        return element;
      }
    }
  }
  function activateElement(element, currentURL) {
    if (element) {
      var src = element.getAttribute("src");
      if (src != null && currentURL != null && urlsAreEqual(src, currentURL)) {
        throw new Error("Matching <turbo-frame id=\"".concat(element.id, "\"> element has a source URL which references itself"));
      }
      if (element.ownerDocument !== document) {
        element = document.importNode(element, true);
      }
      if (element instanceof FrameElement) {
        element.connectedCallback();
        element.disconnectedCallback();
        return element;
      }
    }
  }
  var StreamActions = {
    after: function after() {
      var _this44 = this;
      this.targetElements.forEach(function (e) {
        var _e$parentElement;
        return (_e$parentElement = e.parentElement) === null || _e$parentElement === void 0 ? void 0 : _e$parentElement.insertBefore(_this44.templateContent, e.nextSibling);
      });
    },
    append: function append() {
      var _this45 = this;
      this.removeDuplicateTargetChildren();
      this.targetElements.forEach(function (e) {
        return e.append(_this45.templateContent);
      });
    },
    before: function before() {
      var _this46 = this;
      this.targetElements.forEach(function (e) {
        var _e$parentElement2;
        return (_e$parentElement2 = e.parentElement) === null || _e$parentElement2 === void 0 ? void 0 : _e$parentElement2.insertBefore(_this46.templateContent, e);
      });
    },
    prepend: function prepend() {
      var _this47 = this;
      this.removeDuplicateTargetChildren();
      this.targetElements.forEach(function (e) {
        return e.prepend(_this47.templateContent);
      });
    },
    remove: function remove() {
      this.targetElements.forEach(function (e) {
        return e.remove();
      });
    },
    replace: function replace() {
      var _this48 = this;
      var method = this.getAttribute("method");
      this.targetElements.forEach(function (targetElement) {
        if (method === "morph") {
          morphElements(targetElement, _this48.templateContent);
        } else {
          targetElement.replaceWith(_this48.templateContent);
        }
      });
    },
    update: function update() {
      var _this49 = this;
      var method = this.getAttribute("method");
      this.targetElements.forEach(function (targetElement) {
        if (method === "morph") {
          morphChildren(targetElement, _this49.templateContent);
        } else {
          targetElement.innerHTML = "";
          targetElement.append(_this49.templateContent);
        }
      });
    },
    refresh: function refresh() {
      session.refresh(this.baseURI, this.requestId);
    }
  };

  // <turbo-stream action=replace target=id><template>...

  /**
   * Renders updates to the page from a stream of messages.
   *
   * Using the `action` attribute, this can be configured one of eight ways:
   *
   * - `after` - inserts the result after the target
   * - `append` - appends the result to the target
   * - `before` - inserts the result before the target
   * - `prepend` - prepends the result to the target
   * - `refresh` - initiates a page refresh
   * - `remove` - removes the target
   * - `replace` - replaces the outer HTML of the target
   * - `update` - replaces the inner HTML of the target
   *
   * @customElement turbo-stream
   * @example
   *   <turbo-stream action="append" target="dom_id">
   *     <template>
   *       Content to append to target designated with the dom_id.
   *     </template>
   *   </turbo-stream>
   */
  var _StreamElement_brand = /*#__PURE__*/new WeakSet();
  var StreamElement = /*#__PURE__*/function (_HTMLElement2) {
    function StreamElement() {
      var _this50;
      _classCallCheck(this, StreamElement);
      for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }
      _this50 = _callSuper(this, StreamElement, [].concat(args));
      _classPrivateMethodInitSpec(_this50, _StreamElement_brand);
      return _this50;
    }
    _inherits(StreamElement, _HTMLElement2);
    return _createClass(StreamElement, [{
      key: "connectedCallback",
      value: function () {
        var _connectedCallback = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee42() {
          return _regeneratorRuntime().wrap(function _callee42$(_context42) {
            while (1) switch (_context42.prev = _context42.next) {
              case 0:
                _context42.prev = 0;
                _context42.next = 3;
                return this.render();
              case 3:
                _context42.next = 8;
                break;
              case 5:
                _context42.prev = 5;
                _context42.t0 = _context42["catch"](0);
                console.error(_context42.t0);
              case 8:
                _context42.prev = 8;
                this.disconnect();
                return _context42.finish(8);
              case 11:
              case "end":
                return _context42.stop();
            }
          }, _callee42, this, [[0, 5, 8, 11]]);
        }));
        function connectedCallback() {
          return _connectedCallback.apply(this, arguments);
        }
        return connectedCallback;
      }()
    }, {
      key: "render",
      value: function () {
        var _render6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee44() {
          var _this$renderPromise,
            _this51 = this;
          return _regeneratorRuntime().wrap(function _callee44$(_context44) {
            while (1) switch (_context44.prev = _context44.next) {
              case 0:
                return _context44.abrupt("return", (_this$renderPromise = this.renderPromise) !== null && _this$renderPromise !== void 0 ? _this$renderPromise : this.renderPromise = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee43() {
                  var event;
                  return _regeneratorRuntime().wrap(function _callee43$(_context43) {
                    while (1) switch (_context43.prev = _context43.next) {
                      case 0:
                        event = _this51.beforeRenderEvent;
                        if (!_this51.dispatchEvent(event)) {
                          _context43.next = 6;
                          break;
                        }
                        _context43.next = 4;
                        return nextRepaint();
                      case 4:
                        _context43.next = 6;
                        return event.detail.render(_this51);
                      case 6:
                      case "end":
                        return _context43.stop();
                    }
                  }, _callee43);
                }))());
              case 1:
              case "end":
                return _context44.stop();
            }
          }, _callee44, this);
        }));
        function render() {
          return _render6.apply(this, arguments);
        }
        return render;
      }()
    }, {
      key: "disconnect",
      value: function disconnect() {
        try {
          this.remove();
          // eslint-disable-next-line no-empty
        } catch (_unused) {}
      }

      /**
       * Removes duplicate children (by ID)
       */
    }, {
      key: "removeDuplicateTargetChildren",
      value: function removeDuplicateTargetChildren() {
        this.duplicateChildren.forEach(function (c) {
          return c.remove();
        });
      }

      /**
       * Gets the list of duplicate children (i.e. those with the same ID)
       */
    }, {
      key: "duplicateChildren",
      get: function get() {
        var _this$templateContent;
        var existingChildren = this.targetElements.flatMap(function (e) {
          return _toConsumableArray(e.children);
        }).filter(function (c) {
          return !!c.id;
        });
        var newChildrenIds = _toConsumableArray(((_this$templateContent = this.templateContent) === null || _this$templateContent === void 0 ? void 0 : _this$templateContent.children) || []).filter(function (c) {
          return !!c.id;
        }).map(function (c) {
          return c.id;
        });
        return existingChildren.filter(function (c) {
          return newChildrenIds.includes(c.id);
        });
      }

      /**
       * Gets the action function to be performed.
       */
    }, {
      key: "performAction",
      get: function get() {
        if (this.action) {
          var actionFunction = StreamActions[this.action];
          if (actionFunction) {
            return actionFunction;
          }
          _assertClassBrand(_StreamElement_brand, this, _raise).call(this, "unknown action");
        }
        _assertClassBrand(_StreamElement_brand, this, _raise).call(this, "action attribute is missing");
      }

      /**
       * Gets the target elements which the template will be rendered to.
       */
    }, {
      key: "targetElements",
      get: function get() {
        if (this.target) {
          return this.targetElementsById;
        } else if (this.targets) {
          return this.targetElementsByQuery;
        } else {
          _assertClassBrand(_StreamElement_brand, this, _raise).call(this, "target or targets attribute is missing");
        }
      }

      /**
       * Gets the contents of the main `<template>`.
       */
    }, {
      key: "templateContent",
      get: function get() {
        return this.templateElement.content.cloneNode(true);
      }

      /**
       * Gets the main `<template>` used for rendering
       */
    }, {
      key: "templateElement",
      get: function get() {
        if (this.firstElementChild === null) {
          var template = this.ownerDocument.createElement("template");
          this.appendChild(template);
          return template;
        } else if (this.firstElementChild instanceof HTMLTemplateElement) {
          return this.firstElementChild;
        }
        _assertClassBrand(_StreamElement_brand, this, _raise).call(this, "first child element must be a <template> element");
      }

      /**
       * Gets the current action.
       */
    }, {
      key: "action",
      get: function get() {
        return this.getAttribute("action");
      }

      /**
       * Gets the current target (an element ID) to which the result will
       * be rendered.
       */
    }, {
      key: "target",
      get: function get() {
        return this.getAttribute("target");
      }

      /**
       * Gets the current "targets" selector (a CSS selector)
       */
    }, {
      key: "targets",
      get: function get() {
        return this.getAttribute("targets");
      }

      /**
       * Reads the request-id attribute
       */
    }, {
      key: "requestId",
      get: function get() {
        return this.getAttribute("request-id");
      }
    }, {
      key: "description",
      get: function get() {
        var _2, _this$outerHTML$match;
        return (_2 = ((_this$outerHTML$match = this.outerHTML.match(/<[^>]+>/)) !== null && _this$outerHTML$match !== void 0 ? _this$outerHTML$match : [])[0]) !== null && _2 !== void 0 ? _2 : "<turbo-stream>";
      }
    }, {
      key: "beforeRenderEvent",
      get: function get() {
        return new CustomEvent("turbo:before-stream-render", {
          bubbles: true,
          cancelable: true,
          detail: {
            newStream: this,
            render: StreamElement.renderElement
          }
        });
      }
    }, {
      key: "targetElementsById",
      get: function get() {
        var _this$ownerDocument2;
        var element = (_this$ownerDocument2 = this.ownerDocument) === null || _this$ownerDocument2 === void 0 ? void 0 : _this$ownerDocument2.getElementById(this.target);
        if (element !== null) {
          return [element];
        } else {
          return [];
        }
      }
    }, {
      key: "targetElementsByQuery",
      get: function get() {
        var _this$ownerDocument3;
        var elements = (_this$ownerDocument3 = this.ownerDocument) === null || _this$ownerDocument3 === void 0 ? void 0 : _this$ownerDocument3.querySelectorAll(this.targets);
        if (elements.length !== 0) {
          return Array.prototype.slice.call(elements);
        } else {
          return [];
        }
      }
    }], [{
      key: "renderElement",
      value: function () {
        var _renderElement = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee45(newElement) {
          return _regeneratorRuntime().wrap(function _callee45$(_context45) {
            while (1) switch (_context45.prev = _context45.next) {
              case 0:
                _context45.next = 2;
                return newElement.performAction();
              case 2:
              case "end":
                return _context45.stop();
            }
          }, _callee45);
        }));
        function renderElement(_x39) {
          return _renderElement.apply(this, arguments);
        }
        return renderElement;
      }()
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
  function _raise(message) {
    throw new Error("".concat(this.description, ": ").concat(message));
  }
  var StreamSourceElement = /*#__PURE__*/function (_HTMLElement3) {
    function StreamSourceElement() {
      var _this52;
      _classCallCheck(this, StreamSourceElement);
      for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
      }
      _this52 = _callSuper(this, StreamSourceElement, [].concat(args));
      _defineProperty(_this52, "streamSource", null);
      return _this52;
    }
    _inherits(StreamSourceElement, _HTMLElement3);
    return _createClass(StreamSourceElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.streamSource = this.src.match(/^ws{1,2}:/) ? new WebSocket(this.src) : new EventSource(this.src);
        connectStreamSource(this.streamSource);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (this.streamSource) {
          this.streamSource.close();
          disconnectStreamSource(this.streamSource);
        }
      }
    }, {
      key: "src",
      get: function get() {
        return this.getAttribute("src") || "";
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
  FrameElement.delegateConstructor = FrameController;
  if (customElements.get("turbo-frame") === undefined) {
    customElements.define("turbo-frame", FrameElement);
  }
  if (customElements.get("turbo-stream") === undefined) {
    customElements.define("turbo-stream", StreamElement);
  }
  if (customElements.get("turbo-stream-source") === undefined) {
    customElements.define("turbo-stream-source", StreamSourceElement);
  }
  (function () {
    var element = document.currentScript;
    if (!element) return;
    if (element.hasAttribute("data-turbo-suppress-warning")) return;
    element = element.parentElement;
    while (element) {
      if (element == document.body) {
        return console.warn(unindent(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        You are loading Turbo from a <script> element inside the <body> element. This is probably not what you meant to do!\n\n        Load your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\n        For more information, see: https://turbo.hotwired.dev/handbook/building#working-with-script-elements\n\n        \u2014\u2014\n        Suppress this warning by adding a \"data-turbo-suppress-warning\" attribute to: %s\n      "]))), element.outerHTML);
      }
      element = element.parentElement;
    }
  })();
  window.Turbo = _objectSpread2(_objectSpread2({}, Turbo), {}, {
    StreamActions: StreamActions
  });
  start();

  var Turbo$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FetchEnctype: FetchEnctype,
    FetchMethod: FetchMethod,
    FetchRequest: FetchRequest,
    FetchResponse: FetchResponse,
    FrameElement: FrameElement,
    FrameLoadingStyle: FrameLoadingStyle,
    FrameRenderer: FrameRenderer,
    PageRenderer: PageRenderer,
    PageSnapshot: PageSnapshot,
    StreamActions: StreamActions,
    StreamElement: StreamElement,
    StreamSourceElement: StreamSourceElement,
    cache: cache,
    clearCache: clearCache,
    config: config,
    connectStreamSource: connectStreamSource,
    disconnectStreamSource: disconnectStreamSource,
    fetch: fetchWithTurboHeaders,
    fetchEnctypeFromString: fetchEnctypeFromString,
    fetchMethodFromString: fetchMethodFromString,
    isSafe: isSafe,
    navigator: navigator$1,
    registerAdapter: registerAdapter,
    renderStreamMessage: renderStreamMessage,
    session: session,
    setConfirmMethod: setConfirmMethod,
    setFormMode: setFormMode,
    setProgressBarDelay: setProgressBarDelay,
    start: start,
    visit: visit
  });

  var consumer;
  function getConsumer() {
    return _getConsumer.apply(this, arguments);
  }
  function _getConsumer() {
    _getConsumer = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", consumer || setConsumer(createConsumer$1().then(setConsumer)));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _getConsumer.apply(this, arguments);
  }
  function setConsumer(newConsumer) {
    return consumer = newConsumer;
  }
  function createConsumer$1() {
    return _createConsumer.apply(this, arguments);
  }
  function _createConsumer() {
    _createConsumer = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var _yield$import, createConsumer;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Promise.resolve().then(function () { return index; });
          case 2:
            _yield$import = _context2.sent;
            createConsumer = _yield$import.createConsumer;
            return _context2.abrupt("return", createConsumer());
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _createConsumer.apply(this, arguments);
  }
  function subscribeTo(_x, _x2) {
    return _subscribeTo.apply(this, arguments);
  }
  function _subscribeTo() {
    _subscribeTo = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(channel, mixin) {
      var _yield$getConsumer, subscriptions;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getConsumer();
          case 2:
            _yield$getConsumer = _context3.sent;
            subscriptions = _yield$getConsumer.subscriptions;
            return _context3.abrupt("return", subscriptions.create(channel, mixin));
          case 5:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return _subscribeTo.apply(this, arguments);
  }

  // Based on https://github.com/nathan7/snakeize
  //
  // This software is released under the MIT license:
  // Permission is hereby granted, free of charge, to any person obtaining a copy of
  // this software and associated documentation files (the "Software"), to deal in
  // the Software without restriction, including without limitation the rights to
  // use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
  // the Software, and to permit persons to whom the Software is furnished to do so,
  // subject to the following conditions:

  // The above copyright notice and this permission notice shall be included in all
  // copies or substantial portions of the Software.

  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
  // FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  // COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
  // IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  // CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  function walk(obj) {
    if (!obj || _typeof(obj) !== 'object') return obj;
    if (obj instanceof Date || obj instanceof RegExp) return obj;
    if (Array.isArray(obj)) return obj.map(walk);
    return Object.keys(obj).reduce(function (acc, key) {
      var camel = key[0].toLowerCase() + key.slice(1).replace(/([A-Z]+)/g, function (m, x) {
        return '_' + x.toLowerCase();
      });
      acc[camel] = walk(obj[key]);
      return acc;
    }, {});
  }

  var TurboCableStreamSourceElement = /*#__PURE__*/function (_HTMLElement) {
    function TurboCableStreamSourceElement() {
      _classCallCheck(this, TurboCableStreamSourceElement);
      return _callSuper(this, TurboCableStreamSourceElement, arguments);
    }
    _inherits(TurboCableStreamSourceElement, _HTMLElement);
    return _createClass(TurboCableStreamSourceElement, [{
      key: "connectedCallback",
      value: function () {
        var _connectedCallback = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                connectStreamSource(this);
                _context.next = 3;
                return subscribeTo(this.channel, {
                  received: this.dispatchMessageEvent.bind(this),
                  connected: this.subscriptionConnected.bind(this),
                  disconnected: this.subscriptionDisconnected.bind(this)
                });
              case 3:
                this.subscription = _context.sent;
              case 4:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function connectedCallback() {
          return _connectedCallback.apply(this, arguments);
        }
        return connectedCallback;
      }()
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        disconnectStreamSource(this);
        if (this.subscription) this.subscription.unsubscribe();
        this.subscriptionDisconnected();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback() {
        if (this.subscription) {
          this.disconnectedCallback();
          this.connectedCallback();
        }
      }
    }, {
      key: "dispatchMessageEvent",
      value: function dispatchMessageEvent(data) {
        var event = new MessageEvent("message", {
          data: data
        });
        return this.dispatchEvent(event);
      }
    }, {
      key: "subscriptionConnected",
      value: function subscriptionConnected() {
        this.setAttribute("connected", "");
      }
    }, {
      key: "subscriptionDisconnected",
      value: function subscriptionDisconnected() {
        this.removeAttribute("connected");
      }
    }, {
      key: "channel",
      get: function get() {
        var channel = this.getAttribute("channel");
        var signed_stream_name = this.getAttribute("signed-stream-name");
        return _objectSpread2({
          channel: channel,
          signed_stream_name: signed_stream_name
        }, walk(_objectSpread2({}, this.dataset)));
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
  _defineProperty(TurboCableStreamSourceElement, "observedAttributes", ["channel", "signed-stream-name"]);
  if (customElements.get("turbo-cable-stream-source") === undefined) {
    customElements.define("turbo-cable-stream-source", TurboCableStreamSourceElement);
  }

  function encodeMethodIntoRequestBody(event) {
    if (event.target instanceof HTMLFormElement) {
      var form = event.target,
        fetchOptions = event.detail.fetchOptions;
      form.addEventListener("turbo:submit-start", function (_ref) {
        var submitter = _ref.detail.formSubmission.submitter;
        var body = isBodyInit(fetchOptions.body) ? fetchOptions.body : new URLSearchParams();
        var method = determineFetchMethod(submitter, body, form);
        if (!/get/i.test(method)) {
          if (/post/i.test(method)) {
            body["delete"]("_method");
          } else {
            body.set("_method", method);
          }
          fetchOptions.method = "post";
        }
      }, {
        once: true
      });
    }
  }
  function determineFetchMethod(submitter, body, form) {
    var formMethod = determineFormMethod(submitter);
    var overrideMethod = body.get("_method");
    var method = form.getAttribute("method") || "get";
    if (typeof formMethod == "string") {
      return formMethod;
    } else if (typeof overrideMethod == "string") {
      return overrideMethod;
    } else {
      return method;
    }
  }
  function determineFormMethod(submitter) {
    if (submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement) {
      // Rails 7 ActionView::Helpers::FormBuilder#button method has an override
      // for formmethod if the button does not have name or value attributes
      // set, which is the default. This means that if you use <%= f.button
      // formmethod: :delete %>, it will generate a <button name="_method"
      // value="delete" formmethod="post">. Therefore, if the submitter's name
      // is already _method, it's value attribute already contains the desired
      // method.
      if (submitter.name === '_method') {
        return submitter.value;
      } else if (submitter.hasAttribute("formmethod")) {
        return submitter.formMethod;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  function isBodyInit(body) {
    return body instanceof FormData || body instanceof URLSearchParams;
  }

  window.Turbo = Turbo$1;
  addEventListener("turbo:before-fetch-request", encodeMethodIntoRequestBody);

  function log() {
    if (PulseWire.config.loggingEnabled) {
      var _console;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      (_console = console).log.apply(_console, ["[pulse_wire]"].concat(args));
    }
  }

  var _CssReloader_brand = /*#__PURE__*/new WeakSet();
  var CssReloader = /*#__PURE__*/function () {
    function CssReloader(filePattern) {
      _classCallCheck(this, CssReloader);
      _classPrivateMethodInitSpec(this, _CssReloader_brand);
      this.filePattern = filePattern;
    }
    return _createClass(CssReloader, [{
      key: "reload",
      value: function () {
        var _reload = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                log("Reload css...");
                _context.next = 3;
                return Promise.all(_assertClassBrand(_CssReloader_brand, this, _reloadAllLinks).call(this));
              case 3:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function reload() {
          return _reload.apply(this, arguments);
        }
        return reload;
      }()
    }], [{
      key: "reload",
      value: function () {
        var _reload2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var _len,
            params,
            _key,
            _args2 = arguments;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                for (_len = _args2.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
                  params[_key] = _args2[_key];
                }
                return _context2.abrupt("return", _construct(CssReloader, params).reload());
              case 2:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        function reload() {
          return _reload2.apply(this, arguments);
        }
        return reload;
      }()
    }]);
  }();
  function _reloadAllLinks() {
    var _this2 = this;
    return Array.from(_classPrivateGetter(_CssReloader_brand, this, _get_cssLinks)).map(function (link) {
      return _assertClassBrand(_CssReloader_brand, _this2, _reloadLinkIfNeeded).call(_this2, link);
    });
  }
  function _get_cssLinks(_this) {
    return document.querySelectorAll("link[rel='stylesheet']");
  }
  function _reloadLinkIfNeeded(link) {
    if (_assertClassBrand(_CssReloader_brand, this, _shouldReloadLink).call(this, link)) {
      return _assertClassBrand(_CssReloader_brand, this, _reloadLink).call(this, link);
    } else {
      return Promise.resolve();
    }
  }
  function _shouldReloadLink(link) {
    console.debug("Es", this.filePattern);
    return this.filePattern.test(link.getAttribute("href"));
  }
  function _reloadLink(_x) {
    return _reloadLink2.apply(this, arguments);
  }
  function _reloadLink2() {
    _reloadLink2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(link) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise(function (resolve) {
              var href = link.getAttribute("href");
              var newLink = document.createElement("link");
              newLink.rel = "stylesheet";
              newLink.href = "".concat(href, "?reload=").concat(Date.now());
              newLink.onload = function () {
                log("\t".concat(href));
                resolve();
              };
              link.parentNode.replaceChild(newLink, link);
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return _reloadLink2.apply(this, arguments);
  }

  function nameFromFilePath(path) {
    return path.split("/").pop().split(".")[0];
  }

  StreamActions.reload_css = function () {
    var filePath = nameFromFilePath(this.getAttribute("file_path"));
    CssReloader.reload(new RegExp(filePath));
  };

  // base IIFE to define idiomorph
  var Idiomorph = function () {

    //=============================================================================
    // AND NOW IT BEGINS...
    //=============================================================================
    var EMPTY_SET = new Set();

    // default configuration values, updatable by users now
    var defaults = {
      morphStyle: "outerHTML",
      callbacks: {
        beforeNodeAdded: noOp,
        afterNodeAdded: noOp,
        beforeNodeMorphed: noOp,
        afterNodeMorphed: noOp,
        beforeNodeRemoved: noOp,
        afterNodeRemoved: noOp,
        beforeAttributeUpdated: noOp
      },
      head: {
        style: 'merge',
        shouldPreserve: function shouldPreserve(elt) {
          return elt.getAttribute("im-preserve") === "true";
        },
        shouldReAppend: function shouldReAppend(elt) {
          return elt.getAttribute("im-re-append") === "true";
        },
        shouldRemove: noOp,
        afterHeadMorphed: noOp
      }
    };

    //=============================================================================
    // Core Morphing Algorithm - morph, morphNormalizedContent, morphOldNodeTo, morphChildren
    //=============================================================================
    function morph(oldNode, newContent) {
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (oldNode instanceof Document) {
        oldNode = oldNode.documentElement;
      }
      if (typeof newContent === 'string') {
        newContent = parseContent(newContent);
      }
      var normalizedContent = normalizeContent(newContent);
      var ctx = createMorphContext(oldNode, normalizedContent, config);
      return morphNormalizedContent(oldNode, normalizedContent, ctx);
    }
    function morphNormalizedContent(oldNode, normalizedNewContent, ctx) {
      if (ctx.head.block) {
        var oldHead = oldNode.querySelector('head');
        var newHead = normalizedNewContent.querySelector('head');
        if (oldHead && newHead) {
          var promises = handleHeadElement(newHead, oldHead, ctx);
          // when head promises resolve, call morph again, ignoring the head tag
          Promise.all(promises).then(function () {
            morphNormalizedContent(oldNode, normalizedNewContent, Object.assign(ctx, {
              head: {
                block: false,
                ignore: true
              }
            }));
          });
          return;
        }
      }
      if (ctx.morphStyle === "innerHTML") {
        // innerHTML, so we are only updating the children
        morphChildren(normalizedNewContent, oldNode, ctx);
        return oldNode.children;
      } else if (ctx.morphStyle === "outerHTML" || ctx.morphStyle == null) {
        // otherwise find the best element match in the new content, morph that, and merge its siblings
        // into either side of the best match
        var bestMatch = findBestNodeMatch(normalizedNewContent, oldNode, ctx);

        // stash the siblings that will need to be inserted on either side of the best match
        var previousSibling = bestMatch === null || bestMatch === void 0 ? void 0 : bestMatch.previousSibling;
        var nextSibling = bestMatch === null || bestMatch === void 0 ? void 0 : bestMatch.nextSibling;

        // morph it
        var morphedNode = morphOldNodeTo(oldNode, bestMatch, ctx);
        if (bestMatch) {
          // if there was a best match, merge the siblings in too and return the
          // whole bunch
          return insertSiblings(previousSibling, morphedNode, nextSibling);
        } else {
          // otherwise nothing was added to the DOM
          return [];
        }
      } else {
        throw "Do not understand how to morph style " + ctx.morphStyle;
      }
    }

    /**
     * @param possibleActiveElement
     * @param ctx
     * @returns {boolean}
     */
    function ignoreValueOfActiveElement(possibleActiveElement, ctx) {
      return ctx.ignoreActiveValue && possibleActiveElement === document.activeElement;
    }

    /**
     * @param oldNode root node to merge content into
     * @param newContent new content to merge
     * @param ctx the merge context
     * @returns {Element} the element that ended up in the DOM
     */
    function morphOldNodeTo(oldNode, newContent, ctx) {
      if (ctx.ignoreActive && oldNode === document.activeElement) ; else if (newContent == null) {
        if (ctx.callbacks.beforeNodeRemoved(oldNode) === false) return oldNode;
        oldNode.remove();
        ctx.callbacks.afterNodeRemoved(oldNode);
        return null;
      } else if (!isSoftMatch(oldNode, newContent)) {
        if (ctx.callbacks.beforeNodeRemoved(oldNode) === false) return oldNode;
        if (ctx.callbacks.beforeNodeAdded(newContent) === false) return oldNode;
        oldNode.parentElement.replaceChild(newContent, oldNode);
        ctx.callbacks.afterNodeAdded(newContent);
        ctx.callbacks.afterNodeRemoved(oldNode);
        return newContent;
      } else {
        if (ctx.callbacks.beforeNodeMorphed(oldNode, newContent) === false) return oldNode;
        if (oldNode instanceof HTMLHeadElement && ctx.head.ignore) ; else if (oldNode instanceof HTMLHeadElement && ctx.head.style !== "morph") {
          handleHeadElement(newContent, oldNode, ctx);
        } else {
          syncNodeFrom(newContent, oldNode, ctx);
          if (!ignoreValueOfActiveElement(oldNode, ctx)) {
            morphChildren(newContent, oldNode, ctx);
          }
        }
        ctx.callbacks.afterNodeMorphed(oldNode, newContent);
        return oldNode;
      }
    }

    /**
     * This is the core algorithm for matching up children.  The idea is to use id sets to try to match up
     * nodes as faithfully as possible.  We greedily match, which allows us to keep the algorithm fast, but
     * by using id sets, we are able to better match up with content deeper in the DOM.
     *
     * Basic algorithm is, for each node in the new content:
     *
     * - if we have reached the end of the old parent, append the new content
     * - if the new content has an id set match with the current insertion point, morph
     * - search for an id set match
     * - if id set match found, morph
     * - otherwise search for a "soft" match
     * - if a soft match is found, morph
     * - otherwise, prepend the new node before the current insertion point
     *
     * The two search algorithms terminate if competing node matches appear to outweigh what can be achieved
     * with the current node.  See findIdSetMatch() and findSoftMatch() for details.
     *
     * @param {Element} newParent the parent element of the new content
     * @param {Element } oldParent the old content that we are merging the new content into
     * @param ctx the merge context
     */
    function morphChildren(newParent, oldParent, ctx) {
      var nextNewChild = newParent.firstChild;
      var insertionPoint = oldParent.firstChild;
      var newChild;

      // run through all the new content
      while (nextNewChild) {
        newChild = nextNewChild;
        nextNewChild = newChild.nextSibling;

        // if we are at the end of the exiting parent's children, just append
        if (insertionPoint == null) {
          if (ctx.callbacks.beforeNodeAdded(newChild) === false) return;
          oldParent.appendChild(newChild);
          ctx.callbacks.afterNodeAdded(newChild);
          removeIdsFromConsideration(ctx, newChild);
          continue;
        }

        // if the current node has an id set match then morph
        if (isIdSetMatch(newChild, insertionPoint, ctx)) {
          morphOldNodeTo(insertionPoint, newChild, ctx);
          insertionPoint = insertionPoint.nextSibling;
          removeIdsFromConsideration(ctx, newChild);
          continue;
        }

        // otherwise search forward in the existing old children for an id set match
        var idSetMatch = findIdSetMatch(newParent, oldParent, newChild, insertionPoint, ctx);

        // if we found a potential match, remove the nodes until that point and morph
        if (idSetMatch) {
          insertionPoint = removeNodesBetween(insertionPoint, idSetMatch, ctx);
          morphOldNodeTo(idSetMatch, newChild, ctx);
          removeIdsFromConsideration(ctx, newChild);
          continue;
        }

        // no id set match found, so scan forward for a soft match for the current node
        var softMatch = findSoftMatch(newParent, oldParent, newChild, insertionPoint, ctx);

        // if we found a soft match for the current node, morph
        if (softMatch) {
          insertionPoint = removeNodesBetween(insertionPoint, softMatch, ctx);
          morphOldNodeTo(softMatch, newChild, ctx);
          removeIdsFromConsideration(ctx, newChild);
          continue;
        }

        // abandon all hope of morphing, just insert the new child before the insertion point
        // and move on
        if (ctx.callbacks.beforeNodeAdded(newChild) === false) return;
        oldParent.insertBefore(newChild, insertionPoint);
        ctx.callbacks.afterNodeAdded(newChild);
        removeIdsFromConsideration(ctx, newChild);
      }

      // remove any remaining old nodes that didn't match up with new content
      while (insertionPoint !== null) {
        var tempNode = insertionPoint;
        insertionPoint = insertionPoint.nextSibling;
        removeNode(tempNode, ctx);
      }
    }

    //=============================================================================
    // Attribute Syncing Code
    //=============================================================================

    /**
     * @param attr {String} the attribute to be mutated
     * @param to {Element} the element that is going to be updated
     * @param updateType {("update"|"remove")}
     * @param ctx the merge context
     * @returns {boolean} true if the attribute should be ignored, false otherwise
     */
    function ignoreAttribute(attr, to, updateType, ctx) {
      if (attr === 'value' && ctx.ignoreActiveValue && to === document.activeElement) {
        return true;
      }
      return ctx.callbacks.beforeAttributeUpdated(attr, to, updateType) === false;
    }

    /**
     * syncs a given node with another node, copying over all attributes and
     * inner element state from the 'from' node to the 'to' node
     *
     * @param {Element} from the element to copy attributes & state from
     * @param {Element} to the element to copy attributes & state to
     * @param ctx the merge context
     */
    function syncNodeFrom(from, to, ctx) {
      var type = from.nodeType;

      // if is an element type, sync the attributes from the
      // new node into the new node
      if (type === 1 /* element type */) {
        var fromAttributes = from.attributes;
        var toAttributes = to.attributes;
        var _iterator = _createForOfIteratorHelper(fromAttributes),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var fromAttribute = _step.value;
            if (ignoreAttribute(fromAttribute.name, to, 'update', ctx)) {
              continue;
            }
            if (to.getAttribute(fromAttribute.name) !== fromAttribute.value) {
              to.setAttribute(fromAttribute.name, fromAttribute.value);
            }
          }
          // iterate backwards to avoid skipping over items when a delete occurs
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        for (var i = toAttributes.length - 1; 0 <= i; i--) {
          var toAttribute = toAttributes[i];
          if (ignoreAttribute(toAttribute.name, to, 'remove', ctx)) {
            continue;
          }
          if (!from.hasAttribute(toAttribute.name)) {
            to.removeAttribute(toAttribute.name);
          }
        }
      }

      // sync text nodes
      if (type === 8 /* comment */ || type === 3 /* text */) {
        if (to.nodeValue !== from.nodeValue) {
          to.nodeValue = from.nodeValue;
        }
      }
      if (!ignoreValueOfActiveElement(to, ctx)) {
        // sync input values
        syncInputValue(from, to, ctx);
      }
    }

    /**
     * @param from {Element} element to sync the value from
     * @param to {Element} element to sync the value to
     * @param attributeName {String} the attribute name
     * @param ctx the merge context
     */
    function syncBooleanAttribute(from, to, attributeName, ctx) {
      if (from[attributeName] !== to[attributeName]) {
        var ignoreUpdate = ignoreAttribute(attributeName, to, 'update', ctx);
        if (!ignoreUpdate) {
          to[attributeName] = from[attributeName];
        }
        if (from[attributeName]) {
          if (!ignoreUpdate) {
            to.setAttribute(attributeName, from[attributeName]);
          }
        } else {
          if (!ignoreAttribute(attributeName, to, 'remove', ctx)) {
            to.removeAttribute(attributeName);
          }
        }
      }
    }

    /**
     * NB: many bothans died to bring us information:
     *
     *  https://github.com/patrick-steele-idem/morphdom/blob/master/src/specialElHandlers.js
     *  https://github.com/choojs/nanomorph/blob/master/lib/morph.jsL113
     *
     * @param from {Element} the element to sync the input value from
     * @param to {Element} the element to sync the input value to
     * @param ctx the merge context
     */
    function syncInputValue(from, to, ctx) {
      if (from instanceof HTMLInputElement && to instanceof HTMLInputElement && from.type !== 'file') {
        var fromValue = from.value;
        var toValue = to.value;

        // sync boolean attributes
        syncBooleanAttribute(from, to, 'checked', ctx);
        syncBooleanAttribute(from, to, 'disabled', ctx);
        if (!from.hasAttribute('value')) {
          if (!ignoreAttribute('value', to, 'remove', ctx)) {
            to.value = '';
            to.removeAttribute('value');
          }
        } else if (fromValue !== toValue) {
          if (!ignoreAttribute('value', to, 'update', ctx)) {
            to.setAttribute('value', fromValue);
            to.value = fromValue;
          }
        }
      } else if (from instanceof HTMLOptionElement) {
        syncBooleanAttribute(from, to, 'selected', ctx);
      } else if (from instanceof HTMLTextAreaElement && to instanceof HTMLTextAreaElement) {
        var _fromValue = from.value;
        var _toValue = to.value;
        if (ignoreAttribute('value', to, 'update', ctx)) {
          return;
        }
        if (_fromValue !== _toValue) {
          to.value = _fromValue;
        }
        if (to.firstChild && to.firstChild.nodeValue !== _fromValue) {
          to.firstChild.nodeValue = _fromValue;
        }
      }
    }

    //=============================================================================
    // the HEAD tag can be handled specially, either w/ a 'merge' or 'append' style
    //=============================================================================
    function handleHeadElement(newHeadTag, currentHead, ctx) {
      var added = [];
      var removed = [];
      var preserved = [];
      var nodesToAppend = [];
      var headMergeStyle = ctx.head.style;

      // put all new head elements into a Map, by their outerHTML
      var srcToNewHeadNodes = new Map();
      var _iterator2 = _createForOfIteratorHelper(newHeadTag.children),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var newHeadChild = _step2.value;
          srcToNewHeadNodes.set(newHeadChild.outerHTML, newHeadChild);
        }

        // for each elt in the current head
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper(currentHead.children),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var currentHeadElt = _step3.value;
          // If the current head element is in the map
          var inNewContent = srcToNewHeadNodes.has(currentHeadElt.outerHTML);
          var isReAppended = ctx.head.shouldReAppend(currentHeadElt);
          var isPreserved = ctx.head.shouldPreserve(currentHeadElt);
          if (inNewContent || isPreserved) {
            if (isReAppended) {
              // remove the current version and let the new version replace it and re-execute
              removed.push(currentHeadElt);
            } else {
              // this element already exists and should not be re-appended, so remove it from
              // the new content map, preserving it in the DOM
              srcToNewHeadNodes["delete"](currentHeadElt.outerHTML);
              preserved.push(currentHeadElt);
            }
          } else {
            if (headMergeStyle === "append") {
              // we are appending and this existing element is not new content
              // so if and only if it is marked for re-append do we do anything
              if (isReAppended) {
                removed.push(currentHeadElt);
                nodesToAppend.push(currentHeadElt);
              }
            } else {
              // if this is a merge, we remove this content since it is not in the new head
              if (ctx.head.shouldRemove(currentHeadElt) !== false) {
                removed.push(currentHeadElt);
              }
            }
          }
        }

        // Push the remaining new head elements in the Map into the
        // nodes to append to the head tag
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      nodesToAppend.push.apply(nodesToAppend, _toConsumableArray(srcToNewHeadNodes.values()));
      var promises = [];
      var _loop = function _loop() {
        var newNode = _nodesToAppend[_i];
        var newElt = document.createRange().createContextualFragment(newNode.outerHTML).firstChild;
        if (ctx.callbacks.beforeNodeAdded(newElt) !== false) {
          if (newElt.href || newElt.src) {
            var resolve = null;
            var promise = new Promise(function (_resolve) {
              resolve = _resolve;
            });
            newElt.addEventListener('load', function () {
              resolve();
            });
            promises.push(promise);
          }
          currentHead.appendChild(newElt);
          ctx.callbacks.afterNodeAdded(newElt);
          added.push(newElt);
        }
      };
      for (var _i = 0, _nodesToAppend = nodesToAppend; _i < _nodesToAppend.length; _i++) {
        _loop();
      }

      // remove all removed elements, after we have appended the new elements to avoid
      // additional network requests for things like style sheets
      for (var _i2 = 0, _removed = removed; _i2 < _removed.length; _i2++) {
        var removedElement = _removed[_i2];
        if (ctx.callbacks.beforeNodeRemoved(removedElement) !== false) {
          currentHead.removeChild(removedElement);
          ctx.callbacks.afterNodeRemoved(removedElement);
        }
      }
      ctx.head.afterHeadMorphed(currentHead, {
        added: added,
        kept: preserved,
        removed: removed
      });
      return promises;
    }
    function noOp() {}

    /*
      Deep merges the config object and the Idiomoroph.defaults object to
      produce a final configuration object
     */
    function mergeDefaults(config) {
      var finalConfig = {};
      // copy top level stuff into final config
      Object.assign(finalConfig, defaults);
      Object.assign(finalConfig, config);

      // copy callbacks into final config (do this to deep merge the callbacks)
      finalConfig.callbacks = {};
      Object.assign(finalConfig.callbacks, defaults.callbacks);
      Object.assign(finalConfig.callbacks, config.callbacks);

      // copy head config into final config  (do this to deep merge the head)
      finalConfig.head = {};
      Object.assign(finalConfig.head, defaults.head);
      Object.assign(finalConfig.head, config.head);
      return finalConfig;
    }
    function createMorphContext(oldNode, newContent, config) {
      config = mergeDefaults(config);
      return {
        target: oldNode,
        newContent: newContent,
        config: config,
        morphStyle: config.morphStyle,
        ignoreActive: config.ignoreActive,
        ignoreActiveValue: config.ignoreActiveValue,
        idMap: createIdMap(oldNode, newContent),
        deadIds: new Set(),
        callbacks: config.callbacks,
        head: config.head
      };
    }
    function isIdSetMatch(node1, node2, ctx) {
      if (node1 == null || node2 == null) {
        return false;
      }
      if (node1.nodeType === node2.nodeType && node1.tagName === node2.tagName) {
        if (node1.id !== "" && node1.id === node2.id) {
          return true;
        } else {
          return getIdIntersectionCount(ctx, node1, node2) > 0;
        }
      }
      return false;
    }
    function isSoftMatch(node1, node2) {
      if (node1 == null || node2 == null) {
        return false;
      }
      return node1.nodeType === node2.nodeType && node1.tagName === node2.tagName;
    }
    function removeNodesBetween(startInclusive, endExclusive, ctx) {
      while (startInclusive !== endExclusive) {
        var tempNode = startInclusive;
        startInclusive = startInclusive.nextSibling;
        removeNode(tempNode, ctx);
      }
      removeIdsFromConsideration(ctx, endExclusive);
      return endExclusive.nextSibling;
    }

    //=============================================================================
    // Scans forward from the insertionPoint in the old parent looking for a potential id match
    // for the newChild.  We stop if we find a potential id match for the new child OR
    // if the number of potential id matches we are discarding is greater than the
    // potential id matches for the new child
    //=============================================================================
    function findIdSetMatch(newContent, oldParent, newChild, insertionPoint, ctx) {
      // max id matches we are willing to discard in our search
      var newChildPotentialIdCount = getIdIntersectionCount(ctx, newChild, oldParent);
      var potentialMatch = null;

      // only search forward if there is a possibility of an id match
      if (newChildPotentialIdCount > 0) {
        var _potentialMatch = insertionPoint;
        // if there is a possibility of an id match, scan forward
        // keep track of the potential id match count we are discarding (the
        // newChildPotentialIdCount must be greater than this to make it likely
        // worth it)
        var otherMatchCount = 0;
        while (_potentialMatch != null) {
          // If we have an id match, return the current potential match
          if (isIdSetMatch(newChild, _potentialMatch, ctx)) {
            return _potentialMatch;
          }

          // computer the other potential matches of this new content
          otherMatchCount += getIdIntersectionCount(ctx, _potentialMatch, newContent);
          if (otherMatchCount > newChildPotentialIdCount) {
            // if we have more potential id matches in _other_ content, we
            // do not have a good candidate for an id match, so return null
            return null;
          }

          // advanced to the next old content child
          _potentialMatch = _potentialMatch.nextSibling;
        }
      }
      return potentialMatch;
    }

    //=============================================================================
    // Scans forward from the insertionPoint in the old parent looking for a potential soft match
    // for the newChild.  We stop if we find a potential soft match for the new child OR
    // if we find a potential id match in the old parents children OR if we find two
    // potential soft matches for the next two pieces of new content
    //=============================================================================
    function findSoftMatch(newContent, oldParent, newChild, insertionPoint, ctx) {
      var potentialSoftMatch = insertionPoint;
      var nextSibling = newChild.nextSibling;
      var siblingSoftMatchCount = 0;
      while (potentialSoftMatch != null) {
        if (getIdIntersectionCount(ctx, potentialSoftMatch, newContent) > 0) {
          // the current potential soft match has a potential id set match with the remaining new
          // content so bail out of looking
          return null;
        }

        // if we have a soft match with the current node, return it
        if (isSoftMatch(newChild, potentialSoftMatch)) {
          return potentialSoftMatch;
        }
        if (isSoftMatch(nextSibling, potentialSoftMatch)) {
          // the next new node has a soft match with this node, so
          // increment the count of future soft matches
          siblingSoftMatchCount++;
          nextSibling = nextSibling.nextSibling;

          // If there are two future soft matches, bail to allow the siblings to soft match
          // so that we don't consume future soft matches for the sake of the current node
          if (siblingSoftMatchCount >= 2) {
            return null;
          }
        }

        // advanced to the next old content child
        potentialSoftMatch = potentialSoftMatch.nextSibling;
      }
      return potentialSoftMatch;
    }
    function parseContent(newContent) {
      var parser = new DOMParser();

      // remove svgs to avoid false-positive matches on head, etc.
      var contentWithSvgsRemoved = newContent.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, '');

      // if the newContent contains a html, head or body tag, we can simply parse it w/o wrapping
      if (contentWithSvgsRemoved.match(/<\/html>/) || contentWithSvgsRemoved.match(/<\/head>/) || contentWithSvgsRemoved.match(/<\/body>/)) {
        var content = parser.parseFromString(newContent, "text/html");
        // if it is a full HTML document, return the document itself as the parent container
        if (contentWithSvgsRemoved.match(/<\/html>/)) {
          content.generatedByIdiomorph = true;
          return content;
        } else {
          // otherwise return the html element as the parent container
          var htmlElement = content.firstChild;
          if (htmlElement) {
            htmlElement.generatedByIdiomorph = true;
            return htmlElement;
          } else {
            return null;
          }
        }
      } else {
        // if it is partial HTML, wrap it in a template tag to provide a parent element and also to help
        // deal with touchy tags like tr, tbody, etc.
        var responseDoc = parser.parseFromString("<body><template>" + newContent + "</template></body>", "text/html");
        var _content = responseDoc.body.querySelector('template').content;
        _content.generatedByIdiomorph = true;
        return _content;
      }
    }
    function normalizeContent(newContent) {
      if (newContent == null) {
        // noinspection UnnecessaryLocalVariableJS
        var dummyParent = document.createElement('div');
        return dummyParent;
      } else if (newContent.generatedByIdiomorph) {
        // the template tag created by idiomorph parsing can serve as a dummy parent
        return newContent;
      } else if (newContent instanceof Node) {
        // a single node is added as a child to a dummy parent
        var _dummyParent = document.createElement('div');
        _dummyParent.append(newContent);
        return _dummyParent;
      } else {
        // all nodes in the array or HTMLElement collection are consolidated under
        // a single dummy parent element
        var _dummyParent2 = document.createElement('div');
        for (var _i3 = 0, _arr = _toConsumableArray(newContent); _i3 < _arr.length; _i3++) {
          var elt = _arr[_i3];
          _dummyParent2.append(elt);
        }
        return _dummyParent2;
      }
    }
    function insertSiblings(previousSibling, morphedNode, nextSibling) {
      var stack = [];
      var added = [];
      while (previousSibling != null) {
        stack.push(previousSibling);
        previousSibling = previousSibling.previousSibling;
      }
      while (stack.length > 0) {
        var node = stack.pop();
        added.push(node); // push added preceding siblings on in order and insert
        morphedNode.parentElement.insertBefore(node, morphedNode);
      }
      added.push(morphedNode);
      while (nextSibling != null) {
        stack.push(nextSibling);
        added.push(nextSibling); // here we are going in order, so push on as we scan, rather than add
        nextSibling = nextSibling.nextSibling;
      }
      while (stack.length > 0) {
        morphedNode.parentElement.insertBefore(stack.pop(), morphedNode.nextSibling);
      }
      return added;
    }
    function findBestNodeMatch(newContent, oldNode, ctx) {
      var currentElement;
      currentElement = newContent.firstChild;
      var bestElement = currentElement;
      var score = 0;
      while (currentElement) {
        var newScore = scoreElement(currentElement, oldNode, ctx);
        if (newScore > score) {
          bestElement = currentElement;
          score = newScore;
        }
        currentElement = currentElement.nextSibling;
      }
      return bestElement;
    }
    function scoreElement(node1, node2, ctx) {
      if (isSoftMatch(node1, node2)) {
        return .5 + getIdIntersectionCount(ctx, node1, node2);
      }
      return 0;
    }
    function removeNode(tempNode, ctx) {
      removeIdsFromConsideration(ctx, tempNode);
      if (ctx.callbacks.beforeNodeRemoved(tempNode) === false) return;
      tempNode.remove();
      ctx.callbacks.afterNodeRemoved(tempNode);
    }

    //=============================================================================
    // ID Set Functions
    //=============================================================================

    function isIdInConsideration(ctx, id) {
      return !ctx.deadIds.has(id);
    }
    function idIsWithinNode(ctx, id, targetNode) {
      var idSet = ctx.idMap.get(targetNode) || EMPTY_SET;
      return idSet.has(id);
    }
    function removeIdsFromConsideration(ctx, node) {
      var idSet = ctx.idMap.get(node) || EMPTY_SET;
      var _iterator4 = _createForOfIteratorHelper(idSet),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var id = _step4.value;
          ctx.deadIds.add(id);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    function getIdIntersectionCount(ctx, node1, node2) {
      var sourceSet = ctx.idMap.get(node1) || EMPTY_SET;
      var matchCount = 0;
      var _iterator5 = _createForOfIteratorHelper(sourceSet),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var id = _step5.value;
          // a potential match is an id in the source and potentialIdsSet, but
          // that has not already been merged into the DOM
          if (isIdInConsideration(ctx, id) && idIsWithinNode(ctx, id, node2)) {
            ++matchCount;
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return matchCount;
    }

    /**
     * A bottom up algorithm that finds all elements with ids inside of the node
     * argument and populates id sets for those nodes and all their parents, generating
     * a set of ids contained within all nodes for the entire hierarchy in the DOM
     *
     * @param node {Element}
     * @param {Map<Node, Set<String>>} idMap
     */
    function populateIdMapForNode(node, idMap) {
      var nodeParent = node.parentElement;
      // find all elements with an id property
      var idElements = node.querySelectorAll('[id]');
      var _iterator6 = _createForOfIteratorHelper(idElements),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var elt = _step6.value;
          var current = elt;
          // walk up the parent hierarchy of that element, adding the id
          // of element to the parent's id set
          while (current !== nodeParent && current != null) {
            var idSet = idMap.get(current);
            // if the id set doesn't exist, create it and insert it in the  map
            if (idSet == null) {
              idSet = new Set();
              idMap.set(current, idSet);
            }
            idSet.add(elt.id);
            current = current.parentElement;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }

    /**
     * This function computes a map of nodes to all ids contained within that node (inclusive of the
     * node).  This map can be used to ask if two nodes have intersecting sets of ids, which allows
     * for a looser definition of "matching" than tradition id matching, and allows child nodes
     * to contribute to a parent nodes matching.
     *
     * @param {Element} oldContent  the old content that will be morphed
     * @param {Element} newContent  the new content to morph to
     * @returns {Map<Node, Set<String>>} a map of nodes to id sets for the
     */
    function createIdMap(oldContent, newContent) {
      var idMap = new Map();
      populateIdMapForNode(oldContent, idMap);
      populateIdMapForNode(newContent, idMap);
      return idMap;
    }

    //=============================================================================
    // This is what ends up becoming the Idiomorph global object
    //=============================================================================
    return {
      morph: morph,
      defaults: defaults
    };
  }();

  var _HtmlReloader_brand = /*#__PURE__*/new WeakSet();
  var HtmlReloader = /*#__PURE__*/function () {
    function HtmlReloader() {
      _classCallCheck(this, HtmlReloader);
      _classPrivateMethodInitSpec(this, _HtmlReloader_brand);
    }
    return _createClass(HtmlReloader, [{
      key: "reload",
      value: function () {
        var _reload = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var reloadedDocument;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                log("Reload html...");
                _context.next = 4;
                return _assertClassBrand(_HtmlReloader_brand, this, _reloadDocument).call(this);
              case 4:
                reloadedDocument = _context.sent;
                _assertClassBrand(_HtmlReloader_brand, this, _updateHead).call(this, reloadedDocument.head);
                _assertClassBrand(_HtmlReloader_brand, this, _updateBody).call(this, reloadedDocument.body);
                _context.next = 12;
                break;
              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                console.error("Error reloading HTML:", _context.t0);
              case 12:
              case "end":
                return _context.stop();
            }
          }, _callee, this, [[0, 9]]);
        }));
        function reload() {
          return _reload.apply(this, arguments);
        }
        return reload;
      }()
    }], [{
      key: "reload",
      value: function () {
        var _reload2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new HtmlReloader().reload());
              case 1:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        function reload() {
          return _reload2.apply(this, arguments);
        }
        return reload;
      }()
    }]);
  }();
  function _reloadDocument() {
    return _reloadDocument2.apply(this, arguments);
  }
  function _reloadDocument2() {
    _reloadDocument2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var response, fetchedHTML, parser;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetch(_classPrivateGetter(_HtmlReloader_brand, this, _get_reloadUrl));
          case 2:
            response = _context3.sent;
            _context3.next = 5;
            return response.text();
          case 5:
            fetchedHTML = _context3.sent;
            parser = new DOMParser();
            return _context3.abrupt("return", parser.parseFromString(fetchedHTML, "text/html"));
          case 8:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    return _reloadDocument2.apply(this, arguments);
  }
  function _get_reloadUrl(_this) {
    var url = new URL(window.location.href);
    url.searchParams.set("pulse_wire", "true");
    return url.toString();
  }
  function _updateHead(newHead) {
    Idiomorph.morph(document.head, newHead);
  }
  function _updateBody(newBody) {
    Idiomorph.morph(document.body, newBody, {
      callbacks: {
        beforeNodeMorphed: function beforeNodeMorphed(oldNode, newNode) {
          var value = !(oldNode instanceof HTMLElement) || !oldNode.closest("turbo-cable-stream-source");
          return value;
        }
      }
    });
  }

  StreamActions.reload_html = function () {
    HtmlReloader.reload();
  };

  /*
  Stimulus 3.2.1
  Copyright © 2023 Basecamp, LLC
   */
  var EventListener = /*#__PURE__*/function () {
    function EventListener(eventTarget, eventName, eventOptions) {
      _classCallCheck(this, EventListener);
      this.eventTarget = eventTarget;
      this.eventName = eventName;
      this.eventOptions = eventOptions;
      this.unorderedBindings = new Set();
    }
    return _createClass(EventListener, [{
      key: "connect",
      value: function connect() {
        this.eventTarget.addEventListener(this.eventName, this, this.eventOptions);
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions);
      }
    }, {
      key: "bindingConnected",
      value: function bindingConnected(binding) {
        this.unorderedBindings.add(binding);
      }
    }, {
      key: "bindingDisconnected",
      value: function bindingDisconnected(binding) {
        this.unorderedBindings["delete"](binding);
      }
    }, {
      key: "handleEvent",
      value: function handleEvent(event) {
        var extendedEvent = extendEvent(event);
        var _iterator = _createForOfIteratorHelper(this.bindings),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var binding = _step.value;
            if (extendedEvent.immediatePropagationStopped) {
              break;
            } else {
              binding.handleEvent(extendedEvent);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "hasBindings",
      value: function hasBindings() {
        return this.unorderedBindings.size > 0;
      }
    }, {
      key: "bindings",
      get: function get() {
        return Array.from(this.unorderedBindings).sort(function (left, right) {
          var leftIndex = left.index,
            rightIndex = right.index;
          return leftIndex < rightIndex ? -1 : leftIndex > rightIndex ? 1 : 0;
        });
      }
    }]);
  }();
  function extendEvent(event) {
    if ("immediatePropagationStopped" in event) {
      return event;
    } else {
      var _stopImmediatePropagation = event.stopImmediatePropagation;
      return Object.assign(event, {
        immediatePropagationStopped: false,
        stopImmediatePropagation: function stopImmediatePropagation() {
          this.immediatePropagationStopped = true;
          _stopImmediatePropagation.call(this);
        }
      });
    }
  }
  var Dispatcher = /*#__PURE__*/function () {
    function Dispatcher(application) {
      _classCallCheck(this, Dispatcher);
      this.application = application;
      this.eventListenerMaps = new Map();
      this.started = false;
    }
    return _createClass(Dispatcher, [{
      key: "start",
      value: function start() {
        if (!this.started) {
          this.started = true;
          this.eventListeners.forEach(function (eventListener) {
            return eventListener.connect();
          });
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.started) {
          this.started = false;
          this.eventListeners.forEach(function (eventListener) {
            return eventListener.disconnect();
          });
        }
      }
    }, {
      key: "eventListeners",
      get: function get() {
        return Array.from(this.eventListenerMaps.values()).reduce(function (listeners, map) {
          return listeners.concat(Array.from(map.values()));
        }, []);
      }
    }, {
      key: "bindingConnected",
      value: function bindingConnected(binding) {
        this.fetchEventListenerForBinding(binding).bindingConnected(binding);
      }
    }, {
      key: "bindingDisconnected",
      value: function bindingDisconnected(binding) {
        var clearEventListeners = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        this.fetchEventListenerForBinding(binding).bindingDisconnected(binding);
        if (clearEventListeners) this.clearEventListenersForBinding(binding);
      }
    }, {
      key: "handleError",
      value: function handleError(error, message) {
        var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        this.application.handleError(error, "Error ".concat(message), detail);
      }
    }, {
      key: "clearEventListenersForBinding",
      value: function clearEventListenersForBinding(binding) {
        var eventListener = this.fetchEventListenerForBinding(binding);
        if (!eventListener.hasBindings()) {
          eventListener.disconnect();
          this.removeMappedEventListenerFor(binding);
        }
      }
    }, {
      key: "removeMappedEventListenerFor",
      value: function removeMappedEventListenerFor(binding) {
        var eventTarget = binding.eventTarget,
          eventName = binding.eventName,
          eventOptions = binding.eventOptions;
        var eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
        var cacheKey = this.cacheKey(eventName, eventOptions);
        eventListenerMap["delete"](cacheKey);
        if (eventListenerMap.size == 0) this.eventListenerMaps["delete"](eventTarget);
      }
    }, {
      key: "fetchEventListenerForBinding",
      value: function fetchEventListenerForBinding(binding) {
        var eventTarget = binding.eventTarget,
          eventName = binding.eventName,
          eventOptions = binding.eventOptions;
        return this.fetchEventListener(eventTarget, eventName, eventOptions);
      }
    }, {
      key: "fetchEventListener",
      value: function fetchEventListener(eventTarget, eventName, eventOptions) {
        var eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
        var cacheKey = this.cacheKey(eventName, eventOptions);
        var eventListener = eventListenerMap.get(cacheKey);
        if (!eventListener) {
          eventListener = this.createEventListener(eventTarget, eventName, eventOptions);
          eventListenerMap.set(cacheKey, eventListener);
        }
        return eventListener;
      }
    }, {
      key: "createEventListener",
      value: function createEventListener(eventTarget, eventName, eventOptions) {
        var eventListener = new EventListener(eventTarget, eventName, eventOptions);
        if (this.started) {
          eventListener.connect();
        }
        return eventListener;
      }
    }, {
      key: "fetchEventListenerMapForEventTarget",
      value: function fetchEventListenerMapForEventTarget(eventTarget) {
        var eventListenerMap = this.eventListenerMaps.get(eventTarget);
        if (!eventListenerMap) {
          eventListenerMap = new Map();
          this.eventListenerMaps.set(eventTarget, eventListenerMap);
        }
        return eventListenerMap;
      }
    }, {
      key: "cacheKey",
      value: function cacheKey(eventName, eventOptions) {
        var parts = [eventName];
        Object.keys(eventOptions).sort().forEach(function (key) {
          parts.push("".concat(eventOptions[key] ? "" : "!").concat(key));
        });
        return parts.join(":");
      }
    }]);
  }();
  var defaultActionDescriptorFilters = {
    stop: function stop(_ref) {
      var event = _ref.event,
        value = _ref.value;
      if (value) event.stopPropagation();
      return true;
    },
    prevent: function prevent(_ref2) {
      var event = _ref2.event,
        value = _ref2.value;
      if (value) event.preventDefault();
      return true;
    },
    self: function self(_ref3) {
      var event = _ref3.event,
        value = _ref3.value,
        element = _ref3.element;
      if (value) {
        return element === event.target;
      } else {
        return true;
      }
    }
  };
  var descriptorPattern = /^(?:(?:([^.]+?)\+)?(.+?)(?:\.(.+?))?(?:@(window|document))?->)?(.+?)(?:#([^:]+?))(?::(.+))?$/;
  function parseActionDescriptorString(descriptorString) {
    var source = descriptorString.trim();
    var matches = source.match(descriptorPattern) || [];
    var eventName = matches[2];
    var keyFilter = matches[3];
    if (keyFilter && !["keydown", "keyup", "keypress"].includes(eventName)) {
      eventName += ".".concat(keyFilter);
      keyFilter = "";
    }
    return {
      eventTarget: parseEventTarget(matches[4]),
      eventName: eventName,
      eventOptions: matches[7] ? parseEventOptions(matches[7]) : {},
      identifier: matches[5],
      methodName: matches[6],
      keyFilter: matches[1] || keyFilter
    };
  }
  function parseEventTarget(eventTargetName) {
    if (eventTargetName == "window") {
      return window;
    } else if (eventTargetName == "document") {
      return document;
    }
  }
  function parseEventOptions(eventOptions) {
    return eventOptions.split(":").reduce(function (options, token) {
      return Object.assign(options, _defineProperty({}, token.replace(/^!/, ""), !/^!/.test(token)));
    }, {});
  }
  function stringifyEventTarget(eventTarget) {
    if (eventTarget == window) {
      return "window";
    } else if (eventTarget == document) {
      return "document";
    }
  }
  function camelize(value) {
    return value.replace(/(?:[_-])([a-z0-9])/g, function (_, _char) {
      return _char.toUpperCase();
    });
  }
  function namespaceCamelize(value) {
    return camelize(value.replace(/--/g, "-").replace(/__/g, "_"));
  }
  function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  function dasherize(value) {
    return value.replace(/([A-Z])/g, function (_, _char2) {
      return "-".concat(_char2.toLowerCase());
    });
  }
  function tokenize(value) {
    return value.match(/[^\s]+/g) || [];
  }
  function isSomething(object) {
    return object !== null && object !== undefined;
  }
  function hasProperty(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }
  var allModifiers = ["meta", "ctrl", "alt", "shift"];
  var Action = /*#__PURE__*/function () {
    function Action(element, index, descriptor, schema) {
      _classCallCheck(this, Action);
      this.element = element;
      this.index = index;
      this.eventTarget = descriptor.eventTarget || element;
      this.eventName = descriptor.eventName || getDefaultEventNameForElement(element) || error("missing event name");
      this.eventOptions = descriptor.eventOptions || {};
      this.identifier = descriptor.identifier || error("missing identifier");
      this.methodName = descriptor.methodName || error("missing method name");
      this.keyFilter = descriptor.keyFilter || "";
      this.schema = schema;
    }
    return _createClass(Action, [{
      key: "toString",
      value: function toString() {
        var eventFilter = this.keyFilter ? ".".concat(this.keyFilter) : "";
        var eventTarget = this.eventTargetName ? "@".concat(this.eventTargetName) : "";
        return "".concat(this.eventName).concat(eventFilter).concat(eventTarget, "->").concat(this.identifier, "#").concat(this.methodName);
      }
    }, {
      key: "shouldIgnoreKeyboardEvent",
      value: function shouldIgnoreKeyboardEvent(event) {
        if (!this.keyFilter) {
          return false;
        }
        var filters = this.keyFilter.split("+");
        if (this.keyFilterDissatisfied(event, filters)) {
          return true;
        }
        var standardFilter = filters.filter(function (key) {
          return !allModifiers.includes(key);
        })[0];
        if (!standardFilter) {
          return false;
        }
        if (!hasProperty(this.keyMappings, standardFilter)) {
          error("contains unknown key filter: ".concat(this.keyFilter));
        }
        return this.keyMappings[standardFilter].toLowerCase() !== event.key.toLowerCase();
      }
    }, {
      key: "shouldIgnoreMouseEvent",
      value: function shouldIgnoreMouseEvent(event) {
        if (!this.keyFilter) {
          return false;
        }
        var filters = [this.keyFilter];
        if (this.keyFilterDissatisfied(event, filters)) {
          return true;
        }
        return false;
      }
    }, {
      key: "params",
      get: function get() {
        var params = {};
        var pattern = new RegExp("^data-".concat(this.identifier, "-(.+)-param$"), "i");
        for (var _i = 0, _Array$from = Array.from(this.element.attributes); _i < _Array$from.length; _i++) {
          var _Array$from$_i = _Array$from[_i],
            name = _Array$from$_i.name,
            value = _Array$from$_i.value;
          var match = name.match(pattern);
          var key = match && match[1];
          if (key) {
            params[camelize(key)] = typecast(value);
          }
        }
        return params;
      }
    }, {
      key: "eventTargetName",
      get: function get() {
        return stringifyEventTarget(this.eventTarget);
      }
    }, {
      key: "keyMappings",
      get: function get() {
        return this.schema.keyMappings;
      }
    }, {
      key: "keyFilterDissatisfied",
      value: function keyFilterDissatisfied(event, filters) {
        var _allModifiers$map = allModifiers.map(function (modifier) {
            return filters.includes(modifier);
          }),
          _allModifiers$map2 = _slicedToArray(_allModifiers$map, 4),
          meta = _allModifiers$map2[0],
          ctrl = _allModifiers$map2[1],
          alt = _allModifiers$map2[2],
          shift = _allModifiers$map2[3];
        return event.metaKey !== meta || event.ctrlKey !== ctrl || event.altKey !== alt || event.shiftKey !== shift;
      }
    }], [{
      key: "forToken",
      value: function forToken(token, schema) {
        return new this(token.element, token.index, parseActionDescriptorString(token.content), schema);
      }
    }]);
  }();
  var defaultEventNames = {
    a: function a() {
      return "click";
    },
    button: function button() {
      return "click";
    },
    form: function form() {
      return "submit";
    },
    details: function details() {
      return "toggle";
    },
    input: function input(e) {
      return e.getAttribute("type") == "submit" ? "click" : "input";
    },
    select: function select() {
      return "change";
    },
    textarea: function textarea() {
      return "input";
    }
  };
  function getDefaultEventNameForElement(element) {
    var tagName = element.tagName.toLowerCase();
    if (tagName in defaultEventNames) {
      return defaultEventNames[tagName](element);
    }
  }
  function error(message) {
    throw new Error(message);
  }
  function typecast(value) {
    try {
      return JSON.parse(value);
    } catch (o_O) {
      return value;
    }
  }
  var Binding = /*#__PURE__*/function () {
    function Binding(context, action) {
      _classCallCheck(this, Binding);
      this.context = context;
      this.action = action;
    }
    return _createClass(Binding, [{
      key: "index",
      get: function get() {
        return this.action.index;
      }
    }, {
      key: "eventTarget",
      get: function get() {
        return this.action.eventTarget;
      }
    }, {
      key: "eventOptions",
      get: function get() {
        return this.action.eventOptions;
      }
    }, {
      key: "identifier",
      get: function get() {
        return this.context.identifier;
      }
    }, {
      key: "handleEvent",
      value: function handleEvent(event) {
        var actionEvent = this.prepareActionEvent(event);
        if (this.willBeInvokedByEvent(event) && this.applyEventModifiers(actionEvent)) {
          this.invokeWithEvent(actionEvent);
        }
      }
    }, {
      key: "eventName",
      get: function get() {
        return this.action.eventName;
      }
    }, {
      key: "method",
      get: function get() {
        var method = this.controller[this.methodName];
        if (typeof method == "function") {
          return method;
        }
        throw new Error("Action \"".concat(this.action, "\" references undefined method \"").concat(this.methodName, "\""));
      }
    }, {
      key: "applyEventModifiers",
      value: function applyEventModifiers(event) {
        var element = this.action.element;
        var actionDescriptorFilters = this.context.application.actionDescriptorFilters;
        var controller = this.context.controller;
        var passes = true;
        for (var _i2 = 0, _Object$entries = Object.entries(this.eventOptions); _i2 < _Object$entries.length; _i2++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
            name = _Object$entries$_i[0],
            value = _Object$entries$_i[1];
          if (name in actionDescriptorFilters) {
            var filter = actionDescriptorFilters[name];
            passes = passes && filter({
              name: name,
              value: value,
              event: event,
              element: element,
              controller: controller
            });
          } else {
            continue;
          }
        }
        return passes;
      }
    }, {
      key: "prepareActionEvent",
      value: function prepareActionEvent(event) {
        return Object.assign(event, {
          params: this.action.params
        });
      }
    }, {
      key: "invokeWithEvent",
      value: function invokeWithEvent(event) {
        var target = event.target,
          currentTarget = event.currentTarget;
        try {
          this.method.call(this.controller, event);
          this.context.logDebugActivity(this.methodName, {
            event: event,
            target: target,
            currentTarget: currentTarget,
            action: this.methodName
          });
        } catch (error) {
          var identifier = this.identifier,
            controller = this.controller,
            element = this.element,
            index = this.index;
          var detail = {
            identifier: identifier,
            controller: controller,
            element: element,
            index: index,
            event: event
          };
          this.context.handleError(error, "invoking action \"".concat(this.action, "\""), detail);
        }
      }
    }, {
      key: "willBeInvokedByEvent",
      value: function willBeInvokedByEvent(event) {
        var eventTarget = event.target;
        if (event instanceof KeyboardEvent && this.action.shouldIgnoreKeyboardEvent(event)) {
          return false;
        }
        if (event instanceof MouseEvent && this.action.shouldIgnoreMouseEvent(event)) {
          return false;
        }
        if (this.element === eventTarget) {
          return true;
        } else if (eventTarget instanceof Element && this.element.contains(eventTarget)) {
          return this.scope.containsElement(eventTarget);
        } else {
          return this.scope.containsElement(this.action.element);
        }
      }
    }, {
      key: "controller",
      get: function get() {
        return this.context.controller;
      }
    }, {
      key: "methodName",
      get: function get() {
        return this.action.methodName;
      }
    }, {
      key: "element",
      get: function get() {
        return this.scope.element;
      }
    }, {
      key: "scope",
      get: function get() {
        return this.context.scope;
      }
    }]);
  }();
  var ElementObserver = /*#__PURE__*/function () {
    function ElementObserver(element, delegate) {
      var _this = this;
      _classCallCheck(this, ElementObserver);
      this.mutationObserverInit = {
        attributes: true,
        childList: true,
        subtree: true
      };
      this.element = element;
      this.started = false;
      this.delegate = delegate;
      this.elements = new Set();
      this.mutationObserver = new MutationObserver(function (mutations) {
        return _this.processMutations(mutations);
      });
    }
    return _createClass(ElementObserver, [{
      key: "start",
      value: function start() {
        if (!this.started) {
          this.started = true;
          this.mutationObserver.observe(this.element, this.mutationObserverInit);
          this.refresh();
        }
      }
    }, {
      key: "pause",
      value: function pause(callback) {
        if (this.started) {
          this.mutationObserver.disconnect();
          this.started = false;
        }
        callback();
        if (!this.started) {
          this.mutationObserver.observe(this.element, this.mutationObserverInit);
          this.started = true;
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.started) {
          this.mutationObserver.takeRecords();
          this.mutationObserver.disconnect();
          this.started = false;
        }
      }
    }, {
      key: "refresh",
      value: function refresh() {
        if (this.started) {
          var matches = new Set(this.matchElementsInTree());
          for (var _i3 = 0, _Array$from2 = Array.from(this.elements); _i3 < _Array$from2.length; _i3++) {
            var element = _Array$from2[_i3];
            if (!matches.has(element)) {
              this.removeElement(element);
            }
          }
          for (var _i4 = 0, _Array$from3 = Array.from(matches); _i4 < _Array$from3.length; _i4++) {
            var _element2 = _Array$from3[_i4];
            this.addElement(_element2);
          }
        }
      }
    }, {
      key: "processMutations",
      value: function processMutations(mutations) {
        if (this.started) {
          var _iterator2 = _createForOfIteratorHelper(mutations),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var mutation = _step2.value;
              this.processMutation(mutation);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    }, {
      key: "processMutation",
      value: function processMutation(mutation) {
        if (mutation.type == "attributes") {
          this.processAttributeChange(mutation.target, mutation.attributeName);
        } else if (mutation.type == "childList") {
          this.processRemovedNodes(mutation.removedNodes);
          this.processAddedNodes(mutation.addedNodes);
        }
      }
    }, {
      key: "processAttributeChange",
      value: function processAttributeChange(element, attributeName) {
        if (this.elements.has(element)) {
          if (this.delegate.elementAttributeChanged && this.matchElement(element)) {
            this.delegate.elementAttributeChanged(element, attributeName);
          } else {
            this.removeElement(element);
          }
        } else if (this.matchElement(element)) {
          this.addElement(element);
        }
      }
    }, {
      key: "processRemovedNodes",
      value: function processRemovedNodes(nodes) {
        for (var _i5 = 0, _Array$from4 = Array.from(nodes); _i5 < _Array$from4.length; _i5++) {
          var node = _Array$from4[_i5];
          var element = this.elementFromNode(node);
          if (element) {
            this.processTree(element, this.removeElement);
          }
        }
      }
    }, {
      key: "processAddedNodes",
      value: function processAddedNodes(nodes) {
        for (var _i6 = 0, _Array$from5 = Array.from(nodes); _i6 < _Array$from5.length; _i6++) {
          var node = _Array$from5[_i6];
          var element = this.elementFromNode(node);
          if (element && this.elementIsActive(element)) {
            this.processTree(element, this.addElement);
          }
        }
      }
    }, {
      key: "matchElement",
      value: function matchElement(element) {
        return this.delegate.matchElement(element);
      }
    }, {
      key: "matchElementsInTree",
      value: function matchElementsInTree() {
        var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.element;
        return this.delegate.matchElementsInTree(tree);
      }
    }, {
      key: "processTree",
      value: function processTree(tree, processor) {
        var _iterator3 = _createForOfIteratorHelper(this.matchElementsInTree(tree)),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var element = _step3.value;
            processor.call(this, element);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }, {
      key: "elementFromNode",
      value: function elementFromNode(node) {
        if (node.nodeType == Node.ELEMENT_NODE) {
          return node;
        }
      }
    }, {
      key: "elementIsActive",
      value: function elementIsActive(element) {
        if (element.isConnected != this.element.isConnected) {
          return false;
        } else {
          return this.element.contains(element);
        }
      }
    }, {
      key: "addElement",
      value: function addElement(element) {
        if (!this.elements.has(element)) {
          if (this.elementIsActive(element)) {
            this.elements.add(element);
            if (this.delegate.elementMatched) {
              this.delegate.elementMatched(element);
            }
          }
        }
      }
    }, {
      key: "removeElement",
      value: function removeElement(element) {
        if (this.elements.has(element)) {
          this.elements["delete"](element);
          if (this.delegate.elementUnmatched) {
            this.delegate.elementUnmatched(element);
          }
        }
      }
    }]);
  }();
  var AttributeObserver = /*#__PURE__*/function () {
    function AttributeObserver(element, attributeName, delegate) {
      _classCallCheck(this, AttributeObserver);
      this.attributeName = attributeName;
      this.delegate = delegate;
      this.elementObserver = new ElementObserver(element, this);
    }
    return _createClass(AttributeObserver, [{
      key: "element",
      get: function get() {
        return this.elementObserver.element;
      }
    }, {
      key: "selector",
      get: function get() {
        return "[".concat(this.attributeName, "]");
      }
    }, {
      key: "start",
      value: function start() {
        this.elementObserver.start();
      }
    }, {
      key: "pause",
      value: function pause(callback) {
        this.elementObserver.pause(callback);
      }
    }, {
      key: "stop",
      value: function stop() {
        this.elementObserver.stop();
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.elementObserver.refresh();
      }
    }, {
      key: "started",
      get: function get() {
        return this.elementObserver.started;
      }
    }, {
      key: "matchElement",
      value: function matchElement(element) {
        return element.hasAttribute(this.attributeName);
      }
    }, {
      key: "matchElementsInTree",
      value: function matchElementsInTree(tree) {
        var match = this.matchElement(tree) ? [tree] : [];
        var matches = Array.from(tree.querySelectorAll(this.selector));
        return match.concat(matches);
      }
    }, {
      key: "elementMatched",
      value: function elementMatched(element) {
        if (this.delegate.elementMatchedAttribute) {
          this.delegate.elementMatchedAttribute(element, this.attributeName);
        }
      }
    }, {
      key: "elementUnmatched",
      value: function elementUnmatched(element) {
        if (this.delegate.elementUnmatchedAttribute) {
          this.delegate.elementUnmatchedAttribute(element, this.attributeName);
        }
      }
    }, {
      key: "elementAttributeChanged",
      value: function elementAttributeChanged(element, attributeName) {
        if (this.delegate.elementAttributeValueChanged && this.attributeName == attributeName) {
          this.delegate.elementAttributeValueChanged(element, attributeName);
        }
      }
    }]);
  }();
  function _add(map, key, value) {
    fetch$1(map, key).add(value);
  }
  function del(map, key, value) {
    fetch$1(map, key)["delete"](value);
    prune(map, key);
  }
  function fetch$1(map, key) {
    var values = map.get(key);
    if (!values) {
      values = new Set();
      map.set(key, values);
    }
    return values;
  }
  function prune(map, key) {
    var values = map.get(key);
    if (values != null && values.size == 0) {
      map["delete"](key);
    }
  }
  var Multimap = /*#__PURE__*/function () {
    function Multimap() {
      _classCallCheck(this, Multimap);
      this.valuesByKey = new Map();
    }
    return _createClass(Multimap, [{
      key: "keys",
      get: function get() {
        return Array.from(this.valuesByKey.keys());
      }
    }, {
      key: "values",
      get: function get() {
        var sets = Array.from(this.valuesByKey.values());
        return sets.reduce(function (values, set) {
          return values.concat(Array.from(set));
        }, []);
      }
    }, {
      key: "size",
      get: function get() {
        var sets = Array.from(this.valuesByKey.values());
        return sets.reduce(function (size, set) {
          return size + set.size;
        }, 0);
      }
    }, {
      key: "add",
      value: function add(key, value) {
        _add(this.valuesByKey, key, value);
      }
    }, {
      key: "delete",
      value: function _delete(key, value) {
        del(this.valuesByKey, key, value);
      }
    }, {
      key: "has",
      value: function has(key, value) {
        var values = this.valuesByKey.get(key);
        return values != null && values.has(value);
      }
    }, {
      key: "hasKey",
      value: function hasKey(key) {
        return this.valuesByKey.has(key);
      }
    }, {
      key: "hasValue",
      value: function hasValue(value) {
        var sets = Array.from(this.valuesByKey.values());
        return sets.some(function (set) {
          return set.has(value);
        });
      }
    }, {
      key: "getValuesForKey",
      value: function getValuesForKey(key) {
        var values = this.valuesByKey.get(key);
        return values ? Array.from(values) : [];
      }
    }, {
      key: "getKeysForValue",
      value: function getKeysForValue(value) {
        return Array.from(this.valuesByKey).filter(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2);
            _ref5[0];
            var values = _ref5[1];
          return values.has(value);
        }).map(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
            key = _ref7[0];
            _ref7[1];
          return key;
        });
      }
    }]);
  }();
  var SelectorObserver = /*#__PURE__*/function () {
    function SelectorObserver(element, selector, delegate, details) {
      _classCallCheck(this, SelectorObserver);
      this._selector = selector;
      this.details = details;
      this.elementObserver = new ElementObserver(element, this);
      this.delegate = delegate;
      this.matchesByElement = new Multimap();
    }
    return _createClass(SelectorObserver, [{
      key: "started",
      get: function get() {
        return this.elementObserver.started;
      }
    }, {
      key: "selector",
      get: function get() {
        return this._selector;
      },
      set: function set(selector) {
        this._selector = selector;
        this.refresh();
      }
    }, {
      key: "start",
      value: function start() {
        this.elementObserver.start();
      }
    }, {
      key: "pause",
      value: function pause(callback) {
        this.elementObserver.pause(callback);
      }
    }, {
      key: "stop",
      value: function stop() {
        this.elementObserver.stop();
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.elementObserver.refresh();
      }
    }, {
      key: "element",
      get: function get() {
        return this.elementObserver.element;
      }
    }, {
      key: "matchElement",
      value: function matchElement(element) {
        var selector = this.selector;
        if (selector) {
          var matches = element.matches(selector);
          if (this.delegate.selectorMatchElement) {
            return matches && this.delegate.selectorMatchElement(element, this.details);
          }
          return matches;
        } else {
          return false;
        }
      }
    }, {
      key: "matchElementsInTree",
      value: function matchElementsInTree(tree) {
        var _this3 = this;
        var selector = this.selector;
        if (selector) {
          var match = this.matchElement(tree) ? [tree] : [];
          var matches = Array.from(tree.querySelectorAll(selector)).filter(function (match) {
            return _this3.matchElement(match);
          });
          return match.concat(matches);
        } else {
          return [];
        }
      }
    }, {
      key: "elementMatched",
      value: function elementMatched(element) {
        var selector = this.selector;
        if (selector) {
          this.selectorMatched(element, selector);
        }
      }
    }, {
      key: "elementUnmatched",
      value: function elementUnmatched(element) {
        var selectors = this.matchesByElement.getKeysForValue(element);
        var _iterator4 = _createForOfIteratorHelper(selectors),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var selector = _step4.value;
            this.selectorUnmatched(element, selector);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    }, {
      key: "elementAttributeChanged",
      value: function elementAttributeChanged(element, _attributeName) {
        var selector = this.selector;
        if (selector) {
          var matches = this.matchElement(element);
          var matchedBefore = this.matchesByElement.has(selector, element);
          if (matches && !matchedBefore) {
            this.selectorMatched(element, selector);
          } else if (!matches && matchedBefore) {
            this.selectorUnmatched(element, selector);
          }
        }
      }
    }, {
      key: "selectorMatched",
      value: function selectorMatched(element, selector) {
        this.delegate.selectorMatched(element, selector, this.details);
        this.matchesByElement.add(selector, element);
      }
    }, {
      key: "selectorUnmatched",
      value: function selectorUnmatched(element, selector) {
        this.delegate.selectorUnmatched(element, selector, this.details);
        this.matchesByElement["delete"](selector, element);
      }
    }]);
  }();
  var StringMapObserver = /*#__PURE__*/function () {
    function StringMapObserver(element, delegate) {
      var _this4 = this;
      _classCallCheck(this, StringMapObserver);
      this.element = element;
      this.delegate = delegate;
      this.started = false;
      this.stringMap = new Map();
      this.mutationObserver = new MutationObserver(function (mutations) {
        return _this4.processMutations(mutations);
      });
    }
    return _createClass(StringMapObserver, [{
      key: "start",
      value: function start() {
        if (!this.started) {
          this.started = true;
          this.mutationObserver.observe(this.element, {
            attributes: true,
            attributeOldValue: true
          });
          this.refresh();
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.started) {
          this.mutationObserver.takeRecords();
          this.mutationObserver.disconnect();
          this.started = false;
        }
      }
    }, {
      key: "refresh",
      value: function refresh() {
        if (this.started) {
          var _iterator5 = _createForOfIteratorHelper(this.knownAttributeNames),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var attributeName = _step5.value;
              this.refreshAttribute(attributeName, null);
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
      }
    }, {
      key: "processMutations",
      value: function processMutations(mutations) {
        if (this.started) {
          var _iterator6 = _createForOfIteratorHelper(mutations),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var mutation = _step6.value;
              this.processMutation(mutation);
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      }
    }, {
      key: "processMutation",
      value: function processMutation(mutation) {
        var attributeName = mutation.attributeName;
        if (attributeName) {
          this.refreshAttribute(attributeName, mutation.oldValue);
        }
      }
    }, {
      key: "refreshAttribute",
      value: function refreshAttribute(attributeName, oldValue) {
        var key = this.delegate.getStringMapKeyForAttribute(attributeName);
        if (key != null) {
          if (!this.stringMap.has(attributeName)) {
            this.stringMapKeyAdded(key, attributeName);
          }
          var value = this.element.getAttribute(attributeName);
          if (this.stringMap.get(attributeName) != value) {
            this.stringMapValueChanged(value, key, oldValue);
          }
          if (value == null) {
            var _oldValue = this.stringMap.get(attributeName);
            this.stringMap["delete"](attributeName);
            if (_oldValue) this.stringMapKeyRemoved(key, attributeName, _oldValue);
          } else {
            this.stringMap.set(attributeName, value);
          }
        }
      }
    }, {
      key: "stringMapKeyAdded",
      value: function stringMapKeyAdded(key, attributeName) {
        if (this.delegate.stringMapKeyAdded) {
          this.delegate.stringMapKeyAdded(key, attributeName);
        }
      }
    }, {
      key: "stringMapValueChanged",
      value: function stringMapValueChanged(value, key, oldValue) {
        if (this.delegate.stringMapValueChanged) {
          this.delegate.stringMapValueChanged(value, key, oldValue);
        }
      }
    }, {
      key: "stringMapKeyRemoved",
      value: function stringMapKeyRemoved(key, attributeName, oldValue) {
        if (this.delegate.stringMapKeyRemoved) {
          this.delegate.stringMapKeyRemoved(key, attributeName, oldValue);
        }
      }
    }, {
      key: "knownAttributeNames",
      get: function get() {
        return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)));
      }
    }, {
      key: "currentAttributeNames",
      get: function get() {
        return Array.from(this.element.attributes).map(function (attribute) {
          return attribute.name;
        });
      }
    }, {
      key: "recordedAttributeNames",
      get: function get() {
        return Array.from(this.stringMap.keys());
      }
    }]);
  }();
  var TokenListObserver = /*#__PURE__*/function () {
    function TokenListObserver(element, attributeName, delegate) {
      _classCallCheck(this, TokenListObserver);
      this.attributeObserver = new AttributeObserver(element, attributeName, this);
      this.delegate = delegate;
      this.tokensByElement = new Multimap();
    }
    return _createClass(TokenListObserver, [{
      key: "started",
      get: function get() {
        return this.attributeObserver.started;
      }
    }, {
      key: "start",
      value: function start() {
        this.attributeObserver.start();
      }
    }, {
      key: "pause",
      value: function pause(callback) {
        this.attributeObserver.pause(callback);
      }
    }, {
      key: "stop",
      value: function stop() {
        this.attributeObserver.stop();
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.attributeObserver.refresh();
      }
    }, {
      key: "element",
      get: function get() {
        return this.attributeObserver.element;
      }
    }, {
      key: "attributeName",
      get: function get() {
        return this.attributeObserver.attributeName;
      }
    }, {
      key: "elementMatchedAttribute",
      value: function elementMatchedAttribute(element) {
        this.tokensMatched(this.readTokensForElement(element));
      }
    }, {
      key: "elementAttributeValueChanged",
      value: function elementAttributeValueChanged(element) {
        var _this$refreshTokensFo = this.refreshTokensForElement(element),
          _this$refreshTokensFo2 = _slicedToArray(_this$refreshTokensFo, 2),
          unmatchedTokens = _this$refreshTokensFo2[0],
          matchedTokens = _this$refreshTokensFo2[1];
        this.tokensUnmatched(unmatchedTokens);
        this.tokensMatched(matchedTokens);
      }
    }, {
      key: "elementUnmatchedAttribute",
      value: function elementUnmatchedAttribute(element) {
        this.tokensUnmatched(this.tokensByElement.getValuesForKey(element));
      }
    }, {
      key: "tokensMatched",
      value: function tokensMatched(tokens) {
        var _this5 = this;
        tokens.forEach(function (token) {
          return _this5.tokenMatched(token);
        });
      }
    }, {
      key: "tokensUnmatched",
      value: function tokensUnmatched(tokens) {
        var _this6 = this;
        tokens.forEach(function (token) {
          return _this6.tokenUnmatched(token);
        });
      }
    }, {
      key: "tokenMatched",
      value: function tokenMatched(token) {
        this.delegate.tokenMatched(token);
        this.tokensByElement.add(token.element, token);
      }
    }, {
      key: "tokenUnmatched",
      value: function tokenUnmatched(token) {
        this.delegate.tokenUnmatched(token);
        this.tokensByElement["delete"](token.element, token);
      }
    }, {
      key: "refreshTokensForElement",
      value: function refreshTokensForElement(element) {
        var previousTokens = this.tokensByElement.getValuesForKey(element);
        var currentTokens = this.readTokensForElement(element);
        var firstDifferingIndex = zip(previousTokens, currentTokens).findIndex(function (_ref8) {
          var _ref9 = _slicedToArray(_ref8, 2),
            previousToken = _ref9[0],
            currentToken = _ref9[1];
          return !tokensAreEqual(previousToken, currentToken);
        });
        if (firstDifferingIndex == -1) {
          return [[], []];
        } else {
          return [previousTokens.slice(firstDifferingIndex), currentTokens.slice(firstDifferingIndex)];
        }
      }
    }, {
      key: "readTokensForElement",
      value: function readTokensForElement(element) {
        var attributeName = this.attributeName;
        var tokenString = element.getAttribute(attributeName) || "";
        return parseTokenString(tokenString, element, attributeName);
      }
    }]);
  }();
  function parseTokenString(tokenString, element, attributeName) {
    return tokenString.trim().split(/\s+/).filter(function (content) {
      return content.length;
    }).map(function (content, index) {
      return {
        element: element,
        attributeName: attributeName,
        content: content,
        index: index
      };
    });
  }
  function zip(left, right) {
    var length = Math.max(left.length, right.length);
    return Array.from({
      length: length
    }, function (_, index) {
      return [left[index], right[index]];
    });
  }
  function tokensAreEqual(left, right) {
    return left && right && left.index == right.index && left.content == right.content;
  }
  var ValueListObserver = /*#__PURE__*/function () {
    function ValueListObserver(element, attributeName, delegate) {
      _classCallCheck(this, ValueListObserver);
      this.tokenListObserver = new TokenListObserver(element, attributeName, this);
      this.delegate = delegate;
      this.parseResultsByToken = new WeakMap();
      this.valuesByTokenByElement = new WeakMap();
    }
    return _createClass(ValueListObserver, [{
      key: "started",
      get: function get() {
        return this.tokenListObserver.started;
      }
    }, {
      key: "start",
      value: function start() {
        this.tokenListObserver.start();
      }
    }, {
      key: "stop",
      value: function stop() {
        this.tokenListObserver.stop();
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.tokenListObserver.refresh();
      }
    }, {
      key: "element",
      get: function get() {
        return this.tokenListObserver.element;
      }
    }, {
      key: "attributeName",
      get: function get() {
        return this.tokenListObserver.attributeName;
      }
    }, {
      key: "tokenMatched",
      value: function tokenMatched(token) {
        var element = token.element;
        var _this$fetchParseResul = this.fetchParseResultForToken(token),
          value = _this$fetchParseResul.value;
        if (value) {
          this.fetchValuesByTokenForElement(element).set(token, value);
          this.delegate.elementMatchedValue(element, value);
        }
      }
    }, {
      key: "tokenUnmatched",
      value: function tokenUnmatched(token) {
        var element = token.element;
        var _this$fetchParseResul2 = this.fetchParseResultForToken(token),
          value = _this$fetchParseResul2.value;
        if (value) {
          this.fetchValuesByTokenForElement(element)["delete"](token);
          this.delegate.elementUnmatchedValue(element, value);
        }
      }
    }, {
      key: "fetchParseResultForToken",
      value: function fetchParseResultForToken(token) {
        var parseResult = this.parseResultsByToken.get(token);
        if (!parseResult) {
          parseResult = this.parseToken(token);
          this.parseResultsByToken.set(token, parseResult);
        }
        return parseResult;
      }
    }, {
      key: "fetchValuesByTokenForElement",
      value: function fetchValuesByTokenForElement(element) {
        var valuesByToken = this.valuesByTokenByElement.get(element);
        if (!valuesByToken) {
          valuesByToken = new Map();
          this.valuesByTokenByElement.set(element, valuesByToken);
        }
        return valuesByToken;
      }
    }, {
      key: "parseToken",
      value: function parseToken(token) {
        try {
          var value = this.delegate.parseValueForToken(token);
          return {
            value: value
          };
        } catch (error) {
          return {
            error: error
          };
        }
      }
    }]);
  }();
  var BindingObserver = /*#__PURE__*/function () {
    function BindingObserver(context, delegate) {
      _classCallCheck(this, BindingObserver);
      this.context = context;
      this.delegate = delegate;
      this.bindingsByAction = new Map();
    }
    return _createClass(BindingObserver, [{
      key: "start",
      value: function start() {
        if (!this.valueListObserver) {
          this.valueListObserver = new ValueListObserver(this.element, this.actionAttribute, this);
          this.valueListObserver.start();
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.valueListObserver) {
          this.valueListObserver.stop();
          delete this.valueListObserver;
          this.disconnectAllActions();
        }
      }
    }, {
      key: "element",
      get: function get() {
        return this.context.element;
      }
    }, {
      key: "identifier",
      get: function get() {
        return this.context.identifier;
      }
    }, {
      key: "actionAttribute",
      get: function get() {
        return this.schema.actionAttribute;
      }
    }, {
      key: "schema",
      get: function get() {
        return this.context.schema;
      }
    }, {
      key: "bindings",
      get: function get() {
        return Array.from(this.bindingsByAction.values());
      }
    }, {
      key: "connectAction",
      value: function connectAction(action) {
        var binding = new Binding(this.context, action);
        this.bindingsByAction.set(action, binding);
        this.delegate.bindingConnected(binding);
      }
    }, {
      key: "disconnectAction",
      value: function disconnectAction(action) {
        var binding = this.bindingsByAction.get(action);
        if (binding) {
          this.bindingsByAction["delete"](action);
          this.delegate.bindingDisconnected(binding);
        }
      }
    }, {
      key: "disconnectAllActions",
      value: function disconnectAllActions() {
        var _this7 = this;
        this.bindings.forEach(function (binding) {
          return _this7.delegate.bindingDisconnected(binding, true);
        });
        this.bindingsByAction.clear();
      }
    }, {
      key: "parseValueForToken",
      value: function parseValueForToken(token) {
        var action = Action.forToken(token, this.schema);
        if (action.identifier == this.identifier) {
          return action;
        }
      }
    }, {
      key: "elementMatchedValue",
      value: function elementMatchedValue(element, action) {
        this.connectAction(action);
      }
    }, {
      key: "elementUnmatchedValue",
      value: function elementUnmatchedValue(element, action) {
        this.disconnectAction(action);
      }
    }]);
  }();
  var ValueObserver = /*#__PURE__*/function () {
    function ValueObserver(context, receiver) {
      _classCallCheck(this, ValueObserver);
      this.context = context;
      this.receiver = receiver;
      this.stringMapObserver = new StringMapObserver(this.element, this);
      this.valueDescriptorMap = this.controller.valueDescriptorMap;
    }
    return _createClass(ValueObserver, [{
      key: "start",
      value: function start() {
        this.stringMapObserver.start();
        this.invokeChangedCallbacksForDefaultValues();
      }
    }, {
      key: "stop",
      value: function stop() {
        this.stringMapObserver.stop();
      }
    }, {
      key: "element",
      get: function get() {
        return this.context.element;
      }
    }, {
      key: "controller",
      get: function get() {
        return this.context.controller;
      }
    }, {
      key: "getStringMapKeyForAttribute",
      value: function getStringMapKeyForAttribute(attributeName) {
        if (attributeName in this.valueDescriptorMap) {
          return this.valueDescriptorMap[attributeName].name;
        }
      }
    }, {
      key: "stringMapKeyAdded",
      value: function stringMapKeyAdded(key, attributeName) {
        var descriptor = this.valueDescriptorMap[attributeName];
        if (!this.hasValue(key)) {
          this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), descriptor.writer(descriptor.defaultValue));
        }
      }
    }, {
      key: "stringMapValueChanged",
      value: function stringMapValueChanged(value, name, oldValue) {
        var descriptor = this.valueDescriptorNameMap[name];
        if (value === null) return;
        if (oldValue === null) {
          oldValue = descriptor.writer(descriptor.defaultValue);
        }
        this.invokeChangedCallback(name, value, oldValue);
      }
    }, {
      key: "stringMapKeyRemoved",
      value: function stringMapKeyRemoved(key, attributeName, oldValue) {
        var descriptor = this.valueDescriptorNameMap[key];
        if (this.hasValue(key)) {
          this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), oldValue);
        } else {
          this.invokeChangedCallback(key, descriptor.writer(descriptor.defaultValue), oldValue);
        }
      }
    }, {
      key: "invokeChangedCallbacksForDefaultValues",
      value: function invokeChangedCallbacksForDefaultValues() {
        var _iterator7 = _createForOfIteratorHelper(this.valueDescriptors),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _step7$value = _step7.value,
              key = _step7$value.key,
              name = _step7$value.name,
              defaultValue = _step7$value.defaultValue,
              writer = _step7$value.writer;
            if (defaultValue != undefined && !this.controller.data.has(key)) {
              this.invokeChangedCallback(name, writer(defaultValue), undefined);
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
    }, {
      key: "invokeChangedCallback",
      value: function invokeChangedCallback(name, rawValue, rawOldValue) {
        var changedMethodName = "".concat(name, "Changed");
        var changedMethod = this.receiver[changedMethodName];
        if (typeof changedMethod == "function") {
          var descriptor = this.valueDescriptorNameMap[name];
          try {
            var value = descriptor.reader(rawValue);
            var oldValue = rawOldValue;
            if (rawOldValue) {
              oldValue = descriptor.reader(rawOldValue);
            }
            changedMethod.call(this.receiver, value, oldValue);
          } catch (error) {
            if (error instanceof TypeError) {
              error.message = "Stimulus Value \"".concat(this.context.identifier, ".").concat(descriptor.name, "\" - ").concat(error.message);
            }
            throw error;
          }
        }
      }
    }, {
      key: "valueDescriptors",
      get: function get() {
        var valueDescriptorMap = this.valueDescriptorMap;
        return Object.keys(valueDescriptorMap).map(function (key) {
          return valueDescriptorMap[key];
        });
      }
    }, {
      key: "valueDescriptorNameMap",
      get: function get() {
        var _this8 = this;
        var descriptors = {};
        Object.keys(this.valueDescriptorMap).forEach(function (key) {
          var descriptor = _this8.valueDescriptorMap[key];
          descriptors[descriptor.name] = descriptor;
        });
        return descriptors;
      }
    }, {
      key: "hasValue",
      value: function hasValue(attributeName) {
        var descriptor = this.valueDescriptorNameMap[attributeName];
        var hasMethodName = "has".concat(capitalize(descriptor.name));
        return this.receiver[hasMethodName];
      }
    }]);
  }();
  var TargetObserver = /*#__PURE__*/function () {
    function TargetObserver(context, delegate) {
      _classCallCheck(this, TargetObserver);
      this.context = context;
      this.delegate = delegate;
      this.targetsByName = new Multimap();
    }
    return _createClass(TargetObserver, [{
      key: "start",
      value: function start() {
        if (!this.tokenListObserver) {
          this.tokenListObserver = new TokenListObserver(this.element, this.attributeName, this);
          this.tokenListObserver.start();
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.tokenListObserver) {
          this.disconnectAllTargets();
          this.tokenListObserver.stop();
          delete this.tokenListObserver;
        }
      }
    }, {
      key: "tokenMatched",
      value: function tokenMatched(_ref10) {
        var element = _ref10.element,
          name = _ref10.content;
        if (this.scope.containsElement(element)) {
          this.connectTarget(element, name);
        }
      }
    }, {
      key: "tokenUnmatched",
      value: function tokenUnmatched(_ref11) {
        var element = _ref11.element,
          name = _ref11.content;
        this.disconnectTarget(element, name);
      }
    }, {
      key: "connectTarget",
      value: function connectTarget(element, name) {
        var _this9 = this;
        var _a;
        if (!this.targetsByName.has(name, element)) {
          this.targetsByName.add(name, element);
          (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(function () {
            return _this9.delegate.targetConnected(element, name);
          });
        }
      }
    }, {
      key: "disconnectTarget",
      value: function disconnectTarget(element, name) {
        var _this10 = this;
        var _a;
        if (this.targetsByName.has(name, element)) {
          this.targetsByName["delete"](name, element);
          (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(function () {
            return _this10.delegate.targetDisconnected(element, name);
          });
        }
      }
    }, {
      key: "disconnectAllTargets",
      value: function disconnectAllTargets() {
        var _iterator8 = _createForOfIteratorHelper(this.targetsByName.keys),
          _step8;
        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var name = _step8.value;
            var _iterator9 = _createForOfIteratorHelper(this.targetsByName.getValuesForKey(name)),
              _step9;
            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                var element = _step9.value;
                this.disconnectTarget(element, name);
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      }
    }, {
      key: "attributeName",
      get: function get() {
        return "data-".concat(this.context.identifier, "-target");
      }
    }, {
      key: "element",
      get: function get() {
        return this.context.element;
      }
    }, {
      key: "scope",
      get: function get() {
        return this.context.scope;
      }
    }]);
  }();
  function readInheritableStaticArrayValues(constructor, propertyName) {
    var ancestors = getAncestorsForConstructor(constructor);
    return Array.from(ancestors.reduce(function (values, constructor) {
      getOwnStaticArrayValues(constructor, propertyName).forEach(function (name) {
        return values.add(name);
      });
      return values;
    }, new Set()));
  }
  function readInheritableStaticObjectPairs(constructor, propertyName) {
    var ancestors = getAncestorsForConstructor(constructor);
    return ancestors.reduce(function (pairs, constructor) {
      pairs.push.apply(pairs, _toConsumableArray(getOwnStaticObjectPairs(constructor, propertyName)));
      return pairs;
    }, []);
  }
  function getAncestorsForConstructor(constructor) {
    var ancestors = [];
    while (constructor) {
      ancestors.push(constructor);
      constructor = Object.getPrototypeOf(constructor);
    }
    return ancestors.reverse();
  }
  function getOwnStaticArrayValues(constructor, propertyName) {
    var definition = constructor[propertyName];
    return Array.isArray(definition) ? definition : [];
  }
  function getOwnStaticObjectPairs(constructor, propertyName) {
    var definition = constructor[propertyName];
    return definition ? Object.keys(definition).map(function (key) {
      return [key, definition[key]];
    }) : [];
  }
  var OutletObserver = /*#__PURE__*/function () {
    function OutletObserver(context, delegate) {
      _classCallCheck(this, OutletObserver);
      this.started = false;
      this.context = context;
      this.delegate = delegate;
      this.outletsByName = new Multimap();
      this.outletElementsByName = new Multimap();
      this.selectorObserverMap = new Map();
      this.attributeObserverMap = new Map();
    }
    return _createClass(OutletObserver, [{
      key: "start",
      value: function start() {
        var _this11 = this;
        if (!this.started) {
          this.outletDefinitions.forEach(function (outletName) {
            _this11.setupSelectorObserverForOutlet(outletName);
            _this11.setupAttributeObserverForOutlet(outletName);
          });
          this.started = true;
          this.dependentContexts.forEach(function (context) {
            return context.refresh();
          });
        }
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.selectorObserverMap.forEach(function (observer) {
          return observer.refresh();
        });
        this.attributeObserverMap.forEach(function (observer) {
          return observer.refresh();
        });
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.started) {
          this.started = false;
          this.disconnectAllOutlets();
          this.stopSelectorObservers();
          this.stopAttributeObservers();
        }
      }
    }, {
      key: "stopSelectorObservers",
      value: function stopSelectorObservers() {
        if (this.selectorObserverMap.size > 0) {
          this.selectorObserverMap.forEach(function (observer) {
            return observer.stop();
          });
          this.selectorObserverMap.clear();
        }
      }
    }, {
      key: "stopAttributeObservers",
      value: function stopAttributeObservers() {
        if (this.attributeObserverMap.size > 0) {
          this.attributeObserverMap.forEach(function (observer) {
            return observer.stop();
          });
          this.attributeObserverMap.clear();
        }
      }
    }, {
      key: "selectorMatched",
      value: function selectorMatched(element, _selector, _ref12) {
        var outletName = _ref12.outletName;
        var outlet = this.getOutlet(element, outletName);
        if (outlet) {
          this.connectOutlet(outlet, element, outletName);
        }
      }
    }, {
      key: "selectorUnmatched",
      value: function selectorUnmatched(element, _selector, _ref13) {
        var outletName = _ref13.outletName;
        var outlet = this.getOutletFromMap(element, outletName);
        if (outlet) {
          this.disconnectOutlet(outlet, element, outletName);
        }
      }
    }, {
      key: "selectorMatchElement",
      value: function selectorMatchElement(element, _ref14) {
        var outletName = _ref14.outletName;
        var selector = this.selector(outletName);
        var hasOutlet = this.hasOutlet(element, outletName);
        var hasOutletController = element.matches("[".concat(this.schema.controllerAttribute, "~=").concat(outletName, "]"));
        if (selector) {
          return hasOutlet && hasOutletController && element.matches(selector);
        } else {
          return false;
        }
      }
    }, {
      key: "elementMatchedAttribute",
      value: function elementMatchedAttribute(_element, attributeName) {
        var outletName = this.getOutletNameFromOutletAttributeName(attributeName);
        if (outletName) {
          this.updateSelectorObserverForOutlet(outletName);
        }
      }
    }, {
      key: "elementAttributeValueChanged",
      value: function elementAttributeValueChanged(_element, attributeName) {
        var outletName = this.getOutletNameFromOutletAttributeName(attributeName);
        if (outletName) {
          this.updateSelectorObserverForOutlet(outletName);
        }
      }
    }, {
      key: "elementUnmatchedAttribute",
      value: function elementUnmatchedAttribute(_element, attributeName) {
        var outletName = this.getOutletNameFromOutletAttributeName(attributeName);
        if (outletName) {
          this.updateSelectorObserverForOutlet(outletName);
        }
      }
    }, {
      key: "connectOutlet",
      value: function connectOutlet(outlet, element, outletName) {
        var _this12 = this;
        var _a;
        if (!this.outletElementsByName.has(outletName, element)) {
          this.outletsByName.add(outletName, outlet);
          this.outletElementsByName.add(outletName, element);
          (_a = this.selectorObserverMap.get(outletName)) === null || _a === void 0 ? void 0 : _a.pause(function () {
            return _this12.delegate.outletConnected(outlet, element, outletName);
          });
        }
      }
    }, {
      key: "disconnectOutlet",
      value: function disconnectOutlet(outlet, element, outletName) {
        var _this13 = this;
        var _a;
        if (this.outletElementsByName.has(outletName, element)) {
          this.outletsByName["delete"](outletName, outlet);
          this.outletElementsByName["delete"](outletName, element);
          (_a = this.selectorObserverMap.get(outletName)) === null || _a === void 0 ? void 0 : _a.pause(function () {
            return _this13.delegate.outletDisconnected(outlet, element, outletName);
          });
        }
      }
    }, {
      key: "disconnectAllOutlets",
      value: function disconnectAllOutlets() {
        var _iterator10 = _createForOfIteratorHelper(this.outletElementsByName.keys),
          _step10;
        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var outletName = _step10.value;
            var _iterator11 = _createForOfIteratorHelper(this.outletElementsByName.getValuesForKey(outletName)),
              _step11;
            try {
              for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                var element = _step11.value;
                var _iterator12 = _createForOfIteratorHelper(this.outletsByName.getValuesForKey(outletName)),
                  _step12;
                try {
                  for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                    var outlet = _step12.value;
                    this.disconnectOutlet(outlet, element, outletName);
                  }
                } catch (err) {
                  _iterator12.e(err);
                } finally {
                  _iterator12.f();
                }
              }
            } catch (err) {
              _iterator11.e(err);
            } finally {
              _iterator11.f();
            }
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
      }
    }, {
      key: "updateSelectorObserverForOutlet",
      value: function updateSelectorObserverForOutlet(outletName) {
        var observer = this.selectorObserverMap.get(outletName);
        if (observer) {
          observer.selector = this.selector(outletName);
        }
      }
    }, {
      key: "setupSelectorObserverForOutlet",
      value: function setupSelectorObserverForOutlet(outletName) {
        var selector = this.selector(outletName);
        var selectorObserver = new SelectorObserver(document.body, selector, this, {
          outletName: outletName
        });
        this.selectorObserverMap.set(outletName, selectorObserver);
        selectorObserver.start();
      }
    }, {
      key: "setupAttributeObserverForOutlet",
      value: function setupAttributeObserverForOutlet(outletName) {
        var attributeName = this.attributeNameForOutletName(outletName);
        var attributeObserver = new AttributeObserver(this.scope.element, attributeName, this);
        this.attributeObserverMap.set(outletName, attributeObserver);
        attributeObserver.start();
      }
    }, {
      key: "selector",
      value: function selector(outletName) {
        return this.scope.outlets.getSelectorForOutletName(outletName);
      }
    }, {
      key: "attributeNameForOutletName",
      value: function attributeNameForOutletName(outletName) {
        return this.scope.schema.outletAttributeForScope(this.identifier, outletName);
      }
    }, {
      key: "getOutletNameFromOutletAttributeName",
      value: function getOutletNameFromOutletAttributeName(attributeName) {
        var _this14 = this;
        return this.outletDefinitions.find(function (outletName) {
          return _this14.attributeNameForOutletName(outletName) === attributeName;
        });
      }
    }, {
      key: "outletDependencies",
      get: function get() {
        var dependencies = new Multimap();
        this.router.modules.forEach(function (module) {
          var constructor = module.definition.controllerConstructor;
          var outlets = readInheritableStaticArrayValues(constructor, "outlets");
          outlets.forEach(function (outlet) {
            return dependencies.add(outlet, module.identifier);
          });
        });
        return dependencies;
      }
    }, {
      key: "outletDefinitions",
      get: function get() {
        return this.outletDependencies.getKeysForValue(this.identifier);
      }
    }, {
      key: "dependentControllerIdentifiers",
      get: function get() {
        return this.outletDependencies.getValuesForKey(this.identifier);
      }
    }, {
      key: "dependentContexts",
      get: function get() {
        var identifiers = this.dependentControllerIdentifiers;
        return this.router.contexts.filter(function (context) {
          return identifiers.includes(context.identifier);
        });
      }
    }, {
      key: "hasOutlet",
      value: function hasOutlet(element, outletName) {
        return !!this.getOutlet(element, outletName) || !!this.getOutletFromMap(element, outletName);
      }
    }, {
      key: "getOutlet",
      value: function getOutlet(element, outletName) {
        return this.application.getControllerForElementAndIdentifier(element, outletName);
      }
    }, {
      key: "getOutletFromMap",
      value: function getOutletFromMap(element, outletName) {
        return this.outletsByName.getValuesForKey(outletName).find(function (outlet) {
          return outlet.element === element;
        });
      }
    }, {
      key: "scope",
      get: function get() {
        return this.context.scope;
      }
    }, {
      key: "schema",
      get: function get() {
        return this.context.schema;
      }
    }, {
      key: "identifier",
      get: function get() {
        return this.context.identifier;
      }
    }, {
      key: "application",
      get: function get() {
        return this.context.application;
      }
    }, {
      key: "router",
      get: function get() {
        return this.application.router;
      }
    }]);
  }();
  var Context = /*#__PURE__*/function () {
    function Context(module, scope) {
      var _this15 = this;
      _classCallCheck(this, Context);
      this.logDebugActivity = function (functionName) {
        var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var identifier = _this15.identifier,
          controller = _this15.controller,
          element = _this15.element;
        detail = Object.assign({
          identifier: identifier,
          controller: controller,
          element: element
        }, detail);
        _this15.application.logDebugActivity(_this15.identifier, functionName, detail);
      };
      this.module = module;
      this.scope = scope;
      this.controller = new module.controllerConstructor(this);
      this.bindingObserver = new BindingObserver(this, this.dispatcher);
      this.valueObserver = new ValueObserver(this, this.controller);
      this.targetObserver = new TargetObserver(this, this);
      this.outletObserver = new OutletObserver(this, this);
      try {
        this.controller.initialize();
        this.logDebugActivity("initialize");
      } catch (error) {
        this.handleError(error, "initializing controller");
      }
    }
    return _createClass(Context, [{
      key: "connect",
      value: function connect() {
        this.bindingObserver.start();
        this.valueObserver.start();
        this.targetObserver.start();
        this.outletObserver.start();
        try {
          this.controller.connect();
          this.logDebugActivity("connect");
        } catch (error) {
          this.handleError(error, "connecting controller");
        }
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.outletObserver.refresh();
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        try {
          this.controller.disconnect();
          this.logDebugActivity("disconnect");
        } catch (error) {
          this.handleError(error, "disconnecting controller");
        }
        this.outletObserver.stop();
        this.targetObserver.stop();
        this.valueObserver.stop();
        this.bindingObserver.stop();
      }
    }, {
      key: "application",
      get: function get() {
        return this.module.application;
      }
    }, {
      key: "identifier",
      get: function get() {
        return this.module.identifier;
      }
    }, {
      key: "schema",
      get: function get() {
        return this.application.schema;
      }
    }, {
      key: "dispatcher",
      get: function get() {
        return this.application.dispatcher;
      }
    }, {
      key: "element",
      get: function get() {
        return this.scope.element;
      }
    }, {
      key: "parentElement",
      get: function get() {
        return this.element.parentElement;
      }
    }, {
      key: "handleError",
      value: function handleError(error, message) {
        var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var identifier = this.identifier,
          controller = this.controller,
          element = this.element;
        detail = Object.assign({
          identifier: identifier,
          controller: controller,
          element: element
        }, detail);
        this.application.handleError(error, "Error ".concat(message), detail);
      }
    }, {
      key: "targetConnected",
      value: function targetConnected(element, name) {
        this.invokeControllerMethod("".concat(name, "TargetConnected"), element);
      }
    }, {
      key: "targetDisconnected",
      value: function targetDisconnected(element, name) {
        this.invokeControllerMethod("".concat(name, "TargetDisconnected"), element);
      }
    }, {
      key: "outletConnected",
      value: function outletConnected(outlet, element, name) {
        this.invokeControllerMethod("".concat(namespaceCamelize(name), "OutletConnected"), outlet, element);
      }
    }, {
      key: "outletDisconnected",
      value: function outletDisconnected(outlet, element, name) {
        this.invokeControllerMethod("".concat(namespaceCamelize(name), "OutletDisconnected"), outlet, element);
      }
    }, {
      key: "invokeControllerMethod",
      value: function invokeControllerMethod(methodName) {
        var controller = this.controller;
        if (typeof controller[methodName] == "function") {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          controller[methodName].apply(controller, args);
        }
      }
    }]);
  }();
  function bless(constructor) {
    return shadow(constructor, getBlessedProperties(constructor));
  }
  function shadow(constructor, properties) {
    var shadowConstructor = extend$1(constructor);
    var shadowProperties = getShadowProperties(constructor.prototype, properties);
    Object.defineProperties(shadowConstructor.prototype, shadowProperties);
    return shadowConstructor;
  }
  function getBlessedProperties(constructor) {
    var blessings = readInheritableStaticArrayValues(constructor, "blessings");
    return blessings.reduce(function (blessedProperties, blessing) {
      var properties = blessing(constructor);
      for (var key in properties) {
        var descriptor = blessedProperties[key] || {};
        blessedProperties[key] = Object.assign(descriptor, properties[key]);
      }
      return blessedProperties;
    }, {});
  }
  function getShadowProperties(prototype, properties) {
    return getOwnKeys(properties).reduce(function (shadowProperties, key) {
      var descriptor = getShadowedDescriptor(prototype, properties, key);
      if (descriptor) {
        Object.assign(shadowProperties, _defineProperty({}, key, descriptor));
      }
      return shadowProperties;
    }, {});
  }
  function getShadowedDescriptor(prototype, properties, key) {
    var shadowingDescriptor = Object.getOwnPropertyDescriptor(prototype, key);
    var shadowedByValue = shadowingDescriptor && "value" in shadowingDescriptor;
    if (!shadowedByValue) {
      var descriptor = Object.getOwnPropertyDescriptor(properties, key).value;
      if (shadowingDescriptor) {
        descriptor.get = shadowingDescriptor.get || descriptor.get;
        descriptor.set = shadowingDescriptor.set || descriptor.set;
      }
      return descriptor;
    }
  }
  var getOwnKeys = function () {
    if (typeof Object.getOwnPropertySymbols == "function") {
      return function (object) {
        return [].concat(_toConsumableArray(Object.getOwnPropertyNames(object)), _toConsumableArray(Object.getOwnPropertySymbols(object)));
      };
    } else {
      return Object.getOwnPropertyNames;
    }
  }();
  var extend$1 = function () {
    function extendWithReflect(constructor) {
      function extended() {
        return Reflect.construct(constructor, arguments, this instanceof extended ? this.constructor : void 0);
      }
      extended.prototype = Object.create(constructor.prototype, {
        constructor: {
          value: extended
        }
      });
      Reflect.setPrototypeOf(extended, constructor);
      return extended;
    }
    function testReflectExtension() {
      var a = function a() {
        this.a.call(this);
      };
      var b = extendWithReflect(a);
      b.prototype.a = function () {};
      return new b();
    }
    try {
      testReflectExtension();
      return extendWithReflect;
    } catch (error) {
      return function (constructor) {
        return /*#__PURE__*/function (_constructor) {
          function extended() {
            _classCallCheck(this, extended);
            return _callSuper(this, extended, arguments);
          }
          _inherits(extended, _constructor);
          return _createClass(extended);
        }(constructor);
      };
    }
  }();
  function blessDefinition(definition) {
    return {
      identifier: definition.identifier,
      controllerConstructor: bless(definition.controllerConstructor)
    };
  }
  var Module = /*#__PURE__*/function () {
    function Module(application, definition) {
      _classCallCheck(this, Module);
      this.application = application;
      this.definition = blessDefinition(definition);
      this.contextsByScope = new WeakMap();
      this.connectedContexts = new Set();
    }
    return _createClass(Module, [{
      key: "identifier",
      get: function get() {
        return this.definition.identifier;
      }
    }, {
      key: "controllerConstructor",
      get: function get() {
        return this.definition.controllerConstructor;
      }
    }, {
      key: "contexts",
      get: function get() {
        return Array.from(this.connectedContexts);
      }
    }, {
      key: "connectContextForScope",
      value: function connectContextForScope(scope) {
        var context = this.fetchContextForScope(scope);
        this.connectedContexts.add(context);
        context.connect();
      }
    }, {
      key: "disconnectContextForScope",
      value: function disconnectContextForScope(scope) {
        var context = this.contextsByScope.get(scope);
        if (context) {
          this.connectedContexts["delete"](context);
          context.disconnect();
        }
      }
    }, {
      key: "fetchContextForScope",
      value: function fetchContextForScope(scope) {
        var context = this.contextsByScope.get(scope);
        if (!context) {
          context = new Context(this, scope);
          this.contextsByScope.set(scope, context);
        }
        return context;
      }
    }]);
  }();
  var ClassMap = /*#__PURE__*/function () {
    function ClassMap(scope) {
      _classCallCheck(this, ClassMap);
      this.scope = scope;
    }
    return _createClass(ClassMap, [{
      key: "has",
      value: function has(name) {
        return this.data.has(this.getDataKey(name));
      }
    }, {
      key: "get",
      value: function get(name) {
        return this.getAll(name)[0];
      }
    }, {
      key: "getAll",
      value: function getAll(name) {
        var tokenString = this.data.get(this.getDataKey(name)) || "";
        return tokenize(tokenString);
      }
    }, {
      key: "getAttributeName",
      value: function getAttributeName(name) {
        return this.data.getAttributeNameForKey(this.getDataKey(name));
      }
    }, {
      key: "getDataKey",
      value: function getDataKey(name) {
        return "".concat(name, "-class");
      }
    }, {
      key: "data",
      get: function get() {
        return this.scope.data;
      }
    }]);
  }();
  var DataMap = /*#__PURE__*/function () {
    function DataMap(scope) {
      _classCallCheck(this, DataMap);
      this.scope = scope;
    }
    return _createClass(DataMap, [{
      key: "element",
      get: function get() {
        return this.scope.element;
      }
    }, {
      key: "identifier",
      get: function get() {
        return this.scope.identifier;
      }
    }, {
      key: "get",
      value: function get(key) {
        var name = this.getAttributeNameForKey(key);
        return this.element.getAttribute(name);
      }
    }, {
      key: "set",
      value: function set(key, value) {
        var name = this.getAttributeNameForKey(key);
        this.element.setAttribute(name, value);
        return this.get(key);
      }
    }, {
      key: "has",
      value: function has(key) {
        var name = this.getAttributeNameForKey(key);
        return this.element.hasAttribute(name);
      }
    }, {
      key: "delete",
      value: function _delete(key) {
        if (this.has(key)) {
          var name = this.getAttributeNameForKey(key);
          this.element.removeAttribute(name);
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "getAttributeNameForKey",
      value: function getAttributeNameForKey(key) {
        return "data-".concat(this.identifier, "-").concat(dasherize(key));
      }
    }]);
  }();
  var Guide = /*#__PURE__*/function () {
    function Guide(logger) {
      _classCallCheck(this, Guide);
      this.warnedKeysByObject = new WeakMap();
      this.logger = logger;
    }
    return _createClass(Guide, [{
      key: "warn",
      value: function warn(object, key, message) {
        var warnedKeys = this.warnedKeysByObject.get(object);
        if (!warnedKeys) {
          warnedKeys = new Set();
          this.warnedKeysByObject.set(object, warnedKeys);
        }
        if (!warnedKeys.has(key)) {
          warnedKeys.add(key);
          this.logger.warn(message, object);
        }
      }
    }]);
  }();
  function attributeValueContainsToken(attributeName, token) {
    return "[".concat(attributeName, "~=\"").concat(token, "\"]");
  }
  var TargetSet = /*#__PURE__*/function () {
    function TargetSet(scope) {
      _classCallCheck(this, TargetSet);
      this.scope = scope;
    }
    return _createClass(TargetSet, [{
      key: "element",
      get: function get() {
        return this.scope.element;
      }
    }, {
      key: "identifier",
      get: function get() {
        return this.scope.identifier;
      }
    }, {
      key: "schema",
      get: function get() {
        return this.scope.schema;
      }
    }, {
      key: "has",
      value: function has(targetName) {
        return this.find(targetName) != null;
      }
    }, {
      key: "find",
      value: function find() {
        var _this16 = this;
        for (var _len2 = arguments.length, targetNames = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
          targetNames[_key3] = arguments[_key3];
        }
        return targetNames.reduce(function (target, targetName) {
          return target || _this16.findTarget(targetName) || _this16.findLegacyTarget(targetName);
        }, undefined);
      }
    }, {
      key: "findAll",
      value: function findAll() {
        var _this17 = this;
        for (var _len3 = arguments.length, targetNames = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
          targetNames[_key4] = arguments[_key4];
        }
        return targetNames.reduce(function (targets, targetName) {
          return [].concat(_toConsumableArray(targets), _toConsumableArray(_this17.findAllTargets(targetName)), _toConsumableArray(_this17.findAllLegacyTargets(targetName)));
        }, []);
      }
    }, {
      key: "findTarget",
      value: function findTarget(targetName) {
        var selector = this.getSelectorForTargetName(targetName);
        return this.scope.findElement(selector);
      }
    }, {
      key: "findAllTargets",
      value: function findAllTargets(targetName) {
        var selector = this.getSelectorForTargetName(targetName);
        return this.scope.findAllElements(selector);
      }
    }, {
      key: "getSelectorForTargetName",
      value: function getSelectorForTargetName(targetName) {
        var attributeName = this.schema.targetAttributeForScope(this.identifier);
        return attributeValueContainsToken(attributeName, targetName);
      }
    }, {
      key: "findLegacyTarget",
      value: function findLegacyTarget(targetName) {
        var selector = this.getLegacySelectorForTargetName(targetName);
        return this.deprecate(this.scope.findElement(selector), targetName);
      }
    }, {
      key: "findAllLegacyTargets",
      value: function findAllLegacyTargets(targetName) {
        var _this18 = this;
        var selector = this.getLegacySelectorForTargetName(targetName);
        return this.scope.findAllElements(selector).map(function (element) {
          return _this18.deprecate(element, targetName);
        });
      }
    }, {
      key: "getLegacySelectorForTargetName",
      value: function getLegacySelectorForTargetName(targetName) {
        var targetDescriptor = "".concat(this.identifier, ".").concat(targetName);
        return attributeValueContainsToken(this.schema.targetAttribute, targetDescriptor);
      }
    }, {
      key: "deprecate",
      value: function deprecate(element, targetName) {
        if (element) {
          var identifier = this.identifier;
          var attributeName = this.schema.targetAttribute;
          var revisedAttributeName = this.schema.targetAttributeForScope(identifier);
          this.guide.warn(element, "target:".concat(targetName), "Please replace ".concat(attributeName, "=\"").concat(identifier, ".").concat(targetName, "\" with ").concat(revisedAttributeName, "=\"").concat(targetName, "\". ") + "The ".concat(attributeName, " attribute is deprecated and will be removed in a future version of Stimulus."));
        }
        return element;
      }
    }, {
      key: "guide",
      get: function get() {
        return this.scope.guide;
      }
    }]);
  }();
  var OutletSet = /*#__PURE__*/function () {
    function OutletSet(scope, controllerElement) {
      _classCallCheck(this, OutletSet);
      this.scope = scope;
      this.controllerElement = controllerElement;
    }
    return _createClass(OutletSet, [{
      key: "element",
      get: function get() {
        return this.scope.element;
      }
    }, {
      key: "identifier",
      get: function get() {
        return this.scope.identifier;
      }
    }, {
      key: "schema",
      get: function get() {
        return this.scope.schema;
      }
    }, {
      key: "has",
      value: function has(outletName) {
        return this.find(outletName) != null;
      }
    }, {
      key: "find",
      value: function find() {
        var _this19 = this;
        for (var _len4 = arguments.length, outletNames = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
          outletNames[_key5] = arguments[_key5];
        }
        return outletNames.reduce(function (outlet, outletName) {
          return outlet || _this19.findOutlet(outletName);
        }, undefined);
      }
    }, {
      key: "findAll",
      value: function findAll() {
        var _this20 = this;
        for (var _len5 = arguments.length, outletNames = new Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
          outletNames[_key6] = arguments[_key6];
        }
        return outletNames.reduce(function (outlets, outletName) {
          return [].concat(_toConsumableArray(outlets), _toConsumableArray(_this20.findAllOutlets(outletName)));
        }, []);
      }
    }, {
      key: "getSelectorForOutletName",
      value: function getSelectorForOutletName(outletName) {
        var attributeName = this.schema.outletAttributeForScope(this.identifier, outletName);
        return this.controllerElement.getAttribute(attributeName);
      }
    }, {
      key: "findOutlet",
      value: function findOutlet(outletName) {
        var selector = this.getSelectorForOutletName(outletName);
        if (selector) return this.findElement(selector, outletName);
      }
    }, {
      key: "findAllOutlets",
      value: function findAllOutlets(outletName) {
        var selector = this.getSelectorForOutletName(outletName);
        return selector ? this.findAllElements(selector, outletName) : [];
      }
    }, {
      key: "findElement",
      value: function findElement(selector, outletName) {
        var _this21 = this;
        var elements = this.scope.queryElements(selector);
        return elements.filter(function (element) {
          return _this21.matchesElement(element, selector, outletName);
        })[0];
      }
    }, {
      key: "findAllElements",
      value: function findAllElements(selector, outletName) {
        var _this22 = this;
        var elements = this.scope.queryElements(selector);
        return elements.filter(function (element) {
          return _this22.matchesElement(element, selector, outletName);
        });
      }
    }, {
      key: "matchesElement",
      value: function matchesElement(element, selector, outletName) {
        var controllerAttribute = element.getAttribute(this.scope.schema.controllerAttribute) || "";
        return element.matches(selector) && controllerAttribute.split(" ").includes(outletName);
      }
    }]);
  }();
  var Scope = /*#__PURE__*/function () {
    function Scope(schema, element, identifier, logger) {
      var _this23 = this;
      _classCallCheck(this, Scope);
      this.targets = new TargetSet(this);
      this.classes = new ClassMap(this);
      this.data = new DataMap(this);
      this.containsElement = function (element) {
        return element.closest(_this23.controllerSelector) === _this23.element;
      };
      this.schema = schema;
      this.element = element;
      this.identifier = identifier;
      this.guide = new Guide(logger);
      this.outlets = new OutletSet(this.documentScope, element);
    }
    return _createClass(Scope, [{
      key: "findElement",
      value: function findElement(selector) {
        return this.element.matches(selector) ? this.element : this.queryElements(selector).find(this.containsElement);
      }
    }, {
      key: "findAllElements",
      value: function findAllElements(selector) {
        return [].concat(_toConsumableArray(this.element.matches(selector) ? [this.element] : []), _toConsumableArray(this.queryElements(selector).filter(this.containsElement)));
      }
    }, {
      key: "queryElements",
      value: function queryElements(selector) {
        return Array.from(this.element.querySelectorAll(selector));
      }
    }, {
      key: "controllerSelector",
      get: function get() {
        return attributeValueContainsToken(this.schema.controllerAttribute, this.identifier);
      }
    }, {
      key: "isDocumentScope",
      get: function get() {
        return this.element === document.documentElement;
      }
    }, {
      key: "documentScope",
      get: function get() {
        return this.isDocumentScope ? this : new Scope(this.schema, document.documentElement, this.identifier, this.guide.logger);
      }
    }]);
  }();
  var ScopeObserver = /*#__PURE__*/function () {
    function ScopeObserver(element, schema, delegate) {
      _classCallCheck(this, ScopeObserver);
      this.element = element;
      this.schema = schema;
      this.delegate = delegate;
      this.valueListObserver = new ValueListObserver(this.element, this.controllerAttribute, this);
      this.scopesByIdentifierByElement = new WeakMap();
      this.scopeReferenceCounts = new WeakMap();
    }
    return _createClass(ScopeObserver, [{
      key: "start",
      value: function start() {
        this.valueListObserver.start();
      }
    }, {
      key: "stop",
      value: function stop() {
        this.valueListObserver.stop();
      }
    }, {
      key: "controllerAttribute",
      get: function get() {
        return this.schema.controllerAttribute;
      }
    }, {
      key: "parseValueForToken",
      value: function parseValueForToken(token) {
        var element = token.element,
          identifier = token.content;
        return this.parseValueForElementAndIdentifier(element, identifier);
      }
    }, {
      key: "parseValueForElementAndIdentifier",
      value: function parseValueForElementAndIdentifier(element, identifier) {
        var scopesByIdentifier = this.fetchScopesByIdentifierForElement(element);
        var scope = scopesByIdentifier.get(identifier);
        if (!scope) {
          scope = this.delegate.createScopeForElementAndIdentifier(element, identifier);
          scopesByIdentifier.set(identifier, scope);
        }
        return scope;
      }
    }, {
      key: "elementMatchedValue",
      value: function elementMatchedValue(element, value) {
        var referenceCount = (this.scopeReferenceCounts.get(value) || 0) + 1;
        this.scopeReferenceCounts.set(value, referenceCount);
        if (referenceCount == 1) {
          this.delegate.scopeConnected(value);
        }
      }
    }, {
      key: "elementUnmatchedValue",
      value: function elementUnmatchedValue(element, value) {
        var referenceCount = this.scopeReferenceCounts.get(value);
        if (referenceCount) {
          this.scopeReferenceCounts.set(value, referenceCount - 1);
          if (referenceCount == 1) {
            this.delegate.scopeDisconnected(value);
          }
        }
      }
    }, {
      key: "fetchScopesByIdentifierForElement",
      value: function fetchScopesByIdentifierForElement(element) {
        var scopesByIdentifier = this.scopesByIdentifierByElement.get(element);
        if (!scopesByIdentifier) {
          scopesByIdentifier = new Map();
          this.scopesByIdentifierByElement.set(element, scopesByIdentifier);
        }
        return scopesByIdentifier;
      }
    }]);
  }();
  var Router = /*#__PURE__*/function () {
    function Router(application) {
      _classCallCheck(this, Router);
      this.application = application;
      this.scopeObserver = new ScopeObserver(this.element, this.schema, this);
      this.scopesByIdentifier = new Multimap();
      this.modulesByIdentifier = new Map();
    }
    return _createClass(Router, [{
      key: "element",
      get: function get() {
        return this.application.element;
      }
    }, {
      key: "schema",
      get: function get() {
        return this.application.schema;
      }
    }, {
      key: "logger",
      get: function get() {
        return this.application.logger;
      }
    }, {
      key: "controllerAttribute",
      get: function get() {
        return this.schema.controllerAttribute;
      }
    }, {
      key: "modules",
      get: function get() {
        return Array.from(this.modulesByIdentifier.values());
      }
    }, {
      key: "contexts",
      get: function get() {
        return this.modules.reduce(function (contexts, module) {
          return contexts.concat(module.contexts);
        }, []);
      }
    }, {
      key: "start",
      value: function start() {
        this.scopeObserver.start();
      }
    }, {
      key: "stop",
      value: function stop() {
        this.scopeObserver.stop();
      }
    }, {
      key: "loadDefinition",
      value: function loadDefinition(definition) {
        this.unloadIdentifier(definition.identifier);
        var module = new Module(this.application, definition);
        this.connectModule(module);
        var afterLoad = definition.controllerConstructor.afterLoad;
        if (afterLoad) {
          afterLoad.call(definition.controllerConstructor, definition.identifier, this.application);
        }
      }
    }, {
      key: "unloadIdentifier",
      value: function unloadIdentifier(identifier) {
        var module = this.modulesByIdentifier.get(identifier);
        if (module) {
          this.disconnectModule(module);
        }
      }
    }, {
      key: "getContextForElementAndIdentifier",
      value: function getContextForElementAndIdentifier(element, identifier) {
        var module = this.modulesByIdentifier.get(identifier);
        if (module) {
          return module.contexts.find(function (context) {
            return context.element == element;
          });
        }
      }
    }, {
      key: "proposeToConnectScopeForElementAndIdentifier",
      value: function proposeToConnectScopeForElementAndIdentifier(element, identifier) {
        var scope = this.scopeObserver.parseValueForElementAndIdentifier(element, identifier);
        if (scope) {
          this.scopeObserver.elementMatchedValue(scope.element, scope);
        } else {
          console.error("Couldn't find or create scope for identifier: \"".concat(identifier, "\" and element:"), element);
        }
      }
    }, {
      key: "handleError",
      value: function handleError(error, message, detail) {
        this.application.handleError(error, message, detail);
      }
    }, {
      key: "createScopeForElementAndIdentifier",
      value: function createScopeForElementAndIdentifier(element, identifier) {
        return new Scope(this.schema, element, identifier, this.logger);
      }
    }, {
      key: "scopeConnected",
      value: function scopeConnected(scope) {
        this.scopesByIdentifier.add(scope.identifier, scope);
        var module = this.modulesByIdentifier.get(scope.identifier);
        if (module) {
          module.connectContextForScope(scope);
        }
      }
    }, {
      key: "scopeDisconnected",
      value: function scopeDisconnected(scope) {
        this.scopesByIdentifier["delete"](scope.identifier, scope);
        var module = this.modulesByIdentifier.get(scope.identifier);
        if (module) {
          module.disconnectContextForScope(scope);
        }
      }
    }, {
      key: "connectModule",
      value: function connectModule(module) {
        this.modulesByIdentifier.set(module.identifier, module);
        var scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
        scopes.forEach(function (scope) {
          return module.connectContextForScope(scope);
        });
      }
    }, {
      key: "disconnectModule",
      value: function disconnectModule(module) {
        this.modulesByIdentifier["delete"](module.identifier);
        var scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
        scopes.forEach(function (scope) {
          return module.disconnectContextForScope(scope);
        });
      }
    }]);
  }();
  var defaultSchema = {
    controllerAttribute: "data-controller",
    actionAttribute: "data-action",
    targetAttribute: "data-target",
    targetAttributeForScope: function targetAttributeForScope(identifier) {
      return "data-".concat(identifier, "-target");
    },
    outletAttributeForScope: function outletAttributeForScope(identifier, outlet) {
      return "data-".concat(identifier, "-").concat(outlet, "-outlet");
    },
    keyMappings: Object.assign(Object.assign({
      enter: "Enter",
      tab: "Tab",
      esc: "Escape",
      space: " ",
      up: "ArrowUp",
      down: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
      home: "Home",
      end: "End",
      page_up: "PageUp",
      page_down: "PageDown"
    }, objectFromEntries("abcdefghijklmnopqrstuvwxyz".split("").map(function (c) {
      return [c, c];
    }))), objectFromEntries("0123456789".split("").map(function (n) {
      return [n, n];
    })))
  };
  function objectFromEntries(array) {
    return array.reduce(function (memo, _ref15) {
      var _ref16 = _slicedToArray(_ref15, 2),
        k = _ref16[0],
        v = _ref16[1];
      return Object.assign(Object.assign({}, memo), _defineProperty({}, k, v));
    }, {});
  }
  var Application = /*#__PURE__*/function () {
    function Application() {
      var _this24 = this;
      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.documentElement;
      var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSchema;
      _classCallCheck(this, Application);
      this.logger = console;
      this.debug = false;
      this.logDebugActivity = function (identifier, functionName) {
        var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        if (_this24.debug) {
          _this24.logFormattedMessage(identifier, functionName, detail);
        }
      };
      this.element = element;
      this.schema = schema;
      this.dispatcher = new Dispatcher(this);
      this.router = new Router(this);
      this.actionDescriptorFilters = Object.assign({}, defaultActionDescriptorFilters);
    }
    return _createClass(Application, [{
      key: "start",
      value: function () {
        var _start = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return domReady();
              case 2:
                this.logDebugActivity("application", "starting");
                this.dispatcher.start();
                this.router.start();
                this.logDebugActivity("application", "start");
              case 6:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function start() {
          return _start.apply(this, arguments);
        }
        return start;
      }()
    }, {
      key: "stop",
      value: function stop() {
        this.logDebugActivity("application", "stopping");
        this.dispatcher.stop();
        this.router.stop();
        this.logDebugActivity("application", "stop");
      }
    }, {
      key: "register",
      value: function register(identifier, controllerConstructor) {
        this.load({
          identifier: identifier,
          controllerConstructor: controllerConstructor
        });
      }
    }, {
      key: "registerActionOption",
      value: function registerActionOption(name, filter) {
        this.actionDescriptorFilters[name] = filter;
      }
    }, {
      key: "load",
      value: function load(head) {
        var _this25 = this;
        for (var _len6 = arguments.length, rest = new Array(_len6 > 1 ? _len6 - 1 : 0), _key7 = 1; _key7 < _len6; _key7++) {
          rest[_key7 - 1] = arguments[_key7];
        }
        var definitions = Array.isArray(head) ? head : [head].concat(rest);
        definitions.forEach(function (definition) {
          if (definition.controllerConstructor.shouldLoad) {
            _this25.router.loadDefinition(definition);
          }
        });
      }
    }, {
      key: "unload",
      value: function unload(head) {
        var _this26 = this;
        for (var _len7 = arguments.length, rest = new Array(_len7 > 1 ? _len7 - 1 : 0), _key8 = 1; _key8 < _len7; _key8++) {
          rest[_key8 - 1] = arguments[_key8];
        }
        var identifiers = Array.isArray(head) ? head : [head].concat(rest);
        identifiers.forEach(function (identifier) {
          return _this26.router.unloadIdentifier(identifier);
        });
      }
    }, {
      key: "controllers",
      get: function get() {
        return this.router.contexts.map(function (context) {
          return context.controller;
        });
      }
    }, {
      key: "getControllerForElementAndIdentifier",
      value: function getControllerForElementAndIdentifier(element, identifier) {
        var context = this.router.getContextForElementAndIdentifier(element, identifier);
        return context ? context.controller : null;
      }
    }, {
      key: "handleError",
      value: function handleError(error, message, detail) {
        var _a;
        this.logger.error("%s\n\n%o\n\n%o", message, error, detail);
        (_a = window.onerror) === null || _a === void 0 ? void 0 : _a.call(window, message, "", 0, 0, error);
      }
    }, {
      key: "logFormattedMessage",
      value: function logFormattedMessage(identifier, functionName) {
        var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        detail = Object.assign({
          application: this
        }, detail);
        this.logger.groupCollapsed("".concat(identifier, " #").concat(functionName));
        this.logger.log("details:", Object.assign({}, detail));
        this.logger.groupEnd();
      }
    }], [{
      key: "start",
      value: function start(element, schema) {
        var application = new this(element, schema);
        application.start();
        return application;
      }
    }]);
  }();
  function domReady() {
    return new Promise(function (resolve) {
      if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      } else {
        resolve();
      }
    });
  }
  function ClassPropertiesBlessing(constructor) {
    var classes = readInheritableStaticArrayValues(constructor, "classes");
    return classes.reduce(function (properties, classDefinition) {
      return Object.assign(properties, propertiesForClassDefinition(classDefinition));
    }, {});
  }
  function propertiesForClassDefinition(key) {
    return _defineProperty(_defineProperty(_defineProperty({}, "".concat(key, "Class"), {
      get: function get() {
        var classes = this.classes;
        if (classes.has(key)) {
          return classes.get(key);
        } else {
          var attribute = classes.getAttributeName(key);
          throw new Error("Missing attribute \"".concat(attribute, "\""));
        }
      }
    }), "".concat(key, "Classes"), {
      get: function get() {
        return this.classes.getAll(key);
      }
    }), "has".concat(capitalize(key), "Class"), {
      get: function get() {
        return this.classes.has(key);
      }
    });
  }
  function OutletPropertiesBlessing(constructor) {
    var outlets = readInheritableStaticArrayValues(constructor, "outlets");
    return outlets.reduce(function (properties, outletDefinition) {
      return Object.assign(properties, propertiesForOutletDefinition(outletDefinition));
    }, {});
  }
  function getOutletController(controller, element, identifier) {
    return controller.application.getControllerForElementAndIdentifier(element, identifier);
  }
  function getControllerAndEnsureConnectedScope(controller, element, outletName) {
    var outletController = getOutletController(controller, element, outletName);
    if (outletController) return outletController;
    controller.application.router.proposeToConnectScopeForElementAndIdentifier(element, outletName);
    outletController = getOutletController(controller, element, outletName);
    if (outletController) return outletController;
  }
  function propertiesForOutletDefinition(name) {
    var camelizedName = namespaceCamelize(name);
    return _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(camelizedName, "Outlet"), {
      get: function get() {
        var outletElement = this.outlets.find(name);
        var selector = this.outlets.getSelectorForOutletName(name);
        if (outletElement) {
          var outletController = getControllerAndEnsureConnectedScope(this, outletElement, name);
          if (outletController) return outletController;
          throw new Error("The provided outlet element is missing an outlet controller \"".concat(name, "\" instance for host controller \"").concat(this.identifier, "\""));
        }
        throw new Error("Missing outlet element \"".concat(name, "\" for host controller \"").concat(this.identifier, "\". Stimulus couldn't find a matching outlet element using selector \"").concat(selector, "\"."));
      }
    }), "".concat(camelizedName, "Outlets"), {
      get: function get() {
        var _this27 = this;
        var outlets = this.outlets.findAll(name);
        if (outlets.length > 0) {
          return outlets.map(function (outletElement) {
            var outletController = getControllerAndEnsureConnectedScope(_this27, outletElement, name);
            if (outletController) return outletController;
            console.warn("The provided outlet element is missing an outlet controller \"".concat(name, "\" instance for host controller \"").concat(_this27.identifier, "\""), outletElement);
          }).filter(function (controller) {
            return controller;
          });
        }
        return [];
      }
    }), "".concat(camelizedName, "OutletElement"), {
      get: function get() {
        var outletElement = this.outlets.find(name);
        var selector = this.outlets.getSelectorForOutletName(name);
        if (outletElement) {
          return outletElement;
        } else {
          throw new Error("Missing outlet element \"".concat(name, "\" for host controller \"").concat(this.identifier, "\". Stimulus couldn't find a matching outlet element using selector \"").concat(selector, "\"."));
        }
      }
    }), "".concat(camelizedName, "OutletElements"), {
      get: function get() {
        return this.outlets.findAll(name);
      }
    }), "has".concat(capitalize(camelizedName), "Outlet"), {
      get: function get() {
        return this.outlets.has(name);
      }
    });
  }
  function TargetPropertiesBlessing(constructor) {
    var targets = readInheritableStaticArrayValues(constructor, "targets");
    return targets.reduce(function (properties, targetDefinition) {
      return Object.assign(properties, propertiesForTargetDefinition(targetDefinition));
    }, {});
  }
  function propertiesForTargetDefinition(name) {
    return _defineProperty(_defineProperty(_defineProperty({}, "".concat(name, "Target"), {
      get: function get() {
        var target = this.targets.find(name);
        if (target) {
          return target;
        } else {
          throw new Error("Missing target element \"".concat(name, "\" for \"").concat(this.identifier, "\" controller"));
        }
      }
    }), "".concat(name, "Targets"), {
      get: function get() {
        return this.targets.findAll(name);
      }
    }), "has".concat(capitalize(name), "Target"), {
      get: function get() {
        return this.targets.has(name);
      }
    });
  }
  function ValuePropertiesBlessing(constructor) {
    var valueDefinitionPairs = readInheritableStaticObjectPairs(constructor, "values");
    var propertyDescriptorMap = {
      valueDescriptorMap: {
        get: function get() {
          var _this28 = this;
          return valueDefinitionPairs.reduce(function (result, valueDefinitionPair) {
            var valueDescriptor = parseValueDefinitionPair(valueDefinitionPair, _this28.identifier);
            var attributeName = _this28.data.getAttributeNameForKey(valueDescriptor.key);
            return Object.assign(result, _defineProperty({}, attributeName, valueDescriptor));
          }, {});
        }
      }
    };
    return valueDefinitionPairs.reduce(function (properties, valueDefinitionPair) {
      return Object.assign(properties, propertiesForValueDefinitionPair(valueDefinitionPair));
    }, propertyDescriptorMap);
  }
  function propertiesForValueDefinitionPair(valueDefinitionPair, controller) {
    var definition = parseValueDefinitionPair(valueDefinitionPair, controller);
    var key = definition.key,
      name = definition.name,
      read = definition.reader,
      write = definition.writer;
    return _defineProperty(_defineProperty({}, name, {
      get: function get() {
        var value = this.data.get(key);
        if (value !== null) {
          return read(value);
        } else {
          return definition.defaultValue;
        }
      },
      set: function set(value) {
        if (value === undefined) {
          this.data["delete"](key);
        } else {
          this.data.set(key, write(value));
        }
      }
    }), "has".concat(capitalize(name)), {
      get: function get() {
        return this.data.has(key) || definition.hasCustomDefaultValue;
      }
    });
  }
  function parseValueDefinitionPair(_ref21, controller) {
    var _ref22 = _slicedToArray(_ref21, 2),
      token = _ref22[0],
      typeDefinition = _ref22[1];
    return valueDescriptorForTokenAndTypeDefinition({
      controller: controller,
      token: token,
      typeDefinition: typeDefinition
    });
  }
  function parseValueTypeConstant(constant) {
    switch (constant) {
      case Array:
        return "array";
      case Boolean:
        return "boolean";
      case Number:
        return "number";
      case Object:
        return "object";
      case String:
        return "string";
    }
  }
  function parseValueTypeDefault(defaultValue) {
    switch (_typeof(defaultValue)) {
      case "boolean":
        return "boolean";
      case "number":
        return "number";
      case "string":
        return "string";
    }
    if (Array.isArray(defaultValue)) return "array";
    if (Object.prototype.toString.call(defaultValue) === "[object Object]") return "object";
  }
  function parseValueTypeObject(payload) {
    var controller = payload.controller,
      token = payload.token,
      typeObject = payload.typeObject;
    var hasType = isSomething(typeObject.type);
    var hasDefault = isSomething(typeObject["default"]);
    var fullObject = hasType && hasDefault;
    var onlyType = hasType && !hasDefault;
    var onlyDefault = !hasType && hasDefault;
    var typeFromObject = parseValueTypeConstant(typeObject.type);
    var typeFromDefaultValue = parseValueTypeDefault(payload.typeObject["default"]);
    if (onlyType) return typeFromObject;
    if (onlyDefault) return typeFromDefaultValue;
    if (typeFromObject !== typeFromDefaultValue) {
      var propertyPath = controller ? "".concat(controller, ".").concat(token) : token;
      throw new Error("The specified default value for the Stimulus Value \"".concat(propertyPath, "\" must match the defined type \"").concat(typeFromObject, "\". The provided default value of \"").concat(typeObject["default"], "\" is of type \"").concat(typeFromDefaultValue, "\"."));
    }
    if (fullObject) return typeFromObject;
  }
  function parseValueTypeDefinition(payload) {
    var controller = payload.controller,
      token = payload.token,
      typeDefinition = payload.typeDefinition;
    var typeObject = {
      controller: controller,
      token: token,
      typeObject: typeDefinition
    };
    var typeFromObject = parseValueTypeObject(typeObject);
    var typeFromDefaultValue = parseValueTypeDefault(typeDefinition);
    var typeFromConstant = parseValueTypeConstant(typeDefinition);
    var type = typeFromObject || typeFromDefaultValue || typeFromConstant;
    if (type) return type;
    var propertyPath = controller ? "".concat(controller, ".").concat(typeDefinition) : token;
    throw new Error("Unknown value type \"".concat(propertyPath, "\" for \"").concat(token, "\" value"));
  }
  function defaultValueForDefinition(typeDefinition) {
    var constant = parseValueTypeConstant(typeDefinition);
    if (constant) return defaultValuesByType[constant];
    var hasDefault = hasProperty(typeDefinition, "default");
    var hasType = hasProperty(typeDefinition, "type");
    var typeObject = typeDefinition;
    if (hasDefault) return typeObject["default"];
    if (hasType) {
      var type = typeObject.type;
      var constantFromType = parseValueTypeConstant(type);
      if (constantFromType) return defaultValuesByType[constantFromType];
    }
    return typeDefinition;
  }
  function valueDescriptorForTokenAndTypeDefinition(payload) {
    var token = payload.token,
      typeDefinition = payload.typeDefinition;
    var key = "".concat(dasherize(token), "-value");
    var type = parseValueTypeDefinition(payload);
    return {
      type: type,
      key: key,
      name: camelize(key),
      get defaultValue() {
        return defaultValueForDefinition(typeDefinition);
      },
      get hasCustomDefaultValue() {
        return parseValueTypeDefault(typeDefinition) !== undefined;
      },
      reader: readers[type],
      writer: writers[type] || writers["default"]
    };
  }
  var defaultValuesByType = {
    get array() {
      return [];
    },
    "boolean": false,
    number: 0,
    get object() {
      return {};
    },
    string: ""
  };
  var readers = {
    array: function array(value) {
      var array = JSON.parse(value);
      if (!Array.isArray(array)) {
        throw new TypeError("expected value of type \"array\" but instead got value \"".concat(value, "\" of type \"").concat(parseValueTypeDefault(array), "\""));
      }
      return array;
    },
    "boolean": function boolean(value) {
      return !(value == "0" || String(value).toLowerCase() == "false");
    },
    number: function number(value) {
      return Number(value.replace(/_/g, ""));
    },
    object: function object(value) {
      var object = JSON.parse(value);
      if (object === null || _typeof(object) != "object" || Array.isArray(object)) {
        throw new TypeError("expected value of type \"object\" but instead got value \"".concat(value, "\" of type \"").concat(parseValueTypeDefault(object), "\""));
      }
      return object;
    },
    string: function string(value) {
      return value;
    }
  };
  var writers = {
    "default": writeString,
    array: writeJSON,
    object: writeJSON
  };
  function writeJSON(value) {
    return JSON.stringify(value);
  }
  function writeString(value) {
    return "".concat(value);
  }
  var Controller = /*#__PURE__*/function () {
    function Controller(context) {
      _classCallCheck(this, Controller);
      this.context = context;
    }
    return _createClass(Controller, [{
      key: "application",
      get: function get() {
        return this.context.application;
      }
    }, {
      key: "scope",
      get: function get() {
        return this.context.scope;
      }
    }, {
      key: "element",
      get: function get() {
        return this.scope.element;
      }
    }, {
      key: "identifier",
      get: function get() {
        return this.scope.identifier;
      }
    }, {
      key: "targets",
      get: function get() {
        return this.scope.targets;
      }
    }, {
      key: "outlets",
      get: function get() {
        return this.scope.outlets;
      }
    }, {
      key: "classes",
      get: function get() {
        return this.scope.classes;
      }
    }, {
      key: "data",
      get: function get() {
        return this.scope.data;
      }
    }, {
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "connect",
      value: function connect() {}
    }, {
      key: "disconnect",
      value: function disconnect() {}
    }, {
      key: "dispatch",
      value: function dispatch(eventName) {
        var _ref23 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref23$target = _ref23.target,
          target = _ref23$target === void 0 ? this.element : _ref23$target,
          _ref23$detail = _ref23.detail,
          detail = _ref23$detail === void 0 ? {} : _ref23$detail,
          _ref23$prefix = _ref23.prefix,
          prefix = _ref23$prefix === void 0 ? this.identifier : _ref23$prefix,
          _ref23$bubbles = _ref23.bubbles,
          bubbles = _ref23$bubbles === void 0 ? true : _ref23$bubbles,
          _ref23$cancelable = _ref23.cancelable,
          cancelable = _ref23$cancelable === void 0 ? true : _ref23$cancelable;
        var type = prefix ? "".concat(prefix, ":").concat(eventName) : eventName;
        var event = new CustomEvent(type, {
          detail: detail,
          bubbles: bubbles,
          cancelable: cancelable
        });
        target.dispatchEvent(event);
        return event;
      }
    }], [{
      key: "shouldLoad",
      get: function get() {
        return true;
      }
    }, {
      key: "afterLoad",
      value: function afterLoad(_identifier, _application) {
        return;
      }
    }]);
  }();
  Controller.blessings = [ClassPropertiesBlessing, TargetPropertiesBlessing, ValuePropertiesBlessing, OutletPropertiesBlessing];
  Controller.targets = [];
  Controller.outlets = [];
  Controller.values = {};

  var _StimulusReloader_brand = /*#__PURE__*/new WeakSet();
  var StimulusReloader = /*#__PURE__*/function () {
    function StimulusReloader() {
      _classCallCheck(this, StimulusReloader);
      _classPrivateMethodInitSpec(this, _StimulusReloader_brand);
      this.application = window.Stimulus || Application.start();
    }
    return _createClass(StimulusReloader, [{
      key: "reload",
      value: function () {
        var _reload = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                log("Reload Stimulus controllers...");
                this.application.stop();
                _context.next = 4;
                return _assertClassBrand(_StimulusReloader_brand, this, _reloadStimulusControllers).call(this);
              case 4:
                this.application.start();
              case 5:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function reload() {
          return _reload.apply(this, arguments);
        }
        return reload;
      }()
    }], [{
      key: "reload",
      value: function () {
        var _reload2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new StimulusReloader().reload());
              case 1:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        function reload() {
          return _reload2.apply(this, arguments);
        }
        return reload;
      }()
    }]);
  }();
  function _reloadStimulusControllers() {
    return _reloadStimulusControllers2.apply(this, arguments);
  }
  function _reloadStimulusControllers2() {
    _reloadStimulusControllers2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var _this3 = this;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Promise.all(_classPrivateGetter(_StimulusReloader_brand, this, _get_stimulusControllerPaths).map(/*#__PURE__*/function () {
              var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(moduleName) {
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      return _context3.abrupt("return", _assertClassBrand(_StimulusReloader_brand, _this3, _reloadStimulusController).call(_this3, moduleName));
                    case 1:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3);
              }));
              return function (_x2) {
                return _ref.apply(this, arguments);
              };
            }()));
          case 2:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this);
    }));
    return _reloadStimulusControllers2.apply(this, arguments);
  }
  function _get_stimulusControllerPaths(_this) {
    return Object.keys(_classPrivateGetter(_StimulusReloader_brand, _this, _get_stimulusPathsByModule)).filter(function (path) {
      return path.endsWith("_controller");
    });
  }
  function _get_stimulusPathsByModule(_this2) {
    _this2.pathsByModule = _this2.pathsByModule || _assertClassBrand(_StimulusReloader_brand, _this2, _parseImportmapJson).call(_this2);
    return _this2.pathsByModule;
  }
  function _parseImportmapJson() {
    var importmapScript = document.querySelector("script[type=importmap]");
    return JSON.parse(importmapScript.text).imports;
  }
  function _reloadStimulusController(_x) {
    return _reloadStimulusController2.apply(this, arguments);
  }
  function _reloadStimulusController2() {
    _reloadStimulusController2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(moduleName) {
      var controllerName, path, module;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            log("\t".concat(moduleName));
            controllerName = _assertClassBrand(_StimulusReloader_brand, this, _extractControllerName).call(this, moduleName);
            path = _assertClassBrand(_StimulusReloader_brand, this, _pathForModuleName).call(this, moduleName) + "?bust_cache=" + Date.now();
            _context5.next = 5;
            return import(path);
          case 5:
            module = _context5.sent;
            _assertClassBrand(_StimulusReloader_brand, this, _registerController).call(this, controllerName, module);
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this);
    }));
    return _reloadStimulusController2.apply(this, arguments);
  }
  function _pathForModuleName(moduleName) {
    return _classPrivateGetter(_StimulusReloader_brand, this, _get_stimulusPathsByModule)[moduleName];
  }
  function _extractControllerName(path) {
    return path.replace(/^.*\//, "").replace("_controller", "").replace(/\//g, "--").replace(/_/g, "-");
  }
  function _registerController(name, module) {
    this.application.unload(name);
    this.application.register(name, module["default"]);
  }

  StreamActions.reload_stimulus = function () {
    StimulusReloader.reload();
  };

  var PulseWire = {
    config: {
      loggingEnabled: true
    }
  };

  var adapters = {
    logger: typeof console !== "undefined" ? console : undefined,
    WebSocket: typeof WebSocket !== "undefined" ? WebSocket : undefined
  };

  // The logger is disabled by default. You can enable it with:
  //
  //   ActionCable.logger.enabled = true
  //
  //   Example:
  //
  //   import * as ActionCable from '@rails/actioncable'
  //
  //   ActionCable.logger.enabled = true
  //   ActionCable.logger.log('Connection Established.')
  //

  var logger = {
    log: function log() {
      if (this.enabled) {
        var _adapters$logger;
        for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
          messages[_key] = arguments[_key];
        }
        messages.push(Date.now());
        (_adapters$logger = adapters.logger).log.apply(_adapters$logger, ["[ActionCable]"].concat(messages));
      }
    }
  };

  // Responsible for ensuring the cable connection is in good health by validating the heartbeat pings sent from the server, and attempting
  // revival reconnections if things go astray. Internal class, not intended for direct user manipulation.

  var now = function now() {
    return new Date().getTime();
  };
  var secondsSince = function secondsSince(time) {
    return (now() - time) / 1000;
  };
  var ConnectionMonitor = /*#__PURE__*/function () {
    function ConnectionMonitor(connection) {
      _classCallCheck(this, ConnectionMonitor);
      this.visibilityDidChange = this.visibilityDidChange.bind(this);
      this.connection = connection;
      this.reconnectAttempts = 0;
    }
    return _createClass(ConnectionMonitor, [{
      key: "start",
      value: function start() {
        if (!this.isRunning()) {
          this.startedAt = now();
          delete this.stoppedAt;
          this.startPolling();
          addEventListener("visibilitychange", this.visibilityDidChange);
          logger.log("ConnectionMonitor started. stale threshold = ".concat(this.constructor.staleThreshold, " s"));
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.isRunning()) {
          this.stoppedAt = now();
          this.stopPolling();
          removeEventListener("visibilitychange", this.visibilityDidChange);
          logger.log("ConnectionMonitor stopped");
        }
      }
    }, {
      key: "isRunning",
      value: function isRunning() {
        return this.startedAt && !this.stoppedAt;
      }
    }, {
      key: "recordMessage",
      value: function recordMessage() {
        this.pingedAt = now();
      }
    }, {
      key: "recordConnect",
      value: function recordConnect() {
        this.reconnectAttempts = 0;
        delete this.disconnectedAt;
        logger.log("ConnectionMonitor recorded connect");
      }
    }, {
      key: "recordDisconnect",
      value: function recordDisconnect() {
        this.disconnectedAt = now();
        logger.log("ConnectionMonitor recorded disconnect");
      }

      // Private
    }, {
      key: "startPolling",
      value: function startPolling() {
        this.stopPolling();
        this.poll();
      }
    }, {
      key: "stopPolling",
      value: function stopPolling() {
        clearTimeout(this.pollTimeout);
      }
    }, {
      key: "poll",
      value: function poll() {
        var _this = this;
        this.pollTimeout = setTimeout(function () {
          _this.reconnectIfStale();
          _this.poll();
        }, this.getPollInterval());
      }
    }, {
      key: "getPollInterval",
      value: function getPollInterval() {
        var _this$constructor = this.constructor,
          staleThreshold = _this$constructor.staleThreshold,
          reconnectionBackoffRate = _this$constructor.reconnectionBackoffRate;
        var backoff = Math.pow(1 + reconnectionBackoffRate, Math.min(this.reconnectAttempts, 10));
        var jitterMax = this.reconnectAttempts === 0 ? 1.0 : reconnectionBackoffRate;
        var jitter = jitterMax * Math.random();
        return staleThreshold * 1000 * backoff * (1 + jitter);
      }
    }, {
      key: "reconnectIfStale",
      value: function reconnectIfStale() {
        if (this.connectionIsStale()) {
          logger.log("ConnectionMonitor detected stale connection. reconnectAttempts = ".concat(this.reconnectAttempts, ", time stale = ").concat(secondsSince(this.refreshedAt), " s, stale threshold = ").concat(this.constructor.staleThreshold, " s"));
          this.reconnectAttempts++;
          if (this.disconnectedRecently()) {
            logger.log("ConnectionMonitor skipping reopening recent disconnect. time disconnected = ".concat(secondsSince(this.disconnectedAt), " s"));
          } else {
            logger.log("ConnectionMonitor reopening");
            this.connection.reopen();
          }
        }
      }
    }, {
      key: "refreshedAt",
      get: function get() {
        return this.pingedAt ? this.pingedAt : this.startedAt;
      }
    }, {
      key: "connectionIsStale",
      value: function connectionIsStale() {
        return secondsSince(this.refreshedAt) > this.constructor.staleThreshold;
      }
    }, {
      key: "disconnectedRecently",
      value: function disconnectedRecently() {
        return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
      }
    }, {
      key: "visibilityDidChange",
      value: function visibilityDidChange() {
        var _this2 = this;
        if (document.visibilityState === "visible") {
          setTimeout(function () {
            if (_this2.connectionIsStale() || !_this2.connection.isOpen()) {
              logger.log("ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = ".concat(document.visibilityState));
              _this2.connection.reopen();
            }
          }, 200);
        }
      }
    }]);
  }();
  ConnectionMonitor.staleThreshold = 6; // Server::Connections::BEAT_INTERVAL * 2 (missed two pings)
  ConnectionMonitor.reconnectionBackoffRate = 0.15;

  var INTERNAL = {
    "message_types": {
      "welcome": "welcome",
      "disconnect": "disconnect",
      "ping": "ping",
      "confirmation": "confirm_subscription",
      "rejection": "reject_subscription"
    },
    "disconnect_reasons": {
      "unauthorized": "unauthorized",
      "invalid_request": "invalid_request",
      "server_restart": "server_restart",
      "remote": "remote"
    },
    "default_mount_path": "/cable",
    "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
  };

  // Encapsulate the cable connection held by the consumer. This is an internal class not intended for direct user manipulation.

  var message_types = INTERNAL.message_types,
    protocols = INTERNAL.protocols;
  var supportedProtocols = protocols.slice(0, protocols.length - 1);
  var indexOf = [].indexOf;
  var Connection = /*#__PURE__*/function () {
    function Connection(consumer) {
      _classCallCheck(this, Connection);
      this.open = this.open.bind(this);
      this.consumer = consumer;
      this.subscriptions = this.consumer.subscriptions;
      this.monitor = new ConnectionMonitor(this);
      this.disconnected = true;
    }
    return _createClass(Connection, [{
      key: "send",
      value: function send(data) {
        if (this.isOpen()) {
          this.webSocket.send(JSON.stringify(data));
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isActive()) {
          logger.log("Attempted to open WebSocket, but existing socket is ".concat(this.getState()));
          return false;
        } else {
          var socketProtocols = [].concat(_toConsumableArray(protocols), _toConsumableArray(this.consumer.subprotocols || []));
          logger.log("Opening WebSocket, current state is ".concat(this.getState(), ", subprotocols: ").concat(socketProtocols));
          if (this.webSocket) {
            this.uninstallEventHandlers();
          }
          this.webSocket = new adapters.WebSocket(this.consumer.url, socketProtocols);
          this.installEventHandlers();
          this.monitor.start();
          return true;
        }
      }
    }, {
      key: "close",
      value: function close() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
            allowReconnect: true
          },
          allowReconnect = _ref.allowReconnect;
        if (!allowReconnect) {
          this.monitor.stop();
        }
        // Avoid closing websockets in a "connecting" state due to Safari 15.1+ bug. See: https://github.com/rails/rails/issues/43835#issuecomment-1002288478
        if (this.isOpen()) {
          return this.webSocket.close();
        }
      }
    }, {
      key: "reopen",
      value: function reopen() {
        logger.log("Reopening WebSocket, current state is ".concat(this.getState()));
        if (this.isActive()) {
          try {
            return this.close();
          } catch (error) {
            logger.log("Failed to reopen WebSocket", error);
          } finally {
            logger.log("Reopening WebSocket in ".concat(this.constructor.reopenDelay, "ms"));
            setTimeout(this.open, this.constructor.reopenDelay);
          }
        } else {
          return this.open();
        }
      }
    }, {
      key: "getProtocol",
      value: function getProtocol() {
        if (this.webSocket) {
          return this.webSocket.protocol;
        }
      }
    }, {
      key: "isOpen",
      value: function isOpen() {
        return this.isState("open");
      }
    }, {
      key: "isActive",
      value: function isActive() {
        return this.isState("open", "connecting");
      }
    }, {
      key: "triedToReconnect",
      value: function triedToReconnect() {
        return this.monitor.reconnectAttempts > 0;
      }

      // Private
    }, {
      key: "isProtocolSupported",
      value: function isProtocolSupported() {
        return indexOf.call(supportedProtocols, this.getProtocol()) >= 0;
      }
    }, {
      key: "isState",
      value: function isState() {
        for (var _len = arguments.length, states = new Array(_len), _key = 0; _key < _len; _key++) {
          states[_key] = arguments[_key];
        }
        return indexOf.call(states, this.getState()) >= 0;
      }
    }, {
      key: "getState",
      value: function getState() {
        if (this.webSocket) {
          for (var state in adapters.WebSocket) {
            if (adapters.WebSocket[state] === this.webSocket.readyState) {
              return state.toLowerCase();
            }
          }
        }
        return null;
      }
    }, {
      key: "installEventHandlers",
      value: function installEventHandlers() {
        for (var eventName in this.events) {
          var handler = this.events[eventName].bind(this);
          this.webSocket["on".concat(eventName)] = handler;
        }
      }
    }, {
      key: "uninstallEventHandlers",
      value: function uninstallEventHandlers() {
        for (var eventName in this.events) {
          this.webSocket["on".concat(eventName)] = function () {};
        }
      }
    }]);
  }();
  Connection.reopenDelay = 500;
  Connection.prototype.events = {
    message: function message(event) {
      if (!this.isProtocolSupported()) {
        return;
      }
      var _JSON$parse = JSON.parse(event.data),
        identifier = _JSON$parse.identifier,
        message = _JSON$parse.message,
        reason = _JSON$parse.reason,
        reconnect = _JSON$parse.reconnect,
        type = _JSON$parse.type;
      this.monitor.recordMessage();
      switch (type) {
        case message_types.welcome:
          if (this.triedToReconnect()) {
            this.reconnectAttempted = true;
          }
          this.monitor.recordConnect();
          return this.subscriptions.reload();
        case message_types.disconnect:
          logger.log("Disconnecting. Reason: ".concat(reason));
          return this.close({
            allowReconnect: reconnect
          });
        case message_types.ping:
          return null;
        case message_types.confirmation:
          this.subscriptions.confirmSubscription(identifier);
          if (this.reconnectAttempted) {
            this.reconnectAttempted = false;
            return this.subscriptions.notify(identifier, "connected", {
              reconnected: true
            });
          } else {
            return this.subscriptions.notify(identifier, "connected", {
              reconnected: false
            });
          }
        case message_types.rejection:
          return this.subscriptions.reject(identifier);
        default:
          return this.subscriptions.notify(identifier, "received", message);
      }
    },
    open: function open() {
      logger.log("WebSocket onopen event, using '".concat(this.getProtocol(), "' subprotocol"));
      this.disconnected = false;
      if (!this.isProtocolSupported()) {
        logger.log("Protocol is unsupported. Stopping monitor and disconnecting.");
        return this.close({
          allowReconnect: false
        });
      }
    },
    close: function close(event) {
      logger.log("WebSocket onclose event");
      if (this.disconnected) {
        return;
      }
      this.disconnected = true;
      this.monitor.recordDisconnect();
      return this.subscriptions.notifyAll("disconnected", {
        willAttemptReconnect: this.monitor.isRunning()
      });
    },
    error: function error() {
      logger.log("WebSocket onerror event");
    }
  };

  // A new subscription is created through the ActionCable.Subscriptions instance available on the consumer.
  // It provides a number of callbacks and a method for calling remote procedure calls on the corresponding
  // Channel instance on the server side.
  //
  // An example demonstrates the basic functionality:
  //
  //   App.appearance = App.cable.subscriptions.create("AppearanceChannel", {
  //     connected() {
  //       // Called once the subscription has been successfully completed
  //     },
  //
  //     disconnected({ willAttemptReconnect: boolean }) {
  //       // Called when the client has disconnected with the server.
  //       // The object will have an `willAttemptReconnect` property which
  //       // says whether the client has the intention of attempting
  //       // to reconnect.
  //     },
  //
  //     appear() {
  //       this.perform('appear', {appearing_on: this.appearingOn()})
  //     },
  //
  //     away() {
  //       this.perform('away')
  //     },
  //
  //     appearingOn() {
  //       $('main').data('appearing-on')
  //     }
  //   })
  //
  // The methods #appear and #away forward their intent to the remote AppearanceChannel instance on the server
  // by calling the `perform` method with the first parameter being the action (which maps to AppearanceChannel#appear/away).
  // The second parameter is a hash that'll get JSON encoded and made available on the server in the data parameter.
  //
  // This is how the server component would look:
  //
  //   class AppearanceChannel < ApplicationActionCable::Channel
  //     def subscribed
  //       current_user.appear
  //     end
  //
  //     def unsubscribed
  //       current_user.disappear
  //     end
  //
  //     def appear(data)
  //       current_user.appear on: data['appearing_on']
  //     end
  //
  //     def away
  //       current_user.away
  //     end
  //   end
  //
  // The "AppearanceChannel" name is automatically mapped between the client-side subscription creation and the server-side Ruby class name.
  // The AppearanceChannel#appear/away public methods are exposed automatically to client-side invocation through the perform method.

  var extend = function extend(object, properties) {
    if (properties != null) {
      for (var key in properties) {
        var value = properties[key];
        object[key] = value;
      }
    }
    return object;
  };
  var Subscription = /*#__PURE__*/function () {
    function Subscription(consumer) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var mixin = arguments.length > 2 ? arguments[2] : undefined;
      _classCallCheck(this, Subscription);
      this.consumer = consumer;
      this.identifier = JSON.stringify(params);
      extend(this, mixin);
    }

    // Perform a channel action with the optional data passed as an attribute
    return _createClass(Subscription, [{
      key: "perform",
      value: function perform(action) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        data.action = action;
        return this.send(data);
      }
    }, {
      key: "send",
      value: function send(data) {
        return this.consumer.send({
          command: "message",
          identifier: this.identifier,
          data: JSON.stringify(data)
        });
      }
    }, {
      key: "unsubscribe",
      value: function unsubscribe() {
        return this.consumer.subscriptions.remove(this);
      }
    }]);
  }();

  // Responsible for ensuring channel subscribe command is confirmed, retrying until confirmation is received.
  // Internal class, not intended for direct user manipulation.
  var SubscriptionGuarantor = /*#__PURE__*/function () {
    function SubscriptionGuarantor(subscriptions) {
      _classCallCheck(this, SubscriptionGuarantor);
      this.subscriptions = subscriptions;
      this.pendingSubscriptions = [];
    }
    return _createClass(SubscriptionGuarantor, [{
      key: "guarantee",
      value: function guarantee(subscription) {
        if (this.pendingSubscriptions.indexOf(subscription) == -1) {
          logger.log("SubscriptionGuarantor guaranteeing ".concat(subscription.identifier));
          this.pendingSubscriptions.push(subscription);
        } else {
          logger.log("SubscriptionGuarantor already guaranteeing ".concat(subscription.identifier));
        }
        this.startGuaranteeing();
      }
    }, {
      key: "forget",
      value: function forget(subscription) {
        logger.log("SubscriptionGuarantor forgetting ".concat(subscription.identifier));
        this.pendingSubscriptions = this.pendingSubscriptions.filter(function (s) {
          return s !== subscription;
        });
      }
    }, {
      key: "startGuaranteeing",
      value: function startGuaranteeing() {
        this.stopGuaranteeing();
        this.retrySubscribing();
      }
    }, {
      key: "stopGuaranteeing",
      value: function stopGuaranteeing() {
        clearTimeout(this.retryTimeout);
      }
    }, {
      key: "retrySubscribing",
      value: function retrySubscribing() {
        var _this = this;
        this.retryTimeout = setTimeout(function () {
          if (_this.subscriptions && typeof _this.subscriptions.subscribe === "function") {
            _this.pendingSubscriptions.map(function (subscription) {
              logger.log("SubscriptionGuarantor resubscribing ".concat(subscription.identifier));
              _this.subscriptions.subscribe(subscription);
            });
          }
        }, 500);
      }
    }]);
  }();

  // Collection class for creating (and internally managing) channel subscriptions.
  // The only method intended to be triggered by the user is ActionCable.Subscriptions#create,
  // and it should be called through the consumer like so:
  //
  //   App = {}
  //   App.cable = ActionCable.createConsumer("ws://example.com/accounts/1")
  //   App.appearance = App.cable.subscriptions.create("AppearanceChannel")
  //
  // For more details on how you'd configure an actual channel subscription, see ActionCable.Subscription.
  var Subscriptions = /*#__PURE__*/function () {
    function Subscriptions(consumer) {
      _classCallCheck(this, Subscriptions);
      this.consumer = consumer;
      this.guarantor = new SubscriptionGuarantor(this);
      this.subscriptions = [];
    }
    return _createClass(Subscriptions, [{
      key: "create",
      value: function create(channelName, mixin) {
        var channel = channelName;
        var params = _typeof(channel) === "object" ? channel : {
          channel: channel
        };
        var subscription = new Subscription(this.consumer, params, mixin);
        return this.add(subscription);
      }

      // Private
    }, {
      key: "add",
      value: function add(subscription) {
        this.subscriptions.push(subscription);
        this.consumer.ensureActiveConnection();
        this.notify(subscription, "initialized");
        this.subscribe(subscription);
        return subscription;
      }
    }, {
      key: "remove",
      value: function remove(subscription) {
        this.forget(subscription);
        if (!this.findAll(subscription.identifier).length) {
          this.sendCommand(subscription, "unsubscribe");
        }
        return subscription;
      }
    }, {
      key: "reject",
      value: function reject(identifier) {
        var _this = this;
        return this.findAll(identifier).map(function (subscription) {
          _this.forget(subscription);
          _this.notify(subscription, "rejected");
          return subscription;
        });
      }
    }, {
      key: "forget",
      value: function forget(subscription) {
        this.guarantor.forget(subscription);
        this.subscriptions = this.subscriptions.filter(function (s) {
          return s !== subscription;
        });
        return subscription;
      }
    }, {
      key: "findAll",
      value: function findAll(identifier) {
        return this.subscriptions.filter(function (s) {
          return s.identifier === identifier;
        });
      }
    }, {
      key: "reload",
      value: function reload() {
        var _this2 = this;
        return this.subscriptions.map(function (subscription) {
          return _this2.subscribe(subscription);
        });
      }
    }, {
      key: "notifyAll",
      value: function notifyAll(callbackName) {
        var _this3 = this;
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return this.subscriptions.map(function (subscription) {
          return _this3.notify.apply(_this3, [subscription, callbackName].concat(args));
        });
      }
    }, {
      key: "notify",
      value: function notify(subscription, callbackName) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }
        var subscriptions;
        if (typeof subscription === "string") {
          subscriptions = this.findAll(subscription);
        } else {
          subscriptions = [subscription];
        }
        return subscriptions.map(function (subscription) {
          return typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : undefined;
        });
      }
    }, {
      key: "subscribe",
      value: function subscribe(subscription) {
        if (this.sendCommand(subscription, "subscribe")) {
          this.guarantor.guarantee(subscription);
        }
      }
    }, {
      key: "confirmSubscription",
      value: function confirmSubscription(identifier) {
        var _this4 = this;
        logger.log("Subscription confirmed ".concat(identifier));
        this.findAll(identifier).map(function (subscription) {
          return _this4.guarantor.forget(subscription);
        });
      }
    }, {
      key: "sendCommand",
      value: function sendCommand(subscription, command) {
        var identifier = subscription.identifier;
        return this.consumer.send({
          command: command,
          identifier: identifier
        });
      }
    }]);
  }();

  // The ActionCable.Consumer establishes the connection to a server-side Ruby Connection object. Once established,
  // the ActionCable.ConnectionMonitor will ensure that its properly maintained through heartbeats and checking for stale updates.
  // The Consumer instance is also the gateway to establishing subscriptions to desired channels through the #createSubscription
  // method.
  //
  // The following example shows how this can be set up:
  //
  //   App = {}
  //   App.cable = ActionCable.createConsumer("ws://example.com/accounts/1")
  //   App.appearance = App.cable.subscriptions.create("AppearanceChannel")
  //
  // For more details on how you'd configure an actual channel subscription, see ActionCable.Subscription.
  //
  // When a consumer is created, it automatically connects with the server.
  //
  // To disconnect from the server, call
  //
  //   App.cable.disconnect()
  //
  // and to restart the connection:
  //
  //   App.cable.connect()
  //
  // Any channel subscriptions which existed prior to disconnecting will
  // automatically resubscribe.
  var Consumer = /*#__PURE__*/function () {
    function Consumer(url) {
      _classCallCheck(this, Consumer);
      this._url = url;
      this.subscriptions = new Subscriptions(this);
      this.connection = new Connection(this);
      this.subprotocols = [];
    }
    return _createClass(Consumer, [{
      key: "url",
      get: function get() {
        return createWebSocketURL(this._url);
      }
    }, {
      key: "send",
      value: function send(data) {
        return this.connection.send(data);
      }
    }, {
      key: "connect",
      value: function connect() {
        return this.connection.open();
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        return this.connection.close({
          allowReconnect: false
        });
      }
    }, {
      key: "ensureActiveConnection",
      value: function ensureActiveConnection() {
        if (!this.connection.isActive()) {
          return this.connection.open();
        }
      }
    }, {
      key: "addSubProtocol",
      value: function addSubProtocol(subprotocol) {
        this.subprotocols = [].concat(_toConsumableArray(this.subprotocols), [subprotocol]);
      }
    }]);
  }();
  function createWebSocketURL(url) {
    if (typeof url === "function") {
      url = url();
    }
    if (url && !/^wss?:/i.test(url)) {
      var a = document.createElement("a");
      a.href = url;
      // Fix populating Location properties in IE. Otherwise, protocol will be blank.
      a.href = a.href;
      a.protocol = a.protocol.replace("http", "ws");
      return a.href;
    } else {
      return url;
    }
  }

  function createConsumer() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getConfig("url") || INTERNAL.default_mount_path;
    return new Consumer(url);
  }
  function getConfig(name) {
    var element = document.head.querySelector("meta[name='action-cable-".concat(name, "']"));
    if (element) {
      return element.getAttribute("content");
    }
  }

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Connection: Connection,
    ConnectionMonitor: ConnectionMonitor,
    Consumer: Consumer,
    INTERNAL: INTERNAL,
    Subscription: Subscription,
    SubscriptionGuarantor: SubscriptionGuarantor,
    Subscriptions: Subscriptions,
    adapters: adapters,
    createConsumer: createConsumer,
    createWebSocketURL: createWebSocketURL,
    getConfig: getConfig,
    logger: logger
  });

  exports.PulseWire = PulseWire;

  return exports;

})({});
