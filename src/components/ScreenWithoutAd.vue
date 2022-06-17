<template>
  <div class="container">
    <div 
      class="column" 
      v-for="color of backgroundsettings" :key="color.id"
      :style="{'backgroundColor': color.color}">  
      <div class="list">  
        <ul>
          <li v-for="order of orders" :key="order.id"><p>{{ order.orderno }}</p> </li>
        </ul>
      </div> 
    </div>
    <div 
      class="back"
      v-for="theme of backgroundsettings" :key="theme.id"
      :style="{backgroundImage: 'url(\'' + theme.image + '\')'}">
      <space v-for="adstatus of advertisements" :key="adstatus.id"> 
        <div name="withoutad" v-if="adstatus.adstatus==false">
        <p class="text"></p>
        <div v-for="order of orders" :key="order.id">  
            <p class="num"  name="calling-num-space">{{ order.orderno }}</p>
        </div> 
      </div>  
        <div name="withad" v-else> 
            <div v-for="file of advertisements" :key="file.id">
              <!--img class="ad" :src="file.file"-->  
              <video class="ad" id="video-preview"    
              controls 
              autoplay 
              loop=""
              :key="video">
              <source :src="file.file" >
              </video>
            </div> 
        </div>
      </space>
     <div v-for="timestatus of generalsettings" :key="timestatus.id">
       <div v-if="timestatus.timestatus == true">
          <p class="time-row" name="time-space">{{ time }}</p>
       </div>  
       <div class="time-row" v-else></div>
     </div>  
     <div v-for="companylogo of generalsettings" :key="companylogo.id"> 
        <div v-if="companylogo.logostatus == true">
          <img class="logo" :src="companylogo.companylogo"> 
        </div> 
        <div class="logo-empty" v-else></div>
     </div>
    </div>  
    <div class="wrapper"> 
      <div class="wrapper-box">
        <div id="box"> 
            <ul>
              <li v-for="subtitle of notes" :key="subtitle.id">
                <p @click="scroll_right" >{{subtitle.text}}</p>
              </li>
            </ul> 
        </div>
      </div>
    </div>
  </div>
  <audio 
    v-for="precall in callsettings" :key="precall.id" 
    @click="play(call)" 
    controls
    :src="precall.precall"
    type="audio/mpeg"
    @play="precall.precall"
    autoplay="true"
    hidden="true" >
  </audio> 
</template>

<script> 
const localhost = "http://192.168.1.109:3000"
export default {
  data(){
    return{  
        adstatus: "",  
      orders: {
         orderno: ""
      },
      advertisements: {
        file: ""
      },
      generalsettings: {
         timestatus: "",
         close: "",
         logostatus: "",
         companylogo: ""
      }, 
      backgroundsettings: {
        imagestatus: "",
        color: "",
        image: ""
      }, 
      callsettings: {
        status: "",
        precall: ""
      },
      soundsettings: {
        soundstatus: "",
        sound: ""
      },
      notes: {
        title: "",
        text: ""
      }, 
      time: "" 
    } 
  },
  methods: {
    async getOrder() {  
      fetch(localhost + "/api/orders")
        .then(response => response.json())
        .then(data => (this.orders = data))  
    }, 
    async getAd(){ 
      fetch(localhost +"/api/advertisements")
        .then(response => response.json())
        .then(data => (this.advertisements = data.slice(-1)))  
    },  
    async getSound(){ 
      fetch(localhost + "/api/soundsettings")
        .then(response => response.json())
        .then(data => (this.soundsettings = data.slice(-1)))
    },
    async getPrecall(){
      fetch(localhost + "/api/callsettings")
        .then(response => response.json())
        .then(data => (this.callsettings = data.slice(-1)))  
    },
    async getBackground() { 
      fetch(localhost + "/api/backgroundsettings")
        .then(response => response.json())
        .then(data => (this.backgroundsettings = data.slice(-1)))
    }, 
    async getGeneralSettings() {
      fetch(localhost + "/api/generalsettings")
        .then(response => response.json())
        .then(data => (this.generalsettings = data))   
    },
    scrollRight() {
      let content = document.querySelector(".wrapper-box")
      content.scrollLeft += 15
      //window.setTimeout(function(){location.reload()},60000)
    },
    getTime() {
        const today = new Date() 
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()  
        this.time = time
    },
    async getSubtitle() {         
      fetch(localhost + "/api/notes")
        .then(response => response.json())
        .then(data => (this.notes = data.slice(-1)))  
    },
  }, 
  async mounted() { 
    console.log("mounted...")      
    this.getOrder()
    this.getAd()  
    this.getTime()
    this.getPrecall()
    this.getBackground()
    this.getGeneralSettings()
    this.getSubtitle()
    this.scrollRight()  
 
  },
  created(){ 
    console.log("created...") 
    this.interval = setInterval(() =>{
    this.getOrder()},1000)  
  
    this.interval = setInterval(() =>{
    this.getAd()},1000)  

    this.interval = setInterval(() =>{
    this.getTime()},1000) 

    this.interval = setInterval(() =>{
    this.getGeneralSettings()},1000) 

    this.interval = setInterval(() =>{
    this.getSubtitle()},1000)   
    
    this.interval = setInterval(() =>{
    this.scrollRight()},150)
  },
  unmounted(){
    console.log("unmounted...")
    clearInterval(this.interval)
  },  
}
</script>

