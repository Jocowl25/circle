let text=[
"abcdefgh",
"mbcdefgh",
"ebcdefgh",
"tbcdefgh",
"hbcdefgh",
"ybcdefgh",
"sbcdefgh",
"tbcdefgh"
]
let parents=document.querySelectorAll('.parent')
parents.forEach((parent,i)=>{
generate(text[i],parent,i+1)
let val=(i+2)*25*0.4
parent.style.width=`${val}vw`
parent.style.height=`${val}vw`
parent.style.zIndex=parents.length-i
parent.setAttribute("index",i)
parent.addEventListener("click",()=>{
    rotate(parent,20)
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