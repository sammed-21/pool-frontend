import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Grid, Typography } from "@mui/material";
import setting from './assets/settings.svg';

import RangeSlider from "./component/RangeSlider";
import BarChart from "./component/BarChart";
import downdarrwo from './assets/downarrow.svg'
import useSelectToken from "./hooks/useSelectTokenModal";
import ModalProvider from "./component/ModalProvider";
import axios from "axios";
import { TokenProvider, useTokenContext } from "./context/TokenContext";
import Boxfee from "./component/Boxfee";
import { feeData } from "../constants/boxfee";

const prices = [];
for (let i = 0; i < 6000; i++) {
  prices.push(Math.floor(Math.random() * 6000) + 1);
}


function App() {
  const { SetSwapSelected1, selectedTokens, swapselected1 } = useTokenContext()
  const [setShowFee, SetShowFee] = useState(false)
  const [inputValues1, setInputValues1] = useState("")
  const [inputValues2, setInputValues2] = useState("")
  const { onOpen } = useSelectToken();
  const [selectedFee, setSelectedFee] = useState(null)
  const [feeChanged, setFeeChanged] = useState({ fee: "1.00%", select: "80%" })
  // const {swapselected1}=useTokenContext()
  console.log(selectedTokens)
  const handleFeeChage = (data) => {
    setFeeChanged(data)
    setSelectedFee(data)

    setFeeChanged((prev) => ({
      ...prev,
      fee: data.fee,
      select: data.select
    }))
    console.log('clicded')
  }
  console.log('data', feeChanged)
  const handleModal2 = () => {
    onOpen()
    SetSwapSelected1(false);
  }
  const handleModal1 = () => {
    onOpen()
    SetSwapSelected1(true);
  }
  return (
    <div className=" min-h-screen py-10 h-full bg-[#131313] flex flex-col items-center justify-center relative">

      <ModalProvider />
      <div className="w-full h-full bg-[#131313] max-w-screen-sm rounded-xl border-[1px] border-gray-400/40 relative py-5 flex flex-col items-center justify-center">
        <div className="flex w-full justify-between items-center p-4"><h1 className="text-[20px]  text-white font-medium">Add liquidity</h1>
          <img src={setting} alt="image" /></div>

        <div className="flex w-full gap-4 flex-col px-4 ">
          <h2 className="text-base text-start w-full  text-white font-medium">Select pair</h2>
          <div className="flex flex-row gap-3 w-full w-full">
            <h1 className="text-white cursor-pointer hover:bg-[#1B1B1B] justify-between items-center font-semibold text-[20px] flex gap-3 w-full px-4 py-2 border-[1px] border-gray-400/30 rounded-2xl " onClick={() => handleModal1()}>
              {selectedTokens.token1 ?
                <span className="flex gap-3 items-center justify-start">
                  <img src={selectedTokens.token1.logoURI || "https://assets.coingecko.com/coins/images/9956/thumb/Badge_Dai.png?1696509996"} className="w-fit object-cover h-full" alt="image" />
                  {selectedTokens.token1.symbol}
                </span> : <span className="flex gap-3 items-center text-white font-medium text-xl justify-start">
                  Select a token
                </span>
              }
              <img src={downdarrwo} className="w-5 object-cover h-fit" alt="image" />

            </h1>
            <h1 className="text-white cursor-pointer font-semibold hover:bg-[#1B1B1B] text-[20px] items-center justify-between flex gap-3 w-full px-4 py-2 border-[1px] border-gray-400/30 rounded-2xl " onClick={() => handleModal2()}>
              {selectedTokens.token2 ?

                <span className="flex gap-3 items-center justify-start">
                  <img src={selectedTokens.token2.logoURI || "https://assets.coingecko.com/coins/images/9956/thumb/Badge_Dai.png?1696509996"} className="w-fit object-cover h-full" alt="image" />
                  {selectedTokens.token2.symbol || "select token"}
                </span> : <span className="flex gap-3 items-center text-white font-medium text-xl justify-start">
                  Select a token
                </span>
              }
              <img src={downdarrwo} className="w-5 object-cover h-fit" alt="image" />
            </h1>
          </div>
          <div className={`w-full  h-full relative ${(selectedTokens && selectedTokens.token1 === null && selectedTokens.token2 === null) ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="min-w-full  p-3 bg-[#131313]  rounded-xl border-[1px] border-gray-400/40 text-white  " style={{ textAlign: "left" }}>
              <div class=" w-full">
                <div class="flex items-center   justify-between min-w-full">
                  <span className="flex flex-col gap-3">
                    <h1 className="text-base text-[#FFFFFF] ">{feeChanged.fee} fee tier</h1>
                    <p className="text-[10px] text-[#FFFFFF] pl-3">{feeChanged.select} select</p>
                  </span>

                  <span onClick={() => SetShowFee(prev => !prev)} className="px-1 cursor-pointer py-1 rounded-md border-[1px] text-[#9B9B9B] border-gray-700/50">
                    {setShowFee ? "Edit" : "Hide"}
                  </span>

                </div>
              </div>
            </div>
            {setShowFee &&
              <div className="w-full text-white flex gap-2 h-full ">
                {feeData.map((data, index) => (
                  <div key={index} className="w-full  h-full  cursor-pointer relative " onClick={() => handleFeeChage(data)}>

                    <Boxfee
                      key={index}
                      fee={data.fee}
                      title={data.title}
                      className={selectedFee === data ? "border-[2px] border-pink-400" : ""}
                      select={data.select}
                    />
                  </div>
                ))}
              </div>
            }
            <RangeSlider data={prices} selectedTokens={selectedTokens} />
            <div className="w-full flex flex-col gap-3">
              <h1 className="text-start w-full font-semibold text-base text-[#3F3F3F]">Deposit amounts</h1>
              <div className="min-w-full  p-3 bg-[#1B1B1B] flex justify-between  rounded-xl border-[1px] border-gray-400/40 text-white  " style={{ textAlign: "left" }}>
              <div className="flex flex-col gap-3 justify-start items-start w-fit">
              <input
              className="bg-transparent text-[22px] font-semibold "
              font-size="20px"
              inputmode="decimal"
              autocomplete="off"
                  autocorrect="off"
                  type="text"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  placeholder="0"
                  minlength="1"
                  maxlength="79"
                  spellcheck="false"
                  value={inputValues1[1]}
                  onChange={(evt) => {
                    const value = evt.target.value;

                    setInputValues1(value
                    )
                  }}
                />
                <span className="">-</span>
                </div>
                <div class=" max-w-fit">
                <div class="flex items-center   justify-between min-w-full">
                <h1 className="text-white cursor-pointer font-semibold hover:bg-[#1B1B1B] text-[20px] items-center justify-between flex gap-3 w-full  bg-[#131313] p-1 px-2 rounded-2xl " onClick={() => handleModal2()}>
                {selectedTokens.token1 ?

                  <span className="flex gap-3 items-center justify-start">
                    <img src={selectedTokens.token1.logoURI || "https://assets.coingecko.com/coins/images/9956/thumb/Badge_Dai.png?1696509996"} className="w-fit object-cover rounded-full h-full" alt="image" />
                    {selectedTokens.token1.symbol || "select token"}
                  </span> : <span className="flex gap-3 items-center text-white font-medium text-xl justify-start">
                    Select a token
                  </span>
                }
              </h1>
                </div>
              </div>
              </div>
              <div className="min-w-full flex items-center justify-between p-3 bg-[#1B1B1B]  rounded-xl border-[1px] border-gray-400/40 text-white  " style={{ textAlign: "left" }}>
             <div className="flex flex-col gap-3 justify-start items-start w-fit">
             <input
             className="bg-transparent text-[22px] font-semibold "
                  font-size="20px"
                  inputmode="decimal"
                  autocomplete="off"
                  autocorrect="off"
                  type="text"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  placeholder="0"
                  minlength="1"
                  maxlength="79"
                  spellcheck="false"
                  value={inputValues2}
                  onChange={(evt) => {
                    const value = evt.target.value;
                    
                    setInputValues2(value
                      )
                    }}
                    />
                    <span className="">-</span>
                    </div>
                <div class=" max-w-fit">
                <div class="flex items-center   justify-between min-w-full">
                <h1 className="text-white cursor-pointer font-semibold hover:bg-[#1B1B1B] text-[20px] items-center justify-between flex gap-3 w-full  bg-[#131313] p-1 px-2 rounded-2xl " onClick={() => handleModal2()}>
                      {selectedTokens.token2 ?

                        <span className="flex gap-3 items-center justify-start">
                          <img src={selectedTokens.token2.logoURI || "https://assets.coingecko.com/coins/images/9956/thumb/Badge_Dai.png?1696509996"} className="w-fit object-cover rounded-full h-full" alt="image" />
                          {selectedTokens.token2.symbol || "select token"}
                        </span> : <span className="flex gap-3 items-center text-white font-medium text-xl justify-start">
                          Select a token
                        </span>
                      }
                    </h1>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <button className="w-full bg-pink-400 text-[20px] text-[#FFFFFF] rounded-md flex itmes-center justify-center py-1 px-1 h-10">connet wallet</button>
        </div>
      </div>

    </div>
  );
}

export default App;
