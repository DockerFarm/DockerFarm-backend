'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.passport = exports.googleAuth = exports.githubAuth = exports.jwtAuth = undefined;

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _jwt = require('./jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _google = require('./google');

var _google2 = _interopRequireDefault(_google);

var _github = require('./github');

var _github2 = _interopRequireDefault(_github);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_koaPassport2.default.serializeUser(function (user, done) {
    done(null, user);
});

_koaPassport2.default.deserializeUser(function (user, done) {
    done(null, user);
});

_koaPassport2.default.use(_jwt2.default);
_koaPassport2.default.use(_github2.default);
_koaPassport2.default.use(_google2.default);

var jwtAuth = function jwtAuth() {
    return _koaPassport2.default.authenticate('jwt', { session: false });
};
var githubAuth = function githubAuth(opts) {
    return _koaPassport2.default.authenticate('github', opts);
};
var googleAuth = function googleAuth(opts) {
    return _koaPassport2.default.authenticate('google', opts);
};

exports.jwtAuth = jwtAuth;
exports.githubAuth = githubAuth;
exports.googleAuth = googleAuth;
exports.passport = _koaPassport2.default;
//# sourceMappingURL=index.js.map