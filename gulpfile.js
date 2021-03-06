var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var php = require('gulp-connect-php')

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {


    browserSync.init({
        proxy: "http://localhost/school-projects/proyecto-insae/",
        server: "./" //RUTA PRINCIPAL DONDE SE INICIALIZARÁ EL SERVIDOR
    });

    gulp.watch("./scss/*.scss", ['sass']); //RUTA DE LA CARPETA DE SASS ORIGEN
    gulp.watch("./*.html").on('change', browserSync.reload); //WATCH DE LOS ARCHIVOS HTML
    gulp.watch("./*.php").on('change', browserSync.reload); //WATCH DE LOS ARCHIVOS PHP
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./scss/*.scss") //CARPETA SCSS ORIGEN
        .pipe(wait(100))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./css/")) //CARPETA CSS DESTINO
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);