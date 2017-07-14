/**
 * Gnb Menu CSS
 */


$(function(){
  var timeID; // setInterval, clearInterval에서 사용할 변수

  $('.css-menu-depth1-link').on('mouseenter', function(){
    // removeClass 하기 위해 실행 되고 있는 setInterval 취소
    clearInterval(timeID);

    // promise() : 앞선 동작이 모두 끝난 후 특정 기능을 실행 시킬때 사용
    $(this).next().addClass('on').promise().done(function(){
      console.log( $(this));

      var $depth2Wrap = $(this).parent().siblings().children('.css-menu-depth2-wrap');

      /**
       * clearTimeout(), clearInterval()
       * 위 진행 시간 취소는 되지 않는다.
       * 함수는 횟수를 취소 함수 이므로 한번만 실행되는 settime함수는 정상 작동한다.
       */

      /**
       *  1. 타이머 함수 싱행 횟수/취소
       *  2. 생행문의 횟수/시간 을 실행/취소
       *  를 고려해서 알고리즘 만들기
       *
       *  1. 일반 코딩 : setInterval(함수, 단위 시간);
       *    setInterval(function(){
       *    실행문
       *    }, 단위시간);
       *    - 단위시간마다 setInterval과 함수가 매번 실행
       *    ex) 단위 시간 1000, 횟수 10 => 10초 동안 setInterval 10번 실행
       *        3.5초 시점에서 clearInterval 실행 => setInterval 3번, 샐행문 3번 실행
       *   2. 시간이 취소되는 기능 구현 코딩
       *   var i = 0;
       *    setInterval(function(){
       *      if(i == 10 ){
       *        실행문
       *      }
       *    }, 단위시간);
       *
       *    - 단위시간마다 setInterval은 매번 실행, 실행문은 i가 10일때 한번 실행
       *    ex) 3.5초 시점에서 clearInterval 실행 => setInterval 3번, 실행문 0번(실행 취소)
       */

     var count = 0;

     timeID = setInterval(function(){
       if( count == 300 ){
         $depth2wrap.removeClass('on');
       }
       count++;
     }, 1);


      //setTimeout() : ~초 이후에 한번만 실행
      setTimeout(function(){
        console.log($(this));
        $depth2Wrap.removeClass('on');
        // $(this).parent().siblings().children('.css-menu-depth2-wrap').removeClass('on');
        // 위와 같이 사용하지 않고 변수 선언을 하여 변수로 사용하는 이유는 $(this)가 setTimeout에 의하여 위치가 달라 지기 때문
      },100);
    });
    /**
     * animate({css}, 1000, function(){}); //
     * addclass는 콜백 함수를 사용 할 수 없다.
     * .promise() 함수를 사용하여
     */
  });
  $('.css-menu-depth1').on('mouseleave', function(){
    $('.css-menu-depth2-wrap').removeClass('on');
  });
// End
});
