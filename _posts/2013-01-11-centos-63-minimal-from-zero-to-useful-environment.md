---

layout: post  
title: "CentOS 6 minimal from zero to useful environment"  
category: linux  
description: "I describe how to set up network, install VM additions and install
Oracle Instant Client"  

---

> There is a great post "[My First 5 Minutes On A Server][my-first-5-minutes]"
> by Bryan Kennedy which covers security aspects.

After installing CentOS 6 in minimal configuration you'll get a simple
login shell with some useful options missed. Let's install them.

##Network

Check it with command `ifconfig`. If there is only `lo` interface then network
is shut down. Start it up with 

    $ ifconfig eth0 up

Check `ifconfig` again. If there is no IPv4 address attached to `eth0`
interface, get one with 

    $ dhclient eth0

Then check again, usually everything is ok and you can ping something with `ping
ya.ru`. If you want to keep this change permanent, so that `eth0` would start at
boot, you've got to change `ONBOOT="no"` to `ONBOOT="yes"` in
`/etc/sysconfig/network-scripts/ifcfg-eth0` config file.

##System settings

To turn off 3 seconds delay during startup edit file `/etc/grub.conf` and set
`timeout=0`.

If you want to edit hostname, set it in `/etc/sysconfig/network` under
`HOSTNAME` option.

##Users and security

Add your primary user use `useradd username` and then `passwd username` to
change his password.

##VM tools

For comfort use you need VM tools to be installed. Usually tools are installed
via CD image attached to VM's CD-ROM. I
[wrote][mounting-cdrom-on-ubuntu] about mounting CD-ROM on Ubuntu
Sever, but I will repeat. Create directory `mkdir /media/cdrom`, add to
`/etc/fstab` line `/dev/cdrom /media/cdrom auto noauto,sync 0 0`, mount CDROM
with `mount /media/cdrom`.

To install Parallels Tools use `/media/cdrom/install` to install.

To install VirtualBox additions do:

    # yum install make -y
    # yum install gcc -y
    # yum install kernel sources -y
    # yum install kernel-devel -y

Then restart system. After restart, do `/media/cdrom/VBoxLinuxAdditions.run`.
To uninstall additions, do `/media/cdrom/VBoxLinuxAdditions.run uninstall`.

For additional info look at [VirtualBox forums][virtualbox-install-additions].

##Packages

I usually also install this packages:

    # yum install mc sudo unzip man git hg vim nmap -y

Install zsh if you prefer it to bash with `# yum install zsh`.


##Firewall

By default CentOS opens only ssh port. To open other ports you have to modify
iptables rules. Manual for using iptables in CentOS is in the [official
documentation][centos-iptables].

My usual settings are:

    #!/bin/bash
    #
    # iptables configuration script
    #
    # Flush all current rules from iptables
    iptables -F
    #
    # Allow SSH connections on tcp port 22
    iptables -A INPUT -p tcp --dport 22 -j ACCEPT
    #
    # Open needful ports
    iptables -A INPUT -p tcp --dport 80 -j ACCEPT
    iptables -A INPUT -p tcp --dport 8080 -j ACCEPT
    iptables -A INPUT -p tcp --dport 1521 -j ACCEPT
    #
    # Set default policies for INPUT, FORWARD and OUTPUT chains
    iptables -P INPUT DROP
    iptables -P FORWARD DROP
    iptables -P OUTPUT ACCEPT
    #
    # Set access for localhost
    iptables -A INPUT -i lo -j ACCEPT
    #
    # Accept packets belonging to established and related connections
    iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
    #
    # Save settings
    /sbin/service iptables save
    #
    # List rules
    iptables -L -v



*The following sections are optional if you need them on this very machine.*

##Java

To install JRE download appropriate .tar.gz for your distribution, then unpack
it into `/usr/java/` and make symlinks `current` and `latest` pointed to it. In
my case it was:

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

1. Download files `instantclient-basic-linux-11.2.0.3.0.zip` and
   `instantclient-sqlplus-linux-11.2.0.3.0.zip` from [Oracle Instant Client
   download area][oracle-instant-client-downloads]. Be sure to download
   appropriate version for your OS. If you use 64-bit OS then download x86\_64
   version of instant client. Unzip them somewhere, eg.
   `/opt/oracle/instantclient_11_2`.

2. Install `libaio` package.

3. Add this environment variables to `.profile` or `.bashrc`:

       export ORACLE_HOME=/opt/oracle/instantclient_11_2
       export LD_LIBRARY_PATH=/opt/oracle/instantclient_11_2
       export TNS_ADMIN=$ORACLE_HOME/network/admin/
       export NLS_LANG=AMERICAN_AMERICA.UTF8
       export PATH=$PATH:$ORACLE_HOME

4. Add file `$TNS\_ADMIN/tnsnames.ora` with content like this:

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

Of course, you can use another path instead of `/opt/oracle` to put instant
client files.

[my-first-5-minutes]: http://plusbryan.com/my-first-5-minutes-on-a-server-or-essential-security-for-linux-servers
[oracle-instant-client-downloads]: http://www.oracle.com/technetwork/database/features/instant-client/index-097480.html
[virtualbox-install-additions]: https://forums.virtualbox.org/viewtopic.php?t=4960
[centos-iptables]: http://wiki.centos.org/HowTos/Network/IPTables
[mounting-cdrom-on-ubuntu]: {% post_url 2012-09-14-mounting-cdrom-on-ubuntu-server %}
