import xml2json from 'xml2json';
import bluebird from 'bluebird';
import _ from 'lodash';
import request from 'request-promise';

const fs = bluebird.promisifyAll(require('fs'));

const customUnescape = (str) => {
  const string = str.replace(/&#(\d+);/g, (match, dec) =>
    unescape(String.fromCharCode(dec))
  );

  return _.unescape(string);
};

export default class parseNewznab {
  static async fromFeed(url) {
    const string = await request(url);
    return await this.fromString(string);
  }

  static async fromString(string) {
    const json = JSON.parse(xml2json.toJson(string));

    const nzbs = json.rss.channel.item.map((nzb) => {
      if ('pubDate' in nzb) nzb.pubDate = new Date(nzb.pubDate);

      const newznab = {
        'newznab:categories': [],
      };

      nzb['newznab:attr'].forEach((attr) => {
        if (!isNaN(+attr.value)) attr.value = +attr.value;

        if (attr.name === 'category') {
          newznab['newznab:categories'].push(attr.value);
        } else {
          newznab[`newznab:${attr.name}`] = attr.value;
        }
      });

      for (const k in nzb) {
        if (typeof nzb[k] === 'string') {
          nzb[k] = customUnescape(nzb[k]);
        }
      }

      return {
        ...nzb,
        ...newznab,
      };
    });

    // get newest pubDate
    const lastUpdated = json.rss.channel.item.reduce((prev, current, i) => {
      const d = json.rss.channel.item[i].pubDate;
      const max = (new Date(prev) > new Date(d)) ? new Date(prev) : new Date(d);
      return max;
    });

    const feed = {
      title: customUnescape(json.rss.channel.title),
      description: customUnescape(json.rss.channel.description),
      link: json.rss.channel.link,
      language: json.rss.channel.language,
      webMaster: customUnescape(json.rss.channel.webMaster),
      lastUpdated,
      nzbs,
    };

    return feed;
  }

  static async fromFile(path) {
    const string = await fs.readFileAsync(path);
    return await this.fromString(string);
  }
}
