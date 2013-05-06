---
layout: post
title: Cheatshit по git 
lang: ru
---

Буду собирать здесь часто выполняемые действия по гиту, этакий cheatshit. Все команды предваряются командой <tt>git</tt>.

1. <tt>checkout -b test origin/test</tt> – получаем удаленный бранч origin/test в локальный test
2. <tt>push origin :test</tt> – удаляем удаленный бранч test
3. <tt>diff --name-only [SHA1|TAG1] [SHA2|TAG2]</tt> – посмотреть измененные файлы между коммитами
4. <tt>show [SHA|TAG]:filename</tt> – показывает файл каким он был в указанном коммите
5. <tt>branch -m oldname newname</tt> – переименовываем бранч oldname в newname.
