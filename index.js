let wordlist=[]
let allwords=[]
const separation=4
const parentscale=0.3
let downfunct=()=>{};
download()
let container=document.getElementById("parents")
document.querySelector(".circle").addEventListener("click",()=>{
document.querySelector(".win").style.display="none"
container.innerHTML=''
reset()
start()
})

async function download(){
    const response = await fetch('./common.json');
    let wordjson = await response.json();
    for(let i=3;i<13;i++){
        allwords.push(wordjson[`n${i}`])
    }
    reset()
    start()
}
function reset(){
wordlist=[]
let wordlength=parseInt(Math.random() * 10)
let totalwords=parseInt(Math.random() * 10)
let allwordnum=allwords[wordlength]
wordlist.push(allwordnum[parseInt(Math.random() * allwordnum.length)])
for(let i=0;i<=totalwords;i++){
wordlist.push(allwordnum[parseInt(Math.random() * allwordnum.length)])
}
}
function start(){
//create word array
let text=new Array(wordlist[0].length);
text=text.fill("")
for(let i=0;i<wordlist[0].length;i++){
    wordlist.forEach((ele,j)=>{
        text[i]=text[i]+ele.charAt(i)
    })
}
let textRot=new Array(wordlist[0].length);
let textShift=new Array(wordlist[0].length);
textShift=textShift.fill(0)
const dash="-"
textRot=textRot.fill(dash.repeat(text[0].length*2))
textRot.forEach((ele,i)=>{
    let textRotArr=textRot[i].split("")
    textRotArr.forEach((val,j)=>{
        if(j%2==0){
            textRotArr[j]=text[i].charAt(j/2)
        }
    })
    textRot[i]=textRotArr.join('')
})
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
let degList=[]
let angleUnit=360/wordlist.length;
let current=0;
while(current<360){
    angleList.push(current)
    current+=angleUnit
}
//set up parents
parents.forEach((parent,i)=>{
generate(text[i],parent,i+1)
let val=(i+2)*25*parentscale
parent.style.width=`${val}vw`
parent.style.height=`${val}vw`
parent.style.zIndex=parents.length-i
parent.setAttribute("index",i)
parent.setAttribute("active",0)
parent.addEventListener("mouseover",()=>{
    parent.childNodes.forEach((el)=>{
        el.style.fontWeight="800"
    })
})
parent.addEventListener("mouseleave",()=>{
    parent.childNodes.forEach((el)=>{
       if(parent.getAttribute("active")==0){
        el.style.fontWeight="normal"
       }else{
        el.style.fontWeight="bold"
       }
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
textRot[i]=swapLetters(textRot[i],rdeg)
textShift[i]+=rdeg*2
degList.push(angleList[rdeg])
})
//reset if everthing is the same
if(win(0)){
    container.innerHTML=''
    reset()
    start()
}
//find best circle for comparisons
let comparison=0
let mult=false;
let compFound=false;
degList.every((deg,i)=>{
    mult=false
//check if circle has pattern
    for(let a=1;a<angleList.length*2;a++){
        if(textRot[i]==swapLetters(textRot[i],a)){
            mult=true
            break;
        }
    }
    //if it does, use next circle for comparison; otherwise keep current one
    if(mult&&!compFound){
        comparison++
    }else{
        compFound=true
    }})
//set up key listeners
document.removeEventListener("keydown",downfunct)
downfunct=(e)=>{
    let found=false
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
            }else {
                if(e.key=="ArrowLeft"){
                degList[i]+=angleUnit/-2;
                if(degList[i]<0){
                    degList[i]+=360
                }
                textRot[i]=swapLetters(textRot[i],-1)
                textShift[i]-=1
                if(textShift[i]<0){
                    textShift[i]+=angleList.length*2
                }

            }else if(e.key=="ArrowRight"){
                degList[i]+=angleUnit/2; 
                degList[i]=degList[i]%360
                textRot[i]=swapLetters(textRot[i],1)
                textShift[i]+=1
                textShift[i]=textShift[i]%(angleList.length*2)
            }
            rotate(parent,degList[i])
            parent.childNodes.forEach((el)=>{
                el.style.fontWeight="bold"
            })
        }
        }
    })
    //if win
    if(win(comparison)){
        document.querySelector(".win").style.display="block"
        }
    }
document.addEventListener("keydown",downfunct)
//win function
function win(comparison){
    return degList.every((deg,i)=>{
         //actual comparisions
         //check if rotation is the same
         if(parseInt(deg)==parseInt(degList[comparison])){
             return true
         }
         //if not:
         //"reset" rotated circle
         let tmpRot=swapLetters(textRot[i],angleList.length*2-textShift[i])
         //check if current rotation is equivalent to "correct" rotation
         if(textRot[i]==swapLetters(tmpRot,textShift[comparison])){
             return true
         }
     })      
 }
}
function rotate(ele,deg){
    ele.childNodes.forEach((el,i)=>{
        let len=ele.childNodes.length
        let str=(parseInt(ele.getAttribute("index"))+1)*separation
        let angle = (360 / len)*(Math.PI/180);
        let rad=deg*(Math.PI/180)
        el.style=`transform:translate(${(str)*Math.cos(angle*i+rad)}vw,${(str)*Math.sin(angle*i+rad)}vw)`
    })
}
function generate(text,parent,w){
text = text.replace(/\s/g, "");
const len = text.length;
const wid=separation;
const angle = (360 / len)*(Math.PI/180);
for (let i = 0; i < len; i++) {
    paragraph = document.createElement("p");
    paragraph.className = "para";
    paragraph.style = `transform:translate(${(wid*w)*Math.cos(angle*i)}vw,${(wid*w)*Math.sin(angle*i)}vw)`;
    charNode = document.createTextNode(text.charAt(i));
    paragraph.appendChild(charNode);
    parent.appendChild(paragraph);
}
}
function swapLetters(array,end){
    let copy=array.split('')
    if(end>0){
    for(let i=0;i<end;i++){
        copy.unshift(copy.pop())
    }
    }else{
    for(let i=0;i<Math.abs(end);i++){
        copy.push(copy.shift())
    }
    }
    return copy.join("")
}
