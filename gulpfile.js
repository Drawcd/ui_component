var gulp = require('gulp');
var livereload = require('gulp-livereload');
var include = require('gulp-include');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');

 // hello world 라고 콘솔에 찍는 task
 // gulp.task('hello1', function () {
 //     return console.log('Hello World1!');
 // });

 // 1.새로고침 (livereload)
 //pipe()는 모듈의 기능을 실행해주는 함수
 // gulp.task('livereload', function(){gulp.src(['html/*','css/*','js/*','*']).pipe( livereload() ); 한줄 코드를 가독성을 위해 아래와 같이 작성한다.
 gulp.task('livereload', function(){
   gulp.src(['html/*','css/*','js/*','*'])
       .pipe( livereload() );

   // 경로가 여러개일 경우 []를 이용하여 배열 함수 방식으로 설치한다.
   // html/* 하위 폴더까지 적용된다.
 });

// 2.
 gulp.task('watch',function(){
   livereload.listen();
   gulp.watch('*',['livereload']);  // local folder안에 모든 파일 대상으로 수정되었을때 livereload task를 실행해라
   gulp.watch('html_src/**',['include','livereload']);
   gulp.watch('css_src/**',['sass','livereload']);
 // gulp.watch('수정될폴더',['수정되었을때 실행될 task']);
 });


 gulp.task('include',function(){
   gulp.src("html_src/*.html") // 원본 소스 경로
       .pipe(include())
       .on('error', console.log)
       .pipe(gulp.dest("html/")); //목적지 폴더 지정
 });

 //header , footer, 공통영역 분리


// SASS
gulp.task('sass',function(){
  return gulp.src('css_src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))  // {outputStyle: 'compressed'} 옵션을 주어 압축버전으로 출력되도록 정의 했다.
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'));
});




gulp.task('default',['livereload','include','sass','watch']);

// gulp.task('hello1');
