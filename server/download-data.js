
var request = require('request');

var propertiesObject = { search:'go', exact:'1' };
var remoteUrl = 'https://www.boardgamegeek.com/xmlapi/search';
//function downloadXml(remoteUrl, localFile) {

var fs = require('fs'),
    xml2js = require('xml2js');

request({url:remoteUrl, qs:propertiesObject}, function(err, response, body) {
  if(err) { console.log(err); return; }
  //console.log(response.body);
  //console.log("Get response: " + response.statusCode);
  fs.writeFile("test.xml", response.body, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

var inspect = require('eyes').inspector({maxLength: false});
var parser = new xml2js.Parser();
fs.readFile(__dirname + '/test.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.log(inspect(result, false, null));
        console.log('Done');
    });
});
});



//}

