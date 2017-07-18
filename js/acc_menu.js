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

/**
 *  Accordion menu jQuery
 *
 */

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hY2NfbWVudV9jc3MuanMiLCJfYWNjX21lbnVfanF1ZXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFjY19tZW51LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqICBBY2NvcmRpb24gbWVudSBDU1NcclxuICpcclxuICovXHJcblxyXG4vKipcclxuICogIOKAuyBzaG93L2hpZGUg7ZiV7YOc7J2YIOyVhOy9lOuUlOyWuCDrqZTribRcclxuICogIOKAuyBDU1Mg7L2U65SpIDogc3R5bGVpbmcsIGhpZGVcclxuICogIDEuIOuniOyasOyKpCDtgbTrpq3tlojsnYQg65WMIHN1YiDrqZTribTqsIAgc2hvdyAvIGhpZGVcclxuICogIDIuIO2BtOumre2VnCAxIGRlcHRoIOydmCBzdWLrqZTribTqsIAg67O07J28IOuVjCDri6TrpbggMSBzZXB0aOydmCBzdWIg66mU64m064qUIOyViOuztOyXrOyVvCDtlahcclxuICogIDMuIHN1YiDrqZTribTqsIAg67O07J28IOuVjCDtmZTsgrTtkZzripQg7JyXIOuwqe2WpSDtmZTsgrTtkZzroZwg67OA6rK9XHJcbiAqICA0LiBzdWIg66mU64m06rCAIOyViOuztOydtOqyjCDrkKAg65WMIO2ZlOyCtO2RnOuKlCDslYTrnqvrsKntlqUg7ZmU7IK07ZGc66GcIOuzgOqyvVxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICogIOKAuyBzdWIg66mU64m07J2YIOyYgeyXreydtCDripjslrTrgqzri6Qv7KSE7Ja065Ok7JeI64ukLiDtmJXtg5zsnZgg7JWE7L2U65SU7Ja4IOuplOuJtFxyXG4gKiAg4oC7IENTUyDsvZTrlKkgOiBzdHlsZWluZywg7KSE7Ja065OsKCDrhpLsnbQ6MClcclxuICogIDEuIOuniOyasOyKpOulvCDtgbTrpq3tlojsnYQg65WMIHN1YiDrqZTribTqsIAg64qY7Ja064KoLyDsppDslrTrk6xcclxuICogIDIuIO2BtOumre2VnCAxIGRlcHRo7J2YIHN1YiDrqZTribTqsIAg64qY7Ja064KgIOuVjCDri6TrpbggMSBkZXB0aOydmCBzdWIg66mU64m064qUIOykhOyWtOuTpOyWtOyVvCDtlahcclxuICogIDMuIHN1YiDrqZTribTqsIAg67O07J28IOuVjCDtmZTsgrTtkZzripQg7JyXIOuwqe2WpSDtmZTsgrTtkZzroZwg67OA6rK9XHJcbiAqICA0LiBzdWIg66mU64m06rCAIOyViOuztOydtOqyjCDrkKAg65WMIO2ZlOyCtO2RnOuKlCDslYTrnqvrsKntlqUg7ZmU7IK07ZGc66GcIOuzgOqyvVxyXG4gKi9cclxuXHJcbi8vIGVhY2goKe2VqOyImCDssLjqs6BcclxuLy8gZnVuY3Rpb24gaW5pdCgpe1xyXG4vLyAgICQoJy5sbmItZGVwdGgyJykuZWFjaChmdW5jdGlvbihpLCBlbSl7XHJcbi8vICAgICBjb25zb2xlLmxvZyggaSwgZW0gKTsgLy8g7J287LmY7ZWY64qUIOqwgSDsmpTshozsl5Ag64yA7ZW0IO2VqOyImOulvCDsi6TtlontlZjsl6wgalF1ZXJ5IOqwneyytOulvCDrsJjrs7Xtlanri4jri6RcclxuLy8gICAgIGNvbnNvbGUubG9nKCAkKHRoaXMpLmhlaWdodCgpICk7IOuGkuydtOulvCDsnb3slrQg7Jio64ukXHJcbi8vICAgICBjb25zb2xlLmxvZygkKHRoaXMpICk7XHJcbi8vICAgICBjb25zb2xlLmxvZygkKHRoaXMpWzBdICk7IC8vIOuMgOq0hO2YuOuhnCDsnbjrjbHsiqQg6rCS7J2EIOyjvOyWtCDrgrTsmqnsnYQg7ZmV7J24IGNvbnNvbGXssL3sl5DshJwg64K07Jqp7J2EIO2ZleyduCDtlaAg7IiY64+EIOyeiOuLpC5cclxuLy8gICB9KTtcclxuLy8gfVxyXG5cclxuLy8gICAg67Cw7Je0IOuzgOyImCDsgqzsmqlcclxuLy8gICAgJChmdW5jdGlvbigpe1xyXG4vLyAgIHZhciBhcnIgPSBbXTtcclxuLy8gICAgLy/shKDslrjrtoBcclxuLy8gICAgZnVuY3Rpb24gaW5pdCgpe1xyXG4vLyAgICAgICQoJy5sbmItZGVwdGgyJykuZWFjaChmdW5jdGlvbihpbmRleCl7XHJcbi8vICAgICAgICBhcnJbaW5kZXhdID0gJCh0aGlzKS5oZWlnaHQoKTtcclxuLy8gICAgICB9KTtcclxuLy8gICAgfVxyXG4vLyB9KTtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblxyXG4gIC8vIOyEoOyWuOu2gFxyXG4gIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAvLyDsspjsnYwg66Gc65Sp65CY7JeI7J2EIOuVjCDsg4Htg5xcclxuICAgICQoJy5sbmItZGVwdGgxLWxpbmsnKS5kYXRhKHtcclxuICAgICAgJ29wZW4nOiAnZmFsc2UnXHJcbiAgICB9KTtcclxuICAgIC8vZWFjaCgpIDog7JqU7IaMIOqwnOyImOunjO2BvCDrsJjrs7XtlZjripQg7ZWo7IiYXHJcbiAgICAkKCcubG5iLWRlcHRoMicpLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coICQodGhpcykuaGVpZ2h0KCkgKTtcclxuICAgICAgJCh0aGlzKS5kYXRhKHtcclxuICAgICAgICAnaGVpZ2h0JzogJCh0aGlzKS5oZWlnaHQoKVxyXG4gICAgICB9KS5jc3Moe1xyXG4gICAgICAgIGhlaWdodDogMFxyXG4gICAgICB9KTsgLy8g7KSR6rSE7Zi466W8IOyCrOyaqSDtlaAg6rK97JqwIOqwneyytCBwcm9wZXJ0eSDsspjrn7wg7J6R7ISxIO2VoCDsiJgg7J6I64ukLlxyXG4gICAgICBjb25zb2xlLmxvZygkKHRoaXMpLmRhdGEoJ2hlaWdodCcpKTtcclxuICAgICAgLy8gJCh0aGlzKS5jc3Moe2hlaWdodCA6IDB9KTtcclxuICAgICAgLy8gY29uc29sZS5sb2coJCh0aGlzKSApO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygkKHRoaXMpWzBdICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLy/si6TtlonrtoBcclxuICBpbml0KCk7IC8vICDtlajsiJgg7Zi47LacXHJcblxyXG4gIC8vICAgICQodGhpcykubmV4dCgpLnN0b3AoKS5hbmltYXRpb24oeyDqsJIgfSAsIOyLnOqwhCAsIOy9nOuwse2VqOyImCApO1xyXG4gIC8vICAgIGpRdWVyeSBET03snYQg64uo6rOEIOuzhOuhnCDssL7slYTqsIgg65WMLFxyXG4gIC8vICAgIOqwkiDrtoDrtoTsl5AgJCh0aGlzKeulvCDsgqzsmqntlZjrqbQg7LKY7J2MIOywvuydgCAkKHRoaXMp66W8IOydmOuvuFxyXG4gIC8vICAgIOy9nOuwsSDtlajsiJgg67aA67aE7JeQICQodGhpcynrpbwg7IKs7Jqp7ZWY66m0IOy1nOyiheycvOuhnCDssL7snYAgRE9N7JqU7IaM6rCAICQodGhpcynqsIAg65CoXHJcbiAgJCgnLmxuYi1kZXB0aDEtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZiAoJCh0aGlzKS5kYXRhKCdvcGVuJykgPT0gJ2ZhbHNlJykge1xyXG4gICAgICAvKlxyXG4gICAgICAkKHRoaXMpLm5leHQoKS5zdG9wKCkuYW5pbWF0ZSh7a2V5IDogdmFsdWV9LOyLnOqwhCzsvZzrsLHtlajsiJgpXHJcbiAgICAgICoqIGpRdWVyeSBET03snYQg64uo6rOE67OE66GcIOywvuyVhOqwiCDrlYwsXHJcbiAgICAgIDog7LKr67KIIOynuCDsnbjsiJjsnZggdmFsdWUg67aA67aE7JeQICQodGhpcykg66W8IOyCrOyaqe2VmOuptCDsspjsnYwg7LC+7J2AICQodGhpcynrpbwg7J2Y66+4XHJcbiAgICAgIDog7L2c67Cx7ZWo7IiYIOu2gOu2hOyXkCAkKHRoaXMp66W8IOyCrOyaqe2VmOuptCDstZzsooXsnLzroZwg7LC+7J2AIERPTeyalOyGjOqwgCAkKHRoaXMp6rCAIOuQqC5cclxuICAgICAgKi9cclxuICAgICAgJCh0aGlzKS5uZXh0KCkuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgIGhlaWdodDogJCh0aGlzKS5uZXh0KCkuZGF0YSgnaGVpZ2h0JylcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnNpYmxpbmdzKCkuY2hpbGRyZW4oJy5sbmItZGVwdGgyJykuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgIGhlaWdodDogMFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQodGhpcykuZGF0YSh7XHJcbiAgICAgICAgJ29wZW4nOiAndHJ1ZSdcclxuICAgICAgfSk7XHJcbiAgICAgICQodGhpcykucGFyZW50KCkuc2libGluZ3MoKS5jaGlsZHJlbignLmxuYi1kZXB0aDEtbGluaycpLmRhdGEoJ29wZW4nLCAnZmFsc2UnKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKHRoaXMpLm5leHQoKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgaGVpZ2h0OiAwXHJcbiAgICAgIH0pO1xyXG4gICAgICAkKHRoaXMpLmRhdGEoJ29wZW4nLCAnZmFsc2UnKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy9FbmRcclxufSk7XHJcbiIsIi8qKlxyXG4gKiAgQWNjb3JkaW9uIG1lbnUgalF1ZXJ5XHJcbiAqXHJcbiAqL1xyXG4iXX0=
