<template>
  <section
    class="max-w-screen-xl mx-auto my-5 px-5 md:px-16 xl:px-0 space-x-10 flex"
  >
    <div class="flex-1">
      <div class="flex space-x-2 items-center mb-3 group">
        <breadcrumb link="/create-select" />
      </div>

      <div class="space-y-2 mb-5">
        <h2 class="text-3xl font-bold">Create Post</h2>
      </div>

      <div class="space-y-5">
        <upload-image @onImage="onImage" />

        <text-input :error="errorName" v-model="name" label="Name" />

        <div class="space-y-2">
          <p class="text-sm font-medium text-gray-700">Description</p>
          <textarea
            v-model="description"
            rows="6"
            class="
              p-2
              shadow-sm
              block
              w-full
              focus:outline-none
              sm:text-sm
              border border-gray-300
              rounded-md
            "
          />
          <p class="text-red-600 text-sm mt-1" v-if="errorDescription">
            {{ errorDescription }}
          </p>
        </div>

        <text-input
          :error="errorAmount"
          v-if="type == 'multiple'"
          v-model="amount"
          label="Quantity"
          placeholder="e.g 10"
        />

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Chain</label>
          <select
            @change="selectedChain"
            id="location"
            v-model="chain"
            name="location"
            class="
              mt-1
              p-2
              block
              w-full
              text-base
              border border-gray-300
              focus:outline-none
              sm:text-sm
              rounded-md
            "
          >
            <option>Ethereum</option>
            <option>Binance</option>
          </select>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700"
            >Category</label
          >
          <select
            id="location"
            v-model="category"
            name="location"
            class="
              mt-1
              p-2
              block
              w-full
              text-base
              border border-gray-300
              focus:outline-none
              sm:text-sm
              rounded-md
            "
          >
            <option selected>Artwork</option>
            <option>Photography</option>
            <option>Audio</option>
            <option>Video</option>
            <option>Collectibles</option>
          </select>
        </div>

        <div>
          <label for="" class="block text-sm font-medium text-gray-700"
            >Royality</label
          >
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              pattern="^[0-9]+$"
              type="text"
              placeholder="e.g 10%"
              v-model="royalty"
              class="
                focus:outline-none
                border
                p-2
                block
                w-full
                pr-10
                sm:text-sm
                border-gray-300
                rounded-md
              "
            />
          </div>
          <small class="text-xs text-gray-700">Maximum 30%"</small>
          <p class="text-red-600 text-sm mt-1" v-if="errorRoyality">
            {{ errorRoyality }}
          </p>
        </div>

        <!--        <text-input :error="errorRoyality" v-model="royalty" class="royaltyRef" label="Royality" placeholder="e.g 10%"-->
        <!--                    subtext="Maximum 50%"/>-->

        <div class="space-y-2">
          <div class="flex justify-between">
            <p class="font-semibold">Unlock once purchased</p>
            <div class="panel-body">
              <label class="switch">
                <input v-model="isUnlockable" type="checkbox" />
                <div class="slider round artabia-dark-color" />
              </label>
            </div>
          </div>
          <div v-if="isUnlockable">
            <textarea
              v-model="unlockable"
              rows="6"
              class="
                p-2
                shadow-sm
                block
                w-full
                focus:outline-none
                sm:text-sm
                border border-gray-300
                rounded-md
              "
              placeholder="This text will be available to the buyer of the NFT"
            />
            <p class="text-red-600 text-sm mt-1" v-if="errorUnlockable">
              {{ errorUnlockable }}
            </p>
          </div>
        </div>

        <div class="flex justify-between">
          <p class="font-semibold">Put on marketplace</p>
          <div class="panel-body">
            <label class="switch">
              <input v-model="putOnMarketplace" type="checkbox" />
              <div class="slider round artabia-dark-color" />
            </label>
          </div>
        </div>

        <div v-if="putOnMarketplace" class="space-y-5">
          <div class="grid gap-10 sm:grid-cols-3 grid-cols-1">
            <box
              :active="fixed.active"
              :img="fixed.path"
              :title="fixed.name"
              @click.native="onFocus('fixed')"
            />
            <box
              :active="limited.active"
              :img="limited.path"
              :title="limited.name"
              @click.native="onFocus('limited')"
            />
            <box
              :active="open.active"
              :img="open.path"
              :title="open.name"
              @click.native="onFocus('open')"
            />
          </div>

          <text-input
            v-if="fixed.active"
            :label="type === 'single' ? 'Price' : 'Price for batch'"
            v-model="price"
            :placeholder="'0.00' + ' ' + this.chainSelect"
            :name="this.chainSelect"
          />

          <!-- <input
           
            id="datepick"
            
            type="datetime-local"
           
            
            
          /> -->
          <input
            :value="endsAt"
            label="Ends at"
            @input="setTimestamp($event.target.value)"
            v-if="limited.active"
            type="datetime-local"
            :min="mindate"
            :max="maxdate"
            class="
              focus:outline-none
              border
              p-2
              block
              w-full
              pr-10
              sm:text-sm
              border-gray-300
              rounded-md
            "
          />

          <text-input
            v-if="type === 'multiple' && putOnMarketplace"
            label="Quantity to list"
            v-model="amountToList"
            placeholder="e.g 1"
          />
        </div>
      </div>

      <button
        class="
          py-3
          px-20
          sm:w-auto
          w-full
          rounded-md
          mt-8
          mb-10
          hover:shadow-lg
          text-white text-lg
          artabia-dark-color
        "
        @click="validate"
      >
        Post
      </button>
    </div>

    <aside class="flex-1 mt-24 space-y-2 hidden lg:block">
      <p class="font-semibold">Preview</p>
      <div class="border h-96 flex-1 flex justify-center items-center preview">
        <!--flex justify-center items-center kai to preview tha figoun otan baleis tin fwtografia -->
        <!--        <img class="h-80" v-if="imageUrl" :src="imageUrl"/>-->

        <!--        <video v-if="videoUrl" width="320" height="240" controls>-->
        <!--          <source :src="videoUrl">-->
        <!--        </video>-->

        <figure>
          <img
            v-if="ext === 'img'"
            class="h-80 object-scale-down"
            :src="url"
            alt="name"
          />
        </figure>

        <figure
          v-if="ext === 'audio'"
          class="bg-audio h-80 bg-cover flex items-end justify-center py-3"
        >
          <audio controls>
            <source :src="url" type="audio/ogg" />
          </audio>
        </figure>

        <figure v-if="ext === 'model3d'">
          <model-gltf :src="url"></model-gltf>
        </figure>

        <video v-if="ext === 'video'" class="h-80" controls>
          <source :src="url" />
        </video>

        <!--        <p v-if="!imageUrl" class="font-bold text- 3xl">Preview</p>-->
      </div>
    </aside>
    <!-- <sweet-modal icon="success" v-if="mintSuccess">
	        Minted Successfully !  
    </sweet-modal> -->
  </section>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import UploadImage from "@/components/UploadImage";
