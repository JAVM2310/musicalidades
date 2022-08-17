module.exports = (sequelize, dataTypes) => {

    let alias = 'Marca';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(90),
            allowNull: false
        }
    };
    let config = {
        tableName: 'marcas',
        timestamps: false
    };
    const Marca = sequelize.define(alias, cols, config);

    Marca.associate = function(models){

        Marca.hasMany(models.Producto, {
            foreignKey: "marca_id",
            as: "marcaProducto"
        })
    }

    return Marca;

}