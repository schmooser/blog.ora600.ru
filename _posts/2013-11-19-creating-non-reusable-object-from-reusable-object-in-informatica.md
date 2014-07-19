---
layout: post
title: Creating non-reusable object from reusable object in Informatica
category: informatica
lang: en
---

After two years of working with Informatica PowerCenter I finally found the way to create non-reusable object from reusable one. It works for transformations as well as for sessions.

The solution was found in [FolksTalk blog].

All you've got to do is to locate an object you want to create as non-reusable in Navigator Window (panel with object tree) and drag your reusable object to your working area with mapping/mapplet/workflow/worklet opened. After drag to working area but before drop press Control (plus sign will appear at the mouse pointer) and release the mouse. The confirmation dialog "Are you want to copy?" will appear. Press Yes and you'll get non-reusable version of reusable object.

This tip saves me a lot of time while developing in Informatica PowerCenter.

[FolksTalk blog]: http://www.folkstalk.com/2010/04/creating-non-reusable-object-from.html
