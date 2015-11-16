(function() {

  var fs = require('fs');
  var pjson = require('./package.json');
  var T = new (require('twit'))({
    consumer_key: pjson.TwitterAPI.consumer_key,
    consumer_secret: pjson.TwitterAPI.consumer_secret,
    access_token: pjson.TwitterAPI.access_token,
    access_token_secret: pjson.TwitterAPI.access_token_secret
  });

  function Watcher(word) {

    console.log('Watcher instanciated with word: ' + word);

    var stream = T.stream('statuses/filter', {
      track: word
    });

    this.watch = function() {
      console.log('Watching word ' + word + ' ...');
      stream.on('tweet', function(tweet) {
        logTweet(tweet);
      });
    };

  }

  function logTweet(tweet) {
    var t = {
      UserID: tweet.user.id,
      UserScreenName: tweet.user.screen_name,
      TweetID: tweet.id,
      Date: tweet.created_at,
      Text: tweet.text,
    };
    if (tweet.retweeted_status) {
      t.Retweeted = {};
      t.Retweeted.Date = tweet.retweeted_status.created_at;
      t.Retweeted.UserID = tweet.retweeted_status.user.id;
      t.Retweeted.UserScreenName = tweet.retweeted_status.user.screen_name;
      t.Retweeted.Text = tweet.retweeted_status.text;
    }
    var tstr = JSON.stringify(t);
    fs.stat(pjson.logfile, function(err, stats) {
      if (err) {
        throw err;
      }
      if (stats.size) {
        tstr = ', ' + tstr;
      }
      fs.appendFile(pjson.logfile, tstr, function(error) {
        if (err) {
          throw err;
        }
        console.log(new Date() + ' : Tweet from user ' + tweet.user.screen_name + ' logged!');
      });
    });
  }

  for(var idx in pjson.keywords) {
    new Watcher(pjson.keywords[idx]).watch();
  }

})();
