+++
Title = "VIM setup for Clojure development"
Date = "2015-07-20"
Tags = ["clojure", "vim"]
+++

Most of Clojure developers use Emacs or LightTable to run and edit Clojure
source code. I also tried to use Emacs but it requires so much time to learn to
become proficient so I stayed with VIM.

VIM setup for Clojure is pretty simple. The main goal is to select right plugins
that fit your setup well. I try to use "Less plugins - better" principle, so I
ended up with the following setup:

* [guns/vim-sexp] to run and edit labmda-expressions
* [jpalardy/vim-slime] to run clojure code in REPL


## guns/vim-sexp

## jpalardy/vim-slime

## Other plugins

Here are other plugins many people use for Clojure editing in VIM:

* [fireplace] by Tim Pope


[fireplace]: https://github.com/tpope/vim-fireplace
[guns/vim-sexp]: https://github.com/guns/vim-sexp
[jpalardy/vim-slime]: https://github.com/jpalardy/vim-slime
