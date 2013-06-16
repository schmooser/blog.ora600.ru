---

layout: post  
title: Cheatsheet по git  
lang: ru  
categories: git favourites  

---

Буду собирать здесь часто выполняемые действия по гиту, этакий cheatsheet.

Полезные ссылки по гиту, которые я сохранил, можно посмотреть на
[пинборде][pinboard].

* `git checkout -b test origin/test` – получаем удаленный бранч origin/test в
  локальный test
* `git push origin :test` – удаляем удаленный бранч test
* `git diff --name-only [SHA1|TAG1] [SHA2|TAG2]` – посмотреть измененные файлы
  между коммитами
* `git show [SHA|TAG]:filename` – показывает файл каким он был в указанном
  коммите
* `git branch -m oldname newname` – переименовываем бранч oldname в newname
* `git merge -s recursive -X ours` - мерж со стратегией "при совпадении брать
  файлы из текущей ветки". Нужно предварительно чекаутнуть ту ветку, чьи файлы
  нужно сохранить. Не путать со стратегией `git merge -s ours`. Эта просто
  берет текущую ветку за основу, все измененные и новые файлы из мержимых веток
  отбрасываются. [Подробнее][merge].
* `git add -u` - добавляет всю ветку в стейджинговую область для коммита.
  Удобно, когда удаляешь много файлов и не хочется вручную писать для каждого
  `git rm <filename>`.


[pinboard]: https://pinboard.in/u:schmooser/t:git/
[merge]: https://www.kernel.org/pub/software/scm/git/docs/git-merge.html
