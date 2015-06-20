+++
date = "2015-06-20T01:12:30+03:00"
title = "Gister"
tags = ["fzf", "git", "github", "gist", "zsh", "gister"]
+++

Today I went through [list of projects][list] written in Go and found a command
line utility working with [Github Gists](http://gist.github.com) -
[dutchcoders/gister][gister].

It allows you to create/view/edit your gists in very efficient manner.

Here are a couple of notes:

### Token

It's useful to define environment variable GITHUB\_TOKEN with token to access Github
API. I defined it in my .zhsrc file:

    GITHUB_TOKEN=actual_token_here
    export GITHUB_TOKEN

Do not forget to export variable, otherwise it won't be visible for gister.

### Combining with fzf

To view/edit existing gist it's required to provide gist's id. It's not useful
to do `gister list` then manually copy-paste gist's id. Especially when we have
[fzf] in our toolchain.

So I added the following function to `.zshrc`:

    fzf-gister() {
        gister list | fzf | sed -E "s/^[^ ]+\/([^ ]*).*$/\1/"
    }

and now use gister in this way:

    $ gister cat --gist=$(fzf-gister)
    $ gister edit --gist=$(fzf-gister)

Then I pick gist I'm interested with in fzf interface and voila.

### Multiple files support

gister supports multiple-filed gists. When editing such gist it downloads all
the files and loads them into editor (for vim into separate buffers). You can
edit them and when you'll exit from editor, gister will update files in gist
accordingly.

You can even create new files in the same temporary directory gister created for
you. If you have `autochdir on` in vim then you'll be at the file's directory
from the beginning and by `:new filename` you'd create new file in the gist.
Easy!


### My gists

You can find my gists here - https://gist.github.com/schmooser.

[list]: https://github.com/golang/go/wiki/Projects
[gister]: https://github.com/dutchcoders/gister
