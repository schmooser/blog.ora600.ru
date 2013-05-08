---
layout: post
title: Clustering factor 
lang: ru
---

The clustering factor is the number of times Oracle, when scanning the whole index in order, would have to swap to a different Table block to look up the table record for each index entry. If it is close to the number of blocks in the table, then the clustering factor is low and the order of records in the table matches the order of entries in the index.

This would make index range scans that need to visit the table reasonably efficient. If the clustering factor is close to the number of records in the table then it means there is no correlation between index order and table row order and such index ranges scans that have to visit the table would be inefficient.

[Источник](http://mwidlake.wordpress.com/2011/07/26/iot-2-first-examples-and-proofs/)
