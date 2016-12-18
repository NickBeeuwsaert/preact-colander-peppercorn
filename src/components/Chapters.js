import preact from 'preact';
import Component from '../component';
import Chapter from './Chapter';
import {Marker} from './peppercorn.js';
import {get} from '../utils';
import defaults from '../defaultState';

export default class Chapters extends Component {

    addChapter() {
        let {chapters} = this.props;
        chapters.push({...defaults.chapter});

        this.props.onChange({chapters});
    }

    removeChapter(idx) {
        let {chapters} = this.props;
        if(chapters.length <= 1) return;

        chapters.splice(idx, 1);

        this.props.onChange({chapters});
    }

    updateChapter(idx, newData) {
        let {chapters} = this.props,
            chapter = chapters[idx];

        chapters.splice(idx, 1, {
            ...chapter,
            ...newData
        });

        this.props.onChange({chapters});
    }

    render({
        chapters,
        errors
    }) {
        return <Marker type="sequence" name="chapters">
            <h3>Chapters</h3>
            {get(errors, 'errors', []).map(err => (
                <div class="flash error">{err}</div>
            ))}
            {chapters.map(({title}, idx) => (
                <Chapter
                    title={title}
                    onRemoveChapter={
                        chapters.length === 1 ?
                        null : this.removeChapter.bind(this, idx)
                    }
                    onChange={this.updateChapter.bind(this, idx)}
                    errors={get(errors, ['child_errors', idx], {})}
                />
            ))}
            <div class="text-right">
                <button
                    type="button"
                    class="btn"
                    onClick={this.addChapter.bind(this)}
                >+ Add Chapter</button>
            </div>
        </Marker>
    }
}
