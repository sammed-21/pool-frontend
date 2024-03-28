// TokenContext.js
import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

const TokenContext = createContext();

export const useTokenContext = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
  const [selectedTokens, setSelectedTokens] = useState({ token1: null, token2: null });
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [swapselected1 ,SetSwapSelected1] = useState(false);
    const [randomTokens, setRandomTokens] = useState([]);
  const selectToken1 = (token) => {
    setSelectedTokens((prevTokens) => ({
      ...prevTokens,
      token1: token,
    }));
  };

  const selectToken2 = (token) => {
    setSelectedTokens((prevTokens) => ({
      ...prevTokens,
      token2: token,
    }));
  };
  useEffect(() => {
    async function fetchTokens() {
        try {
            setLoading(true)
            const response = await axios.get('https://tokens.coingecko.com/uniswap/all.json');
            const tokensData = response.data.tokens;
            setTokens(tokensData);
            const randomIndices = Array.from({ length: 6 }, () => Math.floor(Math.random() * tokensData.length));
            const randomTokensData = randomIndices.map(index => tokensData[index]);
            setRandomTokens(randomTokensData);
        } catch (error) {
            setLoading(false)
            console.error('Error fetching tokens:', error);
        } finally {
            setLoading(false)
        }
    }

    fetchTokens();
     // Move the console.log here
}, []); // Empty dependency array means this effect runs only once after the initial render

   

  return (
    <TokenContext.Provider value={{ selectedTokens, selectToken1,swapselected1 ,SetSwapSelected1,loading, tokens,
randomTokens,selectToken2 }}>
      {children}
    </TokenContext.Provider>
  );
};
