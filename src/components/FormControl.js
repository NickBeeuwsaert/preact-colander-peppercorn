import preact from 'preact';
import Component from '../component';
import ErrorList from './ErrorList';

export default class FormControl extends Component {
    render({
        label, name, value,
        onInput,
        errors
    }) {
        return (
            <div class="form-group">
                <label>{label}</label>
                <input
                    type="text"
                    name={name}
                    value={value}
                    class="form-control"
                    onInput={onInput}
                />
                <ErrorList errors={errors}/>
            </div>
        );
    }
}