import preact, {render} from 'preact';
import App from './components/App';

const $$ = selector => document.querySelectorAll(selector),
      $  = selector => document.querySelector(selector);

const currentScript = document.currentScript || (function(scripts) {
  return scripts[scripts.length-1];
})($$('script'));

const data   = JSON.parse(currentScript.getAttribute('data-data')),
      errors = JSON.parse(currentScript.getAttribute('data-errors')),
      target = $(currentScript.getAttribute('data-target'));


render(<App data={data} errors={errors}/>, target);
