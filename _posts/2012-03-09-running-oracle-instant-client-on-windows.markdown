---
layout: post
title: Установка и запуск Oracle Instant Client под Windows 
category: favourites
lang: ru
---

1. Скачиваем нужную версию Oracle Instant Client. Нужна версия, совместимая с ПО, которое предполагается использовать. Например, для 32-х битного PL/SQL Developer нужна 32-х битная же версия Instant Client. Пакеты я брал Basic и SQL*Plus.
2. Распаковываем в произвольную папку. Я распаковал оба пакета в одну и ту же папку `C:\Program Files (x86)\Oracle\instantclient_11_2`
3. Создаем две переменных среды:
  * `ORACLE_HOME = C:\Program Files (x86)\Oracle\instantclient_11_2`
  * `TNS_ADMIN = C:\Program Files (x86)\Oracle\instantclient_11_2\network\admin\`
4. Создаем файл tnsnames.ora в папке, указанной в параметре TNS_ADMIN, примерно следующего содержания:

    ORCL =
    (DESCRIPTION =
     (ADDRESS = 
        (PROTOCOL = TCP)
        (HOST = localhost)
        (PORT = 1521) 
     )
     (CONNECT_DATA =
       (SERVER = DEDICATED)
       (SERVICE_NAME = orcl)
     )
    )
    
5. Запускаем sqlplus или PL/SQL Developer. Работаем.
