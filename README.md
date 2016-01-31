# newznab-feedparser
Parses newznab rss feeds into a json object with a `nzbs` property that is an array of objects representing each nzb in the feed.

## Installation
```
npm install newznab-feedparser --save
```

## Usage

```js
var parse = require('newznab-parse');

// assuming xml is an xml string from request, superagent, etc. 
var episodes = parse(xml);

// based on sample test.xml in repo
console.log(episodes[1]);
```

```js
// parse feed from url
parse.fromFeed('http://samplefeedurl.com/feed').then(function (feed) {
  console.log(feed);
});
```

```js
// parse feed from file
parse.fromFile().then(function (feed) {
  console.log(feed);
});
```

```js
// parse feed from string

// assuming xml is a string of xml
parse.fromString(xml).then(function (feed) {
  console.log(feed);
});
```
