---
layout: post
title: Считаем количество строк во всех таблицах в схеме 
lang: ru
---

    DECLARE
      n NUMBER;
    BEGIN
      FOR rec IN (SELECT owner,
                         table_name
                    FROM all_tables WHERE owner = 'OWNER') -- replace OWNER with target schema
      LOOP
        EXECUTE IMMEDIATE 'begin
         select count(*) into :n from '||
          rec.owner||'.'||rec.table_name||';
         end;'
        USING OUT n;
        dbms_output.put_line(rec.owner||'.'||rec.table_name||' - '||n);
      END LOOP;
    END;
    /
    
[gist](https://gist.github.com/schmooser/4409100)
