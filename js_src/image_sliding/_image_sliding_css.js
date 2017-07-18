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
