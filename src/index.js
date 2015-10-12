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
      category: +newznab.category,
      categoryName: item.category,
      codec: parsed.codec || null,
      comments: item.comments,
      description: item.description,
      episode: +parsed.episode || null,
      genre: newznab.genre || null,
      grabs: +newznab.grabs || null,
      group: parsed.group || null,
      guid: newznab.guid || null,
      link: item.link || null,
      isHD: newznab.category === 5040 || parsed.quality >= 720,
      name: parsed.name || null,
      nzbUrl: item.enclosure.url,
      quality: parsed.quality || null,
      pubDate: new Date(item.pubDate),
      rage_id: +newznab.rageid || null,
      season: parsed.season || null,
      series_id: newznab.seriesid || null,
      show: parsed.show || null,
      size: +newznab.size || null,
      source: parsed.source || null,
      site: json.rss.channel.title,
      tvairdate: (newznab.tvairdate) ? new Date(newznab.tvairdate) : null,
      tvdb_id: +newznab.tvdbid || null,
      title: item.title,
      year: parsed.year || null
    };

    return episode;
  });


  return items.filter( (item) => {
    return item != null;
  });
};

export default parseFeed;
