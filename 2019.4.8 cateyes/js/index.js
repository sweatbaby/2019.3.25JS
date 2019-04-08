// 获取元素
let selectBox = document.getElementById('selection'),
    linkList = selectBox.getElementsByTagName('li'),
    listBox = document.getElementById('products'),
    productList = listBox.getElementsByTagName('ul');

let productData = null;

// ajax 获取数据
let xhr = new XMLHttpRequest();
xhr.open('GET','json/movie.json',false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        productData = xhr.responseText;
    }
}
xhr.send(null);

// 解析数据
productData = JSON.parse(productData);
let { data: { list = [] }} = productData;
// console.log(productData);

// 数据绑定

let str = ``;
for (let i = 0;i < list.length;i++) {
    let item = list[i];
    str += `<ul 
                pFang="${item.boxInfo}"
                pFb="${item.boxRate}"
                pPb="${item.showRate}"
                seatB="${item.seatRate}"
                class="products clearfix" 
                id="products">
                <li><p>${item.movieName}</p><p>${item.releaseInfo} ${item.splitSumBoxInfo}</p></li>
                <li>${item.boxInfo}</li>
                <li>${item.boxRate}</li>
                <li>${item.showRate}</li>
                <li>${item.seatRate}</li>
            </ul>
            `
}
listBox.innerHTML = str;
// console.log(listBox);
let sortList = function (that,index) {
    let productAry = [...productList];
    let aInn,bInn;
    let ary = ['pFang','pFb','pPb','seatB'];
    productAry.sort((a,b) => {
        aInn = a.getAttribute(ary[index-1]);
        bInn = b.getAttribute(ary[index-1]);
        let reg = /%/g;
        let reg1 = /^</;
        if (index !== 1) {
            aInn = aInn.replace(reg,'');
            bInn = bInn.replace(reg,'');
        }
        if (reg1.test(aInn)) {
            aInn = 0;
        }
        if (reg1.test(bInn)) {
            bInn = 0;
        }
        return (aInn - bInn) * that.flag;
    });
    for (let i = 0;i < productAry.length;i++) {
        listBox.appendChild(productAry[i]);
    }
}
for (let j = 1;j < 5;j++) {
    linkList[j].flag = -1;
    linkList[j].index = j;
    linkList[j].onclick = function () {
        for (k = 1;k < 5;k++) {
            if (linkList[j] !== this) {
                linkList[j].flag = -1;
            }
        }
        this.flag *= -1;
        sortList(this,j);
    }
}