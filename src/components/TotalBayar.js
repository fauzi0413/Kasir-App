import React, { Component } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import {API_URL} from '../utils/constant'
import {Link} from 'react-router-dom'

export default class TotalBayar extends Component {
    
    submitTotalBayar = (totalBayar) => {

        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        }

        axios.post(API_URL+"pesanans", pesanan)
    }

    render() {  

        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);

        return (
        <div className='fixed-bottom'>
            <Row>
                <Col md={{ span:3, offset: 9 }} className="px-4" style={{ backgroundColor:'white' }}>
                    <h5>Total Harga : <strong style={{ float:'right' }} className='me-2'>Rp. {numberWithCommas(totalBayar)}</strong></h5>
                    <Button 
                        variant='primary'
                        className='my-2 me-2 w-100' 
                        onClick={ () => this.submitTotalBayar(totalBayar) }
                        to={'/sukses'}
                        as={Link}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} className='me-2'/>
                        <strong>BAYAR</strong>
                    </Button>
                </Col>
            </Row>
        </div>
        )
    }
}
