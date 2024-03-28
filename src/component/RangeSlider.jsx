

import React, { useState } from "react";
import { Grid, Button, TextField, InputAdornment, Box } from "@mui/material"; // Update import to Material-UI v5
import Slider from "@mui/material/Slider"; // Import Slider from Material-UI v5
import { Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { MuiRail, MuiHandle, MuiTrack, MuiTick } from "./Components";
import BarChart from "./BarChart";
import barchartlogo from '/barchart.svg'
import zoomout from '../assets/svgexport-15.svg'
import zoomin from '../assets/zoomin.svg'
import { useTokenContext } from "../context/TokenContext";

const RangeSlider = (props) => {
  const {selectedTokens } = useTokenContext()
  const sortedData = props.data.slice().sort((a, b) => a - b);
 
  const range = [sortedData[0], sortedData[sortedData.length - 1]];
  const [ethSwitch, SetEthWitch] = useState(false)
  const [domain, setDomain] = useState(range);
  const [values, setValues] = useState(range);
  const [update, setUpdate] = useState(range);
  const [inputValues, setInputValues] = useState(range);

  const zoomIn = () => {
    const midPoint = (domain[0] + domain[1]) / 2;
    const newDomain = [
      midPoint - (midPoint - domain[0]) / 2,
      midPoint + (domain[1] - midPoint) / 2,
    ];
    setDomain(newDomain);
    setValues(newDomain);
    setUpdate(newDomain);
    setInputValues(newDomain);
  };

  const zoomOut = () => {
    const midPoint = (domain[0] + domain[1]) / 2;
    const newDomain = [
      midPoint - (domain[1] - domain[0]),
      midPoint + (domain[1] - domain[0]),
    ];
    setDomain(newDomain);
    setValues(newDomain);
    setUpdate(newDomain);
    setInputValues(newDomain);
  };

  return (
    <div className="w-full  pb-6 relative  h-full flex flex-col items-center justify-center ">

      <Grid
        position={'relative'}
        container
        alignItems="center"
        className="w-full flex flex-col gap-3"
        justify="space-around"

      >
        <div className="flex text-white justify-between w-full items-center">
          <h1>
            Set Price range
          </h1>
          <div className="flex gap-3 items-center justify-center">
          <span className=" border-[1px] border-gray-400/40 px-2 py-3 text-xs font-semibold rounded-md">Full range</span>
          {selectedTokens.token1&& selectedTokens.token2  &&     <div className="flex justify-center items-center  gap-2">
            <p onClick={() => SetEthWitch(prev => !prev)} className="flex cursor-pointer text-xs font-semibold transition delay-300 duration-300 ease-in-out  gap-x-1 rounded-md border-[1px] border-gray-400/40">
              <span className={`px-2 py-1 ${ethSwitch ? "bg-black rounded-md " : "text-[#5E5E5E]"}`}>
                {selectedTokens.token1 ? selectedTokens.token1.symbol : ""}
              </span>
              <span className={`px-2 py-1 ${ethSwitch ? "text-[#5E5E5E]" : "bg-black rounded-md "}`}>
              {selectedTokens.token1 ? selectedTokens.token2.symbol : ""}
              </span>
              </p>
            
              </div>
            }
            </div>
        </div>
        <Grid item xs={4} className="min-w-full p-3 bg-[#1B1B1B]  rounded-xl border-[1px] border-gray-400/40 text-white  " style={{ textAlign: "left" }}>
          <div class=" w-full">
            <div class="flex items-center   justify-between min-w-full">
              <div class="">
                <div class="text-[#9B9B9B] text-xs font-medium">Minimum Value</div>
                <input
                  className="bg-transparent font-semibold "
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
                  value={inputValues[0]}
                  onChange={(evt) => {
                    const value = evt.target.value;
                    const newState = [value, inputValues[1]];
                    setInputValues(newState);
                    if (value && value <= inputValues[1]) {
                      setValues(newState);
                      setUpdate(newState);
                      setDomain([newState[0], domain[1]]);
                    }
                  }}
                />
                <div className="text-[#9B9B9B] text-xs font-medium">
                {ethSwitch ? 
                  (selectedTokens.token1 ? `${selectedTokens.token1.symbol} per ${selectedTokens.token2.symbol}` : "") 
                  : 
                  (selectedTokens.token1 ? `${selectedTokens.token2.symbol} per ${selectedTokens.token1.symbol}` : "")
                }
              </div>
                            </div>
              <div class="flex flex-col gap-y-3">
                <button data-testid="increment-price-range" class="sc-aXZVg bbWEFp Button__BaseButton-sc-4a2dca96-1 Button__ButtonGray-sc-4a2dca96-5 InputStepCounter__SmallButton-sc-45cb4a1c-1 lmdAXV bvqCoe hKoHlL">
                  <div className="bg-black p-1 rounded-md border-[1px] border-gray-400/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>
                <button data-testid="decrement-price-range" class="sc-aXZVg bbWEFp Button__BaseButton-sc-4a2dca96-1 Button__ButtonGray-sc-4a2dca96-5 InputStepCounter__SmallButton-sc-45cb4a1c-1 lmdAXV bvqCoe hKoHlL">
                  <div className="bg-black p-1 rounded-md border-[1px] border-gray-400/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={4} className="min-w-full p-3 bg-[#1B1B1B]  rounded-xl border-[1px] border-gray-400/40 text-white  " style={{ textAlign: "left" }}>
          <div class=" w-full">
            <div class="flex items-center  justify-between min-w-full">
              <div class="">
                <div class="text-[#9B9B9B] text-xs font-medium">Maximum Value</div>

                <input
                  className="bg-transparent font-semibold "
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
                  value={inputValues[1]}
                  onChange={(evt) => {
                    const value = evt.target.value;
                    const newState = [inputValues[0], value];
                    setInputValues(newState
                    );
                    if (value && value >= inputValues[0]) {
                      setValues(newState);
                      setUpdate(newState);
                      setDomain([domain[0], newState[1]]);
                    }
                  }}
                />
                <div className="text-[#9B9B9B] text-xs font-medium">
                {ethSwitch ? 
                  (selectedTokens.token1 ? `${selectedTokens.token1.symbol} per ${selectedTokens.token2.symbol}` : "") 
                  : 
                  (selectedTokens.token1 ? `${selectedTokens.token2.symbol} per ${selectedTokens.token1.symbol}` : "")
                }
              </div>              </div>
              <div class="flex flex-col gap-y-3">
                <button data-testid="increment-price-range" class="sc-aXZVg bbWEFp Button__BaseButton-sc-4a2dca96-1 Button__ButtonGray-sc-4a2dca96-5 InputStepCounter__SmallButton-sc-45cb4a1c-1 lmdAXV bvqCoe hKoHlL">
                  <div className="bg-black p-1 rounded-md border-[1px] border-gray-400/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>
                <button data-testid="decrement-price-range" class="sc-aXZVg bbWEFp Button__BaseButton-sc-4a2dca96-1 Button__ButtonGray-sc-4a2dca96-5 InputStepCounter__SmallButton-sc-45cb4a1c-1 lmdAXV bvqCoe hKoHlL">
                  <div className="bg-black p-1 rounded-md border-[1px] border-gray-400/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Grid>


      </Grid>

      <div className="" style={{ margin: "5%", position: "relative", overflow: 'hidden', height: 'fit', width: "100%" }}>
        

        <div className="w-full h-full py-1  relative">
        {(selectedTokens && selectedTokens.token1 === null && selectedTokens.token2 === null) ?
           <></>
          :
          <>
        <div className="flex w-full justify-end" style={{ textAlign: "right" }}>
  <div className="flex gap-3 w-fit"> {/* Set gap to 0 */}
    <button onClick={zoomIn} className="border-[1px]  w-fit border-gray-400 rounded-full">
      <img src={zoomout} alt="image" className="w-7 h-full object-cover border-[1px] border-gray-400 rounded-full p-1" />
    </button>
    <button onClick={zoomOut} className="border-[1px] border-gray-400 rounded-full">
      <img src={zoomin} alt="image" className="w-fit h-full object-cover border-[1px] border-gray-400 rounded-full p-1" />
    </button>
  </div>
</div>
</>
        }

          <div className="min-w-[600px] px-5 mt-3 h-full max-h-[170px]  ">

           
            {(selectedTokens && selectedTokens.token1 === null && selectedTokens.token2 === null) ?
              <div className="w-full items-center justify-center flex flex-col gap-4 ">
              <img src={barchartlogo} alt="logo" className="w-fit object-cover h-full"/>
          <h1 className="text-[20px] font-medium text-[#FFFFFF]">Your select position will appear here.</h1>
              </div>
              :
              <>
              <BarChart data={props.data} highlight={update} domain={domain} />
              
              <Slider
              mode={3}
              step={1}
              
                min={domain[0]}
                className="w-full bg-[#131313]   "
                max={domain[1]}
                value={values}
                onChange={(event, newValues) => setValues(newValues)}
                
                onChangeCommitted={(event, newValues) => {
                  setValues(newValues);
                  setUpdate(newValues);

                  setInputValues(newValues);
                }}
                style={{ position: "absolute",bottom: "-12px", width: "94%" }}
              >
                <Rail>{({ getRailProps }) => <MuiRail getRailProps={getRailProps} />}</Rail>
                <Handles>
                  {({ handles, getHandleProps }) => (
                    <div className="slider-handles">
                      {handles.map((handle) => (
                        <MuiHandle key={handle.id} handle={handle} domain={domain} getHandleProps={getHandleProps} />
                      ))}
                    </div>
                  )}
                </Handles>
                <Tracks left={false} right={false}>
                  {({ tracks, getTrackProps }) => (
                    <div className="slider-tracks">
                      {tracks.map(({ id, source, target }) => (
                        <MuiTrack key={id} source={source} target={target} getTrackProps={getTrackProps} />
                      ))}
                    </div>
                  )}
                </Tracks>
                <Ticks count={5}>
                  {({ ticks }) => (
                    <div className="slider-ticks">
                      {ticks.map((tick) => (
                        <MuiTick key={tick.id} tick={tick} count={ticks.length} />
                      ))}
                    </div>
                  )}
                </Ticks>
              </Slider>
              </>
            }
          </div>
        </div>


      </div>
   
    </div>
  );
};

export default RangeSlider;




