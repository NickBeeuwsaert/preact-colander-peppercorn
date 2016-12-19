import preact from 'preact';

import Form from './Form';
import Component from '../component';
import defaults from '../defaultState';

export default class App extends Component {
  constructor(props) {
    super(props);

    let {books, name} = {
      ...defaults.bookList,
      ...props.data
    };

    this.setState({
      books, name
    });
  }

  render({
    errors, action, method="POST"
  }, {
    books, name
  }) {
    return <Form
      method="POST" action={action}
      books={books} name={name}
      onChange={this.setState.bind(this)}
      errors={errors}
    />;
  }
}
