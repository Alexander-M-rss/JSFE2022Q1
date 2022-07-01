import './sources.css';
import { Source } from '../../../types/index';

class Sources {
    draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;
            const sourceCloneName = sourceClone.querySelector('.source__item-name') as HTMLSpanElement;
            const sourceCloneItem = sourceClone.querySelector('.source__item') as HTMLDivElement;
            sourceCloneName.textContent = item.name;
            sourceCloneItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const mainSources = document.querySelector('.sources') as HTMLDivElement;
        mainSources.append(fragment);
    }
}

export default Sources;
