var express = require("express"),//Calling express
app = express(), //Allows me to use express function with var app
bodyParser = require("body-parser");//Alowed me to use app.post

app.set('view engine', 'ejs');
app.use(express.static(__dirname +'/public')); //Let me use the public folder which includes stylesheets, images, etc
app.use(bodyParser.urlencoded({extended:true}));

var newArts = []; // The array where I'll store all my articles
var count = 1; // Counter to let me know which article I'm on ex) Article:1, Article:2

app.get('/articles', function(req, res) { //Routing to articles page
  res.render('articles/index', {allMyArticles: newArts}); // rendering to articles/index file in addition to local variables
});

app.get('/articles/new', function(req,res) { //Routing to the articles new page
  res.render('articles/forms'); //rendering to articles/forms file
});

app.post('/articles', function(req, res) {//Routing back to articles page
  var newArt = {}; //Making new object variable newArt
  newArt.id = count;//Giving it an id property that is equal to our global variable count which is 1 for now
  newArt.articlename = req.body.article.articlename;//Gets article[articlename] which is the content that I put in the text field
  newArts.push(newArt);//Pushes the article content and article id into the array newArts
  count++;//Increments count so the next article I create would be Article:2
  res.render('articles/index', {allMyArticles: newArts});//Rendering from the articles/index file
  //But this time it will go to else condition because allMyArticles array is not equal to 0

});

app.get('/articles/:id', function(req,res) { //Routing to the articles/id page
  var articleId = Number(req.params.id);// Gets the id from the param
  var foundArticle;//Making new varaible found article
  newArts.forEach(function(article) { //Going through the newArts array
    if(article.id === articleId) { //If there is an articleId with the same article id in the article array
      foundArticle = article;//Then we can push foundArticle as the information
    }
  });
  res.render('articles/article',{article:foundArticle}); //Rendering from articles/article file
});

app.get('/', function(req,res) { //My Home Page
  res.render('site/index');
});

app.get('/about', function(req,res) { //My about page
  res.render('site/about');
});

app.get('/contact', function(req, res) { // My contact page
  res.render('site/contact');
});

app.get('*', function(req,res) { // My error page
  res.render('404');
});


app.listen(3000,function() { //Where my server starts
  console.log("Server starting on port 3000");
});