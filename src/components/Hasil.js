import React, { Component } from 'react';
import {Col, ListGroup, Row, Badge, Card} from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils';
import ModalKeranjang from './ModalKeranjang';
import TotalBayar from './TotalBayar';
import { API_URL } from '../utils/constant';
import axios from 'axios'
import swal from 'sweetalert';

class Hasil extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '', 
            totalHarga: 0
        }
    }

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
            totalHarga: menuKeranjang.total_harga
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah+1,
            totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah+1)
        })
    }

    kurang = () => {
        if(this.state.jumlah !==1){
            this.setState({
                jumlah: this.state.jumlah-1,
                totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah-1)
            })
        }
    }

    changeHandler = (event) => {
        this.setState({
            keterangan: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.handleClose()

        const data = {
            jumlah: this.state.jumlah, 
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
            }
        
            axios
            .put(API_URL+"keranjangs/"+this.state.keranjangDetail.id, data)
            .then(res => {
                this.props.getListKeranjang();
                swal({
                title: "Success!",
                text: "Sukses Update Pesanan "+data.product.nama,
                icon: "success",
                button: false,
                timer:2000,
                });
            })
            .catch(error=>{
                console.log(error);
            })
    }

    hapusPesanan = (id) => {
        this.handleClose()
        
            axios
            .delete(API_URL+"keranjangs/"+id)
            .then(res => {
                this.props.getListKeranjang();
                swal({
                title: "Success!",
                text: "Sukses Hapus Pesanan "+this.state.keranjangDetail.product.nama,
                icon: "info",
                button: false,
                timer:2000,
                });
            })
            .catch(error=>{
                console.log(error);
            })
    }

    render() {
        const{keranjangs} = this.props
        return (
            <Col md={3} mt="2">
                <h4 className='mt-1'><b>Keranjang</b></h4>
                <hr/>
                {keranjangs.length !== 0 &&
                <Card className="overflow-auto hasil">
                    <ListGroup variant="flush">

                        {/* <ListGroup.Item>
                            <Row>
                                <Col xs="">Jumlah</Col>
                                <Col>Produk</Col>
                                <Col>Total Harga</Col>
                            </Row>
                        </ListGroup.Item> */}

                        {keranjangs.map((menuKeranjang) => (
                            <ListGroup.Item key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>
                                <Row>
                                    <Col xs="2">
                                        <h5>
                                            <Badge pill bg="success">
                                                {menuKeranjang.jumlah}
                                            </Badge>
                                        </h5>
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

                        <ModalKeranjang 
                            handleClose={this.handleClose} 
                            {...this.state} 
                            tambah={this.tambah} 
                            kurang={this.kurang} 
                            changeHandler={this.changeHandler}
                            handleSubmit={this.handleSubmit}
                            hapusPesanan={this.hapusPesanan}
                        />
                        
                        <TotalBayar keranjangs={keranjangs} {...this.props} />
                    </ListGroup>
                </Card>
                }
            </Col>
        );
    }
}

export default Hasil;
