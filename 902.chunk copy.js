"use strict";(self.webpackChunkwave_sight=self.webpackChunkwave_sight||[]).push([[902],{2902:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var a=n(7294),r=n(2599),l=n(4735),c=n(6438),m=n(9704),o=n(6952),s=n(5147),u=n(7088),i=function(e){var t=e.shopping_cart,n=(0,a.useState)(0),r=n[0],l=n[1],c=(0,a.useCallback)((function(e){l((function(t){return t+e}))}),[]);return a.createElement(a.Fragment,null,a.createElement(s.Z,{striped:!0,bordered:!0,hover:!0,responsive:!0,className:"border-light-gray"},a.createElement("thead",null,a.createElement("tr",{className:"font-content fs-6"},a.createElement("th",null,"No."),a.createElement("th",null,"Image"),a.createElement("th",null,"Name"),a.createElement("th",null,"Color"),a.createElement("th",null,"Size"),a.createElement("th",null,"Quantity"),a.createElement("th",null,"Price"))),a.createElement("tbody",null,null==t?void 0:t.map((function(e,t){return a.createElement(u.Z,{key:e.product_mark,number:t,item:e,onTotalCalculate:c,isEdit:!1})})))),a.createElement("div",{className:"font-content mt-2 text-end"},a.createElement("h4",{className:"fw-bold"},"Totall:",a.createElement("span",{className:"bg-light-blue"},Math.floor(r)),"$")))},d=n(4051),E=n(1555),h=n(9687),g=n(7977),p=n(6025),f=function(){var e=location.pathname.startsWith("/wave-sight")?location.pathname.substring("/wave-sight".length):location.pathname,t=(0,r.fp)(c._,e),s=(0,l.s0)(),u=(0,m.v9)((function(e){return e.user})),f=u.info.user_order,b=u.isLogin,v=localStorage.getItem("loginToken");return(0,a.useEffect)((function(){v||b||s("/")}),[b]),a.createElement(a.Fragment,null,a.createElement(o.Z,{matches:t}),a.createElement("div",{className:"bg-gray"},a.createElement("h1",{className:"font-title mt-2 text-center text-white"},"Order")),a.createElement(d.Z,{className:"border m-2 min-vh-100 p-2 position-relative"},0===(null==f?void 0:f.length)?a.createElement("div",{className:"position-absolute start-0 top-0 end-0"},a.createElement("img",{className:"h-100 w-100",src:n(7719).Z}),a.createElement("h2",{className:"end-0 position-absolute start-0 text-center top-50"},"There are currently no order record.")):null,a.createElement(E.Z,null,null==f?void 0:f.map((function(e,t){return a.createElement(h.Z,{defaultActiveKey:["0"],alwaysOpen:!0},a.createElement(h.Z.Item,{eventKey:String(t)},a.createElement(h.Z.Header,{className:"font-content"},"Order No.",a.createElement(g.Z,{className:"fs-6 me-2",bg:"info"},e.order_id),a.createElement(g.Z,{className:"fs-6",bg:"warning"}," ",e.order_status)),a.createElement(h.Z.Body,null,a.createElement(d.Z,{className:"my-2 p-2"},a.createElement(E.Z,{lg:"7",className:"border border-1 pt-2"},a.createElement(i,{shopping_cart:e.shopping_cart})),a.createElement(E.Z,{lg:"5"}," ",a.createElement(p.Z,{border:"light"},a.createElement(p.Z.Header,{className:"font-title fs-4 text-center"},"Order information"),a.createElement(p.Z.Body,{className:"font-content fs-5 fw-bold"},a.createElement(p.Z.Title,null),a.createElement(p.Z.Text,null,"Name:",a.createElement(g.Z,{className:"bg-light-gray"},e.userName)),a.createElement(p.Z.Text,null,"Email:",a.createElement(g.Z,{className:"bg-light-gray"},e.userEmail)),a.createElement(p.Z.Text,null,"Phone:",a.createElement(g.Z,{className:"bg-light-gray"},e.userPhone)),a.createElement(p.Z.Text,null,"Address:",a.createElement(g.Z,{className:"bg-light-gray"},e.userAddress)),a.createElement("hr",{className:"border-black"}),a.createElement(p.Z.Text,null,"Delivery method:",a.createElement(g.Z,{className:"bg-light-gray"},e.deliveryMethod)),a.createElement(p.Z.Text,null,"Invoice:",a.createElement(g.Z,{className:"bg-light-gray"},e.invoice.type," ",e.invoice.number)," "),a.createElement(p.Z.Text,null,"Pay method:",a.createElement(g.Z,{className:"bg-light-gray"},e.payMethod)),a.createElement("hr",{className:"border-black"}),a.createElement(p.Z.Text,null,"Remark:",a.createElement("span",{className:"fs-6"},e.remark||"No message")))))))))})))))}},6952:function(e,t,n){var a=n(7294),r=n(5412),l=n(9655);t.Z=function(e){var t=location.pathname.startsWith("/wave-sight")?location.pathname.substring("/wave-sight".length):location.pathname;return a.createElement(r.Z,{className:"m-3"},e.matches.map((function(n,c){var m=n.route,o=m.path,s=m.breadcrumbName;return n.pathname===t?a.createElement(r.Z.Item,{className:"font-content fs-5 fw-bold",key:c,active:!0},"Detail"===s?e.name:s):a.createElement(r.Z.Item,{className:"font-content fs-5 fw-bold",key:c},a.createElement(l.OL,{to:o},s))})))}},7088:function(e,t,n){var a=n(885),r=n(7294),l=n(1330),c=n(5005),m=function(e){var t=e.item,n=e.number,m=e.user_id,o=void 0===m?"":m,s=e.onTotalCalculate,u=e.handleItemQuantity,i=void 0===u?null:u,d=e.onDeleteItem,E=void 0===d?null:d,h=e.isEdit,g=void 0===h||h,p=t.product_mark,f=t.product_image,b=t.product_name,v=t.product_color,N=t.product_size,Z=t.product_quantity,y=t.product_discount,_=t.product_price,k=(0,r.useRef)(Z),w=(0,r.useState)(!1),x=(0,a.Z)(w,2),T=x[0],C=x[1];(0,r.useEffect)((function(){s(_*k.current*y)}),[]);var I=function(e){var t=e.target.value;return"+"===t?(k.current>=1&&(k.current++,s(_*y),C(!1)),void i({user_id:o,product_mark:p,product_quantity:k.current})):"-"===t?k.current<=1?void C(!0):(k.current--,s(-_*y),void i({user_id:o,product_mark:p,product_quantity:k.current})):void 0};return r.createElement("tr",{className:"border-light-gray font-content text-center"},r.createElement("th",null,n+1),r.createElement("th",null,r.createElement(l.Z,{fluid:!0,responsive:"md",thumbnail:!0,width:100,height:100,className:"d-block mx-auto",src:f})),r.createElement("th",null,b),r.createElement("th",null,v),r.createElement("th",null,N),r.createElement("th",null,g?r.createElement("div",{className:"d-flex"},r.createElement("input",{className:"btn-gray me-1",type:"button",disabled:T,value:"-",onClick:I}),k.current,r.createElement("input",{className:"btn-gray ms-1",type:"button",value:"+",onClick:I})):k.current),r.createElement("th",null,"NT",Math.floor(_*k.current*y),"$"),g?r.createElement("th",null,r.createElement(c.Z,{className:"border border-1 border-black btn-beige font-content mt-2",onClick:function(){return E({user_id:o,product_mark:p},_*k.current*y)}},"Delete")):null)};function o(e,t){return e.item.product_quantity===t.item.product_quantity}t.Z=(0,r.memo)(m,o)},7719:function(e,t,n){t.Z=n.p+"public/assets/images/empty-order.png"}}]);