---
layout: post
lang: ru
title: Запуск HackerNews на своем сайте
published: true
---

Оказывается, движок форума [HackerNews] это open-source проект и такой же движок можно развернуть на своем сервере. Я обнаружил это наткнувшись на статью [Ken Shirriff's blog: Inside the news.yc ranking formula], в которой детально описывается формула, как рассчитывается вес статьи и ее позиция в выдаче на форуме.

Итак, HackerNews бежит на движке, написанном на языке [Arc] ([wiki]). Это диалект Лиспа, написанный Полом Грэмом (основатель YCombinator, венчурного фонда для первоначального финансирования стартапов) для решения различных прикладных задач. Такое ощущение, что сейчас на этом языке решена ровно одна задача -- форум HackerNews компании YCombinator.

Ссылок на скачивание arc в явном виде нигде нет, на [arclanguage.org/install](arclanguage.org/install), как оказалось, лежит очень старая и неактуальная информация по установке. Более актуальная информация лежит на сервере [TryArc] (там же можно попробовать пописать на Arc прямо в браузере).

Итак, чтобы установить движок HackerNews на свой сервер, надо:

1. Установить Arc. Подробное описание установки есть [тут](https://sites.google.com/site/arclanguagewiki/getting-started/install-arc). Перед установкой потребуется установить [Racket] (из бинарников Ракета понадобится только MzScheme), затем сам Arc. Я устанавливал pure Arc, скачав его тут: [http://ycombinator.com/arc/arc3.1.tar](http://ycombinator.com/arc/arc3.1.tar)
2. Распаковать Arc, инструкция по установке и запуска движка лежит внутри дистрибутива в файле `how-to-run-news`. Выполнив написанное в нем, получим работающий движок на своем сайте.

Если потребуется дополнительная информация, то лучше всего ее искать на форуме [arclanguage][arcforum] гуглом поиском по сайту (добавлять к поисковому запросу `site:arclanguage.com`). Именно таким образом я нашел как поднять форум на произвольном порту (прописать нужный порт на 82-й строке в файле `news.arc`) и [как запустить форум в бэкграунде](http://www.arclanguage.com/item?id=11021), чтобы он продолжал работать после закрытия терминальной сессии (с помощью screen, про screen я напишу отдельный пост).

На этом движке я запустил форум для новостей СУБД: [ora600.ru], добро пожаловать. В следующем посте я расскажу, как я настроил nginx для проксирование двух форумов на arc, одного сервиса на flask и одного сайта на apache на один 80-й порт одного сервера, это оказалось крайне простым делом.


[HackerNews]: http://news.ycombinator.com
[Ken Shirriff's blog: Inside the news.yc ranking formula]: http://www.righto.com/2009/06/how-does-newsyc-ranking-work.html
[Arc]: http://arclanguage.org/
[wiki]: http://en.wikipedia.org/wiki/Arc_(programming_language)‎
[TryArc]: http://tryarc.org
[arcforum]: http://arclanguage.com/forum
[ora600.ru]: http://ora600.ru
[Racket]: http://racket-lang.org/
