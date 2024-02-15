import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from 'prop-types';


const Togglable = forwardRef((props, refs) => {

    const [isVisible, setIsVisible] = useState(false);

    const hideWhenVisible = { display: isVisible ? 'none' : '' };
    const showWhenVisible = { display: isVisible ? '' : 'none' };

    function handleVisibility() {
        setIsVisible(!isVisible);
    }

    useImperativeHandle(refs, () => {
        return { handleVisibility }
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={handleVisibility}>{props.btnLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={handleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    btnLabel: PropTypes.string.isRequired
}

export default Togglable;