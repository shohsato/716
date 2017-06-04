/* jshint node:true */
'use strict';

// gulpプラグインの読み込み
// ------------------------------------------
var gulp           = require('gulp'),
    autoprefixer   = require('autoprefixer'),/*caniuseベースでベンダープレフィックスをつける*/
    bourbon        = require('node-bourbon'),/*sassのmixin集*/
    browserSync    = require('browser-sync'),/*ブラウザを自動リロードさせる*/
    // changed        = require('gulp-changed'),/*変更ファイルの監視*/
    cached         = require('gulp-cached'),/*対象となるファイルをメモリにキャッシュし、変更された分だけを処理させる*/
    csso           = require('gulp-csso'),/*cssの圧縮*//*未使用*/
    del            = require('del'),/*ファイルを削除してくれる*//*未使用*/
    filter         = require('gulp-filter'),/*フィルタリング*//*未使用*/
    flatten        = require('gulp-flatten'),/*指定したディレクトリにフラットに配置する場合*//*未使用*/
    glob           = require('glob'),/*対象となるファイル群を指定できる*/
    iconfont       = require('gulp-iconfont'),
    iconfontCss    = require('gulp-iconfont-css'),
    gulpif         = require('gulp-if'),/*gulpのタスクの処理で、いろいろな条件指定をできるようにする*/
    imagemin       = require('gulp-imagemin'),/*画像の軽量化（イマイチ）*/
    jshint         = require('gulp-jshint'),/*jsの構文チェック*/
    jshintStylish  = require('jshint-stylish'),/*gulp-jshintの出力をスタイリッシュにする*/
    mmq            = require('gulp-merge-media-queries'),/*メディアクエリを整理＆まとめてくれる*/
    notify         = require('gulp-notify'),/*エラー時にデスクトップに通知してくれる*/
    plumber        = require('gulp-plumber'),/*エラー時にタスクが矯正停止するのを防止*/
    postcss        = require('gulp-postcss'),/*PostCSS系のプラfグインを使えるようにする*/
    pug            = require('gulp-pug'),/*pug*/
    replace        = require('gulp-replace'),/*文字列の置換*/
    sass           = require('gulp-sass'),/*sass*/
    sourcemaps     = require('gulp-sourcemaps'),/*sourcemapsを作成する*/
    styledocco     = require('gulp-styledocco'),/*スタイルガイドを作成する*/
    uglify         = require('gulp-uglify'),/*jsの圧縮*//*未使用*/
    uncss          = require('gulp-uncss'),/*htmlが参照していないcssを削除してくれる*/
    useref         = require('gulp-useref'),/*html内のcssやjsの読込み部分を変更（ファイルをまとめてくれたりする）*/
    crLfReplace    = require('gulp-cr-lf-replace'),/*改行コードを指定できる*/
    mainBowerFiles = require('main-bower-files'),/*BowerでインストールしたWebフォントをコピー*/
    wiredep        = require('wiredep'),/*Bowerの依存関係をソースコードに組み込む*/
    runSequence    = require('run-sequence').stream;/*gulpタスクの実行順序を指定できる*/


// 初期化
// ------------------------------------------
gulp.task('init', function() {
  var bstFilter = filter(['**/_bootstrap.scss', '**/_variables.scss']);
  return gulp.src(['bower_components/bootstrap-sass-official/assets/stylesheets/**'])
    .pipe(bstFilter)
    .pipe(gulpif('**/_bootstrap.scss', replace('@import "bootstrap/', '@import "../../bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap/')))
    .pipe(gulpif('**/_variables.scss', replace(' !default;', ';')))
    .pipe(gulpif('**/_variables.scss', replace('"../fonts/bootstrap/"', '"../bower_components/bootstrap-sass-official/assets/fonts/bootstrap/"')))
    .pipe(flatten())
    .pipe(gulp.dest('dev/scss'));
});


// pug to html コンパイル
// ------------------------------------------
gulp.task('pug', function() {
  return gulp.src(['dev/pug/**/*.pug', '!dev/pug/**/_*.pug'])
    // .pipe(changed('pug', {extension: '.pug'}))
    // .pipe(cached('pug'))
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(pug({
      pretty: true,
      basedir: 'dev/pug'
    }))
    .pipe(gulp.dest('dev'));
});


// bourbon
// ------------------------------------------
bourbon.with('dev/scss/**/style.scss');/*bourbon.includePathsに入る*/


// Sass コンパイル
// ------------------------------------------
gulp.task('sass', function () {
  var processors = [
    autoprefixer({browsers: ['last 2 version']})
  ];
  return gulp.src('dev/scss/style.scss')
    // .pipe(cached('sass'))
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: bourbon.includePaths
    }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./maps'))
    .pipe(crLfReplace({
      changeCode: 'CR+LF' // CR+LF, LF, CR
    }))
    .pipe(gulp.dest('dev/css'));
});


