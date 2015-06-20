---
layout: post
title: LaTeX on CentOS
categories: latex linux
lang: en
---

I've installed TeX on CentOS 6.3.

Just do the following:

    # yum install texlive, texlive-latex

and you got working TeX.

To compile your tex file into pdf use:

    $ pdflatex yourfile.tex

and you'll get `youfile.pdf` as a result.

--

Unfortunately, CentOS 6 comes with TeX Live 2007 system. It's very outdated
version and it misses some packages, so I installed full version of [TeX Live
2013](http://www.tug.org/texlive/).

One thing to mention is the importance of choosing correct [CTAN
Mirror](http://ctan.org/mirrors). If you set correct mirror you'll install a
way more faster (up to 10x) then using default mirror.

Full installation on virtual machine hosted at Digital Ocean in Amsterdam takes
about 14 minutes when using CTAN Mirror located in Netherlands. Using default
mirror estimates at about 2 hours.


