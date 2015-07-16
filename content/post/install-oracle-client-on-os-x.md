+++
Title="Install Oracle client on OS X"
Date="2015-07-14"
+++

To install Oracle Database instant client (small version of Oracle Database
thick client) do the following:

1. Download client package from [Instant Client download page for Mac OS X][1].
   I downloaded InstantClient 11.2.0.4 64-bit version. You need Basic package,
   SQL\*Plus package and SDK package if you want to use 3rd party tools like
   Python Oracle module cx\_Oracle.

2. Unzip downloaded files into `/usr/local/Oracle` folder (I assume you're using [homebrew][2],
   don't you?).

3. Create symlink for sqlplus in `/usr/local/bin` directory pointing to
   `/usr/local/Oracle/instantclient_11_2/sqlplus`:

        cd /usr/local/bin
        ln -s ../Oracle/instantclient_11_2/sqlplus sqlplus

4. Create symlinks for libraries:

        ln -s libclntsh.dylib.11.1 libclntsh.dylib
        ln -s libocci.dylib.11.1 libocci.dylib

4. Add the following env variables to your `.bashrc` or `.zshrc` file:

        export ORACLE_HOME=/usr/local/Oracle/instantclient_11_2
        export DYLD_LIBRARY_PATH=$ORACLE_HOME
        export LD_LIBRARY_PATH=$ORACLE_HOME
        export TNS_ADMIN=$ORACLE_HOME
        export SQLPATH=~/Projects/sql

5. Reload your shell, and start using sqlplus.

[1]: http://www.oracle.com/technetwork/topics/intel-macsoft-096467.html
[2]: http://brew.sh
