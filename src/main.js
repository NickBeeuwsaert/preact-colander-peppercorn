import preact, {render} from 'preact';
import Form from './components/Form';

const $$ = selector => document.querySelectorAll(selector),
      $  = selector => document.querySelector(selector);

const currentScript = document.currentScript || (function(scripts) {
    return scripts[scripts.length-1];
})($$('script'));

const data   = JSON.parse(currentScript.getAttribute('data-data')),
      errors = JSON.parse(currentScript.getAttribute('data-errors')),
      target = $(currentScript.getAttribute('data-target'));


render(<Form {...data} errors={errors}/>, target);
