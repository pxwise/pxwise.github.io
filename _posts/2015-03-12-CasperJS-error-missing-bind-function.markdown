---
layout: post
title:  "CasperJS Error: Missing bind() Function"
date:   2015-03-12 17:13:44
tags: [casperjs, phantomjs, javascript]
---
![PacMan's new Ghost Bindy.]({{ "/assets/images/posts/pacman.png" | prepend: site.baseurl }}){: style="float:right; width: 224px; height: 288px; margin-left: 20px;"}

[CasperJS](http://casperjs.org/) and [PhantomJS](http://phantomjs.org/) are fantastic tools for creating integration tests to
sanity check the complete functionality of your site. They can simulate a user, click
and keydown through your UI and take screenshots of your page. Written in
javascript, tests are lean and do not require the heft of the alternative
browser driver Selenium.

Recently I ran into an issue with CasperJS while taking screenshots. I received
`TypeError: 'undefined' is not a function (evaluating 'a.createDescriptor.bind(null,t)')`.
I was using the most recent stable versions of CasperJS `1.1.0-beta3` and PhantomJS
`1.9.7`.

It turns out that PhantomJS below version 2.0.0 does not include the .bind()
function. It is recommended to download the latest 2.0 version of PhantomJS from
the master branch and use CasperJS with that build. After working through unrelated
issues with PhantomJS 1.9.8 and downgrading to 1.9.7 I was not interested in
trying out an even more unstable version.

For me, the answer was to patch in the bind function to the evaluated remote page as
shown below.

{% highlight javascript %}
/**
 * CasperJS .bind()
 *
 * Adds .bind() capability missing from PhantomJS < 2.0.0 for CasperJS.
 * Needed for some types of evaluations on the remote page as well as
 * screenshots.
 */
casper.on('page.initialized', function() {
  casper.evaluate(function() {
    var isFunction = function(o) {
      return typeof o == 'function';
    };

    var bind;
    var slice = [].slice;
    var proto = Function.prototype;
    var featureMap;

    featureMap = {
      'function-bind': 'bind'
    };

    function has(feature) {
      var prop = featureMap[feature];
      return isFunction(proto[prop]);
    }

    if (!has('function-bind')) {
      bind = function bind(obj) {
        var args = slice.call(arguments, 1);
        var self = this;
        var nop = function() {};
        var bound = function() {
          return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
        };
        nop.prototype = this.prototype || {};
        bound.prototype = new nop();
        return bound;
      };
      proto.bind = bind;
    }
  });
});
{% endhighlight %}

Back to fast flexible tests with screenshots.

