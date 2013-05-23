---

layout: post  
category: oracle  
title: Cloning schema on the same instance with datapump utilities  
published: false  

---

I need to make a copy of schema with data in the same instance of Oracle Database. Best way to do this is by using datapump utilities `expdp` and `impdp`.

Datapump utilities work on the server side, so if you have no access to server, use good old `exp` and `imp`. Otherwise, `expdp` and `impdp` should been used.

__Task__: copy schema `dev` to schema `dev_copy` on the same instance with all structure, data, types, procedures and so on.

## Limitations

I assume that:

* All segments in `dev` reside to single tablespace, named also `dev`
* All tablespace 



## Directory

To use `expdp`/`impdp` you need to map some physical directory on server's filesystem to `DIRECTORY` object in Oracle Database. You already have some DIRECTORIES:

    SELECT * FROM DBA_DIRECTORIES;

Probably one of them is `DATA_PUMP_DIR`, which is default directory for data pump utilities. I will use it for my purposes. You can create your own with `CREATE DIRECTORY` command.
