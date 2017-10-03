
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
			
			result = cleanXML(result);
			
			console.log(inspect(result, false, null));
			
			//console.log(result['boardgames'].$.test);
			//console.log(result['boardgames'].boardgame);
			
			var bg = result['boardgames'].boardgame;
			
			var id = bg[0].$.objectid;
			var year = bg[0].yearpublished;
			var name = bg[0].name;
			if (name==undefined) name = bg[0].name;
			
			console.log("id="+id);
			console.log("year="+year);
			console.log("name="+name);
		});


/*fs.readFile(__dirname + '/test.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.log(inspect(result, false, null));
        console.log('Done');
    });
});*/
});

var cleanXML = function(xml){
    var keys = Object.keys(xml),
        o = 0, k = keys.length,
        node, value, singulars,
        l = -1, i = -1, s = -1, e = -1,
        isInt = /^-?\s*\d+$/,
        isDig = /^(-?\s*\d*\.?\d*)$/,
        radix = 10;

    for(; o < k; ++o){
        node = keys[o];

        if(xml[node] instanceof Array && xml[node].length === 1){
            xml[node] = xml[node][0];
        }

        if(xml[node] instanceof Object){
            value = Object.keys(xml[node]);

            if(value.length === 1){
                l = node.length;

                singulars = [
                    node.substring(0, l - 1),
                    node.substring(0, l - 3) + 'y'
                ];

                i = singulars.indexOf(value[0]);

                if(i !== -1){
                    xml[node] = xml[node][singulars[i]];
                }
            }
        }

        if(typeof(xml[node]) === 'object'){
            xml[node] = cleanXML(xml[node]);
        }

        if(typeof(xml[node]) === 'string'){
            value = xml[node].trim();

            if(value.match(isDig)){
                if(value.match(isInt)){
                    if(Math.abs(parseInt(value, radix)) <= Number.MAX_SAFE_INTEGER){
                        xml[node] = parseInt(value, radix);
                    }
                }else{
                    l = value.length;

                    if(l <= 15){
                        xml[node] = parseFloat(value);
                    }else{
                        for(i = 0, s = -1, e = -1; i < l && e - s <= 15; ++i){
                            if(value.charAt(i) > 0){
                                if(s === -1){
                                    s = i;
                                }else{
                                    e = i;
                                }
                            }
                        }

                        if(e - s <= 15){
                            xml[node] = parseFloat(value);
                        }
                    }
                }
            }
        }
    }

    return xml;
};

//}

