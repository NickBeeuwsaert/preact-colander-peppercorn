import {Component as BaseComponent} from 'preact';

/*
This handleInput method could probably be a helper function...
But whatever I like (ab)using inheritance, get over it
*/
export default class Component extends BaseComponent {
    handleInput({target}) {
        if(!('onChange' in this.props)) return;

        this.props.onChange({
            [target.name]: target.value
        });
    }
}
