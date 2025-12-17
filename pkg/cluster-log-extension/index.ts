import { importTypes } from '@rancher/auto-import';
import { IPlugin } from '@shell/core/types';
import extensionRouting from './routing/extension-routing';

// Importamos el package.json y el archivo product directamente
// TypeScript gestiona esto mejor que el 'require' antiguo
import pkg from './package.json';
import product from './product';

// Init the package
export default function(plugin: IPlugin) {
  // Auto-import model, detail, edit desde las carpetas pkg
  importTypes(plugin);

  // Proporciona los metadatos de la extensión (nombre, versión, etc.)
  plugin.metadata = pkg;

  // Carga la definición del producto (menú lateral, iconos, etc.)
  plugin.addProduct(product);

  // Añade las rutas de Vue para las páginas de la extensión
  plugin.addRoutes(extensionRouting);
}
