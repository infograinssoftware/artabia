import {
  ArtabiaERC1155,
  ArtabiaERC721,
  ERC1155AuctionMarketplace,
  ERC1155ListingMarketplace,
  ERC1155OrderMarketplace,
  ERC721AuctionMarketplace,
  ERC721ListingMarketplace,
  ERC721OrderMarketplace,
  IntegrationManager
} from "integration";
import Vue from "vue";

const Web3 = require('web3')

const Moralis = require('moralis')



export default {

  data() {
    return {
      cms: "http://localhost:1337",
      featured: {},
    }
  },

  async created() {

    window.im = new IntegrationManager([
      [ ERC721OrderMarketplace, '0xf7aeb79dc38dfff49978c2843710e6f100b082d5', 'erc721OrderMarketplace' ],
      [ ERC721ListingMarketplace, '0x0753328af3a3e963eefc0dd9977f9777abf8b8f0', 'erc721ListingMarketplace' ],
      [ ERC721AuctionMarketplace, '0xc14f305b87e446f1b4ce70000619c2408b572ffa', 'erc721AuctionMarketplace' ],
      [ ERC1155OrderMarketplace, '0xa68828a30ff846f420318a15c990f687e0ce6f9c', 'erc1155OrderMarketplace' ],
      [ ERC1155ListingMarketplace, '0x41b3e8752cd4e5073127125882b754a9fc2c28af', 'erc1155ListingMarketplace' ],
      [ ERC1155AuctionMarketplace, '0x14edd9f2d67e50bc6615e573ae55f4f2a7c6743c', 'erc1155AuctionMarketplace' ],
      [ ArtabiaERC721, '0x81a5c730043fe2dd4d885407e52d1cd33b7a66f3', 'artabiaErc721' ],
      [ ArtabiaERC1155, '0xaed1654fe63fcec92b83faf7a0b9ac1805536c25', 'artabiaErc1155' ]
    ]);
  


    window.binanceNode = new Web3('https://bsc-dataseed.binance.org')
    window.ethereumNode = new Web3('https://rinkeby.infura.io/v3/f6e6e48ae12549f9915623dbca2b7bdd')

    window.BACKEND_URL='https://artabia.com:3001'

    // window.ETHERSCAN_KEY='R9ECHH6U5WVVPQJ683W7K96M9MU2Q2VQDC'
    window.ETHERSCAN_KEY = 'XU1QP5487BANTMRSVBIPP61B3CPNIXB216'
    // headers = {
    //   'User-Agent': "PostmanRuntime/7.17.1",
    //   'Accept': "/",
    //   ‘Cache-Control’: “no-cache”,
    //   ‘Postman-Token’: “267dd7be-7f3f-4d67-a51c-05152aa8e8fc,8f8b84b0-3df1-4656-9480-c31e99d270d2”,
    //   ‘Host’: “ropsten.etherscan.io 10”,
    //   ‘Accept-Encoding’: “gzip, deflate”,
    //   ‘Cookie’: “__cfduid=d33064099a72a08ae6f9197c790da62d21569724532”,
    //   ‘Connection’: “keep-alive”,
    //   ‘cache-control’: “no-cache”
    //   }

    // for signing using metamask
    // im.web3.eth.sign(im.web3.utils.utf8ToHex("Hello world"), "0xaa737df2b2c4175205af4644cb4e44d7b9cee5d4")

    window.getEthPrice = () => fetch('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=' + ETHERSCAN_KEY).then(res => res.json()).then(res => res.result.ethusd.split('.')[0])

    // window.getNftMetadata = (id) => fetch(`${BACKEND_URL}/metadata/${id}.json`).then(response => response.json())

    //Login the user afte home page loading

    window.login = async ({ web3, account = '0x000000000000000000000000000000000000'}) => {
      let message = "Welcome to Artabia!\n\nPlease sign this message to log in"
      let hash = im.web3.utils.sha3(message)
      try{

        let signature = await im.web3.eth.personal.sign(hash, account)
        console.log(signature, 'signature is here')
        let user_data = await this.axios.post(`${BACKEND_URL}/user/connect`,{"id" : account, "signature" : signature}).then((res) => res.data);
        return user_data
      }
      catch(e){
        console.log(e);
        return e;
      }
    }

    
    // async function getMoraliNFT(){

    //   const options = { chain: 'rinkeby', address: '0xf7aeb79dc38dfff49978c2843710e6f100b082d5' };
    //   const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
    //   console.log(polygonNFTs, ' MORALIS NFTs are here');
    //   window.moralisnft = polygonNFTs
    // }
    // getMoraliNFT()

    window.Moralis = Moralis

    Vue.prototype.$cms = this.cms

    try {
      const {data} = await this.axios.get(`${this.$cms}/global`);

      window.featured = data;

    } catch (e) {
      console.log(e)
    }

  },
  async mounted() {
    document.querySelector(".loading-spinner").classList.add("hidden");
  }
}

