export interface IArticle {
    source: ISource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface ISource {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface IApiResponse {
    status: string;
    sources?: ISource[];
    articles?: IArticle[];
}

export interface IDraw<T> {
    draw: (value: T[]) => void;
}

export type apiRequest = {
    endpoint: endpoints;
    options?: apiOptions;
};

export type apiOptions = {
    apiKey?: string;
    sources?: string;
    language?: string;
    country?: string;
};

export type endpoints = 'sources' | 'everything' | 'top-headlines';

export type drawContentFunc = (data: IApiResponse) => void;

export enum httpErr {
    unauthorized = 401,
    notFound = 404,
}

export interface IAppView {
    drawNews(data: IApiResponse): void;
    drawSources(data: IApiResponse): void;
}

export interface IAppController {
    getSources(callback: drawContentFunc): void;
    getTopHeadlines(callback: drawContentFunc): void;
    getNews(e: MouseEvent, callback: drawContentFunc): void;
}
