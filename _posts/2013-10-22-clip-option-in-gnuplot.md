---
layout: post
lang: ru
title: Опция clip в gnuplot
category: gnuplot
---

У gnuplot есть опция [clip], которая начинает скрывать линии и точки на графике, если они подходят близко к осям. В моем случае, я рисовал линию между двумя точками, причем текущий `xrange` оказывался по оси _x_ между этими точками, но не захватывал ни одну из них. В этом случае (по-умолчанию point clip is OFF) gnuplot не рисует линию. Пришлось сказать `set clip two` и линия появилась.

[clip]: http://gnuplot.sourceforge.net/docs_4.2/node165.html