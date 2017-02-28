var express=require('express');
var app=express();

var path = require('path');

var fs = require('fs');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(request, response){
	response.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/customers', function(req, res){
	res.sendFile(path.join(__dirname + '/data/crm.json'));
	console.log("customers")
});

// route pour la page les clients
app.get('/show/customers', function(req, res){
	res.sendFile(path.join(__dirname + '/public/customers.html'));
	console.log("client")
});



app.post('/post/customers', function(req, res){
	
	var file = path.join(__dirname + '/data/crm.json')
	// Lecture du fichier json
	fs.readFile(file, 'utf8', function(err, data){
		// si il y à un erreure affiche la !
		if(err){
			console.log(err);
		}
		// variable qui contient la data qui est tranformer en json
		var doc = JSON.parse(data);
		// on push dans le tableaux animaux la requête qu'on reçoit dans le formulaire
		doc.customers.push(req.body);
		// on transforme la variable doc en string
		var stringDoc = JSON.stringify(doc, null, 2);
		// Ré-écriture du fichier avec les nouvelle donnée
		fs.writeFile(file, stringDoc, function(err){
			// si il y à un erreure affiche la 
			if(err){
				console.log(err);
			}
		});
	});
	// redirige vers hom
	res.redirect('/show/customers');
});
app.listen(1337, function(){
	console.log('coucou !');
});