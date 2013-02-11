var test  = require('tap').test,
    phaser  = require('./../tasks/phaser.json'),
    lute  = require('./../lib/lute');


/*
 * Testing module and task definition.
 *
 */
test('Module definition', function(t){
  t.type(lute, 'function', 'Lute should be a funciton.');
  t.type(phaser,'object', 'Task should be an object.');
  t.end();
});

/**
 * Add a simple phaser effect onto two .ogg files.
 * Ensure no errors
 */
test('Processesing an example task', function(t){
  t.plan(1);
  lute(['rick.ogg', 'showtime.ogg'], phaser, function(err){
    t.equal(null, err, 'Should return no errors or warnings');
  });
});

/**
 * A more complicated effect chain, using format options for
 * the output file. Ensure no errors.
 */


/**
 * Example of batch transcode, no output filenames provided, 
 * output directory provided. Ensure no error or warnings and 
 * check that output files were succesfully created.
 */


/*
 * Example of mixing two files, outputing one.
 * Ensure no errors or warnings and check that output files 
 * were sucessfully created.
 */

