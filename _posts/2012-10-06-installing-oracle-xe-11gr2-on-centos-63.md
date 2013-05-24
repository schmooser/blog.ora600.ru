---

layout: post  
title: "Installing Oracle XE 11gR2 on CentOS 6.3"  
description: "This post covers installation of Oracle XE on CentOS"  
category: oracle  
tags: [oracle, centos]  

---

[This][david-ghedini-install-oraxe-on-centos] great tutorial covers all aspects of installation Oracle XE 11gR2 on CentOS 6. 

Except two things. 

### Swap file

Oracle XE [requires][oracle-xe-swap] minimum 2 Gb of swap file. To verify your swap space use `#cat /proc/swaps`. If there is no enough swap size – add it. Manual is [here][swap]. I add it by using this:

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


### Hostname resolving

There is an error during configuration of database's setup (Step 2, running `oracle-xe configure` command). It fails with the following statement:

> Database Configuration failed. Look into /u01/app/oracle/product/11.2.0/xe/config/log for details

I found a solution in [Arne Kroger's blog][solution] — if you'll check errors in log files, mentioned inerror message, with `cat *.log | grep ORA-` you'll see that it can't find a host with your system name. All you have to do is edit `/etc/hosts` file adding the line

{% highlight ini %}
127.0.0.1	centos63
{% endhighlight %}

After restarting of `oracle-xe configure` everything should be fine.

[Official documentation][oracle-xe-11gr2-official]

[oracle-xe-swap]: http://docs.oracle.com/cd/E17781_01/install.112/e18802/toc.htm
[swap]: http://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-swap-adding.html
[david-ghedini-install-oraxe-on-centos]: http://www.davidghedini.com/pg/entry/install_oracle_11g_xe_on
[solution]: http://arnekroeger.blogspot.com/2011/09/oracle-11g-xe-installation-error.html
[oracle-xe-11gr2-official]: http://docs.oracle.com/cd/E17781_01/index.htm
