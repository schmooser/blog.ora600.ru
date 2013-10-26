$(function() {
    $('.photos').fotorama({
       'nav': 'dots'
     });

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
