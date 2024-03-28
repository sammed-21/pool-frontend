

import React, { useState, useEffect } from "react";
import Modal from "./Modal";

import axios from "axios";
import load from '../assets/loading.svg'
import { useTokenContext } from '../context/TokenContext';

import search from '../assets/search.svg'
import useSelectToken from "../hooks/useSelectTokenModal";
const SelectTokenModal = () => {
    // const [isOpen, setIsOpen] = useState(true);
    const { selectedTokens, selectToken1, tokens,
        randomTokens, selectToken2, loading, swapselected1 } = useTokenContext();
    console.log(swapselected1)
    const [searchTerm, setSearchTerm] = useState("");
    // const [tokens, setTokens] = useState([]);
    // const [randomTokens, setRandomTokens] = useState([]);

    const { isOpen, onOpen, onClose } = useSelectToken()

   
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTokens = tokens.filter(token =>
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const onChange = (open) => {
        if (!open) {

            onClose();
        }
    };
    const tokenSeleected = (token) => {
        
        if(swapselected1){
            selectToken1(token)
        }else{
            selectToken2(token)
        }
        onClose()
    }

    return (
        <Modal
            title="Select a token"
            description=""
            isOpen={isOpen}
            onChange={onChange}
        >
            {loading ? (
                <div className="flex items-center justify-center h-20">
                    <img src={load} alt="Loading" className="w-8 h-8 animate-spin" />
                </div>
            ) : (
                <div className="flex flex-col gap-4 justify-start w-full h-full ">
                    <div className="w-full relative px-[20px]">
                        <div className="relative">
                            <img src={search} alt="Search" className="absolute w-4 left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search name and paste address"
                                className="w-full bg-[#1B1B1B] text-white border-[1px] h-10 border-gray-300/40 rounded-xl pl-10" // Add left padding to accommodate the image
                            />
                        </div>
                    </div>

                    {/* Fixed range of logos and symbols */}
                    <div className="flex  px-[20px] gap-3 flex-wrap items-center justify-start mb-4">
                        {randomTokens.map((token,index) => (
                            <span key={index} onClick={() => tokenSeleected(token)} className="flex gap-3  cursor-pointer border-[1px] border-gray-400/40 rounded-full pt-[5px] pr-[12px] pb-[5px] pl-[5px] text-white  items-center justify-start">
                                <img src={token.logoURI} className="w-fit object-cover h-full rounded-full " alt="Token logo" />
                                {token.symbol}
                            </span>
                        ))}
                    </div>
                    <hr />
                    {/* Scrollable list of tokens */}
                    <div className="overflow-y-auto px-5 flex flex-col gap-y-3 max-h-60">
                        {filteredTokens.map((token,id) => (
                            <span key={id} onClick={() => tokenSeleected(token)} className="flex cursor-pointer   gap-3 items-center justify-start">
                                <img src={token.logoURI} className="w-fit object-cover h-full" alt="Token logo" />
                                <div className="text-white flex flex-col text-start justify-start ">
                                    <h1>{token.name}</h1>
                                    <p className="text-xs text-[9B9B9B]">
                                        {token.symbol}
                                    </p>
                                </div>
                            </span>
                        ))}
                    </div>
                </div>)}
        </Modal>
    );
};

export default SelectTokenModal;

