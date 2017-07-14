/**
 *  tab Menu jQuery
 */

 $(function(){

  $('.tab-heading').on('click',function(e){

    e.preventDefault();

    console.log($(this).index('.tab-heading'));

    var tabIndex = $(this).index('.tab-heading');

    $('.tab-heading>a').removeClass('on');
    $('.tab-heading').eq(tabIndex).children('a').addClass('on'); //children 내용은 a 태그를 찾는 내용

    $('.tab-content').fadeOut(100);
    $('.tab-content').eq(tabIndex).fadeIn(500);

  });

 });
