---
layout: post
lang: en
title: SSL Sertificate problem in ruby 2.0 on OS X
category: ruby
---

I've experienced problem in ruby 2.0 with SSL Sertificate on OS X while using
gems which get data from HTTPS.

The error

    error: SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed

occured.

To solve the problem with brew use:

    brew tap raggi/ale
    brew install openssl-osx-ca

After applying this everything is fine again. Solution found in
[blog by Tadas Tamosauskas](https://coderwall.com/p/mpbmxg).

