---
layout: post
title:  "Fonts Rendering Too Bold in Mac OS X"
date:   2014-05-14 17:35:01
categories: css firefox fonts
---

There have been a couple of occasions recently where I've
given my css a cross-browser visual inspection and noticed that my fonts
appeared bolder in Firefox. After triple checking every other browser and OS
I narrowed the issue down to Firefox on the Mac, all versions.

This was one of those pesky issues that seemed like it must have a simple fix
but every attempt to clean up the fonts came up empty. I tried `font-smoothing: antialiased;`,
adjusting the font-weight by increments of 100, moving my svg font declaration
up in precedence in my @font-face declaration and a
last desperate atempt reducing the font-weight to 100 and applying a text-shadow
to emulate antialiasing (bad idea, ha). None of these "tips" resolved the issue.

![Zocial font rendering too bold on Mac OS X]({{ "/assets/images/posts/firefox-fonts.gif" | prepend: site.baseurl }}){: style="float:right; width: 30%; height: 30%; margin-left: 20px;"}

It turns out that Mozilla has known about this Mac-specific issue for some time.
The issue boils down to a difference in the rendering engine Firefox uses on
a Mac. [Mozilla weighed the decision heavily](https://bugzilla.mozilla.org/show_bug.cgi?id=857142)
whether or not to add another vendor prefix.
The demand from designers and developers was enough so they introduced `-moz-osx-font-smoothing: grayscale;`
which completely resolves the issue.

I returned to the project I was working on and [patched the zocial icon font css](https://github.com/samcollins/css-social-buttons/issues/76) to use the new style.

So remember any place you are using `font-smoothing: antialiased;` be sure to add
in your vendor prefixed options, including the Firefox Mac rule:

~~~ css
.myfont {
  -moz-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
}
~~~
