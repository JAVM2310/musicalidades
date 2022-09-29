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
        comprador_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'ventas',
        timestamps: false
    };
    const Venta = sequelize.define(alias, cols, config);

    return Venta;

}