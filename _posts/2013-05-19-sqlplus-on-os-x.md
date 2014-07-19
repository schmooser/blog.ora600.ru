---

layout: post  
category: oracle  
title: Working with sqlplus on OS X  
tags: [oracle, sqlplus] 

--- 

I've installed Oracle's `sqlplus` on my OS X 10.8 in a similar fashion that I
described in this [post][1]. I also added to my `.profile` this lines:

    # added sqlplus variables when they needed
    export DYLD_LIBRARY_PATH="/usr/local/oracle/instantclient10_2"
    export SQLPATH="/usr/local/oracle/instantclient10_2"
    export TNS_ADMIN="/etc/oracle"
    export NLS_LANG="AMERICAN_AMERICA.UTF8"
    export PATH=$SQLPATH:$PATH

Obviously, `$SQLPATH` above corresponded to the location of instantclient's
files.

After doing this sqlplus works fine, but all sudo operations starts to produce
this error message:

    dyld: DYLD_ environment variables being ignored because main executable (/usr/bin/sudo) is setuid or setgid

By googling on this error I found that it's a bug in OS X. So, as workaround I
putted above environment variables into separate file `.sqlplus.env` and when I
need to use `sqlplus` I load it with `. ~/.sqlplus.env`.

[1]: http://iseetheline.ru/running-oracle-instant-client-on-windows/

