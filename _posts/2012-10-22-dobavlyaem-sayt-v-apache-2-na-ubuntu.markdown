---
layout: post
title: Добавляем сайт в Apache 2 на Ubuntu 
lang: ru
---

Мне потребовалось повесить рядом с этим сайтом на том же сервере еще один проект. Он тоже работает в стеке LAMP, поэтому я повесил его на соседний порт. 

Чтобы это сделать, добавляем виртуальный сайт в apache2 — конфигурационный файл кладем в `/etc/apache2/sites-available/`, затем добавляем в `/etc/apache2/ports.conf` инструкцию, чтобы apache слушал желаемый порт (Listen 1234), и перегружаем apache — `/etc/init.d/apache2 reload`. 

UPD: Полезные команды по работе с apache2 на Ubuntu:

    # enable site
    sudo a2ensite
    
    # disable site
    sudo a2dissite
    
    # enable an apache2 module
    sudo a2enmod
    
    # disable an apache2 module
    sudo a2dismod
    
    # force reload the server:
    sudo  /etc/init.d/apache2 force-reload

