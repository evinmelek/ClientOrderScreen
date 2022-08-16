<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!--a href="/close"
    onclick="setTimeout(function(){var ww = window.open(window.location, '_self'); ww.close(); }, 1000);"></a-->
  <div class="container">
    <div class="content">
      <div class="column" v-for="color of backgroundsettings" :key="color.id" :style="{ 'backgroundColor': color.color }">
        <div class="list">
          <ul>
            <li v-for="order of orders" :key="order.id">
              <p class="num-list">{{ order.orderno }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div v-for="theme of backgroundsettings" :key="theme.id">
        <div v-if="theme.imagestatus == true" class="back" :style="{ backgroundImage: 'url(\'' + theme.image + '\')' }">
          <div v-for="adstatus of advertisements" :key="adstatus.id">
            <div name="withoutad" v-if="adstatus.adstatus == false">
              <h1 v-for="toptitle of generalsettings" :key="toptitle" class="toptitle">{{toptitle.toptitle}}</h1>
              <div v-for="order of orders" :key="order.id">
                <h1 class="num" name="calling-num-space">{{ order.orderno }}</h1>
              </div>
            </div>
            <div name="withad" v-else>
               <h1 v-for="toptitle of generalsettings" :key="toptitle" class="toptitle">{{toptitle.toptitle}}</h1>
              <div v-for="file of advertisements" :key="file.id">
                <!--img class="ad" :src="file.file"-->
                <video class="ad" id="video-preview" type="video/mp4" :poster="file.file" controls autoplay loop=""
                  :key="video">
                  <source :src="file.file">
                </video>
              </div>
            </div>
          </div>
          <div v-for="timestatus of generalsettings" :key="timestatus.id">
            <div v-if="timestatus.timestatus == true">
              <p class="time-row" name="time-space">{{ time }}</p>
            </div>
            <div class="time-row" hidden v-else></div>
          </div>
          <div v-for="companylogo of generalsettings" :key="companylogo.id">
            <div v-if="companylogo.logostatus == true">
              <img class="logo" :src="companylogo.companylogo">
            </div>
            <div class="logo-empty" v-else hidden></div>
            <div class="logo-empty" v-if="companylogo.companylogo == null"></div>
          </div>
        </div>
        <div class="back" v-if="theme.imagestatus == false">
          <div v-for="adstatus of advertisements" :key="adstatus.id">
            <div name="withoutad" v-if="adstatus.adstatus == false">
               <h1 v-for="toptitle of generalsettings" :key="toptitle" class="toptitle">{{toptitle.toptitle}}</h1>
              <div v-for="order of orders" :key="order.id">
                <p class="num" name="calling-num-space">{{ order.orderno }}</p>
              </div>
            </div>
            <div name="withad" v-else>
               <h1 v-for="toptitle of generalsettings" :key="toptitle" class="toptitle">{{toptitle.toptitle}}</h1>
              <div v-for="file of advertisements" :key="file.id">
                <!--img class="ad" :src="file.file"-->
                <video class="ad" id="video-preview" type="video/mp4" :poster="file.file" controls autoplay loop=""
                  :key="video">
                  <source :src="file.file">
                </video>
              </div>
            </div>
          </div>
          <div v-for="timestatus of generalsettings" :key="timestatus.id">
            <div v-if="timestatus.timestatus == true">
              <p class="time-row" name="time-space">{{ time }}</p>
            </div>
            <div class="time-row" hidden v-else></div>
          </div>
          <div v-for="companylogo of generalsettings" :key="companylogo.id">
            <div v-if="companylogo.logostatus == true">
              <img class="logo" :src="companylogo.companylogo">
            </div>
            <div class="logo-empty" v-else hidden></div>
            <div class="logo-empty" v-if="companylogo.companylogo == null"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="wrapper-box">
        <div id="box">
          <ul>
            <li v-for="subtitle of notes" :key="subtitle.id">
              <p @click="scroll_right">{{subtitle.text}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-for="precall in callsettings" :key="precall.id">
    <audio v-if="precall.status==true" @click="play(call)" id="call" controls :src="precall.precall"
      type="audio/mpeg" @play="precall.precall" autoplay hidden>
    </audio>
  </div>
</template>

<script> 
//importing backend api url 
const BASE_URL = "http://localhost:3000"
export default {
  data(){
    return{  
        //objects are api endpoints
      orders: {
         orderno: ""
      },
      advertisements: {
        adstatus: "",
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
      data: null, 
    } 
  },
  watch: {   
  },
  computed: {  
  },
  methods: {
    //fetching data from different api endpoints with methods named different
    async getPreCall() {  
      fetch(BASE_URL + "/api/orders") 
        .then(response => response.json())
        .then(data => {
          (this.orders = data)
          for (data of data) {
            data.orderno = !data.orderno  
            this.$emit("input", data.orderno)
            console.log(" Precall Status is: ", data.orderno[0]) 
          }
        })
        .catch(error => { console.log(error) })
    },
    async getOrder() {  
      fetch(BASE_URL + "/api/orders")
        .then(response => response.json())
        .then(data => (this.orders = data.slice(-6).sort((a,b) => {  //get last 6 data
          if(a.id > b.id) return this.getPrecall()   //and sort from biggest id to smallest id
          return 0})
          ))         
    }, 
    async getAd(){ 
      fetch(BASE_URL +"/api/advertisements")
        .then(response => response.json())
        .then(data => (this.advertisements = data.slice(-1)))
        .catch(error=>{console.log(error)}) 
    },  
    async getSound(){ 
      fetch(BASE_URL + "/api/soundsettings")
        .then(response => response.json())
        .then(data => (this.soundsettings = data.slice(-1)))
        .catch(error=>{console.log(error)}) 
    },
    async getPrecall(){
      fetch(BASE_URL + "/api/callsettings")
        .then(response => response.json())
        .then(data => (this.callsettings = data))
        .catch(error=>{console.log(error)})   
    },
    async getBackground() { 
      fetch(BASE_URL + "/api/backgroundsettings")
        .then(response => response.json())
        .then(data => (this.backgroundsettings = data))
        .catch(error=>{console.log(error)}) 
    }, 
    async getGeneralSettings() {
      fetch(BASE_URL + "/api/generalsettings")
        .then(response => response.json())
        .then(data => (this.generalsettings = data.slice(-1)))
        .catch(error=>{console.log(error)})    
    },
    scrollLeft() {
      let content = document.querySelector(".wrapper-box")
      content.scrollLeft += 15
      window.setTimeout(function(){location.reload()},150000)
    },
    getTime() {
        const today = new Date() 
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()  
        this.time = time
    },
    async getSubtitle() {         
      fetch(BASE_URL + "/api/notes")
        .then(response => response.json())
        .then(data => (this.notes = data.slice(-1)))
        .catch(error=>{console.log(error)})   
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
 
  },
  created(){ 
    console.log("created...") 
    this.interval = setInterval(() =>{
    this.getOrder()},1000)  // getting data every second
  
    this.interval = setInterval(() =>{
    this.getAd()},100000)  //getting data every minute

    this.interval = setInterval(() =>{
    this.getTime()}) 

    this.interval = setInterval(() =>{
    this.getGeneralSettings()
    this.hourIndex++},100000) 
    
    this.interval = setInterval(() =>{
    this.getBackground()},100000) 

    this.interval = setInterval(() =>{
    this.getSubtitle()},1000)   
    
    this.interval = setInterval(() =>{
    this.scrollLeft()},150)  // scrolling text to left
  },
  unmounted(){
    console.log("unmounted...")
    clearInterval(this.interval)
  },  
}
</script>

<style scoped>  
a{
  color: white;
} 
.list ul{
  height: text;
  list-style-type: none;
  padding-left: 0;
  margin-top: -7%; 
  margin-left: -5%;
  float: center;
}
.list {
  transform: rotate(180deg);
  list-style-type: none;
  line-height: 3%; 
}
.list ul > li {
  transform: rotate(-180deg);
  font-size: 990%; 
  color: black; 
} 
.list li:last-child{
  font-size: 1180%; 
  animation-name: last;
  animation-duration: 2s;
} 
@keyframes last { 
  0%{font-size: 1500%; margin-top: 4%;}
  25%{font-size: 1500%; margin-top: 4%}
  50%{font-size: 1999%; margin-top: 4%} 
  75%{font-size: 1999%; margin-top: 4%}  
  100%{font-size: 1999%; margin-top: 4%} 
}
.container{  
    height: 97vh;
    display: flex;
    flex-direction: column;
    padding: 0%;
    width: 99.5%;  
    margin-bottom: 0%;
    position: absolute; 
    text-align: center; 
} 
.back{ 
  position: absolute;
  background-color: #454b45;
  margin: auto;
  width: 69.8%; 
  height: 99%; 
  margin-top: -1%;
  margin-left: -1%;
  text-align: center; 
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; 
  z-index: -1;
}  
.column{  
  position: absolute;
  margin: auto;
  width: 31%; 
  height: 98%; 
  float: right;
  margin-top: -1%;
  margin-left: 68.8%; 
  text-align: center; 
  border: 1px solid rgb(63, 60, 60);
  background-color: grey; 
  overflow-y: scroll;
  z-index: -1;
  box-shadow: darkslategrey 1px 1px, inset 0 0 30px rgb(54, 54, 54), inset 0 0 20px rgb(44, 44, 44), inset  0 0 30px rgb(66, 66, 66); 
}
.column::-webkit-scrollbar {
    display: none;
}   
.num-list{
  font-size: 100%; 
  text-shadow:#d4d4da 3px 3px 3px,  0 0 25px rgb(63, 63, 66), 0 0 5px rgb(56, 56, 58);
  word-wrap: break-word;  
} 
.ad{
  position: absolute;
  font-size: 1600%;  
  background-color: white;
  border: 1px solid white;
  width: 98.7%;
  height: 83.6%;
  margin-left: -49%; 
  margin-top: 9.6%; 
  color: black;
  z-index: -1;
}
.toptitle{   
  position: absolute;
  height: 10%;
  width: 98.3%;
  color: white; 
  border: 3px solid white;
  border-radius: 5px; 
  margin-top: 1%;  
  margin-left: 1%; 
  margin-bottom: -11.8%; 
  padding-top: 1%;
  font-size: 350%;
  float: center; 
  text-align: center;   
  box-shadow: rgb(166, 169, 169) 2px 2px, 0 0 15px rgb(235, 235, 240), 0 0 25px rgb(84, 84, 87) ; 
  background-image: linear-gradient(to right , silver,  grey, teal, darkslategrey, black); 
  animation: comein 0.9s 1 ease-in-out forwards;
  z-index: 1;
}
@keyframes comein {
  0% {
    letter-spacing: 10px; 
  } 
  20% {
    letter-spacing: 20px;
  }
  40% {
    letter-spacing: 25px;
  }
  60% {
    letter-spacing: 25px;
  }
  80% {
    letter-spacing: 20px;
  }
  100% {
    letter-spacing: 15px; 
  }
}
.time-row{
  position: absolute;
  margin-left: 3%;
  margin-top: 62%; 
  padding-left: 1%;
  padding-right: 1%;
  width: text; 
  text-align: center;
  height: 12%;   
  background-color: #C0C0C0;
  border: 1px solid #C0C0C0; 
  font-size: 550%;  
  color: black;
  text-shadow:#3d3d41 1px 1px 1px,  0 0 5px rgb(235, 235, 240), 0 0 5px rgb(20, 20, 26); 
  box-shadow: darkslategrey 1px 1px, 0 0 15px rgb(235, 235, 240), 0 0 15px rgb(84, 84, 87) ;
} 
.time-row-withoutad{ 
  position: absolute;
  margin-left: 7%;
  margin-top: 48%; 
  padding-left: 1%;
  padding-right: 1%;
  width: text; 
  text-align: center;
  height: 12%;   
  background-color: #C0C0C0;
  border: 1px solid #C0C0C0; 
  font-size: 550%;  
  color: black;
  text-shadow:#3d3d41 1px 1px 1px,  0 0 5px rgb(235, 235, 240), 0 0 5px rgb(20, 20, 26); 
  box-shadow: darkslategrey 1px 1px, 0 0 15px rgb(235, 235, 240), 0 0 15px rgb(84, 84, 87) ;
}
.subtitle-space{
  position: absolute;
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
  position: absolute;
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
  font-size: 1800%;  
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
  width: 60%;
  max-width: text;
  height: text;
  padding-top: 3%;
  padding-bottom: 3%;
  margin-left: 20%; 
  margin-top: 12%;
  color: black;
  font-weight:normal;
  text-shadow:#3d3d41 3px 3px 3px,  0 0 10px rgb(235, 235, 240), 0 0 15px rgb(20, 20, 26); 
  animation-name: order;
  animation-duration: 1s;
}
@keyframes order { 
  100% {box-shadow: inset 0 0 90px silver, inset 0 0 90px rgb(82, 81, 81), inset  0 0 80px rgb(82, 81, 81);}
}
.logo{
  position: absolute; 
  height: 12%;
  width: 12%;
  border: 1px solid rgb(165, 163, 163); 
  margin-top: 62%; 
  margin-right: 5%;
  margin-left: 30%;
  float: right;
}
.logo-withoutad{
  position: absolute; 
  height: 12%;
  width: 12%;
  border: 1px solid rgb(165, 163, 163); 
  margin-top: 48%; 
  margin-right: 5%;
  margin-left: 30%;
  float: right;
} 
.text{
  font-size: 180%;  
  padding: 2%;
  line-height: 0%;
  color: black;   
}
</style>