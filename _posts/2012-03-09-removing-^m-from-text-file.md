---

layout: post  
title: Removing ^M from text file in VIM  
category: vim  

---

To remove the ^M characters from a MS-DOS file, enter the command:

    :%s/{Ctrl+V}{Ctrl+M}//g

On Windows use `Ctrl+Q` instead of `Ctrl+V`.
