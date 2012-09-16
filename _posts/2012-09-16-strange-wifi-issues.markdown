---
layout: post
title: "Strange WiFi issues"
description: "I've experiences some strange WiFi problems on my iPad"
category: 
tags: [ipad, wifi]
---

Yesterday, there were a my girlfriend's guests in our home. They stayed for a night. I am not a friend of them, so I decided to go to bedroom and lay on with reading web with iPad. But, when I tried to browse the web, I had found than Internet is not working. WiFi connection is alive, iPad has an IP and router's address but I can't browse the web. If I switch WiFi off and on Internet appears but for a dozen of seconds. Then it vanishes again. I tried to find some kind of ping utility for iPad. With a number of retries I downloaded a [FreePing] and tried to ping my router on 192.168.1.1. All packets was lost. But, of cource, the WiFi was on and the signal has 2 of 3 bars. 

That was so strange, because my girlfriend's iPhone worked well.

I tried to find out on the Internet if another people experienced such problems. There are a dozens of such problems, discussed on apple.com and there are a [guide of troubleshooting this][apple-wifi-troubleshooting]. I did all of this but it doesn't work. I was gone to sleep. 

Today my problems continued. Then guests gone. And everything became fine. iPad works as before. Fantastic.

But, after iPad gone to sleep and I woke it up the Internet was missed again. After turning WiFi off and on it became working.

Finally, I hopelly fixed this by turning off dhcp on router and by writing static IP's on all of my network devices.

[FreePing]: http://itunes.apple.com/us/app/free-ping/id430758871?mt=8
[apple-wifi-troubleshooting]: http://support.apple.com/kb/TS1398?viewlocale=en_US&locale=en_US
