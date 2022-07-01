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
