function ezbms(s,i){
  //Pre-Double Comma Dimensional Bashicu Matrix System / 2DBMS (hence why it's called "ezbms", because it's easier to implement and understand than BMS). Limit: Lim(BM4). Characters: 684.
  if(!s.length){return i;}
  else if(!s[s.length-1].length||!s[s.length-1][0]){return ezbms(s.slice(0,-1),i+1);}
  else{
    var r = s.findLastIndex((item,index)=>item<s[s.length-1]&&(item[s[s.length-1].length-1]<s[s.length-1][s[s.length-1].length-1]||item[s[s.length-1].length-1]===undefined)&&!s.slice(index+1,s.length).some(item2=>item2<item));
    var g = s.slice(0,r);
    var b = s.slice(r,-1);
    var a = s[s.length-1].map((item,index)=>s[r][index]===undefined?0:index===s[s.length-1].length-1?0:item-s[r][index]);
    var c = [g,b.filter((_,ind)=>ind!==b.length)];
    for(var h=1;h<i;h++){
      c.push(b.map(item=>item.map((item2,id)=>a[id]===undefined?item2:item2+(a[id]*h))));
    }
    return c.flat();
  }
}
function limit(i){
  return [...Array(i+1).keys()].map(item=>[...Array(item).keys()].map(item2=>item-item2));
}
function BMFormat(s){
  return s.map(item=>"("+item+")").join("");
}
function ArrayFormat(s){
  return JSON.parse("["+s.replaceAll(")(","],[").replace("(","[").replace(")","]")+"]");
}
function maxExpand(s,i,m){
  while(s.length<m){
    console.log(BMFormat(s));
    s=ezbms(s,i);
  }
  console.log("Maximum length of "+m+" exceeded. Current length: "+s.length);
  return;
}
function decreaseFrom(s){
  while(s.length){
    console.log(BMFormat(s));
    s=ezbms(s,1);		
    console.clear();
  }
  console.log("Complete!");
  return;
}
function numberOf(s){
  return !s.length?0:s.map(item=>Math.pow(2,item)).reduce((a,c)=>a+c)/2;
}
function matrixOf(s){
  return (s*2).toString(2).split("").reverse().map((item,index)=>item==="1"?index:false).filter(item=>!!item).reverse();
}
function dbmsSeq(s){
  return s.map(item=>item[0]===0?0:numberOf(item));
}
function seqMatrix(s){
  return s.map(item=>item===0?[0]:matrixOf(item));
}
function expandSeq(s,i){
  return dbmsSeq(ezbms(seqMatrix(s),i));
}
function seqDecreaseFrom(s){
  var c = seqMatrix(s);
  while(c.length){
    console.log("("+dbmsSeq(c)+")");
    c=ezbms(c,1);		
    console.clear();
  }
  console.log("Complete!");
  return;
}
module.exports = {ezbms,limit,BMFormat,maxExpand,expandSeq,decreaseFrom,seqDecreaseFrom,numberOf,dbmsSeq,seqMatrix,ArrayFormat}