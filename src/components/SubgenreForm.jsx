import React, { Component } from "react";

export default class SubgenreForm extends Component {
    render() {
        return (
            <form className="new-subgenre">
                <input
                    className="subgenre-title"
                    onChange={this.props.handleNewSubgenre}
                    type="text"
                    id="title"
                    value={this.props.newSubgenre.title}
                />
                <textarea
                    className="subgenre-description"
                    id="description"
                    onChange={this.props.handleNewSubgenre}
                    value={this.props.newSubgenre.description}
                    cols="30"
                    rows="10"
                />

                <label className="required-label" htmlFor="chb">
                    <input
                        type="checkbox"
                        id="chb"
                        className="subgenre-required"
                        value={this.props.newSubgenre.required}
                        onChange={this.props.toggleDescriptionRequired}
                        checked={this.props.newSubgenre.required}
                    />
                    Description is required for this subgenre
        </label>
            </form>
        );
    }
}
