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
* Чтобы подключить [EPEL](http://fedoraproject.org/wiki/EPEL), репозиторий с
  большим количеством различных пакетов (например, `pip` для питона), нужно
  поставить rpm-пакет epel. Подробности – в [FAQ][faq-epel] Epel.
* Чтобы настроить таймзону нужно скопировать в `/etc/localtime` одну из таймзон
  из `/usr/share/zoneinfo`, например для Москвы:

      # ln -sf /usr/share/zoneinfo/Europe/Moscow localtime

  Тогда часы сразу изменятся и команда `date` будет выдавать правильное время.

  Подробности [тут][change-timezone].

[faq-epel]: http://fedoraproject.org/wiki/EPEL/FAQ#How_can_I_install_the_packages_from_the_EPEL_software_repository.3F
[change-timezone]: http://www.cyberciti.biz/faq/howto-linux-unix-change-setup-timezone-tz-variable/


