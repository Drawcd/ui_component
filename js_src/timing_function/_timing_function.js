/**
 * Ease 값 비교
 */

$(function(){
  function repeat(){
    $('.box1').css({top:0}).stop().animate({top:450},2000, 'easeOutBounce');
    $('.box2').css({top:0}).stop().animate({top:450},2000, 'easeInExpo');
    $('.box3').css({top:0}).stop().animate({top:450},2000, 'easeOutExpo');
    $('.box4').css({top:0}).stop().animate({top:450},2000, 'easeInOutExpo');
    $('.box5').css({top:0}).stop().animate({top:450},2000, $.bez([0.17,0.67,0.83,0.67]));
  }

  setInterval(function(){
    repeat();
    console.log();
  },2500);

});
