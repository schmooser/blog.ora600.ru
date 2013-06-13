---

layout: post  
category: oracle  
title: Install Oracle 11g Express (XE) on CentOS  
description: Full description of installation process of Oracle 11g Express Edition on CentOS 6. This one is full copy of the <a href="http://www.davidghedini.com/pg/entry/install_oracle_11g_xe_on">post</a> by David Ghedini for backup purposes.  

---

> This is full copy of the [post][original-post] by David Ghedini for backup purposes.
>
> Refer to [my post][my-post] about swap file on server and localhost's name.

This post will cover basic installation and configuration of Oracle 11g Express Edition (XE) on CentOS.

We will also take a quick look at configuring Application Express (APEX) for 11g XE.

Basic installation is straight forward.

If you just want to get up and running, you can just do steps 1 to 4 below (and 10 and 11 for Apex). The remaining steps (5 to 9) cover basic backup, recovery, and performance configuration.

The full system requirements are [here][oracle-xe-docs].

Your CentOS box should have swap equal to 2xRAM. _(look at [my post][my-post])_

On every CentOS installation I have done for XE, I just needed to update/install the packages for libaio, bc, and flex.

    [root@ms3 ~]#  yum install libaio bc flex


##Step 1: Download and Install Oracle 11g XE rpm

You can download the Oracle XE rpm, `oracle-xe-11.2.0-1.0.x86_64.rpm.zip`, from the OTN [here][download-xe].

Unzip `oracle-xe-11.2.0-1.0.x86_64.rpm.zip`:

    [root@ms3 ~]# unzip -q oracle-xe-11.2.0-1.0.x86_64.rpm.zip


This will create the directory `Disk1`. Change to the `Disk1` directory:

    [root@ms3 ~]# cd Disk1  
    [root@ms3 Disk1]# ls  
    oracle-xe-11.2.0-1.0.x86_64.rpm  response  upgrade  


Install the rpm using `rpm -ivh oracle-xe-11.2.0-1.0.x86_64.rpm`

    [root@ms3 Disk1]# rpm -ivh oracle-xe-11.2.0-1.0.x86_64.rpm  
    Preparing...                ###################### [100%]  
       1:oracle-xe              ###################### [100%]  
    Executing post-install steps...  
    You must run '/etc/init.d/oracle-xe configure' as the root user to configure the database.

    [root@ms3 Disk1]#  


##Step 2: Configure 11g XE Database and Options

When installation completes, run `/etc/init.d/oracle-xe configure` to configure and start the database.

Unless you wish to change the ports, except the defaults and set SYS/SYSTEM password. 

    [root@ms3 Disk1]# /etc/init.d/oracle-xe configure

    Oracle Database 11g Express Edition Configuration
    -------------------------------------------------
    This will configure on-boot properties of Oracle Database 11g Express
    Edition.  The following questions will determine whether the database should
    be starting upon system boot, the ports it will use, and the passwords that
    will be used for database accounts.  Press <enter> to accept the defaults.
    Ctrl-C will abort.

    Specify the HTTP port that will be used for Oracle Application Express [8080]:

    Specify a port that will be used for the database listener [1521]:

    Specify a password to be used for database accounts.  Note that the same
    password will be used for SYS and SYSTEM.  Oracle recommends the use of
    different passwords for each database account.  This can be done after
    initial configuration:
    Confirm the password:

    Do you want Oracle Database 11g Express Edition to be started on boot (y/n) [y]:y

    Starting Oracle Net Listener...Done
    Configuring database...Done
    Starting Oracle Database 11g Express Edition instance...Done
    Installation completed successfully.

The installation created the directory `/u01` under which Oracle XE is installed.


##Step 3: Set the Environment

To set the required Oracle environment variables, use the `oracle_env.sh` script included under `/u01/app/oracle/product/11.2.0/xe/bin`:

    [root@ms3 Disk1]# cd /u01/app/oracle/product/11.2.0/xe/bin  

To set the environment for your current session run:

    [root@ms3 bin]# . ./oracle_env.sh  

To set the environment permanently for users, add the following to the `.bashrc` or `.bash_profile` of the users you want to access the environment:

    . /u01/app/oracle/product/11.2.0/xe/bin/oracle_env.sh  

You should now be able to access SQL*Plus:

    [root@ms3 bin]# sqlplus /nolog  
      
    SQL*Plus: Release 11.2.0.2.0 Production on Wed Sep 21 08:17:26 2011  
      
    Copyright (c) 1982, 2011, Oracle.  All rights reserved.  
      
    SQL> connect sys/<password> as sysdba  
    Connected.  
    SQL>  



