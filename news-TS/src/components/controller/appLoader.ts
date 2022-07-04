import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '7af2c632159747118078af9085bce66f', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
