---
layout: post
lang: en
title: Direct-Path Insert in Oracle Database
category: oracle
---

I found interesting description in Oracle's [documentation] regarding Direct-Path insert limitations. Direct-Path insert can be done via `insert /*+ append */ into table ...` or via [SQL\*Loader] or by Informatica PowerCenter by specifying bulk insert type.

Here they are:

> ###Conventional and Direct-Path INSERT
>
> You can use the INSERT statement to insert data into a table, partition, or view in two ways: conventional INSERT and direct-path INSERT. When you issue a conventional INSERT statement, Oracle Database reuses free space in the table into which you are inserting and maintains referential integrity constraints. With direct-path INSERT, the database appends the inserted data after existing data in the table. Data is written directly into datafiles, bypassing the buffer cache. Free space in the existing data is not reused. This alternative enhances performance during insert operations and is similar to the functionality of the Oracle direct-path loader utility, SQL*Loader.
>
> Direct-path INSERT is subject to a number of restrictions. If any of these restrictions is violated, then Oracle Database executes conventional INSERT serially without returning any message, unless otherwise noted:
>
> * You can have multiple direct-path INSERT statements in a single transaction, with or without other DML statements. However, after one DML statement alters a particular table, partition, or index, no other DML statement in the transaction can access that table, partition, or index.
>
> * Queries that access the same table, partition, or index are allowed before the direct-path INSERT statement, but not after it.
>
> * If any serial or parallel statement attempts to access a table that has already been modified by a direct-path INSERT in the same transaction, then the database returns an error and rejects the statement.
>
> * The target table cannot be index organized or part of a cluster.
>
> * The target table cannot contain object type columns.
>
> * The target table cannot have any triggers or referential integrity constraints defined on it.
>
> * The target table cannot be replicated.
>
> * A transaction containing a direct-path INSERT statement cannot be or become distributed.

[documentation]: http://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_9014.htm
[SQL\*Loader]: http://iseetheline.ru/speed-of-direct-path-load/



