module.exports = (sequelize, dataTypes) => {

    let alias = 'PasswordReset';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        fecha: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        email : {
            type: dataTypes.STRING,
            allowNull: false
        },
    };
    let config = {
        tableName: 'passwordreset',
        timestamps: false
    };
    const PasswordResetToken = sequelize.define(alias, cols, config);

    return PasswordResetToken;

}