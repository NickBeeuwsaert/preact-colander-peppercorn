import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/main.js',
    dest: 'pcp/static/js/main.js',
    format: 'umd',
    moduleName: 'Form',
    sourceMap: true,
    sourceMapFile: 'pcp/static/js/main.js.map',
    plugins: [
        buble({
            jsx: 'preact.h',
            objectAssign: 'Object.assign'
        }),
        nodeResolve({
            jsnext: true
        })
    ]
};
