import svgLoader from 'vite-svg-loader';
import StylelintPlugin from 'vite-plugin-stylelint';


export default defineNuxtConfig({
  css: [
    '~/assets/scss/global.scss',
  ],

  devtools: {
    enabled: false,
  },

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
});
