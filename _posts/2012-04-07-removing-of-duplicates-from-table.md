---
layout: post
title: Удаление дубликатов из таблицы 
lang: ru
category: oracle
---

Быстро удалить дублирующиеся строки из таблицы в Oracle можно так:

    DELETE FROM tab
    WHERE rowid NOT IN (SELECT MIN(ROWID)
                          FROM tab
                         GROUP BY id);

После делита все id в таблице tab будут уникальными.

[Сниппет на pastebin](http://pastebin.com/ks8zibzv).
