import './news.css';
import { IDraw, IArticle } from '../../../types/index';

class News implements IDraw<IArticle> {
    draw(data: IArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            if (idx % 2) {
                const newsCloneItem = newsClone.querySelector('.news__item') as HTMLDivElement;
                newsCloneItem.classList.add('alt');
            }

            const newsCloneImage = newsClone.querySelector('.news__meta-photo') as HTMLDivElement;
            newsCloneImage.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const newsCloneAuthor = newsClone.querySelector('.news__meta-author') as HTMLLIElement;
            newsCloneAuthor.textContent = item.author || item.source.name;

            const newsCloneDate = newsClone.querySelector('.news__meta-date') as HTMLLIElement;
            newsCloneDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsCloneTitle = newsClone.querySelector('.news__description-title') as HTMLHeadingElement;
            newsCloneTitle.textContent = item.title;

            const newsCloneSource = newsClone.querySelector('.news__description-source') as HTMLHeadingElement;
            newsCloneSource.textContent = item.source.name;

            const newsCloneContent = newsClone.querySelector('.news__description-content') as HTMLParagraphElement;
            newsCloneContent.textContent = item.description;

            const newsCloneMore = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
            newsCloneMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const mainNews = document.querySelector('.news') as HTMLDivElement;
        mainNews.innerHTML = '';
        mainNews.appendChild(fragment);
    }
}

export default News;
