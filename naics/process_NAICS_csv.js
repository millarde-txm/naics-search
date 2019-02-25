var fs = require('fs');
var readline = require('readline');

// should likely take input file as argument...
var instream = fs.createReadStream('2017_NAICS_Index_File.csv');
var rl = readline.createInterface(instream);

var fd = fs.openSync('es-bulkload-naics-2017.txt', 'w');

// could be more elegant with closure over idx. Maybe rewrite with => ?
var idx = 1;
rl.on('line', function(line) {
  fs.writeSync(fd, `{ "index": { "_id": ${idx++}, "_index": "naics_index", "_type": "naics"  }}\n`);

  var code = line.substring(0,6)
  var desc = line.substring(7);
  if (desc.startsWith('"')) {
      desc = line.substring(8, line.trimEnd().length-1)
  }
  fs.writeSync(fd, `{ "code": "${code}", "description": "${desc}", "publish_year" : "2017" }\n`);
});

rl.on('close', function() {
  rl.close();
  instream.close();
  fs.closeSync(fd);
  console.log(`${idx} records written.`);
});
