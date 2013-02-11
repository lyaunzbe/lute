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
  
  var effects = (function(){
    var fx = [];

    _.each(task.effects, function(value, key){
      fx.push(key);
      fx.push(value.split(' '));
    });

    return fx;
  })();

  var queue = async.queue(function (infile,cb){
    if(!task.outfile || !task.outfile.filename){
        var id = new Date().getTime();
        var input = path.basename(infile).split('.');
        outfile = input[0] +id + '.' +input[1];
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

