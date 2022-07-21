'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
    client: {
        lib: {
            css: [
                // bower:css
                //   'public/lib/bootstrap/dist/css/bootstrap.css',
                //     '//cdn.rawgit.com/morteza/bootstrap-rtl/v3.3.4/dist/css/bootstrap-rtl.min.css',
                //   'public/lib/gentelella-rtl/build/css/custom.css',
                // //  'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                   'public/lib/angular-ui-notification/dist/angular-ui-notification.css',
                //     '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css',
                //  //   '//cdn.rawgit.com/morteza/bootstrap-rtl/v3.3.4/dist/css/bootstrap-rtl.min.css'
                //     'public/lib/gentelella-rtl/vendors/nprogress/nprogress.css',
                //     'public/lib/gentelella-rtl/vendors/dropzone/dist/min/dropzone.min.css',
                //     'public/lib/gentelella-rtl/vendors/iCheck/skins/flat/green.css'
                //   // endbower

                "public/RTL/vendor/bootstrap/css/bootstrap.min.css",
                // "public/RTL/vendor/bootstrap/css/bootstrap-rtl.min.css",
                "public/RTL/vendor/fontawesome/css/font-awesome.min.css",
                "public/RTL/vendor/themify-icons/themify-icons.min.css",
                "public/RTL/vendor/animate.css/animate.min.css",
                "public/RTL/vendor/perfect-scrollbar/perfect-scrollbar.min.css",
                "public/RTL/vendor/switchery/switchery.min.css",
                <!-- end: MAIN CSS -->
                <!-- start: CLIP-TWO CSS -->
                "public/RTL/assets/css/styles.css",
                "public/RTL/assets/css/plugins.css",
                "public/RTL/assets/css/themes/theme-6.css",
                // "public/RTL/assets/css/rtl.css",
                'public/lib/ng-jalaali-flat-datepicker/dist/ng-jalaali-flat-datepicker.css',
            ],
            js: [
                // bower:js
                "public/RTL/vendor/jquery/jquery.min.js",
                "public/RTL/vendor/bootstrap/js/bootstrap.min.js",
                "public/RTL/vendor/modernizr/modernizr.js",
                "public/RTL/vendor/jquery-cookie/jquery.cookie.js",
                "public/RTL/vendor/perfect-scrollbar/perfect-scrollbar.min.js",
                "public/RTL/vendor/switchery/switchery.min.js",
                "public/RTL/assets/js/main.js",

                "public/lib/moment/min/moment.min.js",
                "public/lib/moment-jalaali/build/moment-jalaali.js",

                //   'public/lib/jquery/dist/jquery.js',
                //   'public/lib/bootstrap/dist/js/bootstrap.js',
                //   'public/lib/gentelella-rtl/build/js/custom.js',
                'public/lib/angular/angular.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/ng-file-upload/ng-file-upload.js',
                'public/lib/angular-messages/angular-messages.js',
                'public/lib/angular-mocks/angular-mocks.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-ui-notification/dist/angular-ui-notification.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
                "public/lib/chart.js/dist/Chart.js",
                "public/lib/angular-chart.js/angular-chart.js",
                'public/lib/ng-jalaali-flat-datepicker/dist/ng-jalaali-flat-datepicker.js',
                // endbower
            ],
            tests: ['public/lib/angular-mocks/angular-mocks.js']
        },
        css: [
            'modules/*/client/{css,less,scss}/*.css'
        ],
        less: [
            'modules/*/client/less/*.less'
        ],
        sass: [
            'modules/*/client/scss/*.scss'
        ],
        js: [
            'modules/core/client/app/config.js',
            'modules/core/client/app/init.js',
            'modules/*/client/*.js',
            'modules/*/client/**/*.js'
        ],
        img: [
            'modules/**/*/img/**/*.jpg',
            'modules/**/*/img/**/*.png',
            'modules/**/*/img/**/*.gif',
            'modules/**/*/img/**/*.svg'
        ],
        views: ['modules/*/client/views/**/*.html'],
        templates: ['build/templates.js']
    },
    server: {
        gulpConfig: ['gulpfile.js'],
        allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
        models: 'modules/*/server/models/**/*.js',
        routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
        sockets: 'modules/*/server/sockets/**/*.js',
        config: ['modules/*/server/config/*.js'],
        policies: 'modules/*/server/policies/*.js',
        views: ['modules/*/server/views/*.html']
    }
};
