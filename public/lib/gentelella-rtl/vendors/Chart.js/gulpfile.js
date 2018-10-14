<<<<<<< HEAD
var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var eslint = require('gulp-eslint');
var file = require('gulp-file');
var htmlv = require('gulp-html-validator');
var insert = require('gulp-insert');
var replace = require('gulp-replace');
var size = require('gulp-size');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var zip = require('gulp-zip');
var exec = require('child-process-promise').exec;
var karma = require('karma');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var merge = require('merge-stream');
var collapse = require('bundle-collapser/plugin');
var argv  = require('yargs').argv
var path = require('path');
var package = require('./package.json');

var srcDir = './src/';
var outDir = './dist/';
var testDir = './test/';
=======
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  util = require('gulp-util'),
  jshint = require('gulp-jshint'),
  size = require('gulp-size'),
  connect = require('gulp-connect'),
  replace = require('gulp-replace'),
  htmlv = require('gulp-html-validator'),
  insert = require('gulp-insert'),
  inquirer = require('inquirer'),
  semver = require('semver'),
  exec = require('child_process').exec,
  fs = require('fs'),
  package = require('./package.json'),
  bower = require('./bower.json'),
  karma = require('gulp-karma'),
  browserify = require('browserify'),
  streamify = require('gulp-streamify'),
  source = require('vinyl-source-stream'),
  merge = require('merge-stream');

var srcDir = './src/';
var outDir = './dist/';
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

var header = "/*!\n" +
  " * Chart.js\n" +
  " * http://chartjs.org/\n" +
  " * Version: {{ version }}\n" +
  " *\n" +
<<<<<<< HEAD
  " * Copyright 2017 Nick Downie\n" +
=======
  " * Copyright 2016 Nick Downie\n" +
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
  " * Released under the MIT license\n" +
  " * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md\n" +
  " */\n";

<<<<<<< HEAD
gulp.task('bower', bowerTask);
gulp.task('build', buildTask);
gulp.task('package', packageTask);
gulp.task('watch', watchTask);
gulp.task('lint', lintTask);
gulp.task('docs', docsTask);
gulp.task('test', ['lint', 'validHTML', 'unittest']);
=======
var preTestFiles = [
  './node_modules/moment/min/moment.min.js',
];

var testFiles = [
  './test/mockContext.js',
  './test/*.js',

  // Disable tests which need to be rewritten based on changes introduced by
  // the following changes: https://github.com/chartjs/Chart.js/pull/2346
  '!./test/core.layoutService.tests.js',
  '!./test/defaultConfig.tests.js',
];

gulp.task('build', buildTask);
gulp.task('coverage', coverageTask);
gulp.task('watch', watchTask);
gulp.task('bump', bumpTask);
gulp.task('release', ['build'], releaseTask);
gulp.task('jshint', jshintTask);
gulp.task('test', ['jshint', 'validHTML', 'unittest']);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
gulp.task('size', ['library-size', 'module-sizes']);
gulp.task('server', serverTask);
gulp.task('validHTML', validHTMLTask);
gulp.task('unittest', unittestTask);
<<<<<<< HEAD
=======
gulp.task('unittestWatch', unittestWatchTask);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
gulp.task('library-size', librarySizeTask);
gulp.task('module-sizes', moduleSizesTask);
gulp.task('_open', _openTask);
gulp.task('dev', ['server', 'default']);
<<<<<<< HEAD
gulp.task('default', ['build', 'watch']);

/**
 * Generates the bower.json manifest file which will be pushed along release tags.
 * Specs: https://github.com/bower/spec/blob/master/json.md
 */
function bowerTask() {
  var json = JSON.stringify({
      name: package.name,
      description: package.description,
      homepage: package.homepage,
      license: package.license,
      version: package.version,
      main: outDir + "Chart.js",
      ignore: [
        '.github',
        '.codeclimate.yml',
        '.gitignore',
        '.npmignore',
        '.travis.yml',
        'scripts'
      ]
    }, null, 2);

  return file('bower.json', json, { src: true })
    .pipe(gulp.dest('./'));
}

