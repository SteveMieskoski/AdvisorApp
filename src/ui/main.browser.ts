/*
 * Electron Render Process Items
 */
import './electronRenderProcess/context_menu.js';
import './electronRenderProcess/external_links.js';
const unhandled = require('electron-unhandled');
/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { bootloader } from '@angularclass/hmr';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';

unhandled(); // handle uncaught errors
/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));

}


bootloader(main);
