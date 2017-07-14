/**
 *  Image Sliding CSS
 *
 */

/**
 * Image Sliding - jQuery
 */

//진입부
$(function(){
  // 선언부
  function init(){
    $('.view-image').eq(0).css({left: 0});
    $('.view-image').eq(1).css({left: 400});
    $('.view-image').eq(2).css({left: -400});
    marginControlWrap(); // control button center 배치
    paging();
  }

  var currentIndex = 0 ;
  var nextIndex = 0;
  var timeID ;
  var checkID;

  function moveLeft(){

    if(nextIndex >= $('.view-image').length){
    nextIndex = 0;
    }
    $('.view-image').eq(currentIndex).stop().animate({left: -400}, 1000, 'easeOutBounce');
    $('.view-image').eq(nextIndex).css({left:400}).stop().animate({left:0} , 1000, 'easeOutBounce');

    console.log('nextIndex : ' + nextIndex);
    console.log('1번째' + $('.view-image').eq(0).offset().left);
    console.log('2번째' + $('.view-image').eq(1).offset().left);
    console.log('3번째' + $('.view-image').eq(2).offset().left);

    currentIndex = nextIndex;
    nextIndex++;
  }

  function moveRight(){

    if(nextIndex < 0){
    nextIndex = $('.view-image').length-1; // 인덱스 넘버는 0부터 시작하기때문에 -1을 대입한다.
    }

    $('.view-image').eq( currentIndex ).stop().animate({left: 400}, 1000, 'easeInOutBounce', function(){
    console.log( $('.view-image:animated'));  // view-image가 애니메이션 동작할 때 로그내용 출력 콜백함수임으로 아래 같은 구문보다 늦게 출력된다.
    });
    console.log( $('.view-image:animated')); // view-image가 애니메이션 동작할 때 로그내용 출력
    $('.view-image').eq( nextIndex ).css({left:-400}).stop().animate({left:0} , 1000, 'easeInOutBounce');

    console.log('nextIndex : ' + nextIndex);
    console.log('1번째' + $('.view-image').eq(0).offset().left);
    console.log('2번째' + $('.view-image').eq(1).offset().left);
    console.log('3번째' + $('.view-image').eq(2).offset().left);

    currentIndex = nextIndex;
    nextIndex--;
  };

  function marginControlWrap(){ // control button center 배치
    var wrapWidth = $('.control-wrap').width();
    $('.control-wrap').css({
      'margin-left' : -( wrapWidth / 2 )
    });
  }

  function paging(){
    var imgNumber = $('.view-image').length; // size() 개수 구하는 함수
    for(var i=0; i<imgNumber; i++){
      $('.paging').append('<li class="paging-item"><a href="#">' + (i+1) + '</a></li>');
    }
  };

  function clickPaging(){

  }

// 실행부
init();
autoRolling();

function autoRolling(){
  timeID = setInterval( function(){
  nextIndex = currentIndex +1;
  if( !$('.view-image').is(':animated') ){
    moveLeft();
    }
  console.log(timeID);
}, 3000);
}





$('.arrow.right').on('click', function(){
  // clearIntercal() : setInterval() 함수 진행을 취소 하는 함수
  clearInterval(timeID);
  // 시간 체크 - 클릭한 이후에 다시 클릭하는 시간
  clearInterval(checkID);
  var count = 0;

  checkID = setInterval( function(){
    if(count == 5){
      autoRolling();
      clearInterval(checkID); // 지속적으로 카운터 하는것을 방지하기 위한 설정
    }
    console.log('autoRolling : ' + count); // autoRolling 다시 시작하도록 하는 설정 카운터
    count++;
  }, 1000);

  nextIndex = currentIndex +1 ;
  // 애니메이션이 진행되지 않을 떄 함수 실행
  // view-image가 애니메이션 작동시 함수를 사용하지 못하게 할 수 있는 방법이 없음으로 작동이 아닐때(!)사용 작동하는 방법으로 응용한다.
  if( !$('.view-image').is(':animated') ){ // is() 함수 사용하여 animated가 실행되지 않을때 moveLeft()가 실행되도록 한다.
    moveLeft();
  }

});

$('.arrow.left').on('click', function(){
  // clearIntercal() : setInterval() 함수 진행을 취소 하는 함수
  clearInterval(timeID);
  // 시간 체크 - 클릭한 이후에 다시 클릭하는 시간
  clearInterval(checkID);
  var count = 0;

  checkID = setInterval( function(){
    if(count == 5){
      autoRolling();
      clearInterval(checkID); // 지속적으로 카운터 하는것을 방지하기 위한 설정
    }
    console.log('autoRolling : ' + count); // autoRolling 다시 시작하도록 하는 설정 카운터
    count++;
  }, 1000);
  nextIndex = currentIndex -1 ;
  moveRight();
  });

// 동적으로 생성된 클래스는 아래와 같이 제어되지 않는다. 그렇기때문에 아래와 같이 $(document)함수를 사용해야 한다.
// // autoRolling pause 버튼
// $('.btn-control.pause').on('click', function(){
//   clearInterval(timeID);
//   $(this).removeClass('pause').addClass('play');
//   $(this).text('play');
//   console.log('play');
// });
//
// // autoRolling play 버튼
// $('.btn-control.play').on('click', function(){
//   clearInterval(timeID);
//   $(this).removeClass('play').addClass('pause');
//   console.log('pause');
//   $(this).text('pause');
// });
// An event-delegation approach attaches an event handler to only one element, the tbody, and the event only needs to bubble up one level (from the clicked tr to tbody):
//이벤트 위임 접근법은 하나의 요소 인 tbody에 이벤트 핸들러를 첨부하고 이벤트는 클릭 된 tr에서 tbody까지 한 수준 위로 버블 링해야합니다

$(document).on('click','.btn-control.pause', function(e){
  clearInterval(timeID);
  // e.target
  $(e.target).removeClass('pause').addClass('play');
  $(e.target).text('play');
  // $(this).removeClass('pause').addClass('play');
  // $(this).text('play');
  console.log('상태 PAUSE');
  console.log($(e.taget));
});
$(document).on('click','.btn-control.play', function(e){
  autoRolling();
  // e.target
  $(e.target).removeClass('play').addClass('pause');
  $(e.target).text('pause');
  console.log($(e.taget));
  console.log('상태 PLAY');
});

// 페이지 번호
$(document).on('click','.paging-item', function(e){
  e.preventDefault();
  // 클릭한 요소의 인덱스 번호 : index() 함수 사용
  // 이벤트 대상이 on() 함수의 인자로 명시해주는 경우에 해당 대상이 $(this) 가 됨 (현재 : '.paging-item' )
  console.log( $(this).index('.paging-item') );

  var indexNumber = $(this).index('.paging-item');

  if( currentIndex != indexNumber ){
    if( currentIndex == 0){
      if( indexNumber == $('.view-image').length-1) {   //length -1 해주는 이유는 .view-image를 가진 이미지 수를 확인 하는데 있어 0부터 숫자를 세기 때문에 +1로 갯수로 알기 위함이다.
        nextIndex = currentIndex - 1;
        if( !$('.view-image').is('animated')){
          moveRight();
        }
      } else {
        nextIndex = currentIndex + 1;
        if( !$('.view-imiage').is(':animated')){
          moveLeft();
        }
      }
    } else if( currentIndex == $('.view-image').length-1 ){
      if( indexNumber == 0 ){
        nextIndex = currentIndex + 1;
        if( !$('.view-image').is(':animated') ){
          moveLeft();
        }
      } else {
        nextIndex = currentIndex - 1;
        if( !$('.view-image').is(':animated') ){
          moveRight();
        }
      }
    } else {

      if( currentIndex < indexNumber ){
        nextIndex = currentIndex + 1;
        if( !$('.view-image').is(':animated') ){
           moveLeft();
         }
       } else {
        nextIndex = currentIndex - 1;
        if( !$('.view-image').is(':animated') ){
           moveRight();
        }
      }
    }
  }
});
//End
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9pbWFnZV9zbGlkaW5nX2Nzcy5qcyIsIl9pbWFnZV9zbGlkaW5nX2pxdWVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW1hZ2Vfc2xpZGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiAgSW1hZ2UgU2xpZGluZyBDU1NcclxuICpcclxuICovXHJcbiIsIi8qKlxyXG4gKiBJbWFnZSBTbGlkaW5nIC0galF1ZXJ5XHJcbiAqL1xyXG5cclxuLy/sp4TsnoXrtoBcclxuJChmdW5jdGlvbigpe1xyXG4gIC8vIOyEoOyWuOu2gFxyXG4gIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICQoJy52aWV3LWltYWdlJykuZXEoMCkuY3NzKHtsZWZ0OiAwfSk7XHJcbiAgICAkKCcudmlldy1pbWFnZScpLmVxKDEpLmNzcyh7bGVmdDogNDAwfSk7XHJcbiAgICAkKCcudmlldy1pbWFnZScpLmVxKDIpLmNzcyh7bGVmdDogLTQwMH0pO1xyXG4gICAgbWFyZ2luQ29udHJvbFdyYXAoKTsgLy8gY29udHJvbCBidXR0b24gY2VudGVyIOuwsOy5mFxyXG4gICAgcGFnaW5nKCk7XHJcbiAgfVxyXG5cclxuICB2YXIgY3VycmVudEluZGV4ID0gMCA7XHJcbiAgdmFyIG5leHRJbmRleCA9IDA7XHJcbiAgdmFyIHRpbWVJRCA7XHJcbiAgdmFyIGNoZWNrSUQ7XHJcblxyXG4gIGZ1bmN0aW9uIG1vdmVMZWZ0KCl7XHJcblxyXG4gICAgaWYobmV4dEluZGV4ID49ICQoJy52aWV3LWltYWdlJykubGVuZ3RoKXtcclxuICAgIG5leHRJbmRleCA9IDA7XHJcbiAgICB9XHJcbiAgICAkKCcudmlldy1pbWFnZScpLmVxKGN1cnJlbnRJbmRleCkuc3RvcCgpLmFuaW1hdGUoe2xlZnQ6IC00MDB9LCAxMDAwLCAnZWFzZU91dEJvdW5jZScpO1xyXG4gICAgJCgnLnZpZXctaW1hZ2UnKS5lcShuZXh0SW5kZXgpLmNzcyh7bGVmdDo0MDB9KS5zdG9wKCkuYW5pbWF0ZSh7bGVmdDowfSAsIDEwMDAsICdlYXNlT3V0Qm91bmNlJyk7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ25leHRJbmRleCA6ICcgKyBuZXh0SW5kZXgpO1xyXG4gICAgY29uc29sZS5sb2coJzHrsojsp7gnICsgJCgnLnZpZXctaW1hZ2UnKS5lcSgwKS5vZmZzZXQoKS5sZWZ0KTtcclxuICAgIGNvbnNvbGUubG9nKCcy67KI7Ke4JyArICQoJy52aWV3LWltYWdlJykuZXEoMSkub2Zmc2V0KCkubGVmdCk7XHJcbiAgICBjb25zb2xlLmxvZygnM+uyiOynuCcgKyAkKCcudmlldy1pbWFnZScpLmVxKDIpLm9mZnNldCgpLmxlZnQpO1xyXG5cclxuICAgIGN1cnJlbnRJbmRleCA9IG5leHRJbmRleDtcclxuICAgIG5leHRJbmRleCsrO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbW92ZVJpZ2h0KCl7XHJcblxyXG4gICAgaWYobmV4dEluZGV4IDwgMCl7XHJcbiAgICBuZXh0SW5kZXggPSAkKCcudmlldy1pbWFnZScpLmxlbmd0aC0xOyAvLyDsnbjrjbHsiqQg64SY67KE64qUIDDrtoDthLAg7Iuc7J6R7ZWY6riw65WM66y47JeQIC0x7J2EIOuMgOyehe2VnOuLpC5cclxuICAgIH1cclxuXHJcbiAgICAkKCcudmlldy1pbWFnZScpLmVxKCBjdXJyZW50SW5kZXggKS5zdG9wKCkuYW5pbWF0ZSh7bGVmdDogNDAwfSwgMTAwMCwgJ2Vhc2VJbk91dEJvdW5jZScsIGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zb2xlLmxvZyggJCgnLnZpZXctaW1hZ2U6YW5pbWF0ZWQnKSk7ICAvLyB2aWV3LWltYWdl6rCAIOyVoOuLiOuplOydtOyFmCDrj5nsnpHtlaAg65WMIOuhnOq3uOuCtOyaqSDstpzroKUg7L2c67Cx7ZWo7IiY7J6E7Jy866GcIOyVhOuemCDqsJnsnYAg6rWs66y467O064ukIOuKpuqyjCDstpzroKXrkJzri6QuXHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKCAkKCcudmlldy1pbWFnZTphbmltYXRlZCcpKTsgLy8gdmlldy1pbWFnZeqwgCDslaDri4jrqZTsnbTshZgg64+Z7J6R7ZWgIOuVjCDroZzqt7jrgrTsmqkg7Lac66ClXHJcbiAgICAkKCcudmlldy1pbWFnZScpLmVxKCBuZXh0SW5kZXggKS5jc3Moe2xlZnQ6LTQwMH0pLnN0b3AoKS5hbmltYXRlKHtsZWZ0OjB9ICwgMTAwMCwgJ2Vhc2VJbk91dEJvdW5jZScpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCduZXh0SW5kZXggOiAnICsgbmV4dEluZGV4KTtcclxuICAgIGNvbnNvbGUubG9nKCcx67KI7Ke4JyArICQoJy52aWV3LWltYWdlJykuZXEoMCkub2Zmc2V0KCkubGVmdCk7XHJcbiAgICBjb25zb2xlLmxvZygnMuuyiOynuCcgKyAkKCcudmlldy1pbWFnZScpLmVxKDEpLm9mZnNldCgpLmxlZnQpO1xyXG4gICAgY29uc29sZS5sb2coJzPrsojsp7gnICsgJCgnLnZpZXctaW1hZ2UnKS5lcSgyKS5vZmZzZXQoKS5sZWZ0KTtcclxuXHJcbiAgICBjdXJyZW50SW5kZXggPSBuZXh0SW5kZXg7XHJcbiAgICBuZXh0SW5kZXgtLTtcclxuICB9O1xyXG5cclxuICBmdW5jdGlvbiBtYXJnaW5Db250cm9sV3JhcCgpeyAvLyBjb250cm9sIGJ1dHRvbiBjZW50ZXIg67Cw7LmYXHJcbiAgICB2YXIgd3JhcFdpZHRoID0gJCgnLmNvbnRyb2wtd3JhcCcpLndpZHRoKCk7XHJcbiAgICAkKCcuY29udHJvbC13cmFwJykuY3NzKHtcclxuICAgICAgJ21hcmdpbi1sZWZ0JyA6IC0oIHdyYXBXaWR0aCAvIDIgKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwYWdpbmcoKXtcclxuICAgIHZhciBpbWdOdW1iZXIgPSAkKCcudmlldy1pbWFnZScpLmxlbmd0aDsgLy8gc2l6ZSgpIOqwnOyImCDqtaztlZjripQg7ZWo7IiYXHJcbiAgICBmb3IodmFyIGk9MDsgaTxpbWdOdW1iZXI7IGkrKyl7XHJcbiAgICAgICQoJy5wYWdpbmcnKS5hcHBlbmQoJzxsaSBjbGFzcz1cInBhZ2luZy1pdGVtXCI+PGEgaHJlZj1cIiNcIj4nICsgKGkrMSkgKyAnPC9hPjwvbGk+Jyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gY2xpY2tQYWdpbmcoKXtcclxuXHJcbiAgfVxyXG5cclxuLy8g7Iuk7ZaJ67aAXHJcbmluaXQoKTtcclxuYXV0b1JvbGxpbmcoKTtcclxuXHJcbmZ1bmN0aW9uIGF1dG9Sb2xsaW5nKCl7XHJcbiAgdGltZUlEID0gc2V0SW50ZXJ2YWwoIGZ1bmN0aW9uKCl7XHJcbiAgbmV4dEluZGV4ID0gY3VycmVudEluZGV4ICsxO1xyXG4gIGlmKCAhJCgnLnZpZXctaW1hZ2UnKS5pcygnOmFuaW1hdGVkJykgKXtcclxuICAgIG1vdmVMZWZ0KCk7XHJcbiAgICB9XHJcbiAgY29uc29sZS5sb2codGltZUlEKTtcclxufSwgMzAwMCk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4kKCcuYXJyb3cucmlnaHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gIC8vIGNsZWFySW50ZXJjYWwoKSA6IHNldEludGVydmFsKCkg7ZWo7IiYIOynhO2WieydhCDst6jshowg7ZWY64qUIO2VqOyImFxyXG4gIGNsZWFySW50ZXJ2YWwodGltZUlEKTtcclxuICAvLyDsi5zqsIQg7LK07YGsIC0g7YG066at7ZWcIOydtO2bhOyXkCDri6Tsi5wg7YG066at7ZWY64qUIOyLnOqwhFxyXG4gIGNsZWFySW50ZXJ2YWwoY2hlY2tJRCk7XHJcbiAgdmFyIGNvdW50ID0gMDtcclxuXHJcbiAgY2hlY2tJRCA9IHNldEludGVydmFsKCBmdW5jdGlvbigpe1xyXG4gICAgaWYoY291bnQgPT0gNSl7XHJcbiAgICAgIGF1dG9Sb2xsaW5nKCk7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwoY2hlY2tJRCk7IC8vIOyngOyGjeyggeycvOuhnCDsubTsmrTthLAg7ZWY64qU6rKD7J2EIOuwqeyngO2VmOq4sCDsnITtlZwg7ISk7KCVXHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZygnYXV0b1JvbGxpbmcgOiAnICsgY291bnQpOyAvLyBhdXRvUm9sbGluZyDri6Tsi5wg7Iuc7J6R7ZWY64+E66GdIO2VmOuKlCDshKTsoJUg7Lm07Jq07YSwXHJcbiAgICBjb3VudCsrO1xyXG4gIH0sIDEwMDApO1xyXG5cclxuICBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggKzEgO1xyXG4gIC8vIOyVoOuLiOuplOydtOyFmOydtCDsp4TtlonrkJjsp4Ag7JWK7J2EIOuWhCDtlajsiJgg7Iuk7ZaJXHJcbiAgLy8gdmlldy1pbWFnZeqwgCDslaDri4jrqZTsnbTshZgg7J6R64+Z7IucIO2VqOyImOulvCDsgqzsmqntlZjsp4Ag66q77ZWY6rKMIO2VoCDsiJgg7J6I64qUIOuwqeuyleydtCDsl4bsnYzsnLzroZwg7J6R64+Z7J20IOyVhOuLkOuVjCghKeyCrOyaqSDsnpHrj5ntlZjripQg67Cp67KV7Jy866GcIOydkeyaqe2VnOuLpC5cclxuICBpZiggISQoJy52aWV3LWltYWdlJykuaXMoJzphbmltYXRlZCcpICl7IC8vIGlzKCkg7ZWo7IiYIOyCrOyaqe2VmOyXrCBhbmltYXRlZOqwgCDsi6TtlonrkJjsp4Ag7JWK7J2E65WMIG1vdmVMZWZ0KCnqsIAg7Iuk7ZaJ65CY64+E66GdIO2VnOuLpC5cclxuICAgIG1vdmVMZWZ0KCk7XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG4kKCcuYXJyb3cubGVmdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgLy8gY2xlYXJJbnRlcmNhbCgpIDogc2V0SW50ZXJ2YWwoKSDtlajsiJgg7KeE7ZaJ7J2EIOy3qOyGjCDtlZjripQg7ZWo7IiYXHJcbiAgY2xlYXJJbnRlcnZhbCh0aW1lSUQpO1xyXG4gIC8vIOyLnOqwhCDssrTtgawgLSDtgbTrpq3tlZwg7J207ZuE7JeQIOuLpOyLnCDtgbTrpq3tlZjripQg7Iuc6rCEXHJcbiAgY2xlYXJJbnRlcnZhbChjaGVja0lEKTtcclxuICB2YXIgY291bnQgPSAwO1xyXG5cclxuICBjaGVja0lEID0gc2V0SW50ZXJ2YWwoIGZ1bmN0aW9uKCl7XHJcbiAgICBpZihjb3VudCA9PSA1KXtcclxuICAgICAgYXV0b1JvbGxpbmcoKTtcclxuICAgICAgY2xlYXJJbnRlcnZhbChjaGVja0lEKTsgLy8g7KeA7IaN7KCB7Jy866GcIOy5tOyatO2EsCDtlZjripTqsoPsnYQg67Cp7KeA7ZWY6riwIOychO2VnCDshKTsoJVcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKCdhdXRvUm9sbGluZyA6ICcgKyBjb3VudCk7IC8vIGF1dG9Sb2xsaW5nIOuLpOyLnCDsi5zsnpHtlZjrj4TroZ0g7ZWY64qUIOyEpOyglSDsubTsmrTthLBcclxuICAgIGNvdW50Kys7XHJcbiAgfSwgMTAwMCk7XHJcbiAgbmV4dEluZGV4ID0gY3VycmVudEluZGV4IC0xIDtcclxuICBtb3ZlUmlnaHQoKTtcclxuICB9KTtcclxuXHJcbi8vIOuPmeyggeycvOuhnCDsg53shLHrkJwg7YG0656Y7Iqk64qUIOyVhOuemOyZgCDqsJnsnbQg7KCc7Ja065CY7KeAIOyViuuKlOuLpC4g6re466CH6riw65WM66y47JeQIOyVhOuemOyZgCDqsJnsnbQgJChkb2N1bWVudCntlajsiJjrpbwg7IKs7Jqp7ZW07JW8IO2VnOuLpC5cclxuLy8gLy8gYXV0b1JvbGxpbmcgcGF1c2Ug67KE7Yq8XHJcbi8vICQoJy5idG4tY29udHJvbC5wYXVzZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbi8vICAgY2xlYXJJbnRlcnZhbCh0aW1lSUQpO1xyXG4vLyAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ3BhdXNlJykuYWRkQ2xhc3MoJ3BsYXknKTtcclxuLy8gICAkKHRoaXMpLnRleHQoJ3BsYXknKTtcclxuLy8gICBjb25zb2xlLmxvZygncGxheScpO1xyXG4vLyB9KTtcclxuLy9cclxuLy8gLy8gYXV0b1JvbGxpbmcgcGxheSDrsoTtirxcclxuLy8gJCgnLmJ0bi1jb250cm9sLnBsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4vLyAgIGNsZWFySW50ZXJ2YWwodGltZUlEKTtcclxuLy8gICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdwbGF5JykuYWRkQ2xhc3MoJ3BhdXNlJyk7XHJcbi8vICAgY29uc29sZS5sb2coJ3BhdXNlJyk7XHJcbi8vICAgJCh0aGlzKS50ZXh0KCdwYXVzZScpO1xyXG4vLyB9KTtcclxuLy8gQW4gZXZlbnQtZGVsZWdhdGlvbiBhcHByb2FjaCBhdHRhY2hlcyBhbiBldmVudCBoYW5kbGVyIHRvIG9ubHkgb25lIGVsZW1lbnQsIHRoZSB0Ym9keSwgYW5kIHRoZSBldmVudCBvbmx5IG5lZWRzIHRvIGJ1YmJsZSB1cCBvbmUgbGV2ZWwgKGZyb20gdGhlIGNsaWNrZWQgdHIgdG8gdGJvZHkpOlxyXG4vL+ydtOuypO2KuCDsnITsnoQg7KCR6re867KV7J2AIO2VmOuCmOydmCDsmpTshowg7J24IHRib2R57JeQIOydtOuypO2KuCDtlbjrk6Trn6zrpbwg7LKo67aA7ZWY6rOgIOydtOuypO2KuOuKlCDtgbTrpq0g65CcIHRy7JeQ7IScIHRib2R56rmM7KeAIO2VnCDsiJjspIAg7JyE66GcIOuyhOu4lCDrp4HtlbTslbztlanri4jri6RcclxuXHJcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsJy5idG4tY29udHJvbC5wYXVzZScsIGZ1bmN0aW9uKGUpe1xyXG4gIGNsZWFySW50ZXJ2YWwodGltZUlEKTtcclxuICAvLyBlLnRhcmdldFxyXG4gICQoZS50YXJnZXQpLnJlbW92ZUNsYXNzKCdwYXVzZScpLmFkZENsYXNzKCdwbGF5Jyk7XHJcbiAgJChlLnRhcmdldCkudGV4dCgncGxheScpO1xyXG4gIC8vICQodGhpcykucmVtb3ZlQ2xhc3MoJ3BhdXNlJykuYWRkQ2xhc3MoJ3BsYXknKTtcclxuICAvLyAkKHRoaXMpLnRleHQoJ3BsYXknKTtcclxuICBjb25zb2xlLmxvZygn7IOB7YOcIFBBVVNFJyk7XHJcbiAgY29uc29sZS5sb2coJChlLnRhZ2V0KSk7XHJcbn0pO1xyXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCcuYnRuLWNvbnRyb2wucGxheScsIGZ1bmN0aW9uKGUpe1xyXG4gIGF1dG9Sb2xsaW5nKCk7XHJcbiAgLy8gZS50YXJnZXRcclxuICAkKGUudGFyZ2V0KS5yZW1vdmVDbGFzcygncGxheScpLmFkZENsYXNzKCdwYXVzZScpO1xyXG4gICQoZS50YXJnZXQpLnRleHQoJ3BhdXNlJyk7XHJcbiAgY29uc29sZS5sb2coJChlLnRhZ2V0KSk7XHJcbiAgY29uc29sZS5sb2coJ+yDge2DnCBQTEFZJyk7XHJcbn0pO1xyXG5cclxuLy8g7Y6Y7J207KeAIOuyiO2YuFxyXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCcucGFnaW5nLWl0ZW0nLCBmdW5jdGlvbihlKXtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgLy8g7YG066at7ZWcIOyalOyGjOydmCDsnbjrjbHsiqQg67KI7Zi4IDogaW5kZXgoKSDtlajsiJgg7IKs7JqpXHJcbiAgLy8g7J2067Kk7Yq4IOuMgOyDgeydtCBvbigpIO2VqOyImOydmCDsnbjsnpDroZwg66qF7Iuc7ZW07KO864qUIOqyveyasOyXkCDtlbTri7kg64yA7IOB7J20ICQodGhpcykg6rCAIOuQqCAo7ZiE7J6sIDogJy5wYWdpbmctaXRlbScgKVxyXG4gIGNvbnNvbGUubG9nKCAkKHRoaXMpLmluZGV4KCcucGFnaW5nLWl0ZW0nKSApO1xyXG5cclxuICB2YXIgaW5kZXhOdW1iZXIgPSAkKHRoaXMpLmluZGV4KCcucGFnaW5nLWl0ZW0nKTtcclxuXHJcbiAgaWYoIGN1cnJlbnRJbmRleCAhPSBpbmRleE51bWJlciApe1xyXG4gICAgaWYoIGN1cnJlbnRJbmRleCA9PSAwKXtcclxuICAgICAgaWYoIGluZGV4TnVtYmVyID09ICQoJy52aWV3LWltYWdlJykubGVuZ3RoLTEpIHsgICAvL2xlbmd0aCAtMSDtlbTso7zripQg7J207Jyg64qUIC52aWV3LWltYWdl66W8IOqwgOynhCDsnbTrr7jsp4Ag7IiY66W8IO2ZleyduCDtlZjripTrjbAg7J6I7Ja0IDDrtoDthLAg7Iir7J6Q66W8IOyEuOq4sCDrlYzrrLjsl5AgKzHroZwg6rCv7IiY66GcIOyVjOq4sCDsnITtlajsnbTri6QuXHJcbiAgICAgICAgbmV4dEluZGV4ID0gY3VycmVudEluZGV4IC0gMTtcclxuICAgICAgICBpZiggISQoJy52aWV3LWltYWdlJykuaXMoJ2FuaW1hdGVkJykpe1xyXG4gICAgICAgICAgbW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5leHRJbmRleCA9IGN1cnJlbnRJbmRleCArIDE7XHJcbiAgICAgICAgaWYoICEkKCcudmlldy1pbWlhZ2UnKS5pcygnOmFuaW1hdGVkJykpe1xyXG4gICAgICAgICAgbW92ZUxlZnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiggY3VycmVudEluZGV4ID09ICQoJy52aWV3LWltYWdlJykubGVuZ3RoLTEgKXtcclxuICAgICAgaWYoIGluZGV4TnVtYmVyID09IDAgKXtcclxuICAgICAgICBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xyXG4gICAgICAgIGlmKCAhJCgnLnZpZXctaW1hZ2UnKS5pcygnOmFuaW1hdGVkJykgKXtcclxuICAgICAgICAgIG1vdmVMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5leHRJbmRleCA9IGN1cnJlbnRJbmRleCAtIDE7XHJcbiAgICAgICAgaWYoICEkKCcudmlldy1pbWFnZScpLmlzKCc6YW5pbWF0ZWQnKSApe1xyXG4gICAgICAgICAgbW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgaWYoIGN1cnJlbnRJbmRleCA8IGluZGV4TnVtYmVyICl7XHJcbiAgICAgICAgbmV4dEluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcclxuICAgICAgICBpZiggISQoJy52aWV3LWltYWdlJykuaXMoJzphbmltYXRlZCcpICl7XHJcbiAgICAgICAgICAgbW92ZUxlZnQoKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggLSAxO1xyXG4gICAgICAgIGlmKCAhJCgnLnZpZXctaW1hZ2UnKS5pcygnOmFuaW1hdGVkJykgKXtcclxuICAgICAgICAgICBtb3ZlUmlnaHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4vL0VuZFxyXG59KTtcclxuIl19
