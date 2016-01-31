var elasticsearch = require('elasticsearch');
var fs = require('fs');
//var col = JSON.parse(JSON.stringify(fs.readFileSync('./toysnoze-data.json', 'utf8')));
var fileLoc = './toysnoze-data.json';

var client = new elasticsearch.Client({  // default is fine for me, change as you see fit
  host: 'http://localhost:9200/',
  log: ['error', 'trace']
});


fs.readFile(fileLoc, {encoding: 'utf-8'} , function(err, data){
	if(err) {throw err;}


	var col = data.split('\n');
	var bulkdata = [];
	for(var i = 0; i < col.length; i++){
		bulkdata[i] = JSON.parse(col[i]);
	}

	console.log(bulkdata[6453].price);

	var bulk_request = [];
	for(var i = 0; i < bulkdata.length; i++){
		bulk_request.push({ index:  { _index: 'trial2', _type: 'toyTypes', _id: i } });
		bulk_request.push({"title": bulkdata[i].title, "rank": bulkdata[i].rank, "price": bulkdata[i].price, "rid": bulkdata[i].rid, "description": bulkdata[i].description, "query": bulkdata[i].query, "image": bulkdata[i].image, "url": bulkdata[i].url});	
	};

	console.log(bulk_request[0]);
	console.log(bulk_request[1]);

	
	client.bulk({
		body: bulk_request
	}, function(err, resp){
		console.log(err);
	});

});


/*
var bulkdata = [];

console.log("OVO JE TIP col-a: " + typeof col);
var lines = col.split('\n');

console.log("OVO JE TIP LINESA: " + typeof lines);

for(var i = 0; i < lines.length; i++){
	var sepLine = lines[i].split('\t');

	bulkdata.push({ index:  { _index: 'products', _type: 'prodTypes', _id: sepLine[0] } });
	bulkdata.push({"descr": sepLine[1]});	
}

for (var j = 0; j < bulkdata.length; j+=263474){
	var bulkdata2 = bulkdata.slice(j, j+263474);

	client.bulk({
		body: bulkdata2
	}, function (err, resp) {
	  	console.log(err);
	});
}


*/