##Step 4: Allow Remote Access to Oracle 11g XE GUI

To allow remote access to Oracle 11g XE GUI (as well as Application Express GUI) issue the following from SQL*Plus:

    SQL> EXEC DBMS_XDB.SETLISTENERLOCALACCESS(FALSE);  
      
    PL/SQL procedure successfully completed.  

You should now be able to access the Oracle 11g XE Home Page GUI at:

    http://localhost:8080/apex/f?p=4950:1 -- note the port you've set during installation

Replace `localhost` above with your IP or domain as required.

Log in as `SYSTEM` using the password you selected in Step 2 above.

##Step 5: Move the Flash Recovery Area (Fast Recovery Area)

To protect against disk failure, you should move the Flash Recovery Area to a separate disk.

This is actually now called the Fast Recovery Area, but the existing documentation still refers to it as the Flash Recovery Area

If a separate disk is not in your budget you should, at the very least, move the Flash Recovery Area to a partition other than the Oracle installation directory.

By default, the Fast Recovery Area will be located under `/u01/app/oracle/fast_recovery_area`:

    SQL> show parameter DB_RECOVERY_FILE_DEST;  
      
    NAME                                 TYPE        VALUE  
    ------------------------------------ ----------- ------------------------------  
    db_recovery_file_dest                string      /u01/app/oracle/fast_recovery_area  
    db_recovery_file_dest_size           big integer 10G  
    SQL>  

So, to move it elsewhere, first create the new directory

[root@ms3 ~]# mkdir /opt/fra  

Change the owner to oracle and the group to dba 

    [root@ms3 ~]# chown oracle:dba /opt/fra  

Now, change the `DB_RECOVERY_FILE_DEST` to the location you selected above.

    SQL> ALTER SYSTEM SET DB_RECOVERY_FILE_DEST = '/opt/fra';  
      
    System altered.  
      
    SQL>  

To move the files use the `movelog.sql` script:

    SQL> @?/sqlplus/admin/movelogs  
    SQL> SET FEEDBACK 1  
    SQL> SET NUMWIDTH 10  
    SQL> SET LINESIZE 80  
    SQL> SET TRIMSPOOL ON  
    SQL> SET TAB OFF  
    SQL> SET PAGESIZE 100  
    SQL> declare  
      2     cursor rlc is  
      3        select group# grp, thread# thr, bytes/1024 bytes_k  
      4          from v$log  
      5        order by 1;  
      6     stmt     varchar2(2048);  
      7     swtstmt  varchar2(1024) := 'alter system switch logfile';  
      8     ckpstmt  varchar2(1024) := 'alter system checkpoint global';  
      9  begin  
     10     for rlcRec in rlc loop  
     11    stmt := 'alter database add logfile thread ' ||  
     12                 rlcRec.thr || ' size ' ||  
     13                 rlcRec.bytes_k || 'K';  
     14        execute immediate stmt;  
     15        begin  
     16           stmt := 'alter database drop logfile group ' || rlcRec.grp;  
     17           execute immediate stmt;  
     18        exception  
     19           when others then  
     20              execute immediate swtstmt;  
     21              execute immediate ckpstmt;  
     22              execute immediate stmt;  
     23        end;  
     24        execute immediate swtstmt;  
     25     end loop;  
     26  end;  
     27  /  
  
    PL/SQL procedure successfully completed.  
      
    SQL>  

Now, set an appropriate size for the Fast Recovery Area. Use `df -h` to insure that there is ample space.

    SQL> ALTER SYSTEM SET DB_RECOVERY_FILE_DEST_SIZE = 20G;  
      
    System altered.  

Verify the new location and size. 

    SQL> show parameter DB_RECOVERY_FILE_DEST;  
      
    NAME                                 TYPE        VALUE  
    ------------------------------------ ----------- ------------------------------  
    db_recovery_file_dest                string      /opt/fra  
    db_recovery_file_dest_size           big integer 20G  
    SQL>  


##Step 6: Add Redo Log Members to Groups

You should have at least two Redo Log Groups and each group should have at least two members.

Additionally, the members should be spread across disks (or at least directories)

For whatever reason, only one member is created per group on install.

You can view the redo log files using 

    SQL> SELECT * FROM V$LOGFILE;

Since the default location for the two members is the Flash Recovery Area, the two existing members have been moved to our new FRA.

You should now add an additional member for each group under `/u01/app/oracle/oradata/XE`

    SQL> ALTER DATABASE ADD LOGFILE MEMBER '/u01/app/oracle/oradata/XE/log1b.LOG' TO GROUP 1;  
      
    Database altered.  
      
    SQL> ALTER DATABASE ADD LOGFILE MEMBER '/u01/app/oracle/oradata/XE/log2b.LOG' TO GROUP 2;  
      
    Database altered.  
      
    SQL>  

