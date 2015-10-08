# newznab-feedparser
Parses episodes from newznab rss feeds into an array of objects

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

### Output
```json
{
    "category": "5040",
    "codec": "x264",
    "episode": 3,
    "group": "DIMENSION",
    "isHD": true,
    "name": null,
    "nzbUrl": "http://www.nzbs.org/getnzb/2839cd3514c364889594c5a510d90c4b.nzb&",
    "quality": 1080,
    "rage_id": "20678",
    "season": 7,
    "series_id": "2900",
    "show": "The Middle",
    "source": "hdtv",
    "title": "The.Middle.S07E03.1080p.HDTV.X264-DIMENSION",
    "tvdb_id": "95021",
    "year": null
}
```
