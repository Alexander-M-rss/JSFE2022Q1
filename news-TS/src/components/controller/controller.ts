import AppLoader from './appLoader';
import { drawContentFunc, IAppController, apiOptions } from '../../types/index';

class AppController extends AppLoader implements IAppController {
    getSources(callback: drawContentFunc): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getTopHeadlines(callback: drawContentFunc): void {
        const permitedCountries: string[] = [
            'ae',
            'ar',
            'at',
            'au',
            'be',
            'bg',
            'br',
            'ca',
            'ch',
            'cn',
            'co',
            'cu',
            'cz',
            'de',
            'eg',
            'fr',
            'gb',
            'gr',
            'hk',
            'hu',
            'id',
            'ie',
            'il',
            'in',
            'it',
            'jp',
            'kr',
            'lt',
            'lv',
            'ma',
            'mx',
            'my',
            'ng',
            'nl',
            'no',
            'nz',
            'ph',
            'pl',
            'pt',
            'ro',
            'rs',
            'ru',
            'sa',
            'se',
            'sg',
            'si',
            'sk',
            'th',
            'tr',
            'tw',
            'ua',
            'us',
            've',
            'za',
        ];
        const options: apiOptions = { country: '' };

        fetch('https://ipapi.co/json/')
            .then((res: Response): Promise<{ country: string }> => res.json())
            .then((json: { country: string }): void => {
                options.country = json.country.toLowerCase();
                if (!permitedCountries.includes(options.country)) {
                    options.language = 'en';
                    delete options.country;
                }

                super.getResp(
                    {
                        endpoint: 'top-headlines',
                        options,
                    },
                    callback
                );
            });
    }

    getNews(e: MouseEvent, callback: drawContentFunc): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
