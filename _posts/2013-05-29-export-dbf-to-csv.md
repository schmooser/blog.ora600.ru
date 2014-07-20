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

    dbf.export(a, filename=csv_file, encoding='cp1251', format='csv')


----

Обнаружилась проблема, что модуль dbf для определенных типов атрибутов заменяет NULL-значения на текст None. Поискал в интернете другой модуль, нашел [dbfpy](http://dbfpy.sourceforge.net/). Работает даже быстрее чем dbf. Скрипт выгрузки становится таким:

    from dbfpy import dbf
    import csv

    dbf_file = 'd:\\in.dbf'
    csv_file = 'd:\\out.csv'

    db = dbf.Dbf(dbf_file)
    writer = csv.writer(open(csv_file, 'w'), delimiter = '\t', lineterminator='\n',
                        quotechar="'", quoting=csv.QUOTE_NONE)
                    
    # print db.fieldNames

    i = 0
    for rec in db:
      row = [item for item in rec]
      writer.writerow(row)
      i += 1
      if i%100000 == 0:
        print '%d rows downloaded' % i

    print 'Done: %d rows downloaded' % i

Конверсии кодировки нет, в какой был текст в исходном dbf, в таком он будет и в csv.

