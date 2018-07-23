"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.me = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var me = exports.me = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        var _ctx$request$user, email, username;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _ctx$request$user = ctx.request.user, email = _ctx$request$user.email, username = _ctx$request$user.username;


                        ctx.body = {
                            email: email,
                            username: username
                        };

                    case 2:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function me(_x) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=user.ctrl.js.map