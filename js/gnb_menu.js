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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9nbmJfbWVudV9jc3MuanMiLCJfZ25iX21lbnVfanF1ZXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ25iX21lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogR25iIE1lbnUgQ1NTXHJcbiAqL1xyXG5cclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuICB2YXIgdGltZUlEOyAvLyBzZXRJbnRlcnZhbCwgY2xlYXJJbnRlcnZhbOyXkOyEnCDsgqzsmqntlaAg67OA7IiYXHJcblxyXG4gICQoJy5jc3MtbWVudS1kZXB0aDEtbGluaycpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKXtcclxuICAgIC8vIHJlbW92ZUNsYXNzIO2VmOq4sCDsnITtlbQg7Iuk7ZaJIOuQmOqzoCDsnojripQgc2V0SW50ZXJ2YWwg7Leo7IaMXHJcbiAgICBjbGVhckludGVydmFsKHRpbWVJRCk7XHJcblxyXG4gICAgLy8gcHJvbWlzZSgpIDog7JWe7ISgIOuPmeyekeydtCDrqqjrkZAg64Gd64KcIO2bhCDtirnsoJUg6riw64ql7J2EIOyLpO2WiSDsi5ztgqzrlYwg7IKs7JqpXHJcbiAgICAkKHRoaXMpLm5leHQoKS5hZGRDbGFzcygnb24nKS5wcm9taXNlKCkuZG9uZShmdW5jdGlvbigpe1xyXG4gICAgICBjb25zb2xlLmxvZyggJCh0aGlzKSk7XHJcblxyXG4gICAgICB2YXIgJGRlcHRoMldyYXAgPSAkKHRoaXMpLnBhcmVudCgpLnNpYmxpbmdzKCkuY2hpbGRyZW4oJy5jc3MtbWVudS1kZXB0aDItd3JhcCcpO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIGNsZWFyVGltZW91dCgpLCBjbGVhckludGVydmFsKClcclxuICAgICAgICog7JyEIOynhO2WiSDsi5zqsIQg7Leo7IaM64qUIOuQmOyngCDslYrripTri6QuXHJcbiAgICAgICAqIO2VqOyImOuKlCDtmp/siJjrpbwg7Leo7IaMIO2VqOyImCDsnbTrr4DroZwg7ZWc67KI66eMIOyLpO2WieuQmOuKlCBzZXR0aW1l7ZWo7IiY64qUIOygleyDgSDsnpHrj5ntlZzri6QuXHJcbiAgICAgICAqL1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqICAxLiDtg4DsnbTrqLgg7ZWo7IiYIOyLse2WiSDtmp/siJgv7Leo7IaMXHJcbiAgICAgICAqICAyLiDsg53tlonrrLjsnZgg7Zqf7IiYL+yLnOqwhCDsnYQg7Iuk7ZaJL+y3qOyGjFxyXG4gICAgICAgKiAg66W8IOqzoOugpO2VtOyEnCDslYzqs6Drpqzsppgg66eM65Ok6riwXHJcbiAgICAgICAqXHJcbiAgICAgICAqICAxLiDsnbzrsJgg7L2U65SpIDogc2V0SW50ZXJ2YWwo7ZWo7IiYLCDri6jsnIQg7Iuc6rCEKTtcclxuICAgICAgICogICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuICAgICAgICogICAg7Iuk7ZaJ66y4XHJcbiAgICAgICAqICAgIH0sIOuLqOychOyLnOqwhCk7XHJcbiAgICAgICAqICAgIC0g64uo7JyE7Iuc6rCE66eI64ukIHNldEludGVydmFs6rO8IO2VqOyImOqwgCDrp6Trsogg7Iuk7ZaJXHJcbiAgICAgICAqICAgIGV4KSDri6jsnIQg7Iuc6rCEIDEwMDAsIO2an+yImCAxMCA9PiAxMOy0iCDrj5nslYggc2V0SW50ZXJ2YWwgMTDrsogg7Iuk7ZaJXHJcbiAgICAgICAqICAgICAgICAzLjXstIgg7Iuc7KCQ7JeQ7IScIGNsZWFySW50ZXJ2YWwg7Iuk7ZaJID0+IHNldEludGVydmFsIDPrsogsIOyDkO2WieusuCAz67KIIOyLpO2WiVxyXG4gICAgICAgKiAgIDIuIOyLnOqwhOydtCDst6jshozrkJjripQg6riw64qlIOq1rO2YhCDsvZTrlKlcclxuICAgICAgICogICB2YXIgaSA9IDA7XHJcbiAgICAgICAqICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAqICAgICAgaWYoaSA9PSAxMCApe1xyXG4gICAgICAgKiAgICAgICAg7Iuk7ZaJ66y4XHJcbiAgICAgICAqICAgICAgfVxyXG4gICAgICAgKiAgICB9LCDri6jsnITsi5zqsIQpO1xyXG4gICAgICAgKlxyXG4gICAgICAgKiAgICAtIOuLqOychOyLnOqwhOuniOuLpCBzZXRJbnRlcnZhbOydgCDrp6Trsogg7Iuk7ZaJLCDsi6TtlonrrLjsnYAgaeqwgCAxMOydvOuVjCDtlZzrsogg7Iuk7ZaJXHJcbiAgICAgICAqICAgIGV4KSAzLjXstIgg7Iuc7KCQ7JeQ7IScIGNsZWFySW50ZXJ2YWwg7Iuk7ZaJID0+IHNldEludGVydmFsIDPrsogsIOyLpO2WieusuCAw67KIKOyLpO2WiSDst6jshowpXHJcbiAgICAgICAqL1xyXG5cclxuICAgICB2YXIgY291bnQgPSAwO1xyXG5cclxuICAgICB0aW1lSUQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG4gICAgICAgaWYoIGNvdW50ID09IDMwMCApe1xyXG4gICAgICAgICAkZGVwdGgyd3JhcC5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgIH1cclxuICAgICAgIGNvdW50Kys7XHJcbiAgICAgfSwgMSk7XHJcblxyXG5cclxuICAgICAgLy9zZXRUaW1lb3V0KCkgOiB+7LSIIOydtO2bhOyXkCDtlZzrsojrp4wg7Iuk7ZaJXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkKHRoaXMpKTtcclxuICAgICAgICAkZGVwdGgyV3JhcC5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAvLyAkKHRoaXMpLnBhcmVudCgpLnNpYmxpbmdzKCkuY2hpbGRyZW4oJy5jc3MtbWVudS1kZXB0aDItd3JhcCcpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgIC8vIOychOyZgCDqsJnsnbQg7IKs7Jqp7ZWY7KeAIOyViuqzoCDrs4DsiJgg7ISg7Ja47J2EIO2VmOyXrCDrs4DsiJjroZwg7IKs7Jqp7ZWY64qUIOydtOycoOuKlCAkKHRoaXMp6rCAIHNldFRpbWVvdXTsl5Ag7J2Y7ZWY7JesIOychOy5mOqwgCDri6zrnbwg7KeA6riwIOuVjOusuFxyXG4gICAgICB9LDEwMCk7XHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogYW5pbWF0ZSh7Y3NzfSwgMTAwMCwgZnVuY3Rpb24oKXt9KTsgLy9cclxuICAgICAqIGFkZGNsYXNz64qUIOy9nOuwsSDtlajsiJjrpbwg7IKs7JqpIO2VoCDsiJgg7JeG64ukLlxyXG4gICAgICogLnByb21pc2UoKSDtlajsiJjrpbwg7IKs7Jqp7ZWY7JesXHJcbiAgICAgKi9cclxuICB9KTtcclxuICAkKCcuY3NzLW1lbnUtZGVwdGgxJykub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpe1xyXG4gICAgJCgnLmNzcy1tZW51LWRlcHRoMi13cmFwJykucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcbiAgfSk7XHJcbi8vIEVuZFxyXG59KTtcclxuIiwiLyoqXHJcbiAqIEduYiBNZW51IGpRdWVyeVxyXG4gKi9cclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHJcbiAgLy8gZGVwdGgxIGJvcmRlciDripjslrTrgpjripQg66qo7IWYIO2aqOqzvFxyXG4gICQoJy5tZW51LWRlcHRoMS1saW5rJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5jaGlsZHJlbignLm1lbnUtZGVwdGgxLWJvcmRlcicpLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgd2lkdGggOiA2NFxyXG4gICAgfSwzMDApO1xyXG4gICAgLy8galF1ZXJ566Gc64qUIOqwgOyDge2BtOuemOyKpOyXkCDsoJHqt7wg7ZWgIOyImCDsl4bri6QuIOyVhOuemCDsmIgpXHJcbiAgICAvLyAkKHRoaXMpLmNoaWxkcmVuKCc6YWZ0ZXInKS5hbmltYXRlKHtcclxuICAgIC8vICAgd2lkdGggOiA2NFxyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLy8gZGVwdGgyIOuplOuJtCDripjslrTrgpjripQg66qo7IWYIO2aqOqzvFxyXG4gICAgdmFyIGRlcHRoMUluZGV4ID0gJCh0aGlzKS5pbmRleCgnLm1lbnUtZGVwdGgxLWxpbmsnKTtcclxuICAgIHZhciBtb3Rpb25IZWlnaHQgPSA1NDtcclxuICAgIGNvbnNvbGUubG9nKGRlcHRoMUluZGV4KTtcclxuXHJcbiAgICBpZiAoZGVwdGgxSW5kZXggPT0gMSApe1xyXG4gICAgICBtb3Rpb25IZWlnaHQgPSA4MDtcclxuICAgIH1cclxuXHJcbiAgICAkKHRoaXMpLm5leHQoJy5tZW51LWRlcHRoMi13cmFwJykuY3NzKHsnei1pbmRleCc6IDEwfSkuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICBoZWlnaHQgOiBtb3Rpb25IZWlnaHQsXHJcbiAgICAgIG9wYWNpdHkgOiAxXHJcbiAgICB9LDMwMCwgZnVuY3Rpb24oKXsgICAgICAgICAgICAgIC8vIOuCmO2DgOuCmOq4sOyghOyXkCDsgqzrnbzsp4DripQg66qo7IWY7J20IOyekeuPmeuQmOuLpOuztOuLiCDsi5zqsIHsoIHsnLzroZwg67aI7Y647ZWo7J2EIOyXhuyVoOq4sCDsnITtlbQg64qY7Ja064KY64qUIOuPmeyekeydhCDsp4TtlontlZztm4Qg7L2c67Cx7ZWo7IiY66W8IOydtOyaqe2VmOyXrCDri6TsnYwg64+Z7J6R7Jy866GcIOuCmOuouOyngCDshJzruIzrqZTribTrpbwg7KSE7Ja065Ok6rKMIO2VnOuLpC5cclxuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5zaWJsaW5ncygpLmNoaWxkcmVuKCcubWVudS1kZXB0aDItd3JhcCcpLmNzcyh7J3otaW5kZXgnIDogMH0pLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgICBoZWlnaHQgOiAwLFxyXG4gICAgICAgIG9wYWNpdHkgOiAwXHJcbiAgICAgIH0sMjAwKTtcclxuICAgICAgLy8gJCh0aGlzKSA9IC5tZW51LWRlcHRoMi13cmFwIOydtOuLpFxyXG4gICAgICBjb25zb2xlLmxvZygkKHRoaXMpKTsgLy8gLuyDgeychCB0aGlzIOywuOyhsCDtlZjsl6wgLm1lbnUtZGVwdGgxLWxpbmsg6rCZ7KeA66eMIO2YhOyerCDtj6ztlajrkJjslrQg7J6I64qUIO2VqOyImOydmCAubWVudS1kZXB0aDItd3JhcCDtmITsnqzsnITsuZjrpbwg7J247KeA7ZWc64ukLlxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4kKCcubWVudS1kZXB0aDEtbGluaycpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcclxuICAkKHRoaXMpLmNoaWxkcmVuKCcubWVudS1kZXB0aDEtYm9yZGVyJykuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgd2lkdGggOiAwLFxyXG4gICAgb3BhY2l0eSA6IDBcclxuICB9LDIwMCk7XHJcbn0pO1xyXG5cclxuICAgIC8vIGRlcHRoMSBib3JkZXIg7KaQ7Ja065Oc64qUIOuqqOyFmCDtmqjqs7xcclxuICAkKCcubWVudS1kZXB0aDEnKS5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAvLyBkZXB0aDIg66mU64m0IOykhOyWtOuTnOuKlCDrqqjshZgg7Zqo6rO8XHJcbiAgICAkKCcubWVudS1kZXB0aDItd3JhcCcpLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgaGVpZ2h0IDogMCxcclxuICAgICAgb3BhY2l0eSA6IDBcclxuICAgIH0sMzAwKTtcclxuICB9KTtcclxuXHJcbi8vRW5kXHJcbn0pO1xyXG4iXX0=
