const ViteCopy = require('vite-plugin-copy');

module.export = {
  plugins: [
    ViteCopy({
      targets: [
        { src: 'src/html/**/*', dest: 'bundled-v0.0.2/html' },
        // other targets
      ],
    }),
  ],
};
