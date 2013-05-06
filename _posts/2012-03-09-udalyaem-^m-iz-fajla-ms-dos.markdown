---
layout: post
title: Удаляем ^M из файла MS-DOS 
lang: ru
---

To remove the ^M characters from a MS-DOS file, enter the command:

`:%s/{Ctrl+V}{Ctrl+M}//{Enter}`

(on Win32 use `Ctrl+Q` instead of `Ctrl+V`)
