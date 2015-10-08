import parser from 'xml2json';
import episodeParser from 'episode-parser';

let parseFeed = (xml, lastCheck) => {


  lastCheck = lastCheck || 0;

  let json = JSON.parse(parser.toJson(xml));

  let items = json.rss.channel.item.filter( (item) => {
    return new Date(item.pubDate) > lastCheck;
  });

  items = items.map( (item) => {

    let parsed = episodeParser(item.title);

    if (!parsed) {
      return null;
    }
    let newznab = {};

    item['newznab:attr'].forEach( (attr) => {
      newznab[attr.name] = attr.value;
    });

    let episode = {
      title: item.title,
      nzbUrl: item.enclosure.url,
      rage_id: newznab.rageid || null,
      tvdb_id: newznab.tvdbid || null,
      series_id: newznab.seriesid || null,
      season: parsed.season || null,
      episode: parsed.episode || null,
      show: parsed.show || null,
      name: parsed.name || null,
      category: newznab.category,
      quality: parsed.quality || null,
      source: parsed.source || null,
      codec: parsed.codec || null,
      group: parsed.group || null,
      year: parsed.year || null,
      isHD: newznab.category == 5040 || parsed.quality >= 720
    };

    return episode;
  });

  return items.filter( (item) => {
    return item != null;
  });
};

export default parseFeed;
