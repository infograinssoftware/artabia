<template>
  <section class="trending-section flex flex-col items-center">
    <h1 class="font-medium mt-7">Explore</h1>
    <div class="container">
      <div class="collection-header flex-col md:flex-row">

        <div class="collection-tags justify-center mb-6">
          <button id="All-click" v-on:click="myFilter('All')" class="btn">
          <div class="collection-tag">
            <img
              :src="require('@/assets/images/bg-pattern.png')"
              alt="Fixed Price icon"
              class="tag-avatar h-6"
            >
            <span>All NFTs</span>
          </div>
          </button>
          <button v-on:click="myFilter('Artwork')" class="btn">
          <div class="collection-tag">
            <img
              :src="require('@/assets/images/bg-pattern.png')"
              alt="Fixed Price icon"
              class="tag-avatar h-6"
            >
            <span>Artwork</span>
          </div>
          </button>
          <button v-on:click="myFilter('Photography')" class="btn">
          <div class="collection-tag">
            <img
              :src="require('@/assets/images/bg-pattern.png')"
              alt="Fixed Price icon"
              class="tag-avatar h-6"
            >
            <span>Photography</span>
          </div>
          </button>
          <button v-on:click="myFilter('Audio')" class="btn">
          <div class="collection-tag">
            <img
              :src="require('@/assets/images/bg-pattern.png')"
              alt="Fixed Price icon"
              class="tag-avatar h-6"
            >
            <span>Audio</span>
          </div>
          </button>
          <button v-on:click="myFilter('Video')" class="btn">
          <div class="collection-tag">
            <img
              :src="require('@/assets/images/bg-pattern.png')"
              alt="Fixed Price icon"
              class="tag-avatar h-6"
            >
            <span>Video</span>
          </div>
          </button>
          <button v-on:click="myFilter('Collectibles')" class="btn">
          <div class="collection-tag">
            <img
              :src="require('@/assets/images/bg-pattern.png')"
              alt="Fixed Price icon"
              class="tag-avatar h-6"
            >
            <span>Collectibles</span>
          </div>
          </button>
        </div>
      </div>
      <div class="collection-body" v-if="noNFT">
        <h3>No NFTs are available</h3>
      </div>
      <div class="collection-body" v-if="cards">
        <explore-nft v-for="card in cards"
                     :key="card.tokenId"
                     :card="card"
                     leftSideTextBottom = "0.1 ETH"
                     leftSideTextTop="Current Price"/>
      </div>
          <div style="display:flex; justify-content:center; align-item: center;" v-if="exploreLoader">
            <Spinner v-if="exploreLoader" name="ripple" color="#8c65d3" />
          </div>
    </div>
  </section>


</template>

<script>


import cards from '@/cards.json'
import users from '@/UserProfiles.json'

import ItemCard from '@/components/ItemCard'
import ProfileCard from '@/components/ProfileCard'
import ExploreNft from '@/components/ExploreNft'
import Spinner from "vue-spinkit";

export default {
  name: 'Explore',
  components: {
    ItemCard, ProfileCard, ExploreNft, Spinner
  },
  data() {
    return {
      cards: null,
      users: null,
      noNFT: false,
      exploreLoader: true,
      cssProps: {
        backgroundImage: ''
      }
    }
  },
  async created() {
    // this.cards = cards
    // this.users = users
    const aChain = 'rinkeby';
     let connect_status = await im.connect(aChain);
    console.log(connect_status, 'status')
    this.im = im
    const info = await fetch(`${BACKEND_URL}/order/trending`).then(res => res.json());
    console.log("info is",info);

    let results = [];
    for(var i=0; i<info.orders.length;i++){
      results.push(await Promise.all([
      im.contracts.erc721AuctionMarketplace.getAuction(info.orders[i].id),
      im.contracts.erc721ListingMarketplace.getListing(info.orders[i].id),
      im.contracts.erc721OrderMarketplace.getOrder(info.orders[i].id),
      info.orders[i].category,
      info.orders[i].id
    ]))
       
    }
    console.log('result is',results);
    // // ;
    let order_listings = []
    for(let i = 0; i < results.length; i++)
    {
      for(let j = 0; j< results[i].length-2; j++)
      {
        if(results[i][j] != null){
          console.log(results[i][j], 'result of i and j');
          order_listings.push({'result' : results[i][j], 'type' : results[i][j+1], 'orderId' : results[i][j+2] })
        }
      }
    }
    console.log(order_listings, 'list of all the nfts')

    let order_listing_image = null
    let all_nft_data = []
    for(let order_listing = 0; order_listing < order_listings.length; order_listing++){
        // console.log(order_listings[order_listing],'order listing ');
        // order_listing_image.push(order_listings[order_listing])

      order_listing_image = await fetch(`${BACKEND_URL}/metadata/${order_listings[order_listing].result.tokenId}.json`).then(res => res.json());
      // console.log(order_listing_image);
      all_nft_data.push(Object.assign(order_listings[order_listing], {'tokenUri': order_listing_image}))
    }
    console.log(all_nft_data,'data after push')

    if(all_nft_data.length > 0){
      this.noNFT = false
      this.cards = all_nft_data
    }
    else{
      this.noNFT = true
    }
    this.exploreLoader = false
    await setTimeout(()=>{
      this.clickTimed()
    },500)
  },
  methods: {
    clickTimed() {
      document.getElementById("All-click").click();
    },
    myFilter(c) {
      console.log(c, "types of filter");
      var x, i;
      x = document.getElementsByClassName("itemBox");
      if (c == "All") c = "";
      // console.log(c, 'ccccccccccccccccccccccccccccccccccccccccccccccccc')
      // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
      for (i = 0; i < x.length; i++) {
        this.w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) this.w3AddClass(x[i], "show");
      }
    },

    // Show filtered elements
    w3AddClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
          element.className += " " + arr2[i];
        }
      }
    },

    // Hide elements that are not selected
    w3RemoveClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
          arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
      }
      element.className = arr1.join(" ");
    },
  },

}


