---
layout: post
title: Cheatshit по git 
lang: ru
---

Буду собирать здесь часто выполняемые действия по гиту, этакий cheatshit. Все команды предваряются командой `git`.

* `checkout -b test origin/test` – получаем удаленный бранч origin/test в локальный test
* `push origin :test` – удаляем удаленный бранч test
* `diff --name-only [SHA1|TAG1] [SHA2|TAG2]` – посмотреть измененные файлы между коммитами
* `show [SHA|TAG]:filename` – показывает файл каким он был в указанном коммите
* `branch -m oldname newname` – переименовываем бранч oldname в newname.
