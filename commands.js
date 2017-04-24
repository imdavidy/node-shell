var fs = require('fs');
var request = require('request');
module.exports = {
  pwd: function(firstReturn, done) {
    done(process.env.PWD);
  },
  date: function(firstReturn, done) {
    done(String(new Date()));
  },
  ls: function() {
    fs.readdir('.', function(err, files) {
      var files = '';
      if (err) throw err;
      files.forEach(function(file) {
        files += file.toString() + " ";
      });
      done(files);
    });
  },
  echo: function(array) {
    array = array.map(function(val) {
      if (val[0] === '$') {
        return process.env[val.slice(1)];
      }
      return val;
    });
    done(array.join(' '));
  },
  cat: function(files) {
    var fileList = [];
    var filesRead = 0;
    var filesData = '';
    files.forEach(function(file, index){
      fs.readFile('./' + file, 'utf8', function(err, data) {
        if(err) throw err;
        fileList[index] = data;
        filesRead++;
        if(filesRead === files.length) {
          fileList.forEach(function(content) {
            filesData += content + '\n';
          });
          done(filesData);
        }
      });
    });
  },
  head: function(files) {
    var fileList = [];
    var filesRead = 0;
    files.forEach(function(file, index){
      fs.readFile('./' + file, 'utf8', function(err, data) {
        if(err) throw err;
        fileList[index] = data;
        filesRead++;
        if(filesRead === files.length) {
          fileList.forEach(function(content) {
            process.stdout.write(content.split('\n').slice(0, 5).join('\n') + '\n');
          });
          process.stdout.write("\nprompt > ");
        }
      });
    });
  },
  tail: function(files) {
    var fileList = [];
    var filesRead = 0;
    files.forEach(function(file, index){
      fs.readFile('./' + file, 'utf8', function(err, data) {
        if(err) throw err;
        fileList[index] = data;
        filesRead++;
        if(filesRead === files.length) {
          fileList.forEach(function(content) {
            process.stdout.write(content.split('\n').slice(-5).join('\n') + '\n');
          });
          process.stdout.write("\nprompt > ");
        }
      });
    });
  },
  curl: function(urlArr) {
    request(urlArr[0], function(err, response, body) {
      if(err) {
        process.stdout.write(err.toString());
      } else {
        process.stdout.write(body);
      }
      process.stdout.write("\nprompt > ");
    });
  }
};