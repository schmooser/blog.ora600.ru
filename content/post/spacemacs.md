+++
Title="Switching from VIM to Spacemacs"
Date="2015-09-05"
+++

[Spacemacs] is a new modal editor based on Emacs, designed specifically for former VIM users.


### Shortcuts and their mnemonics

* `SPC b b` - list of opened Buffers

* `SPC p f` - Project Files - all project files
* `SPC p r` - Project Recent - recenty edited project files
* `SPC p p` - Project Previously - previously used projects

* `SPC f f` - File Find - search in current directory
* `SPC f r` - File Recent - recently edited files (across all projects)
* `SPC f e h` - Files Emacs Helm - search through available Spacemacs layers

* `SPC /` - opens search window with all files under cursor


### Found bugs

* `SPC : term i echo "asdf"` - f jumps to the beginning of line


### Issues to be resolved to use as a main editor

* Ctrl-p to access list of previously edited files  
  Solution: Use `SPC b b` or `SPC f r`

* Ctrl-b to access the buffer list  
  Solution: Use `SPC b b`

* Visual selection, then `s`  
  Solution: Use `c` instead, because `s` in Spacemacs used for surround - more useful. [[1]]

* Ctrl-a / Ctrl-z to increase/decrease number under cursor  
  Solution: Use `SPC n -` to decrease, `SPC n +` to increase

* Leader-w to write file  
  Solution: Use `:w`

* Open buffers vertically/horizontally  
  Solution: Use `C-C o` when in Helm

* Ctrl-f to fuzzy search through files in project  
  Solution: Use `SPC p f`

* NERDTree
  Solution: Use `SPC f t` to toggle tree. Further investigation is required to get similar funtionality as NERDTree.

* relative numbering
  Solution: Use `SPC l` to quickly jump to line

* Ctrl-c Ctrl-c (vim-slime)
* themes
* go
* clojure
* sqlplus
* Ag


[Spacemacs]: https://github.com/syl20bnr/spacemacs
[1]: https://github.com/syl20bnr/spacemacs/blob/master/doc/DOCUMENTATION.org#the-vim-surround-case
