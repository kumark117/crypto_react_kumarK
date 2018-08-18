import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

//import mockData from '../api/data';
import {fetchCurrData} from '../actions/actions';

const css = require('./CryptoCcyList.css');

import Select from 'react-select';

const currencyOptions = [
  { value: 'SGD', label: 'SGD' },
  { value: 'AUD', label: 'AUD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'USD', label: 'USD' },
  { value: 'VND', label: 'VND' }
];


class CryptoCcyList extends React.Component {
    constructor() {
        super();
        this.state = { displayCcy : 'USD' };
	this.handleChange = this.handleChange.bind(this);
	this.fetchHelper = this.fetchHelper.bind(this);
	//alert("Cryto constructor");
    }

 handleChange(displayCcyObj) {
    this.setState({ displayCcy : displayCcyObj.value });
    console.log(`Option selected:`, displayCcyObj);
    this.fetchHelper(displayCcyObj.value);
  }

componentDidMount() {
	this.fetchHelper(this.state.displayCcy);
}

fetchHelper(displayCcy) {
  console.log("Cryto c fetchHelper");

	this.props.fetchCurrData(displayCcy?displayCcy:this.state.displayCcy);
/***************API BASED OLD EXERCISE CODE
        var that = this;
	var promise1 = getCryptoData(this.state.displayCcy);
		promise1.then(function(response) {
		//console.log(response);
		that.setState({apiData:response});
  	});
********************/
}

    render() {
      console.log("RENDER!: this.props", this.props);
	//given: this.state.apiData containing TOP 5 currency data
	return (<div>
    <tr className={css.cryptoRow} key={-1}>
        <td className={css.cryptoName}>Name</td>
        <td className={css.cryptoPrice}>Price format('0,0.00')</td>
        <td className={css.cryptoChange}>% Change</td>
        <td className={css.cryptoRank}>Rank</td>
    </tr>
    {this.props.apiData && this.props.apiData.map((data,ix) =>
		{
		let per1 = data.percent_change_24h;
        	return (
            <tr className={css.cryptoRow} key={ix}>
                <td className={css.cryptoName}>{data.name}</td>
                <td className={css.cryptoPrice}>{`USD ${numeral(data.price_usd).format('0,0.00')}`}</td>
                <td className={css.cryptoChange}
		     className={per1 >= 0? css.currPositive : css.currNegative}
		>{`${per1}%`}</td>
                <td className={css.cryptoRank}>{data.rank}</td>
            </tr>
        )
	} //end of arrow fn
	) //end of map
  }
	<Select Value={this.state.displayCcy} onChange={this.handleChange}
        			options={currencyOptions} />
	</div>
)
}//end of render

}

const mapStateToProps = state => {
  return {apiData: state.apiData}
}

const mapDispatchToProps = dispatch => {
  return { fetchCurrData: displayCcy => dispatch(fetchCurrData(displayCcy)) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CryptoCcyList);
