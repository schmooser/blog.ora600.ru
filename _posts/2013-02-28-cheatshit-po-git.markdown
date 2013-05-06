---
layout: post
title: Cheatshit по git 
lang: ru
---

Буду собирать здесь часто выполняемые действия по гиту, этакий cheatshit. Все команды предваряются командой `git`.

1. `checkout -b test origin/test` – получаем удаленный бранч origin/test в локальный test
2. `push origin :test` – удаляем удаленный бранч test
3. `diff --name-only [SHA1|TAG1] [SHA2|TAG2]` – посмотреть измененные файлы между коммитами
4. `show [SHA|TAG]:filename` – показывает файл каким он был в указанном коммите
5. `branch -m oldname newname` – переименовываем бранч oldname в newname.
