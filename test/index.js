var test  = require('tap').test,
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

var phaser = {
  "effects":{
    "phaser": "0.6 0.66 3.0 0.6 2.0 -t"
  }
};

/**
 * Add a simple phaser effect onto two .ogg files.
 * No filenames given. Ensure no errors
 */
test('Processesing a basic task', function(t){
  t.plan(1);
  lute(['rick.ogg', 'showtime.ogg'], phaser, function(err){
    t.equal(null, err, 'Should return no errors or warnings');
    //Add test that actually checks that the new files exist.
  });
});

var transcode1 = {
  "outfile":{
    "filename": "*.mp3"
  }
};

/**
 * Batch transcode, wildcard output filename given.
 * Ensure no errors.
 */

var transcode2 = {
  "outfile":{
    "filename": ['ricky.mp3', 'show.wav' ]
  }
};

/**
 * Batch transcode, filenames provided for each.
 * Ensure no errors.
 */

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

