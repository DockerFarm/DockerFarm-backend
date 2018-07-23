'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    connect: function connect() {
        return _mongoose2.default.connect(_config2.default.mongoUrl, { useNewUrlParser: true }).then(function (result) {
            _logger2.default.info('Database Connect Success');
        }).catch(function (e) {
            _logger2.default.error(e.message);
        });
    },
    disconnect: function disconnect() {
        return _mongoose2.default.disconnect();
    }
};
//# sourceMappingURL=index.js.map