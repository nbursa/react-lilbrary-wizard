import React, { Component } from 'react'

export default class PaginatorItem extends Component {

    render() {
        return (
            <div className="wrapper">
                <div className="spacer"></div>
                <div className="paginator-item">
                    <div className={ this.props.className }>{ this.props.activeStep }</div>
                    <div className="page-title">{ this.props.pageTitle }</div>
                </div>
            </div>
        )
    }

}
