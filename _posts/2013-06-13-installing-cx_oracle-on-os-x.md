---

layout: post  
title: Installing Oracle Instant Client and python's cx_Oracle on OS X Mountain Lion  
categories: oracle python  

---

I've encountered some problems with installing cx_Oracle python module on OS X Mountain Lion.

There are many [hints][1], [tips][2] and [tutorials][3], which covers installation process, but none of them worked for me.

But the straightforward way worked:

1. Download all parts of 64-bit [Oracle Instant Client][oracle-client] version 11.2
2. Unzip all in some folder, I unzipped in `/usr/local/oracle/instantclient_11_2_x64/instantclient_11_2`
3. Create a bash script with environment variables. I named mine `.sqlplus.env` and load it when needed (more in [this post][sqlplus-on-os-x]):

       # adding sqlplus variables when they needed
       export ORACLE_HOME=/usr/local/oracle/instantclient_11_2_x64/instantclient_11_2
       export SQLPATH=$ORACLE_HOME
       export LD_LIBRARY_PATH=$ORACLE_HOME
       export DYLD_LIBRARY_PATH=$ORACLE_HOME
       export TNS_ADMIN=/usr/local/oracle/network/admin
       export NLS_LANG=AMERICAN_AMERICA.UTF8
       export VERSIONER_PYTHON_PREFER_32_BIT=yes
       export PATH=$SQLPATH:$PATH

4. Load it with `$ . ~/.sqlplus.env`
5. Go to $ORACLE_HOME and create symlink named `libclntsh.dylib` on `ibclntsh.dylib.11.1`:

       ln -s libclntsh.dylib.11.1 libclntsh.dylib

6. Install cx_Oracle:

       ~ » pip install cx_Oracle
       Downloading/unpacking cx-Oracle
         Downloading cx_Oracle-5.1.2.tar.gz (208kB): 208kB downloaded
         Running setup.py egg_info for package cx-Oracle

       Installing collected packages: cx-Oracle
         Running setup.py install for cx-Oracle
           building 'cx_Oracle' extension
           cc -fno-strict-aliasing -fno-common -dynamic -I/usr/local/include -I/usr/local/opt/sqlite/include -DNDEBUG -g -fwrapv -O3 -Wall -Wstrict-prototypes -I/usr/local/oracle/instantclient_11_2_x64/instantclient_11_2/sdk/include -I/usr/local/Cellar/python/2.7.5/Frameworks/Python.framework/Versions/2.7/include/python2.7 -c cx_Oracle.c -o build/temp.macosx-10.8-x86_64-2.7-11g/cx_Oracle.o -DBUILD_VERSION=5.1.2
           cc -bundle -undefined dynamic_lookup -L/usr/local/lib -L/usr/local/opt/sqlite/lib build/temp.macosx-10.8-x86_64-2.7-11g/cx_Oracle.o -L/usr/local/oracle/instantclient_11_2_x64/instantclient_11_2 -lclntsh -o build/lib.macosx-10.8-x86_64-2.7-11g/cx_Oracle.so -shared-libgcc

       Successfully installed cx-Oracle
       Cleaning up...

7. Check if all is running:

       ~ » python
       Python 2.7.5 (default, Jun  8 2013, 12:45:21)
       [GCC 4.2.1 Compatible Apple LLVM 4.2 (clang-425.0.28)] on darwin
       Type "help", "copyright", "credits" or "license" for more information.
       >>> import cx_Oracle
       >>> exit()

If there are some errors, try methods described in the links above. You may need to recompile `cx_Oracle`. To do this uninstall it with `pip uninstall cx_Oracle`, remove pip's cache via

    $ rm -rf $TMPDIR/pip-build-{username}/

and then try to install `cx_Oracle` again.

[sqlplus-on-os-x]: {% post_url 2013-05-19-sqlplus-on-os-x %}
[oracle-client]: http://www.oracle.com/technetwork/topics/intel-macsoft-096467.html
[1]: http://mechanicalcat.net/richard/log/Python/Compiling_cx_Oracle_on_OS_X
[2]: http://stackoverflow.com/questions/8169946/cant-get-cx-oracle-to-work-with-python-version-2-7-mac-os-10-7-2-lion-mis
[3]: http://www.iceycake.com/2012/02/tutorial-how-to-install-cx_oracle-python-on-mac-os-x-lion/



