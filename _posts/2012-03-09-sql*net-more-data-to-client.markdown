---
layout: post
title: SQL*NET more data to client 
lang: ru
category: oracle
---

> SQL\*NET more data to client means your data doesn’t fit in one sqlnet packet. The default packet size is 2k. You can adjust this by setting the SDU on listener and client tnsnames.ora. The SDU needs to be a multiple of the network card MTU, usually 1500 bytes. 

*Sybrand Bakker, Senior Oracle DBA*
