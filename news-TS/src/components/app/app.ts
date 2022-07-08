import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IAppView, IApiResponse, IAppController } from '../../types/index';

class App {
    controller: IAppController;
    view: IAppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const mainSources = document.querySelector<HTMLDivElement>('.sources');

        if (mainSources) {
            mainSources.addEventListener('click', (e: MouseEvent) =>
                this.controller.getNews(e, (data: IApiResponse): void => this.view.drawNews(data))
            );
            this.controller.getTopHeadlines((data: IApiResponse): void => this.view.drawNews(data));
            this.controller.getSources((data: IApiResponse): void => this.view.drawSources(data));
        }
    }
}

export default App;
