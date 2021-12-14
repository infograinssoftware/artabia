<template>
  <b-card
    v-if="card"
    :img-src="card.tokenUri.image"
    :img-alt="card.tokenUri.image"
    img-top
    tag="article"
    class="mb-0"
  ><h6 class="my-0"> {{card.tokenUri.name}}</h6><br>
    <b-card-text class="flex space-x-3 items-center mt-0">
      <img :src="usernftprofile" :alt="owernImage(card.owner)" class="user-avatar">
      <span v-if="nft_user" > @ {{nft_user}}</span>
    </b-card-text>
    <template #footer>
      <div class="footer-slot">
        <div class="price price flex px-2 py-2.5 items-center">
          <span class="flex flex-col text-left">
            <span :class="leftSideTextTopClass">{{leftSideTextTop}} </span>
            <span v-if="card.price">{{ethPrice(card.price)}}</span>
            <span v-if="card.offer">{{ethPrice(card.offer)}}</span>
          </span>

          <span v-if="!card.offer" class="flex flex-col text-right">
              
            <span> Ending in</span>
            <span>
              <vue-countdown :time="`${biddingTime(parseInt(card.offerPlacedAt))}`" v-slot="{ days, hours, minutes, seconds }">
                {{ days }} d, {{ hours }} h, {{ minutes }} m, {{ seconds }} s
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
    </template>
  </b-card>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown';
export default {
  components: {VueCountdown},
  name: 'NftCards',
  data(){
    
    return {
      nft_user : null,
      usernftprofile : null,
      time : Date()

    }
  },
  props: {
    card: {
      type: null,
      required: true,
    },

    rightSide:{
      type: Boolean,
      default: true,
    },

    leftSideTextTop:String,
    leftSideTextTopClass:String,
    leftSideTextBottom:String,
    

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
        return ownerAddress.substring(0, 6) + '...' + ownerAddress.substring(ownerAddress.length - 4)
    },
    async owernImage(ownerAddress){
      console.log('hhhhhhhhhhhhhhhhhhhhhhhhh');
      let nftOwnerDetail = await this.axios.post(`${BACKEND_URL}/user/user`, {'id': ownerAddress}, { headers: { 'Content-Type': 'application/json', 'Authorization' : JSON.parse(localStorage.getItem('userdata')).token }}).then((res) => res)
      console.log(nftOwnerDetail.data.user.name);
      this.nft_user = nftOwnerDetail.data.user.name
      this.usernftprofile = nftOwnerDetail.data.user.profileImage
      // return [this.nft_user, this.usernftprofile]
    },
    ethPrice(weiPrice){
      const etherValue = im.web3.utils.fromWei(weiPrice, 'ether');
      return etherValue
    },
    biddingTime(endTime){
      return endTime - Date.now()
    }
  },
}
</script>

<style scoped>
.card {
  max-width: 270px;
  min-width: 270px;
  box-shadow: 0px 25px 51px -35px rgba(0, 0, 0, 0.63);
  border-radius: 11px;
}

.card-img-top {
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
  min-height : 200px;
  max-height : 200px;
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
  background: linear-gradient( 45deg, #B5A3FE, #8F79E4);
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
</style>
