import preact from 'preact';
import {pop} from '../utils';


export const Marker = function(props) {
  // Buble doesn't support object rest, ok?
  let type = pop(props, 'type'),
      name = pop(props, 'name', ''),
      children = pop(props, 'children', []);

  return (
    <div {...props}>
      <input type='hidden' name='__start__' value={`${name}:${type}`}/>
      {children}
      <input type='hidden' name='__end__' value={`${name}:${type}`}/>
    </div>
  );
};
