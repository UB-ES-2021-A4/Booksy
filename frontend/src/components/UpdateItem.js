import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import './HomePage.css'
import './AddItem.css'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import swal from "sweetalert";
import { withRouter} from "react-router-dom";


class UpdateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                id: this.props.location.state.id,
                title: '',
                price: 0,
                author: '',
                category: '',
                description: '',
            },
            categories: {},
            card_id: props.id
        }
        this.getCategories()
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.getInfoToUpdate()
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };


    handleChangeFile = event => {
        this.setState({
            [event.target.id]: event.target.files[0]
        });
    };

    getInfoToUpdate () {
        axios.get(`https://booksy.pythonanywhere.com/api/product/?id=${this.state.item.id}`)
            .then((res) => {
                this.state.item.title = res.data[0].title
                this.state.item.author = res.data[0].author
                this.state.item.description = res.data[0].description
                this.state.item.price = res.data[0].price
                this.state.item.category = res.data[0].category
                //TODO recuperar las imagenes y bien las categorias
                console.log(res.data[0].category)

                //this.getCategory(res.data[0].category)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getCategory (category_name) {
        axios.get(`https://booksy.pythonanywhere.com/api/category/?category=${category_name}`)
            .then((res) => {
                this.state.item.category = res.data.category_description
                console.log(this.state.item.category)
            })
    }

    updateItem = event => {
        //We are using FormData because the backend needs a form-encoded data (request.POST)
        let formItem = new FormData()
        formItem.append('title',this.state.item.title)
        formItem.append('price',this.state.item.price)
        formItem.append('author',this.state.item.author)
        formItem.append('category', this.state.item.category)
        formItem.append('description',this.state.item.description)

        if (this.checkFormParams(formItem)) {
            axios.patch(`https://booksy.pythonanywhere.com/api/product/?id=${this.state.item.id}`, formItem,
                {headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}})
                .then((res) => {
                    console.error(res.data)
                    this.uploadImages(res.data)
                })
                .catch((error) => {
                    this.errorInPostAlert()
                    console.error(error)
                })
        } else {
            this.fillAllParamsAlert();
        }
    }

    checkFormParams (params) {
        if (params.toString().length === 0) {
            return false
        }
        return true

    }

    uploadImages(product_id) {
        var imgs = new FormData()
        imgs.append('id', product_id)
        imgs.append('image', this.state.item.images)
        axios.patch('https://booksy.pythonanywhere.com/api/image/', imgs,
            {headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}})
            .then((res)=> {
                this.successfulPostAlert()
            })
            .catch((error) => {
                this.noPhotosAlert()
                console.error(error)
            })

    }


    getCategories() {
        axios.get('https://booksy.pythonanywhere.com/api/category/')
            .then((res)=> {
                this.populateCategories(res.data)
            })
    }

    populateCategories = data => {
        this.state.categories = {}
        let tmp={}
        for (let index = 0; index < data.length; index++) {
            tmp[data[index]['category_name']] = data[index]['category_description']
        }
        this.setState({categories: tmp});
    }

    renderCategories = () => {
        const newCategories = Object.getOwnPropertyNames(this.state.categories);
        return newCategories.map((cat, i) => (
            <option value={cat}>{this.state.categories[cat]}</option>
        ));
    };

    fillAllParamsAlert () {
        // Use sweetalert2
        swal('Error', 'In order to create an item,\n all parameters should be filled.', 'error');
    };

    errorInPostAlert () {
        swal('Error', 'Something went wrong while uploading. \n Try again later.', 'error');
    }

    successfulPostAlert () {
        swal('Success', 'Item uploaded correctly!', 'success');
        this.props.history.push('/home_page')
    }
    noPhotosAlert () {
        swal('Warning', 'The item should, at least, have one photo.', 'warning');
    }

    render () {
        return (
            <section>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={"auto"}>
                            <br/>
                            <a className="a_color_black" href='/home_page'>
                                <ArrowBackIosNewIcon className="arrowBack"/>
                            </a>
                        </Col>
                        <Col  xs lg="5">
                            <br/>
                            <h1>¡Actualiza tu libro!</h1>
                            <h5>Por favor, cambia los campos que creas convenientes.</h5>
                            <br/>
                            <form action="">
                                <div className="input-field">
                                    <input type="text" id="title" defaultValue={this.state.item.title} onClick={this.handleChange}  />
                                    <label htmlFor="title" >Título del libro u objeto</label>
                                </div>
                                <br/>
                                <div className="input-field">
                                    <input type="text" id="author" onChange={this.handleChange} required defaultValue={this.state.item.author}/>
                                    <label htmlFor="author">Autor del libro</label>
                                </div>
                                <br/>
                                <div className="input-field">
                                    <input type="number" min="0" id="price" onChange={this.handleChange} required defaultValue={this.state.item.price}/>
                                    <label htmlFor="price">Precio del objeto</label>
                                </div>
                                <br/>

                                <select className="form-select" id="category" onChange={this.handleChange} >
                                    <option selected >{this.state.item.category}</option>
                                    {this.renderCategories()}
                                </select>
                                <br/>
                            </form>
                            <button className="button_login" id="button_submit" onClick={this.updateItem}>UPDATE ITEM</button>
                        </Col>
                        <Col md={"auto"}>
                            <br/><br/>
                            <div className="greenLine"/>
                            <br/><br/>
                        </Col>
                        <Col xs lg={5}>
                            <br/><br/>
                            <h5>Debe de tener 1 fotografía y una descripción.</h5>
                            <br/>
                            <form action="">
                                <div className="input-field">
                                    <input multiple type="file" id="images" name="myfile" onChange={this.handleChangeFile} />
                                    <label htmlFor="myfile">Select a file:</label><br/>
                                    <br/>
                                </div>
                                <br/><br/>
                                <div className="input-field">
                                    <textarea name="the-textarea" id="description" maxLength="300" defaultValue={this.state.item.description} placeholder="Write your description" autoFocus onChange={this.handleChange} required/>
                                    <div id="the-count">
                                        <span id="current">0</span>
                                        <span id="maximum">/ 300</span>
                                    </div>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}
export default withRouter(UpdateItem);