##Step 7: Set Sessions and Processes Parameters

The default values for parameters and sessions is quite low on the default installation.

    SQL> show parameters sessions;  
      
    NAME                                 TYPE        VALUE  
    ------------------------------------ ----------- ------------------------------  
    java_max_sessionspace_size           integer     0  
    java_soft_sessionspace_limit         integer     0  
    license_max_sessions                 integer     0  
    license_sessions_warning             integer     0  
    sessions                             integer     172  
    shared_server_sessions               integer  
      
    SQL> show parameters processes;  
      
    NAME                                 TYPE        VALUE  
    ------------------------------------ ----------- ------------------------------  
    aq_tm_processes                      integer     0  
    db_writer_processes                  integer     1  
    gcs_server_processes                 integer     0  
    global_txn_processes                 integer     1  
    job_queue_processes                  integer     4  
    log_archive_max_processes            integer     4  
    processes                            integer     100  


You can increase these parameters.

After each change, you will need to restart the database.

Increase sessions and then bounce database.

    SQL> alter system set sessions=250 scope=spfile;  
      
    System altered.  
      
    SQL> shutdown immediate  
    Database closed.  
    Database dismounted.  
    ORACLE instance shut down.  
    SQL> startup  
    ORACLE instance started.  
      
    Total System Global Area 1068937216 bytes  
    Fixed Size                  2233344 bytes  
    Variable Size             780143616 bytes  
    Database Buffers          281018368 bytes  
    Redo Buffers                5541888 bytes  
    Database mounted.  
    Database opened.  


Verify change to sessions parameter:

    SQL> show parameters sessions;  
      
    NAME                                 TYPE        VALUE  
    ------------------------------------ ----------- ------------------------------  
    java_max_sessionspace_size           integer     0  
    java_soft_sessionspace_limit         integer     0  
    license_max_sessions                 integer     0  
    license_sessions_warning             integer     0  
    sessions                             integer     252  
    shared_server_sessions               integer  


Increase processes and restart database

    SQL> alter system set processes=200 scope=spfile;  
      
    System altered.  
      
    SQL> shutdown immediate;
      
    Database dismounted.  
    ORACLE instance shut down.  
    SQL> startup  
    ORACLE instance started.  
      
    Total System Global Area 1068937216 bytes  
    Fixed Size                  2233344 bytes  
    Variable Size             763366400 bytes  
    Database Buffers          297795584 bytes  
    Redo Buffers                5541888 bytes  
    Database mounted.  
    Database opened.  


Verify change to processes parameter:

    SQL>  show parameters processes;  
      
    NAME                                 TYPE        VALUE  
    ------------------------------------ ----------- ------------------------------  
    aq_tm_processes                      integer     0  
    db_writer_processes                  integer     1  
    gcs_server_processes                 integer     0  
    global_txn_processes                 integer     1  
    job_queue_processes                  integer     4  
    log_archive_max_processes            integer     4  
    processes                            integer     200  
    SQL>  



##Step 8: Enable Archivelog Mode


To enable online or "hot" backups, Archivelog Mode must be enabled.

Additionally, if you do not enable Archivelog Mode and take only offline or "cold" backups, should you need to restore the database you will only be able to restore to the last backup

To enable Archivelog Mode, shutdown the database and then startup mount:

    SQL> shutdown immediate  
    Database closed.  
    Database dismounted.  
    ORACLE instance shut down.  
    SQL> startup mount  
    ORACLE instance started.  
      
    Total System Global Area 1068937216 bytes  
    Fixed Size                  2233344 bytes  
    Variable Size             763366400 bytes  
    Database Buffers          297795584 bytes  
    Redo Buffers                5541888 bytes  
    Database mounted.  


Enable Archivelog Mode

    SQL> alter database archivelog;  
      
    Database altered.  


Open the database and verify that Archivelog Mode is enabled

    SQL> alter database open;  
      
    Database altered.  
      
    SQL> SELECT LOG_MODE FROM SYS.V$DATABASE;  
      
    LOG_MODE  
    ------------  
    ARCHIVELOG  
      
    SQL>  

##Step 9: Create Online Backup Script

To create automated backups, you can modify the `backup.sh` included under `/u01/app/oracle/product/11.2.0/xe/config/scripts`

Create a directory for your backup script

    [root@ms3 ~]# mkdir /opt/ora_backup  

Change the owner to oracle and the group to dba 

    [root@ms3 ~]# chown oracle:dba /opt/ora_backup  

