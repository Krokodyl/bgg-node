var express = require('express');

var app = express();

var fs = require('fs'),
	xml2js = require('xml2js');
	
app.get('/', function(req, res) {
	
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});

var inspect = require('eyes').inspector({maxLength: false})
var parser = new xml2js.Parser();
	fs.readFile('test.xml', function(err, data) {
		//console.log(data.toString());
		parser.parseString(data.toString(), function (err, result) {
			//result = JSON.parse(result);
			//console.log(inspect(result, false, null))
			
			console.log(result['boardgames'].$.test);
			//console.log(result['boardgames'].boardgame);
			
			var bg = result['boardgames'].boardgame;
			
			var id = bg[0].$.objectid;
			var year = bg[0].yearpublished[0];
			var name = bg[0].name[0]._;
			
			//var exjson = {'key':'...abc...', 'key2':'...xyz...'};
			for(var exKey in bg) {
				console.log("key:"+exKey+", value:"+bg[exKey]);
			}
			
			/*console.log(Object.keys(result).length);
			for(var attributename in result){
				console.log(attributename+": "+result[attributename]);
			}
			console.log(result['boardgames']);
			console.log(Object.keys(result['boardgames']).length);*/
			/*for(var i = 0; i < Object.keys(result).length; i++) {
				
			}*/
			//console.log('Done');
		});
		
	});



//app.listen(8080);