import {src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';


const sass = gulpSass(dartSass);

export function js(done){
    src('src/js/app.js')
        .pipe(dest('dist/js'))

    done()
}

export function css(done) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe( sass(). on('error', sass.logError) )
        .pipe( dest('dist/css', {sourcemaps: '.'} ) )

    done();
}

export function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
}

export const build = series(js, css);
export default series(js, css, dev);

