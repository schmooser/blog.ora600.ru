---

layout: post  
title: VIM cheatsheet  
category: vim  

---

I found useful to put tips on vim into this page as I do with [git][git-cheatsheet]. All posts about vim I'll put into category "vim", so it's easy to find them.

* Very useful [list of VIM's tricks and tips][tips].

* To remove DOS `^M`'s use 

        :%s/{Ctrl+V}{Ctrl+M}//g

  or, as mentioned in tips above, with 

        :%s/\r//g

* To copy into buffer `*` output of command use 

        :redir @* | set guifont | redir END

  Found [here][copy].

* To open window with command history (and copy from it, if you want), type `q:`. To open window with search history, type `q/`.

[git-cheatsheet]: {% post_url 2013-02-28-git-cheatsheet %}
[tips]: http://rayninfo.co.uk/vimtips.html
[copy]: http://superuser.com/questions/167352/how-do-i-copy-command-output-in-vim
