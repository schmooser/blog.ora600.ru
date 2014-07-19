---
layout: post
lang: ru
title: Установка Oracle копированием
category: oracle
description: Оракл можно установить простым копированием нужных файлов в нужные
             места и прописыванием соответствующих переменных среды. Я описываю
             процесс установки Oracle XE 11g простым копированием файлов,
             настройку среды окружения, восстановления дубликата БД из
             бэкапа и запуск листенера.
---

Оракл можно установить простым копированием нужных файлов в нужные места и
прописыванием соответствующих переменных среды. Я описываю процесс установки
Oracle XE 11g простым копированием файлов, настройку среды окружения,
восстановления дубликата БД из бэкапа и запуск листенера.

<!--more-->

Допустим, у нас есть работающий сервер X с установленной Oracle XE 11g и мы
хотим скопировать Oracle на другой сервер Y, который бежит под той же ОС что и
X.

## Создаем пользователей

На сервере Y выполняем:

    $ sudo su
    # useradd oracle  # добавляем пользователя oracle
    # groupadd dba  # добавляем группу dba
    # cat /etc/passwd  # пользователи
    # cat /etc/group  # группы
    # usermod -G dba oracle  # добавляем oracle в группу dba
    # yum install libaio bc flex  # устанавливаем необходимые пакеты
    # su oracle
    $ cd ~

    
## Копируем исполняемые файлы

Копируем каталог `$HOME/product` пользователя `oracle` с сервера X на сервер Y
(я сжал директорию `product` tarом и перелил по sftp).

## Настраиваем среду

В `.bashrc` добавляем следующие строки:

    export ORACLE_HOME=/home/oracle/product/11.2.0/xe
    export ORACLE_SID=XE
    export NLS_LANG=`$ORACLE_HOME/bin/nls_lang.sh`
    export PATH=$ORACLE_HOME/bin:$PATH
    export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/usr/lib:/usr/lib64

После этого, мы должны спокойно войти в `sqlplus`:

    [oracle@ora600 ~]$ sqlplus /nolog

    SQL*Plus: Release 11.2.0.2.0 Production on Сб Дек 14 08:03:40 2013
    
    Copyright (c) 1982, 2011, Oracle.  All rights reserved.
    
    SQL>


## Создаем swap-file

Я [подробно описывал][swap-file] как создать swap-file. Создаем 2ГБ файл
подкачки.


## PFILE

Создаем параметрический файл pfile с параметрами сервера. Мой минимальный файл
`xe_init.ora` для пятидолларового дроплета на [DigitalOcean] выглядит так:

    DB_NAME=XE
    CONTROL_FILES='/home/oracle/oradata/XE/control.dbf'
    DB_FILE_NAME_CONVERT=(/u01/app/oracle/,/home/oracle/)
    LOG_FILE_NAME_CONVERT=(/u01/app/oracle/,/home/oracle/)
    AUDIT_FILE_DEST='/home/oracle/admin/XE/adump'
    COMPATIBLE='11.2.0.0.0'
    DB_RECOVERY_FILE_DEST='/home/oracle/fast_recovery_area'
    DB_RECOVERY_FILE_DEST_SIZE=11811160064
    DIAGNOSTIC_DEST='/home/oracle'
    DISPATCHERS='(PROTOCOL=TCP) (SERVICE=XEXDB)'
    EVENT='31156 trace name context forever, level 0x400'
    JOB_QUEUE_PROCESSES=4
    MEMORY_MAX_TARGET=268435456
    MEMORY_TARGET=268435456
    OPEN_CURSORS=300
    REMOTE_LOGIN_PASSWORDFILE='EXCLUSIVE'
    SESSIONS=20
    SHARED_POOL_SIZE=12582912
    SHARED_SERVERS=0
    UNDO_MANAGEMENT='AUTO'
    UNDO_TABLESPACE='UNDOTBS1'
    