Copy the `backup.sh` script from `/u01/app/oracle/product/11.2.0/xe/config/scripts` to the directory you created above.

    [root@ms3 ~]# cp  /u01/app/oracle/product/11.2.0/xe/config/scripts/backup.sh /opt/ora_backup/backup.sh  

Open the `backup.sh` script in a text editor or vi. The last section will look like this:

    else  
       echo Backup of the database succeeded.  
       echo Log file is at $rman_backup_current.  
    fi  
     
    #Wait for user to press any key  
    echo -n "Press ENTER key to exit"  
    read userinp   


Change it to: 

    else  
       echo Backup of the database succeeded.  
       echo Log file is at $rman_backup_current.  
       mail -s 'Oracle Backup Completed' 'david@davidghedini.com' < /u01/app/oracle/oxe_backup_current.log  
    fi  
     
    #Wait for user to press any key  
    #echo -n "Press ENTER key to exit"  
    #read userinp   


The line we added above, `mail -s 'Oracle Backup Completed' 'david@davidghedini.com' < /u01/app/oracle/oxe_backup_current.log`, will send us an email notification that the backup has completed as well as cat the backup log to the body of the email.

Note that we have also commented out the last two lines of the script (the prompt). 

Create a cron job to run the script as user oracle.

You should run it at least once a day. With Archivelog Mode enabled, it is important that backups be taken regularly to prevent the Flash Recovery Area from filling. 


##Step 10: Oracle 11g XE and Application Express (APEX)

Oracle 11g Express Edition comes with Application Express 4.0.2 already installed. 

If you elect to upgrade to the latest version (4.1 as of this writing), you can do so but will loose access to the XE GUI. Not a huge loss, but something to keep in mind.

Although Apex is already installed, you will need to set the Internal Admin password.

To do so, run the apxchpwd.sql located under `/u01/app/oracle/product/11.2.0/xe/apex`:

Note: pick something simple like `Password123!` as you will be prompted to change it on first log in anyways.

    SQL> @/u01/app/oracle/product/11.2.0/xe/apex/apxchpwd.sql  
    Enter a value below for the password for the Application Express ADMIN user.  
      
      
    Enter a password for the ADMIN user              []  
      
    Session altered.  
      
    ...changing password for ADMIN  
      
    PL/SQL procedure successfully completed.  
      
      
    Commit complete.  
      
    SQL>  


You can access the Application Express GUI at:

    http://localhost:8080/apex/f?p=4550:1

Replace localhost above with your IP or domain as required.

    Workspace: Internal
    User Name: admin
    Password: (whatever you selected above).

Alternatively, you can access via `http://localhost:8080/apex/f?p=4550:10` or `http://localhost:8080/apex/apex_admin`

Again, replace localhost above with your IP or domain as required.

##Step 11: Oracle 11g XE: Configure EPG or Apex Listener


Unless you have a license for Oracle HTTP Server (OHS), your options are the embedded PLSQL Gateway (EPG) or Apex Listener. 

The Application Express that comes installed with Oracle 11g XE is configured using the EPG.

While the EPG is simpler than Apex Listener, it can be painfully slow as of Apex 3.2. 

Apex Listener, while quite fast, adds an extra layer of complexity. 

You will need to install an application server to run Apex Listener.

I have run Apex Listener on both Tomcat (unsupported) as well as Oracle GlassFish 3.x (supported) and was not impressed with either.

A lot of people who know far more than I do about APEX (read: 99.9999% of the population) like the Apex Listener.

Apex Listener and it's installation guide can be found [here][listener].

The Apex Listener installation guide is well done and simple to follow.

If you need to install Oracle GlassFish or GlassFish CE (basic installation is the same), you can use my GlassFish 3.1 instructions [here][glassfish].

If you want to be an outlaw and use Tomcat, you can use my Tomcat 6 installation guide [here][tomcat-6], or my Tomcat 7 installation guide [here][tomcat-7].

[original-post]: http://www.davidghedini.com/pg/entry/install_oracle_11g_xe_on
[my-post]: {% post_url 2012-10-06-installing-oracle-xe-11gr2-on-centos-6 %}
[oracle-xe-docs]: http://download.oracle.com/docs/cd/E17781_01/install.112/e18802/toc.htm
[listener]: http://www.oracle.com/technetwork/developer-tools/apex-listener/overview/index.html
[glassfish]: http://www.davidghedini.com/pg/entry/install_glassfish_3_1_on
[tomcat-6]: http://www.davidghedini.com/pg/entry/install_tomcat_6_on_centos
[tomcat-7]: http://www.davidghedini.com/pg/entry/install_tomcat_7_on_centos

