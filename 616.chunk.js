"use strict";(self.webpackChunkwave_sight=self.webpackChunkwave_sight||[]).push([[616],{6952:function(e,t,n){var a=n(7294),r=n(5412),l=n(9655);t.Z=function(e){var t=location.pathname.startsWith("/wave-sight")?location.pathname.substring("/wave-sight".length):location.pathname;return a.createElement(r.Z,{className:"m-3"},e.matches.map((function(n,c){var o=n.route,u=o.path,i=o.breadcrumbName;return n.pathname===t?a.createElement(r.Z.Item,{className:"font-content fs-5 fw-bold",key:c,active:!0},"Detail"===i?e.name:i):a.createElement(r.Z.Item,{className:"font-content fs-5 fw-bold",key:c},a.createElement(l.OL,{to:u},i))})))}},6800:function(e,t,n){var a=n(7294),r=n(6968);t.Z=function(){return a.createElement(a.Fragment,null,a.createElement("div",{className:"h-100 index-3 opacity-50 position-fixed start-0 top-0 w-100"},a.createElement(r.Z,{className:"bg-black position-relative start-50 top-50",animation:"grow"})))}},7088:function(e,t,n){var a=n(885),r=n(7294),l=n(1330),c=n(5005),o=function(e){var t=e.item,n=e.number,o=e.user_id,u=void 0===o?"":o,i=e.onTotalCalculate,m=e.handleItemQuantity,s=void 0===m?null:m,d=e.onDeleteItem,p=void 0===d?null:d,E=e.isEdit,h=void 0===E||E,f=t.product_mark,b=t.product_image,v=t.product_name,g=t.product_color,_=t.product_size,y=t.product_quantity,N=t.product_discount,k=t.product_price,Z=(0,r.useRef)(y),T=(0,r.useState)(!1),w=(0,a.Z)(T,2),C=w[0],I=w[1];(0,r.useEffect)((function(){i(k*Z.current*N)}),[]);var x=function(e){var t=e.target.value;return"+"===t?(Z.current>=1&&(Z.current++,i(k*N),I(!1)),void s({user_id:u,product_mark:f,product_quantity:Z.current})):"-"===t?Z.current<=1?void I(!0):(Z.current--,i(-k*N),void s({user_id:u,product_mark:f,product_quantity:Z.current})):void 0};return r.createElement("tr",{className:"border-light-gray font-content text-center"},r.createElement("th",null,n+1),r.createElement("th",null,r.createElement(l.Z,{fluid:!0,responsive:"md",thumbnail:!0,width:100,height:100,className:"d-block mx-auto",src:b})),r.createElement("th",null,v),r.createElement("th",null,g),r.createElement("th",null,_),r.createElement("th",null,h?r.createElement("div",{className:"d-flex"},r.createElement("input",{className:"btn-gray me-1",type:"button",disabled:C,value:"-",onClick:x}),Z.current,r.createElement("input",{className:"btn-gray ms-1",type:"button",value:"+",onClick:x})):Z.current),r.createElement("th",null,"NT",Math.floor(k*Z.current*N),"$"),h?r.createElement("th",null,r.createElement(c.Z,{className:"border border-1 border-black btn-beige font-content mt-2",onClick:function(){return p({user_id:u,product_mark:f},k*Z.current*N)}},"Delete")):null)};function u(e,t){return e.item.product_quantity===t.item.product_quantity}t.Z=(0,r.memo)(o,u)},4616:function(e,t,n){n.r(t);var a=n(885),r=n(7294),l=n(4051),c=n(1555),o=n(5147),u=n(3199),i=n(7977),m=n(5005),s=n(4735),d=n(2599),p=n(6438),E=n(9704),h=n(1441),f=n(6800),b=n(7088),v=n(6952);t.default=function(){var e=(0,E.I0)(),t=(0,s.s0)(),g=location.pathname.startsWith("/wave-sight")?location.pathname.substring("/wave-sight".length):location.pathname,_=(0,d.fp)(p._,g),y=(0,E.v9)((function(e){return e.user})),N=y.info,k=N._id,Z=N.shopping_cart,T=y.isLogin,w=(0,r.useState)(!1),C=(0,a.Z)(w,2),I=C[0],x=C[1],S=(0,r.useState)(0),Q=(0,a.Z)(S,2),D=Q[0],R=Q[1],q=localStorage.getItem("loginToken");(0,r.useEffect)((function(){q||T||t("/")}),[T]);var A=(0,r.useCallback)((function(e){R((function(t){return t+e}))}),[]),M=(0,r.useCallback)((function(t){x(!0),e({type:h.v.UPDATE_ITEM_QUANTITY_REQUEST,payload:t}),setTimeout((function(){x(!1)}),1e3)}),[]),U=(0,r.useCallback)((function(t,n){R((function(e){return e-n})),e({type:h.v.DELETE_CART_ITEM_REQUEST,payload:t})}),[]);return r.createElement(r.Fragment,null,I?r.createElement(f.Z,null):null,r.createElement(v.Z,{matches:_}),r.createElement("div",{className:"bg-gray"},r.createElement("h1",{className:"border font-title mt-2 text-center text-white"},"Cart")),r.createElement(l.Z,{className:"border m-2  p-2 position-relative"},0===(null==Z?void 0:Z.length)?r.createElement("div",{className:"end-0 position-absolute start-0 top-0"},r.createElement("img",{className:"object-fit-cover w-100",src:n(4145).Z}),r.createElement("h2",{className:"end-0 position-absolute start-0 text-center top-50"},"There are currently no products available.")):null,r.createElement(c.Z,null,0===(null==Z?void 0:Z.length)?null:r.createElement(o.Z,{bordered:!0,hover:!0,striped:!0,responsive:!0,className:"border-light-gray"},r.createElement("thead",null,r.createElement("tr",{className:"font-content text-center"},r.createElement("th",null,"No."),r.createElement("th",null,"Image"),r.createElement("th",null,"Name"),r.createElement("th",null,"Color"),r.createElement("th",null,"Size"),r.createElement("th",null,"Quantity"),r.createElement("th",null,"Price"),r.createElement("th",null,"Edit"))),r.createElement("tbody",null,null==Z?void 0:Z.map((function(e,t){return r.createElement(b.Z,{key:e.product_mark,number:t,user_id:k,item:e,onTotalCalculate:A,handleItemQuantity:M,onDeleteItem:U})}))))),r.createElement(u.Z,{direction:"horizontal",gap:3,className:"d-flex fs-2 justify-content-end mt-2"},r.createElement(i.Z,{className:"bg-deep-gray font-content"},"Totall:",Math.floor(D),"$"),r.createElement(m.Z,{size:"sm",className:"bg-beige border border-black font-btn fs-5 fw-bold text-black",onClick:function(){0!==Z.length?t("/user/checkout"):e({type:h.v.WARNING_MESSAGE_REQUEST,payload:"Cart is empty."})}},"Confirm"))))}},4145:function(e,t,n){t.Z=n.p+"public/assets/images/empty-cart-icon.png"}}]);
//# sourceMappingURL=616.chunk.js.map