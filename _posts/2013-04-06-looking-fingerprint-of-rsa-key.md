---
layout: post
title: Просмотр fingerprint'а у RSA-ключа 
lang: ru
---

Чтобы просмотреть fingerprint ключа, надо сделать:


    $ssh-keygen -lf keyname


Подробнее можно почитать [тут](http://www.lysium.de/blog/index.php?/archives/186-How-to-get-ssh-server-fingerprint-information.html).

UPD. Еще полезное по поводу RSA. Чтобы сервер нормально пускал через ssh помощью RSA-ключа, надо, помимо добавления публичного ключа в ~/.ssh/authorized_keys, выставить правильные права на папку .ssh и файлы в ней. Какие – зависит от типа сервера. На EC2 образе Amazon Linux у .ssh и .ssh/authorized_keys права 755 и 644, соответственно, а владелец/группа у обоих root/root. CentOS оказался более привередливым, ему пришлось выставить 644 на .ssh и 600 на .ssh/authorized_keys.
