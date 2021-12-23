<template>
    <transition name="fade">
        <div v-if="isOpen" class="search-results">
            <div v-if="results.nfts" class="result-category">
                <span class="result-category-title">NFTs</span>
                <div class="justify-content-end d-flex ">
                    <h6 class="text-center text-white no-nft-foundtxt" v-if="results.nfts.length < 1">No NFT Found</h6>
                </div>
                
                <div
                    v-for="item in results.nfts"
                    :key="item.id"
                    @click="emitClick"
                >
                    
                    <router-link to="/" class="result-item">
                        <div class="result-avatar">
                            <img src="data:image/jpeg;base64,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" alt="avatar">
                        </div>
                        <div class="result-info-container">
                            <span class="result-title">
                                {{ item.name }}
                            </span>
                        </div>
                    </router-link>
                </div>
            </div>
            <div v-if="results.users" class="result-category">
                <span class="result-category-title">Users</span>
                <div class="justify-content-end d-flex ">
                    <h6 class="text-end text-white no-user-foundtxt" v-if="results.users.length < 1">No User Found</h6>
                </div>
                <div
                    v-for="user in results.users"
                    :key="user.id"
                    @click="emitClick"
                >
                    <router-link to="/" class="result-item">
                        <div class="result-avatar">
                            <img :src="user.profileImage ? user.profileImage : '/img/Default_Profile_Picture.40401ee9.png'" alt="avatar">
                        </div>
                        <div class="result-info-container">
                            <span class="result-title">
                                {{ user.name }}
                            </span>
                            <span class="result-info">
                                {{ user.followers }}
                            </span>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'SearchResultsDropdown',
        props: {
            results: {
                type: Object,
                required: true
            },
            isOpen: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            emitClick() {
                this.$emit('clicked')
            }
        }
    }
</script>

<style scoped>
.search-results {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-radius: 4px;
}

.result-category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;
}

.result-category-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    align-self: flex-start;
}

.result-category .no-nft-foundtxt{
    color: grey !important;
    font-size: 15px;
}

.result-category .no-user-foundtxt{
    color: grey !important;
    font-size: 15px;
}

.result-item {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    text-decoration: none;
}

.result-avatar {
    width: 25px;
    height: 25px;
}

.result-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.result-info-container {
    margin-left: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.result-title {
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
}

.result-info {
    font-size: 0.9rem;
    color: rgb(156, 156, 156);
}

.all-results {
    display: block;
    margin: 0 auto;
    line-height: 2.5rem;
    width: 90%;
    background-color: #242424;
    color: #fff;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media screen and (min-width: 992px) {
    .search-results {
        background: #2f3030;
        width: 100%;
        max-width: 600px;
        position: absolute;
        z-index: 1;
        padding: 1rem;
        top: 100%;
        left: 0;
        transform: translateX(1%);
    }
}
</style>
