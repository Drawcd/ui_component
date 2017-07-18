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
