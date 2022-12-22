import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const apiUrl = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const updateData = fetchedData.products.map(product => ({
        title: product.title,
        price: product.price,
        rating: product.rating,
        brand: product.brand,
        imageUrl: product.image_url,
      }))

      this.setState({
        productsList: updateData,
        isLoading: false,
      })
    }
  }

  renderProductsList = () => {
    const {productsList, isLoading} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {isLoading ? (
            <Loader type="TailSpin" color="#00Bfff" height={50} width={50} />
          ) : (
            productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))
          )}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
