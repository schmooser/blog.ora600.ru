---
layout: post
title: "Installing cx_Oracle on CentOS 5.8"
description: "Description of installation of python's module for Oracle database"
category: oracle
tags: [oracle, centos, python]
---

In this post I'll cover an installation of `cx_Oracle` module, which is the Python module for accessing Oracle Database, on CentOS 5.8. 
Check for Python version:

        $python -V
        Python 2.4.3

Go to [cx_Oracle's web site](http://cx-oracle.sourceforge.net) and download rpm-package you have to use. I downloaded package for Oracle 11g, Python 2.4.

Install package with:

        $sudo rpm -ivh cx_Oracle-5.1.2-10g-py24-1.x86_64.rpm

Try to run Python and type:

        $python
        Python 2.4.3 (#1, Jun 18 2012, 08:55:23) 
        [GCC 4.1.2 20080704 (Red Hat 4.1.2-52)] on linux2
        Type "help", "copyright", "credits" or "license" for more information.
        >>>import cx_Oracle

If there is no errors then you have `cx_Oracle` successfully installed. I had an error:

        >>> import cx_Oracle
        Traceback (most recent call last):
          File "<stdin>", line 1, in ?
        ImportError: libclntsh.so.10.1: cannot open shared object file: No such file or directory

May be, that's because I have Oracle 11g installed, but downloaded cx_Oracle for Oracle 10g. Well, let's uninstall previously installed rpm package. Firstly, find a package name with:

        $rpm -qa | grep -i oracle
        
Then uninstall it: 

        $sudo rpm -e cx_Oracle-5.1.2-1

After installing proper package, error still exists. Where to find this library? Google it. I found, that all I have to do is add this line to `.bashrc`:

        LD_LIBRARY_PATH=$ORACLE_HOME/lib:/lib:/usr/lib; export LD_LIBRARY_PATH
        
Now cx_Oracle works!
