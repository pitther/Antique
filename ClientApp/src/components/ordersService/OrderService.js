import React, { Component } from 'react';
import Pagination from '../Pagination/Pagination'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import OrdersTable from './OrdersTable'
import get from 'lodash.get';
import OrderInfo from './OrderInfo';

class OrderService extends Component {
    constructor() {
        super();
        this.state = {
            apiUrl: "/api/Orders/",
            error: null,
            isloaded: false,
            orders: [],
            currentPage: 1,
            OrdersPerPage: 12,

            isDescription: false,
            descriptionOrder: {},
            descriptionOrderId:null
        }
        this.openOrderInfo = this.openOrderInfo.bind(this);
    }

    openOrderInfo(order) {
        this.setState({ isDescription: true,descriptionOrder:order,descriptionOrderId:order.id });
        
    }

    componentDidMount() {
        console.log("PROPS", this.props);
        console.log(this.props.category);

        let url = this.state.apiUrl;

        if (this.props.all == true) {
            url += "allOrders";
            this.setState({ apiUrl: url });
        }
        if (this.props.undone == true) {
            url += "undoneOrders";
        }
        console.log(url);

        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({ orders: json, isloaded: true });
            }, (error) => {
                this.setState({ isloaded: true, error });
            });
    }
    render() {
        const { orders, isloaded, error, currentPage, OrdersPerPage,isDescription } = this.state;
        const indexOfLastProduct = currentPage * OrdersPerPage;
        const indexOfFirstProduct = indexOfLastProduct - OrdersPerPage;
        const currentOrders = orders.slice(indexOfFirstProduct, indexOfLastProduct);
        console.log(orders);
        const paginate = (pageNumber) => {
            if (pageNumber < 1 || pageNumber > Math.ceil(orders.length / OrdersPerPage)) {
                return;
            }
            else
                this.setState({ currentPage: pageNumber });
            window.scrollTo(0, 0);
        }
        return (
            <div>
                {isDescription?<div>
                    <OrderInfo order={this.state.descriptionOrder} id={this.state.descriptionOrderId}></OrderInfo>
                </div> :<div>
                    <OrdersTable openOrderInfo={this.openOrderInfo}  orders={currentOrders} isloaded={isloaded} error={error} all={this.props.all} undone={this.props.undone} />
                    <Pagination productsPerPage={OrdersPerPage} totalProducts={orders.length} paginate={paginate} currentPage={currentPage} />
                </div>}
                

                
            </div>

        )
    }
}
export default OrderService;