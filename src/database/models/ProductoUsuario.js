module.exports = (sequelize, dataTypes) => {

    let alias = 'ProductoUsuario';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cantidad: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        producto_id: {
            type: dataTypes.INTEGER
        },
        usuario_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'productosusuarios',
        timestamps: false
    };
    const ProductoUsuario = sequelize.define(alias, cols, config);

    return ProductoUsuario;

}