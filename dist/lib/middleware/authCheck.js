"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return function (ctx, next) {
        var user = ctx.request.user;


        if (!user) {
            ctx.status = 401;
            return;
        }

        next();
    };
};
//# sourceMappingURL=authCheck.js.map