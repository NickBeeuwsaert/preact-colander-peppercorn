import preact from 'preact';

export default ({errors=[]}) => (
    errors && errors.length ?
    <ul class="errors">{errors.map(msg => <li>{msg}</li>)}</ul>:null
);
