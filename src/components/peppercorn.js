import preact from 'preact';


export const Marker = function(props) {
    let {name='', type, children} = props;

    // dirty, dirty hack because I can't use
    // object rest in object destructuring
    delete props.name;
    delete props.type;
    delete props.children;

    return (
        <div {...props}>
            <input type='hidden' name='__start__' value={`${name}:${type}`}/>
            {children}
            <input type='hidden' name='__end__' value={`${name}:${type}`}/>
        </div>
    );
};