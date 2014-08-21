
fotorama_options = {
    'dots': {
        'nav': 'dots',
        'allowfullscreen': 'native'
    },
    'thumbs': {
        'nav': 'thumbs',
        'allowfullscreen': 'native'
    }
}


function fotorama_option(name) {
    name = name == '' ? 'dots' : name;
    return fotorama_options[name]
}


FLICKR_BASE_URL = "http://farm{{farm}}.static.flickr.com/{{server}}/{{id}}_{{secret}}%SIZE%.jpg"


dug_templates = {
    'thumbs': '{{#%ENDPOINT%.photo}}\
                <a href="%FLICKR_URL%">{{title}}\
                  <img src="%FLICKR_THUMB_URL%" />\
                </a>\
               {{/%ENDPOINT%.photo}}',
    'dots': '{{#%ENDPOINT%.photo}}\
                    <a href="%FLICKR_URL%">{{title}}</a>\
             {{/%ENDPOINT%.photo}}'
}


function dug_template(name, size, endpoint) {
    name = name == '' ? 'dots' : name;
    var template = dug_templates[name]
    var flickr_thumb_url = FLICKR_BASE_URL.replace(/%SIZE%/, '_t')
    var flickr_url;
    if (size == '') {
        console.log('default size');
        flickr_url = FLICKR_BASE_URL.replace(/%SIZE%/, '');
    }
    else {
        console.log('explicit size');
        flickr_url = FLICKR_BASE_URL.replace(/%SIZE%/, '_'+size);
    }
    console.log(flickr_url);
    template = template.replace(/%FLICKR_URL%/g, flickr_url);
    template = template.replace(/%FLICKR_THUMB_URL%/g, flickr_thumb_url);
    template = template.replace(/%ENDPOINT%/g, endpoint);
    return template;
}


$(function() {
  $('.photos').fotorama(fotorama_options.dots);
});


