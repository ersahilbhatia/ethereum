import React, {useEffect, useState} from "react";
import ReactTooltip from "react-tooltip";
import moment from 'moment';

function App() {
var [startTime, setStartTime] = React.useState('');
var [priceLabel, setPriceLabel] = React.useState('');
var eth_price_dollar = '';
var eth_price_dollar_prev = '';

var [startTimeP, setStartTimeP] = React.useState('');
var [priceLabelP, setPriceLabelP] = React.useState('');
var eth_price_pound = '';
var eth_price_pound_prev = '';

useEffect(()=>{
  getEthRate();
  const interval = setInterval(getEthRate,5000);    
  return () => clearInterval(interval);
}, []);

function getEthRate(){
  getEthDollar();
  getEthPound();
}

function getEthDollar() {  
  let eth_price_dollar_first = '';
  let eth_price_dollar_last = '';
  eth_price_dollar_prev = eth_price_dollar;
  fetch("http://34.117.120.204/api/v1/fx/ETHUSD/ohlc")
    .then(res => res.json())
    .then(data => {
      eth_price_dollar = data.open;
      let eth_price = data.open.split('.');
      eth_price_dollar_first = eth_price[0];
      eth_price_dollar_last = eth_price[1] == undefined ? '0' : eth_price[1];

      let ch_change_index = -1;
      let is_increase = 0;

      if(eth_price_dollar_prev != '')
      {
      for (let i = 0; i < eth_price_dollar.length; i++) {
        if(eth_price_dollar.charAt(i) != eth_price_dollar_prev.charAt(i))
        {
          ch_change_index = i;
          if(Number(eth_price_dollar.charAt(i)) > Number(eth_price_dollar_prev.charAt(i)))
          {
            is_increase = 1;
          }
          break;
        }
      }
    }

      let priceLabel_ = '$';
      if(ch_change_index > -1)
      {
        var eth_price_dollar_first_length = eth_price_dollar_first.length

        for (let i = 0; i < eth_price_dollar_first_length; i++) {
          if(ch_change_index == i)
          {
            priceLabel_ += is_increase == 1 ? '<span style="color:green">' : '<span style="color:red">';
          }
          priceLabel_ += eth_price_dollar_first.charAt(i);
        }

        
        priceLabel_ += '<span  style="font-size: 1.5rem; line-height: 2rem;">.';

        for (let i = eth_price_dollar_first_length+1; i < eth_price_dollar_last.length+eth_price_dollar_first_length+1; i++) {
          if(ch_change_index == i)
          {
            console.log('is_increase: ' + is_increase);
            priceLabel_ += is_increase == 1 ? '<span style="color:green">' : '<span style="color:red">';
          }
          priceLabel_ += eth_price_dollar_last.charAt(i-eth_price_dollar_first_length-1);
        }
        priceLabel_ += '</span>';
        priceLabel_ += '</span>';
      }
      else
      {
        priceLabel_ += `${eth_price_dollar_first}<span  style="font-size: 1.5rem; line-height: 2rem;">.${eth_price_dollar_last}</span>`;
      }

      setPriceLabel(priceLabel_);

      setStartTime(moment({}).seconds(data.startTime.seconds).toISOString());
    });
}


function getEthPound() {
  let eth_price_pound_first = '';
  let eth_price_pound_last = '';
  eth_price_pound_prev = eth_price_pound;
  fetch("http://34.117.120.204/api/v1/fx/ETHGBP/ohlc")
    .then(res => res.json())
    .then(data => {
      eth_price_pound = data.open;
      let eth_price = data.open.split('.');
      eth_price_pound_first = eth_price[0];
      eth_price_pound_last = eth_price[1] == undefined ? '0' : eth_price[1];

      let ch_change_index = -1;
      let is_increase = 0;

      if(eth_price_pound_prev != '')
      {
      for (let i = 0; i < eth_price_pound.length; i++) {
        if(eth_price_pound.charAt(i) != eth_price_pound_prev.charAt(i))
        {
          ch_change_index = i;
          if(Number(eth_price_pound.charAt(i)) > Number(eth_price_pound_prev.charAt(i)))
          {
            is_increase = 1;
          }
          break;
        }
      }
    }

      let priceLabel_ = '£';
      if(ch_change_index > -1)
      {
        var eth_price_pound_first_length = eth_price_pound_first.length

        for (let i = 0; i < eth_price_pound_first_length; i++) {
          if(ch_change_index == i)
          {
            priceLabel_ += is_increase == 1 ? '<span style="color:green">' : '<span style="color:red">';
          }
          priceLabel_ += eth_price_pound_first.charAt(i);
        }

        
        priceLabel_ += '<span  style="font-size: 1.5rem; line-height: 2rem;">.';

        for (let i = eth_price_pound_first_length+1; i < eth_price_pound_last.length+eth_price_pound_first_length+1; i++) {
          if(ch_change_index == i)
          {
            console.log('is_increase: ' + is_increase);
            priceLabel_ += is_increase == 1 ? '<span style="color:green">' : '<span style="color:red">';
          }
          priceLabel_ += eth_price_pound_last.charAt(i-eth_price_pound_first_length-1);
        }
        priceLabel_ += '</span>';
        priceLabel_ += '</span>';
      }
      else
      {
        priceLabel_ += `${eth_price_pound_first}<span style="font-size: 1.5rem; line-height: 2rem;">.${eth_price_pound_last}</span>`;
      }

      setPriceLabelP(priceLabel_);

      setStartTimeP(moment({}).seconds(data.startTime.seconds).toISOString());
    });
}

  return (
    <div className="pt-12 bg-gray-50 sm:pt-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ethereum Price
          </h2>
        </div>
      </div>
      
      <div className="pb-12 mt-10 bg-white sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-50" />
          <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

            <div className="max-w-8xl mx-auto">

              <dl className="w-1/3 mx-auto bg-white rounded-lg shadow-lg box1of2">
                <div className="flex flex-col p-6 text-center border-t border-gray-100" data-tip data-for="registerTip">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    ETH/USD
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-gray-500">
                  <div className="content" dangerouslySetInnerHTML={{__html: priceLabel}}></div>
                  </dd>
                </div>
              </dl>

              <dl className="w-1/3 mx-auto bg-white rounded-lg shadow-lg box2of2">
                <div className="flex flex-col p-6 text-center border-t border-gray-100" data-tip data-for="registerTipP">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    ETH/GBP
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-gray-500">
                  <div className="content" dangerouslySetInnerHTML={{__html: priceLabelP}}></div>
                  </dd>
                </div>
              </dl>

              
            </div>
            
          </div>
        </div>
      </div>
      <ReactTooltip id="registerTip" place="right" effect="solid">
      {startTime}
      </ReactTooltip>

      <ReactTooltip id="registerTipP" place="right" effect="solid">
      {startTimeP}
      </ReactTooltip>
    </div>
  );
}
export default App;