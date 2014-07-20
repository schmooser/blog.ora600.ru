---

layout: post  
title: Всякая всячина  
lang: ru  

---

1. Из терминала можно узнать внешний IP командой 

    `curl -s http://checkip.dyndns.org | sed 's/[a-zA-Z/<> :]//g'`

2. В iTerm2 удобно перемещаться между окнами по Cmd+Alt+стрелка

3. Чтобы скопировать вывод в системный клипбоард, можно пайпнуть его в
   `pbcopy`: 

    `echo 'asdf' | pbcopy`

