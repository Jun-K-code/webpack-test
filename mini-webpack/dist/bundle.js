(function (modules) {
    function require(id) {
        const [fn, mapping] = modules[id];
    
        const module = { exports: {} };
    
        function localRequire(filePath) {
          const id = mapping[filePath];
          return require(id);
        }
    
        fn(localRequire, module, module.exports);
    
        return module.exports;
      }
    
    require(0);
})({
    
        "0": [function (require, module, exports) {
            "use strict";

var _foo = require("./foo.js");
var _user = _interopRequireDefault(require("./user.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
console.log(_user["default"]);
(0, _foo.foo)();
console.log('main.js');
        }, {"./foo.js":1,"./user.json":2}],
    
        "1": [function (require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;
var foo = exports.foo = function foo() {
  console.log('foo');
};
        }, {}],
    
        "2": [function (require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = "{\r\n  \"name\": \"cxr\",\r\n  \"age\": 18\r\n}\r\n";
        }, {}],
    
});
