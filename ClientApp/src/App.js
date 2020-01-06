import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home  from './components/Home';
import ProductDescription from './components/productdescription/ProductDescription'
import './app.css';
import Commodes from './components/Commodes/Commodes';
import Clocks from './components/Clocks/Clocks';
import Soft from './components/Soft/Soft';
import Tables from './components/Tables/Tables';
import Another from './components/Another/Another';
import Login from './components/Login/Login';
import AddNewProduct from './components/AddNewProduct/AddNewProduct';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        
      <Layout>
        <Route exact path='/' component={Home} />

        <Route exact path='/Комоды' component={Commodes} />
        <Route exact path='/Часы' component={Clocks} />
        <Route exact path='/МягкаяЧасть' component={Soft} />
        <Route exact path='/СтолыИСтулья' component={Tables} />
        <Route exact path='/Разное' component={Another} />
        
        <Route exact path='/Login' component={Login} />
        
        <Route exact path='/description/:id' component={ProductDescription} />
        <Route exact path='/AddProduct' component={AddNewProduct} />
        <Route exact path='/Корзина' component={Cart} />
        <Route exact path='/Заказ' component={Order} />
      </Layout>
    );
  }
}
