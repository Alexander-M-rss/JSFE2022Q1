import News from './news/news';
import Sources from './sources/sources';
import { IApiResponse, IDraw, IArticle, ISource, IAppView } from '../../types/index';

export class AppView implements IAppView {
    news: IDraw<IArticle>;
    sources: IDraw<ISource>;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IApiResponse): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IApiResponse): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
