'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _cors = require('@koa/cors');

var _cors2 = _interopRequireDefault(_cors);

var _tokenCheck = require('./lib/middleware/tokenCheck');

var _tokenCheck2 = _interopRequireDefault(_tokenCheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();

_db2.default.connect();
//use koa cors middleware
app.use((0, _cors2.default)());
//use koa body parser middleware
app.use((0, _koaBody2.default)());

app.use((0, _tokenCheck2.default)()).use(_api2.default.routes()).use(_api2.default.allowedMethods());

app.listen(_config2.default.port);
//# sourceMappingURL=app.js.map