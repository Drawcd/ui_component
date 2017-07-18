/**
 *  Accordion menu CSS
 *
 */

/**
 *  ※ show/hide 형태의 아코디언 메뉴
 *  ※ CSS 코딩 : styleing, hide
 *  1. 마우스 클릭했을 때 sub 메뉴가 show / hide
 *  2. 클릭한 1 depth 의 sub메뉴가 보일 때 다른 1 septh의 sub 메뉴는 안보여야 함
 *  3. sub 메뉴가 보일 때 화살표는 윗 방향 화살표로 변경
 *  4. sub 메뉴가 안보이게 될 때 화살표는 아랫방향 화살표로 변경
 */


/**
 *  ※ sub 메뉴의 영역이 늘어났다/줄어들었다. 형태의 아코디언 메뉴
 *  ※ CSS 코딩 : styleing, 줄어듬( 높이:0)
 *  1. 마우스를 클릭했을 때 sub 메뉴가 늘어남/ 즐어듬
 *  2. 클릭한 1 depth의 sub 메뉴가 늘어날 때 다른 1 depth의 sub 메뉴는 줄어들어야 함
 *  3. sub 메뉴가 보일 때 화살표는 윗 방향 화살표로 변경
 *  4. sub 메뉴가 안보이게 될 때 화살표는 아랫방향 화살표로 변경
 */

// each()함수 참고
// function init(){
//   $('.lnb-depth2').each(function(i, em){
//     console.log( i, em ); // 일치하는 각 요소에 대해 함수를 실행하여 jQuery 객체를 반복합니다
//     console.log( $(this).height() ); 높이를 읽어 온다
//     console.log($(this) );
//     console.log($(this)[0] ); // 대괄호로 인덱스 값을 주어 내용을 확인 console창에서 내용을 확인 할 수도 있다.
//   });
// }

//    배열 변수 사용
//    $(function(){
//   var arr = [];
//    //선언부
//    function init(){
//      $('.lnb-depth2').each(function(index){
//        arr[index] = $(this).height();
//      });
//    }
// });

$(function() {

  // 선언부
  function init() {
    // 처음 로딩되었을 때 상태
    $('.lnb-depth1-link').data({
      'open': 'false'
    });
    //each() : 요소 개수만큼 반복하는 함수
    $('.lnb-depth2').each(function(index) {
      // console.log( $(this).height() );
      $(this).data({
        'height': $(this).height()
      }).css({
        height: 0
      }); // 중괄호를 사용 할 경우 객체 property 처럼 작성 할 수 있다.
      console.log($(this).data('height'));
      // $(this).css({height : 0});
      // console.log($(this) );
      // console.log($(this)[0] );
    });
  }



  //실행부
  init(); //  함수 호출

  //    $(this).next().stop().animation({ 값 } , 시간 , 콜백함수 );
  //    jQuery DOM을 단계 별로 찾아갈 때,
  //    값 부분에 $(this)를 사용하면 처음 찾은 $(this)를 의미
  //    콜백 함수 부분에 $(this)를 사용하면 최종으로 찾은 DOM요소가 $(this)가 됨
  $('.lnb-depth1-link').on('click', function(e) {
    e.preventDefault();

    if ($(this).data('open') == 'false') {
      /*
      $(this).next().stop().animate({key : value},시간,콜백함수)
      ** jQuery DOM을 단계별로 찾아갈 때,
      : 첫번 째 인수의 value 부분에 $(this) 를 사용하면 처음 찾은 $(this)를 의미
      : 콜백함수 부분에 $(this)를 사용하면 최종으로 찾은 DOM요소가 $(this)가 됨.
      */
      $(this).next().stop().animate({
        height: $(this).next().data('height')
      });

      $(this).parent().siblings().children('.lnb-depth2').stop().animate({
        height: 0
      });

      $(this).data({
        'open': 'true'
      });
      $(this).parent().siblings().children('.lnb-depth1-link').data('open', 'false');

    } else {
      $(this).next().stop().animate({
        height: 0
      });
      $(this).data('open', 'false');
    }
  });

  //End
});
