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

var _authCheck = require('../lib/middleware/authCheck');

var _authCheck2 = _interopRequireDefault(_authCheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.use('/auth', _auth2.default.routes());
router.use('/user', (0, _authCheck2.default)(), _user2.default.routes());

exports.default = router;
//# sourceMappingURL=index.js.map