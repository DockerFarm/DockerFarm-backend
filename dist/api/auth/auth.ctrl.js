'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = exports.register = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _User = require('../../db/models/User');

var _User2 = _interopRequireDefault(_User);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _logger = require('../../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var register = exports.register = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        var _ctx$request$body, email, password, username, schema, validateResult, existUser, user;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _ctx$request$body = ctx.request.body, email = _ctx$request$body.email, password = _ctx$request$body.password, username = _ctx$request$body.username;
                        schema = _joi2.default.object().keys({
                            email: _joi2.default.string().email().required(),
                            password: _joi2.default.string().min(8).max(10).required(),
                            username: _joi2.default.string().min(6).max(20).required()
                        });
                        validateResult = schema.validate(ctx.request.body);

                        if (!(validateResult.error != null)) {
                            _context.next = 7;
                            break;
                        }

                        ctx.status = 422;
                        ctx.body = {
                            type: "ValidateError",
                            message: validateResult.error.details[0].message };
                        return _context.abrupt('return');

                    case 7:
                        _context.prev = 7;
                        _context.next = 10;
                        return _User2.default.findByEmail(email);

                    case 10:
                        existUser = _context.sent;

                        if (existUser) {
                            _context.next = 18;
                            break;
                        }

                        _context.next = 14;
                        return _User2.default.localSignup({ email: email, password: password, username: username });

                    case 14:
                        user = _context.sent;

                        ctx.status = 200;
                        _context.next = 20;
                        break;

                    case 18:
                        ctx.status = 409;
                        ctx.body = { message: "Email is already exists!" };

                    case 20:
                        _context.next = 25;
                        break;

                    case 22:
                        _context.prev = 22;
                        _context.t0 = _context['catch'](7);

                        ctx.throw(_context.t0, 500);

                    case 25:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[7, 22]]);
    }));

    return function register(_x) {
        return _ref.apply(this, arguments);
    };
}();

var login = exports.login = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
        var _ctx$request$body2, email, password, schema, validateResult, existUser, accessToken, refreshToken;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _ctx$request$body2 = ctx.request.body, email = _ctx$request$body2.email, password = _ctx$request$body2.password;
                        schema = _joi2.default.object().keys({
                            email: _joi2.default.string().email().required(),
                            password: _joi2.default.string().min(8).max(10).required()
                        });
                        validateResult = schema.validate(ctx.request.body);

                        if (!(validateResult.error != null)) {
                            _context2.next = 7;
                            break;
                        }

                        ctx.status = 422;
                        ctx.body = {
                            type: "ValidateError",
                            message: validateResult.error.details[0].message };
                        return _context2.abrupt('return');

                    case 7:
                        _context2.prev = 7;
                        _context2.next = 10;
                        return _User2.default.findByEmail(email);

                    case 10:
                        existUser = _context2.sent;

                        if (existUser) {
                            _context2.next = 15;
                            break;
                        }

                        ctx.status = 403;
                        ctx.body = { message: "User does not exists!" };
                        return _context2.abrupt('return');

                    case 15:
                        if (existUser.verifyPassword(password)) {
                            _context2.next = 19;
                            break;
                        }

                        ctx.status = 403;
                        ctx.body = { message: "Password does not match!" };
                        return _context2.abrupt('return');

                    case 19:
                        accessToken = _jsonwebtoken2.default.sign({ email: existUser.email }, _config2.default.jwtSecret, { expiresIn: '1h' });
                        refreshToken = _jsonwebtoken2.default.sign({ email: existUser.email }, _config2.default.jwtSecret, { expiresIn: '7d' });


                        ctx.body = {
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        };

                        _context2.next = 27;
                        break;

                    case 24:
                        _context2.prev = 24;
                        _context2.t0 = _context2['catch'](7);

                        ctx.throw(_context2.t0, 500);

                    case 27:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[7, 24]]);
    }));

    return function login(_x2) {
        return _ref2.apply(this, arguments);
    };
}();
//# sourceMappingURL=auth.ctrl.js.map