---
layout: post
title: VIM cheatsheet
categories: vim cheatsheet
lang: en
---

I found useful to put tips on vim into this page as I [do][git] with git. All
posts about vim I'll put into category "vim", so it's easy to find them. 

* My [saved links][pinboard] on vim are on Pinboard.

* My `.vimrc` and list of used plugins is on the [GitHub][rbddotfiles]

* Very useful [list of VIM's tricks and tips][tips].

* To remove DOS `^M`'s use 

      :%s/{Ctrl+V}{Ctrl+M}//g

  On Windows use Ctrl+Q instead of Ctrl+V.
  Or, as mentioned in tips above, use

      :%s/\r//g

* To copy into buffer `*` output of command use 

      :redir @* | set guifont | redir END

  Founded [here][copy].

* To copy to system clipboard copy to `+` buffer with `"+y`. To paste from
  system clipboard paste from `+` buffer with `"+p`.

* To open window with command history (and copy from it, if you want), type
  `q:`. To open window with search history, type `q/`. Read more on [Vim
  wikia][cmd].

* To format long lines as limited, say for 80 chars, use `:set tw=80` and then
  do `gq` on the line.

  Article on [Vim wikia][automatic-word-wrapping].

* To convert file line-endings from dos format (\r\n) to unix format (\n) or vice versa use

      :set fileformat=unix|dos|mac

  More in `:help fileformat`.


[tips]: http://rayninfo.co.uk/vimtips.html
[copy]: http://superuser.com/questions/167352/how-do-i-copy-command-output-in-vim
[cmd]: http://vim.wikia.com/wiki/Using_command-line_history
[pinboard]: https://pinboard.in/u:schmooser/t:vim/
[rbddotfiles]: https://github.com/schmooser/rbddotfiles
[automatic-word-wrapping]: http://vim.wikia.com/wiki/Automatic_word_wrapping

[git]: http://iseetheline.ru/git-cheatsheet/

