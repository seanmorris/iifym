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
require.register("chart/pie.html", function(exports, require, module) {
module.exports = "<div class = \"pie\" cv-each = \"wedges:wedge\">\n  <div tabindex=\"0\" data-value = \"[[wedge.value]]\" class = \"segment [[wedge.type]]\" style = \"--value:[[wedge.value]]; --offset:[[wedge.sweep]]\">\n    <div class = \"mask bottom\">\n      <div class = \"wedge bottom\"></div>\n    </div>\n    <div class = \"mask top\">\n      <div class = \"wedge top\"></div>\n    </div>\n  </div>\n</div>"
});

;require.register("chart/pie.svg", function(exports, require, module) {
module.exports = "  <svg style = \"width: 100%;\" viewbox = \"0 0 100 100\" cv-each = \"paths:path\">\n    <path d=\"[[path.d]]\" fill=\"[[path.fill]]\" stroke=\"[[path.stroke]]\" />\n  </svg>"
});

;require.register("layout/layout.html", function(exports, require, module) {
module.exports = "<main style = \"padding-top: calc([[barMargin]] * 0.5px);\">\n\t[[content]] \n</main>\n\n<nav cv-each = \"nav:icon:link\">\n\t<a cv-link = \"[[link]]\">\n\t\t<img class = \"icon\" src = \"[[icon]]\">\n\t</a>\n</nav>"
});

;require.register("product/product-detail.html", function(exports, require, module) {
module.exports = "<article class = \"product-detail\">\n\n<h1>[[title]]</h1>\n\n<p><span cv-if = \"subTitle\">[[subTitle]],</span> [[brand_name]]</p>\n\n<div class = \"legend\">\n\t<div class = \"protein\">[[nf_protein]]g protein</div>\n\t<div class = \"fat\">[[nf_total_fat]]g fat</div>\n\t<div class = \"carbs\">\n\t\t<div>[[netCarbs]]g carbs</div>\n\t\t<div class = \"sugar\" cv-if = \"nf_sugars\">[[nf_sugars]]g sugar</div>\n\t</div>\n</div>\n\n[[chart]]\n\n<div class = \"page-segment servings\">\n\t<div class = \"list\" cv-each = \"servings:serving\">\n\t\t<div class = \"serving\"></div>\n\t</div>\n\t<div class = \"caption\">[[nf_servings_per_container]] servings per container.</div>\n</div>\n\n<div class = \"page-segment allocation\">\n\t\n\t<div class = \"caption\">[[qtyServings]] [[nf_serving_size_unit]]<span cv-if = \"!multiServing\" cv-is = \"1\">s</span>: [[calorieServings]] calories.</div>\n\t\n\t<div class = \"bar\" style = \"--alloc: [[alloc]]\">\n\t\t<div class = \"filled\"></div>\n\t</div>\n\n\t<div class = \"caption\">\n\t\t[[multiServing]] serving<span cv-if = \"!multiServing\" cv-is = \"1\">s</span> represents [[allocPercent]]% of a [[dailyCalories]] calorie diet.\n\t</div>\n\n\t<div class = \"buttons\">\n\t\t<button cv-on = \"click:decServing\">-</button>\n\t\t<input type = \"number\" min = \"0\" cv-bind = \"multiServing\">\n\t\t<button cv-on = \"click:incServing\">+</button>\n\t</div>\n\n</div>\n\n<div class = \"caption\">Carb breakdown</div>\n\n<div class = \"page-segment carb-breakdown counters\">\n\t<div class = \"row\">\n\t\t<div class = \"counter\" cv-if = \"?nf_dietary_fiber\">\n\t\t\t<div class = \"value\">[[nf_dietary_fiber]]g</div>\n\t\t\t<div class = \"label\">fiber</div>\n\t\t</div>\n\t\t<div class = \"counter\" cv-if = \"?nf_sugars\">\n\t\t\t<div class = \"value\">[[nf_sugars]]g</div>\n\t\t\t<div class = \"label\">sugar</div>\n\t\t</div>\n\t</div>\n\t<div class = \"caption\"></div>\n</div>\n\n<div class = \"caption\">Fat breakdown</div>\n\n<div class = \"page-segment fat-breakdown counters\">\n\t<div class = \"row\">\n\t\t<div class = \"counter\" cv-if = \"?nf_polyunsaturated_fat\">\n\t\t\t<div class = \"value\">[[nf_polyunsaturated_fat]]g</div>\n\t\t\t<div class = \"label\">polyunsaturated fat</div>\n\t\t</div>\n\t\t<div class = \"counter\" cv-if = \"?nf_monounsaturated_fat\">\n\t\t\t<div class = \"value\">[[nf_monounsaturated_fat]]g</div>\n\t\t\t<div class = \"label\">monounsaturated fat</div>\n\t\t</div>\n\t\t<div class = \"counter\" cv-if = \"?nf_saturated_fat\">\n\t\t\t<div class = \"value\">[[nf_saturated_fat]]g</div>\n\t\t\t<div class = \"label\">saturated fat</div>\n\t\t</div>\n\t\t<div class = \"counter\" cv-if = \"?nf_trans_fatty_acid\">\n\t\t\t<div class = \"value\">[[nf_trans_fatty_acid]]g</div>\n\t\t\t<div class = \"label\">transfat</div>\n\t\t</div>\n\t\t<div class = \"counter\">\n\t\t\t<div class = \"value\">[[nf_total_fat]]g</div>\n\t\t\t<div class = \"label\">total fat</div>\n\t\t</div>\n\t</div>\n\t<div class = \"caption\"></div>\n</div>\n\n<!-- <pre>[[debug]]</pre> -->\n\n</article>"
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=templates.js.map