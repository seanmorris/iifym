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
require.register("service.js", function(exports, require, module) {
// import { Service } from 'curvature/service/Service';
// import { RecordDatabase } from 'RecordDatabase';
// import { Record } from 'Record';
// Service.routeHandlers.add({ example: (args, params) => {
// 	const request = params.event.request;
// 	const method  = request.method;
// 	return RecordDatabase.open('records', 1).then(database => {
// 		const query = {store:'record-store', index:'id', type:Record, range:args.id, limit: 0};
// 		switch(method)
// 		{
// 			case 'GET':
// 				return database.select(query)
// 				.one(r => JSON.stringify(r, null, 4))
// 				.then(r => r.result || JSON.stringify(null));
// 			case 'POST':
// 				return new Promise(accept => request.text()
// 					.then(t => database.insert('record-store', Record.from(JSON.parse(t))))
// 					.then(r => accept(JSON.stringify(r, null, 4)))
// 					.catch(error => {accept(error.target ? error.target.error : error)})
// 				);
// 			case 'PUT':
// 				return database.select(query)
// 				.one(r => database.delete('record-store', r))
// 				.then(() => request.text())
// 				.then(t => database.insert('record-store', Record.from(JSON.parse(t))))
// 				.then(r => JSON.stringify(r, null, 4));
// 			case 'PATCH':
// 				return database.select(query)
// 				.one(r => request.text().then(t => database.update('record-store', Object.assign(r, JSON.parse(t)))))
// 				.then(r => JSON.stringify(r.result, null, 4));
// 			case 'DELETE':
// 				return  database.select(query)
// 				.one(r => database.delete('record-store', r))
// 				.then(r => JSON.stringify(r.result && r.result, null, 4));
// 			default:
// 				return null;
// 		}
// 	});
// }});
// console.log('Initialized service');
"use strict";
});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('service');
//# sourceMappingURL=service.js.map