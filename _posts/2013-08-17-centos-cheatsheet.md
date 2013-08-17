---

layout: post  
title: Cheatsheet по CentOS  
categories: linux cheatsheet  

---

Буду собирать полезные команды по CentOS в одном месте.

* `chkconfig` -- команда, проверяющая автоматический запуск сервисов. `chkconfig
  --list httpd` покажет, на каких ранлевелах стартует веб-сервер (Апач) при
  загрузке. Добавить сервис в автозапуск можно с помощью `chkconfig --levels
  2345 httpd on`


