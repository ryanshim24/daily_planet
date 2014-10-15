var express = require("express"),
app = express(),
bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({extended:true}));

var newArts = [];
var count = 1;

app.get('/articles', function(req, res) {
  res.render('articles/index', {allMyArticles: newArts});
});

app.get('/articles/new', function(req,res) {
  res.render('articles/forms');
});

app.post('/articles', function(req, res) {
  var newArt = {};
  newArt.id = count;
  newArt.articlename = req.body.article.articlename;
  newArts.push(newArt);
  count++;
  res.render('articles/index', {allMyArticles: newArts});

});

app.get('/articles/:id', function(req,res) {
  var articleId = Number(req.params.id);
  var foundArticle;
  newArts.forEach(function(article) {
    if(article.id === articleId) {
      foundArticle = article;
    }
  });
  res.render('articles/article',{article:foundArticle});
});

app.get('/', function(req,res) {
  res.render('site/index');
});

app.get('/about', function(req,res) {
  res.render('site/about');
});

app.get('/contact', function(req, res) {
  res.render('site/contact');
});

app.get('*', function(req,res) {
  res.render('404');
});


app.listen(3000,function() {
  console.log("Server starting on port 3000");
});