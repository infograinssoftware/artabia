<template>
  <div>
    <section class="cover_pfl">
      <div class="cover_bg_box">
        <img  :src="userCoverImg" class="cover_bg_img">
      </div>      
       <!-- <img class="cover_bg_img" :src="userCoverImg" />
       <img :src="image" class="cover_bg_img" /> -->
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
import Swal from "sweetalert2";

export default {
  
  components: {ProfileSidebar, ItemCard, Swal},
  props:['cards'],
  data() {
    return {
      cards: null,
      userCoverImg: null,
      user : null
      // getFreeVideo : getFreeVideo()
    }
  },
  async created() {

    Moralis.initialize("cUcIRelhTpcM5tvYAHiDuCEuNIpXeRGA56J4OfNM");

    Moralis.serverURL = 'https://rpzgvjogtika.grandmoralis.com:2053/server'

    if(!localStorage.getItem('Parse/cUcIRelhTpcM5tvYAHiDuCEuNIpXeRGA56J4OfNM/currentUser')){
      Moralis.authenticate().then(function (user) {
        console.log(user.get('ethAddress'))
      })
    }
    // this.cards = cards
    // this.cards = cards.slice(0, 6),
    // const base64String2 = await btoa(String.fromCharCode(...new Uint8Array(JSON.parse(localStorage.getItem('userdata')).user.coverImage.data)));
    // const decodedString2 = await atob(base64String2);
    // console.log(JSON.parse(localStorage.getItem('userdata')).user.coverImage.data, 'coverImage', decodedString2)
    this.user =  JSON.parse(localStorage.getItem('userdata')).user
    console.log(this.user, 'user is here')
    this.userCoverImg =  JSON.parse(localStorage.getItem('userdata')).user.coverImage
console.log(this.userCoverImg, 'cover image is here')
    // console.log(this.userCoverImg,  this.cards , 'youtube')
    // const option = { chain: "rinkeby", address: "0xaa737df2b2c4175205af4644cb4e44d7b9cee5d4"};
    // console.log(this.im.account, 'account nft')
      const options = { 
        chain: 'rinkeby',
        address: '0xf7aeb79dc38dfff49978c2843710e6f100b082d5'
      };
      console.log('mmmmmmmmmmmmoooooooorrr')
        const transfersNFT = await Moralis.Web3API.account.getNFTTransfers(options);
        console.log(transfersNFT, ' NFT transfer');
      const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
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
    showSuccss() {
      let timerInterval;
      Swal.fire({
        title: "Profile Updated Successfully",
        html: "closing in <b></b> milliseconds.",
        timer: 800,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    },
    onFileChange(e) {

      var files = e.target.files || e.dataTransfer.files;
      console.log(files, 'sahdfhsahdfsadf');
      if (!files.length)
        return;
      this.createImage(files[0]);
        
    },
    async createImage(file) {
      var image = await new Image();
      var reader = await new FileReader();
      console.log(file, 'checking fo the file');
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
        this.userCoverImg = e.target.result;
        this.updateCoverImg(this.userCoverImg);
      }
      reader.readAsDataURL(file);
    }, 
    async updateCoverImg(newImage){
      // console.log(newImage, 'got the image in the state');
      let profile_data = {
        social: {
          website: this.user.social.website,
          discord: this.user.social.discord,
          youtube: this.user.social.youtube,
          facebook: this.user.social.facebook,
          twitch: this.user.social.twitch,
          tiktok: this.user.social.tiktok,
          snapchat: this.user.social.snapchat,
        },
        id: JSON.parse(localStorage.getItem("userdata")).user.id,
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
        bio: this.user.bio,
        lang: this.user.lang,
        profileImage: this.user.profileImage,
        coverImage: newImage,
        createdAt: this.user.createdAt,
      };
      let updatedUser = await this.axios.post(
        `${BACKEND_URL}/user/update`,
        profile_data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${
              JSON.parse(localStorage.getItem("userdata")).token
            }`,
          },
        }
      );
    if(updatedUser.status == 200){
      this.showSuccss()
      let Saveduser =  JSON.parse(localStorage.getItem("userdata"))
      Saveduser.user.name =  this.user.name
      Saveduser.user.username =  this.user.username
      Saveduser.user.email =  this.user.email
      Saveduser.user.bio =  this.user.bio
      Saveduser.user.lang =  this.user.lang
      Saveduser.user.profileImage =  this.user.profileImage
      Saveduser.user.coverImage =  this.image
      Saveduser.user.createdAt =  this.user.createdAt
      Saveduser.user.social.website =  this.user.social.website
      Saveduser.user.social.discord =  this.user.social.discord
      Saveduser.user.social.youtube =  this.user.social.youtube
      Saveduser.user.social.facebook =  this.user.social.facebook
      Saveduser.user.social.twitch =  this.user.social.twitch
      Saveduser.user.social.tiktok =  this.user.social.tiktok
      Saveduser.user.social.snapchat =  this.user.social.snapchat
      Saveduser.token = Saveduser.token
      Saveduser.message = `The user with id: ${Saveduser.user.id} was found.`
      localStorage.setItem('userdata', JSON.stringify(Saveduser))
      this.userCoverImg = this.image
    }
      console.log(this.userCoverImg, 'new cover image')
      console.log("Saving profile...", updatedUser); 
      this.$forceUpdate();
    } 
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

.cover_bg_box{
      height: 263px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
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

@media screen and (max-width:425px) {
    .cover_bg_box{
      height: 225px;
    }
}
</style>
