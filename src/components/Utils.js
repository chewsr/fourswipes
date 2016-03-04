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
  preload: (images,callback) => {
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
  }
}

export {Utils}
