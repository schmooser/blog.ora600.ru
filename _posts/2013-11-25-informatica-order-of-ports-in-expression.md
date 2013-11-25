---
layout: post
category: informatica
published: true
lang: ru
title: Порядок портов в Expression Informatica PowerCenter
---

Оказывается, порядок портов в expression в Informatica PowerCenter имеет значение. Например, если сделать так:

    Номер порта	Имя	Значение
    1		v_A	v_B
    2		v_B	<вызов лукапа>

то значение `v_A` будет определяться от лукапа, выполненного по данным от предыдущей строки.

Пруф из хелпа:

> Port order. The Integration Service evaluates ports by dependency. The order  of the ports in a transformation must match the order of evaluation: input  ports, variable ports, output ports.
