/**
 *  Image Sliding CSS
 *
 */

$(function() {

  // 선언부
  function init() {
    $('.css-sliding-view-image').eq(0).addClass('center');
    $('.css-sliding-view-image').eq(1).addClass('right');
    $('.css-sliding-view-image').eq(2).addClass('left');

    marginControlWrap();
    paging();
  }

  var currentIndex = 0;
  var nextIndex = 0;
  var prevIndex = 0;
  var timeID;
  var checkID;

  function moveLeft() {
    if (nextIndex >= $('.css-sliding-view-image').length) {
      nextIndex = 0;
    }

    // eq()에 음수 값을 넣어 주면 뒷 순서부터 차례대로 매칭 시킴
    $('.css-sliding-view-image').eq(currentIndex - 1).removeClass('left ani').addClass('right');
    $('.css-sliding-view-image').eq(currentIndex).removeClass('center ani').addClass('left ani');
    $('.css-sliding-view-image').eq(nextIndex).removeClass('right').addClass('center ani');

    currentIndex = nextIndex;
    nextIndex++;
  }

  function moveRight() {
    if (nextIndex <= -1) {
      nextIndex = $('.css-sliding-view-image').length - 1;
    }
    if (prevIndex >= $('.css-sliding-view-image').length) {
      prevIndex = 0;
    }
    $('.css-sliding-view-image').eq(prevIndex).removeClass('right ani').addClass('left');
    $('.css-sliding-view-image').eq(currentIndex).removeClass('center ani').addClass('right ani');
    $('.css-sliding-view-image').eq(nextIndex).removeClass('left').addClass('center ani');

    currentIndex = nextIndex;
    prevIndex = currentIndex + 1;
    nextIndex--;
  }

  // 실행부
  init();
  autoRolling();

  // 매개 변수를 이용하여 좌우 클릭을 간소화 만들기
  var activeClick = function(direction) {
    var dir = direction;
    // left() right() 작동 시간(.ani) class의 작동시간을 추출하여 변수 저장
    // dom이 로드시 ani class가 reading이 되지 않은 상태이므로 transition-duration값을 인식하지 못한다.
    // move클릭이루 부터 작동되기 때문에 처음부터 javascript로 제어 하는것이 용이하다
    var moveTime = (parseInt($('.ani').css('transition-duration'))) * 1000;
    // console.log(parseInt( $('.ani').css('transition-duration')));
    console.log($('.ani').css('transition-duration'));
    if (dir == 'right') {
      nextIndex = currentIndex + 1;
      moveLeft();
    } else {
      nextIndex = currentIndex - 1;
      prevIndex = currentIndex + 1;
      moveRight();
    }

    var $selector = $('.css-sliding-arrow.' + dir); // $('.css-sliding-arrow.right')

    setTimeout(function() {
      // 재귀 함수 - 연속 실행 하지 못하도록 하기위해 one() 함수를 사용 하고 1초뒤에 재활용 할 수 있게 하는 방식
      $selector.one('click', function() {
        activeClick(dir);
      });
      /*    if( dir == 'left'){
              $('.css-sliding-arrow.right').one('click', function() {
              activeClick(dir);
              });
            } else {
              $('.css-sliding-arrow.left').one('click', function() {
              activeClick(dir);
              });
            }
      */
    }, moveTime);
  };

  function autoRolling() {
    timeID = setInterval(function() {
      if ($('.css-sliding-btn-control').hasClass('play')) {
        $('.css-sliding-btn-control').removeClass('play').addClass('pause').text('pause');
      }
      nextIndex = currentIndex + 1;
      if (!$('.css-sliding-view-image').is(':animated')) {
        moveLeft();
        console.log(timeID);
      }
      // console.log(timeID);
    }, 3000);
  }



  $('.css-sliding-arrow.right').stop().one('click', function() {
    pauseAndReAuto();
    activeClick('right');
  });

  $('.css-sliding-arrow.left').stop().one('click', function() {
    pauseAndReAuto();
    activeClick('left');
  });

  function marginControlWrap() { // control button center 배치
    var wrapWidth = $('.css-sliding-control-wrap').width();
    $('.css-sliding-control-wrap').css({
      'margin-left': -(wrapWidth / 2)
    });
  }

  function paging() {
    var imgNumber = $('.css-sliding-view-image').length; // size() 개수 구하는 함수
    for (var i = 0; i < imgNumber; i++) {
      $('.css-sliding-paging').append('<li class="css-sliding-paging-item"><a href="#">' + (i + 1) + '</a></li>');
    }
  }

  $(document).on('click', '.css-sliding-btn-control.pause', function(e) {
    clearInterval(timeID);
    // e.target
    $(e.target).removeClass('pause').addClass('play');
    $(e.target).text('play');
    // $(this).removeClass('pause').addClass('play');
    // $(this).text('play');
    console.log('상태 PAUSE');
    console.log($(e.taget));
  });

  // autoRolling button
  $(document).on('click', '.css-sliding-btn-control.play', function(e) {
    autoRolling();
    // e.target
    $(e.target).removeClass('play').addClass('pause');
    $(e.target).text('pause');
    console.log($(e.taget));
    console.log('상태 PLAY');
  });

  $(document).on('click', '.css-sliding-paging-item', function(e) {

    pauseAndReAuto();
    e.preventDefault();
    // 클릭한 요소의 인덱스 번호 : index() 함수 사용
    // 이벤트 대상이 on() 함수의 인자로 명시해주는 경우에 해당 대상이 $(this) 가 됨 (현재 : '.paging-item' )
    console.log($(this).index('.css-sliding-paging-item'));

    var indexNumber = $(this).index('.css-sliding-paging-item');

    if (currentIndex != indexNumber) {
      if (currentIndex == 0) {
        if (indexNumber == $('.css-sliding-view-image').length - 1) { //length -1 해주는 이유는 .view-image를 가진 이미지 수를 확인 하는데 있어 0부터 숫자를 세기 때문에 +1로 갯수로 알기 위함이다.
          activeClick('left');

        } else {
          nextIndex = currentIndex + 1;
          if (!$('.css-sliding-view-imiage').is(':animated')) {
            activeClick('right');
          }
        }
      } else if (currentIndex == $('.css-sliding-view-image').length - 1) {
        if (indexNumber == 0) {
          nextIndex = currentIndex + 1;
          if (!$('.css-sliding-view-image').is(':animated')) {
            activeClick('right');
          }
        } else {
          nextIndex = currentIndex - 1;
          if (!$('.css-sliding-view-image').is(':animated')) {
            activeClick('left');
          }
        }
      } else {

        if (currentIndex < indexNumber) {
          nextIndex = currentIndex + 1;
          if (!$('.css-sliding-view-image').is(':animated')) {
            activeClick('right');
          }
        } else {
          nextIndex = currentIndex - 1;
          if (!$('.css-sliding-view-image').is(':animated')) {
            activeClick('left');
          }
        }
      }
    }
  });

  function pauseAndReAuto() {
    clearInterval(timeID);
    // 시간 체크 - 클릭한 이후에 다시 클릭하는 시간
    // hasClass() 함수
    if ($('.css-sliding-btn-control').hasClass('pause')) {
      $('.css-sliding-btn-control').removeClass('pause').addClass('play').text('play');
    }
    clearInterval(checkID);

    var count = 0;

    checkID = setInterval(function() {
      if (count == 5) {
        autoRolling();
        clearInterval(checkID); // 지속적으로 카운터 하는것을 방지하기 위한 설정
      }
      console.log('autoRolling : ' + count); // autoRolling 다시 시작하도록 하는 설정 카운터
      count++;
    }, 1000);
  }


  //End
});