// Style Guide
// ------------------------------------------
// gulp.task('styleguide', ['sass'], function () {
//   gulp.src('dev/css/**/*.css')
//     .pipe(styledocco({
//       out: 'style_guide',
//       name: 'Style Guide',
//       'no-minify': true
//     }));
// });

// gulp.task("aigis", function() {
//   gulp.src("./aigis_config.yml")
//     .pipe(aigis());
// });


// アイコンフォント生成
// ------------------------------------------
gulp.task('iconfonts', function(){
  return gulp.src(['dev/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: 'myicons',
      path: 'dev/icons/templates/_myicons.scss',
      targetPath: '../scss/components/_myicons.scss',
      fontPath: '../../fonts/'
    }))
    .pipe(iconfont({
      fontName: 'myicons'
    }))
    .pipe(gulp.dest('dev/fonts'));
});


// Lint JavaScript
// ------------------------------------------
gulp.task('jshint', function () {
  return gulp.src('dev/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


// HTMLで参照しているCSS/JSファイルを結合・minify
// ------------------------------------------
gulp.task('html', ['sass'], function () {
  return gulp.src('dev/**/*.html')
    .pipe(useref({ searchPath: 'dev' }))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', uncss({
      html: glob.sync('dev/**/*.html'),
      ignore: [
        /\.mdn-/,
        /\.js-/,
        /\.open/,
        /\.active/,
        /\.collapse/,
        /\.tooltip/,
        /\.popover/,
        /\.carousel/,
        /\.affix/,
        /\.in/,
        /\.animated/
      ]
    })))
    .pipe(gulpif('*.css', mmq()))
    .pipe(gulpif('*.css', csso()))
    .pipe(gulpif('*.css', replace('../bower_components/bootstrap-sass-official/assets/fonts/bootstrap', '../fonts')))
    .pipe(gulpif('*.css', replace('../bower_components/fontawesome/fonts', '../fonts')))
    // .pipe(assets.restore())
    .pipe(gulp.dest('htdocs'));
});


// jpeg, png, gif, svgの最適化
// ------------------------------------------
gulp.task('images', function () {
  return gulp.src('dev/images/**/*')
    .pipe(cached(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('htdocs/images'));
});


// BowerでインストールしたWebフォントをコピー
// ------------------------------------------
gulp.task('fonts', function () {
  return gulp.src(mainBowerFiles().concat('dev/fonts/**/*'))
    .pipe(filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe(flatten())
    .pipe(gulp.dest('htdocs/fonts'));
});


// dev -> htdocs リソースコピー
// ------------------------------------------
gulp.task('devcopy', function () {
  return gulp.src([
    'dev/*.*',
    '!dev/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('htdocs'));
});


// htdocsフォルダを初期化
// ------------------------------------------
gulp.task('clean',
  del.bind(null, ['htdocs'])
);


// BrowserSync (dev)
// ------------------------------------------
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: 'dev',
      routes: {
        "/bower_components": "bower_components"
      }
    }
  });
});


// BowerコンポーネントのパスをHTML/CSSに自動挿入
// ------------------------------------------
gulp.task('wiredep', function () {
  gulp.src('dev/pug/**/*.pug')
    .pipe(wiredep({
      directory: 'bower_components',
      ignorePath: '../../',
      exclude: [
        'bootstrap-sass-official',
        'modernizr',
        'respond'
      ]}))
    .pipe(gulp.dest('dev/pug'));

  gulp.src('dev/scss/*.scss')
    .pipe(wiredep({
      directory: 'bower_components',
      ignorePath: '',
      exclude: [
        'bootstrap-sass-official'
      ]}))
    .pipe(gulp.dest('dev/scss'));
});


// 変更ファイルの監視
// ------------------------------------------
gulp.task('watch', ['serve'], function () {
  gulp.watch([
    'dev/**/*.html',
    'dev/css/**/*',
    'dev/js/**/*.js',
    'dev/fonts/**/*',
    'dev/images/**/*'
  ], {interval: 500}).on('change', browserSync.reload);
  gulp.watch('dev/pug/**/*.pug', ['pug']);
  gulp.watch('dev/scss/**/*.*', ['sass']);
  gulp.watch('dev/js/**/*.js', ['jshint']);
  gulp.watch('dev/images/**/*', ['images']);
  gulp.watch('dev/icons/**/*.svg', ['iconfonts']);
  gulp.watch('bower.json', ['wiredep']);
});
gulp.task('w', ['watch']);  // watch タスクのエイリアス


// 公開時のセットを生成
// ------------------------------------------
gulp.task('build', ['clean'], function (cb) {
  runSequence('pug', 'sass', ['jshint', 'html', 'images', 'fonts', 'devcopy'], cb);
  // runSequence('pug', 'sass', ['jshint', 'html', 'images', 'devcopy'], cb);
});
