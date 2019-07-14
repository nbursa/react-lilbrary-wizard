import React, { Component } from "react";
import Database from "./database.json";
import "./App.scss";
import SubgenreForm from "./components/SubgenreForm.jsx";
import PaginatorItem from "./components/PaginatorItem.jsx";
import NewBookForm from "./components/NewBookForm.jsx";
import Results from "./components/Results.jsx";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            genres: [],
            step: 1,
            nextButtonDisabled: true,
            selectedGenre: '',
            selectedSubgenre: '',
            isRequired: false,
            genreButton: {},
            subgenreButton: {},
            addNewSubgenre: false,
            activeStep3: false,
            newSubgenre: {
                title: '',
                description: '',
                required: false
            },
            newBook: {
                title: '',
                author: '',
                isbn: '',
                publisher: '',
                date: '',
                pages: '',
                format: '',
                edition: '',
                language: '',
                description: ''
            }
        }
    }

    // Component mounted, getting data
    componentDidMount = () => {

        let init = [...Database.genres];
        this.setState({ genres: init }, () => console.log("Step:", this.state.step));

    }

    // Pass step to "isStepDone" method and initialize
    componentWillUpdate = () => {

        return this.isStepDone(this.state.step);

    }

    // Return boolean if step conditions are acheaved
    isStepDone = (step) => {
        return step === 1
            ? !this.state.selectedGenre
                ? false
                : true
            : step === 2
                ? !this.state.selectedSubgenre && this.state.activeStep3 !== true
                    ? false
                    : true
                : step === 3
                    ? !this.state.newSubgenre.title || !this.state.newSubgenre.description
                        ? false
                        : true
                    : step === 4
                        ? !this.state.newBook.title || !this.state.newBook.author || !this.state.newBook.isbn || !this.state.newBook.publisher || !this.state.newBook.date || !this.state.newBook.pages || !this.state.newBook.format || !this.state.newBook.edition || !this.state.newBook.language
                            ? false
                            : !this.state.newBook.description
                                ? this.state.newSubgenre.required
                                    ? false
                                    : this.state.isRequired
                                            ? false
                                            : true
                                        : true
                                : true
    }

    // Populate state "newBook" values with data from "Information" form
    handleNewBook = (event) => {

        const property = { ...this.state.newBook };
        const target = event.target;
        const value = target.value;
        const id = target.id;
        property[id] = value;
        this.setState({ newBook: property }, () => console.table("New book title:", this.state.newBook.title + "\n", "Autohor:", this.state.newBook.author + "\n", "ISBN:", this.state.newBook.isbn + "\n", "Publisher:", this.state.newBook.publisher + "\n", "Date:", this.state.newBook.date + "\n", "Number of pages:", this.state.newBook.pages + "\n", "Format:", this.state.newBook.format + "\n", "Edition:", this.state.newBook.edition + "\n", "Language:", this.state.newBook.language + "\n", "Description:", this.state.newBook.description));

    }

    // Populate state "selectedGenre" value when user select genre
    selectedGenre = (key) => {

        let selected = this.state.genres[key].name;
        this.setState({ selectedGenre: selected }, () => console.log("Selected genre:", this.state.selectedGenre));

    }

    // Populate state "selectedSubgenre" value when user select genre
    selectedSubgenre = (key) => {

        this.state.genres.map((genre) => {
            if (genre.name === this.state.selectedGenre) {
                let selected = genre.subgenres[key].name;
                let isRequired = genre.subgenres[key].isDescriptionRequired;
                this.setState({ selectedSubgenre: selected, isRequired: isRequired }, () => console.log("Selected subgenre:", this.state.selectedSubgenre + "\n", "Is description required for selected subgenre:", this.state.isRequired));
            }
            return null;
        })

    }

    // Populate state "activeStep3" value when user select "Add new" subgenre to be used to choose which step should be steped into when "Next" button is pressed 
    activateStep3 = () => {

        this.setState({ activeStep3: !this.state.activeStep3 }, () => console.log("Add new subgenre selected:", this.state.activeStep3));
        this.setState({ selectedSubgenre: '' });

    }

    // Limit steps number and change step counter descending according to users desition(should he add new subgenre title and description)
    previousStep = () => {

        if (this.state.step > 1) {
            let prev = this.state.step;
            if (this.state.step === 4 && this.state.activeStep3 === false) {
                prev = 2;
                this.setState({ step: prev }, () => console.log("Step:", this.state.step + 1));
                return;
            }
            prev--;
            this.setState({ step: prev }, () => console.log("Step:", this.state.step));
        }
        return;

    }

    // Limit steps number and change step counter accending according to users desition(should he add new subgenre title and description)
    nextStep = () => {

        if (this.state.step < 5) {
            let next = this.state.step;
            if (this.state.step === 2 && this.state.activeStep3 === false) {
                next = 4;
                this.setState({ step: next }, () => console.log("Step:", this.state.step - 1));
                
                return;
            }
            next++;
            this.setState({ step: next }, () => console.log("Step:", this.state.step));
            
        };
        return;

    }

    // Toggle "active" class based on step number
    activeStep = (step) => {

        return step === this.state.step ? 'active' : '';

    }

    // Toggle class on genre button
    genreSelectedButton = (key) => {

        this.setState({ genreButton: { [key]: true } });

    }

    // Toggle class on subgenre button
    subgenreSelectedButton = (id) => {

        this.setState({ subgenreButton: { [id]: true } });

    }

    // Populate state "newSubgenre" values while user fill the form
    handleNewSubgenre = (event) => {

        const property = { ...this.state.newSubgenre };
        const target = event.target;
        const value = target.value;
        const id = target.id;
        property[id] = value;
        this.setState({ newSubgenre: property }, () => console.table("New subgenre title:", this.state.newSubgenre.title + "\n", "New subgenre description:", this.state.newSubgenre.description));

    }

    // Toggle states "newSubgenre.required" value
    toggleDescriptionRequired = () => {

        let property = { ...this.state.newSubgenre };
        property.required = !this.state.newSubgenre.required;
        this.setState({ newSubgenre: property }, () => console.log("Checkbox state:", this.state.newSubgenre.required));

    }

    render() {
        let step = this.state.step;
        let genres = this.state.genres;
        return (
            <div className="App">
                <div className="App-body">
                    {
                        !this.activeStep(5)
                            ? <div className="body-top">
                                <h2 className="body-title">Add book - new book</h2>
                                <div className="paginator">
                                    <div className="wrapper">
                                        <div className="paginator-item">
                                            <div className={'page ' + this.activeStep(1)}>1</div>
                                            <div className="page-title">Genre</div>
                                        </div>
                                    </div>
                                    <PaginatorItem className={'page ' + this.activeStep(2)} activeStep={2} pageTitle={"Subgenre"} />
                                    {
                                        this.activeStep(3)
                                            ? this.state.activeStep3
                                                ? [
                                                    <PaginatorItem className={'page ' + this.activeStep(3)} key={0} activeStep={3} pageTitle={"Add new subgenre"} />,
                                                    <PaginatorItem className={'page ' + this.activeStep(2)} key={1} activeStep={"..."} pageTitle={""} />
                                                ]
                                                :
                                                <PaginatorItem className={'page ' + this.activeStep(3)} activeStep={3} pageTitle={"Information"} />
                                            : this.activeStep(4)
                                                ? null
                                                :
                                                <PaginatorItem className={'page ' + this.activeStep(3)} activeStep={"..."} pageTitle={""} />
                                    }
                                    {
                                        this.activeStep(4)
                                            ? this.state.activeStep3
                                                ? [
                                                    <PaginatorItem className={'page ' + this.activeStep(3)} key={0} activeStep={3} pageTitle={"Add new subgenre"} />,
                                                    <PaginatorItem className={'page ' + this.activeStep(4)} key={1} activeStep={4} pageTitle={"Information"} />
                                                ]
                                                :
                                                <PaginatorItem className={'page ' + this.activeStep(4)} activeStep={3} pageTitle={"Information"} />
                                            : null
                                    }
                                </div>
                            </div>
                            : null
                    }
                    <div className="body-middle">
                        {
                            step === 1
                                ? genres.map((genre, key) => (
                                    <button className={this.state.genreButton[key] ? 'btn btn-dark' : 'btn'} key={key} onClick={() => { this.selectedGenre(key); this.genreSelectedButton(key) }}>{genre.name}</button>
                                ))
                                : step === 2
                                    ? (genres.map((genre) => (
                                        genre.name === this.state.selectedGenre
                                            ? [genre.subgenres.map((subgenre, key) => (
                                                <button className={this.state.subgenreButton[subgenre.id] && this.state.selectedSubgenre !== '' ? 'btn btn-dark' : 'btn'} key={key} onClick={() => { this.selectedSubgenre(key); this.subgenreSelectedButton(subgenre.id); this.setState({ activeStep3: false }) }}>{subgenre.name}</button>
                                            )),
                                            <button className={this.state.activeStep3 ? 'btn btn-dark' : 'btn'} key={111} onClick={() => { this.activateStep3() }}>Add new</button>]
                                            : null
                                    )))
                                    : step === 3
                                        ?
                                        <SubgenreForm newSubgenre={this.state.newSubgenre} handleNewSubgenre={this.handleNewSubgenre} toggleDescriptionRequired={this.toggleDescriptionRequired} />

                                        : step === 4
                                            ?
                                            <NewBookForm newBook={this.state.newBook} newSubgenre={this.state.newSubgenre} handleNewBook={this.handleNewBook} isRequired={this.state.isRequired} />

                                            : step === 5
                                                ?
                                                <Results newBook={this.state.newBook} selectedGenre={this.state.selectedGenre} selectedSubgenre={this.state.selectedSubgenre} newSubgenre={this.state.newSubgenre} />

                                                : null
                        }
                    </div>
                    {
                        !this.activeStep(5)
                            ? <div className="body-bottom">
                                <button className="btn with-icon" onClick={() => this.previousStep()}>Back</button>
                                <button className={this.isStepDone(this.state.step) ? "btn btn-dark" : "btn btn-disabled"} onClick={() => this.nextStep()} disabled={!this.isStepDone(this.state.step)}>{this.state.step === 4 ? 'Add' : 'Next'}</button>
                            </div>
                            : null
                    }
                </div>
            </div>
        );
    }

}
