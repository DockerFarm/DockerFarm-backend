'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _User = require('../../db/models/User');

var _User2 = _interopRequireDefault(_User);

var _ = require('./..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Strategy = _passportJwt2.default.Strategy;

var cookieExtractor = function cookieExtractor(ctx) {
    var token = null;

    if (ctx && ctx.cookies) {
        token = ctx.cookies.get('accessToken');
    }
    return token;
};

var options = {
    secretOrKey: _2.default.jwtSecret,
    jwtFromRequest: cookieExtractor
};

var jwtStrategy = new Strategy(options, function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(payload, done) {
        var user;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        debugger;
                        _context.next = 3;
                        return _User2.default.findByEmail(payload.email);

                    case 3:
                        user = _context.sent;

                        if (user) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt('return', done(new Error("User not found"), null));

                    case 6:
                        return _context.abrupt('return', done(null, user));

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

exports.default = jwtStrategy;
//# sourceMappingURL=jwt.js.map