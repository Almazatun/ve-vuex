module.exports = {
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                @import "./src/assets/sass/variables.scss";
                @import "./src/assets/sass/mixins.scss";
                `
            },
        }
    }
};