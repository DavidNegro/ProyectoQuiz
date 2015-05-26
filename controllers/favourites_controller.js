var models = require('../models/models.js');

exports.create=function(req,res){
    req.user.addQuiz(req.quiz).then(function(){
        res.redirect(req.session.redir.toString());
    
    });

};
exports.destroy=function(req,res){        
    req.user.removeQuiz(req.quiz).then(function(){
        res.redirect(req.session.redir.toString());
    });
    
};
exports.index=function(req,res){
    req.user.getQuizzes().then(function(quizes){
        res.render('quizes/index.ejs', { quizes: quizes, favourites: req.favourites, errors: {} });
    })

}
//carga favoritos en req.favourites
exports.favouritesRequired=function(req,res,next){
    if(req.session.user){
        models.User.find({where: {id: req.session.user.id} }).then( function(user){
        user.getQuizzes().then( function(quizes){
            req.favourites=quizes;
            next();
        
        });
        
        });
    }else{
    req.favourites=[];    
    next();
    }
    

}