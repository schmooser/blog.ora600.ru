---

layout: post
title: Mounting CDROM on Ubuntu Server
description: How to mount cdrom on freshly installed Ubuntu Server
category: linux

---

1. Create directory

        sudo mkdir /mnt/cdrom

2. Add to `/etc/fstab` (via `sudo`)

        /dev/cdrom /mnt/cdrom auto noauto,sync 0 0

3. Mount it with

        sudo mount cdrom
