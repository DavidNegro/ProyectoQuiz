var models = require('../models/models.js');

//GET /quizes/:quizId/comments/new
exports.new=function(req, res){
    res.render('comments/new.ejs', {quizId: req.params.quizId, 
                                    errors:[]});
};

// POST /quizes/:quizId/comments
exports.create =function(req, res ){
    var comment = models.Comment.build(   
        { texto: req.body.comment.texto,
          QuizId: req.params.quizId
        });
    comment.save({fields: ["texto", "QuizId"]}).then( function(){  
        res.redirect('/quizes/'+req.params.quizId);
    }).catch(function(error){
        
        res.render('comments/new.ejs', {quizId: req.params.quizId, errors: error});    
    });
    
};

