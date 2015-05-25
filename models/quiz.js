module.exports = function (sequelize, DataTypes){
    return sequelize.define('Quiz',
        {pregunta: {
            type: DataTypes.STRING,
            //unique: {msg: "-> Pregunta ya existe"},
            validate: {notEmpty: {msg: "-> Falta Pregunta"}}
            },
        respuesta: {
            type: DataTypes.STRING,
            validate: {notEmpty: {msg: "-> Falta Respuesta"}}
            },
         image: {type: DataTypes.STRING}
        });

}