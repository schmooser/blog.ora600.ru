+++
date = "2015-05-30T10:21:07+03:00"
title = "Cheat"
+++

[cheat] is a very very useful tool not to just quickly getting cheatsheets of
existing utilities and protocols but also for creating new ones. And not only
cheatsheets but to any meaningful notes and list of commands, for example.

I created a file named `fav` using `cheat -e fav` and put there my favourite
commands. Of course I can search for them in history but this file is for
lengthy specially-written commands which I don't use very often to put them into
zsh functions.

For example, I saved commands for attaching to tmux sessions on remote servers:

    ssh server-name.com -t tmux a -t tmux-session

I hardly remember names of tmux sessions I use on those servers sot it's very
convenient to have them saved into fav file.
