import React, { Component } from 'react';
import { Carousel, Col, Row,  Container } from 'react-bootstrap';
import './Slider.css'
import Main from './pictures/mainPhoto.jpg';
import Main_2 from './pictures/mainPhoto2.jpg';
import Main_3 from './pictures/mainPhoto3.jpg';

export default class Slider extends Component {
    render() {
        return(
            <Container>
                <Row>
                    <br/><br/>
                    <Col>
                        <br/><br/>
                        <br/><br/>
                        <h1>Encuentra el libro perfecto para ti.</h1>
                        <h5> Todo tipo de historias que os animarán a ser creativos.</h5>
                        <br/><br/>
                        <button className="button"><span>REGÍSTRATE</span></button>
                    </Col>
                    <br/><br/>
                    <Col>
                        <div className='carouselWrapper container' style={{width:'500', height:'550'}}>
                            <br/><br/>
                            <Carousel>
                                <Carousel.Item>
                                    <img width={500} height={550} alt="500x500" src={Main} />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img width={500} height={550} alt="500x500" src={Main_2} />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img width={500} height={550} alt="500x500" src={Main_3} />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
