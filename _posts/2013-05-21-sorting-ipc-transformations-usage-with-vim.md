---

layout: post  
categories: vim informatica  
title: Sorting IPC transformations usage from log with VIM  

---

IPC provides information about performance of transformations in session. It's located in session's log close to end of log. Format of the record is simple -- "name of transformation: percentage of usage". Unfortunately, transformations aren't sorted in any fashion. To sort this in vim, I use such script:

    :sort! n r /[0-9]\+\.[0-9]\+/

Here `!` means reverse sorting, `n` stands for sorting using decimal number, `r` tells vim to use pattern to search, pattern `/{regex}/` searches through percentage of usage.

