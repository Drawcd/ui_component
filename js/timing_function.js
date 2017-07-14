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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl90aW1pbmdfZnVuY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0aW1pbmdfZnVuY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRWFzZSDqsJIg67mE6rWQXHJcbiAqL1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG4gIGZ1bmN0aW9uIHJlcGVhdCgpe1xyXG4gICAgJCgnLmJveDEnKS5jc3Moe3RvcDowfSkuc3RvcCgpLmFuaW1hdGUoe3RvcDo0NTB9LDIwMDAsICdlYXNlT3V0Qm91bmNlJyk7XHJcbiAgICAkKCcuYm94MicpLmNzcyh7dG9wOjB9KS5zdG9wKCkuYW5pbWF0ZSh7dG9wOjQ1MH0sMjAwMCwgJ2Vhc2VJbkV4cG8nKTtcclxuICAgICQoJy5ib3gzJykuY3NzKHt0b3A6MH0pLnN0b3AoKS5hbmltYXRlKHt0b3A6NDUwfSwyMDAwLCAnZWFzZU91dEV4cG8nKTtcclxuICAgICQoJy5ib3g0JykuY3NzKHt0b3A6MH0pLnN0b3AoKS5hbmltYXRlKHt0b3A6NDUwfSwyMDAwLCAnZWFzZUluT3V0RXhwbycpO1xyXG4gICAgJCgnLmJveDUnKS5jc3Moe3RvcDowfSkuc3RvcCgpLmFuaW1hdGUoe3RvcDo0NTB9LDIwMDAsICQuYmV6KFswLjE3LDAuNjcsMC44MywwLjY3XSkpO1xyXG4gIH1cclxuXHJcbiAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuICAgIHJlcGVhdCgpO1xyXG4gICAgY29uc29sZS5sb2coKTtcclxuICB9LDI1MDApO1xyXG5cclxufSk7XHJcbiJdfQ==