<style scoped> 
.list ul{
  list-style-type: none;
  padding-left: 0;
  margin-top: -5%; 
  margin-left: -5%;
  float: center;
}
.list {
  transform: rotate(180deg);
  list-style-type: none;
  line-height: 5%; 
}
.list ul > li {
  transform: rotate(-180deg);
  font-size: 1100%; 
  color: black;
} 
.list li:last-child{
  font-size: 1600%; 
} 
.container{  
  padding: 0%;
  width: 99.5%; 
  height: 99%; 
  position: absolute; 
  text-align: center; 
}
.back{ 
  background-color: #454b45;
  margin: auto;
  width: 69.8%; 
  height: 99%; 
  position: absolute;
  margin-top: -1%;
  margin-left: -1%;
  text-align: center; 
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; 
  z-index: -1;
}
.column{ 
  margin: auto;
  width: 31%; 
  height: 99%;  
  float: right;
  position: absolute;
  margin-top: -1%;
  margin-left: 68.8%; 
  text-align: center; 
  border: 1px solid rgb(63, 60, 60);
  background-color: grey; 
  overflow-y: scroll;
  z-index: -1;
}
.column::-webkit-scrollbar {
    display: none;
}   
.called-nums{
  font-size: 800%;
  color: white;
  margin-top: 10%; 
} 
.ad{
  position: absolute;
  font-size: 1600%;  
  background-color: white;
  border: 1px solid white;
  width: 60%;
  height: 46%;
  margin-left: -30%; 
  margin-top: 5%; 
  color: black;
}
.time-row{
  position: absolute;
  margin-left: 7%;
  margin-top: 47%; 
  width: 40%;
  height: 12%;   
  background-color: #C0C0C0;
  border: 1px solid #C0C0C0; 
  font-size: 550%;
  padding: 0% 0% 0%;
  color: black;
} 
.subtitle-space{
  width: 100%;
  bottom: 0px; 
} 
.wrapper ul{
  list-style-type: none;   
  float: center;
}
.wrapper li { 
  list-style-type: none; 
}
.wrapper p{
  height: 100px;
  width: 100%;
  font-size: 220%; 
  margin-top: 0%; 
} 
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 45%;
  height: 150px;
  width: 99.5%; 
}
.wrapper-box {
  max-width: 101%;
  overflow: hidden;
  bottom:0px;
  position:fixed;
}
#box {
  width: 18000px;
  height: 90px;
  text-align: left; 
  padding-left: 95%; 
  border: 1px solid black;
  position: relative;
  background-color: black;
  color: white; 
  font-size: 120%; 
}
#box div {
  position: absolute;
  height: 50%;
  width: 50px; 
  left: 0;
} 
.num{
  position: absolute;
  font-size: 1700%;  
  background-color: white;
  border: 1px solid white;
  width: 60%;
  height: 36%;
  margin-left: 20%; 
  margin-top: 6%;
  color: black;
}
.logo{
  position: absolute; 
  height: 12%;
  width: 12%;
  border: 1px solid rgb(165, 163, 163); 
  margin-top: 47%; 
  margin-right: 5%;
  margin-left: 30%;
  float: right;
}
.logo-empty{
  position: absolute; 
  height: 12%;
  width: 12%;
  border: 1px solid rgb(165, 163, 163); 
  margin-top: 47%; 
  margin-right: 5%;
  margin-left: 80%;
  background: white;
  float: right;
}
.text{
  font-size: 180%;  
  padding: 2%;
  line-height: 0%;
  color: black;   
}
</style>