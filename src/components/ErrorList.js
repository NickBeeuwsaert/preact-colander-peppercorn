import preact from 'preact';
import Component from '../component';

export default ({errors=[]}) => (
    errors && errors.length ?
    <ul class="errors">{errors.map(msg => <li>{msg}</li>)}</ul>:null
);
