---
layout: post
title: NO_DATA_FOUND exception 
lang: ru
---

Oracle генерирует исключение `NO_DATA_FOUND` в нескольких ситуациях:
  * при `SELECT INTO` если нет строк
  * при чтении последней строки файла с использованием UTL_FILE.GET_LINE
  * при обращении к несуществующему элементу массива

[ссылка на quiz](http://www.plsqlchallenge.com/pls/apex/f?p=10000:PG_PQ_DRILLDOWN:4164756902153718::NO:651:P651_COMP_EVENT_ID,P651_QUIZ_ID:2429,3567&cs=1E556E42F7193ED0DBC29F3DB66AADDB2)
