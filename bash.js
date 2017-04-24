var commands = require('./commands');
// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim().split(' '); // remove the newline
  function done(output) {
    process.stdout.write(output + '\n');
    process.stdout.write('prompt > ');
  }
  commands[cmd[0]](cmd.slice(1), done);

});