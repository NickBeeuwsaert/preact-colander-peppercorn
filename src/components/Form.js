import preact from 'preact';
import BookForm from './BookForm';

export default class Form extends preact.Component {

    constructor({books=[
        {
            title: '',
            chapters: [
                {
                    title: ''
                }
            ]
        }
    ], name}) {
        super();

        this.setState({books, name});
    }

    updateBooks({books}) {
        this.setState({books});
    }

    render({method='POST', action=''}, {books, name}) {
        return <form method={method} action={action}>
            <h1>Book list</h1>
            <div class="form-group">
                <label>List name</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    class="form-control"
                    onInput={this.linkState('name')}
                />
            </div>
            <BookForm books={books} onChange={this.updateBooks.bind(this)}/>
            <button>Create list</button>
        </form>;
    }
}