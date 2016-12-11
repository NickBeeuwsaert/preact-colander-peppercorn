import preact from 'preact';
import Chapter from './Chapter';
import {Marker} from './peppercorn.js';

/** These *Form components are probably unnecessary... */
export default class ChapterForm extends preact.Component {
    get chapters() {
        return this.props.chapters;
    }

    get handleChange() {
        return this.props.onChange;
    }

    addChapter() {
        let chapters = this.chapters;
        chapters.push({title: ''});
        this.handleChange({chapters});
    }

    removeChapter(idx) {
        let chapters = this.chapters;
        if(chapters.length <= 1) return;

        chapters.splice(idx, 1);

        this.handleChange({chapters});
    }

    updateChapter(idx, data) {
        let chapters = this.chapters;

        chapters.splice(idx, 1, data);

        this.handleChange({chapters});
    }

    render({chapters}) {
        return <Marker type="sequence" name="chapters">
            <h3>Chapters</h3>
            {chapters.map(({title}, idx) => (
                <Chapter
                    title={title}
                    onRemoveChapter={this.removeChapter.bind(this, idx)}
                    onChange={this.updateChapter.bind(this, idx)}
                />
            ))}
            <button type="button" onClick={this.addChapter.bind(this)}>
                Add Chapter
            </button>
        </Marker>
    }
}