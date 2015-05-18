module.exports = function(sequelize ,DataTypes) { 
    return sequelize.define('Comment',               
                            {texto: {
                            type: DataTypes.STRING,
                            validate: {notEmpty: {msg: "-> Falta Comentatio"}}
                                    },
                             publicado: {
                                type: DataTypes.BOOLEAN,
                                defaultValue: false
                             } 
                            }
                           );

}