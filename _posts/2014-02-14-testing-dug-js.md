---
layout: post
title: Testing Dug.js
lang: en
published: true
---

I found on [Hacker News][1] the [Dug.js][2] -- script for transforming JSONP api endpoints to HTML-code.

Let's try to use it to embed Flickr set to this page.

Dug.js uses `{{` and `}}` as template delimiters, same as Jekyll's Liquid template engine. So, in order to use them simultaniosly, Dug.js should be set to use some other delimiters. I tried a few different and submit an [issue on Github][3]. Finally I found a `<<` and `>>` working as it supposed to. I set them inside dug.js itself and create template in Jekyll:

{% raw %}

    <script>
    dug({
      endpoint: 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={{site.flickr_key}}&format=json&photoset_id={{include.set}}',
      callbackParam: 'jsoncallback',
      template: '<span class="photos">\
                   <<#photoset.photo>>\
                     <img src="http://farm<<farm>>.static.flickr.com/<<server>>/<<id>>_<<secret>>.jpg" alt="<<title>>" />\
                   <</photoset.photo>>\
                 </span>'
    });
    </script>

{% endraw %}

Now, when I want to include Flickr photoset to my post all I have to do is to include this code:

{% raw %}

    {% include photoset.html set=<FLICKR_SET_ID> %}
    
{% endraw %}

Example of the result is here:

{% include photoset.html set=72157639673699056 %}

[1]: https://news.ycombinator.com/item?id=7230411
[2]: http://rog.ie/blog/dugjs-a-jsonp-to-html-script
