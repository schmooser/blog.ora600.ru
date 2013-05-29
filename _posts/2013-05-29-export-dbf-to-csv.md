---

layout: post  
category: python  
title: Экспорт из dbf в csv  
lang: ru  

---

Чтобы экспортировать dbf в csv, можно использовать питоновский модуль [dbf](https://pypi.python.org/pypi/dbf).

Иногда требуется указать явным образом кодировку, в которой хранятся данные в dbf-файле.

    import dbf

    dbf_file = 'd:\\in.dbf'
    csv_file = 'd:\\out.csv'

    a = dbf.Table(dbf_file)
    a.open()
    a.codepage = dbf.CodePage('cp866')

    dbf.export(a, filename=csv_file, encoding='cp1251', format='tab')
      
