(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71b54450"],{"0dc0":function(e,a,t){"use strict";t("2d63")},"2d63":function(e,a,t){},"60f2":function(e,a,t){"use strict";t("8b7e")},"8b7e":function(e,a,t){},fb5e:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"profile-route"},[t("h1",{staticClass:"route-title"},[e._v("Edit Profile")]),t("div",{staticClass:"container"},[t("form",{staticClass:"profile-form",attrs:{enctype:"multipart/form-data"},on:{submit:function(a){return a.preventDefault(),e.saveProfile.apply(null,arguments)}}},[t("div",{staticClass:"image-uploads"},[t("h3",[e._v("Upload a profile image")]),t("div",{staticClass:"img-upload"},[e._m(0),t("image-upload",{attrs:{"image-url":e.userProPhoto(),Prouser:e.userProPhoto()},on:{"update-image":function(a){return e.profileImageChanged(a)}},model:{value:e.user.profileImage,callback:function(a){e.$set(e.user,"profileImage",a)},expression:"user.profileImage"}})],1),t("h3",{staticClass:"mt-5"},[e._v("Upload a cover image")]),t("div",{staticClass:"img-upload"},[e._m(1),t("image-upload",{attrs:{"image-url":e.userCoverPhoto(),Prouser:e.userCoverPhoto()},on:{"update-image":function(a){return e.coverImageChanged(a)}},model:{value:e.user.coverImage,callback:function(a){e.$set(e.user,"coverImage",a)},expression:"user.coverImage"}})],1)]),t("div",{staticClass:"personal-details"},[t("h3",[e._v("Personal Details")]),t("div",{staticClass:"detail-inputs"},[t("div",{staticClass:"form-group"},[t("div",{staticClass:"input-label",class:{show:e.user.name}},[e._v("Name")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.name,expression:"user.name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Name"},domProps:{value:e.user.name},on:{input:function(a){a.target.composing||e.$set(e.user,"name",a.target.value)}}})]),t("div",{staticClass:"username-input"},[t("div",{staticClass:"username-icon-container"},[t("font-awesome-icon",{attrs:{icon:["fas","at"]}})],1),t("div",{staticClass:"form-group username"},[t("div",{staticClass:"input-label",class:{show:e.user.username}},[e._v(" Username ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.username,expression:"user.username"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Username"},domProps:{value:e.user.username},on:{input:[function(a){a.target.composing||e.$set(e.user,"username",a.target.value)},e.checkUsernameAvailability]}})])]),!1===e.usernameExists?t("small",{staticClass:"username-available"},[e._v("Username "+e._s(e.user.username)+" is available")]):!0===e.usernameExists?t("small",{staticClass:"username-taken"},[e._v("Username "+e._s(e.user.username)+" already in use")]):e._e(),t("div",{staticClass:"form-group email"},[t("div",{staticClass:"input-label"},[e._v("Email")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.email,expression:"user.email"}],staticClass:"form-control",attrs:{type:"email",placeholder:"Email"},domProps:{value:e.user.email},on:{input:function(a){a.target.composing||e.$set(e.user,"email",a.target.value)}}})])])]),t("div",{staticClass:"bio-section"},[t("h3",[e._v("Add a short bio")]),t("div",{staticClass:"bio-group"},[t("div",{staticClass:"form-group bio"},[t("div",{staticClass:"input-label",class:{show:e.user.bio}},[e._v(" Enter a short bio ")]),t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.user.bio,expression:"user.bio"}],staticClass:"form-control bio",attrs:{placeholder:"Enter a short bio",maxlength:"200"},domProps:{value:e.user.bio},on:{input:[function(a){a.target.composing||e.$set(e.user,"bio",a.target.value)},e.getBioLength]}})]),t("small",{staticClass:"bio-length"},[e._v(" "+e._s(e.getBioLength())+"/200 ")])])]),t("div",{staticClass:"social-links"},[t("h3",{staticClass:"social-links-title"},[e._v(" Add links to your social media profiles ")]),t("div",{staticClass:"form-group social-link"},[t("div",{staticClass:"social-label-container"},[t("span",{staticClass:"social-label"},[t("font-awesome-icon",{attrs:{icon:["fas","globe"]}}),t("span",[e._v(" Website ")])],1),t("span",{staticClass:"input-prepend"},[e._v(" https:// ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.social.website,expression:"user.social.website"}],staticClass:"form-control social",attrs:{type:"text",placeholder:"Website URL"},domProps:{value:e.user.social.website},on:{input:function(a){a.target.composing||e.$set(e.user.social,"website",a.target.value)}}})]),t("div",{staticClass:"form-group social-link"},[t("div",{staticClass:"social-label-container"},[t("span",{staticClass:"social-label"},[t("font-awesome-icon",{attrs:{icon:["fab","discord"]}}),t("span",[e._v(" Discord ")])],1)]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.social.discord,expression:"user.social.discord"}],staticClass:"form-control social",attrs:{type:"text",placeholder:"Discord Username"},domProps:{value:e.user.social.discord},on:{input:function(a){a.target.composing||e.$set(e.user.social,"discord",a.target.value)}}})]),t("div",{staticClass:"form-group social-link"},[t("div",{staticClass:"social-label-container"},[t("span",{staticClass:"social-label"},[t("font-awesome-icon",{attrs:{icon:["fab","youtube"]}}),t("span",[e._v(" Youtube ")])],1)]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.social.youtube,expression:"user.social.youtube"}],staticClass:"form-control social",attrs:{type:"text",placeholder:"Channel URL"},domProps:{value:e.user.social.youtube},on:{input:function(a){a.target.composing||e.$set(e.user.social,"youtube",a.target.value)}}})]),t("div",{staticClass:"form-group social-link"},[t("div",{staticClass:"social-label-container"},[t("span",{staticClass:"social-label"},[t("font-awesome-icon",{attrs:{icon:["fab","facebook"]}}),t("span",[e._v(" Facebook ")])],1),t("span",{staticClass:"input-prepend"},[e._v(" facebook.com/ ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.social.facebook,expression:"user.social.facebook"}],staticClass:"form-control social",attrs:{type:"text",placeholder:"Enter facebook url"},domProps:{value:e.user.social.facebook},on:{input:function(a){a.target.composing||e.$set(e.user.social,"facebook",a.target.value)}}})]),t("div",{staticClass:"form-group social-link"},[t("div",{staticClass:"social-label-container"},[t("span",{staticClass:"social-label"},[t("font-awesome-icon",{attrs:{icon:["fab","twitch"]}}),t("span",[e._v(" Twitch ")])],1),t("span",{staticClass:"input-prepend"},[e._v(" twitch.tv/ ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.social.twitch,expression:"user.social.twitch"}],staticClass:"form-control social",attrs:{type:"text",placeholder:"Twitch Username"},domProps:{value:e.user.social.twitch},on:{input:function(a){a.target.composing||e.$set(e.user.social,"twitch",a.target.value)}}})]),t("div",{staticClass:"form-group social-link"},[t("div",{staticClass:"social-label-container"},[t("span",{staticClass:"social-label"},[t("font-awesome-icon",{attrs:{icon:["fab","tiktok"]}}),t("span",[e._v("TikTok")])],1),t("span",{staticClass:"input-prepend"},[e._v(" tiktok.com/ ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.social.tiktok,expression:"user.social.tiktok"}],staticClass:"form-control social",attrs:{type:"text",placeholder:"TikTok Username"},domProps:{value:e.user.social.tiktok},on:{input:function(a){a.target.composing||e.$set(e.user.social,"tiktok",a.target.value)}}})]),t("div",{staticClass:"form-group social-link"},[t("div",{staticClass:"social-label-container"},[t("span",{staticClass:"social-label"},[t("font-awesome-icon",{attrs:{icon:["fab","snapchat-ghost"]}}),t("span",[e._v("Snapchat")])],1)]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.user.social.snapchat,expression:"user.social.snapchat"}],staticClass:"form-control social",attrs:{type:"text",placeholder:"Snapchat Username"},domProps:{value:e.user.social.snapchat},on:{input:function(a){a.target.composing||e.$set(e.user.social,"snapchat",a.target.value)}}})])]),t("button",{staticClass:"submit",attrs:{type:"submit"}},[e._v("Save Changes")])])])])},o=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"image-upload-description"},[e._v(" Recommended size: "),t("br"),e._v(" 1000px x 1000px "),t("br"),e._v(" JPG, PNG or GIF. "),t("br"),e._v(" 10MB max size ")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"image-upload-description"},[e._v(" Recommended size: "),t("br"),e._v(" 1500px x 1500px "),t("br"),e._v(" JPG, PNG or GIF. "),t("br"),e._v(" 10MB max size ")])}],r=t("1da1");function i(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,s=new Array(a);t<a;t++)s[t]=e[t];return s}function n(e){if(Array.isArray(e))return i(e)}t("a4d3"),t("e01a"),t("d3b7"),t("d28b"),t("3ca3"),t("ddb0"),t("a630");function l(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}t("fb6a"),t("b0c0");function c(e,a){if(e){if("string"===typeof e)return i(e,a);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?i(e,a):void 0}}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(e){return n(e)||l(e)||c(e)||u()}t("96cf"),t("5cc6"),t("9a8c"),t("a975"),t("735e"),t("c1ac"),t("d139"),t("3a7b"),t("d5d6"),t("82f8"),t("e91f"),t("60bd"),t("5f96"),t("3280"),t("3fcc"),t("ca91"),t("25a1"),t("cd26"),t("3c5d"),t("2954"),t("649e"),t("219c"),t("170b"),t("b39a"),t("72f7"),t("0ae5");var d=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[e.uploadImage?t("div",{staticClass:"image-preview-container"},[e.imagePreview?t("img",{staticClass:"img-preview",attrs:{src:e.imagePreview}}):e._e(),t("div",{staticClass:"image-info"},[t("div",{staticClass:"image-name"},[e._v(e._s(e.uploadImage.name))]),e.imagePreview?t("div",{staticClass:"clear-btn",on:{click:e.clearFile}},[e._v("Delete")]):e._e()])]):t("label",{staticClass:"custom-file-upload",class:{"highlight-drop":e.uploadZoneVisible},on:{drop:function(a){return a.preventDefault(),e.addFile.apply(null,arguments)},dragover:function(a){a.preventDefault(),e.uploadZoneVisible=!0},dragleave:function(a){a.preventDefault(),e.uploadZoneVisible=!1}}},[t("input",{attrs:{type:"file"},on:{change:e.imageSubmited}}),t("span",{staticClass:"upload-instructions"},[e._v("Drag and drop an image here, or click to browse.")])])])},p=[],g=(t("2b3d"),t("9861"),{props:{image:{type:[String],required:!1,default:JSON.parse(localStorage.getItem("userdata")).user.coverImage},Prouser:{type:[String],required:!1}},data:function(){return{fetchedImage:null,uploadImage:null,uploadZoneVisible:null}},computed:{imagePreview:function(){return this.fetchedImage?this.fetchedImage:this.uploadImage?(console.log("url is",URL.createObjectURL(this.uploadImage,"url")),URL.createObjectURL(this.uploadImage)):""}},watch:{uploadImage:function(e){console.log("upload image called eeeeeee",e),this.fetchedImage=null,this.$emit("update-image",e)}},created:function(){console.log(this.Prouser,"dfdsfdsfsdfdsf"),this.fetchedImage=this.Prouser,this.uploadImage=this.Prouser},methods:{addFile:function(e){var a=e.dataTransfer.files[0];a&&(console.log(a,"drp"),this.uploadImage=a)},clearFile:function(){this.uploadImage?this.uploadImage=null:this.fetchedImage&&(this.fetchedImage=null),this.$emit("update-image",null)},imageSubmited:function(e){var a=e.target.files[0];a&&(console.log("upload image called",a),this.uploadImage=a)}}}),v=g,f=(t("0dc0"),t("2877")),h=Object(f["a"])(v,d,p,!1,null,"08077716",null),b=h.exports,C=t("3d20"),w=t.n(C),k={components:{ImageUpload:b,Swal:w.a},data:function(){return{user:{username:"",name:"",email:"",bio:"",profileImage:null,coverImage:null,lang:"",followerCount:10,followingCount:10,createdAt:1631731957,social:{website:"",discord:"",youtube:"",facebook:"",twitch:"",tiktok:"",snapchat:""}},usernameExists:null}},created:function(){this.user=JSON.parse(localStorage.getItem("userdata")).user;var e=btoa(String.fromCharCode.apply(String,m(new Uint8Array(this.user.profileImage.data)))),a=atob(e);this.user.profileImage=a},methods:{showSuccss:function(){var e;w.a.fire({title:"Profile Updated Successfully",html:"closing in <b></b> milliseconds.",timer:2e3,timerProgressBar:!0,didOpen:function(){w.a.showLoading();var a=w.a.getHtmlContainer().querySelector("b");e=setInterval((function(){a.textContent=w.a.getTimerLeft()}),100)},willClose:function(){clearInterval(e)}}).then((function(e){e.dismiss===w.a.DismissReason.timer&&console.log("I was closed by the timer")}))},saveProfile:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var t,s,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return console.log("save profile called",e.name,e.user.name,e.user.social.website,e.user.profileImage,e.user.coverImage),t={social:{website:e.user.social.website,discord:e.user.social.discord,youtube:e.user.social.youtube,facebook:e.user.social.facebook,twitch:e.user.social.twitch,tiktok:e.user.social.tiktok,snapchat:e.user.social.snapchat},id:JSON.parse(localStorage.getItem("userdata")).user.id,name:e.user.name,username:e.user.username,email:e.user.email,bio:e.user.bio,lang:e.user.lang,profileImage:e.user.profileImage,coverImage:e.user.coverImage,createdAt:e.user.createdAt},a.next=4,e.axios.post("".concat(BACKEND_URL,"/user/update"),t,{headers:{"Content-Type":"application/json",Authorization:"".concat(JSON.parse(localStorage.getItem("userdata")).token)}});case 4:s=a.sent,200==s.status&&(e.showSuccss(),o=JSON.parse(localStorage.getItem("userdata")),o.user.name=e.user.name,o.user.username=e.user.username,o.user.email=e.user.email,o.user.bio=e.user.bio,o.user.lang=e.user.lang,o.user.profileImage=e.user.profileImage,o.user.coverImage=e.user.coverImage,o.user.createdAt=e.user.createdAt,o.user.social.website=e.user.social.website,o.user.social.discord=e.user.social.discord,o.user.social.youtube=e.user.social.youtube,o.user.social.facebook=e.user.social.facebook,o.user.social.twitch=e.user.social.twitch,o.user.social.tiktok=e.user.social.tiktok,o.user.social.snapchat=e.user.social.snapchat,o.token=o.token,o.message="The user with id: ".concat(o.user.id," was found."),localStorage.setItem("userdata",JSON.stringify(o))),console.log("Saving profile...",s),e.$router.push("/profile");case 8:case"end":return a.stop()}}),a)})))()},profileImageChanged:function(e){var a=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=e,t.next=3,new FileReader;case 3:o=t.sent,o.onloadend=function(){console.log("RESULT",o.result),a.user.profileImage=o.result,o.result},o.readAsDataURL(s);case 6:case"end":return t.stop()}}),t)})))()},coverImageChanged:function(e){var a=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e,"image is here"),s=e,t.next=4,new FileReader;case 4:o=t.sent,o.onloadend=function(){console.log("RESULT",o.result),a.user.coverImage=o.result,o.result},o.readAsDataURL(s);case 7:case"end":return t.stop()}}),t)})))()},checkUsernameAvailability:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var t,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(console.log(e.user.username,"Checking username availability...",JSON.parse(localStorage.getItem("userdata")).token),!e.user.username){a.next=7;break}return t={username:e.user.username},a.next=5,fetch("https://artabia.com:3001/user/username-exists/",{method:"post",body:JSON.stringify(t),headers:{"Content-Type":"application/json",Authorization:"".concat(JSON.parse(localStorage.getItem("userdata")).token)}}).then((function(e){return e.json()}));case 5:s=a.sent,s.exists?(console.log("already ",s),e.usernameExists=!0):(console.log("Not exist ",s),e.usernameExists=!1);case 7:case"end":return a.stop()}}),a)})))()},getBioLength:function(){return this.user.bio.length},userProPhoto:function(){return JSON.parse(localStorage.getItem("userdata")).user.profileImage},userCoverPhoto:function(){return JSON.parse(localStorage.getItem("userdata")).user.coverImage}}},I=k,y=(t("60f2"),Object(f["a"])(I,s,o,!1,null,"bb4e163a",null));a["default"]=y.exports}}]);
//# sourceMappingURL=chunk-71b54450.5eb9ba7a.js.map