---
layout: post
title: Установка Raspberry Pi и настройка SSH через браузер
lang: ru
category: "Raspberry Pi"
disqus_id: 2013-10-26-raspberry-pi-setup-and-ssh-through-browser
---

Настало время поставить что-нибудь дельное на мой Raspberry Pi Model A.

![raspberry pi logo](/assets/raspberrypi/raspberry_pi_logo1.png)

## ОС, WiFi и драйвера

В качестве операционной системы поставил [Raspbian], сеть -- купил WiFi-адаптер [TL-WN725N] за 310 рублей в Юлмарте.

Драйвера для WiFi-адаптера ставятся простым копированием файлов в нужные директории, полное описание процесса установки есть в блоге [mendrugox]. Только надо внимательно следить, чтобы драйвера были скомпилированы именно под нужную версию Raspbian.

Драйвер для версии `2013-09-25-wheezy-raspbian`: [8188eu.ko] (Compiled in 2013-10) (Working in kernel Linux raspberrypi 3.6.11+ #538 PREEMPT).

Файл кидаем на SD-карточку, после чего из Raspberry находим его в каталоге `/boot`. Копируем в

    /lib/modules/(your-kernel-version)/kernel/drivers/net/wireless

и запускаем:

    depmod -a
    modprobe 8188eu

После этого должно появиться устройство `wlan0`, с которым можно уже работать.

Исходный код: [rtl8188eu.tgz]

Я не стал мучаться с настройкой WiFi через командную строку, а настроил все через графический интерфейс. Все работает и загружается при старте системы.

## SSH через браузер и динамический DNS

Решил поставить браузерную версию ssh, чтобы можно было зайти на него с работы (любой не http(s)-трафик у нас режут).

Для этого сначала поставил [nodejs], затем [tty.js]:

    apt-get install nodejs, npm
    npm install tty.js

После этого его сразу можно поднимать и работать:

    nodejs tty.js --daemonize

Конфигурационный файл по-умолчанию лежит в `~/.tty.js/config.json`.

Единственное, чего я пока не понял -- как сделать шелл с приглашением к логину, а то сейчас сразу открывается терминал из под пользователя, запустившего `tty.js`.

Аутентификация -- стандартная HTTP-authentication. Надо будет еще с HTTPS заморочиться, чтобы вообще все было хорошо.

Дальше, выводим наш Raspberry в интернет.

Есть сервис [pagekite], который привязывает к вашему динамическому IP доменное имя вида `username.pagekite.me`. Бесплатный и с открытым исходным кодом, все настраивается и быстро устанавливается, можно даже привязать свой CNAME.

Все настроил, теперь у меня Raspberry доступен из интернета.

Правда это штука, pagekite, достаточно сильно грузит процессор -- примерно 7-8% на сессию. Видимо, программно осуществляет роутинг пакетов.

Надо будет приделать к нему настоящий DDNS. К сожалению, почти все хотят за это сейчас денег, причем немаленьких. Есть наброски по использованию Yandex Public DNS и прописыванием адреса через API. Сделаю -- напишу.

## Скриншоты

<div class="photos">
  <img src="/assets/raspberrypi/screenshot-1.png" data-caption="Nyancat в терминале, pagekite жрет 25% процессора">
  <img src="/assets/raspberrypi/screenshot-2.png" data-caption="Без нагрузки pagekite жрет 6-7% процессора">
</div>


[Raspbian]: http://www.raspbian.org
[TL-WN725N]: http://www.tp-linkru.com/products/details/?categoryid=243&model=TL-WN725N
[mendrugox]: http://www.mendrugox.net/2013/08/tp-link-tl-wn725n-v2-working-on-raspberry-raspbian/
[8188eu.ko]: /assets/raspberrypi/8188eu.ko
[rtl8188eu.tgz]: /assets/raspberrypi/rtl8188eu.tgz
[tty.js]: https://github.com/chjj/tty.js/
[pagekite]: https://pagekite.net
[nodejs]: http://nodejs.org
