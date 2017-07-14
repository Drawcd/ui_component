/**
 * Gnb Menu jQuery
 */

$(function(){

  // depth1 border 늘어나는 모션 효과
  $('.menu-depth1-link').on('mouseenter', function(){
    $(this).children('.menu-depth1-border').stop().animate({
      width : 64
    },300);
    // jQuery로는 가상클래스에 접근 할 수 없다. 아래 예)
    // $(this).children(':after').animate({
    //   width : 64
    // });

    // depth2 메뉴 늘어나는 모션 효과
    var depth1Index = $(this).index('.menu-depth1-link');
    var motionHeight = 54;
    console.log(depth1Index);

    if (depth1Index == 1 ){
      motionHeight = 80;
    }

    $(this).next('.menu-depth2-wrap').css({'z-index': 10}).stop().animate({
      height : motionHeight,
      opacity : 1
    },300, function(){              // 나타나기전에 사라지는 모션이 작동되다보니 시각적으로 불편함을 없애기 위해 늘어나는 동작을 진행한후 콜백함수를 이용하여 다음 동작으로 나머지 서브메뉴를 줄어들게 한다.
      $(this).parent().siblings().children('.menu-depth2-wrap').css({'z-index' : 0}).stop().animate({
        height : 0,
        opacity : 0
      },200);
      // $(this) = .menu-depth2-wrap 이다
      console.log($(this)); // .상위 this 참조 하여 .menu-depth1-link 같지만 현재 포함되어 있는 함수의 .menu-depth2-wrap 현재위치를 인지한다.
    });
  });

$('.menu-depth1-link').on('mouseleave', function(){
  $(this).children('.menu-depth1-border').stop().animate({
    width : 0,
    opacity : 0
  },200);
});

    // depth1 border 즐어드는 모션 효과
  $('.menu-depth1').on('mouseleave', function(){
    // depth2 메뉴 줄어드는 모션 효과
    $('.menu-depth2-wrap').stop().animate({
      height : 0,
      opacity : 0
    },300);
  });

//End
});
