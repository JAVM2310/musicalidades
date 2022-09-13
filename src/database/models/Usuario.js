module.exports = (sequelize, dataTypes) => {

    let alias = 'Usuario';
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
        apellido: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email : {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        pais: {
            type: dataTypes.STRING(90),
            allowNull: false
        },
        provincia: {
            type: dataTypes.STRING(90),
            allowNull: false
        },
        ciudad: {
            type: dataTypes.STRING(90),
            allowNull: false
        },
        direccion: {
            type: dataTypes.STRING(90),
            allowNull: false
        },
        codPostal: {
            type: dataTypes.INTEGER
        },
        fechaNac: {
            type: dataTypes.DATE
        },
        avatar: {
            type:dataTypes.STRING(200)
        },
        permisos: {
            type:dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'usuarios',
        timestamps: false
    };
    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(models){

        Usuario.belongsToMany(models.Producto, {
            through: "productosusuarios",
            foreignKey: "usuario_id",
            otherKey: "producto_id",
            as: "usuariosProductos"
        })
    }

    return Usuario;

}