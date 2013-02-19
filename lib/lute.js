/**
 * Lute - A task-based library for SoX.
 *
 * @package lute
 * @author Ben Lyaunzon
 */

/**
 * Dependencies 
 */

var _     = require('lodash'),
    path  = require('path'),
    async = require('async'),
    spawn = require('child_process').spawn;

/**
 *
 * @param {Array} Array of audio files 
 * @param {Object} Task to be processed
 *
 * @return {Error}
 */

module.exports = function (images, task, callback) {

  var cpu = task.processes ? task.processes : require('os').cpus().length;
  
  var no_fn;
  var glob_fn;

  var effects = (function(){
    var fx = [];

    _.each(task.effects, function(value, key){
      fx.push(key);
      fx.push(value.split(' '));
    });

    return fx;
  })();

  if(!task.outfile || !task.outfile.filename){
    no_fn = true;
  }else{
    if(!Array.isArray(task.outfile.filename)){
      glob_fn = path.extname(task.outfile.filename);
    }else if(images.length !== task.outfile.filename){
      callback('The numner of output filenames do not match the number of input files');
    }
  }
  
  var queue = async.queue(function (infile,cb){
    var outfile;
    var input;
    //If no output filenames are given, generate
    //one for each infile using a unix time stamp
    //and)infile filename.
    if(no_fn){
      var id = new Date().getTime();
      input = path.basename(infile).split('.');
      outfile = input[0] +id + '.' +input[1];
    }else if(glob_fn){
      input = path.basename(infile).split('.');
      outfile = input[0] + glob_fn;
      
    }else{
      outfile = task.outfile.filename.shift();
    }

    args = _.flatten([infile, outfile, effects]);
    
    var process = spawn('sox',args);
    
    process.on('exit', function(code){
      if(!code) return callback();

      switch (code){
        case 1:  
          callback('[1]: Incorrect command line parameters.');
          break;
        default:
          callback('[2]: Error during file processing.');
          break;
      }
    });

    process.stderr.on('data', function(data){
      callback(data.toString());
    });

  }, cpu);

  queue.push(images);
  queue.drain = function(){
    callback(null);
  };
};

