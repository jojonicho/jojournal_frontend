const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'true',
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            // '@menu-dark-item-selected-color': '#000000',
            // '@menu-item-selected-color': '#000000',
            // '@menu-item-color': '#000000',
            '@menu-dark-color': '#999999',
            // '@menu-item-color': '#000',
            '@primary-color': '#99bbff',
            '@layout-header-background': '#e6f2ff',
            '@layout-body-background': '#ffffff',
            '@layout-header-height': '54px',
            // '@menu-item-active-bg': '#E8F8F5',
        },
    }),
);