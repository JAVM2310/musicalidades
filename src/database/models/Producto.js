module.exports = (sequelize, dataTypes) => {

    let alias = 'Producto';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(90),
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING,
            allowNull: false
        },
        descLarga : {
            type: dataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        descuento: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        imagenes: {
            type: dataTypes.STRING,
            allowNull: false
        },
        marca_id: {
            type: dataTypes.INTEGER
        },
        categoria_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'productos',
        timestamps: false
    };
    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models){

        Producto.belongsTo(models.Categoria, {
            foreignKey: "categoria_id",
            as: "categoria"
        });
        Producto.belongsTo(models.Marca, {
            foreignKey: "marca_id",
            as: "marca"
        });
        Producto.belongsToMany(models.Usuario, {
            through: "productosusuarios",
            foreignKey: "producto_id",
            otherKey: "usuario_id",
            as: "productosUsuarios"
        })
    }

    return Producto;

}