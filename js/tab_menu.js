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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl90YWJfbWVudV9jc3MuanMiLCJfdGFiX21lbnVfanF1ZXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0YWJfbWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiAgdGFiIE1lbnUgQ1NTXHJcbiAqL1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG4gICQoJy5jc3MtdGFiLWhlYWRpbmcnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZygkKHRoaXMpLmluZGV4KCcuY3NzLXRhYi1oZWFkaW5nJykpO1xyXG5cclxuICAgIHZhciB0YWJJbmRleCA9ICQodGhpcykuaW5kZXgoJy5jc3MtdGFiLWhlYWRpbmcnKTtcclxuXHJcbiAgICAkKCcuY3NzLXRhYi1oZWFkaW5nPmEnKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICQoJy5jc3MtdGFiLWhlYWRpbmcnKS5lcSh0YWJJbmRleCkuY2hpbGRyZW4oJ2EnKS5hZGRDbGFzcygnb24nKTsgLy9jaGlsZHJlbiDrgrTsmqnsnYAgYSDtg5zqt7jrpbwg7LC+64qUIOuCtOyaqVxyXG5cclxuICAgICQoJy5jc3MtdGFiLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICQoJy5jc3MtdGFiLWNvbnRlbnQnKS5lcSh0YWJJbmRleCkuYWRkQ2xhc3MoJ29uJyk7XHJcblxyXG4gIH0pO1xyXG5cclxufSk7XHJcbiIsIi8qKlxyXG4gKiAgdGFiIE1lbnUgalF1ZXJ5XHJcbiAqL1xyXG5cclxuICQoZnVuY3Rpb24oKXtcclxuXHJcbiAgJCgnLnRhYi1oZWFkaW5nJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coJCh0aGlzKS5pbmRleCgnLnRhYi1oZWFkaW5nJykpO1xyXG5cclxuICAgIHZhciB0YWJJbmRleCA9ICQodGhpcykuaW5kZXgoJy50YWItaGVhZGluZycpO1xyXG5cclxuICAgICQoJy50YWItaGVhZGluZz5hJykucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcbiAgICAkKCcudGFiLWhlYWRpbmcnKS5lcSh0YWJJbmRleCkuY2hpbGRyZW4oJ2EnKS5hZGRDbGFzcygnb24nKTsgLy9jaGlsZHJlbiDrgrTsmqnsnYAgYSDtg5zqt7jrpbwg7LC+64qUIOuCtOyaqVxyXG5cclxuICAgICQoJy50YWItY29udGVudCcpLmZhZGVPdXQoMTAwKTtcclxuICAgICQoJy50YWItY29udGVudCcpLmVxKHRhYkluZGV4KS5mYWRlSW4oNTAwKTtcclxuXHJcbiAgfSk7XHJcblxyXG4gfSk7XHJcbiJdfQ==
