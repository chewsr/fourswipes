var Utils = {
  data: {
    curPage: "home"
  },
  leftMargin: () => {
    let dom = document.getElementById('swipe-wrapper')
    let width = dom.offsetWidth
    let height = dom.offsetHeight
    let marginLeft = (height*0.75 - width)/2
    return marginLeft
  },
  preload: (products,callback) => {

      let images = $.map(products, (value, index) => {
        return [value];
      })

      let imgArr = []
      let id = 0
      let total = images.length
      let loaded = 0
      images.map((img)=>{
        imgArr[id] = document.createElement( "img" );
  			imgArr[id].src = img.url;
        imgArr[id].addEventListener('load', () => {
          loaded++
          if (loaded == total) {
            callback()
          }
        })
        id++
      })
  },
  skuProducts: (products) => {
    let newProducts = {}
    products.map((item)=>{
      newProducts[item.sku] = item
    })
    return newProducts
  },
  checkInCart: (sku,cartItems) => {
    return (cartItems.indexOf(sku) > -1) ? true : false
  },
  countCartItems: (cartList) => {
    let count = 0
    for (let sku in cartList) {
      if (typeof cartList[sku] == 'object') count++
    }
    return count
  },
  totalCart: (cartList,products) => {

    let total = 0

    for (let sku in cartList){
      if (typeof cartList[sku] == 'object') {
        total += cartList[sku].quantity * products[sku].price
      }
    }
    return total
  },
  numberFormat: (number,c,d,t) => {
    var n = number,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "")
  }
}

export {Utils}
