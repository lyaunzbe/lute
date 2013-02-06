var test  = require('tap').test,
    task  = require('./../tasks/phaser.json'),
    lute  = require('./../lib/lute');

test('Module definition', function(t){
  t.plan(2);
  t.type(lute, 'function', 'Lute should be a funciton.');
  t.type(task,'object', 'Task should be an object.');
  t.end();
});

test('Processesing an example task', function(t){
  t.plan(1);
  lute(['rick.ogg', 'showtime.ogg'],task, function(err){
    t.equal(null, err, 'Should return no errors or warnings');
    t.end();
  });
});

//lute(['rick.ogg', 'showtime.ogg'],task, function(err){
  //console.log(err);
//});

