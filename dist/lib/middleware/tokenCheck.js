'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _User = require('../../db/models/User');

var _User2 = _interopRequireDefault(_User);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
            var auth, token, _jwt$verify, email, user;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            auth = ctx.request.headers['authorization'];

                            if (auth) {
                                _context.next = 4;
                                break;
                            }

                            ctx.request.user = null;
                            return _context.abrupt('return', next());

                        case 4:
                            _context.prev = 4;
                            token = auth.split("Bearer ")[1];
                            _jwt$verify = _jsonwebtoken2.default.verify(token, _config2.default.jwtSecret), email = _jwt$verify.email;
                            _context.next = 9;
                            return _User2.default.findByEmail(email);

                        case 9:
                            user = _context.sent;

                            if (user) {
                                _context.next = 13;
                                break;
                            }

                            ctx.request.user = null;
                            return _context.abrupt('return');

                        case 13:

                            ctx.request.user = user;
                            return _context.abrupt('return', next());

                        case 17:
                            _context.prev = 17;
                            _context.t0 = _context['catch'](4);

                            ctx.request.user = null;

                        case 20:
                            return _context.abrupt('return', next());

                        case 21:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[4, 17]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};
//# sourceMappingURL=tokenCheck.js.map