+++
Title = "Safe remove directory contents in shell"
Date = "2015-07-16"
+++

Sometimes you might need to delete content of a directory but not the directory
itself. For example, you have git project and need to clean-up the content to
put generated code further, but you don't want to delete entire directory along
with `.git` folder inside.

Obvious way to do it is this:

    $ rm -rf $DIR/*

I used to use this pattern a lot (even for generating this blog, [generate.sh]
script). Until yesterday. Developer in my team wrote the following code, but
when something went wrong on the first attempt he thought that the problem is
that variable (Jenkins `$WORKSPACE` variable) should be written in lowercase.
And... ta-da... it successfully completed. But, sinse `$workspace` variable has
not been defined, bash shanged it to empty string and the command became:

    $ rm -rf /*

And it deleted everything for the user he was warking on. Luckily enough, we use
least required privileges approach so nothing harmful was done.

So, to protect yourself from anything bad happens use the following form:

    $ rm -rf ${DIR:-"NULL"}/*

This form allows to check whether `$DIR` variable is not set or is empty and in
such case replace it with `NULL` string. Thus you'll prevent yourself from
disaster.

Links:

* [Parameter Substitution in Bash](http://www.tldp.org/LDP/abs/html/parameter-substitution.html)


[generate.sh]: https://github.com/schmooser/blog.ora600.ru/blob/hugo/generate.sh