</script>

<style scoped>
section + section {
  margin-top: 2rem;
}

section:last-child {
  margin-bottom: 2rem;
}

.hero-section {
  width: 100%;
  /*background-image: url(http://localhost:1337/uploads/organizers_33657ce425.jpg);*/
  background-image: url('~@/assets/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  width: 95%;
  margin: 0 auto;
}

.hero-container {
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-info {
  text-align: center;
}

.hero-title {
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
}

.hero-title span {
  color: #8575c6;
}

.hero-subtitle {
  margin-top: 1rem;
  font-size: 1rem;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.cta-btn {
  margin-top: 1.5rem;
  background: #988bc2;
  background: linear-gradient(to right, #e2c4b5, #988bc2) !important;
  border-radius: 4px;
  color: #fff;
  padding: 0.25rem 0;
  cursor: pointer;
}

.hero-image {
  margin-top: 2rem;
  max-width: 400px;
}

.hero-image img {
  width: 100%;
  height: auto;
}

.get-featured {
  margin-top: 2rem;
  text-align: center;
}

.get-featured h3 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #8575c6;
}

.get-featured img {
  margin-left: 0.3rem;
  width: 1.25rem;
  height: auto;
}

.collection-header {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e2e2;
}

.collection-title {
  font-size: 2rem;
  font-weight: bold;
}

.collection-avatar {
  width: 3rem;
}

.collection-tags {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
}

.collection-tag {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e2e2e2;
  text-align: center;
  padding: 0.15rem 0.5rem;
  cursor: pointer;
}

.collection-tag + .collection-tag {
  margin-top: 1rem;
}


.explore-tag {
  height: 2rem;
}

.collection-tag .arrow-right {
  margin-left: 0.5rem;
  color: #8575c6;
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

@media screen and (min-width: 768px) {
  .collection-tags {
    justify-content: center;
    flex-flow: row wrap;
    flex-grow: 1;
  }

  .collection-tag {
    width: initial;
    flex-direction: row;
    padding: 0.25rem 0.75rem;
  }

  .tag-avatar {
    margin-right: 0.5rem;
  }

  .collection-tag + .collection-tag {
    margin-top: 0;
    margin-left: 1rem;
  }

  .collection-tag.view-all {
    padding: 0.75rem 1rem;
  }

}

@media screen and (min-width: 992px) {
  .container {
    max-width: 1250px;
  }

  .collection-header {
    max-width: 1140px;
    width: 100%;
  }

  .hero-section {
    height: auto;
    background-size: cover;
  }

  .hero-container {
    margin-top: 5%;
    flex-direction: row;
    justify-content: space-around;
  }

  .cta-btn {
    max-width: 230px;
    margin: 0 auto;
    margin-top: 1.5rem;
  }

  .hero-image {
    margin-top: 0;
    margin-left: 2rem;
    max-width: 400px;
  }

  .get-featured {
    margin-top: 2rem;
    text-align: end;
    padding-right: 2rem;
  }

  .collection-tags {
    justify-content: flex-end;
  }

  .collection-tag {
    padding: 0.25rem 0.75rem;
  }

  .collection-body {
    max-width: 1150px;
    margin: 1.5rem auto;
  }
}

</style>
