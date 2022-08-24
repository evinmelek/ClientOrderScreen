<template> 
<div class="sub-space">
   <div class="scroll" v-for="subtitle of notes" :key="subtitle.id">
    <div class="m-scroll">
      <p> {{subtitle.text}} </p> 
    </div>
   </div>
</div> 

</template> 

<script>
const BASE_URL = "http://localhost:3000"
export default {
  data(){
    return{
      notes: {
        title: "",
        text: ""
      }
    }
  },
  methods: { 
    async getSubtitle() {         
      fetch(BASE_URL + "/api/notes")
        .then(response => response.json())
        .then(data => (this.notes = data.slice(-1)))
        .catch(error=>{console.log(error)})   
    }, 
  },
  async mounted() { 
    console.log("mounted...")     
    this.getSubtitle()  
 
  },
  created(){ 
    console.log("created...")  
    this.interval = setInterval(() =>{
    this.getSubtitle()},10000)    
  },
  unmounted(){
    console.log("unmounted...")
    clearInterval(this.interval++)
  },  
}
</script>

<style scoped>  
.sub-space{
  position: absolute; 
  bottom: -2.2%; 
  justify-content: center;
  align-items: center; 
  margin-left: -1%; 
  display: flex;   
  width: 101%;
  margin-left: -1%;
}
.scroll { 
  width: 101%;
  height: 20%;
  min-height: 20%;
  background-color: black;
  overflow: hidden;
  z-index: 1;
}
.m-scroll {
  overflow: hidden;
  height: 100%;
  white-space: nowrap;
  animation: scrollText 30s infinite linear;
  animation-direction: normal;
  margin: 0; 
  display: inline-block;   
}
p {
  font-size: 260%;
  display: inline-block;
  min-width: 101vw;
  min-height: 20%;
  margin: 0;
  padding: 0.15%;
  color: white; 
}
@keyframes scrollText {
  from {
    transform: translateX(15%);
  }
  to {
    transform: translateX(-100%);
  }
}  
</style> 
