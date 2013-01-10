---
layout: post
title: "Installing Oracle XE 11gR2 on CentOS 6.3"
description: "This post covers installation of Oracle XE on CentOS"
category: oracle
tags: [oracle, centos]
---

[This][david-ghedini-install-oraxe-on-centos] great tutorial covers all aspects of installation Oracle XE 11gR2 on CentOS 6. Except one thing. There is an error during configuration of database's setup (Step 2, running `oracle-xe configure` command). It fails with the following statement:

> Database Configuration failed. Look into /u01/app/oracle/product/11.2.0/xe/config/log for details

I found a solution in [Arne Kroger's blog][solution] — if you'll check errors in log files, mentioned inerror message, with `cat *.log | grep ORA-` you'll see that it can't find a host with your system name. All you have to do is edit `/etc/hosts` file adding the line

{% highlight %}
127.0.0.1	centos63
{% endhighlight %}

After restarting of `oracle-xe configure` everything should be fine.

[Official documentation][oracle-xe-11gr2-official]

[david-ghedini-install-oraxe-on-centos]: http://www.davidghedini.com/pg/entry/install_oracle_11g_xe_on
[solution]: http://arnekroeger.blogspot.com/2011/09/oracle-11g-xe-installation-error.html
[oracle-xe-11gr2-official]: http://docs.oracle.com/cd/E17781_01/index.htm
