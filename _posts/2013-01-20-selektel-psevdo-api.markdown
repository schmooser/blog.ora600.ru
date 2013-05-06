---
layout: post
title: Селектел – псевдо API 
lang: ru
---

У [Селектела]](http://selectel.ru) нет API для управления виртуальными машинами. Однако, добрые люди спросили у саппорта, можно ли это сделать, и поделились с нами ответом: [selectel псевдо-API](http://dragonflybsd.blogspot.ru/2011/10/selectel-api.html). Там в комментариях есть актуальный работающий способ:

    # получаем sid сессии
    $curl -s -o /dev/null --cookie-jar - 
    --data "action_method=GET&user=НОМЕР_ДОГОВОРА&pass=ПАРОЛЬ" 
    "https://support.selectel.ru" | grep sid
    # включаем или выключаем машину
    $curl -v -X POST --data "uuid=ИДЕНТИФИКАТОР_МАШИНЫ" 
    "https://support.selectel.ru/support_api/cloud/vm/stop?login=НОМЕР_ДОГОВОРА&sid=SID"


Кроме `/cloud/vm/stop` доступны действия: `cloud/vm/start`, `cloud/vm/reboot` и `cloud/vm/absolute-kill`.

UPD: Выложил [репозиторий](https://github.com/schmooser/selectel-simple-api) со скриптами для вышеописанного на ГитХаб.
