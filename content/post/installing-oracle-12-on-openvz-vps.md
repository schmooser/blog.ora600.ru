+++
date = "2015-05-31T10:17:52+03:00"
title = "Installing Oracle 12c on OpenVZ VPS"
category = "oracle"
tags = ['oracle', 'openvz', '12c']
+++

I have a relatively free server with enough memory and disk space for installing
oracle Database. One caveat here is that it's running under OpenVZ. That means
that there is no swap file available.

I tried to install Oracle XE on this host, cheating a little bit so it think
that there is enough swap file, but when starting oracle-xe configure it failed
with "Unable to attach to shared memory segment" error and Linux error "No space
left on device". I didn't resolve that problem, because `/dev/shm` was present
of enough space and I was able to read/write data there.

So I decided to try to install full-featured Oracle 12c on the server to play
around.

I write this post during installation. Here I'll write all steps and problems
I'll face during installation.

Here are some interesting tutorials I found on web:

* http://www.tecmint.com/oracle-12c-installation-in-centos-6/
* http://dbaora.com/install-oracle-12c-release-1-12-1-on-centos-linux-7/


# 0. Initial config before installation

What we have:

* oracle user from Oracle XE installation

        $ cat /etc/passwd | grep oracle
        oracle:x:502:502::/u01/app/oracle:/bin/bash

* dba user group from Oracle XE installation

        $ cat /etc/group | grep 502
        dba:x:502:

# 1. Intall prerequisites

It's very convinient to install all prerequisites from single rpm package `oracle-rdbms-server-12cR1-preinstall`:

    # /etc/yum.repos.d/
    # wget http://public-yum.oracle.com/public-yum-ol6.repo
    # cd /etc/pki/rpm-gpg
    # wget https://oss.oracle.com/el6/RPM-GPG-KEY-oracle
    # yum install oracle-rdbms-server-12cR1-preinstall -y

Additional information here - [How I Simplified Oracle Database 12c and 11g Installations on Oracle Linux 6][1].

[1]: http://www.oracle.com/technetwork/articles/servers-storage-admin/ginnydbinstallonlinux-488779.html
