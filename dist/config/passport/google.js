'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passportGoogleOauth = require('passport-google-oauth20');

var _passportGoogleOauth2 = _interopRequireDefault(_passportGoogleOauth);

var _ = require('./..');

var _2 = _interopRequireDefault(_);

var _User = require('../../db/models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoogleStrategy = _passportGoogleOauth2.default.Strategy;

var googleStrategy = new GoogleStrategy({
    clientID: _2.default.google.clientId,
    clientSecret: _2.default.google.clientSecret,
    callbackURL: _2.default.google.callbackUrl,
    scope: ['profile', 'email']
}, function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(accessToken, refreshToken, profile, done) {
        var user;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _User2.default.findBySocialId({ provider: profile.provider, id: profile.id });

                    case 3:
                        user = _context.sent;

                        if (user) {
                            _context.next = 8;
                            break;
                        }

                        _context.next = 7;
                        return _User2.default.socialSignup({
                            provider: profile.provider,
                            accessToken: accessToken,
                            username: profile.displayName,
                            socialId: profile.id,
                            email: profile.emails[0].value
                        });

                    case 7:
                        user = _context.sent;

                    case 8:
                        return _context.abrupt('return', done(null, user));

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](0);
                        return _context.abrupt('return', done(_context.t0, null));

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 11]]);
    }));

    return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}());

exports.default = googleStrategy;
//# sourceMappingURL=google.js.map