import Box from "@/components/Box";
import TextInput from "@/components/TextInput";
import { ModelGltf } from "/src/assets/plugin/vue-model";
// import SweetModal from ""
// import Moralis from 'moralis/types';
import Swal from "sweetalert2";

export default {
  name: "Create",
  components: { TextInput, Box, UploadImage, Breadcrumb, ModelGltf, Swal },
  data() {
    return {
      mindate: null,
      maxdate: null,
      fixed: {
        path: "/img/fixed-price.png",
        name: "Fixed price",
        active: false,
      },
      limited: {
        path: "/img/limited-auction.png",
        name: "Limited-auction",
        active: false,
      },
      open: {
        path: "/img/open-bids.png",
        name: "Open for bids",
        active: false,
      },
      type: "",
      putOnMarketplace: true,
      name: "",
      description: "",
      category: "Artwork",
      royalty: "",
      isUnlockable: false,
      unlockable: "",
      image: {},
      url: null,
      amount: "",
      endsAt: "",
      price: "",
      chain: "Ethereum",
      mintSuccess: true,
      chainSelect: this.chain == "Ethereum" ? "ETH" : "BSC",
      ext: null,
      extensions: {
        img: ["jpg", "png", "gif", "svg", "webp"],
        audio: ["mp3"],
        video: ["mp4", "wav", "ogg"],
        model3d: ["glb", "gltf"],
      },
      amountToList: "",
      userBalance: 0.0,
      user: null,
    };
  },

  created() {
    this.chainSelect = this.chain == "Ethereum" ? "ETH" : "BSC";
    this.type = this.$route.query.type;
    if (this.type !== "single" && this.type !== "multiple")
      this.$router.push("/");
    this.addMonths(new Date(), 6);
    this.addHour(new Date(), 1);
  },

  computed: {
    errorName() {
      return !this.name ? "* Required" : "";
    },
    errorAmount() {
      return !this.amount ? "* Required" : "";
    },
    errorRoyality(e) {
      if (!/^[0-9%]+$/i.test(this.royalty) || this.royalty > 30) {
        this.royalty = "";
      }

      return !this.royalty ? "* Required" : "";
    },
    errorUnlockable() {
      return !this.unlockable ? "* Required" : "";
    },
    errorDescription() {
      return !this.description ? "* Required" : "";
    },
  },

  methods: {
    showSuccss() {
      let timerInterval;
      Swal.fire({
        title: "Minted Successfully",
        html: "closing in <b></b> milliseconds.",
        timer: 2000,
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
    async loginUser() {
      let userAddress = await im.connect("rinkeby");
      let userdata = await window.login({ im: im, account: userAddress });
      if (userdata.code) {
        alert(userdata.message, "Please sign transaction before mint");
      } else {
        this.user = userdata;
        console.log(
          this.user,
          "this is the userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr "
        );
        userdata = JSON.stringify(userdata);
        console.log(userdata, "after login");
        localStorage.setItem("userdata", userdata);
        let bbl = await im.web3.eth.getBalance(userAddress);
        console.log(bbl, "bbl");
        this.userBalance = await im.web3.utils
          .fromWei(bbl, "ether")
          .slice(0, 6);
        // this.submit();
        window.location.reload();
      }
    },
    selectedChain() {
      this.chainSelect = this.chain == "Ethereum" ? "ETH" : "BSC";
      console.log(this.chain, this.chainSelect, "this is the chain");
    },
    setTimestamp(date) {
      this.endsAt = date;
      const datum = Date.parse(date);
      console.log(datum, "fdfd");
      this.backendDate = datum / 1000;
      return datum / 1000;
    },

    onImage(e) {
      this.image = this.src = e;
      console.log(
        this.image,
        "sdfsd",
        this.src.name,
        this.src.name.split(".").pop()
      );
      let ext = this.src.name.split(".").pop();
      console.log(ext, 'after extensionsdfdfffffffffffffffffffffffffffffffffffffffffffff')
      for (const property in this.extensions) {

        this.extensions[property].includes(ext) ? (ext = property) : "glb";
      }

      this.ext = ext;
      // this.image.type = 'model3d'
      console.log(this.ext,this.image, this.image.type, " is the xetendssion", this.src);
      this.url = window.URL.createObjectURL(this.src);
      console.log(this.url, "url after compress");
    },

    onFocus(value) {
      this.fixed.active = false;
      this.limited.active = false;
      this.open.active = false;
      this[value].active = true;
      console.log(this[value].active, this.limited.active, "good");
    },
    validate() {
      console.log("submittion");
      if (
        this.name &&
        (this.type == "single" || this.amount) &&
        this.royalty &&
        (!this.isUnlockable || this.unlockable) &&
        this.description &&
        !!this.image.name &&
        (!this.fixed.active || this.price) &&
        (!this.limited.active || this.backendDate) &&
        (this.putOnMarketplace
          ? this.fixed.active || this.limited.active || this.open.active
          : true)
      ) {
        let userData = JSON.parse(localStorage.getItem("userdata"));
        console.log(userData, "user data is given here");
        if (userData == null) {
          console.log("user not logged-in on site");
          this.loginUser();
        } else {
          console.log("user is logged-in on site");
          this.submit();
        }
      }
    },
    addMonths(date1, months) {
      date1.setMonth(date1.getMonth() + months);
      console.log(date1, "date1 after adding months");
      const str1 = `${date1.getFullYear()}-${(
        "0" +
        (date1.getMonth() + 1)
      ).slice(-2)}-${("0" + date1.getDate()).slice(-2)}T${(
        "0" + date1.getHours()
      ).slice(-2)}:${("0" + date1.getMinutes()).slice(-2)}`;
      console.log(str1);
      this.maxdate = str1;
    },
    addHour(date, hrs) {
      date.setHours(date.getHours() + hrs);
      console.log(date, "date after adding hr");
      const str2 = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
        -2
      )}-${("0" + date.getDate()).slice(-2)}T${("0" + date.getHours()).slice(
        -2
      )}:${("0" + date.getMinutes()).slice(-2)}`;
      console.log(str2);
      this.mindate = str2;
    },

    async submit() {
      const loader = this.$loading.show({
        container: null,
        canCancel: false,
      });

      await im.connect(
        this.chain == "Ethereum" ? "rinkeby" : "binance testnet"
      );

      const id = await im.web3.utils.randomHex(32);
      console.log("this is the id ", id, BACKEND_URL);
      const dd = await this.axios.post(`${BACKEND_URL}/nft/create`, {
        id,
        chain: this.chain,
        name: this.name,
        description: this.description,
        category: this.category,
        unlockable: this.isUnlockable ? this.unlockable : "",
        imageType: this.image.type,
      });
      console.log("this is the id ", id, BACKEND_URL, dd);
      console.log(this.image.type, "image type1", dd);
      console.log(this.image.type, "image type2");
      const formData = new FormData();

      formData.append("image", this.image);

      await this.axios.post(`${BACKEND_URL}/nft/create_image/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // const object = {
      //       description : this.description,
      //       name : this.name,
      //       external_url : `https://gateway.pinata.cloud/ipfs/Qma6ffyehCD44siZQPo7EKNDNRxFcpu5fK1uwqFUUp7DD5/${id}.${this.src.name.split(".").pop()}`,
      //       image : `https://gateway.pinata.cloud/ipfs/Qma6ffyehCD44siZQPo7EKNDNRxFcpu5fK1uwqFUUp7DD5/${id}.${this.src.name.split(".").pop()}`
      //     };
      // const ipfs_metadata = await this.axios.post(`https://deep-index.moralis.io/api/v2/ipfs/uploadFolder`,
      // [{"path": "/", "content": `{ description : this.description, name : this.name, external_url : "https://gateway.pinata.cloud/ipfs/Qma6ffyehCD44siZQPo7EKNDNRxFcpu5fK1uwqFUUp7DD5/${id}.${this.src.name.split(".").pop()}, image : "https://gateway.pinata.cloud/ipfs/Qma6ffyehCD44siZQPo7EKNDNRxFcpu5fK1uwqFUUp7DD5/${id}.${this.src.name.split(".").pop()}"  }`}],
      // {headers: {'accept': 'application/json', 'Content-Type' : 'application/json', 'X-API-Key' : 'ZHN8qjyo8FCtP3B9ojdCwS7pj6uiYzSaGwbUU436QyS9vP2fige8WR0ltwXSPImJ'}})
      // console.log(ipfs_metadata,' ipfs metadata is here')

      const object = {
        description: this.description,
        name: this.name,
        external_url: `${BACKEND_URL}/image/${id}.${this.src.name
          .split(".")
          .pop()}`,
        image: `${BACKEND_URL}/image/${id}.${this.src.name.split(".").pop()}`,
      };

      // const imageNFT =  new Moralis.File(this.image.name, this.image)
      // await imageNFT.saveIPFS();
      // console.log(imageNFT.hash(), 'sdfsd', imageNFT.ipfs());

      // const file = new Moralis.File("file.json", {
      //   base64: btoa(JSON.stringify(object)),
      // });
      // await file.saveIPFS({useMasterKey:true});

      const royalty = parseInt(this.royalty) || 0;

      let orderId = "";
      let contract = "";
      try {
        if (this.type == "single") {
          if (!this.putOnMarketplace) {
            await window.im.contracts.artabiaErc721.mint(id, royalty);
          } else if (this.fixed.active) {
            console.log("waiting for the order id");
            orderId =
              await window.im.contracts.artabiaErc721.mintAndCreateOrder(
                id,
                royalty,
                this.price
              );
            console.log("waiting for the ordre id", orderId);
            contract = "erc721OrderMarketplace";
          } else if (this.open.active) {
            orderId =
              await window.im.contracts.artabiaErc721.mintAndCreateListing(
                id,
                royalty
              );
            contract = "erc721ListingMarketplace";
          } else if (this.limited.active) {
            orderId =
              await window.im.contracts.artabiaErc721.mintAndCreateAuction(
                id,
                royalty,
                this.backendDate
              );
            contract = "erc721AuctionMarketplace";
          }
        } else {
          if (!this.putOnMarketplace) {
            await window.im.contracts.artabiaErc1155.mint(
              id,
              this.amount,
              royalty
            );
          } else if (this.fixed.active) {
            orderId =
              await window.im.contracts.artabiaErc1155.mintAndCreateOrder(
                id,
                this.amount,
                this.amountToList,
                royalty,
                this.price
              );
            contract = "erc1155OrderMarketplace";
          } else if (this.open.active) {
            orderId =
              await window.im.contracts.artabiaErc1155.mintAndCreateListing(
                id,
                this.amount,
                this.amountToList,
                royalty
              );
            contract = "erc1155ListingMarketplace";
          } else if (this.limited.active) {
            orderId =
              await window.im.contracts.artabiaErc1155.mintAndCreateAuction(
                id,
                this.amount,
                this.amountToList,
                royalty,
                this.backendDate
              );
            contract = "erc1155AuctionMarketplace";
          }
        }

        loader.hide();
        this.showSuccss();
        if (orderId) {
          await this.axios.post(`${BACKEND_URL}/order/create`, {
            chain: this.chain,
            id: orderId,
            category: this.category,
            unlockable: this.isUnlockable ? this.unlockable : "",
            contract,
            royalty,
          });
          console.log("axios metadata");

          // const metadata = await fetch(`${BACKEND_URL}/metadata/${orderId}.json`).then(res => res.json())
          // console.log('metadata is here with id', metadata)

          this.$router.push(
            `/view-order/${this.chain.toLowerCase()}/${orderId}`
          );
        } else alert("Created: " + id);
      } catch (error) {
        loader.hide();
        console.log("ordere is dwaiting");
        alert("Error: " + error.message);
      }
    },
  },
};
</script>
<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: rgb(44, 44, 44);
}

input:focus + .slider {
  box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
