let text=[
"amkalsfc",
"mpalendf",
"ebapsung",
"tpwoendf",
"hetygfis",
"yedodlnl",
"stfjsodp",
"tpceuans"
]
let angleList=[0,45,90,135,180,225,270,315]
let degList=[]
let parents=document.querySelectorAll('.parent')
parents.forEach((parent,i)=>{
generate(text[i],parent,i+1)
let val=(i+2)*25*0.4
parent.style.width=`${val}vw`
parent.style.height=`${val}vw`
parent.style.zIndex=parents.length-i
parent.setAttribute("index",i)
parent.setAttribute("active",0)
parent.addEventListener("mousedown",(e)=>{
    parent.setAttribute("active",1)
    parents.forEach((paren)=>{
        paren.setAttribute("active",0)
        paren.childNodes.forEach((el)=>{
            el.style.fontWeight="normal"
        })
    })
    parent.childNodes.forEach((el)=>{
        el.style.fontWeight="bold"
    })
})
let rdeg=parseInt(Math.random() *8)
rotate(parent,angleList[rdeg])
degList.push(rdeg)
})

document.addEventListener("mousemove",(e)=>{
    parents.forEach((parent,i)=>{
        if(parent.getAttribute("active")=="1"){
        }
    })
})

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