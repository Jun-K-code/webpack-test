(function (modules) {
  function require(filePath) {
    const fn = modules[filePath];

    const module = { exports: {} };

    fn(require, module, module.exports);

    return module.exports;
  }

  require('./main.js');
})({
  './foo.js': function (require, module, exports) {
    // foo.js
    const foo = () => {
      console.log('foo');
    };
    module.exports = {
      foo,
    };
  },
  './main.js': function (require, module, exports) {
    // main.js
    const { foo } = require('./foo.js');

    foo();
    console.log('main.js');
  },
});