Указанное в `MEMORY_TARGET` и `MEMORY_MAX_TARGET` количество памяти должно быть
меньше чем доступно shared memory. Если нужно -- увеличьте размер shared-memory,
я [писал][shm] о том, как это можно сделать. Если памяти будет недостаточно, то
Oracle будет падать в процессе запуска с ошибкой `ORA-00845: MEMORY_TARGET not
supported on this system`.


## Директории

Создайте директории, указанные в PFILE в параметрах `DB_RECOVERY_FILE_DEST` и
`AUDIT_FILE_DEST`, а также директории, в которых будут лежать контрол-файлы.


## Запуск экземпляра

Теперь уже можно запустить экземпляр Oracle без БД:

    [oracle@ora600 ~]$ sqlplus / as sysdba
    
    SQL*Plus: Release 11.2.0.2.0 Production on Сб Дек 14 08:41:10 2013
    
    Copyright (c) 1982, 2011, Oracle.  All rights reserved.
    
    Connected to an idle instance.
    
    SQL> startup nomount pfile=xe_init.ora
    ORACLE instance started.
    
    Total System Global Area  267227136 bytes
    Fixed Size                2225640 bytes
    Variable Size             197134872 bytes
    Database Buffers          62914560 bytes
    Redo Buffers              4952064 bytes
    SQL>

После того, как убедились, что экземпляр поднимается, его можно остановить
(`SHUTDOWN IMMEDIATE`).


## Восстановление БД из бэкапа

Допустим, у вас есть бэкап какой-то базы, созданный RMAN, лежащий на другом
сервере (откуда копировали директорию `product`). В этом случае, добавляем в
pfile строки:

    DB_FILE_NAME_CONVERT='/u01/app/oracle/','/home/oracle/'
    LOG_FILE_NAME_CONVERT='/u01/app/oracle/','/home/oracle/'

где прописываем старые и новые пути датафайлов и лог-файлов. Копируем бэкапы и
архивные логи из `fast_recovery_area` сервера X на сервер Y, например в папку
`fre`. У меня дерево папок в `fre` выглядело так:

    [oracle@ora600 ~]$ tree fre
    fre
    ├── archivelog
    │   ├── 2013_12_08
    │   │   └── o1_mf_1_328_9b82qh0f_.arc
    │   ├── 2013_12_09
    │   │   └── o1_mf_1_329_9b9vthqf_.arc
    │   ├── 2013_12_10
    │   │   ├── o1_mf_1_330_9bdhcjpz_.arc
    │   │   └── o1_mf_1_331_9bfhdr0h_.arc
    │   ├── 2013_12_11
    │   │   ├── o1_mf_1_332_9bh4nrz7_.arc
    │   │   └── o1_mf_1_333_9bkcc3w9_.arc
    │   ├── 2013_12_12
    │   │   ├── o1_mf_1_334_9bks20lr_.arc
    │   │   └── o1_mf_1_335_9bmnhljr_.arc
    │   ├── 2013_12_13
    │   │   └── o1_mf_1_336_9bnfh5h2_.arc
    │   └── 2013_12_14
    │       ├── o1_mf_1_337_9bq0vl1o_.arc
    │       └── o1_mf_1_338_9bqwz6rm_.arc
    ├── autobackup
    │   └── 2013_12_14
    │       └── o1_mf_s_834158063_9brf1hjw_.bkp
    └── backupset
        ├── 2013_12_08
        │   └── o1_mf_nnnd0_XE_INCR_9b7b3m9p_.bkp
        ├── 2013_12_09
        │   └── o1_mf_nnnd1_XE_INCR_9b9yhmh3_.bkp
        ├── 2013_12_10
        │   └── o1_mf_nnnd1_XE_INCR_9bdlvm5q_.bkp
        ├── 2013_12_11
        │   └── o1_mf_nnnd1_XE_INCR_9bh77mx4_.bkp
        ├── 2013_12_12
        │   └── o1_mf_nnnd1_XE_INCR_9bkvmmw8_.bkp
        ├── 2013_12_13
        │   └── o1_mf_nnnd1_XE_INCR_9bnhznqs_.bkp
        └── 2013_12_14
            ├── o1_mf_ncsn1_XE_INCR_9bq4d4m1_.bkp
            └── o1_mf_nnnd1_XE_INCR_9bq4cmsm_.bkp
    
    18 directories, 20 files

