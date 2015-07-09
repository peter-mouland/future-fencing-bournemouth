var pkg = require('./package.json');
var imagesAndFontsGlob = '/{.,*}/*.{ico,png,jpg,jpeg,gif,svg,ttf,woff,eot}';
var serverFilesGlob = '/*{CNAME,.htaccess,robots.txt,manifest.json}';

module.exports = {
    pkg: pkg,
    buildPaths: [
        {source: "./src", target: './_site', minify: true}
    ],
    tasks : {
        copy: ['home_files', serverFilesGlob],
        bump: ['package.json','README.md', '*/app.json'],
        build: ['sass', 'mustache', 'browserify'],
        serve: 'staticApp',
        //test: 'karma',
        release: ['gh-pages']
    }
    //,karma: ['./test/karma.functional.js',  './test/karma.unit.js']
};