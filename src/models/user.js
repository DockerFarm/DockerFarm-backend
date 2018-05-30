import crypto from 'crypto';

export default (sequelize, DataType) => {

    const User = sequelize.define('User', 
        {
            email: {
                type: DataType.STRING(30),
                primaryKey: true,
                allowNull: false,
                field: 'email'
            },
            password: {
                type: DataType.STRING(100),
                allowNull: false,
                field: 'password',
                validate: {
                    notEmpty: true
                }
            },
            createdAt: { type: DataType.DATE,
                allowNull: false,
                field: 'created_at'
            },
            updatedAt: {
                type: DataType.DATE,
                allowNull: false,
                field: 'updated_at'
            }
        },
        {
            tableName: "USER",
            freezeTableName: true,
            underscored: true,
            updatedAt: "updatedAt",
            createdAt: "createdAt",
            hooks : {
            beforeCreate : user => {
                    user.hashPassword();
            } 
        }
    });

    User.prototype.hashPassword = function() {
        this.password = crypto.createHash('sha512')
                            .update(this.password)
                            .digest('base64');
    };


    User.prototype.verify = function( password ) {
        return this.password === crypto.createHash('sha512')
                                    .update(password)
                                    .digest('base64');
    };

    return User;
}