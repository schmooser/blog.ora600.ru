---
layout: post
title: Перенос первого слова в параграфе в LaTeX
category: latex
lang: ru
---

При верстке таблиц в LaTeX может возникнуть еще одна проблема -- если у вас в ячейке одно слово, то LaTeX не будет его переносить, даже если слово длинное и не умещается по ширине в ячейку типа `p`. Все из-за того, что сложность алгоритма расстановки переносов в случае допущений, в числе которых и отсутствие необходимости переносить первое слово, падает с `О(n<sup>2</sup>)` до `O(n)`. Подробности [в английской Википедии][tex-wiki].

Но TeX можно обмануть! Нужно лишь первым символом параграфа сделать неразрывный пробел нулевой длины -- `\hspace{0pt}`. Примеры использования: [раз][hspace-1], [два][hspace-2].

Вставлять каждый раз в нужное место код очень неудобно, особенно если контент приходит из вне, поэтому можно сделать это автоматически. После достаточно долгих поисков я нашел [вот этот совет][hspace-auto] на TeX Stackexchange -- нужно в опциях табличного окружения воспользоваться синтаксисом `>{...}` из пакета `array`, например так:

    ...
    \usepackage{array}
    ...
    \begin{longtable}{|>{\hspace{0pt}}p{0.1\textwidth} | p{0.3\textwidth}|} \hline
    ...

После этого все сразу станет гораздо красивее.

[tex-wiki]: https://en.wikipedia.org/wiki/TeX#Hyphenation_and_justification
[hspace-1]: http://sigstp.blogspot.ru/2010/09/latex-hyphenate-single-long-words-in.html
[hspace-2]: http://tex.stackexchange.com/questions/67762/hyphenation-rule-not-acted-upon
[hspace-auto]: http://tex.stackexchange.com/questions/78127/how-does-latex-make-line-breaking-for-word-that-can-not-fit-in-cell
