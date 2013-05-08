---

layout: post
title: Removing ^M from text file
lang: en

---

To remove the ^M characters from a MS-DOS file, enter the command:

    :%s/{Ctrl+V}{Ctrl+M}//{Enter}

On Windows use `Ctrl+Q` instead of `Ctrl+V`.
