var express = require('express');
var bodyParser = require('body-parser');
var dataUtil = require("./data-util");
var _ = require('underscore');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var app = express();
var marked = require('marked');

var _DATA = dataUtil.loadData().listings;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

app.get('/', function (req, res) {
  var tags = dataUtil.getAllTags(_DATA);
  res.render('home', {
    data: _DATA,
    tags: tags
  });
})

app.get("/create", function (req, res) {
  res.render('create');
});

app.post('/api/create', function (req, res) {
  var body = req.body;

  // Transform tags and content
  body.tags = body.tags.toLowerCase();
  body.tags = body.tags.split(" ");
  body.description = marked(body.description);
  body.preview = body.description.substring(0, 300);
  body.title = `${body.brand} ${body.item_name} Size ${body.size}`;

  // Save new listing
  _DATA.push(req.body);
  dataUtil.saveData(_DATA);
  res.redirect("/");
});

app.get('/api/getListings', function (req, res) {
  res.json(_DATA);
});

app.get('/alphabetical', function (req, res) {
  function compare(a, b) {
    var titleA = a.title.toUpperCase();
    var titleB = b.title.toUpperCase();

    let comparison = 0;
    if (titleA > titleB) {
      comparison = 1;
    } else if (titleA < titleB) {
      comparison = -1;
    }
    return comparison;
  }
  var sortedAlphabetical = _DATA.sort(compare);
  res.render('home', {
    data: sortedAlphabetical
  });
});

app.get('/ascending', function (req, res) {
  function compare(a, b) {
    var priceA = a.price;
    var priceB = b.price;

    let comparison = 0;
    if (priceA > priceB) {
      comparison = 1;
    } else if (priceA < priceB) {
      comparison = -1;
    }
    return comparison;
  }
  var sortedAscending = _DATA.sort(compare);
  res.render('home', {
    data: sortedAscending
  });
});

app.get('/descending', function (req, res) {
  function compare(a, b) {
    var priceA = a.price;
    var priceB = b.price;

    let comparison = 0;
    if (priceA < priceB) {
      comparison = 1;
    } else if (priceA > priceB) {
      comparison = -1;
    }
    return comparison;
  }
  var sortedDescending = _DATA.sort(compare);
  res.render('home', {
    data: sortedDescending
  });
});

app.get('/random', function (req, res) {
  var randomListing = [_DATA[Math.floor(Math.random() * _DATA.length)]];
  res.render('home', {
    data: randomListing
  });
});

app.get('/under100', function (req, res) {
  var filteredunder100 = _DATA.filter(listing => listing.price < 100);
  res.render('home', {
    data: filteredunder100
  });
});

app.get('/tag/:tag', function(req, res) {
  var tags = dataUtil.getAllTags(_DATA);
  var tag = req.params.tag;
  var posts = [];
  _DATA.forEach(function(post) {
      if (post.tags.includes(tag)) {
          posts.push(post);
      }
  });
  res.render('home', {
      tag: tag,
      data: posts,
      tags: tags
  });
});

app.get('/listing/:title', function (req, res) {
  var _title = req.params.title;
  var listings = _.findWhere(_DATA, { title: _title });
  if (!listings) return res.render('404');
  res.render('post', listings);
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening!');
});
