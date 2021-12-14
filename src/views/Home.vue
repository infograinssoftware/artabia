<template>
  <div class="home">    
    <section class="hero-section mt-0a" :style="cssProps">
      <div class="container hero-container">
        <div class="hero-info">
          <h1 class="hero-title">Bringing together artists from the entire <span>MENA</span> region</h1>
          <h3 class="hero-subtitle">To Explore, Collect, & Trade NFTs</h3>
          <div class="cta-btn">
            <a href="/explore" class="text-white">Explore Marketplace</a>
          </div>
        </div>
        <div class="hero-image" id="feature_img">
          <img  v-bind:src="require('@/assets/images/hero-image.png')" alt="arrow up">
          <div class="container get-featured">
            <div class="flex justify-center">
              <figure class="flex items-center home_featured">
                <b-link href="/contact" class="home_featured_link">
                  <span class="home_featSpan">
                    Get featured on the homepage
                  </span>
                  <img :src="require('@/assets/images/icons/up-arrow-icon.png')" alt="arrow up" >
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
          <img :src="require('@/assets/images/icons/trending-icon.png')" alt="trending icon" class="collection-avatar">
          <span class="collection-title">Trending</span>
          <div class="collection-tags">
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/hourglass-icon.png')"
                alt="timed auctions icon"
                class="tag-avatar"
              >
              <span>Timed Auctions</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/infinity-icon.png')"
                alt="open for bids icon"
                class="tag-avatar"
              >
              <span>Open for bids</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/price-tag-icon.png')"
                alt="Fixed Price icon"
                class="tag-avatar"
              >
              <span>Fixed Price</span>
            </div>
          </div>
        </div>
        <div class="collection-body">
          <item-card v-for="card in cards"
                     :key="card.image"
                     :card="card"
                     leftSideTextBottom="0,1 ETH"
                     leftSideTextTop="Current bid"/>
        </div>
      </div>
    </section>
    <section class="explore-section">
      <div class="container">
        <div class="collection-header md:flex-row flex flex-col">
          <div class="flex space-x-2">
            <img :src="require('@/assets/images/icons/explore-icon.png')" alt="explore icon" class="collection-avatar">
            <span class="collection-title">Explore</span>
          </div>
          <div class="collection-tags  ">
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/tag-icon.png')"
                alt="all nfts"
                class="tag-avatar explore-tag"
              >
              <span>All NFTs</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/tag-icon.png')"
                alt="artwork"
                class="tag-avatar explore-tag"
              >
              <span>Artwork</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/tag-icon.png')"
                alt="photography"
                class="tag-avatar explore-tag"
              >
              <span>Photography</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/tag-icon.png')"
                alt="audio"
                class="tag-avatar explore-tag"
              >
              <span>Audio</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/tag-icon.png')"
                alt="video"
                class="tag-avatar explore-tag"
              >
              <span>Video</span>
            </div>
            <div class="collection-tag">
              <img
                :src="require('@/assets/images/icons/tag-icon.png')"
                alt="collectibles"
                class="tag-avatar explore-tag"
              >
              <span>Collectibles</span>
            </div>

          </div>
        </div>
        <div class="collection-body">
          <!-- <item-card v-for="card in cards"
                     :key="card.id"
                     :card="card"
                     leftSideTextBottom="0,1 ETH"
                     leftSideTextTop="Current bid"/>
        </div> -->
        <nft-cards v-for="card in cards"
                     :key="card.tokenId"
                     :card="card"
                     leftSideTextBottom = "0.1 ETH"
                     leftSideTextTop="Current Price"/>
        </div>
       
      </div>
    </section>
    <section class="top-creators-section">
      <div class="container">
        <div class="collection-header">
          <img :src="require('@/assets/images/icons/top-creators-icon.png')" alt="top-creators icon"
               class="collection-avatar">
          <span class="collection-title">Top Creators</span>
          <div class="collection-tags">
            <div class="collection-tag view-all">
              View all creators
              <font-awesome-icon :icon="['fas', 'arrow-right']" size="lg" class="arrow-right"/>
            </div>
          </div>
        </div>
        <div  v-for="user in users" :key="user.id" >
        <div class="collection-body">
             <profile-card v-for="u in user" :key="u.name" :user="u"/>
        </div>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard'
