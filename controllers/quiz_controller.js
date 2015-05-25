//controllers js
var models = require('../models/models.js');

//Autoload :id - factoriza el código si la ruta incluye :quizId
exports.load = function(req, res, next, quizId){
    models.Quiz.find({
        where: {id: Number(quizId)},
        include: [{model: models.Comment}]
    }).then(
    function(quiz){
        if(quiz){
            req.quiz=quiz;
            next();
        } else { next(new Error('No existe quizId=' + quizId));}
    }
    ).catch(function(error){next(error);})
};

// GET /quizes/:id
exports.show= function(req, res){
        res.render('quizes/show',{quiz: req.quiz, errors: []});  
};

// GET /quizes/:id/answer
exports.answer= function(req,res){
    var resultado = 'Incorrecto';
    if(req.query.respuesta===req.quiz.respuesta){
    resultado= 'Correcto';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
	
};
// GET /quizes
exports.index=function(req,res){
    var search = (req.query.search||"");
    search.replace(" ","%");
    search="%"+search+"%";
    models.Quiz.findAll({where: ["pregunta like ?", search]}).then(function(quizes){
        res.render('quizes/index.ejs', {quizes: quizes, errors: []});
    }).catch(function(error){next( error);});
};

// GET /quizes/new 
exports.new = function(req, res){
    var quiz = models.Quiz.build( //crea objeto quiz
        {pregunta: "Pregunta", respuesta: "Respuesta"});
    res.render( 'quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res){
    req.body.quiz.UserId=req.session.user.id;
    var quiz = models.Quiz.build( req.body.quiz );
    
    quiz.save({fields: ["pregunta", "respuesta", "UserId"]}).then(function(){
                res.redirect('/quizes');
            }).catch(function(err){
                res.render('quizes/new', {quiz: quiz, errors: err})
    
    });
    
};

//GET quizes/:id/edit
exports.edit= function(req,res){
    var quiz = req.quiz;
    res.render('quizes/edit', {quiz: quiz, errors: []});

}

//PUT /quizes/:id
exports.update = function(req, res){
req.quiz.pregunta=req.body.quiz.pregunta;
req.quiz.respuesta=req.body.quiz.respuesta;
    req.quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
                res.redirect('/quizes');
            }).catch(function(err){
                res.render('quizes/edit', {quiz: quiz, errors: err})
    
    });
    
}

//DELETE /quizes/:id
exports.destroy=function(req,res){
    req.quiz.destroy().then(function(){
    var id=[];
    for(var i in req.quiz.comments){
        id.push(req.quiz.comments[i].id)
    }
    console.log(id);    
    models.Comment.destroy({id:id}).then(function(){res.redirect('/quizes');
              }).catch(function(error){next(error)});
    }).catch(function(error){next(error)});
      
}

exports.statistics=function(req,res){
    models.Quiz.findAll({include: models.Comment}).then(function(result){  //preguntas
        var quizzes = result.length; //número de quizzes
        var wComments=0;             //número de preguntas con comentario
        var comments=0;              //número de comentarios
        var quiz;
        for(quiz in result){ // calculamos el número de comentarios y de preguntas con comentatio
            if(result[quiz].comments.length>0){ wComments++; comments+=result[quiz].comments.length}
        }        
                res.render('quizes/statistics.ejs', {quizzes: quizzes,
                                                comments: comments,
                                                meanComments: (comments/quizzes),
                                                woComments: (quizzes - wComments),
                                                wComments: wComments,
                                                errors: []});
                
    }).catch(function(error){next(error);});

};