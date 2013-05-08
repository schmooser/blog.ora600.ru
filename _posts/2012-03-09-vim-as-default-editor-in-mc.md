---

layout: post  
title: vim в качестве редактора по F4 в mc  
lang: ru  

---

Чтобы использовать vim в качестве редактора в Midnight Commander (mc) по F4 надо:

В настройках mc снять отметку Use internal editor
в файле ~/.bashrc добавить строку
export EDITOR=vim
Перезапустить bash и mc.

Проверено на Debian 6.