import ProfileCard from '@/components/ProfileCard'
import NftCards from '@/components/NftCards'
// import NftCards from '../components/nftCards.vue'


export default {
  components: {
    ItemCard, ProfileCard, NftCards
  },
  // pro
  //   NftCardsps: {
  //   loading: Object,
  // },
  data() {
    return {
      cards: null,
      users: null,
      feature_id : null,
      top_nft : null,
      leftSideTextB : "0.1 ETH",
      leftSideTextT: null,
      cssProps: {
        backgroundImage: ''
      }
    }
  },
  async created() {
    this.leftSideTextB = "0.1 ETH"
    // console.log(users)
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
      im.contracts.erc721AuctionMarketplace.getAuction(info.orders[i]),
      im.contracts.erc721ListingMarketplace.getListing(info.orders[i]),
      im.contracts.erc721OrderMarketplace.getOrder(info.orders[i]),
    ]))
       
    }
    console.log('result is',results);
    // // ;
    let order_listings = []
    for(let i = 0; i < results.length; i++)
    {
      for(let j = 0; j< results[i].length; j++)
      {
        if(results[i][j] != null){
          order_listings.push(results[i][j])
        }
      }
    }
    console.log(order_listings, 'list of all the nfts')

    let order_listing_image = null
    let all_nft_data = []
    for(let order_listing = 0; order_listing < order_listings.length; order_listing++){
        // console.log(order_listings[order_listing],'order listing ');
        // order_listing_image.push(order_listings[order_listing])

      order_listing_image = await fetch(`${BACKEND_URL}/metadata/${order_listings[order_listing].tokenId}.json`).then(res => res.json());
      console.log(order_listing_image);
      all_nft_data.push(Object.assign(order_listings[order_listing], {'tokenUri': order_listing_image}))
    }
    console.log(all_nft_data,'data after push')
    this.cards = all_nft_data

    // let ddf =  await fetch(`${BACKEND_URL}/metadata/${order_listings[46].tokenId}.json`).then(res => res.json());
    // console.log(ddf);

    // get all the nfts
    // const nfts_data = await fetch(`${BACKEND_URL}/nft/trending`).then(res => res.json());
    // console.log("info is",nfts_data.nfts.length, nfts_data.nfts);


    // let all_nft = [];
    // for(var j=nfts_data.nfts.length-1; j<nfts_data.nfts.length; j++){
    //     all_nft.push(await fetch(`${BACKEND_URL}/metadata/${nfts_data.nfts[j]}.json`).then(res => res.json()));
     
    // }
    // this.cards = all_nft;
    // console.log(this.cards, 'al the nfts are here');

    
    //get all the users
  try{
    const users_data = await fetch(`${BACKEND_URL}/user/top-users`).then(res => res.json());
    console.log("users is",users_data);
    let k = 0
    for( i in users_data){
      console.log(users_data[i][k], ' users');
      k++;
    }
    this.users = users_data
  }
  catch{
      console.log('no user found')
  }
    
    
  //   // let all_users;
  //   // for(var j=111; j<nfts_data.nfts.length; j++){
  //   //     all_users += 
     
  //   // }
  //   // // this.users = all_nft;
  //   // console.log(this.cards, 'al the nfts are here');



  //   // }
  //   // console.log('result is',results, results[1].tokenId, results[1].length);
  //   // ;
  //   // const feature_image = await fetch(`${BACKEND_URL}/metadata/${results[1].tokenId}.json`).then(res => res.json());
  //   // this.feature_id = feature_image.image




    try {
      const {data} = await this.axios.get(`${this.$cms}/background`);
      console.log(data, 'data');
      this.cssProps.backgroundImage = `url(${this.$cms}${data.file.url})`;

    } catch (e) {
      console.log(e)
    }


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

.home_featured_link .home_featSpan{
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

</style>
