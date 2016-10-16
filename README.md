# Hockey App Remover

This script will go through all of your Hockeyapp apps
and ask for each one whether it should delete it.

## Usage

```
npm install -g hockeyapp-remover
hockeyapp-remover --token <HockeyAppToken>
```

## Development

```
npm install
```

Run it directly with `babel-node`:
```
./node_modules/.bin/babel-node index.js --token <HockeyAppToken>
```

Or transpile it first:
```
npm run build
```

And run:
```
node dist.js
```
