import React, { Component } from 'react'

export default class Results extends Component {
    render() {
        return (
            <div className="result-view">
                <div className="result-view-icon"></div>
                <h1 className="result-view-message">Book added successfully</h1>
                <pre className="json">
                {`
                    {
                        "Genre": "${this.props.selectedGenre}",
                        "Subgenre": "${this.props.selectedSubgenre || this.props.newSubgenre.title}",
                        "isDescriptionRequired": ${this.props.newSubgenre.required.toString()},
                        "Title": "${this.props.newBook.title}",
                        "Author": "${this.props.newBook.author}", 
                        "ISBN": "${this.props.newBook.isbn}", 
                        "Publisher": "${this.props.newBook.publisher}", 
                        "Date": "${this.props.newBook.date}", 
                        "Pages": "${this.props.newBook.pages}", 
                        "Format": "${this.props.newBook.format}", 
                        "Edition": "${this.props.newBook.edition}", 
                        "Language": "${this.props.newBook.language}", 
                        "Description": "${this.props.newSubgenre.description || this.props.newBook.description}", 
                    }
                `}
                </pre>
                <button className="btn btn-dark result-view-btn" onClick={() => window.location.reload()}>Add another book</button>
            </div>
        )
    }
}
