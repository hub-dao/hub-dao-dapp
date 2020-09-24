import pool_abi from './json/POOLABI.json';
import erc_abi from './json/ERC20.json';
import Contract from 'web3-eth-contract';
// import { Web3Provider } from '@ethersproject/providers'

export const address = {
         token: '0x1cc945Be7d0D2C852d0096A8b5714b44eD21D5D3',
         uniswap: {
           USDC_WETH: '0xdac17f958d2ee523a2206206994597c13d831ec7',
           LINK_WETH: '0x514910771af9ca656af840dff83e8264ecf986ca',
           HT_WETH: '0x6f259637dcd74c767781e37bc6133cd6a68aa161',
           YFII_WETH: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
           GXC_WETH: '0x2e93FE8d550a7B7E7b2e561cd45ceBccbAa79358',
           GOF_WETH: '0x488E0369f9BC5C40C002eA7c1fe4fd01A198801c'
         },
         gxc: {
           pool: '0x3Cc63313c1241d832E6d6D5c48c0E523589326f7',
           erc20: '0x2e93FE8d550a7B7E7b2e561cd45ceBccbAa79358'
         },
         ht: {
           pool: '0xA68B90cDfEBEAd25DA56a6476bdef90804D6b6E1',
           erc20: '0x6f259637dcD74C767781E37Bc6133cd6A68aa161'
         },
         usdt: {
           pool: '0x94a5Ae87E78c74525273a629056FF5775A5797ED',
           erc20: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
         },
         weth: {
           pool: '0x00022837E66Fdd4bbFe63859d7dc12651738D329',
           erc20: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
         },
         bnb: {
           pool: '0x385baa6B28106672e6B11b014F5A8EDB4ac04dE1',
           erc20: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'
         },
         gof: {
           pool: '0xd8f9901d1b13cD51D695b06c77dB30bC8905B25e',
           erc20: '0x488E0369f9BC5C40C002eA7c1fe4fd01A198801c'
         }
       };

export const initContracts = () => {
  Contract.setProvider(window.ethereum);
  return {
    address: address,
    token: new Contract(erc_abi.abi, address.token),
    gxc: {
      pool: new Contract(pool_abi.abi, address.gxc.pool),
      erc20: new Contract(erc_abi.abi, address.gxc.erc20)
    },
    ht: {
      pool: new Contract(pool_abi.abi, address.ht.pool),
      erc20: new Contract(erc_abi.abi, address.ht.erc20)
    },
    usdt: {
      pool: new Contract(pool_abi.abi, address.usdt.pool),
      erc20: new Contract(erc_abi.abi, address.usdt.erc20)
    },
    weth: {
      pool: new Contract(pool_abi.abi, address.weth.pool),
      erc20: new Contract(erc_abi.abi, address.weth.erc20)
    },
    gof: {
      pool: new Contract(pool_abi.abi, address.gof.pool),
      erc20: new Contract(erc_abi.abi, address.gof.erc20)
    },
    bnb: {
      pool: new Contract(pool_abi.abi, address.bnb.pool),
      erc20: new Contract(erc_abi.abi, address.bnb.erc20)
    }
  };
};

export const initContractsSend = () => {
  Contract.setProvider(window.ethereum);
  return {
    address: address,
    token: new Contract(erc_abi.abi, address.token),
    gxc: {
      pool: new Contract(pool_abi.abi, address.gxc.pool),
      erc20: new Contract(erc_abi.abi, address.gxc.erc20)
    },
    ht: {
      pool: new Contract(pool_abi.abi, address.ht.pool),
      erc20: new Contract(erc_abi.abi, address.ht.erc20)
    },
    usdt: {
      pool: new Contract(pool_abi.abi, address.usdt.pool),
      erc20: new Contract(erc_abi.abi, address.usdt.erc20)
    },
    weth: {
      pool: new Contract(pool_abi.abi, address.weth.pool),
      erc20: new Contract(erc_abi.abi, address.weth.erc20)
    },
    gof: {
      pool: new Contract(pool_abi.abi, address.gof.pool),
      erc20: new Contract(erc_abi.abi, address.gof.erc20)
    },
    bnb: {
      pool: new Contract(pool_abi.abi, address.bnb.pool),
      erc20: new Contract(erc_abi.abi, address.bnb.erc20)
    }
  };
};
