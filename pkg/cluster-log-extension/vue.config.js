const ENTRY_FILE = './index.ts';

// Reemplaza la línea vieja por esto:
module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  // Aquí se le dice a Vue que el archivo de entrada de tu extensión es index.ts, no src/main.ts
  pages: {
    index: {
      entry: ENTRY_FILE,
      // template: 'public/index.html', // Generalmente no se necesita en extensiones
      filename: 'index.html'
    }
  }
});