function buildTask() {

  var bundled = browserify('./src/chart.js', { standalone: 'Chart' })
    .plugin(collapse)
=======

gulp.task('default', ['build', 'watch']);


function buildTask() {

  var bundled = browserify('./src/chart.js')
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    .bundle()
    .pipe(source('Chart.bundle.js'))
    .pipe(insert.prepend(header))
    .pipe(streamify(replace('{{ version }}', package.version)))
    .pipe(gulp.dest(outDir))
    .pipe(streamify(uglify()))
    .pipe(insert.prepend(header))
    .pipe(streamify(replace('{{ version }}', package.version)))
    .pipe(streamify(concat('Chart.bundle.min.js')))
    .pipe(gulp.dest(outDir));

<<<<<<< HEAD
  var nonBundled = browserify('./src/chart.js', { standalone: 'Chart' })
    .ignore('moment')
    .plugin(collapse)
=======
  var nonBundled = browserify('./src/chart.js')
    .ignore('moment')
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    .bundle()
    .pipe(source('Chart.js'))
    .pipe(insert.prepend(header))
    .pipe(streamify(replace('{{ version }}', package.version)))
    .pipe(gulp.dest(outDir))
    .pipe(streamify(uglify()))
    .pipe(insert.prepend(header))
    .pipe(streamify(replace('{{ version }}', package.version)))
    .pipe(streamify(concat('Chart.min.js')))
    .pipe(gulp.dest(outDir));

  return merge(bundled, nonBundled);

}

<<<<<<< HEAD
function packageTask() {
  return merge(
      // gather "regular" files landing in the package root
      gulp.src([outDir + '*.js', 'LICENSE.md']),

      // since we moved the dist files one folder up (package root), we need to rewrite
      // samples src="../dist/ to src="../ and then copy them in the /samples directory.
      gulp.src('./samples/**/*', { base: '.' })
        .pipe(streamify(replace(/src="((?:\.\.\/)+)dist\//g, 'src="$1')))
  )
  // finally, create the zip archive
  .pipe(zip('Chart.js.zip'))
  .pipe(gulp.dest(outDir));
}

function lintTask() {
  var files = [
    srcDir + '**/*.js',
    testDir + '**/*.js'
  ];

  // NOTE(SB) codeclimate has 'complexity' and 'max-statements' eslint rules way too strict
  // compare to what the current codebase can support, and since it's not straightforward
  // to fix, let's turn them as warnings and rewrite code later progressively.
  var options = {
    rules: {
      'complexity': [1, 6],
      'max-statements': [1, 30]
    },
    globals: [
      'Chart',
      'acquireChart',
      'afterAll',
      'afterEach',
      'beforeAll',
      'beforeEach',
      'describe',
      'expect',
      'fail',
      'it',
      'jasmine',
      'moment',
      'spyOn',
      'xit'
    ]
  };

  return gulp.src(files)
    .pipe(eslint(options))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function docsTask(done) {
  const script = require.resolve('gitbook-cli/bin/gitbook.js');
  const cmd = process.execPath;

  exec([cmd, script, 'install', './'].join(' ')).then(() => {
    return exec([cmd, script, 'build', './', './dist/docs'].join(' '));
  }).catch((err) => {
    console.error(err.stdout);
  }).then(() => {
    done();
  });
}

=======
/*
 *  Usage : gulp bump
 *  Prompts: Version increment to bump
 *  Output: - New version number written into package.json & bower.json
 */
function bumpTask(complete) {
  util.log('Current version:', util.colors.cyan(package.version));
  var choices = ['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease'].map(function(versionType) {
    return versionType + ' (v' + semver.inc(package.version, versionType) + ')';
  });
  inquirer.prompt({
    type: 'list',
    name: 'version',
    message: 'What version update would you like?',
    choices: choices
  }, function(res) {
    var increment = res.version.split(' ')[0],
      newVersion = semver.inc(package.version, increment),
      oldVersion = package.version;

    // Set the new versions into the bower/package object
    package.version = newVersion;
    bower.version = newVersion;

    // Write these to their own files, then build the output
    fs.writeFileSync('package.json', JSON.stringify(package, null, 2));
    fs.writeFileSync('bower.json', JSON.stringify(bower, null, 2));
    
    var oldCDN = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/'+oldVersion+'/Chart.min.js',
      newCDN = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/'+newVersion+'/Chart.min.js';
    
    gulp.src(['./README.md'])
      .pipe(replace(oldCDN, newCDN))
      .pipe(gulp.dest('./'));

    complete();
  });
}


function releaseTask() {
  exec('git tag -a v' + package.version);
}


function jshintTask() {
  return gulp.src(srcDir + '**/*.js')
    .pipe(jshint('config.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
}


>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
function validHTMLTask() {
  return gulp.src('samples/*.html')
    .pipe(htmlv());
}

function startTest() {
<<<<<<< HEAD
  return [
    {pattern: './test/fixtures/**/*.json', included: false},
    {pattern: './test/fixtures/**/*.png', included: false},
    './node_modules/moment/min/moment.min.js',
    './test/jasmine.index.js',
    './src/**/*.js',
  ].concat(
    argv.inputs?
      argv.inputs.split(';'):
      ['./test/specs/**/*.js']
  );
}

function unittestTask(done) {
  new karma.Server({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: !argv.watch,
    files: startTest(),
    args: {
      coverage: !!argv.coverage
    }
  }, done).start();
=======
  var files = ['./src/**/*.js'];
  Array.prototype.unshift.apply(files, preTestFiles);
  Array.prototype.push.apply(files, testFiles);
  return files;
}

function unittestTask() {
  return gulp.src(startTest())
    .pipe(karma({
      configFile: 'karma.conf.ci.js',
      action: 'run'
    }));
}

function unittestWatchTask() {
  return gulp.src(startTest())
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
}

function coverageTask() {
  return gulp.src(startTest())
    .pipe(karma({
      configFile: 'karma.coverage.conf.js',
      action: 'run'
    }));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
}

function librarySizeTask() {
  return gulp.src('dist/Chart.bundle.min.js')
    .pipe(size({
      gzip: true
    }));
}

function moduleSizesTask() {
  return gulp.src(srcDir + '**/*.js')
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(size({
      showFiles: true,
      gzip: true
    }));
}

function watchTask() {
  if (util.env.test) {
    return gulp.watch('./src/**', ['build', 'unittest', 'unittestWatch']);
  }
  return gulp.watch('./src/**', ['build']);
}

function serverTask() {
  connect.server({
    port: 8000
  });
}

// Convenience task for opening the project straight from the command line

function _openTask() {
  exec('open http://localhost:8000');
  exec('subl .');
}
