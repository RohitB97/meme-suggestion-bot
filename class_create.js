var watson = require('watson-developer-cloud');
var fs     = require('fs');

var natural_language_classifier = watson.natural_language_classifier({
  username: 'eec6e669-a2a9-469b-afce-0e0a571e906c',
  password: 'bIJr50cHnvmH',
  version_date: '2016-05-19'
});

var params = {
  language: 'en',
  name: 'class-1',
  training_data: fs.createReadStream('./train.csv')
};

natural_language_classifier.create(params, function(err, response) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(response, null, 2));
});  