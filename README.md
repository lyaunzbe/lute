## Lute 

![lute](https://raw.github.com/lyaunzbe/lute/master/lute.jpeg)

Lute is a task-based library for processing and manipulating data using SoX.

Inspired by diy/wizardry.

Current capabilities:
* Batch transcoding
* Effect(s) and Filter(s)

TODO:
* Global options
* Format options
* Multiple inputs (for things like mixing and concatenating files)
* Multiple outputs
* Pseudo effects (:newfile, :restart). Example: (sox infile.wav output.wav trim 0 30 : newfile : restart). Splits infile into n files, each 30 seconds in length. 

### Installation

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

// Pass an array of audio files, aswell as a json object defining the tasks to execute on these files
lute(['/song1.wav', 'song2.mp3'], task, callback);
```

### Adding flanger effect & transcoding to .wav
```json
{
  "outfile":{
    "filename": ['song1.wav', 'song2.wav'],
    "format-opts":{}
  }
  "effects": {
    "flanger": "0.6 0.87 3.0 0.9 0.5 -s",
  }
}
```


If no outfile filename is given, dont worry, one will be provided.
When in doubt, consult the official documentation.

### Testing
```bash
npm test
```
