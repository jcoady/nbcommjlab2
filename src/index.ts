import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the nbcommjlab2 extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'nbcommjlab2',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension nbcommjlab2 is activated!');
  }
};

export default extension;
