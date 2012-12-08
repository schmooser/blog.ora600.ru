---
layout: post
title: "Things to remember #1"
description: "First note in series of 'things to remember' notes"
category: linux
tags: [linux]
---

* To setup LAMP on Ubuntu >10.04 you can use a command:

        sudo apt-get install lamp-server^
        
* To make Ubuntu Desktop starts in command-line mode:

   1. Open file `/etc/default/grub`
   2. Find `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"`
   3. Edit it to `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash text"`
   4. Update grub with `update-grub`
   5. Reboot
   
    To start GUI use command `startx`.

* In OS X to use `sed` inline, use `sed -i ""` instead of just `sed -i`. With this you'll avoid `Unknown mode error`. To replace string in multiple files, one could use

        sed -i "" 's/search/replace/g' *.txt

* To enable remote access to `mysql` edit `/etc/mysql/my.conf` file. Replace `127.0.0.1` in the line `bind-address = 127.0.0.1` with your external ip. Details are [here](http://chosencollective.com/technology/how-to-enable-remote-access-to-mysql).

* MySQL has a very primitive SQL dialect. For example, it can't delete rows from table where ids are from subquery on the same table. In the case you need to do this, you can use `DELETE FROM table WHERE id in (select * from (select id from table) q)`. Details [here](http://stackoverflow.com/questions/4562787/how-to-delete-from-select-in-mysql).
