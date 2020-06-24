import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  IDisposable, DisposableDelegate
} from '@lumino/disposable';

import {
  DocumentRegistry
} from '@jupyterlab/docregistry';

import {
  NotebookPanel, INotebookModel
} from '@jupyterlab/notebook';

/**
 * Initialization data for the nbcommjlab2 extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'nbcommjlab2',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension nbcommjlab2 is activated!');
	app.docRegistry.addWidgetExtension('Notebook', new NBCommExtension());
  }
};


/**
 * A notebook extension to test Comm creation in Jupyterlab
 */
export
class NBCommExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  /**
   * Create a new extension object.
   */
  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {

	console.log("createNew debug ");
    Promise.all([panel.revealed, panel.sessionContext.ready, context.ready]).then(function() {
		console.log("Promise all debug");
		//const session = context.sessionContext.session;
		const session = panel.sessionContext.session;
		const kernelInstance = session.kernel;

 		try {
			console.log("try registerCommTarget ");
			
			kernelInstance.registerCommTarget('my_comm_target', (comm: any, msg: any) => {
				console.log("registerCommTarget debug");
				// comm is the frontend comm instance
				// msg is the comm_open message, which can carry data

				// Register handlers for later messages:
				//comm.on_msg(function(msg) {console.log("message received: ",msg);});
				//comm.on_close(function(msg) {console.log("Comm my_comm_target closed");});
				
				comm.onMsg = (msg: any) => {console.log("message received: ",msg);comm.send({'foo': 3});};
				comm.onClose = (msg: any) => {console.log("comm onClose");};
				comm.send({'foo': 0});

			});
		}
		catch(err) {
			console.log("registerCommTarget error : ",err.message);
		}
		
    });
	
    return new DisposableDelegate(() => {
    });

  }
}

export default extension;

