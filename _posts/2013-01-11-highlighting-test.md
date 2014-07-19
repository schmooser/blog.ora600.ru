---
layout: post
title: "Highlighting test"
category: blog 
tags: [jekyll, highlighting, github_pages]
---
I experienced problem with building pages on GitHub pages service. [It's said](https://help.github.com/articles/using-jekyll-with-pages) to try to run jekyll locally and I did it successfully. After few experiments I found that an error is caused by existance of highlighting of code in post. After I dropped all highlighting error vanished. In this test post I will try to highlight some code to test code hightlighting.

### Ruby

{% highlight ruby %}
def foo
  puts 'foo'
end
{% endhighlight %}
