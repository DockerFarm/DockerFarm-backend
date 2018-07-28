'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _auth = require('./auth.ctrl');

var authCtrl = _interopRequireWildcard(_auth);

var _passport = require('../../config/passport');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/github', (0, _passport.githubAuth)());
router.get('/github/callback', (0, _passport.githubAuth)({ failureRedirect: '/unAuthorized' }), authCtrl.socialCallback);

router.get('/google', (0, _passport.googleAuth)());
router.get('/google/callback', (0, _passport.googleAuth)({ failureRedirect: '/unAuthorized' }), authCtrl.socialCallback);

exports.default = router;
//# sourceMappingURL=index.js.map