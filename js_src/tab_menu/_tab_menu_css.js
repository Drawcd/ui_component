/**
 *  tab Menu CSS
 */

$(function(){
  $('.css-tab-heading').on('click', function(e){
    e.preventDefault();

    console.log($(this).index('.css-tab-heading'));

    var tabIndex = $(this).index('.css-tab-heading');

    $('.css-tab-heading>a').removeClass('on');
    $('.css-tab-heading').eq(tabIndex).children('a').addClass('on'); //children 내용은 a 태그를 찾는 내용

    $('.css-tab-content').removeClass('on');
    $('.css-tab-content').eq(tabIndex).addClass('on');

  });

});
