<template>
  <div class="home">
    <section class="hero-section mt-0a" :style="cssProps">
      <div class="container hero-container">
        <div class="hero-info">
          <h1 class="hero-title">
            Bringing together artists from the entire <span>MENA</span> region
          </h1>
          <h3 class="hero-subtitle">To Explore, Collect, & Trade NFTs</h3>
          <div class="cta-btn">
            <a href="/explore" class="text-white">Explore Marketplace</a>
          </div>
        </div>
        <div class="hero-image" id="feature_img">
          <img
            v-bind:src="require('@/assets/images/hero-image.png')"
            alt="arrow up"
          />
          <div class="container get-featured">
            <div class="flex justify-center">
              <figure class="flex items-center home_featured">
                <b-link href="/contact" class="home_featured_link">
                  <span class="home_featSpan">
                    Get featured on the homepage
                  </span>
                  <img
                    :src="require('@/assets/images/icons/up-arrow-icon.png')"
                    alt="arrow up"
                  />
                </b-link>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="trending-section">
      <div class="container">
        <div class="collection-header flex-col md:flex-row">
          <img
            :src="require('@/assets/images/icons/trending-icon.png')"
            alt="trending icon"
            class="collection-avatar"
          />
          <span class="collection-title">Trending</span>
          <div class="collection-tags">
            <button
              id="Timed-click"
              v-on:click="trendingFilter('Timed')"
              class="btn"
            >
              <div class="collection-tag">
                <img
                  :src="require('@/assets/images/icons/hourglass-icon.png')"
                  alt="timed auctions icon"
                  class="tag-avatar"
                />
                <span>Timed Auctions</span>
              </div>
            </button>
            <button v-on:click="trendingFilter('Open_bids')" class="btn">
              <div class="collection-tag">
                <img
                  :src="require('@/assets/images/icons/infinity-icon.png')"
                  alt="open for bids icon"
                  class="tag-avatar"
                />
                <span>Open for bids</span>
              </div>
            </button>
            <button id="Fixed-click" v-on:click="trendingFilter('Fixed')" class="btn">
              <div class="collection-tag">
                <img
                  :src="require('@/assets/images/icons/price-tag-icon.png')"
                  alt="Fixed Price icon"
                  class="tag-avatar"
                />
                <span>Fixed Price</span>
              </div>
            </button>
          </div>
        </div>
        <div class="collection-body">
          <nft-cards
            v-for="card1 in Tcards"
            :key="card1.tokenId"
            :card="card1"
            leftSideTextBottom="0.1 ETH"
            leftSideTextTop="Current Price"
          />
          <div
            style="display: flex; justify-content: center; align-item: center"
          >
            <Spinner v-if="!trendingLoader" name="ripple" color="#8c65d3" />
          </div>
        </div>
      </div>
    </section>
    <section class="explore-section">
      <div class="container">
        <div class="collection-header md:flex-row flex flex-col">
          <div class="flex space-x-2">
            <img
              :src="require('@/assets/images/icons/explore-icon.png')"
              alt="explore icon"
              class="collection-avatar"
            />
            <span class="collection-title">Explore</span>
          </div>
          <div class="collection-tags">
            <a href="/explore" class="text-dark text-decoration-none">
              <div class="collection-tag">
                <img
                  :src="require('@/assets/images/bg-pattern.png')"
                  alt="Fixed Price icon"
                  class="tag-avatar h-6"
                />
                <span>All NFTs</span>
              </div>
            </a>
            <button id="Artwork" v-on:click="exploreFilter('Artwork')" class="btn">
              <div class="collection-tag">
                <img
                  :src="require('@/assets/images/bg-pattern.png')"
                  alt="Fixed Price icon"
                  class="tag-avatar h-6"
                />
                <span>Artwork</span>
              </div>
            </button>
            <button v-on:click="exploreFilter('Photography')" class="btn">
              <div class="collection-tag">
                <img
                  :src="require('@/assets/images/bg-pattern.png')"
                  alt="Fixed Price icon"
                  class="tag-avatar h-6"
                />
                <span>Photography</span>
              </div>
            </button>
            <button v-on:click="exploreFilter('Audio')" class="btn">
              <div class="collection-tag">
                <img
                  :src="require('@/assets/images/bg-pattern.png')"
                  alt="Fixed Price icon"
                  class="tag-avatar h-6"
                />
                <span>Audio</span>
              </div>
            </button>
            <button v-on:click="exploreFilter('Video')" class="btn">
              <div class="collection-tag">
                <img
                  :src="require('@/assets/images/bg-pattern.png')"
                  alt="Fixed Price icon"
                  class="tag-avatar h-6"
                />
                <span>Video</span>
              </div>
            </button>
            <button v-on:click="exploreFilter('Collectibles')" class="btn">
              <div class="collection-tag">
                <img
                  :src="require('@/assets/images/bg-pattern.png')"
                  alt="Fixed Price icon"
                  class="tag-avatar h-6"
                />
                <span>Collectibles</span>
              </div>
            </button>
          </div>
        </div>
        <div class="collection-body">
         <explore-nft v-for="card in cards"
                     :key="card.tokenId"
                     :card="card"
                     leftSideTextBottom = "0.1 ETH"
                     leftSideTextTop="Current Price"/>
          <div
            style="display: flex; justify-content: center; align-item: center"
          >
            <Spinner v-if="!exploreLoader" name="ripple" color="#8c65d3" />
          </div>
        </div>
      </div>
    </section>
    <section class="top-creators-section">
      <div class="container">
        <div class="collection-header">
          <img
            :src="require('@/assets/images/icons/top-creators-icon.png')"
            alt="top-creators icon"
            class="collection-avatar"
          />
          <span class="collection-title">Top Creators</span>
          <div class="collection-tags">
          </div>
        </div>
        <div>
          <div
            style="display: flex; justify-content: center; align-item: center"
          >
            <Spinner v-if="!userLoader" name="ripple" color="#8c65d3" />
            <div v-for="user in users" :key="user.id">
              <div class="collection-body">
                <profile-card v-for="u in user" :key="u.name" :user="u" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ItemCard from "@/components/ItemCard";
