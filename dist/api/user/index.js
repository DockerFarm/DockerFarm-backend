'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _user = require('./user.ctrl');

var userCtrl = _interopRequireWildcard(_user);

var _authMiddleware = require('lib/middleware/authMiddleware');

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

var _passport = require('../../config/passport');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.get('/me', (0, _passport.jwtAuth)(), userCtrl.me);

exports.default = router;
//# sourceMappingURL=index.js.map