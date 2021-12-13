<template>
  <div>
    <section class="cover_pfl">
      <div class="cover_bg_box">
        <img :src="userCoverImg" class="cover_bg_img">
      </div>      
       <img class="cover_bg_img" :src="userCoverImg" />
       <img :src="image" class="cover_bg_img" />
        <div class="button-wrapper">
        <label class="custom-file-upload">
            <input type='file' @change="onFileChange"/>
            <b-icon icon="upload" aria-hidden="true" class="upload_btn_icon"></b-icon>
        </label>
        </div>
    </section>
    <div class="container">
      <profile-sidebar/>
      <div class="collection-container">
        <div class="collection-header">
          <span>On sale</span>
          <span>Created</span>
          <span>Activity</span>
          <span>Owned</span>
        </div>
        <div class="collection-body" v-if="cards">
          <item-card v-for="card in cards" v-bind:key="card" :card="card"  />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSidebar from '@/components/ProfileSidebar'
import ItemCard from '@/components/ItemCard'
// import cards from '@/cards.json'

export default {
  
  components: {ProfileSidebar, ItemCard},
  props:['cards'],
  data() {
    return {
      cards: null,
      userCoverImg: null,
      // getFreeVideo : getFreeVideo()
    }
  },
//   watch: {
//   getFreeVideo() {
//     this.cards = this.getFreeVideo
//   }
// },
  // async beforeMount() {
  //   this.cards = null

  //   // const option = { chain: "rinkeby", address: "0xf7aeb79dc38dfff49978c2843710e6f100b082d5"};
  //   //   const transfersNFT = await Moralis.Web3API.account.getNFTTransfers(option);
  //   //   console.log(transfersNFT, ' NFT transfer');
  //   //   const options = { 
  //   //       chain: 'rinkeby', 
  //   //       address: '0xf7aeb79dc38dfff49978c2843710e6f100b082d5'
  //   //   };
  //   //   const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);;
  //   //   console.log(polygonNFTs, 'sdfosadfiosiodf');
  //   //   // console.log(transfersNFT);
  //   //   let content = []
  //   //    polygonNFTs.result.forEach( e => {
  //   //             let url = e.token_uri;
  //   //             fetch(url)
  //   //             .then(response => response.json())
  //   //             .then(data => {
                   
  //   //                 // let currentDiv = document.getElementById("content");
  //   //                 content.push(data.image)
                    
  //   //             })
  //   //         })
  //   //     this.cards = content
  //   //     console.log(this.cards, 'cards')
    
  // },
  async created() {

    // this.cards = cards
    // this.cards = cards.slice(0, 6),
    // const base64String2 = await btoa(String.fromCharCode(...new Uint8Array(JSON.parse(localStorage.getItem('userdata')).user.coverImage.data)));
    // const decodedString2 = await atob(base64String2);
    // console.log(JSON.parse(localStorage.getItem('userdata')).user.coverImage.data, 'coverImage', decodedString2)
    this.userCoverImg =  JSON.parse(localStorage.getItem('userdata')).user.coverImage

    // console.log(this.userCoverImg,  this.cards , 'youtube')
    // const option = { chain: "rinkeby", address: "0xaa737df2b2c4175205af4644cb4e44d7b9cee5d4"};
    //   const transfersNFT = await Moralis.Web3API.account.getNFTTransfers(option);
      // console.log(transfersNFT, ' NFT transfer');
      const options = { 
          chain: 'rinkeby', 
          address: im.account
      };
      const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);;
      console.log(polygonNFTs, 'sdfosadfiosiodf');
      // console.log(transfersNFT);
      let content = []
       polygonNFTs.result.forEach( e => {
                let url = e.token_uri;
                fetch(url)
                .then(response => response.json())
                .then(data => {
                   
                    // let currentDiv = document.getElementById("content");
                    content.push(data.image)
                    
                })
            })
        this.cards = content
        console.log(this.cards, 'cards');

  },
data: {
    // active: false,
    image: null,
    

  },

  methods: {

    onFileChange(e) {

      var files = e.target.files || e.dataTransfer.files;
      console.log(files, 'sahdfhsahdfsadf');
      if (!files.length)
        return;
      this.createImage(files[0]);
        
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      console.log(file, 'checking fo the file');
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
        this.image = e.target.result;
      }
      reader.readAsDataURL(file);
    },  
    }

}

</script>

<style scoped>
.container {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.collection-container {
  width: 100%;
  padding: 2rem 0;
  z-index: 999;
}

.collection-header {
  color: #44484b;
  font-weight: bold;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 1rem;
}

.collection-body {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  grid-gap: 0.5rem;
  align-items: center;
}

.card {
  margin: auto;
}

@media screen and (min-width: 992px) {
  .container {
    max-width: 1300px;
    flex-direction: row;
  }

  .collection-container {
    margin-left: 3rem;
    width: 70%;
  }

  .collection-header {
    max-width: 860px;
    margin: 0 auto;
  }

  .collection-body {
    max-width: 870px;
    margin: 1.5rem auto 0;
  }
}
.cover_pfl {
    height: 250px;
    position: relative;
    /* overflow: hidden; */
}

/* ************* */


input[type="file"] {
  display: none;
}

.custom-file-upload {
  cursor: pointer;
  text-decoration: none;
  position: absolute;
  right: 25px;
  bottom: 7px;
}

.upload_btn_icon {
  background:  -webkit-linear-gradient(to right, #e2c4b5, #988bc2) !important;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 25px;
}
</style>
