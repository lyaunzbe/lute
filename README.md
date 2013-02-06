## Lute

Lute is a task-based library for processing and manipulating data using SoX.

SoX has tons of features, but for the sake of simplicity, we will focus on tasks involving
transcoding and applying multiple effect chains/filters.

Inspired by diy/wizardry.

Current capabilities:
* Transcoding : infile1 -> outfile2
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
brew install
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

### Example task file
```json
{
    "effects": {
        "flanger": "0.6 0.87 3.0 0.9 0.5 -s",
    },
    "outputDirectory": "/test/audio/"
}
```

### Testing
```bash
npm test
```
