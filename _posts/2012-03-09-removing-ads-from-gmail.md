---

layout: post  
title: Убираем из Гмэйла рекламу  
lang: ru  
category: lifehack  

---

Никто не любит рекламу. Все пользуются AdBlock'ом. Я тоже. Но в Гмэйле после
порезанной рекламы справа, при чтении почты, остается довольно широкая колонка
пустого места.

Если у вас есть экстеншн, который правит css-ки сайтов (например Stylebot для
Хрома), то пишем для Гмэйла такой стиль:

    td.Bu:nth-child(3) {display: none;}
    td.Bu:nth-child(2) {display: none;}
    div.if {margin-right: 15px;}
    div.ao8 {padding-right: 0;}

и вуаля, мерзкая полоса исчезает.

Работает во всех трех режимах — No Split, Horizontal Split, Vertical Split.
