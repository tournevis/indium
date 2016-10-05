let listManager = {
  size : 10 ,
  id : '',
  liArray : [],
//  liArray.length = this.size,
  create : function(){

  },
  pushTweet : function ( tweetName, screenName, tweetContent) {
    var li = document.createElement('li');
  	var sName = document.createElement('span');
  	var sScreen = document.createElement('span');
  	var sContent = document.createElement('span');
    sName.appendChild(document.createTextNode(tweetName));
    sName.setAttribute("class", "tweetName");
    sScreen.appendChild(document.createTextNode('@' + screenName));
    sScreen.setAttribute("class", "screenName");
  	sContent.appendChild(document.createTextNode(tweetContent));
    sContent.setAttribute("class", "tweetContent");

  	li.appendChild(sName);
  	li.appendChild(sScreen);
  	li.appendChild(sContent);
    for (var i = 0; i < this.size; i++) {
      this.liArray[i+1] = this.liArray[i]
      this.liArray[0] = li

    }
    this.liArray.push(li);
  },
  display : function(id){
    var ul = document.getElementById(id);
    var ulChild = ul.children;
    for (var i = 9; i < ulChild.length; i++) {
      ulChild[i].remove();
    }
    for (var i = 0; i < this.size; i++) {
      ul.appendChild(this.liArray[i]);
    }
  }

}
module.exports = listManager;
