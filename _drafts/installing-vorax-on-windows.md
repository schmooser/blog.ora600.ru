---

layout: post  
title: Installing Vorax on Windows XP  
categories: vim oracle  
description: In this post I describe installation process of Vorax on Microsoft
             Windows XP  

---

To install [Vorax] on Windows you have to get right vim and ruby. 

### ruby

To install ruby on Windows download exe from [rubyinstaller], for example
version 1.9.3 and install somewhere like c:\Ruby193. Then 

### vim
vim have to have patch 501 and be compiled with ruby support. Binaries from
[vim.org] are too old and don't meet requirements. So, you're about to compile
vim by yourself. The process of compilation is on the [Vorax's site][compiling-vim].

After compiling check for Ruby support – open vim and type `:ruby puts
RUBY_VERSION`. If you'll see version, then it's ok. If vim crashes or puts some
errors, then you did something wrong.

[Vorax]: https://github.com/talek/vorax
[compiling-vim]: https://github.com/talek/vorax/wiki/Installation-Guide#how-to-install-vorax-on-windows
