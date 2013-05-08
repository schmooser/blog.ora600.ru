---
layout: post
title: Скорость direct path load 
lang: ru
---

По скорости загрузки 8 млн строк из текстового файла в Оракл. Из MS SQL через Integration Services — ~2000 строк/мин, не дождался. sqlldr — 45 минут (~180000 строк/мин), sqlldr direct path — 4:55 (~1.6 млн. строк/мин). 

Чтобы использовать direct path, надо в параметрах запуска sqlldr указать опцию `direct=true`.
