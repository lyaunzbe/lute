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
    async = require('async'),
    spawn = require('child_process').spawn;

/**
 * 
 *
 * @param {Array} Array of audio files 
 * @param {Object} Task to be processed
 *
 * @return {Error}
 */

module.exports = function (images, task, callback) {

  var cpu = task.processes ? task.processes : require('os').cpus().length;
  
  function Sox(task){
    this.queue = async.queue(function (infile,cb){
      var fx = [];

      _.each(task.effects, function(value, key){
        fx.push(key);
        fx.push(value.split(' '));
      });

      var outfile;
      var args;

      if(!task.outfile){
        var id = new Date().getTime();
        var input = infile.split('.');
        outfile = input[0] +id + '.' +input[1];
      }

      args = _.flatten([infile, outfile, fx]);
      var process = spawn('sox',args);

      process.stderr.on('data', function (data) {
        if(data) return callback('ERROR: ' + data);
      });
    }, cpu);
  }

  var sox = new Sox(task);
  sox.queue.push(images);
  sox.queue.drain = callback();
};

