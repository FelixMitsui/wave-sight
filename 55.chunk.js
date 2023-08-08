"use strict";(self.webpackChunkwave_sight=self.webpackChunkwave_sight||[]).push([[55],{6800:function(e,t,n){var r=n(7294),a=n(6968);t.Z=function(){return r.createElement(r.Fragment,null,r.createElement("div",{className:"h-100 index-3 opacity-50 position-fixed start-0 top-0 w-100"},r.createElement(a.Z,{className:"bg-black position-relative start-50 top-50",animation:"grow"})))}},1225:function(e,t,n){var r=n(7294),a=n(1555),c=n(6025),o=n(458),l=n(9655),i=n(2679),s=function(e){var t=e.item,s=t._id,u=t.product_category,m=t.product_name,d=t.product_price,f=t.product_images,p=t.product_discount;return r.createElement(r.Fragment,null,r.createElement(a.Z,{className:"d-flex p-1"},s?r.createElement(c.Z,{border:"secondary",className:"border border-light-gray p-1 w-100"},r.createElement(l.rU,{to:"/products/".concat(u,"/").concat(s)},r.createElement(i.LazyLoadImage,{src:f&&f[0],className:"bg-lavender object-fit-fill w-100",style:{aspectRatio:"8/13"}})),r.createElement(c.Z.Body,{className:"p-1"},r.createElement(c.Z.Title,{as:"p",className:"font-content text-break text-gray"},m),p<1?r.createElement("div",{className:"d-flex justify-content-end"},r.createElement(c.Z.Text,{className:"font-content mb-0 mx-1 text-decoration-line-through"},d,"NT$"),r.createElement(c.Z.Text,{className:"font-content fs-6 text-red"},Math.floor(d*p),"NT$")):r.createElement(c.Z.Text,{className:"d-flex font-content justify-content-end"},d,"NT$"))):r.createElement(c.Z,{className:"w-100"},r.createElement(c.Z.Img,{variant:"top",style:{aspectRatio:"8/13"},src:n(5243).Z}),r.createElement(c.Z.Body,{className:"d-flex flex-column"},r.createElement(o.Z,{as:c.Z.Title,animation:"glow"},r.createElement(o.Z,{xs:12,size:"lg"})),r.createElement("div",{className:"d-flex flex-column flex-grow-1 justify-content-end"},r.createElement(o.Z,{as:c.Z.Text,className:"text-end",animation:"glow"},r.createElement(o.Z,{xs:8,size:"lg"})))))))};t.Z=(0,r.memo)(s)},4055:function(e,t,n){n.r(t),n.d(t,{default:function(){return j}});var r=n(885),a=n(7294),c=n(9704),o=n(9807),l=n(4051),i=n(5671),s=n(3144),u=n(7326),m=n(136),d=n(2963),f=n(1120),p=n(4942),g=n(9634);function b(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,f.Z)(e);if(t){var a=(0,f.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,d.Z)(this,n)}}var E=function(e){(0,m.Z)(r,e);var t=b(r);function r(){var e;return(0,i.Z)(this,r),e=t.call(this),(0,p.Z)((0,u.Z)(e),"handleSelectIndex",(function(t,n){e.setState({index:t})})),e.state={index:0},e}return(0,s.Z)(r,[{key:"render",value:function(){return a.createElement(g.Z,{style:{minHeight:"150px"},className:"border border-1 my-1 rounded",activeIndex:this.state.index,onSelect:this.handleSelectIndex},a.createElement(g.Z.Item,null,a.createElement("img",{className:"d-block w-100",src:n(6691).Z,alt:"First slide"})),a.createElement(g.Z.Item,null,a.createElement("img",{className:"d-block w-100",src:n(1019).Z,alt:"Second slide"})),a.createElement(g.Z.Item,null,a.createElement("img",{className:"d-block w-100",src:n(1181).Z,alt:"Third slide"})),a.createElement(g.Z.Item,null,a.createElement("img",{className:"d-block w-100",src:n(2160).Z,alt:"Third slide"})))}}]),r}(a.Component),Z=n(682),y=n(5005),v=n(1225),h=n(5498),x=n(6486);function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(Object(n),!0).forEach((function(t){(0,p.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var P=function(e){var t=e.items,n=(0,a.useState)(document.body.clientWidth),c=(0,r.Z)(n,2),o=c[0],i=c[1],s=(0,a.useState)(),u=(0,r.Z)(s,2),m=u[0],d=u[1],f=(0,a.useState)({currentPage:0,finalPage:0}),p=(0,r.Z)(f,2),g=p[0],b=p[1],E=(0,a.useRef)(null);(0,a.useEffect)((function(){var e=(0,x.debounce)((function(){i((function(e){return document.body.clientWidth}))}),1e3);return N(),window.addEventListener("resize",e),E.current&&d(E.current.getBoundingClientRect().width),function(){window.removeEventListener("resize",e)}}),[o,t]);var N=function(){var e=Object.entries({0:2,576:2,768:3,992:4,1200:5}).reduce((function(e,t){var n=(0,r.Z)(t,2),a=n[0],c=n[1],o=document.body.clientWidth-a;return o>=0&&o<e.diff?{count:c,diff:o}:e}),{count:1,diff:1/0}).count;b((function(n){return{currentPage:0,finalPage:Math.max(0,Math.ceil(t.length/e-1))}}))},P=function(e){console.log(g.finalPage),"prev"===e.currentTarget.name?0!==g.currentPage&&b((function(e){return w(w({},e),{},{currentPage:e.currentPage-1})})):"next"===e.currentTarget.name&&g.currentPage<g.finalPage&&b((function(e){return w(w({},e),{},{currentPage:e.currentPage+1})}))};return a.createElement(Z.Z,{className:"border border-1 border-light-gray mt-2 overflow-hidden p-0 position-relative rounded"},a.createElement(l.Z,{xs:2,sm:2,md:3,lg:4,xl:5,style:{position:"relative",transition:"transform 0.5s ease-in-out",transform:"translateX(".concat(-m*g.currentPage,"px)")},ref:E,className:"d-flex flex-nowrap index-2 m-1 py-1"},null==t?void 0:t.map((function(e){return a.createElement(v.Z,{key:e._id,item:e})}))),a.createElement(y.Z,{name:"prev",onClick:function(e){return P(e)},size:"sm",variant:"secondary",className:"position-absolute top-50 start-0 ".concat(0===g.currentPage?"opacity-50":"none"," index-3")},a.createElement(h.Y4,null)),a.createElement(y.Z,{name:"next",onClick:function(e){return P(e)},size:"sm",variant:"secondary",className:"position-absolute top-50 end-0 ".concat(g.currentPage===g.finalPage?"opacity-50":"none"," index-3")},a.createElement(h.LZ,null)))},O=n(6800),j=function(){var e=(0,c.I0)(),t=(0,c.v9)((function(e){return e.product})),n=t.newProducts,i=t.popularityProducts,s=t.discountProducts,u=(0,a.useState)(!1),m=(0,r.Z)(u,2),d=m[0];m[1];return(0,a.useEffect)((function(){n.length>0||e({type:o.M.GET_CAROUSEL_PRODUCTS_REQUEST,payload:{product_new:!0,product_popularity:!0,product_discount:1}})}),[]),a.createElement(l.Z,{className:"border m-2 min-vh-100 p-2"},d?a.createElement(O.Z,null):null,a.createElement(E,null),a.createElement("div",{className:"border-1 border-bottom border-light-gray mt-2 text-center"},a.createElement("h2",{className:"font-title"},"New Sale")),a.createElement(P,{items:n}),a.createElement("div",{className:"border-1 border-bottom border-light-gray mt-2 text-center"},a.createElement("h2",{className:"font-title"},"Hot Sale")),a.createElement(P,{items:i}),a.createElement("div",{className:"border-1 border-bottom border-light-gray mt-2 text-center"},a.createElement("h2",{className:"font-title"},"Discount")),a.createElement(P,{items:s}))}},6691:function(e,t,n){t.Z=n.p+"public/assets/images/i-banner-fz-20211116-1.jpg"},1019:function(e,t,n){t.Z=n.p+"public/assets/images/i-banner-fz-20211116-3.jpg"},1181:function(e,t,n){t.Z=n.p+"public/assets/images/i-bn20180717-2-07.jpg"},2160:function(e,t,n){t.Z=n.p+"public/assets/images/i-bn20180717-2-09.jpg"},5243:function(e,t,n){t.Z=n.p+"public/assets/images/placeholder.png"}}]);
//# sourceMappingURL=55.chunk.js.map