import React from "react";
import './TextAreaInput.css';
import PropTypes from "prop-types";
import {ChevronButton} from "../../buttons/Buttons";

export class TextAreaInput extends React.Component {

    constructor(props) {
        super(props);
        const showMore = false;
        this.state = {
            limiteResume: 150,
            showMore,
        }
    }

    handleChange = (e) => {
        const {targetPropName, handleChange} = this.props;
        handleChange(targetPropName, e.target.value);
    };

    handleClick = () => {
        this.setState({showMore: !this.state.showMore})
    };

    render() {
        const {label, content, alterContent, readOnly, targetPropName} = this.props;
        const {showMore, limiteResume} = this.state;
        const classname = (readOnly) ? "input-description" : "input-div-descript";
        return (
            <div id={targetPropName} className={`input-div-info textAreaInput ${classname}`}>
                {
                    !readOnly ?
                        <>
                            <span className="label">{label}</span>
                            <textarea
                                className=" text-description"
                                rows="3" cols="50"
                                value={content}
                                onChange={this.handleChange}
                            />
                        </>
                    :
                        <>
                            <span className="label">{label}</span>
                            <div className="text-description read-only">
                                {
                                    !content.empty() ?
                                        !showMore && content.length > limiteResume ? content.slice(0, limiteResume) + "..." : content
                                    :
                                        <i style={{color: "#DDDDDD"}}>{alterContent}</i>
                                }
                            </div>
                            {
                                content.length > limiteResume &&
                                    <div className="btn btn-chevron centerChevron" onClick={this.handleClick}>
                                        <ChevronButton more={showMore} context={true}/>
                                    </div>
                            }
                        </>
                }
            </div>
        )
    }
}

TextAreaInput.defaultProps = {
    readOnly: false
};

TextAreaInput.proptypes = ({
    label: PropTypes.string,
    content: PropTypes.string.isRequired,
    alterContent: PropTypes.string,
    readOnly: PropTypes.bool,
    handleChange: PropTypes.func.isRequired
});
