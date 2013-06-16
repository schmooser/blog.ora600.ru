---

layout: post  
title: Syncing Instagram with Flickr  
description: In this post I am announcing a script to synchronization
             Instagram with Flickr using high-res photos  
category: projects  

---

##Problem 

In my opinion, [Flickr] is the best photo service online. It's abilities to
organize photos and beautiful design makes me happy using It. From other hand,
[Instagram] is the best portable camera app with huge user community, nice
pre-defined filters and social features.

I know 2 options to copy photos from Intagram to Flickr. You can upload (share)
your photo to Flickr right from Instagram via sharing options. Unfortunately,
you have to share each photo directly, and it's so annoying. And you can use a
service [IFTTT], which can copy each new photo from Instagram photostream to
Flickr. I had used this approach in my previous vacations in
[Germany and Holland] and [Spain] in 2012.

The common problem with both this options is that Instagram saves in it's
servers only the small-sized photo. Currently, it's a 612x612 px. So, the same
small photo goes to Flickr. The original photo is saved to your phone and has
in case of my girlfriend's iPhone 4S the size of 2048x2048 px. I'd like to have
a mechanizm to putting the full-sized photos from iPhone to Flickr with
replacing small Instagram photos.

I've decided to write synchronization script. It should be works like this: you
put photos from iPhone into a local folder in your computer. Then run a script
and it does everything.

##Limits

The first limit to do this – you have to have a pro Flickr account, which allows you to replace photo without deleting and uploading a new one. I have one. 

The second issue – how to bind original photo from iPhone to an existing Flickr photo? They have different names, an iPhone's photo has EXIF information while Flickr's (which comes from Instagram) doesn't have one. I put an Instagram URL into a photo caption on Flickr, so I can bind Flickr's photo with the one on Instagram and from Instagram via API I can get some information about photo. Geo tags, for example. Unfortanutely, they are differ. I think it happened because into original photo on iPhone saved a geo coordinates of the place where you were while shooting. In Instagram goes information where you were when you're *uploading* photo. The same is about original dates when photo was taken. They have everything different.

The only idea I have about binding photos is to calculate some statistical properties of a photos and comparing them. There are many methods to do this, for example [this one][stackoverflow-image-comparison-algorithm]. To use it you've to have some python packages to be installed – `scipy` and `numpy`. I wrote [a post][installing-scipy-numpy] about installing them on Mac OS X.

<!--You have to copy photos from your phone to a folder in your computer and then run the script `Instagram2Flickr.py`.-->

## Approach

To be continued...


[Flickr]: http://flickr.com
[Instagram]: http://instagr.am
[Germany and Holland]: http://localhost
[Spain]: http://localhost
[IFTTT]: http://ifttt.com 
[stackoverflow-image-comparison-algorithm]: http://stackoverflow.com/questions/1819124/image-comparison-algorithm
[installing-scipy-numpy]: /2012/09/30/installing-scipy-and-numpy-in-macosx.html
