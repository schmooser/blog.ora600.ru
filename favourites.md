---

layout: default  
title: Избранное  

---

# {{ page.title }}

{% for post in site.categories.favourites %}
  {% include post.html %}
{% endfor %}

