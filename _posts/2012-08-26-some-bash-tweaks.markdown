---
layout: post
title: "Some bash tweaks"
description: "A little tweaks I found useful"
category: linux
tags: [bash]
---

1.  You can get an external IP you're using in terminal with

        curl -s http://checkip.dyndns.org | sed 's/[a-zA-Z/<> :]//g'

2.  It's convenient to move around panes in iTerm2 with &#8997;&#8984;+arrow

3.  You can copy terminal's command output to system clipboard by piping it to `pbcopy` program:

        $echo 'i see the line' | pbcopy
