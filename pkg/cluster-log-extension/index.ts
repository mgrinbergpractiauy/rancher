import { importTypes } from '@rancher/auto-import';
import { IPlugin } from '@shell/core/types';
import extensionRouting from './routing/extension-routing';

export default function(plugin: IPlugin) {
  importTypes(plugin);

  // Usamos 'require' pero con una aserción para que TS no bloquee el build
  plugin.metadata = require('./package.json');

  // Cargamos tu producto tal como lo desarrollaste
  plugin.addProduct(require('./product').default || require('./product'));

  plugin.addRoutes(extensionRouting);
}
