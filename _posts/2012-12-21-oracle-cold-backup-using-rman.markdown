---
layout: post
title: Холодный бэкап Oracle с помощью RMAN 
lang: ru
category: oracle
---

Чтобы осуществить холодный бэкап Oracle с помощью RMAN надо сделать:

    $sqlplus / as sysdba
    SQL> SHUTDOWN IMMEDIATE
    SQL> STARTUP MOUNT
    SQL> exit
    $rman target /
    RMAN> BACKUP AS COMPRESSED BACKUPSET DATABASE PLUS ARCHIVELOG;
    RMAN> BACKUP CURRENT CONTROLFILE;
    RMAN> LIST BACKUP;
    RMAN> exit

Некоторые полезные ссылки:

* [Раздел документации](http://docs.oracle.com/cd/B19306_01/backup.102/b14192/bkup003.htm)
* [Oracle Endeavor](http://oracleendeavor.blogspot.ru/2010/03/rman-compressed-backups.html)
* [Rene Nyffenegger](http://www.adp-gmbh.ch/ora/admin/backup_recovery/coldbackup_sh.html)
* [Rupam Verma](http://rupamverma.blogspot.ru/2011/04/rman-commands-quick-reference-guide.html)

Больше полезного у меня [в пинборде](https://pinboard.in/u:schmooser/t:rman/).
