import preact from 'preact';

export default ({type='info', children}) => <div class={`flash ${type}`}>
  {children}
</div>;