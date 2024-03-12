const BASE_URL =
  "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropDowns=document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg")
for(let select of dropDowns){
   for(currencyCode in countryList){
       let newOption=document.createElement("option")
       newOption.innerHTML=currencyCode
       newOption.value=currencyCode
       if(select.name==="from" && currencyCode=="INR"){
        newOption.selected="selected"
       }else if(select.name==="to" && currencyCode=="USD"){
        newOption.selected="selected"
       }
       select.append(newOption)
   }
   select.addEventListener("change",(event)=>{
    updateFlag(event.target)
   })
}
const updateFlag=(element)=>{
const countrycode=countryList[element.value];
let img=element.parentElement.querySelector("img")
img.src=`https://flagsapi.com/${countrycode}/flat/64.png`
}
btn.addEventListener("click",async (evt)=>{
   evt.preventDefault() // form button k click hone pe jo kaam automatic ho rhe the vo na ho
   let amount=document.querySelector(".amount input")
   let amountVal=amount.value
   if(amountVal==="" || amountVal<1){
    amountVal=1
    amount.value="1"
   }

   const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
   let response =await fetch(URL)
   let jsonresponse =await response.json()
   const price=jsonresponse[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
   msg.innerHTML=`${amountVal}${fromCurr.value}=${price*amountVal}${toCurr.value}`
})