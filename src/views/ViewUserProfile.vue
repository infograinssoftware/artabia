<template>
  <div >
    <section class="cover_pfl">
      <div class="cover_bg_box">
        <img :src="userCoverImg" class="cover_bg_img" />
      </div>
      <!-- <img class="cover_bg_img" :src="userCoverImg" />
       <img :src="image" class="cover_bg_img" /> -->
      <!-- <div class="button-wrapper">
        <label class="custom-file-upload">
          <input type="file" @change="onFileChange" />
          <b-icon
            icon="upload"
            aria-hidden="true"
            class="upload_btn_icon"
          ></b-icon>
        </label>
      </div> -->
    </section>
    <div class="container">
      <view-profilesidebar />
      <div class="collection-container">
        <div class="collection-header">
          <span>On sale</span>
          <span>Created</span>
          <span>Activity</span>
          <span>Owned</span>
        </div>
        <div class="collection-body" v-if="cards">
          <item-card v-for="card in cards" v-bind:key="card" :card="card" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViewProfilesidebar from "@/components/ViewProfilesidebar.vue";
import ItemCard from "@/components/ItemCard";
// import cards from '@/cards.json'
import Swal from "sweetalert2";

export default {
  components: { ViewProfilesidebar, ItemCard, Swal },
  props: ["cards"],
  data() {
    return {
      cards: null,
      userCoverImg: null,
      user: null,
    };
  },
  async created() {
    Moralis.initialize("cUcIRelhTpcM5tvYAHiDuCEuNIpXeRGA56J4OfNM");

    Moralis.serverURL = "https://rpzgvjogtika.grandmoralis.com:2053/server";

    if (
      !localStorage.getItem(
        "Parse/cUcIRelhTpcM5tvYAHiDuCEuNIpXeRGA56J4OfNM/currentUser"
      )
    ) {
      Moralis.authenticate().then(function (user) {
        console.log(user.get("ethAddress"));
      });
    }
    console.log(
      this.$route.params.id,
      JSON.parse(localStorage.getItem("userdata")).token,
      "current route"
    );
    let getUser = {
      id : this.$route.params.id
    }
    // CALL THE API TO GET THE USER DATA  ${JSON.parse(localStorage.getItem('userdata')).user.userProfileImg ? JSON.parse(localStorage.getItem('userdata')).user.userProfileImg
    this.user = await this.axios.post(
      `https://artabia.com:3001/user/user`,
      getUser,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${
            JSON.parse(localStorage.getItem("userdata")).token
          }`,
        },
      }
    );
    console.log(this.user, "user is here");
    this.userCoverImg = this.user.data.user.coverImage;
    console.log(this.userCoverImg, "cover image is here");
    // console.log(this.userCoverImg,  this.cards , 'youtube')
    // const option = { chain: "rinkeby", address: "0xaa737df2b2c4175205af4644cb4e44d7b9cee5d4"};
    // console.log(this.im.account, 'account nft')
    const options = {
      chain: "rinkeby",
      address: this.$route.params.id,
    };

    const transfersNFT = await Moralis.Web3API.account.getNFTTransfers(options);

    const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
    let content = [];
    polygonNFTs.result.forEach((e) => {
      let url = e.token_uri;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          content.push(data.image);
        });
    });
    this.cards = content;
    console.log(this.cards, "cards");
  },
  data: {
    image: null,
  },
  methods: {},
};
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

.cover_bg_box {
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
  background: -webkit-linear-gradient(to right, #e2c4b5, #988bc2) !important;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 25px;
}

@media screen and (max-width: 425px) {
  .cover_bg_box {
    height: 225px;
  }
}
</style>
