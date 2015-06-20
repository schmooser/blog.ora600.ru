---

layout: post  
title: "Installing Oracle XE 11gR2 on CentOS 6"  
description: "This post covers installation of Oracle XE on CentOS"  
category: oracle  
tags: [oracle, centos]  

---

[This][david-ghedini-install-oraxe-on-centos] great tutorial covers all aspects of installation Oracle XE 11gR2 on CentOS 6. 

I also did [backup post][backup-post] of it.

Except some things. 

## Swap file

Oracle XE [requires][oracle-xe-swap] minimum 2 Gb of swap file. To verify your swap space use `# cat /proc/swaps`. If there is no enough swap size – add it. Manual is [here][swap]. I add it by using this:

> ####5.2.3. Creating a Swap File
>
> To add a swap file:
>
> 1. Determine the size of the new swap file in megabytes and multiply by 1024 to determine the number of blocks. For example, the block size of a 64 MB swap file is 65536.
>
> 2. At a shell prompt as root, type the following command with count being equal to the desired block size:
>
>        dd if=/dev/zero of=/swapfile bs=1024 count=65536
>
> 3. Setup the swap file with the command:
>
>        mkswap /swapfile
>
> 4. To enable the swap file immediately but not automatically at boot time:
>
>        swapon /swapfile
>
> 5. To enable it at boot time, edit /etc/fstab to include the following entry:
>
>        /swapfile          swap            swap    defaults        0 0
>
>    The next time the system boots, it enables the new swap file.
>
> 6. After adding the new swap file and enabling it, verify it is enabled by viewing the output of the command cat `/proc/swaps` or `free`.


## Hostname resolving

There is an error during configuration of database's setup (Step 2, running `oracle-xe configure` command). It fails with the following statement:

> Database Configuration failed. Look into /u01/app/oracle/product/11.2.0/xe/config/log for details

I found a solution in [Arne Kroger's blog][solution] — if you'll check errors in log files, mentioned inerror message, with `cat *.log | grep ORA-` you'll see that it can't find a host with your system name. All you have to do is edit `/etc/hosts` file adding the line

{% highlight ini %}
127.0.0.1	centos63
{% endhighlight %}

After restarting of `oracle-xe configure` everything should be fine.

## Changing HTTP port of APEX

During install I put APEX on port 80. It's privileged port and can be runned only by root, not oracle. So, after setup APEX wasn't working. I changed port to 8080 with this commands:

Getting info about current port:

    SQL> select dbms_xdb.gethttpport as "HTTP-Port"
                , dbms_xdb.getftpport as "FTP-Port" from dual;

    HTTP-Port   FTP-Port
    ---------- ----------
            80          0

Changing to desired value:

    SQL> begin
     2    dbms_xdb.sethttpport('8080');
     3    dbms_xdb.setftpport('2100');
     4  end;
     5  /

0 means that port is disabled.

Additional info in [this][change-ports] post by daust.


## Upgrading APEX

Default APEX in Oracle XE is outdated. Download new version and install. Upgrade process is [covered here][upgrade-apex]. Complete manual is [here][apex-install-guide].

[Official documentation of Oracle XE.][oracle-xe-11gr2-official]

Tested on CentOS 6.3 and 6.4.

[oracle-xe-swap]: http://docs.oracle.com/cd/E17781_01/install.112/e18802/toc.htm
[swap]: http://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-swap-adding.html
[david-ghedini-install-oraxe-on-centos]: http://www.davidghedini.com/pg/entry/install_oracle_11g_xe_on
[solution]: http://arnekroeger.blogspot.com/2011/09/oracle-11g-xe-installation-error.html
[oracle-xe-11gr2-official]: http://docs.oracle.com/cd/E17781_01/index.htm
[backup-post]: {% post_url 2013-05-24-install-oracle-xe-on-centos-6 %}
[change-ports]: http://daust.blogspot.ru/2006/01/xe-changing-default-http-port.html
[upgrade-apex]: http://www.oracle.com/technetwork/developer-tools/apex/upgrade-apex-for-xe-154969.html
[apex-install-guide]: http://docs.oracle.com/cd/E37097_01/doc/install.42/e35123/toc.htm
