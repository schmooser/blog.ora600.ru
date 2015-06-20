---

layout: post  
lang: en  
category: oracle  
title: Increasing memory available for Oracle XE 11g  

---

Suppose, you created virtual machine with 1G of RAM and installed Oracle XE on it. In this case Oracle supposedly will use only 512M of RAM. This happened on my CentOS installation.

Then suppose you upgraded your server to 2G and want to allow Oracle to use it's maximum of 1G RAM. 
To get this do the following:

1. Check your parameters `MEMORY_TARGET` and `MEMORY_MAX_TARGET`. Mine was set to ~400M both. You need to increase them to 1G. Due to unavailability to set `MEMORY_MAX_TARGET` in runtime we have to set it in spfile and restart the instance.

2. Set parameters:

       SQL> ALTER SYSTEM SET MEMORY_MAX_TARGET=1G SCOPE=SPFILE;
       SQL> ALTER SYSTEM SET MEMORY_TARGET=1G SCOPE=SPFILE;
       SQL> SHUTDOWN IMMEDIATE;

3. Check for available shared memory in order to pass through ORA-00845. Use `df -h` and look for size of `/dev/shm`. It should be at least as your `MEMORY_TARGET` size. If it's lesser — increase it with

       # umount /dev/shm
       # mount /dev/shm -o size=2048m
    
   Also be sure to set size in `/etc/fstab`:
   
       none             /dev/shm      tmpfs   defaults,size=2048m          0 0
    
4. Startup Oracle. It should now use 1G for `MEMORY_TARGET`.
