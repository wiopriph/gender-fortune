import svgLoader from 'vite-svg-loader';
import StylelintPlugin from 'vite-plugin-stylelint';


export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    css: [
        '~/assets/scss/global.scss',
    ],

    devtools: {enabled: true},
    ssr: false,
    vite: {
        plugins: [
            StylelintPlugin(),
            svgLoader({
                svgo: false,
            }),
        ],

        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern',
                },
            },
        },
    },
})