import ProfileCard from "@/components/ProfileCard";
import NftCards from "@/components/NftCards";
import Spinner from "vue-spinkit";
import ExploreNft from "@/components/ExploreNft";

export default {
  components: {
    ItemCard,
    ProfileCard,
    NftCards,
    Spinner,
    ExploreNft
  },
  data() {
    return {
      cards: null,
      Tcards : null,
      users: null,
      feature_id: null,
      top_nft: null,
      trendingLoader: false,
      exploreLoader: false,
      userLoader: false,
      leftSideTextB: "0.1 ETH",
      leftSideTextT: null,
      cssProps: {
        backgroundImage: "",
      },
    };
  },
  async created() {

    this.leftSideTextB = "0.1 ETH";
    const aChain = ["rinkeby"];
    let connect_status;
    const user = JSON.parse(localStorage.getItem("userdata"));
    if (window.ethereum.selectedAddress === null) {
      localStorage.removeItem("userdata");
      connect_status = await im.connect(
        aChain,
        ethereumNode,
        "0x0000000000000000000000000000000000000000"
      );
    }
    if (!user) {
      connect_status = await im.connect(
        aChain,
        ethereumNode,
        "0x0000000000000000000000000000000000000000"
      );
    } else {
      connect_status = await im.connect(aChain);
    }
    this.im = im;

    //Fetching api data

    const trendingData = await fetch(`${BACKEND_URL}/order/trending`).then((res) =>
      res.json()
    );
    console.log(trendingData, 'trending')
    let Tresults = [];
    for (var p = 0; p < 12; p++) {
      Tresults.push(
        await Promise.all([
          im.contracts.erc721AuctionMarketplace.getAuction(trendingData.orders[p].id),
          im.contracts.erc721ListingMarketplace.getListing(trendingData.orders[p].id),
          im.contracts.erc721OrderMarketplace.getOrder(trendingData.orders[p].id),
          trendingData.orders[p].category,
          trendingData.orders[p].id,
        ])
      );
    }
    console.log(Tresults, 'trending3')
    let Torder_listings = [];
    for (let q = 0; q < Tresults.length; q++) {
      for (let r = 0; r < Tresults[q].length - 2; r++) {
        if (Tresults[q][r] != null) {
          Torder_listings.push({
            result: Tresults[q][r],
            type: Tresults[q][r + 1],
            orderId: Tresults[q][r + 2],
          });
        }
      }
    }
    console.log(Torder_listings, 'Torder_listings')
    let Torder_listing_image = null;
    let Tall_nft_data = [];
    for(let Torder_listing = 0; Torder_listing < Torder_listings.length; Torder_listing++) {
      Torder_listing_image = await fetch(
        `${BACKEND_URL}/metadata/${Torder_listings[Torder_listing].result.tokenId}.json`
      ).then((res) => res.json());
      Tall_nft_data.push(
        Object.assign(Torder_listings[Torder_listing], {
          tokenUri: Torder_listing_image,
        })
      );
    }
    console.log('got the Tcards', Tall_nft_data)
    this.Tcards = Tall_nft_data;
    this.trendingLoader = true;
    await this.trendingClick();
    // Fetching the Explore data
    console.log('sdfdsfsdfdsfdsf');
    const info = await fetch(`${BACKEND_URL}/order/explore`).then((res) =>
      res.json()
    );
    console.log(info, 'info')
    let results = [];
    for (var i = 0; i < 12; i++) {
      results.push(
        await Promise.all([
          im.contracts.erc721AuctionMarketplace.getAuction(info.orders[i].id),
          im.contracts.erc721ListingMarketplace.getListing(info.orders[i].id),
          im.contracts.erc721OrderMarketplace.getOrder(info.orders[i].id),
          info.orders[i].category,
          info.orders[i].id,
        ])
      );
    }
    let order_listings = [];
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < results[i].length - 2; j++) {
        if (results[i][j] != null) {
          order_listings.push({
            result: results[i][j],
            type: results[i][j + 1],
            orderId: results[i][j + 2],
          });
        }
      }
    }
    console.log(order_listings, 'info')
    let order_listing_image = null;
    let all_nft_data = [];
    for (
      let order_listing = 0;
      order_listing < order_listings.length;
      order_listing++
    ) {
      order_listing_image = await fetch(
        `${BACKEND_URL}/metadata/${order_listings[order_listing].result.tokenId}.json`
      ).then((res) => res.json());
      all_nft_data.push(
        Object.assign(order_listings[order_listing], {
          tokenUri: order_listing_image,
        })
      );
    }
    console.log(all_nft_data, 'all_nft_data');
    this.cards = all_nft_data;
    this.exploreLoader = true;

    //get all the users
    await this.getUsers();
    await this.exploreClick();

    await this.getBackgroundpic();
  },
  methods: {
    trendingClick() {
      console.log('Timed-click');
      document.getElementById("Fixed-click").click();
    },
    exploreClick() {
      document.getElementById("Artwork").click();
    },
    exploreFilter(c) {
      let x, i;
      x = document.getElementsByClassName("itemBox");
      
      for (i = 0; i < x.length; i++) {
        this.w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) this.w3AddClass(x[i], "show");
      }
    },
    trendingFilter(c) {
      console.log(c, 'sdfdsfds')
      let x, i;
      x = document.getElementsByClassName("TitemBox");
      console.log(x,)
      for (i = 0; i < x.length; i++) {
        this.w3RemoveClass(x[i], "show");
        console.log(x[i].className.indexOf(c), 'log')
        if (x[i].className.indexOf(c) > -1) this.w3AddClass(x[i], "show");
      }
    },
    async getUsers(){
    try {
      const users_data = await fetch(`${BACKEND_URL}/user/top-users`).then(
        (res) => res.json()
      );
      this.users = users_data;
      console.log(this.users, 'users dataaaaaaaaaaaaa')
    } catch {
      console.log("no user found");
    }
    this.userLoader = true;
    },
    async getBackgroundpic(){
      try {
      const { data } = await this.axios.get(`${this.$cms}/background`);
      console.log(data, "data");
      this.cssProps.backgroundImage = `url(${this.$cms}${data.file.url})`;
    } catch (e) {
      console.log(e);
    }
    },

    // Show filtered elements
    w3AddClass(element, name) {
      let i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      console.log('arr2', arr2.length, arr2)
      for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
          element.className += " " + arr2[i];
        }
      }
    },

    // Hide elements that are not selected
    w3RemoveClass(element, name) {
      let i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      console.log(arr1, arr2, i);
      for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
          arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
      }
      console.log(arr1);
      element.className = arr1.join(" ");
    },
  },
};
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
  background-image: url("~@/assets/images/hero-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  width: 50%;
  margin: 0px auto;
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

.tag-avatar {
  height: 2.5rem;
  width: auto;
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

.home_featured .home_featured_link {
  color: #8575c6 !important;
  text-decoration: none !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home_featured_link .home_featSpan {
  text-align: left;
  font-weight: bold;
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
    /* height: auto; */
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

.exploreAllNft_href {
  text-decoration: none;
  color: inherit;
  margin-right: 15px;
}

.show {
  display: block;
}
</style>
