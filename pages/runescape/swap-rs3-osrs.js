import React from 'react'

import Head from 'next/head';

import {Container, Row, Col, Card, Button, Form, InputGroup} from 'react-bootstrap'
import util from "../../utils/util"

import { attributes, react as Content } from '../../content/pricingandrates.md';


const initialState = {
    rate: "",
    osrsAmount: "",
    rs3Amount: "",
    amountError: "",
}


class swaprs3osrs extends React.Component {
    constructor(props){
        super(props);
        this.state= initialState;
    }



    onInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    

    onChangeAmounts(e, currency){
        const {osrsAmount, rs3Amount, rate} = this.state;

        if(currency === 'A'){
            const newValueA = e.target.value;
            this.setState({
                osrsAmount: newValueA,
                rs3Amount: newValueA / rate
            })
        }else if(currency === 'B'){
            const newValueB = e.target.value;
            this.setState({
                osrsAmount: newValueB * rate,
                rs3Amount: newValueB
            })
        }
    }

    validate = () => {
        let amountError = "";

        const {osrsAmount, rs3Amount} = this.state

        if(!osrsAmount || !rs3Amount){
            amountError = "*Please input how much you want to Swap*"
        }else if(osrsAmount <= 10){
            amountError = "*You must swap a minimum of 10M RS3"
        }
        if(amountError){
            this.setState({amountError})
            return false;
        }

        return true;
    }

    
    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state
        const isValid = this.validate();
        if (isValid) {
            console.log("handleSubmit is working!")
            console.log("swaprs3osrs.handleSubmit data", data)
            this.setState({
                amountError: ''
            })
        }
    }



    async componentDidMount(){

        const {rs3toosrsswap} = attributes;

        this.setState({
            rate: rs3toosrsswap,
            
        })
    }


    render(){
        const {rate, osrsAmount, rs3Amount, amountError} = this.state

        return(
            <div>
                <Head>
                    <title>Inverted Silo | SWAP RS3 To OSRS</title>
                    <meta name="description" content="Inverted Silo | SWAP Runescape 3 Gold (RS3 GP) To Old School Runescape Gold (07 GP) " />
                </Head>
                <Container>
                    <Row className="justify-content-center">
                        <Card style={{width: '50%', textAlign: 'center'}}>
                            <Card.Body>
                                <Card.Title>
                                    <h2 style={{color: "darkOrange"}}>Swap Your RS3 to OSRS</h2>
                                </Card.Title>
                                <Card.Text>
                                    <h3 style={{color: "orange"}}>{rate}M RS3 = 1M 07</h3>
                                </Card.Text>
                                <br />
                                <Form onSubmit={this.handleSubmit}>
                                    <Container>
                                        <Row className="justify-content-center">
                                                <Col md={5}>
                                                    <InputGroup>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="OSRS"
                                                            value={util.formatNumber(osrsAmount)} 
                                                            onChange={(e) => {this.onChangeAmounts(e, 'A');
                                                        }}/>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>M</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                    </InputGroup>
                                                    RS3 (EOC)
                                                </Col>
                                                <Col md={2}> 
                                                    <div style={{color: "orange", fontSize: "4rem", fontWeight: "bold"}}>
                                                        <h1>
                                                            &#8595;&#8593;
                                                        </h1>
                                                    </div> 
                                                </Col>
                                                <Col md={5}>
                                                    <InputGroup>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="RS3" 
                                                            value={util.formatNumber(rs3Amount)} 
                                                            onChange={(e) => {this.onChangeAmounts(e, 'B');
                                                        }}/>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>M</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                    </InputGroup>
                                                    OSRS (07)
                                                </Col>
                                                <div style={{color: 'orange', fontWeight: 'bold'}}>{amountError}</div>
                                                <Form.Text className="text-muted">
                                                    *Rates are not final unless confirmed by staff*
                                                </Form.Text>
                                        </Row>
                                    </Container>
                                    {rate 
                                        &&
                                    <Button variant="warning" type="submit" ><b>Swap Now</b></Button>
                                    }
                                </Form>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default swaprs3osrs;