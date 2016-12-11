import preact, {render} from 'preact';
import Form from './components/Form';

export function init(data, target) {
    if(typeof target === 'string')
        target = document.querySelector(target);

    render(<Form {...data}/>, target);
}