---
layout: post
title: Ставим cx_Oracle на Amazon Linux (микро-инстанс EC2) 
lang: ru
---

Чтобы поставить модуль cx_Oracle на Amazon Linux, надо сделать следующее:

1. Поставить pip: `#easy_install pip`
2. Прописать оракловые переменные среды `ORACLE_HOME`, `ORACLE_SID`, `NLS_LANG`
3. Поставить пакет `#yum install python-devel`
4. Поставить cx_Oracle: `#pip install cx_Oracle`
5. Прописать переменную среды export `LD_LIBRARY_PATH=$ORACLE_HOME/lib`
