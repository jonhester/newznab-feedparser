import test from 'tape';
import parse from '../src';
import fs from 'fs';

test('test parsing sample feed from string', async(t) => {
  t.plan(2);
  const xml = fs.readFileSync('./tests/test.xml');

  const result = await parse.fromString(xml);
  t.equal(result.nzbs.length, 25);
  t.equal(result.nzbs[0].title, 'Grand.Designs.S16E05.720p.HDTV.x264-C4TV');
});
