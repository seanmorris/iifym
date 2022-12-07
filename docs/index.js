(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("ProductDatabase.js", function(exports, require, module) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductDatabase = void 0;

var _Database2 = require("curvature/model/Database");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ProductDatabase = /*#__PURE__*/function (_Database) {
  _inherits(ProductDatabase, _Database);

  var _super = _createSuper(ProductDatabase);

  function ProductDatabase() {
    _classCallCheck(this, ProductDatabase);

    return _super.apply(this, arguments);
  }

  _createClass(ProductDatabase, [{
    key: "_version_1",
    value: function _version_1(database) {
      var productStore = this.createObjectStore('products', {
        keyPath: 'upc'
      });
      productStore.createIndex('upc', 'upc', {
        unique: true
      });
    }
  }]);

  return ProductDatabase;
}(_Database2.Database);

exports.ProductDatabase = ProductDatabase;
});

;require.register("ProductService.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductService = void 0;

var _ProductDatabase = require("./ProductDatabase");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ProductService = /*#__PURE__*/function () {
  function ProductService() {
    _classCallCheck(this, ProductService);
  }

  _createClass(ProductService, null, [{
    key: "getByUpc",
    value: function getByUpc(upc) {
      _ProductDatabase.ProductDatabase.open('products', 1).then(function (database) {
        var query = {
          store: 'products',
          index: 'upc',
          range: upc,
          limit: 1
        };
        var select = database.select(query).one(function (r) {
          return JSON.stringify(r, null, 4);
        }).then(function (r) {
          return r.result || null;
        });
      });

      return fetch("https://iifym-products.unholyshit.workers.dev/?upc=".concat(upc)).then(function (response) {
        return response.json();
      })["catch"](function (err) {
        return console.error(err);
      });
    }
  }]);

  return ProductService;
}();

exports.ProductService = ProductService;
});

;require.register("Routes.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Routes = void 0;

var _ProductService = require("./ProductService");

var _ProductDetail = require("./product/ProductDetail");

var Routes = {
  '': function _(_ref) {
    var upc = _ref.upc;
    window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
      requestType: 'scan'
    }));
  },
  'cancel': function cancel(_ref2) {
    var upc = _ref2.upc;
    window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
      requestType: 'scan-cancel'
    }));
  },
  product: function product(_ref3) {
    var upc = _ref3.upc;
    // const upc = '070600001844';
    // const upc = '052548701154';
    // const upc = '013409517680';
    // const upc = '048001213586';
    // const upc = '070847029090';
    return _ProductService.ProductService.getByUpc(upc).then(function (product) {
      return new _ProductDetail.ProductDetail(product);
    });
  },
  cart: 'cart!',
  list: 'list!',
  account: 'account!',
  help: 'help!'
};
exports.Routes = Routes;
});

require.register("chart/Pie.js", function(exports, require, module) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pie = void 0;

var _View2 = require("curvature/base/View");

var _Bindable = require("curvature/base/Bindable");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Pie = /*#__PURE__*/function (_View) {
  _inherits(Pie, _View);

  var _super = _createSuper(Pie);

  function Pie(args, parent) {
    var _this;

    _classCallCheck(this, Pie);

    _this = _super.call(this, args, parent);

    _defineProperty(_assertThisInitialized(_this), "template", require('./pie.html'));

    _this.args.wedges = [];
    _this.args.segments = _this.args.segments || [];
    return _this;
  }

  _createClass(Pie, [{
    key: "onRendered",
    value: function onRendered() {
      var _this2 = this;

      var values = this.args.segments.map(function (s) {
        return s.value;
      });
      var normalized = this.normalize.apply(this, _toConsumableArray(values));
      var sweep = 0;

      var _loop = function _loop(i) {
        var n = normalized[i];
        var segment = _this2.args.segments[i];

        var wedge = _Bindable.Bindable.make({
          value: 0,
          sweep: 0,
          type: segment.type
        });

        _this2.args.wedges.push(wedge);

        var s = sweep;

        _this2.onTimeout(200, function () {
          wedge.value = n;
          wedge.sweep = s;
        });

        sweep += n;
      };

      for (var i in normalized) {
        _loop(i);
      }
    }
  }, {
    key: "normalize",
    value: function normalize() {
      for (var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++) {
        inputs[_key] = arguments[_key];
      }

      return inputs.map(function (i) {
        return i / inputs.reduce(function (a, b) {
          return a + b;
        });
      });
    }
  }, {
    key: "getArc",
    value: function getArc(x, y, radius, startAngle, endAngle) {
      var start = this.getOffset(x, y, radius, endAngle);
      var end = this.getOffset(x, y, radius, startAngle);
      var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      return ['M', radius, radius, 'L', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
    }
  }, {
    key: "getOffset",
    value: function getOffset(x, y, radius, degrees) {
      var radians = (degrees - 90) * Math.PI / 180.0;
      return {
        x: x + radius * Math.cos(radians),
        y: y + radius * Math.sin(radians)
      };
    }
  }]);

  return Pie;
}(_View2.View);

exports.Pie = Pie;
});

