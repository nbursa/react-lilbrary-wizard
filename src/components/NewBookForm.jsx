import React, { Component } from 'react'

export default class NewBookForm extends Component {
    render() {
        return (
            <form className="new-book">
                <label htmlFor="title" className="label">Book title</label>
                <input className="book-title" type="text" id="title" value={this.props.newBook.title} onChange={this.props.handleNewBook} />
                <label htmlFor="author" className="label">Author</label>
                <input className="book-author" type="text" id="author" value={this.props.newBook.author} onChange={this.props.handleNewBook} />
                <label htmlFor="isbn" className="label">ISBN</label>
                <input className="book-isbn" type="text" id="isbn" value={this.props.newBook.isbn} onChange={this.props.handleNewBook} />
                <label htmlFor="publisher" className="label">Publisher</label>
                <input className="book-publisher" type="text" id="publisher" value={this.props.newBook.publisher} onChange={this.props.handleNewBook} />
                <label htmlFor="date" className="label">Date published</label>
                <input className="book-date" type="text" id="date" value={this.props.newBook.date} onChange={this.props.handleNewBook} />
                <label htmlFor="pages" className="label">Number of pages</label>
                <input className="book-pages" type="text" id="pages" value={this.props.newBook.pages} onChange={this.props.handleNewBook} />
                <div className="one-line">
                    <div className="one-line-item">
                        <label htmlFor="format" className="label">Format</label>
                        <select className="book-format" id="format" value={this.props.newBook.format} onChange={this.props.handleNewBook}>
                            <option defaultValue></option>
                            <option value="Format 1">Format 1</option>
                            <option value="Format 2">Format 2</option>
                            <option value="Format 3">Format 3</option>
                            <option value="Format 4">Format 4</option>
                        </select>
                    </div>
                    <div className="one-line-item">
                        <label htmlFor="edition" className="label">Edition</label>
                        <input className="book-edition" type="text" id="edition" value={this.props.newBook.edition} onChange={this.props.handleNewBook} />
                    </div>
                </div>
                <label htmlFor="language" className="label">Edition language</label>
                <select className="book-language" id="language" value={this.props.newBook.language} onChange={this.props.handleNewBook}>
                    <option defaultValue></option>
                    <option value="Language 1">Language 1</option>
                    <option value="Language 2">Language 2</option>
                    <option value="Language 3">Language 3</option>
                    <option value="Language 4">Language 4</option>
                </select>
                <label htmlFor="description" className="label">Description</label>
                <textarea className="book-description" id="description" value={this.props.newBook.description} onChange={this.props.handleNewBook} disabled={this.props.newSubgenre.required === false && this.props.isRequired === false} required={this.props.isRequired} cols="30" rows="10"></textarea>
            </form>
        )
    }
}
