
var request = require('request');

var propertiesObject = { search:'lewis', exact:'0' };
var remoteUrl = 'https://www.boardgamegeek.com/xmlapi/search';
//function downloadXml(remoteUrl, localFile) {

var fs = require('fs'),
    xml2js = require('xml2js');
request({url:remoteUrl, qs:propertiesObject}, function(err, response, body) {
  if(err) { console.log(err); return; }
  //console.log(response.body);
  //console.log("Get response: " + response.statusCode);
  /*fs.writeFile("test.xml", response.body, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); */

var inspect = require('eyes').inspector({maxLength: false});
var parser = new xml2js.Parser();
	parser.parseString(response.body.toString(), function (err, result) {
			//result = JSON.parse(result);
			console.log(inspect(result, false, null));
			
			//console.log(result['boardgames'].$.test);
			//console.log(result['boardgames'].boardgame);
			
			var bg = result['boardgames'].boardgame;
			
			var id = bg[0].$.objectid;
			var year = bg[0].yearpublished[0];
			var name = bg[0].name[0]._;
			if (name==undefined) name = bg[0].name[0];
			
			console.log("id="+id);
			console.log("name="+name);
		});


/*fs.readFile(__dirname + '/test.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.log(inspect(result, false, null));
        console.log('Done');
    });
});*/
});



//}

