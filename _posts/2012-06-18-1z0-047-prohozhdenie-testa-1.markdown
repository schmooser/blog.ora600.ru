---
layout: post
title: 1z0-047, прохождение теста #1 
lang: ru
category: oracle
---

Год спустя решил снова заняться получением сертификата Oracle. Сначала сдам экзамен 1z0-047 на Oracle SQL Expert.

Первое прохождение неутешительно — за 90 минут я должен был ответить на 100 вопросов. В итоге, времени мне не хватило, и последние 20 вопросов я пробежал мимо. В итоге, 58/100, тест провален. 

Составил список вопросов, которые надо подтянуть. Ну, и конечно, надо более внимательно читать вопросы.

* non-correlated subquery, correlated subquery, inline view
* NATURAL JOIN
* [инструкция WITH CHECK OPTION у VIEW](http://iseetheline.ru/2012/06/30/2/)
* sequences — CURRVAL or CURVAL? Что будет для последовательности, заданной с START WITH и CYCLE, после прохождения цикла. Она начнется с 1 или со START WITH?
* GROUP BY CUBE, GROUP BY ROLLUP
* Flashback recovery
* Multitable INSERT
* External tables
* creating index on column, that are in composite primary key
* JOIN using USING clause
* insert into (select from where) values ()
* Flashback version query - what and how data actualy retrieved after delete via flashback
* модификация колонки в NOT NULL
* EXTERNAL TABLES
* DEFERRABLE constraints
* [NEXT_DAY](http://iseetheline.ru/2012/06/30/2/)
* GRANT
* create table t (a, b default sysdate, c) as select a, b, c from t1
* MERGE
* наследование GRANTов
* [ALTER TABLE SET UNUSED column;](http://iseetheline.ru/2012/03/09/2/)
* ALL INSERT, FIRST INSERT
* ALTER TABLE DISABLE CONSTRAINT CASCADE;
* DICTIONARY view