/**
 * Image Sliding - jQuery
 */

//진입부
$(function(){
  // 선언부
  function init(){
    $('.js-sliding .js-view-image').eq(0).css({left: 0});
    $('.js-sliding .js-view-image').eq(1).css({left: 400});
    $('.js-sliding .js-view-image').eq(2).css({left: -400});
    marginControlWrap(); // control button center 배치
    paging();
  }

  var currentIndex = 0 ;
  var nextIndex = 0;
  var timeID ;
  var checkID;

  function moveLeft(){

    if(nextIndex >= $('.js-sliding .js-view-image').length){
    nextIndex = 0;
    }
    $('.js-sliding .js-view-image').eq(currentIndex).stop().animate({left: -400}, 1000, 'easeOutBounce');
    $('.js-sliding .js-view-image').eq(nextIndex).css({left:400}).stop().animate({left:0} , 1000, 'easeOutBounce');

    // console.log('nextIndex : ' + nextIndex);
    // console.log('1번째' + $('.js-sliding .view-image').eq(0).offset().left);
    // console.log('2번째' + $('.js-sliding .view-image').eq(1).offset().left);
    // console.log('3번째' + $('.js-sliding .view-image').eq(2).offset().left);

    currentIndex = nextIndex;
    nextIndex++;
  }

  function moveRight(){

    if(nextIndex < 0){
    nextIndex = $('.js-sliding  .js-view-image').length-1; // 인덱스 넘버는 0부터 시작하기때문에 -1을 대입한다.
    }

    $('.js-sliding  .js-view-image').eq( currentIndex ).stop().animate({left: 400}, 1000, 'easeInOutBounce', function(){
    console.log( $('.js-sliding  .js-view-image:animated'));  // view-image가 애니메이션 동작할 때 로그내용 출력 콜백함수임으로 아래 같은 구문보다 늦게 출력된다.
    });
    console.log( $('.js-sliding .js-view-image:animated')); // view-image가 애니메이션 동작할 때 로그내용 출력
    $('.js-view-image').eq( nextIndex ).css({left:-400}).stop().animate({left:0} , 1000, 'easeInOutBounce');

    console.log('nextIndex : ' + nextIndex);
    console.log('1번째' + $('.js-sliding .js-view-image').eq(0).offset().left);
    console.log('2번째' + $('.js-sliding .js-view-image').eq(1).offset().left);
    console.log('3번째' + $('.js-sliding .js-view-image').eq(2).offset().left);

    currentIndex = nextIndex;
    nextIndex--;
  }

  function marginControlWrap(){ // control button center 배치
    var wrapWidth = $('.control-wrap').width();
    $('.control-wrap').css({
      'margin-left' : -( wrapWidth / 2 )
    });
  }

  function paging(){
    var imgNumber = $('.js-view-image').length; // size() 개수 구하는 함수
    for(var i=0; i<imgNumber; i++){
      $('.paging').append('<li class="paging-item"><a href="#">' + (i+1) + '</a></li>');
    }
  }

  function clickPaging(){

  }

// 실행부
init();
autoRolling();

function autoRolling(){
  timeID = setInterval( function(){
  nextIndex = currentIndex +1;
  if( !$('.js-view-image').is(':animated') ){
    moveLeft();
    }
  // console.log(timeID);
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
  if( !$('.js-view-image').is(':animated') ){ // is() 함수 사용하여 animated가 실행되지 않을때 moveLeft()가 실행되도록 한다.
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

  if (currentIndex != indexNumber) {
    if( currentIndex == 0){
      if( indexNumber == $('.js-view-image').length-1) {   //length -1 해주는 이유는 .view-image를 가진 이미지 수를 확인 하는데 있어 0부터 숫자를 세기 때문에 +1로 갯수로 알기 위함이다.
        nextIndex = currentIndex - 1;
        if( !$('.js-view-image').is('animated')){
          moveRight();
        }
      } else {
        nextIndex = currentIndex + 1;
        if( !$('.js-view-imiage').is(':animated')){
          moveLeft();
        }
      }
    } else if( currentIndex == $('.view-image').length-1 ){
      if( indexNumber == 0 ){
        nextIndex = currentIndex + 1;
        if( !$('.js-view-image').is(':animated') ){
          moveLeft();
        }
      } else {
        nextIndex = currentIndex - 1;
        if( !$('.js-view-image').is(':animated') ){
          moveRight();
        }
      }
    } else {

      if( currentIndex < indexNumber ){
        nextIndex = currentIndex + 1;
        if( !$('.js-view-image').is(':animated') ){
           moveLeft();
         }
       } else {
        nextIndex = currentIndex - 1;
        if( !$('.js-view-image').is(':animated') ){
           moveRight();
        }
      }
    }
  }
});
//End
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9pbWFnZV9zbGlkaW5nX2Nzcy5qcyIsIl9pbWFnZV9zbGlkaW5nX2pxdWVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW1hZ2Vfc2xpZGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiAgSW1hZ2UgU2xpZGluZyBDU1NcclxuICpcclxuICovXHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cclxuICAvLyDshKDslrjrtoBcclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgJCgnLmNzcy1zbGlkaW5nLXZpZXctaW1hZ2UnKS5lcSgwKS5hZGRDbGFzcygnY2VudGVyJyk7XHJcbiAgICAkKCcuY3NzLXNsaWRpbmctdmlldy1pbWFnZScpLmVxKDEpLmFkZENsYXNzKCdyaWdodCcpO1xyXG4gICAgJCgnLmNzcy1zbGlkaW5nLXZpZXctaW1hZ2UnKS5lcSgyKS5hZGRDbGFzcygnbGVmdCcpO1xyXG5cclxuICAgIG1hcmdpbkNvbnRyb2xXcmFwKCk7XHJcbiAgICBwYWdpbmcoKTtcclxuICB9XHJcblxyXG4gIHZhciBjdXJyZW50SW5kZXggPSAwO1xyXG4gIHZhciBuZXh0SW5kZXggPSAwO1xyXG4gIHZhciBwcmV2SW5kZXggPSAwO1xyXG4gIHZhciB0aW1lSUQ7XHJcbiAgdmFyIGNoZWNrSUQ7XHJcblxyXG4gIGZ1bmN0aW9uIG1vdmVMZWZ0KCkge1xyXG4gICAgaWYgKG5leHRJbmRleCA+PSAkKCcuY3NzLXNsaWRpbmctdmlldy1pbWFnZScpLmxlbmd0aCkge1xyXG4gICAgICBuZXh0SW5kZXggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVxKCnsl5Ag7J2M7IiYIOqwkuydhCDrhKPslrQg7KO866m0IOuStyDsiJzshJzrtoDthLAg7LCo66GA64yA66GcIOunpOy5rSDsi5ztgrRcclxuICAgICQoJy5jc3Mtc2xpZGluZy12aWV3LWltYWdlJykuZXEoY3VycmVudEluZGV4IC0gMSkucmVtb3ZlQ2xhc3MoJ2xlZnQgYW5pJykuYWRkQ2xhc3MoJ3JpZ2h0Jyk7XHJcbiAgICAkKCcuY3NzLXNsaWRpbmctdmlldy1pbWFnZScpLmVxKGN1cnJlbnRJbmRleCkucmVtb3ZlQ2xhc3MoJ2NlbnRlciBhbmknKS5hZGRDbGFzcygnbGVmdCBhbmknKTtcclxuICAgICQoJy5jc3Mtc2xpZGluZy12aWV3LWltYWdlJykuZXEobmV4dEluZGV4KS5yZW1vdmVDbGFzcygncmlnaHQnKS5hZGRDbGFzcygnY2VudGVyIGFuaScpO1xyXG5cclxuICAgIGN1cnJlbnRJbmRleCA9IG5leHRJbmRleDtcclxuICAgIG5leHRJbmRleCsrO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbW92ZVJpZ2h0KCkge1xyXG4gICAgaWYgKG5leHRJbmRleCA8PSAtMSkge1xyXG4gICAgICBuZXh0SW5kZXggPSAkKCcuY3NzLXNsaWRpbmctdmlldy1pbWFnZScpLmxlbmd0aCAtIDE7XHJcbiAgICB9XHJcbiAgICBpZiAocHJldkluZGV4ID49ICQoJy5jc3Mtc2xpZGluZy12aWV3LWltYWdlJykubGVuZ3RoKSB7XHJcbiAgICAgIHByZXZJbmRleCA9IDA7XHJcbiAgICB9XHJcbiAgICAkKCcuY3NzLXNsaWRpbmctdmlldy1pbWFnZScpLmVxKHByZXZJbmRleCkucmVtb3ZlQ2xhc3MoJ3JpZ2h0IGFuaScpLmFkZENsYXNzKCdsZWZ0Jyk7XHJcbiAgICAkKCcuY3NzLXNsaWRpbmctdmlldy1pbWFnZScpLmVxKGN1cnJlbnRJbmRleCkucmVtb3ZlQ2xhc3MoJ2NlbnRlciBhbmknKS5hZGRDbGFzcygncmlnaHQgYW5pJyk7XHJcbiAgICAkKCcuY3NzLXNsaWRpbmctdmlldy1pbWFnZScpLmVxKG5leHRJbmRleCkucmVtb3ZlQ2xhc3MoJ2xlZnQnKS5hZGRDbGFzcygnY2VudGVyIGFuaScpO1xyXG5cclxuICAgIGN1cnJlbnRJbmRleCA9IG5leHRJbmRleDtcclxuICAgIHByZXZJbmRleCA9IGN1cnJlbnRJbmRleCArIDE7XHJcbiAgICBuZXh0SW5kZXgtLTtcclxuICB9XHJcblxyXG4gIC8vIOyLpO2Wieu2gFxyXG4gIGluaXQoKTtcclxuICBhdXRvUm9sbGluZygpO1xyXG5cclxuICAvLyDrp6TqsJwg67OA7IiY66W8IOydtOyaqe2VmOyXrCDsoozsmrAg7YG066at7J2EIOqwhOyGjO2ZlCDrp4zrk6TquLBcclxuICB2YXIgYWN0aXZlQ2xpY2sgPSBmdW5jdGlvbihkaXJlY3Rpb24pIHtcclxuICAgIHZhciBkaXIgPSBkaXJlY3Rpb247XHJcbiAgICAvLyBsZWZ0KCkgcmlnaHQoKSDsnpHrj5kg7Iuc6rCEKC5hbmkpIGNsYXNz7J2YIOyekeuPmeyLnOqwhOydhCDstpTstpztlZjsl6wg67OA7IiYIOyggOyepVxyXG4gICAgLy8gZG9t7J20IOuhnOuTnOyLnCBhbmkgY2xhc3PqsIAgcmVhZGluZ+ydtCDrkJjsp4Ag7JWK7J2AIOyDge2DnOydtOuvgOuhnCB0cmFuc2l0aW9uLWR1cmF0aW9u6rCS7J2EIOyduOyLne2VmOyngCDrqrvtlZzri6QuXHJcbiAgICAvLyBtb3Zl7YG066at7J2066OoIOu2gO2EsCDsnpHrj5nrkJjquLAg65WM66y47JeQIOyymOydjOu2gO2EsCBqYXZhc2NyaXB066GcIOygnOyWtCDtlZjripTqsoPsnbQg7Jqp7J207ZWY64ukXHJcbiAgICB2YXIgbW92ZVRpbWUgPSAocGFyc2VJbnQoJCgnLmFuaScpLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicpKSkgKiAxMDAwO1xyXG4gICAgLy8gY29uc29sZS5sb2cocGFyc2VJbnQoICQoJy5hbmknKS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nKSkpO1xyXG4gICAgY29uc29sZS5sb2coJCgnLmFuaScpLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicpKTtcclxuICAgIGlmIChkaXIgPT0gJ3JpZ2h0Jykge1xyXG4gICAgICBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xyXG4gICAgICBtb3ZlTGVmdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmV4dEluZGV4ID0gY3VycmVudEluZGV4IC0gMTtcclxuICAgICAgcHJldkluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcclxuICAgICAgbW92ZVJpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyICRzZWxlY3RvciA9ICQoJy5jc3Mtc2xpZGluZy1hcnJvdy4nICsgZGlyKTsgLy8gJCgnLmNzcy1zbGlkaW5nLWFycm93LnJpZ2h0JylcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAvLyDsnqzqt4Ag7ZWo7IiYIC0g7Jew7IaNIOyLpO2WiSDtlZjsp4Ag66q77ZWY64+E66GdIO2VmOq4sOychO2VtCBvbmUoKSDtlajsiJjrpbwg7IKs7JqpIO2VmOqzoCAx7LSI65Kk7JeQIOyerO2ZnOyaqSDtlaAg7IiYIOyeiOqyjCDtlZjripQg67Cp7IudXHJcbiAgICAgICRzZWxlY3Rvci5vbmUoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYWN0aXZlQ2xpY2soZGlyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8qICAgIGlmKCBkaXIgPT0gJ2xlZnQnKXtcclxuICAgICAgICAgICAgICAkKCcuY3NzLXNsaWRpbmctYXJyb3cucmlnaHQnKS5vbmUoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgYWN0aXZlQ2xpY2soZGlyKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAkKCcuY3NzLXNsaWRpbmctYXJyb3cubGVmdCcpLm9uZSgnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBhY3RpdmVDbGljayhkaXIpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICovXHJcbiAgICB9LCBtb3ZlVGltZSk7XHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gYXV0b1JvbGxpbmcoKSB7XHJcbiAgICB0aW1lSUQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCQoJy5jc3Mtc2xpZGluZy1idG4tY29udHJvbCcpLmhhc0NsYXNzKCdwbGF5JykpIHtcclxuICAgICAgICAkKCcuY3NzLXNsaWRpbmctYnRuLWNvbnRyb2wnKS5yZW1vdmVDbGFzcygncGxheScpLmFkZENsYXNzKCdwYXVzZScpLnRleHQoJ3BhdXNlJyk7XHJcbiAgICAgIH1cclxuICAgICAgbmV4dEluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcclxuICAgICAgaWYgKCEkKCcuY3NzLXNsaWRpbmctdmlldy1pbWFnZScpLmlzKCc6YW5pbWF0ZWQnKSkge1xyXG4gICAgICAgIG1vdmVMZWZ0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGltZUlEKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aW1lSUQpO1xyXG4gICAgfSwgMzAwMCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gICQoJy5jc3Mtc2xpZGluZy1hcnJvdy5yaWdodCcpLnN0b3AoKS5vbmUoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBwYXVzZUFuZFJlQXV0bygpO1xyXG4gICAgYWN0aXZlQ2xpY2soJ3JpZ2h0Jyk7XHJcbiAgfSk7XHJcblxyXG4gICQoJy5jc3Mtc2xpZGluZy1hcnJvdy5sZWZ0Jykuc3RvcCgpLm9uZSgnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIHBhdXNlQW5kUmVBdXRvKCk7XHJcbiAgICBhY3RpdmVDbGljaygnbGVmdCcpO1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBtYXJnaW5Db250cm9sV3JhcCgpIHsgLy8gY29udHJvbCBidXR0b24gY2VudGVyIOuwsOy5mFxyXG4gICAgdmFyIHdyYXBXaWR0aCA9ICQoJy5jc3Mtc2xpZGluZy1jb250cm9sLXdyYXAnKS53aWR0aCgpO1xyXG4gICAgJCgnLmNzcy1zbGlkaW5nLWNvbnRyb2wtd3JhcCcpLmNzcyh7XHJcbiAgICAgICdtYXJnaW4tbGVmdCc6IC0od3JhcFdpZHRoIC8gMilcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGFnaW5nKCkge1xyXG4gICAgdmFyIGltZ051bWJlciA9ICQoJy5jc3Mtc2xpZGluZy12aWV3LWltYWdlJykubGVuZ3RoOyAvLyBzaXplKCkg6rCc7IiYIOq1rO2VmOuKlCDtlajsiJhcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1nTnVtYmVyOyBpKyspIHtcclxuICAgICAgJCgnLmNzcy1zbGlkaW5nLXBhZ2luZycpLmFwcGVuZCgnPGxpIGNsYXNzPVwiY3NzLXNsaWRpbmctcGFnaW5nLWl0ZW1cIj48YSBocmVmPVwiI1wiPicgKyAoaSArIDEpICsgJzwvYT48L2xpPicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jc3Mtc2xpZGluZy1idG4tY29udHJvbC5wYXVzZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGNsZWFySW50ZXJ2YWwodGltZUlEKTtcclxuICAgIC8vIGUudGFyZ2V0XHJcbiAgICAkKGUudGFyZ2V0KS5yZW1vdmVDbGFzcygncGF1c2UnKS5hZGRDbGFzcygncGxheScpO1xyXG4gICAgJChlLnRhcmdldCkudGV4dCgncGxheScpO1xyXG4gICAgLy8gJCh0aGlzKS5yZW1vdmVDbGFzcygncGF1c2UnKS5hZGRDbGFzcygncGxheScpO1xyXG4gICAgLy8gJCh0aGlzKS50ZXh0KCdwbGF5Jyk7XHJcbiAgICBjb25zb2xlLmxvZygn7IOB7YOcIFBBVVNFJyk7XHJcbiAgICBjb25zb2xlLmxvZygkKGUudGFnZXQpKTtcclxuICB9KTtcclxuXHJcbiAgLy8gYXV0b1JvbGxpbmcgYnV0dG9uXHJcbiAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jc3Mtc2xpZGluZy1idG4tY29udHJvbC5wbGF5JywgZnVuY3Rpb24oZSkge1xyXG4gICAgYXV0b1JvbGxpbmcoKTtcclxuICAgIC8vIGUudGFyZ2V0XHJcbiAgICAkKGUudGFyZ2V0KS5yZW1vdmVDbGFzcygncGxheScpLmFkZENsYXNzKCdwYXVzZScpO1xyXG4gICAgJChlLnRhcmdldCkudGV4dCgncGF1c2UnKTtcclxuICAgIGNvbnNvbGUubG9nKCQoZS50YWdldCkpO1xyXG4gICAgY29uc29sZS5sb2coJ+yDge2DnCBQTEFZJyk7XHJcbiAgfSk7XHJcblxyXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuY3NzLXNsaWRpbmctcGFnaW5nLWl0ZW0nLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgcGF1c2VBbmRSZUF1dG8oKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIC8vIO2BtOumre2VnCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuCA6IGluZGV4KCkg7ZWo7IiYIOyCrOyaqVxyXG4gICAgLy8g7J2067Kk7Yq4IOuMgOyDgeydtCBvbigpIO2VqOyImOydmCDsnbjsnpDroZwg66qF7Iuc7ZW07KO864qUIOqyveyasOyXkCDtlbTri7kg64yA7IOB7J20ICQodGhpcykg6rCAIOuQqCAo7ZiE7J6sIDogJy5wYWdpbmctaXRlbScgKVxyXG4gICAgY29uc29sZS5sb2coJCh0aGlzKS5pbmRleCgnLmNzcy1zbGlkaW5nLXBhZ2luZy1pdGVtJykpO1xyXG5cclxuICAgIHZhciBpbmRleE51bWJlciA9ICQodGhpcykuaW5kZXgoJy5jc3Mtc2xpZGluZy1wYWdpbmctaXRlbScpO1xyXG5cclxuICAgIGlmIChjdXJyZW50SW5kZXggIT0gaW5kZXhOdW1iZXIpIHtcclxuICAgICAgaWYgKGN1cnJlbnRJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgaWYgKGluZGV4TnVtYmVyID09ICQoJy5jc3Mtc2xpZGluZy12aWV3LWltYWdlJykubGVuZ3RoIC0gMSkgeyAvL2xlbmd0aCAtMSDtlbTso7zripQg7J207Jyg64qUIC52aWV3LWltYWdl66W8IOqwgOynhCDsnbTrr7jsp4Ag7IiY66W8IO2ZleyduCDtlZjripTrjbAg7J6I7Ja0IDDrtoDthLAg7Iir7J6Q66W8IOyEuOq4sCDrlYzrrLjsl5AgKzHroZwg6rCv7IiY66GcIOyVjOq4sCDsnITtlajsnbTri6QuXHJcbiAgICAgICAgICBhY3RpdmVDbGljaygnbGVmdCcpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV4dEluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcclxuICAgICAgICAgIGlmICghJCgnLmNzcy1zbGlkaW5nLXZpZXctaW1pYWdlJykuaXMoJzphbmltYXRlZCcpKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZUNsaWNrKCdyaWdodCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW5kZXggPT0gJCgnLmNzcy1zbGlkaW5nLXZpZXctaW1hZ2UnKS5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgaWYgKGluZGV4TnVtYmVyID09IDApIHtcclxuICAgICAgICAgIG5leHRJbmRleCA9IGN1cnJlbnRJbmRleCArIDE7XHJcbiAgICAgICAgICBpZiAoISQoJy5jc3Mtc2xpZGluZy12aWV3LWltYWdlJykuaXMoJzphbmltYXRlZCcpKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZUNsaWNrKCdyaWdodCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggLSAxO1xyXG4gICAgICAgICAgaWYgKCEkKCcuY3NzLXNsaWRpbmctdmlldy1pbWFnZScpLmlzKCc6YW5pbWF0ZWQnKSkge1xyXG4gICAgICAgICAgICBhY3RpdmVDbGljaygnbGVmdCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA8IGluZGV4TnVtYmVyKSB7XHJcbiAgICAgICAgICBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xyXG4gICAgICAgICAgaWYgKCEkKCcuY3NzLXNsaWRpbmctdmlldy1pbWFnZScpLmlzKCc6YW5pbWF0ZWQnKSkge1xyXG4gICAgICAgICAgICBhY3RpdmVDbGljaygncmlnaHQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV4dEluZGV4ID0gY3VycmVudEluZGV4IC0gMTtcclxuICAgICAgICAgIGlmICghJCgnLmNzcy1zbGlkaW5nLXZpZXctaW1hZ2UnKS5pcygnOmFuaW1hdGVkJykpIHtcclxuICAgICAgICAgICAgYWN0aXZlQ2xpY2soJ2xlZnQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gcGF1c2VBbmRSZUF1dG8oKSB7XHJcbiAgICBjbGVhckludGVydmFsKHRpbWVJRCk7XHJcbiAgICAvLyDsi5zqsIQg7LK07YGsIC0g7YG066at7ZWcIOydtO2bhOyXkCDri6Tsi5wg7YG066at7ZWY64qUIOyLnOqwhFxyXG4gICAgLy8gaGFzQ2xhc3MoKSDtlajsiJhcclxuICAgIGlmICgkKCcuY3NzLXNsaWRpbmctYnRuLWNvbnRyb2wnKS5oYXNDbGFzcygncGF1c2UnKSkge1xyXG4gICAgICAkKCcuY3NzLXNsaWRpbmctYnRuLWNvbnRyb2wnKS5yZW1vdmVDbGFzcygncGF1c2UnKS5hZGRDbGFzcygncGxheScpLnRleHQoJ3BsYXknKTtcclxuICAgIH1cclxuICAgIGNsZWFySW50ZXJ2YWwoY2hlY2tJRCk7XHJcblxyXG4gICAgdmFyIGNvdW50ID0gMDtcclxuXHJcbiAgICBjaGVja0lEID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmIChjb3VudCA9PSA1KSB7XHJcbiAgICAgICAgYXV0b1JvbGxpbmcoKTtcclxuICAgICAgICBjbGVhckludGVydmFsKGNoZWNrSUQpOyAvLyDsp4Dsho3soIHsnLzroZwg7Lm07Jq07YSwIO2VmOuKlOqyg+ydhCDrsKnsp4DtlZjquLAg7JyE7ZWcIOyEpOyglVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKCdhdXRvUm9sbGluZyA6ICcgKyBjb3VudCk7IC8vIGF1dG9Sb2xsaW5nIOuLpOyLnCDsi5zsnpHtlZjrj4TroZ0g7ZWY64qUIOyEpOyglSDsubTsmrTthLBcclxuICAgICAgY291bnQrKztcclxuICAgIH0sIDEwMDApO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vRW5kXHJcbn0pO1xyXG4iLCIvKipcclxuICogSW1hZ2UgU2xpZGluZyAtIGpRdWVyeVxyXG4gKi9cclxuXHJcbi8v7KeE7J6F67aAXHJcbiQoZnVuY3Rpb24oKXtcclxuICAvLyDshKDslrjrtoBcclxuICBmdW5jdGlvbiBpbml0KCl7XHJcbiAgICAkKCcuanMtc2xpZGluZyAuanMtdmlldy1pbWFnZScpLmVxKDApLmNzcyh7bGVmdDogMH0pO1xyXG4gICAgJCgnLmpzLXNsaWRpbmcgLmpzLXZpZXctaW1hZ2UnKS5lcSgxKS5jc3Moe2xlZnQ6IDQwMH0pO1xyXG4gICAgJCgnLmpzLXNsaWRpbmcgLmpzLXZpZXctaW1hZ2UnKS5lcSgyKS5jc3Moe2xlZnQ6IC00MDB9KTtcclxuICAgIG1hcmdpbkNvbnRyb2xXcmFwKCk7IC8vIGNvbnRyb2wgYnV0dG9uIGNlbnRlciDrsLDsuZhcclxuICAgIHBhZ2luZygpO1xyXG4gIH1cclxuXHJcbiAgdmFyIGN1cnJlbnRJbmRleCA9IDAgO1xyXG4gIHZhciBuZXh0SW5kZXggPSAwO1xyXG4gIHZhciB0aW1lSUQgO1xyXG4gIHZhciBjaGVja0lEO1xyXG5cclxuICBmdW5jdGlvbiBtb3ZlTGVmdCgpe1xyXG5cclxuICAgIGlmKG5leHRJbmRleCA+PSAkKCcuanMtc2xpZGluZyAuanMtdmlldy1pbWFnZScpLmxlbmd0aCl7XHJcbiAgICBuZXh0SW5kZXggPSAwO1xyXG4gICAgfVxyXG4gICAgJCgnLmpzLXNsaWRpbmcgLmpzLXZpZXctaW1hZ2UnKS5lcShjdXJyZW50SW5kZXgpLnN0b3AoKS5hbmltYXRlKHtsZWZ0OiAtNDAwfSwgMTAwMCwgJ2Vhc2VPdXRCb3VuY2UnKTtcclxuICAgICQoJy5qcy1zbGlkaW5nIC5qcy12aWV3LWltYWdlJykuZXEobmV4dEluZGV4KS5jc3Moe2xlZnQ6NDAwfSkuc3RvcCgpLmFuaW1hdGUoe2xlZnQ6MH0gLCAxMDAwLCAnZWFzZU91dEJvdW5jZScpO1xyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKCduZXh0SW5kZXggOiAnICsgbmV4dEluZGV4KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKCcx67KI7Ke4JyArICQoJy5qcy1zbGlkaW5nIC52aWV3LWltYWdlJykuZXEoMCkub2Zmc2V0KCkubGVmdCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnMuuyiOynuCcgKyAkKCcuanMtc2xpZGluZyAudmlldy1pbWFnZScpLmVxKDEpLm9mZnNldCgpLmxlZnQpO1xyXG4gICAgLy8gY29uc29sZS5sb2coJzPrsojsp7gnICsgJCgnLmpzLXNsaWRpbmcgLnZpZXctaW1hZ2UnKS5lcSgyKS5vZmZzZXQoKS5sZWZ0KTtcclxuXHJcbiAgICBjdXJyZW50SW5kZXggPSBuZXh0SW5kZXg7XHJcbiAgICBuZXh0SW5kZXgrKztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG1vdmVSaWdodCgpe1xyXG5cclxuICAgIGlmKG5leHRJbmRleCA8IDApe1xyXG4gICAgbmV4dEluZGV4ID0gJCgnLmpzLXNsaWRpbmcgIC5qcy12aWV3LWltYWdlJykubGVuZ3RoLTE7IC8vIOyduOuNseyKpCDrhJjrsoTripQgMOu2gO2EsCDsi5zsnpHtlZjquLDrlYzrrLjsl5AgLTHsnYQg64yA7J6F7ZWc64ukLlxyXG4gICAgfVxyXG5cclxuICAgICQoJy5qcy1zbGlkaW5nICAuanMtdmlldy1pbWFnZScpLmVxKCBjdXJyZW50SW5kZXggKS5zdG9wKCkuYW5pbWF0ZSh7bGVmdDogNDAwfSwgMTAwMCwgJ2Vhc2VJbk91dEJvdW5jZScsIGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zb2xlLmxvZyggJCgnLmpzLXNsaWRpbmcgIC5qcy12aWV3LWltYWdlOmFuaW1hdGVkJykpOyAgLy8gdmlldy1pbWFnZeqwgCDslaDri4jrqZTsnbTshZgg64+Z7J6R7ZWgIOuVjCDroZzqt7jrgrTsmqkg7Lac66ClIOy9nOuwse2VqOyImOyehOycvOuhnCDslYTrnpgg6rCZ7J2AIOq1rOusuOuztOuLpCDriqbqsowg7Lac66Cl65Cc64ukLlxyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZyggJCgnLmpzLXNsaWRpbmcgLmpzLXZpZXctaW1hZ2U6YW5pbWF0ZWQnKSk7IC8vIHZpZXctaW1hZ2XqsIAg7JWg64uI66mU7J207IWYIOuPmeyeke2VoCDrlYwg66Gc6re464K07JqpIOy2nOugpVxyXG4gICAgJCgnLmpzLXZpZXctaW1hZ2UnKS5lcSggbmV4dEluZGV4ICkuY3NzKHtsZWZ0Oi00MDB9KS5zdG9wKCkuYW5pbWF0ZSh7bGVmdDowfSAsIDEwMDAsICdlYXNlSW5PdXRCb3VuY2UnKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZygnbmV4dEluZGV4IDogJyArIG5leHRJbmRleCk7XHJcbiAgICBjb25zb2xlLmxvZygnMeuyiOynuCcgKyAkKCcuanMtc2xpZGluZyAuanMtdmlldy1pbWFnZScpLmVxKDApLm9mZnNldCgpLmxlZnQpO1xyXG4gICAgY29uc29sZS5sb2coJzLrsojsp7gnICsgJCgnLmpzLXNsaWRpbmcgLmpzLXZpZXctaW1hZ2UnKS5lcSgxKS5vZmZzZXQoKS5sZWZ0KTtcclxuICAgIGNvbnNvbGUubG9nKCcz67KI7Ke4JyArICQoJy5qcy1zbGlkaW5nIC5qcy12aWV3LWltYWdlJykuZXEoMikub2Zmc2V0KCkubGVmdCk7XHJcblxyXG4gICAgY3VycmVudEluZGV4ID0gbmV4dEluZGV4O1xyXG4gICAgbmV4dEluZGV4LS07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBtYXJnaW5Db250cm9sV3JhcCgpeyAvLyBjb250cm9sIGJ1dHRvbiBjZW50ZXIg67Cw7LmYXHJcbiAgICB2YXIgd3JhcFdpZHRoID0gJCgnLmNvbnRyb2wtd3JhcCcpLndpZHRoKCk7XHJcbiAgICAkKCcuY29udHJvbC13cmFwJykuY3NzKHtcclxuICAgICAgJ21hcmdpbi1sZWZ0JyA6IC0oIHdyYXBXaWR0aCAvIDIgKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwYWdpbmcoKXtcclxuICAgIHZhciBpbWdOdW1iZXIgPSAkKCcuanMtdmlldy1pbWFnZScpLmxlbmd0aDsgLy8gc2l6ZSgpIOqwnOyImCDqtaztlZjripQg7ZWo7IiYXHJcbiAgICBmb3IodmFyIGk9MDsgaTxpbWdOdW1iZXI7IGkrKyl7XHJcbiAgICAgICQoJy5wYWdpbmcnKS5hcHBlbmQoJzxsaSBjbGFzcz1cInBhZ2luZy1pdGVtXCI+PGEgaHJlZj1cIiNcIj4nICsgKGkrMSkgKyAnPC9hPjwvbGk+Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjbGlja1BhZ2luZygpe1xyXG5cclxuICB9XHJcblxyXG4vLyDsi6TtlonrtoBcclxuaW5pdCgpO1xyXG5hdXRvUm9sbGluZygpO1xyXG5cclxuZnVuY3Rpb24gYXV0b1JvbGxpbmcoKXtcclxuICB0aW1lSUQgPSBzZXRJbnRlcnZhbCggZnVuY3Rpb24oKXtcclxuICBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggKzE7XHJcbiAgaWYoICEkKCcuanMtdmlldy1pbWFnZScpLmlzKCc6YW5pbWF0ZWQnKSApe1xyXG4gICAgbW92ZUxlZnQoKTtcclxuICAgIH1cclxuICAvLyBjb25zb2xlLmxvZyh0aW1lSUQpO1xyXG59LCAzMDAwKTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiQoJy5hcnJvdy5yaWdodCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgLy8gY2xlYXJJbnRlcmNhbCgpIDogc2V0SW50ZXJ2YWwoKSDtlajsiJgg7KeE7ZaJ7J2EIOy3qOyGjCDtlZjripQg7ZWo7IiYXHJcbiAgY2xlYXJJbnRlcnZhbCh0aW1lSUQpO1xyXG4gIC8vIOyLnOqwhCDssrTtgawgLSDtgbTrpq3tlZwg7J207ZuE7JeQIOuLpOyLnCDtgbTrpq3tlZjripQg7Iuc6rCEXHJcbiAgY2xlYXJJbnRlcnZhbChjaGVja0lEKTtcclxuICB2YXIgY291bnQgPSAwO1xyXG5cclxuICBjaGVja0lEID0gc2V0SW50ZXJ2YWwoIGZ1bmN0aW9uKCl7XHJcbiAgICBpZihjb3VudCA9PSA1KXtcclxuICAgICAgYXV0b1JvbGxpbmcoKTtcclxuICAgICAgY2xlYXJJbnRlcnZhbChjaGVja0lEKTsgLy8g7KeA7IaN7KCB7Jy866GcIOy5tOyatO2EsCDtlZjripTqsoPsnYQg67Cp7KeA7ZWY6riwIOychO2VnCDshKTsoJVcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKCdhdXRvUm9sbGluZyA6ICcgKyBjb3VudCk7IC8vIGF1dG9Sb2xsaW5nIOuLpOyLnCDsi5zsnpHtlZjrj4TroZ0g7ZWY64qUIOyEpOyglSDsubTsmrTthLBcclxuICAgIGNvdW50Kys7XHJcbiAgfSwgMTAwMCk7XHJcblxyXG4gIG5leHRJbmRleCA9IGN1cnJlbnRJbmRleCArMSA7XHJcbiAgLy8g7JWg64uI66mU7J207IWY7J20IOynhO2WieuQmOyngCDslYrsnYQg65aEIO2VqOyImCDsi6TtlolcclxuICAvLyB2aWV3LWltYWdl6rCAIOyVoOuLiOuplOydtOyFmCDsnpHrj5nsi5wg7ZWo7IiY66W8IOyCrOyaqe2VmOyngCDrqrvtlZjqsowg7ZWgIOyImCDsnojripQg67Cp67KV7J20IOyXhuydjOycvOuhnCDsnpHrj5nsnbQg7JWE64uQ65WMKCEp7IKs7JqpIOyekeuPme2VmOuKlCDrsKnrspXsnLzroZwg7J2R7Jqp7ZWc64ukLlxyXG4gIGlmKCAhJCgnLmpzLXZpZXctaW1hZ2UnKS5pcygnOmFuaW1hdGVkJykgKXsgLy8gaXMoKSDtlajsiJgg7IKs7Jqp7ZWY7JesIGFuaW1hdGVk6rCAIOyLpO2WieuQmOyngCDslYrsnYTrlYwgbW92ZUxlZnQoKeqwgCDsi6TtlonrkJjrj4TroZ0g7ZWc64ukLlxyXG4gICAgbW92ZUxlZnQoKTtcclxuICB9XHJcblxyXG59KTtcclxuXHJcbiQoJy5hcnJvdy5sZWZ0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAvLyBjbGVhckludGVyY2FsKCkgOiBzZXRJbnRlcnZhbCgpIO2VqOyImCDsp4TtlonsnYQg7Leo7IaMIO2VmOuKlCDtlajsiJhcclxuICBjbGVhckludGVydmFsKHRpbWVJRCk7XHJcbiAgLy8g7Iuc6rCEIOyytO2BrCAtIO2BtOumre2VnCDsnbTtm4Tsl5Ag64uk7IucIO2BtOumre2VmOuKlCDsi5zqsIRcclxuICBjbGVhckludGVydmFsKGNoZWNrSUQpO1xyXG4gIHZhciBjb3VudCA9IDA7XHJcblxyXG4gIGNoZWNrSUQgPSBzZXRJbnRlcnZhbCggZnVuY3Rpb24oKXtcclxuICAgIGlmKGNvdW50ID09IDUpe1xyXG4gICAgICBhdXRvUm9sbGluZygpO1xyXG4gICAgICBjbGVhckludGVydmFsKGNoZWNrSUQpOyAvLyDsp4Dsho3soIHsnLzroZwg7Lm07Jq07YSwIO2VmOuKlOqyg+ydhCDrsKnsp4DtlZjquLAg7JyE7ZWcIOyEpOyglVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coJ2F1dG9Sb2xsaW5nIDogJyArIGNvdW50KTsgLy8gYXV0b1JvbGxpbmcg64uk7IucIOyLnOyeke2VmOuPhOuhnSDtlZjripQg7ISk7KCVIOy5tOyatO2EsFxyXG4gICAgY291bnQrKztcclxuICB9LCAxMDAwKTtcclxuICBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggLTEgO1xyXG4gIG1vdmVSaWdodCgpO1xyXG4gIH0pO1xyXG5cclxuLy8g64+Z7KCB7Jy866GcIOyDneyEseuQnCDtgbTrnpjsiqTripQg7JWE656Y7JmAIOqwmeydtCDsoJzslrTrkJjsp4Ag7JWK64qU64ukLiDqt7jroIfquLDrlYzrrLjsl5Ag7JWE656Y7JmAIOqwmeydtCAkKGRvY3VtZW50Ke2VqOyImOulvCDsgqzsmqntlbTslbwg7ZWc64ukLlxyXG4vLyAvLyBhdXRvUm9sbGluZyBwYXVzZSDrsoTtirxcclxuLy8gJCgnLmJ0bi1jb250cm9sLnBhdXNlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuLy8gICBjbGVhckludGVydmFsKHRpbWVJRCk7XHJcbi8vICAgJCh0aGlzKS5yZW1vdmVDbGFzcygncGF1c2UnKS5hZGRDbGFzcygncGxheScpO1xyXG4vLyAgICQodGhpcykudGV4dCgncGxheScpO1xyXG4vLyAgIGNvbnNvbGUubG9nKCdwbGF5Jyk7XHJcbi8vIH0pO1xyXG4vL1xyXG4vLyAvLyBhdXRvUm9sbGluZyBwbGF5IOuyhO2KvFxyXG4vLyAkKCcuYnRuLWNvbnRyb2wucGxheScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbi8vICAgY2xlYXJJbnRlcnZhbCh0aW1lSUQpO1xyXG4vLyAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ3BsYXknKS5hZGRDbGFzcygncGF1c2UnKTtcclxuLy8gICBjb25zb2xlLmxvZygncGF1c2UnKTtcclxuLy8gICAkKHRoaXMpLnRleHQoJ3BhdXNlJyk7XHJcbi8vIH0pO1xyXG4vLyBBbiBldmVudC1kZWxlZ2F0aW9uIGFwcHJvYWNoIGF0dGFjaGVzIGFuIGV2ZW50IGhhbmRsZXIgdG8gb25seSBvbmUgZWxlbWVudCwgdGhlIHRib2R5LCBhbmQgdGhlIGV2ZW50IG9ubHkgbmVlZHMgdG8gYnViYmxlIHVwIG9uZSBsZXZlbCAoZnJvbSB0aGUgY2xpY2tlZCB0ciB0byB0Ym9keSk6XHJcbi8v7J2067Kk7Yq4IOychOyehCDsoJHqt7zrspXsnYAg7ZWY64KY7J2YIOyalOyGjCDsnbggdGJvZHnsl5Ag7J2067Kk7Yq4IO2VuOuTpOufrOulvCDssqjrtoDtlZjqs6Ag7J2067Kk7Yq464qUIO2BtOumrSDrkJwgdHLsl5DshJwgdGJvZHnquYzsp4Ag7ZWcIOyImOykgCDsnITroZwg67KE67iUIOunge2VtOyVvO2VqeuLiOuLpFxyXG5cclxuJChkb2N1bWVudCkub24oJ2NsaWNrJywnLmJ0bi1jb250cm9sLnBhdXNlJywgZnVuY3Rpb24oZSl7XHJcbiAgY2xlYXJJbnRlcnZhbCh0aW1lSUQpO1xyXG4gIC8vIGUudGFyZ2V0XHJcbiAgJChlLnRhcmdldCkucmVtb3ZlQ2xhc3MoJ3BhdXNlJykuYWRkQ2xhc3MoJ3BsYXknKTtcclxuICAkKGUudGFyZ2V0KS50ZXh0KCdwbGF5Jyk7XHJcbiAgLy8gJCh0aGlzKS5yZW1vdmVDbGFzcygncGF1c2UnKS5hZGRDbGFzcygncGxheScpO1xyXG4gIC8vICQodGhpcykudGV4dCgncGxheScpO1xyXG4gIGNvbnNvbGUubG9nKCfsg4Htg5wgUEFVU0UnKTtcclxuICBjb25zb2xlLmxvZygkKGUudGFnZXQpKTtcclxufSk7XHJcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsJy5idG4tY29udHJvbC5wbGF5JywgZnVuY3Rpb24oZSl7XHJcbiAgYXV0b1JvbGxpbmcoKTtcclxuICAvLyBlLnRhcmdldFxyXG4gICQoZS50YXJnZXQpLnJlbW92ZUNsYXNzKCdwbGF5JykuYWRkQ2xhc3MoJ3BhdXNlJyk7XHJcbiAgJChlLnRhcmdldCkudGV4dCgncGF1c2UnKTtcclxuICBjb25zb2xlLmxvZygkKGUudGFnZXQpKTtcclxuICBjb25zb2xlLmxvZygn7IOB7YOcIFBMQVknKTtcclxufSk7XHJcblxyXG4vLyDtjpjsnbTsp4Ag67KI7Zi4XHJcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsJy5wYWdpbmctaXRlbScsIGZ1bmN0aW9uKGUpe1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICAvLyDtgbTrpq3tlZwg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLggOiBpbmRleCgpIO2VqOyImCDsgqzsmqlcclxuICAvLyDsnbTrsqTtirgg64yA7IOB7J20IG9uKCkg7ZWo7IiY7J2YIOyduOyekOuhnCDrqoXsi5ztlbTso7zripQg6rK97Jqw7JeQIO2VtOuLuSDrjIDsg4HsnbQgJCh0aGlzKSDqsIAg65CoICjtmITsnqwgOiAnLnBhZ2luZy1pdGVtJyApXHJcbiAgY29uc29sZS5sb2coICQodGhpcykuaW5kZXgoJy5wYWdpbmctaXRlbScpICk7XHJcblxyXG4gIHZhciBpbmRleE51bWJlciA9ICQodGhpcykuaW5kZXgoJy5wYWdpbmctaXRlbScpO1xyXG5cclxuICBpZiAoY3VycmVudEluZGV4ICE9IGluZGV4TnVtYmVyKSB7XHJcbiAgICBpZiggY3VycmVudEluZGV4ID09IDApe1xyXG4gICAgICBpZiggaW5kZXhOdW1iZXIgPT0gJCgnLmpzLXZpZXctaW1hZ2UnKS5sZW5ndGgtMSkgeyAgIC8vbGVuZ3RoIC0xIO2VtOyjvOuKlCDsnbTsnKDripQgLnZpZXctaW1hZ2Xrpbwg6rCA7KeEIOydtOuvuOyngCDsiJjrpbwg7ZmV7J24IO2VmOuKlOuNsCDsnojslrQgMOu2gO2EsCDsiKvsnpDrpbwg7IS46riwIOuVjOusuOyXkCArMeuhnCDqsK/siJjroZwg7JWM6riwIOychO2VqOydtOuLpC5cclxuICAgICAgICBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggLSAxO1xyXG4gICAgICAgIGlmKCAhJCgnLmpzLXZpZXctaW1hZ2UnKS5pcygnYW5pbWF0ZWQnKSl7XHJcbiAgICAgICAgICBtb3ZlUmlnaHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV4dEluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcclxuICAgICAgICBpZiggISQoJy5qcy12aWV3LWltaWFnZScpLmlzKCc6YW5pbWF0ZWQnKSl7XHJcbiAgICAgICAgICBtb3ZlTGVmdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmKCBjdXJyZW50SW5kZXggPT0gJCgnLnZpZXctaW1hZ2UnKS5sZW5ndGgtMSApe1xyXG4gICAgICBpZiggaW5kZXhOdW1iZXIgPT0gMCApe1xyXG4gICAgICAgIG5leHRJbmRleCA9IGN1cnJlbnRJbmRleCArIDE7XHJcbiAgICAgICAgaWYoICEkKCcuanMtdmlldy1pbWFnZScpLmlzKCc6YW5pbWF0ZWQnKSApe1xyXG4gICAgICAgICAgbW92ZUxlZnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV4dEluZGV4ID0gY3VycmVudEluZGV4IC0gMTtcclxuICAgICAgICBpZiggISQoJy5qcy12aWV3LWltYWdlJykuaXMoJzphbmltYXRlZCcpICl7XHJcbiAgICAgICAgICBtb3ZlUmlnaHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICBpZiggY3VycmVudEluZGV4IDwgaW5kZXhOdW1iZXIgKXtcclxuICAgICAgICBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xyXG4gICAgICAgIGlmKCAhJCgnLmpzLXZpZXctaW1hZ2UnKS5pcygnOmFuaW1hdGVkJykgKXtcclxuICAgICAgICAgICBtb3ZlTGVmdCgpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5leHRJbmRleCA9IGN1cnJlbnRJbmRleCAtIDE7XHJcbiAgICAgICAgaWYoICEkKCcuanMtdmlldy1pbWFnZScpLmlzKCc6YW5pbWF0ZWQnKSApe1xyXG4gICAgICAgICAgIG1vdmVSaWdodCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbi8vRW5kXHJcbn0pO1xyXG4iXX0=
