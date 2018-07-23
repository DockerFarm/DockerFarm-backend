'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'dev';

var result = _dotenv2.default.config({ path: _appRootPath2.default + '/env/' + env + '.env' });

//dotenv if error
if (result.error) throw result.error;

exports.default = (0, _env2.default)(process.env);
//# sourceMappingURL=index.js.map