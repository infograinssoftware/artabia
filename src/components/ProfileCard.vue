<template>
        <div v-if="user" class="card" style="width: 18rem;" tag="article">

          <a :href="`/view-user/${user.id}`" class="profileCard_Link">
              <img :src="user.coverImage? user.coverImage : defaultImg" class="card-img-top" :alt="user.name">

          <div class="card-body">
                        <img :src="user.profileImage ? user.profileImage : defaultImg" alt="" class="user-avatar">
                <h4 class="card-title">{{ user.name ? user.name : shortenAddress(user.id) }}</h4>
                <router-link to="#" class="username">
                    <span>@{{ user.username  ? user.name : shortenAddress(user.id)}}</span>
                </router-link>
                <span class="user-bio">{{ user.bio ? user.bio : 'Lorem ipsum' }}</span>
          </div>
          </a>
<!-- ----Custom card----- -->
        <template>
            <div class="footer-slot card-footer">
                <div class="followers">
                    <span>
                        {{ user.followerCount }}
                    </span>
                    Followers
                </div>
                <div class="follow-btn " @click="isFollowed ? Unfollow : follow"  >
                    {{ isFollowed ? 'Unfollow' : 'Follow'}}
                </div>
            </div>
        </template>
        </div>
</template>

<script>
    import moment from 'moment-timezone'
    export default {
        data(){
            return{
                isFollowed : null,
                defaultImg : "https://images.unsplash.com/photo-1542241647-9cbbada2b309?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
            }
        },
        name: 'ItemCard',
        props: {
            user: {
                type: Object,
                required: true
            },
        },
        computed: {
            formatedDate() {
                if (this.user.createdDate) {
                    return moment(this.card.user.createdDate).format('MMM Do, YYYY')
                }
                return ''
            },
        },
        methods: {
            shortenAddress(ethAddress) {
                return ethAddress.substring(0, 6) + '...' + ethAddress.substring(ethAddress.length - 4)
            },
            async follow(id){
                let followedUnfollowed1 =  await fetch(`https://artabia.com:3001/user/follow`, { method : "post", body : {id : id}, headers : { 
                    'Content-Type' : 'application/json',
                    Authorization : JSON.parse(localStorage.getItem('userdata')).token
                }}).then((res) => res)
                this.isFollowed = false
            },
            async Unfollow(id){
                let followedUnfollowed =  await this.axios.post(`https://artabia.com:3001/user/unfollow`, {id : id}, { headers : { 
                    'Content-Type' : 'application/json',
                    Authorization : JSON.parse(localStorage.getItem('userdata')).token
                }}).then((res) => res)
                this.isFollowed = true
            },
            async isFollowing(userId){
                let isUserFollowing = await fetch(`https://artabia.com:3001/user/is-following/${userId}`,{ headers : { 
                    'Content-Type' : 'application/json',
                    Authorization : JSON.parse(localStorage.getItem('userdata')).token
                }}).then(res => res.json())
                if(isUserFollowing.follows == true){
                    this.isFollowed = true
                }
                else{
                    this.isFollowed = false
                }
 
            }
    }   }
</script>

<style scoped>
    .profileCard_Link{
        color: inherit;
    }

    .profileCard_Link:hover{
        text-decoration: none;
    }

    .card {
        max-width: 17rem;
        box-shadow: 0px 0px 48px -13px rgba(0,0,0,0.36);
        border-radius: 11px;
    }

    .card-title {
        margin-bottom: 0.5rem;
    }

    .card-img-top {
        border-top-left-radius: 11px;
        border-top-right-radius: 11px;
        width: 270px;
        height: 160px;
    }

    .card-body {
        padding: 0 1rem 1rem;
        display: flex;
        flex-direction: column;
    }

    .user-avatar {
        border-radius: 50%;
        transform: translateY(-35%);
        border: 3px solid #fff;
        width: 50px;
        height: 50px;
        background-color: #fff;
    }

    .username {
        font-size: 0.9rem;
        text-decoration: none;
        color: #8575c6;
    }

    .user-bio {
        font-size: 0.9rem;
    }

    .footer-slot {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .followers {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0.9rem;
        color: rgb(90, 90, 90);
        font-weight: bold;
    }

    .followers span {
        font-size: 1.3rem;
        color: #000;
    }

    .follow-btn {
        padding: 0.5rem 1rem;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 20px;
    }
</style>