;require.register("index.js", function(exports, require, module) {
"use strict";

var _Router = require("curvature/base/Router");

var _View = require("curvature/base/View");

var _Pie = require("./chart/Pie");

var _ProductDetail = require("./product/ProductDetail");

var _Routes = require("./Routes");

// import { Service } from 'curvature/service/Service';
// import { RecordDatabase } from 'RecordDatabase';
// import { Uuid } from 'curvature/base/Uuid';
var defaultNav = {
  '/': 'scan-icon.svg' // '/cart': 'basket-icon.svg'
  // , '/list': 'list-icon.svg'
  // , '/account': 'account-icon.svg'
  // , '/help': 'help-icon.svg' 

};

var layout = _View.View.from(require('./layout/layout.html'), {
  barMargin: 0,
  nav: defaultNav,
  defaultNav: defaultNav
});

document.addEventListener('cvRouteEnd', function (event) {
  requestAnimationFrame(function () {
    if (location.pathname == '/') {
      layout.args.nav = {
        '/cancel': 'x.svg'
      };
    } else {
      layout.args.nav = layout.args.defaultNav;
    }
  });
});
document.addEventListener('message', function (event) {
  var message = JSON.parse(event.data);

  switch (message.type) {
    case 'barMargin':
      layout.args.barMargin = message.value;
      break;
  }
});
document.addEventListener('DOMContentLoaded', function () {
  _Router.Router.listen(layout, _Routes.Routes);

  layout.render(document.body); // console.log('Initialized app');
  // Service.pageHandlers.add({ handleInstall: event => console.log(event) });
  // Service.register('/service.js').then(() => console.log('registered'));
  // const v1 = View.from('<button cv-on = "click">GET</button>');
  // const v2 = View.from('<button cv-on = "click">POST</button>');
  // const v3 = View.from('<button cv-on = "click">PUT</button>');
  // const v4 = View.from('<button cv-on = "click">PATCH</button>');
  // const v5 = View.from('<button cv-on = "click">DELETE</button>');
  // const vOut = View.from('<pre cv-bind = "output">');
  // const formData = new FormData();
  // formData.append('abc', 123);
  // formData.append('def', 456);
  // const uuid = String(new Uuid);
  // const bodyFormat = id => JSON.stringify({id, created:Date.now()});
  // const urlFormat  = id => `/example?id=${id}`
  // const url = urlFormat(uuid);
  // v1.click = event => fetch(url, {method: 'GET'})
  // .then(r => r.text())
  // .then(t => vOut.args.output = t);
  // v2.click = event => fetch(url, {method: 'POST', body:bodyFormat(uuid)})
  // .then(r => r.text())
  // .then(t => vOut.args.output = t);
  // v3.click = event => fetch(url, {method: 'PUT', body:bodyFormat(uuid)})
  // .then(r => r.text())
  // .then(t => vOut.args.output = t);
  // v4.click = event => fetch(url, {method: 'PATCH', body:JSON.stringify({updated:Date.now()})})
  // .then(r => r.text())
  // .then(t => vOut.args.output = t);
  // v5.click = event => fetch(url, {method: 'DELETE'})
  // .then(r => r.text())
  // .then(t => vOut.args.output = t);
  // v1.render(document.body);
  // v2.render(document.body);
  // v3.render(document.body);
  // v4.render(document.body);
  // v5.render(document.body);
  // vOut.render(document.body);
});
});

require.register("product/ProductDetail.js", function(exports, require, module) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductDetail = void 0;

var _View2 = require("curvature/base/View");

var _Pie = require("../chart/Pie");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ProductDetail = /*#__PURE__*/function (_View) {
  _inherits(ProductDetail, _View);

  var _super = _createSuper(ProductDetail);

  function ProductDetail(args, parent) {
    var _this;

    _classCallCheck(this, ProductDetail);

    var debug = JSON.stringify(args, null, 4);
    _this = _super.call(this, args, parent);

    _defineProperty(_assertThisInitialized(_this), "template", require('./product-detail.html'));

    var _String$split = String(_this.args.item_name).split(', ');

    var _String$split2 = _slicedToArray(_String$split, 2);

    _this.args.title = _String$split2[0];
    _this.args.subTitle = _String$split2[1];
    _this.args.dailyCalories = 2000;
    _this.args.netCarbs = _this.args.nf_total_carbohydrate + -_this.args.nf_dietary_fiber;
    _this.args.complexCarbs = _this.args.nf_total_carbohydrate + -_this.args.nf_dietary_fiber + -_this.args.nf_sugars;
    var segments = [{
      type: 'protein',
      value: _this.args.nf_protein
    }, {
      type: 'fat',
      value: _this.args.nf_total_fat
    }, {
      type: 'carbs',
      value: _this.args.complexCarbs
    }, {
      type: 'sugar',
      value: _this.args.nf_sugars
    }];
    _this.args.servings = Array(_this.args.nf_servings_per_container).fill(1);
    _this.args.multiServing = 1; // this.args.alloc = this.args.nf_calories / this.args.dailyCalories * this.args.multiServing;

    _this.args.bindTo('multiServing', function (v) {
      _this.args.qtyServings = _this.args.nf_serving_size_qty * v;
      _this.args.calorieServings = _this.args.nf_calories * v;
      _this.args.alloc = _this.args.nf_calories / _this.args.dailyCalories * v;
      _this.args.allocPercent = Number(_this.args.alloc * 100).toFixed(2);
    });

    _this.args.chart = new _Pie.Pie({
      segments: segments
    });
    _this.args.debug = debug;
    return _this;
  }

  _createClass(ProductDetail, [{
    key: "incServing",
    value: function incServing() {
      this.args.multiServing++;
    }
  }, {
    key: "decServing",
    value: function decServing() {
      this.args.multiServing = Math.max(1, -1 + this.args.multiServing);
    }
  }]);

  return ProductDetail;
}(_View2.View);

exports.ProductDetail = ProductDetail;
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('index');
//# sourceMappingURL=index.js.map