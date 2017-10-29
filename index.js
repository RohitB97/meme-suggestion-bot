var express = require('express');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var keyword_extractor = require("keyword-extractor");
var json2csv = require('json2csv');
var fs = require('fs');
var request = require('request');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

var tone_analyzer = new ToneAnalyzerV3({
  username: 'eec6e669-a2a9-469b-afce-0e0a571e906c',
  password: 'bIJr50cHnvmH',
  version_date: '2016-05-19'
});

// var result = [];

app.get('/',function(req,res){
  res.sendFile(__dirname+ '/index.html');
});

app.post('/analyze',function(req,res){
  var params = {
    // Get the text from the JSON file.
    text: req.body.text,
    tones: 'emotion'
  };

  var arr = [];

  // var extract = ml.extractors.extract(module_id, arr);

  tone_analyzer.tone(params, function(error, response) {
    if (error)
      console.log('error:', error);
    else
      arr = response.document_tone.tone_categories[0].tones;

    var extraction_result = keyword_extractor.extract(req.body.text,{language:"english",
                                                                remove_digits: true,
                                                                return_changed_case:true,
                                                                remove_duplicates: true
 
                                                           });
    var obj = {};
    var obj1 = {};
    obj.keywords = extraction_result;
    arr.push(obj);
    obj1.link = req.body.link;
    arr.push(obj1);
    // result.push(arr);
    var csv = json2csv({ data: arr});
 
    fs.writeFile('data.csv', csv, function(err) {
        if (err) throw err;
        console.log('file saved');
    });

    request.get("http://localhost:5000/",function(error,resp,body){
            res.json(resp);
    });

  });

});

app.get("/convert",function(req,res){
    // var csv = json2csv({ data: result});
 
    // fs.writeFile('data.csv', csv, function(err) {
    //     if (err) throw err;
    //     console.log('file saved');
    // });
});

app.listen(3000);
console.log("Server running on port 3000");