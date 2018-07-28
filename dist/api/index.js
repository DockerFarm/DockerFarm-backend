'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.use('/auth', _auth2.default.routes());
router.use('/user', _user2.default.routes());

exports.default = router;
//# sourceMappingURL=index.js.map