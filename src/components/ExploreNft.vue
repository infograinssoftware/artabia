<template>
  <div :class="`itemBox ${card.type}`">
    <!-- <a :href="`/view-order/ethereum/${card.tokenUri.external_url.slice(10)}`" class="nft-cardClickable"> -->
    <!-- <b-card
    v-if="card"
    :img-src="isAudio || !card.tokenUri.image ? defaultImg : card.tokenUri.image"
    :img-alt="checkType(card.tokenUri.image)"
    img-top
    tag="article"
    class="mb-0"
  > -->
    <!-- 
    <h6 class="my-0"> {{card.tokenUri.name}}</h6><br>
    <b-card-text class="flex space-x-3 items-center mt-0">
      <img :src="usernftprofile" :alt="owernImage(card.owner)" class="user-avatar">
      <span v-if="nft_user"> @ {{nft_user}}</span>
    </b-card-text> -->
    <!-- custom card  -->


    <div v-if="card" class="card" style="width: 18rem" tag="article" :v-once="checkType(card.tokenUri.image)">
      <a
        :href="`/view-order/ethereum/${
          card.orderId !== null ? card.orderId : ''
        }`"
        class="nft-cardClickable"
      >

      <div class="flex-1 flex justify-center items-center preview">
          <figure class="w-100">
            <img
              v-if="ext === 'image'"
              class="h-80 card-img-top"
              :src="
                isAudio || !card.tokenUri.image
                  ? defaultImg
                  : card.tokenUri.image
              "
              alt="name"
            />
          </figure>

          <figure
            v-if="ext === 'audio'"
            class="bg-audio flex items-end justify-center w-100 audio_Div"
          >
            <audio controls>
              <source
                :src="
                  isAudio || !card.tokenUri.image
                    ? defaultImg
                    : card.tokenUri.image
                "
                type="audio/ogg"
              />
            </audio>
          </figure>

          <figure>
            <model-gltf
              src="blob:http://localhost:8080/2d13cf28-4ab1-440b-97d6-1ca0762c7b84"
            ></model-gltf>
          </figure>

          <video v-if="ext === 'video'" class="h-80" controls>
            <source
              :src="
                isAudio || !card.tokenUri.image
                  ? defaultImg
                  : card.tokenUri.image
              "
            />
          </video>
        </div>




        <!-- <img
          :src="
            isAudio || !card.tokenUri.image ? defaultImg : card.tokenUri.image
          "
          class="card-img-top"
          :alt="checkType(card.tokenUri.image)"
        /> -->
      </a>

      <div class="card-body">
        <h6 class="my-0">{{ card.tokenUri.name }}</h6>
        <br />
        <div class="flex space-x-3 items-center mt-0">
          <img
            :src="usernftprofile"
            :alt="owernImage(card.result.owner)"
            class="user-avatar"
          />
          <span v-if="nft_user"> @ {{ nft_user }}</span>
        </div>
      </div>

      <!-- </div> -->
      <!-- custom card  -->
      <template>
        <a
          class="nft-cardClickable"
          :href="`/view-order/ethereum/${
            card.orderId !== null ? card.orderId : ''
          }`"
        >
          <div class="footer-slot">
            <div class="price price flex px-2 py-2.5 items-center">
              <span class="flex flex-col text-left">
                <span :class="leftSideTextTopClass"
                  >Current {{ card.result.price ? "Price" : "Bid" }}
                </span>
                <span v-if="card.result.price">{{
                  ethPrice(card.result.price)
                }}</span>
                <span v-if="card.result.offer">{{
                  ethPrice(card.result.offer)
                }}</span>
              </span>

              <span v-if="card.result.endsAt" class="flex flex-col text-right">
                <span> Ending in</span>
                <span>
                  <vue-countdown
                    :time="`${biddingTime(parseInt(card.result.endsAt))}`"
                    v-slot="{ days, hours, minutes, seconds }"
                  >
                    {{ days }} d, {{ hours }} h, {{ minutes }} m,
                    {{ seconds }} s
                  </vue-countdown>
                </span>
              </span>
              <!-- <b-dropdown id="dropdown" dropright class="m-2" icon="three-dots-vertical">
            <b-dropdown-item href="#">Transfer</b-dropdown-item>
            <b-dropdown-item href="#">List (On Marketplace)</b-dropdown-item>
          </b-dropdown> -->
              <!-- <div class="carditem_dots">
            <b-dropdown dropright toggle-class="carditem_dots_tgl p-0 has-background-white btn-light" no-caret>
              <template #button-content>
                <b-icon icon="three-dots-vertical" aria-hidden="true"></b-icon> 
              </template>
              <b-dropdown-item href="#">Transfer</b-dropdown-item>
              <b-dropdown-item href="#">List (On Marketplace)</b-dropdown-item>
            </b-dropdown>
          </div> -->
            </div>
          </div>
        </a>
      </template>
    </div>
    <!-- </a> -->
  </div>
</template>

<script>
import VueCountdown from "@chenfengyuan/vue-countdown";
// import { extend } from 'vue/types/umd';
import { ModelGltf } from "/src/assets/plugin/vue-model";

export default {
  components: { VueCountdown, ModelGltf },
  name: "ExploreNft",
  data() {
    return {
      nft_user: null,
      usernftprofile: null,
      defaultImg:
        "https://images.unsplash.com/photo-1542241647-9cbbada2b309?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
      isAudio: false,
      ext: null,
      extensions: {
        img: ["jpg", "png", "gif", "svg", "webp"],
        audio: ["mp3"],
        video: ["mp4", "wav", "ogg"],
        model3d: ["glb", "gltf"],
      },
    };
  },
  props: {
    card: {
      type: null,
      required: true,
    },

    rightSide: {
      type: Boolean,
      default: true,
    },

    leftSideTextTop: String,
    leftSideTextTopClass: String,
    leftSideTextBottom: String,
  },
  // watch: {
  //   id: function(newId) {
  //     console.log(`watch triggered, value of id is: ${newId}`);
  //     axios
  //       .get('https://api.coindesk.com/v1/bpi/currentprice.json',
  //         { params: { id: newId }}
  //       )
  //       .then(response => (this.info = response))
  //   }
  // },
  methods: {
    shortenAddress(ownerAddress) {
      return (
        ownerAddress.substring(0, 6) +
        "..." +
        ownerAddress.substring(ownerAddress.length - 4)
      );
    },
    async owernImage(ownerAddress) {
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhh");
      let nftOwnerDetail = await this.axios
        .post(
          `${BACKEND_URL}/user/user`,
          { id: ownerAddress },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: JSON.parse(localStorage.getItem("userdata")).token,
            },
          }
        )
        .then((res) => res);
      console.log(nftOwnerDetail.data.user.name);
      this.nft_user = nftOwnerDetail.data.user.name;
      this.usernftprofile = nftOwnerDetail.data.user.profileImage;
      // return [this.nft_user, this.usernftprofile]
    },
    ethPrice(weiPrice) {
      const etherValue = im.web3.utils.fromWei(weiPrice, "ether");
      return etherValue;
    },
    biddingTime(endTime) {
      console.log(typeof endTime, typeof Date.now(), "endtime is here");
      // console.log(endTime - Date.now()/1000) / 1000, 'difference date');
      return endTime * 1000 - Date.now();
    },
    async checkType(url) {
      try {
        let isAudiotype = await fetch(url, { method: "HEAD" })
          .then((res) =>
            true
              ? res.ok && res.headers.get("content-type")
              : (this.isAudio = true)
          )
          .catch((err) => console.log(err.message));
        console.log(isAudiotype, "6this is the audio");
        this.ext = isAudiotype.split("/")[0];
      } catch (e) {
        this.ext = "model3d";
        console.log("got the error");
      }
      // if(isAudiotype == true){
      //   this.isAudio = true
      // }
      // else{
      //   this.isAudio = false
      // }
      return url;
    },

    // async checkType(url) {
    //   let isAudiotype = await fetch(url, { method: "HEAD" })
    //     .then((res) =>
    //       true
    //         ? res.ok && res.headers.get("content-type").startsWith("audio")
    //         : (this.isAudio = true)
    //     )
    //     .catch((err) => console.log(err.message));
    //   if (isAudiotype == true) {
    //     this.isAudio = true;
    //   } else {
    //     this.isAudio = false;
    //   }
    //   return url;
    // },
  },
};
</script>

<style scoped>
.audio_Div{
  border-radius: 10px 10px 0px 0px;
  background-repeat: no-repeat;
  background-size: cover;
  height: 200px;
}

.audio_Div audio{
  padding: 15px;
  border-radius: 25px;
}

.card {
  max-width: 270px;
  min-width: 270px;
  box-shadow: 0px 25px 51px -35px rgba(0, 0, 0, 0.63);
  border-radius: 11px;
}

.card-img-top {
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
  min-height: 200px;
  max-height: 200px;
}

.user-avatar {
  border-radius: 50%;
  height: 38px;
  width: 38px;
}

.card-text span {
  margin-left: 0.5rem;
}

.card-footer {
  padding: 0;
  font-weight: bold;
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
}

.footer-slot {
  display: flex;
  align-items: center;
  border-bottom-left-radius: 11px;
}

.view-btn {
  background-color: #7259cb;
  border-bottom-left-radius: 11px;
  color: #fff;
  padding: 0.65rem 1.5rem;
  font-size: 1.25rem;
}

.price {
  display: block;
  width: 100%;
  text-align: center;
  justify-content: space-between;
  background: linear-gradient(45deg, #b5a3fe, #8f79e4);
  color: #fff;
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 0px 0px 10px 10px;
}

.carditem_dots {
  margin-left: auto;
}

.carditem_dots .carditem_dots_tgl {
  background: transparent !important;
  border: 0 !important;
  padding: 0 !important;
  color: #2b2c2c !important;
}
.carditem_dots button#__BVID__101__BV_toggle_ {
  background: transparent;
  color: #ddd;
  border: 0;
  padding: 0;
}
.nft-cardClickable:hover {
  text-decoration: none;
  color: inherit;
}
.itemBox {
  display: none;
}
.show {
  display: block;
}
</style>
