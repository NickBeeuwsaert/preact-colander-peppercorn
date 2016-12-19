import preact from 'preact';
import ErrorList from './ErrorList';

export default ({
  label, name, value, type="text",
  onInput,
  errors=[]
}) => <div class="form-group">
  <label>{label}</label>
  <input
    type={type}
    value={value}
    name={name}
    onInput={onInput}
    class="form-control"
  />
  <ErrorList errors={errors}/>
</div>;
