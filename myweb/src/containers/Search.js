import React, { Component } from "react";
import { Button,FormGroup} from "react-bootstrap";
import "./Search.css";
import ReactDOM from "react-dom";

  class ProductRow extends React.Component {
    render() {
      const product = this.props.product;
      
      return (
        <tr>
          <td>{product.albumName}</td>
          <td>{product.albumArtist}</td>
          <td>{product.price}</td>
          <td>{product.year}</td>
        </tr>
      );
    }
  }
  
  class ProductTable extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        PRODUCTS: [],
        // inputsearch: ""
      };
    }
    loadDatafromdb(){
      let reqBody = {
        search: ""
      };
  
      return fetch("http://localhost:3001/Product", {
        method: 'post',
        headers: {'Content-Type': 'application/JSON'},
        body: JSON.stringify(reqBody)
      })
      .then(response => response.json())
      .then((response) => {
          console.log(JSON.stringify(response))
          var album = JSON.parse(JSON.stringify(response))
          var length = Object.keys(album).length;
          // console.log(length)
          // console.log(parseInt(length, 10))
          // console.log(album[0].albumname)  
          const tmpPRODUCTS = [];
          for(let i=0;i<length;i++){
              tmpPRODUCTS.push({
                albumName:album[i].albumname, 
                albumArtist: album[i].albumartist,
                price:album[i].price,
                year:album[i].year
              })
          };
          this.setState({PRODUCTS:tmpPRODUCTS})
      })
    };
    
    render() {
      {this.loadDatafromdb()}
      const rows = []; 
      this.state.PRODUCTS.forEach((product) => {
        if (product.albumName.indexOf(this.props.filterText) === -1 && product.albumArtist.indexOf(this.props.filterText) === -1) {
          return;
        }
        rows.push(
          <ProductRow
            product={product}
            key={product.albumName}
          />
        );
      });

      return (  
        <div>
          <table>
          <thead>
            <tr>
              <th>albumName</th>
              <th>albumArtist</th>
              <th>Price</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
          </table>
        </div>
      );
    }
  }

  class SearchBar extends Component {
    handleFilterTextChange = e => {
      this.props.onFilterTextChange(e.target.value);
    };
  
    render() {
      return (
        <div className="SearchBox">
          <form>
            <input
              className="form-control p-4"
              type="text"
              placeholder="Search by albumName or albumArtist ..."
              value={this.props.filterText}
              onChange={this.handleFilterTextChange}
            />
          </form>
        </div>
      );
    }
  }

  class Search extends Component {
    constructor(props) {
      super(props);
      this.state = {
        filterText: ""
      };
  
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
  
    handleFilterTextChange(filterText) {
      this.setState({
        filterText: filterText
      });
    }
  
    render() {
  
      if (this.state.filterText === "" ) {
        return (
          <div>
            <SearchBar
              filterText={this.state.filterText}
              onFilterTextChange={this.handleFilterTextChange}
            />
          </div>
        );
      } else {
        return (
          <div>
            <SearchBar
              filterText={this.state.filterText}
              onFilterTextChange={this.handleFilterTextChange}
            />
            <ProductTable filterText={this.state.filterText} />
          </div>
        );
      }
    }
  }

  export default Search;