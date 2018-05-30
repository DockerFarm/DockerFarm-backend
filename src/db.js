import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from 'config';

let db = null;

export default (() => {
	// connect to a database if needed, then pass it to `callback`:
	if (!db) {
		const sequelize = new Sequelize(
			config.db.database,
			config.db.userName,
			config.db.userPassword, {
				host: config.db.host,
				dialect: config.db.dialect,
				operatorsAliases: false,

				pool: {
					max: 5,
					min: 0,
					acquire: 30000,
					idle: 10000
				}
			});

		db = {
			sequelize,
			Sequelize,
			models: {}
		};

		const dir = path.join(__dirname, 'models');
		fs.readdirSync(dir)
			.filter(function (file) {
				return /^(?!index|test)\w+\.js$/.test(file);
			})
			.forEach(file => {
				const modelDir = path.join(dir, file);
				const model = sequelize.import(modelDir);
				db.models[model.name] = model;
			});

		Object.keys(db.models).forEach(key => {
			if (db.models[key].hasOwnProperty('associate')) {
				db.models[key].associate(db.models);
			}
		});
	}

	return db;
})()
