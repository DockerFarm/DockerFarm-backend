"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (env) {
    return {
        jwtSecret: env.JWT_SECRET,
        sha256Secret: env.SHA256_SECRET,
        mongoUrl: env.MONGO_URL,
        port: env.PORT
    };
};
//# sourceMappingURL=env.js.map