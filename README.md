# Lute 

![lute](https://raw.github.com/lyaunzbe/lute/master/lute.jpeg)

Lute is a task-based library for processing and manipulating audio using SoX.

Inspired by the [wizardry](http://github.com/diy/wizardry).

###Current capabilities:
* Batch transcodes.
* Applying filter and effect chains.

## Installation

Before installing the module, you will need to install SoX. If you have homebrew, this is as simple as:

```bash
brew install sox
```

Then install the module from npm:

```bash
npm install lute
```

### Basic Usage

```javascript
var lute = require('lute');
var task = require('./path/to/your/task.json')

// Pass an array of audio files, as well as a json 
// object defining the task to execute on these files

lute(['song1.wav', 'song2.mp3'], task, callback);
```
## Examples

### Batch transcode, no output filenames given
```javascript
var task = {
  "outfile":{
    "filename": "*.mp3"
  }
};

lute(['Track-1.flac', 'Track-2.flac'], task, callback);
// Outputs Track-1.mp3 & Track-2.mp3
```
### Transcode and flanger effect, w/ output filenames 
```javascript
var task = {
  "outfile":{
    "filename": ['song1.wav', 'song2.wav'],
  }
  "effects": {
    "flanger": "0.6 0.87 3.0 0.9 0.5 -s",
    "stretch": "1.3"
  }
};

lute = (['Ride_With_It.flac', 'Sweet_Home_Alabama.flac'],task, callback);
// Outputs song1.wav and song2.wav
```

### Effect chain, no transcode and no output filenames
```javascript
var task = {
  "effects":{
    "chorus" : "0.6 0.9 50.0 0.4 0.25 2.0 -t 60.0 0.32 0.4 1.3 -s",
    "stretch" : "1.3",
    "speed" : "1.5"
  }
}

lute = (['tuneA.ogg', 'tuneB.ogg'], task, callback);
// Outputs tuneA_1360372225.ogg and tuneB_1360372235.ogg.
```

In general, if you aren't transcoding and don't provide any output
filenames, they will be provied for you in the format of
infile_epochtime.extension

## Roadmap
* Global options
* Format options
* Multiple inputs (for things like mixing and concatenating files)
* Multiple outputs
* Pseudo effects (:newfile, :restart). Example: (sox infile.wav output.wav trim 0 30 : newfile : restart). Splits infile into n files, each 30 seconds in length. 

## Testing
```bash
npm test
```
