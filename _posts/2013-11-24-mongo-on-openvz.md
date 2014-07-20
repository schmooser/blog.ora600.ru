---
layout: post
lang: ru
title: MongoDB на OpenVZ
category: MongoDB
published: true
---

Для проекта [instaflickr] решил установить на своем виртуальном хостинге 
[MongoDB]. Установить просто через `yum install mongodb` не получилось --
установился пакет `mongodb.x86_64`, но при этом серверного процесса `mongod` 
в системе не оказалось, только клиент `mongo`. Пришлось установить, как описано
в [официальной документации][install]. 

Когда я запустил `mongod` и подключился клиентом, то увидел страшное сообщение
об ошибке:

    MongoDB shell version: 2.4.8
    connecting to: test
    Server has startup warnings:
    
    ** WARNING: You are running in OpenVZ. This is known to be broken!!!
    

Поискал в интернете, кто что пишет по этому поводу. Нашел [пост в блоге
Mind-Flip Blog][mind-flip]. Оказывается, в OpenVZ есть концепция нормальной и
всплесковой (burst) оперативной памяти. Сначала гипервизор выделяет физическую
память для каждой машины, затем, если машине необходимо больше памяти,
гипервизор увеличит размер. Эта дополнительная память и называется всплесковой.
Данная техника в теории работает очень хорошо, но на практике может вызывать
проблемы в работе некоторых приложений. Когда всплесковая память забирается
гипервизором, может получиться, что в этом куске памяти были структуры,
используемые MongoDB.  В этом случае MongoDB просто падает. В 10Gen
(компания-разработчик MongoDB), видимо, нашли проблему и теперь проверяют, что
ОС бежит под OpenVZ и выдают подобное угрожающее сообщение.

Так что я решил воспользоваться бесплатным планом на [MongoLab], они дают 500Мб
бесплатного места на одном инстансе MongoDB.

[instaflickr]: https://github.com/schmooser/instaflickr
[MongoDB]: http://www.mongodb.org
[install]: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat-centos-or-fedora-linux/
[mind-flip]: http://www.mind-flip.com/theBlog/2013/02/27/running-mongodb-in-a-virtual-environment/
[MongoLab]: http://mongolab.com


