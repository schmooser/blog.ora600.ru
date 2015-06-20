---
published: true
category: oracle
layout: post
title: Aggregate functions in Oracle on empty data set
---

I found an interesting thing about aggregate functions in Oracle. I knew then
when you invoke `count(*)` you'll always get rows - at least one - even if
result set is empty (no rows are returned). In this case you'll get 0 rows in
count, it's expected and easy-to-think-of behaviour.

But I thought that when you invoke other than `count(*)` aggregate function e.g.
`max(1)` on empty result set then you'll get no rows at all. I was wrong and in
this case you'll get one row with NULL as it's result. I think it's the ISO
standard that says that when you apply aggregate function there can't be empty
set in result.

Examples:

    SQL> SELECT count(*) FROM dual WHERE 1=2;

    COUNT(*)
    --------
           0

    SQL> SELECT max(1) FROM dual WHERE 1=2;

    MAX(1)
    ------
           <- Here is 1 row with NULL value
           
    