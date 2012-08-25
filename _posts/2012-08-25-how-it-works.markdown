---
layout: post
title: "How it works"
description: "Description of the setup of Jekyll-based blog and some toughts about working in terminal"
category: 
tags: [blog, bash]
---
I wrote some notes in russian to my main blog – [iseetheline.ru](iseetheline.ru). It's powered by blog engine named [Aegea](http://blogengine.ru). It has beautiful minimalistic design which I like, it installs simply, it has many features like drag-and-drop image uploading, saving to drafts, tagging, built-in comments, search, rss, support of plugins and so on. But it lacks in three things. 

  1. Posts should be written using wiki-formatting. I HATE wiki-formatting. I love markdown. I can't even remember the rules to write links, images and so on.
  2. It's written on php and is not open-source. That's why I can't modify it to my needs.
  3. It doesn't have syntax highlighting by default.

So, it's great to write about the stuff that happened in daily life, but it's not suitable for tech notes with many syntax-highlited code.

Finally I decided to switch to [Jekyll](http://jekyllrb.com). Jekyll is not the engine – it's a static site generator. You write posts, Jekyll generate a static content from them, you put it on hosting. That's all. That's the way I like the things should happen. 

I've started to look at Jekyll about a month ago. The things that stop me from starting new Jekyll-based blog was the lack of easy-to-use themes (I don't understand how [Jekyll bootstrap](http://jekyllbootstrap.com) works so I don't tried it). Today I've decided to try again. For that I've used some thins which are new for me: git, github, jekyll, sass.

The process is a kind of straightforward:

  1. Search suitable open-source theme on the [page with existing sites](http://wiki.github.com/mojombo/jekyll/sites) using Jekyll
  2. Fork it on [Github](http://github.com)
  3. Rename repo to <yourname>.github.com
  4. Clone a repo to a local machine using #git clone https://github.com/<yourname>/<yourname>.github.com.com#
  5. Delete all posts from #_posts# directory, edit theme to your needs, edit CNAME file to point the correct domain, edit Jekyll's #_config.yml#
  6. Write new post with #rake post title="<new title>"#
  7. Commit it with #git commit -a#
  8. Push it to the github with #git push origin master#
