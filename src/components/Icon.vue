<template>

    <router-link :to="$props.link" class="flex flex-col items-center hover:scale-110 transform transition-all group w-64">
        <img class="object-contain h-64 w-full" :src="img" :alt="title">
        <p class="commonPara text-xl font-semibold group-hover:text-primary duration-300	" style="color: #d8a7b7">{{ title }}</p>
    </router-link>

</template>

<script>
    export default {
        name: 'Icon',

        props: {
            img: String,
            title: String,
            link: String
        }
    }
</script>

<style scoped>
.commonPara:hover{
  color: #9ebc9b !important;
}


    img.object-contain p{
        color: #d8a7b7 !important;
    }
</style>
