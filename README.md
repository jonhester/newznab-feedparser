# newznab-feedparser
Parses newznab rss feeds into a json object with a `nzbs` property that is an array of objects representing each nzb in the feed. Each parse function returns a promise resolving to the feed object.

## Installation
```
npm install newznab-feedparser --save
```

## Usage

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
