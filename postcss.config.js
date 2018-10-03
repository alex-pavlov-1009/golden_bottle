module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-url')({
            url: 'copy',
            basePath: 'src/helper_files',
            assetsPath: '../',
        }),
        require('postcss-variables'),
        require('postcss-nested'),
        require('postcss-clearfix'),
        require('autoprefixer')
    ],
};