Особо надо обратить внимание, чтобы на исходной БД (в терминологии RMAN --
TARGET) был включен автобэкап контрол-файла. Если нет -- то RMAN не сможет его
найти и восстановить БД.

Теперь создаем SPFILE из PFILE и снова запускаем инстанс:

    [oracle@ora600 ~]$ sqlplus / as sysdba
    
    SQL*Plus: Release 11.2.0.2.0 Production on Сб Дек 14 10:51:44 2013
    
    Copyright (c) 1982, 2011, Oracle.  All rights reserved.
    
    Connected to an idle instance.
    
    SQL> create spfile from pfile='/home/oracle/xe_init.ora';
    
    File created.
    
    SQL> startup nomount;
    ORACLE instance started.
    
    Total System Global Area  267227136 bytes
    Fixed Size                2225640 bytes
    Variable Size             197134872 bytes
    Database Buffers          62914560 bytes
    Redo Buffers              4952064 bytes
    SQL>


На этом этапе мы можем подсоединиться к БД с помощью RMAN и провести
восстановление БД. Документация по такому процессу [здесь][rman-duplicate].
Есть еще полезная информация на [oracle-base].

В моем случае меня интересует стратегия "Duplication without a target database
connection and without a recovery catalog. RMAN obtains metadata about where
backups and copies reside from BACKUP LOCATION.", когда я никак не подсоединен
к исходной базе.

![rman](http://docs.oracle.com/cd/E11882_01/backup.112/e10642/img/bradv048.gif)

Дублируем БД:

    [oracle@ora600 ~]$ rman auxiliary /
    
    Recovery Manager: Release 11.2.0.2.0 - Production on Сб Дек 14 10:57:05 2013
    
    Copyright (c) 1982, 2009, Oracle and/or its affiliates.  All rights reserved.
    
    connected to auxiliary database: XE (not mounted)
    
    RMAN> DUPLICATE DATABASE TO xe BACKUP LOCATION '/home/oracle/fre';

    ... ... ...

    contents of Memory Script:
    {
         Alter clone database open resetlogs;
    }
    executing Memory Script

    database opened
    Finished Duplicate Db at 14.12.13

    RMAN>

RMAN проверит бэкапы, перестартует инстанс и начнет восстановление БД из бэкапа.

После этого получается готовая БД.


## Настройка листенера

Настроить листенер вообще очень просто: правим `listener.ora` в
`$ORACLE_HOME/network/admin` - прописываем актуальное имя хоста (его надо не
забыть указать в `/etc/hosts`) и стартуем листенер:

    $ lsnrctl start
    
Посмотреть статус можно командой

    $ lsnrctl status

Хорошая статья по листенеру на [orafaq-listener].

Важно следить за тем, чтобы соответствующие порты были открыты в файрволле. Про
мою настройку iptables я уже [писал][firewall], но напишу еще один отдельный
пост.



[DigitalOcean]: http://digitalocean.com
[swap-file]: #
{% comment %}
  {% post_url 2012-10-06-installing-oracle-xe-11gr2-on-centos-6 %}
{% endcomment %}
[shm]: #
{% comment %}
  {% post_url 2013-06-11-increasing-memory-of-oracle-xe %}
{% endcomment %}
[rman-duplicate]: http://docs.oracle.com/cd/E11882_01/backup.112/e10642/rcmdupdb.htm#BRADV420
[oracle-base]: http://www.oracle-base.com/articles/11g/duplicate-database-using-rman-11gr2.php
[orafaq-listener]: http://www.orafaq.com/wiki/Lsnrctl
[firewall]: #
{% comment %}
  {% post_url 2013-01-11-centos-63-minimal-from-zero-to-useful-environment %}#firewall
{% endcomment %}


