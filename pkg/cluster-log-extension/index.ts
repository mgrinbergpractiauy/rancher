import { importTypes } from '@rancher/auto-import';
import { IPlugin } from '@shell/core/types';
import extensionRouting from './routing/extension-routing';
import pkg from './package.json'; // Importación directa
import product from './product';    // Importación directa

// Init the package
export default function(plugin: IPlugin) {
  // Auto-import model, detail, edit from the folders
  importTypes(plugin);

  // Provide extension metadata from package.json
  plugin.metadata = pkg;

  // Load a product
  plugin.addProduct(product);

  // Add Vue Routes
  plugin.addRoutes(extensionRouting);
}
