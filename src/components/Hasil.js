import React, { Component } from 'react';
import {Col, ListGroup, Row, Badge} from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils';
import TotalBayar from './TotalBayar';

class Hasil extends Component {
    render() {
        const{keranjangs} = this.props
        return (
            <Col md={3} mt="2">
                <h4><b>Keranjang</b></h4>
                <hr/>
                {keranjangs.length !== 0 &&
                <ListGroup variant="flush">

                    <ListGroup.Item>
                        <Row>
                            <Col xs="3">Jumlah</Col>
                            <Col>Produk</Col>
                            <Col>Total Harga</Col>
                        </Row>
                    </ListGroup.Item>

                    {keranjangs.map((menuKeranjang) => (
                        <ListGroup.Item key={menuKeranjang.id}>
                            <Row>
                                <Col xs="3">
                                    <h4>
                                        <Badge pill bg="success">
                                            {menuKeranjang.jumlah}
                                        </Badge>
                                    </h4>
                                </Col>
                                <Col xs="">
                                    <h6>{menuKeranjang.product.nama}</h6>
                                    <p className="fw-light">Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                                </Col>
                                <Col>
                                    <p className='fw-bold float-right'>Rp. {numberWithCommas(menuKeranjang.total_harga)}</p>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                }
                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col>
        );
    }
}

export default Hasil;
