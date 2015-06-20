---
layout: post
title: Pin and unpin objects in Microsoft VSS
lang: en
category: lifehack
---

At work we have to use Microsoft's VCS -- VSS (Visual Source Safe).
To make patch we have to _pin_ all objects patch consists of. Manually,
it can be done this way: go to history of file (one click), choose OK (second click)
in History Options and then click Pin (third click). Then close window with Close
(fourth click).

Fortunately, the same thing can be done via command-line interface.

Here are two batch-files, one for pin all files in project, another to
unpin all files. You should pass full path to project to work with.

`pin_all.bat`

    set ssdir=\\PATH\TO\REPOSITORY
    if %1=="" GOTO ERR
    chcp 1251
    "c:\Program Files\Microsoft Visual SourceSafe\ss" label %1 -LTMP_LABEL -C- 
    "c:\Program Files\Microsoft Visual SourceSafe\ss" pin %1/*.* -VLTMP_LABEL -G-
    "c:\Program Files\Microsoft Visual SourceSafe\ss" label %1 -L -VLTMP_LABEL -I-Y
    :ERR
    pause

`unpin_all.bat`

    set ssdir=\\PATH\TO\REPOSITORY
    if %1=="" GOTO ERR
    chcp 1251
    "c:\Program Files\Microsoft Visual SourceSafe\ss" unpin %1/*.* -G-
    :ERR
    pause

Of course, you should place correct path to `ss` executable.

Usage:

    C:> pin_all.bat "$/Patches/v1.123"
    C:> unpin_all.bat "$/Patches/v1.123"
    
By default VSS doesn't operate on projects recursively. If your patch consists of multiple
folders consider turning on operation on projects recursively in VSS's options. Then `pin_all`
and `unpin_all` will operate on folder you provide and all of it's ancestors.
