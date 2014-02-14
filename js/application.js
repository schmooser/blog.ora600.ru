
fotorama_options = {
    'dots': {
        'nav': 'dots'
    },
    'thumbs': {
        'nav': 'thumbs'
    }
}


function fotorama_option(name) {
    name = name == '' ? 'dots' : name;
    return fotorama_options[name]
}


FLICKR_BASE_URL = "http://farm{{farm}}.static.flickr.com/{{server}}/{{id}}_{{secret}}%SIZE%.jpg"


dug_templates = {
    'thumbs': '{{#photoset.photo}}\
                <a href="%FLICKR_URL%">{{title}}\
                  <img src="%FLICKR_THUMB_URL%" />\
                </a>\
               {{/photoset.photo}}',
    'dots': '{{#photoset.photo}}\
                    <a href="%FLICKR_URL%">{{title}}</a>\
             {{/photoset.photo}}'
}


function dug_template(name, size) {
    name = name == '' ? 'dots' : name;
    var template = dug_templates[name]
    var flickr_thumb_url = FLICKR_BASE_URL.replace(/%SIZE%/, '_t')
    var flickr_url;
    if (size == '')
        flickr_url = FLICKR_BASE_URL.replace(/%SIZE%/, '');
    else
        flickr_url = FLICKR_BASE_URL.replace(/%SIZE%/, '_'+size);
    template = template.replace(/%FLICKR_URL%/, flickr_url);
    template = template.replace(/%FLICKR_THUMB_URL%/, flickr_thumb_url);
    return template;
}


$(function() {

  $('.photos').fotorama(fotorama_options.dots);
  
  $('span.code').each(function(){
    var url = $(this).children('a').attr('href')
    var a = $('<a>')
    $(a).attr('href', url).html('View source')
    $(this).html('&nbsp;')
    $('<iframe>', {
     src: url,
     frameborder: 0,
     scrolling: 'no'
     }).appendTo(this)
    $(this).append($('<p>').append(a))
  })

});


