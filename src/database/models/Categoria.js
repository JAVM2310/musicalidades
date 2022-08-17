module.exports = (sequelize, dataTypes) => {

    let alias = 'Categoria';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {
            type: dataTypes.STRING(90),
            allowNull: false
        }
    };
    let config = {
        tableName: 'categorias',
        timestamps: false
    };
    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(models){

        Categoria.hasMany(models.Producto, {
            foreignKey: "categoria_id",
            as: "categoriaProducto"
        })
    }

    return Categoria;

}