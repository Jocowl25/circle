let wordlist=[
"amethyst",
"balloons",
"achieved",

]
let container=document.getElementById("parents")
document.querySelector(".circle").addEventListener("click",()=>{
container.innerHTML=''
start()
})

function start(){
//create word array
let text=new Array(wordlist[0].length);
text=text.fill("")
for(let i=0;i<wordlist[0].length;i++){
    wordlist.forEach((ele)=>{
        text[i]=text[i]+ele.charAt(i)
    })
}
//create parent divs
let parents=[]
text.forEach(()=>{
    let par = document.createElement("div");
    par.className = "parent";
    container.appendChild(par)
    parents.push(par)
})
//create different angles
let angleList=[]
let angleUnit=360/wordlist.length;
let current=0;
while(current<360){
    angleList.push(current)
    current+=angleUnit
}
let degList=[]
//set up parents
parents.forEach((parent,i)=>{
generate(text[i],parent,i+1)
let val=(i+2)*25*0.4
parent.style.width=`${val}vw`
parent.style.height=`${val}vw`
parent.style.zIndex=parents.length-i
parent.setAttribute("index",i)
parent.setAttribute("active",0)
parent.addEventListener("mouseover",()=>{
    parent.childNodes.forEach((el)=>{
        el.style.textDecoration="underline"
    })
})
parent.addEventListener("mouseleave",()=>{
    parent.childNodes.forEach((el)=>{
        el.style.textDecoration=""
    })
})
parent.addEventListener("mousedown",()=>{
    parents.forEach((paren)=>{
        paren.setAttribute("active",0)
        paren.childNodes.forEach((el)=>{
            el.style.fontWeight="normal"
        })
    })
    parent.setAttribute("active",1)
    parent.childNodes.forEach((el)=>{
        el.style.fontWeight="bold"
    })
})
let rdeg=parseInt(Math.random() *angleList.length)
rotate(parent,angleList[rdeg])
degList.push(angleList[rdeg])
})
console.log(degList)
//set up key listeners
document.addEventListener("keydown",(e)=>{
    let found=false
    console.log(degList);
    parents.forEach((parent,i)=>{
        if(parent.getAttribute("active")=="1"&&!found){
            if(e.key=="ArrowDown"&&i>0){
                parents.forEach((paren)=>{
                    paren.setAttribute("active",0)
                    paren.childNodes.forEach((el)=>{
                        el.style.fontWeight="normal"
                    })
                })
                parents[i-1].setAttribute("active",1)
                parents[i-1].childNodes.forEach((el)=>{
                    el.style.fontWeight="bold"
                })
            }else if(e.key=="ArrowUp"&&i<parents.length-1){
                parents.forEach((paren)=>{
                    paren.setAttribute("active",0)
                    paren.childNodes.forEach((el)=>{
                        el.style.fontWeight="normal"
                    })
                })
                parents[i+1].setAttribute("active",1)
                parents[i+1].childNodes.forEach((el)=>{
                    el.style.fontWeight="bold"
                })
                found=true
            }else if(e.key=="ArrowLeft"){
                degList[i]+=angleUnit/-2;
                if(degList[i]<0){
                    degList[i]+=360
                }
                rotate(parent,degList[i])
                parent.childNodes.forEach((el)=>{
                    el.style.fontWeight="bold"
                })
            }else if(e.key=="ArrowRight"){
                degList[i]+=angleUnit/2;
                degList[i]=degList[i]%360
                rotate(parent,degList[i])
                parent.childNodes.forEach((el)=>{
                    el.style.fontWeight="bold"
                })
            }
        }
    })
    if (degList.every((deg)=>deg==degList[0])){
        document.querySelector(".win").style.display="block"
    }
})

}
function rotate(ele,deg){
    ele.childNodes.forEach((el,i)=>{
        let len=ele.childNodes.length
        let str=(parseInt(ele.getAttribute("index"))+1)*5.5
        let angle = (360 / len)*(Math.PI/180);
        let rad=deg*(Math.PI/180)
        el.style=`transform:translate(${(str)*Math.cos(angle*i+rad)}vw,${(str)*Math.sin(angle*i+rad)}vw)`
    })
}

function generate(text,parent,w){
text = text.replace(/\s/g, "");
const len = text.length;
const wid=5.5;
const angle = (360 / len)*(Math.PI/180);
for (let i = 0; i < len; i++) {
    paragraph = document.createElement("p");
    paragraph.className = "para";
    paragraph.style = `transform:translate(${(wid*w)*Math.cos(angle*i)}vw,${(wid*w)*Math.sin(angle*i)}vw)`;
    paragraph.setAttribute("trans",`${wid*w}`)
    charNode = document.createTextNode(text.charAt(i));
    paragraph.appendChild(charNode);
    parent.appendChild(paragraph);
}
}
//start the game
start()
