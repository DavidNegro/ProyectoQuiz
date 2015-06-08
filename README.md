# Quiz!
Quiz es un proyecto que consiste en hacer un quiz por web.
Si no sabes lo que es un quiz deberías tener más vida o mirarlo en [kiwipedia](http://es.wikipedia.org/wiki/Quiz).

La aplicación consiste en un server que proporciona una página en la que la gente puede responder preguntas, los que están registrados pueden crearlas y todo el mundo puede poner comentarios, pero solo serán visibles si un usuario les da visibilidad.

Se pueden realizar y contestar preguntas sobre Pablo Iglesias.
-![alt text](https://38.media.tumblr.com/fc31a0872ab7da3bbcf872ebde1df9aa/tumblr_n90amn4rct1rr9xfco1_1280.gif "Sobre este tío")

## Instalar
Para instalarlo debes:
* Clonar el repositorio
* Dar a `npm install` para que te instale todo lo necesario.
* Crear un fichero `.env` que ponga:
```
    DATABASE_URL=sqlite://:@:/
    DATABASE_STORAGE=quiz.sqlite
    PASSWORD_ENCRYPTION_KEY=saaaaafjkoqdooookaoiiji
```
* Se inicia con `foreman start`
* Para acceder a la página desde tu ordenador local pon `localhost:5000` en tu navegador

Si quieres meterlo en [Heroku](https://www.heroku.com/) metete una base de datos postgres y configura las varibles globales que falten (todas las variables que en local definimos en el .env).
[Un ejemplo](http://ola-quiz-2015.herokuapp.com/)

## Más información:
Para más información sigue el siguiente [enlace](https://www.youtube.com/watch?v=erOt5Zhp1go)
