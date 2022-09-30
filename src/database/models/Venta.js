module.exports = (sequelize, dataTypes) => {

    let alias = 'Venta';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        monto: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        infoenvio: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
    };
    let config = {
        tableName: 'ventas',
        timestamps: false
    };
    const Venta = sequelize.define(alias, cols, config);

    return Venta;

}