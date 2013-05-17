---
layout: post
title: "Downloading archive of Listen to English podcast"
description: "How to download podcast files from Internet and put them on iPod in Podcast section."
category: projects
---

I like to listen Listen to English podcast. It's host Peter Carter choose interesting topics and have a nice english pronunciation. I started to listen the podcast about one and a half year ago. Since then there were a dozen of a new episodes. I also listened all old episodes available on iTunes. Unfortunately, the RSS feed of the podcast consists only about 30 episodes and now the oldest one is about 2 year old. The total number of episodes is about 300, so I decided to download them from archive section on [podcast's site][listen-to-english].

There is no 'Download all' button, in order to download an episode you have to go on episode's page and check on download link. The link looks like this – `http://www.listen-to-english.com/get.php?web=j55.mp3` where `55` before `mp3` is the id of an episode.

I decided to I wrote simple python script which loops from 1 till 500 and downloads all of mp3's.

{% highlight python %}
# -*- coding: utf-8 -*-
import urllib2

url = 'http://www.listen-to-english.com/get.php?web=j%d.mp3'
target_dir = '/path/to/target/dir'

for i in range(1,600):
  print i
  mp3 = urllib2.urlopen(url % i)
  try:
    header = mp3.read(6)
    if 'Fatal' in header:
      continue
    localmp3 = open('%s/%d.mp3' % (target_dir, i), 'wb')
    localmp3.write(header)
    localmp3.write(mp3.read())
    localmp3.close()
    print '%d - done!' % i
  except IOError, e:
    print 'Download error'
          
print 'Done'
{% endhighlight %}

This script also checks whether the response of server is not like `Fatal error ...`, because the episode's ids are sparsed.

After the script done its work I checked whether downloaded files are a valid mp3's. To do this I used on OS X 10.8 console tool `afinfo`, which shows information about audio file:

{% highlight bash %}
for item in `ls -rS *.mp3`
do
  a=`afinfo $item 2> /dev/null | grep "bit rate" | wc -l`
  if [ $a -ne 1 ]
  then
    echo $item; 
    rm $item;
  fi
done
{% endhighlight %}

Now we have normal mp3s. How to import them into iTunes into Podcast section in correct podcast? After googling I found [a post][adding-podcast-to-iTunes] a solution: 

> This method seems to work very well! After doing this, the file gets added to the "Podcasts" section AND shows up under the correct podcast heading. (And all without messing around with XML and hosts files.) In addition to: ITUNESPODCAST ITUNESPODCASTDESC ITUNESPODCASTID ITUNESPODCASTURL One must also add: RELEASETIME With an example value: 2008-03-07T17:30:00Z To get the podcast to show in the chronologically correct spot.

All I have to do is to add ID3v2 tags into mp3s. How to do this? I found a couple of tools for OS X to dealing with ID3 tags, but only one – [ID3 Editor][id3-editor] – has a command line tool (i.e. to batch processing which i need) and ability to edit podcast tags. The script of batch operation on files looks like this:

{% highlight bash %}
pcfd="http://feeds.feedburner.com/ListenToEnglish-LearnEnglish"
for item in `ls *.mp3`
do
  pcid="http://www.listen-to-english.com/index.php?id=${item%.mp3}";
  echo $pcid:
  id3edcmd -pcon -pcid $pcid -pcfd $pcfd $item;
done
{% endhighlight %}

But the tool costs $15, which is not acceptable to use such kind of single work. Trial version have a limit to 20 program runs. One run is the one change of mp3 file.

After a long 2-day search the only worked solution I found is to add media to iTunes library as an ordinary music, then edit all of the files to have the same Artist and Album and set Media type to Podcast. After that all of them are appear in the Podcast section in iTunes.

Happy listening!


[listen-to-english]: http://www.listen-to-english.com
[adding-podcast-to-iTunes]: http://markbowers.org/home/itunes-podcast-fix#comment-5056
[id3-editor]: www.pa-software.com/id3editor/ 
[useful-python-scripts]: http://wiki.python.org/moin/UsefulModules
[mutagen]: http://code.google.com/p/mutagen/
