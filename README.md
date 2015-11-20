# Timer

Electron (Atom-shell) timer application. Currently a work in progress.

Allows the user to specify a time to be counted down.
Includes the feature to set a queue of time intervals to be conunted down.

## Installation - Electron:
```
  git clone https://github.com/lpavlovi/Timer.git
  cd Timer
  npm install
  -- Run the Electron App
  electron ./
```
## Installation - Web App:
```
  git clone https://github.com/lpavlovi/Timer.git
  cd Timer
  npm install
  npm start
  -- Open browser to http://localhost:3000/
```

## Usage:
```
Press 'i' to see the command input (it's really just a textbox)
Type something in
Press Enter if your're satisfied
  Press Shift Enter if you want the timer to start right away
Esc if you want to get rid of the input box

```
###  Examples of acceptable input:
```
  1030  -->   Timer set to 10 minutes and 30 seconds
  05:00  -->  Timer set to 5 minutes
  0010  -->   Timer set to 10 seconds
  POM -->     Timer set to 25 minutes and puts 5 minutes in queue
  SPR -->     Timer set to 7:30 and puts 7:30 in queue threee times
```
