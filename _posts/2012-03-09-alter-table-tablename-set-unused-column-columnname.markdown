---
layout: post
title: ALTER TABLE tablename SET UNUSED COLUMN columnname 
lang: ru
category: oracle
---

Вместо инструкции `ALTER TABLE tablename DROP COLUMN columnname` для экономии времени 
возможно использовать инструкцию `ALTER TABLE tablename SET UNUSED COLUMN columnname`.

При этом, данные из столбца таблицы физически не удаляются, место на диске не освобождается. 
Столбец, который выставили в UNUSED, пропадает из списков столбцов таблицы при использовании 
`DESCRIBE`, пропадает из представлений `[USER|ALL|DBA]_TAB_COLUMNS`, и из списка столбцов при 
выборке `SELECT *`. Однако, лимит в 1000 столбцов на одну таблицу включает этот столбец. 
Нельзя добавить еще один столбец типа `LONG`, если есть неиспользуемый столбец типа `LONG`. 
Но можно добавить в таблицу новый столбец с тем же именем.

Посмотреть количество неиспользуемых столбцов можно с помощью представлений `[USER|ALL|DBA]_UNUSED_COL_TABS`.

Операция `ALTER TABLE tablename SET UNUSED COLUMN columnname` необратима, т.е. нельзя сделать 
`ALTER TABLE tablename SET USED COLUMN columnname`.

Удалить неиспользуемые столбцы из таблицы можно с помощью `ALTER TABLE tablename DROP UNUSED COLUMNS`.

[Раздел официальной документации](http://download.oracle.com/docs/cd/B13789_01/server.101/b10759/statements_3001.htm)
