---
layout: post
title: "CentOS 6.3 minimal from zero to useful environment"
category: linux
tags: [linux, oracle, centos, java]
---

After installation of minimal configuration of CentOS 6.3 you've got a simple login shell with some useful options missed. Let's install them.

##Network. 

Check it with command `ifconfig`. If there is only `lo` interface then network is shut down. Open it up with `ifconfig eth0 up`. Check `ifconfig` again. If there is no IPv4 address attached to `eth0` interface, get one with `dhclient eth0`. Then check again, usually everything is ok and you can ping something with `ping ya.ru`. If you want to keep this change permanent, so that `eth0` would start at boot, you've got to change `ONBOOT="no"` to `ONBOOT="yes"` in `/etc/sysconfig/network-scripts/ifcfg-eth0` config file.

##VM tools. 

For comfort use you need VM tools to be installed. Usually tools are installed via CD image attached to VM's CD-ROM. I wrote about mounting CD-ROM on Ubuntu Sever, but I will repeat. Create directory `mkdir /media/cdrom`, add to `/etc/fstab` line `/dev/cdrom /media/cdrom auto noauto,sync 0 0`, mount CDROM with `mount cdrom`. To install Parallels Tools use `/media/cdrom/install` to install.

##Packages
I install with `yum install` this packages to work efficiently:

* mc
* sudo
* unzip
* man


##Java
To install JRE download appropriate .tar.gz for your distribution, then unpack it into `/usr/java/` and make symlinks `current` and `latest` pointed to it. In my case it was:

        ln -s jre1.7.0_10 current
        ln -s jre1.7.0_10 latest

Then add `/usr/java/current/bin` into your `~/.profile` file:
    
        export PATH=$PATH:/usr/java/current/bin
        
Check if java is installed correctly:
        
        java -version

If there is an error

        bash: /usr/java/current/bin/java: /lib/ld-linux.so.2: bad ELF interpreter

try to install package 

        yum install glibc.i686

##Oracle instant client

1. Download files `instantclient-basic-linux-11.2.0.3.0.zip` and `instantclient-sqlplus-linux-11.2.0.3.0.zip` from Oracle instant client download area. Be sure to download appropriate version for your OS. If you use 64-bit OS then download x86_64 version of instant client. Unzip them into `/opt/oracle/instantclient_11_2`.

2. Install `libaio` package. 

3. Add this environment variables to `.profile` or `.bashrc`:

        export ORACLE_HOME=/opt/oracle/instantclient_11_2
        export LD_LIBRARY_PATH=/opt/oracle/instantclient_11_2
        export TNS_ADMIN=$ORACLE_HOME/network/admin/
        export NLS_LANG=AMERICAN_AMERICA.UTF8
        export PATH=$PATH:$ORACLE_HOME

4. Add file `$TNS_ADMIN/tnsnames.ora` with content like this:

        ORCL =
        (DESCRIPTION =
         (ADDRESS = 
            (PROTOCOL = TCP)
            (HOST = hostname)
            (PORT = 1521) 
         )
         (CONNECT_DATA =
           (SERVER = DEDICATED)
           (SERVICE_NAME = sid)
         )
        ) 

Of course, you can use another path instead of `/opt/oracle` to put instant client files. 

