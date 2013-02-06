## Lute

Lute is a task-based library for processing and manipulating data using SoX.

SoX has tons of features, but for the sake of simplicity, we will focus on tasks involving
transcoding and applying multiple effect chains/filters.

Inspired by diy/wizardry.

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
  "global-opts":{

  },
  "infile":{
    "format-opts":{

    }
  },

  "outfile":{
    "filename": '..'
    "format-opts":{

    }
  }
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
