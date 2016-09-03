# Hockey App Remover

This script will go through all of your Hockeyapp apps
and ask for each one whether it should delete it.

## Install it

```
npm install
```

## Run it

Run it directly with `babel-node`:
```
./node_modules/.bin/babel-node index.js --token [HockeyAppToken]
```

Or transpile it first:
```
 ./node_modules/.bin/babel index.js > dist.js
 ```

 And run:
 ```
 node dist.js
 ```
