var test = require('tape');
var parse = require('../');
var fs = require('fs');

test('test bad calls', function (t) {
  t.plan(3);

  t.throws(function() {
    parse();
  });

  t.throws(function() {
    parse('');
  });

  t.throws(function() {
    parse('', new Date());
  })

});

test('test parsing sample feed', function (t) {
  t.plan(2);
  var xml = fs.readFileSync('./tests/test.xml');

  var result = parse(xml);

  t.equal(result.length, 24);
  t.equal(result[0].show, "Grand Designs");
});

test('test parsing sample dognzb.cr tvsearch response', function (t) {
  t.plan(2);

  var xml = fs.readFileSync('./tests/dog.xml');

  var result = parse(xml);
  t.comment(result[0]);
  t.equal(result.length, 8);
  t.equal(result[0].show, "Futurama");
});
