fotorama_options = {
    'nav': 'dots'
}

fotorama_thumbs = {
    'nav': 'thumbs'
}

dug_templates = {
    'thumbs': '<<#photoset.photo>>\
                <a href="http://farm<<farm>>.static.flickr.com/<<server>>/<<id>>_<<secret>>.jpg"><<title>>\
                <img src="http://farm<<farm>>.static.flickr.com/<<server>>/<<id>>_<<secret>>_t.jpg" />\
                </a>\
               <</photoset.photo>>',
    'dots': '<<#photoset.photo>>\
                    <a href="http://farm<<farm>>.static.flickr.com/<<server>>/<<id>>_<<secret>>.jpg"><<title>></a>\
             <</photoset.photo>>'
}


$(function() {

  $('.photos').fotorama(fotorama_options);
  
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


