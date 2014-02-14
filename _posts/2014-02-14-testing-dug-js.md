---
layout: post
title: Testing Dug.js
lang: en
published: True
set: 72157639673699056
---

I found on [Hacker News][1] [Dug.js][2] -- script for transforming JSONP api endpoints to HTML-code.

Let's try to use it to embed Flickr set to this page.

<script>
    dug({
      endpoint: 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={{site.flickr_key}}&format=json&photoset_id={{page.set}}',
      templateDelimiters: ['[[',']]'],
      callbackParam: 'jsoncallback',
      template: '<div>\
          <ul class="photos">\
            [[#photoset.photo]]\
              <li>\
                <a href="\[\[url\]\]" title="\[\[title\]\]" alt="\[\[title\]\]">\
                  <h3>[[title]]</h3>\
                  <img src="http://farm[[farm]].static.flickr.com/[[server]]/[[id]]_[[secret]]_m.jpg">\
                </a>\
              </li>\
            [[/photoset.photo]]\
          </ul>\
        </div>'
    });
  </script>


[1]: https://news.ycombinator.com/item?id=7230411
[2]: http://rog.ie/blog/dugjs-a-jsonp-to-html-script
