+++
title = "vim-rooter plugin and how I get rid of NERDTree"
date = "29 may 2015"
tags = ["vim"]
+++

Recently I decided to reduce number of plugins I use in VIM. First of all, [I
switched off all motion plugins], then I started replacing [CtrlP] and
[NERDTree] with a single [FZF] plugin.


Initially I set up rooter with the following configuration:

    " Rooter {{{
    Plug 'airblade/vim-rooter'
    let g:rooter_disable_map = 1
    let g:rooter_use_lcd = 1
    let g:rooter_silent_chdir = 1
    let g:rooter_change_directory_for_non_project_files = 1
    " }}}

Using it rooter will silently change local directory for each opened file. If
file is within version control project (I use git) then it changes directory to
project's root. It's useful then invoke `:FZF` in current directory to quickly
jump to any file within the project.

But when I started use this it turned to be not very efficient. Suppose you open
for editing a blog post within site project. After this you decided to write new
post. You can't just write `:e new_post.md`, instead you should write full path.
So I decided to tweak my configuration a little bit.

So I added the following keymaps to fast directory switching:

    nnoremap <Leader>d :Rooter<CR>
    nnoremap <Leader>f :lcd %:p:h<CR>:pwd<CR>

You can take a look on my `.vimrc` file [here][dotfiles].

[CtrlP]: http://github.com/kien/ctrlp.vim
[NERDTree]: http://github.com/scrooloose/nerdtree
[FZF]: http://github.com/junegunn/fzf
[dotfiles]: http://github.com/schmooser/dotfiles
