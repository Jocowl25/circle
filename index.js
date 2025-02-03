let text=[
"abcdefghijkl",
"abcdefghijhh",
"abcdefghijhh",
"abcdefghijkl",
"abcdefghijhh",
"abcdefghijhh",
]
document.querySelectorAll('.parent').forEach((parent,i)=>{
generate(text[i],parent)
parent.style.transform=`scale(${((i+1)**1.1)*1})`
})
function generate(text,parent){
text = text.replace(/\s/g, "");
const len = text.length;
const angle = 360 / len;
for (let i = 0; i < len; i++) {
    paragraph = document.createElement("p");
    paragraph.className = "para";
    paragraph.style = "transform:rotate(" + (360 / len) * i + "deg);";
    charNode = document.createTextNode(text.charAt(i));
    paragraph.appendChild(charNode);
    parent.appendChild(paragraph);
}
}