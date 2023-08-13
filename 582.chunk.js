"use strict";(self.webpackChunkwave_sight=self.webpackChunkwave_sight||[]).push([[582],{5798:function(e,t,a){a.d(t,{U:function(){return n}});var n=function(e){var t={white:"#FFFFFF",black:"#000000",gray:"#808080",glue:"#0000FF","dark-blue":"#00008a","dark-turquoise":"#00ced1",denim:"#1560BD",navy:"#000080",red:"#FF0000",purple:"#800080",violet:"#8B00FF",lavender:"#e6e6fa",pink:"#FFC0CB",yellow:"#FFFF00",beige:"#f5f5dc",orange:"#FFA500",brown:"#A52A2A",coffee:"#4D3900",khaki:"#f0e68c","khaki-green":"#8A865D",green:"#00FF00",olive:"#808000","light-green":"#90EE90","light-blue":"#ADD8E6",cyan:"#00FFFF"};if(void 0!==t[e]){for(var a=[],n=t[e].substring(1),r=0;r<n.length;r++)a.push(parseInt(n.slice(r,r+2),16)),r++;return a[0]+a[1]+a[2]>384}}},6800:function(e,t,a){var n=a(7294),r=a(6968);t.Z=function(){return n.createElement(n.Fragment,null,n.createElement("div",{className:"h-100 index-3 opacity-50 position-fixed start-0 top-0 w-100"},n.createElement(r.Z,{className:"bg-black position-relative start-50 top-50",animation:"grow"})))}},5582:function(e,t,a){a.r(t),a.d(t,{default:function(){return P}});var n=a(7462),r=a(885),l=a(7294),c=a(9704),o=a(4735),i=a(4051),m=a(1555),s=a(4564),u=a(5005),d=a(1054),f=a(9501),p=a(1330),h=a(8379),E=a.n(h),g=a(5498),v=function(e){var t=e.imagesFile,a=void 0===t?[]:t,n=e.remove;return l.createElement(i.Z,null,null==a?void 0:a.map((function(e){return l.createElement(m.Z,{sm:3,md:3,lg:3,key:E()(),className:"mt-2 position-relative"},l.createElement("div",{className:"position-absolute start-80",onClick:function(){return function(e){var t=a.indexOf(e);n(t)}(e)}},l.createElement(g.aM,{viewBox:"0 0 18 18",width:"30",height:"30"})),l.createElement("div",{className:"d-flex justify-content-center py-2"},l.createElement(p.Z,{thumbnail:!0,width:100,height:100,className:"",src:e.imageUrl||e})))})))},b=a(6800),x=["blue","white","black","gray","dark-blue","denim","navy","red","purple","violet","lavender","pink","yellow","beige","orange","brown","coffee","khaki","khaki-green","green","olive","light-green","cyan"],y=["S","M","L","XL","2XL","ONE-SIZE"],N=["men","women","kid","other"],Z=["shirt","coat","hat","bag"],w=a(5987),F=["onChange"],k=function(e){var t=e.onChange,a=void 0===t?function(){}:t,n=(0,w.Z)(e,F),r=n.accept,c=n.multiple,o=(0,l.useRef)();return l.createElement(l.Fragment,null,l.createElement(s.Z.Control,{type:"file",style:{display:"none"},onChange:function(e){a(e),o.current.value=null},ref:o,accept:r||void 0,multiple:c||!1}),l.createElement(u.Z,{variant:"outlined",onClick:function(){return o.current.click()}},l.createElement(g.rG,{viewBox:"0 0 18 18",width:"30",height:"30"}),l.createElement("h6",{className:"font-content"},"Upload")))},C=function(e){for(var t=e.event,a=e.fieldName,n=e.setFieldValue,r=e.values,l=function(e){var t=new FileReader;t.onload=function(){r.push({imageUrl:t.result,imageFile:e}),n(a,r)},t.readAsDataURL(e)},c=0,o=Array.from(t.target.files);c<o.length;c++){l(o[c])}},_=a(5798),S=a(5227);function B(e,t){var a="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=function(e,t){if(!e)return;if("string"==typeof e)return L(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return L(e,t)}(e))||t&&e&&"number"==typeof e.length){a&&(e=a);var n=0,r=function(){};return{s:r,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,c=!0,o=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return c=e.done,e},e:function(e){o=!0,l=e},f:function(){try{c||null==a.return||a.return()}finally{if(o)throw l}}}}function L(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var R=f.Ry().shape({nameText:f.Z_().required("required!").min(8,"Words cannot be less than 8!").max(30,"Words should be less than 30!"),colorsCheckBox:f.IX().of(f.Z_()).min(1,"required!"),sizesCheckBox:f.IX().min(1,"required!"),categoryRadio:f.Z_().required("required!"),partRadio:f.Z_().required("required!"),priceText:f.Rx().required("required!"),imagesFile:f.IX().of(f.nK().test("fileFormat","Invalid file format",(function(e){if(e instanceof FileList){for(var t=0;t<e.length;t++){if(!e.item(t).type.includes("image/"))return!1}return!0}return!0}))).min(1,"Picture is required!").required("Required!"),contentTextarea:f.Z_().required("required!").min(50,"Words cannot be less than 50!").max(550,"Words should be less than 550!")}),P=function(e){var t=e.item,a=e.isDisplay,f=e.onCloseInterface,p=(0,c.v9)((function(e){return e.manage})).isLoading,h=(0,c.I0)(),E=(0,o.s0)(),w=t||{},F=w._id,L={nameText:w.product_name||"",colorsCheckBox:w.product_colors||[],sizesCheckBox:w.product_sizes||[],categoryRadio:w.product_category||[],partRadio:w.product_part||"",priceText:w.product_price||"",isSaleSwitch:w.product_sale||!1,isNewSwitch:w.product_new||!1,isPopularSwitch:w.product_popularity||!1,imagesFile:w.product_images||[],contentTextarea:w.product_content||"",detailImagesFile:w.product_detail_images||[]},P={accept:"image/*",multiple:!0};return l.createElement(l.Fragment,null,p?l.createElement(b.Z,null):null,l.createElement("div",{className:"bg-gray"},l.createElement("h1",{className:"border font-title mt-2 text-center text-white"},"Create Product")),l.createElement(i.Z,{className:"border m-2 min-vh-100 p-2"},l.createElement(m.Z,null,l.createElement(d.J9,{initialValues:L,validationSchema:R,onSubmit:function(e){for(var t=new FormData,a={product_name:e.nameText,product_category:e.categoryRadio,product_part:e.partRadio,product_price:e.priceText,product_new:e.isNewSwitch,product_popularity:e.isPopularSwitch,product_sale:e.isSaleSwitch,product_content:e.contentTextarea},n=0,l=Object.entries(a);n<l.length;n++){var c=(0,r.Z)(l[n],2),o=c[0],i=c[1];t.append(o,i)}var m,s=B(e.colorsCheckBox);try{for(s.s();!(m=s.n()).done;){var u=m.value;t.append("product_colors",u)}}catch(e){s.e(e)}finally{s.f()}var d,p=B(e.sizesCheckBox);try{for(p.s();!(d=p.n()).done;){var g=d.value;t.append("product_sizes",g)}}catch(e){p.e(e)}finally{p.f()}var v,b=B(e.imagesFile);try{for(b.s();!(v=b.n()).done;){var x=v.value;x.imageFile?t.append("product_images",x.imageFile):t.append("product_images",x)}}catch(e){b.e(e)}finally{b.f()}F?(h({type:S.y.UPDATE_PRODUCT_REQUEST,payload:{product_id:F,productInfo:t}}),f()):(h({type:S.y.CREATE_PRODUCT_REQUEST,payload:t}),E("/manage"))}},(function(e){var t=e.handleSubmit;e.isSubmitting;return l.createElement(s.Z,{onSubmit:t},l.createElement(s.Z.Group,null,l.createElement(s.Z.Label,{column:!0,sm:!0,md:"auto",className:"font-content fs-5 me-1"},"Product Name :"),l.createElement(d.gN,{type:"text",name:"nameText",placeholder:" product name"}),l.createElement(d.Bc,{name:"nameText"},(function(e){return l.createElement(s.Z.Label,{className:"d-flex fw-bold me-1 text-red"},e)}))),l.createElement("hr",null),l.createElement(s.Z.Group,{className:"d-flex flex-wrap  mt-2"},l.createElement(s.Z.Label,{className:"font-content fs-5 me-1"},"Product Color :"),l.createElement(d.gN,{name:"colorsCheckBox"},(function(e){var t=e.field,a=e.form.values;return x.map((function(e){return l.createElement(s.Z.Check,(0,n.Z)({key:e,type:"checkbox",label:e,checked:-1!=a.colorsCheckBox.indexOf(e),className:"m-2 font-content px-3 border bg-".concat(e," ").concat((0,_.U)(e)?"text-black":"text-white"),rows:3},t,{value:e}))}))})),l.createElement(d.Bc,{name:"colorsCheckBox"},(function(e){return l.createElement(s.Z.Label,{className:"d-flex fw-bold me-1 text-red"},e)}))),l.createElement("hr",null),l.createElement(s.Z.Group,{className:"d-flex flex-row mt-2"},l.createElement(s.Z.Label,{className:"font-content fs-5 me-2"},"Product Size :"),l.createElement(d.gN,{name:"sizesCheckBox"},(function(e){var t=e.field,a=e.form.values;return y.map((function(e){return l.createElement(s.Z.Check,(0,n.Z)({key:e,type:"checkbox",label:e,checked:-1!=a.sizesCheckBox.indexOf(e),className:"font-content me-2"},t,{value:e}))}))})),l.createElement(d.Bc,{name:"sizesCheckBox"},(function(e){return l.createElement(s.Z.Label,{className:"d-flex fw-bold me-1 text-red"},e)}))),l.createElement("hr",null),l.createElement(s.Z.Group,{className:"d-flex flex-row mt-2"},l.createElement(s.Z.Label,{className:"font-content fs-5 me-2"},"Product Category :"),l.createElement(d.gN,{name:"categoryRadio"},(function(e){var t=e.field,a=e.form.values;return N.map((function(e){return l.createElement(s.Z.Check,(0,n.Z)({key:e,type:"radio",label:e[0].toUpperCase()+e.slice(1),checked:-1!=a.categoryRadio.indexOf(e),className:"font-content me-2"},t,{value:e}))}))})),l.createElement(d.Bc,{name:"categoryRadio"},(function(e){return l.createElement(s.Z.Label,{className:"d-flex fw-bold me-1 text-red"},e)}))),l.createElement("hr",null),l.createElement(s.Z.Group,{className:"d-flex flex-row mt-2"},l.createElement(s.Z.Label,{className:"font-content fs-5 me-2"},"Product Part :"),l.createElement(d.gN,{name:"partRadio"},(function(e){var t=e.field,a=e.form.values;return Z.map((function(e){return l.createElement(s.Z.Check,(0,n.Z)({key:e,type:"radio",label:e[0].toUpperCase()+e.slice(1),checked:-1!=a.partRadio.indexOf(e),className:"font-content me-2"},t,{value:e}))}))})),l.createElement(d.Bc,{name:"partRadio"},(function(e){return l.createElement(s.Z.Label,{className:"d-flex fw-bold me-1 text-red"},e)}))),l.createElement("hr",null),l.createElement(s.Z.Group,{className:"mb-3"},l.createElement(s.Z.Label,{className:"font-content fs-5 me-2"},"Product Price :"),l.createElement(d.gN,{name:"priceText",type:"text",placeholder:" price number"}),l.createElement(d.Bc,{name:"priceText"},(function(e){return l.createElement(s.Z.Label,{className:"d-flex fw-bold me-1 text-red"},e)}))),l.createElement("hr",null),l.createElement(s.Z.Group,{className:"d-flex mb-3"},l.createElement(s.Z.Label,{className:"font-content fs-5"},"Status"),l.createElement(d.gN,{name:"isSaleSwitch"},(function(e){var t=e.field,a=e.form.values;return l.createElement(s.Z.Check,(0,n.Z)({type:"switch",checked:a.isSaleSwitch,className:"font-content ms-2"},t))}))),l.createElement(s.Z.Group,{className:"d-flex mb-3"},l.createElement(s.Z.Label,{className:"font-content fs-5"},"New Product"),l.createElement(d.gN,{name:"isNewSwitch"},(function(e){var t=e.field,a=e.form.values;return l.createElement(s.Z.Check,(0,n.Z)({type:"switch",checked:a.isNewSwitch,className:"ms-2"},t))}))),l.createElement("hr",null),l.createElement(s.Z.Group,{className:"d-flex mb-3"},l.createElement(s.Z.Label,{className:"font-content fs-5"},"Popular"),l.createElement(d.gN,{name:"isPopularSwitch"},(function(e){var t=e.field,a=e.form.values;return l.createElement(s.Z.Check,(0,n.Z)({type:"switch",checked:a.isPopularSwitch,className:"ms-2"},t))}))),l.createElement("hr",null),l.createElement(s.Z.Group,{className:"mb-3"},l.createElement(s.Z.Label,{className:"font-content fs-5 me-2"},"Product Images :"),l.createElement(d.gN,{name:"imagesFile"},(function(e){e.field;var t=e.form,a=t.values,r=t.setFieldValue;return l.createElement(k,(0,n.Z)({},P,{onChange:function(e){return C({event:e,fieldName:"imagesFile",setFieldValue:r,values:a.imagesFile})}}))})),l.createElement(d.Bc,{name:"imagesFile"},(function(e){return l.createElement(s.Z.Label,{className:"d-flex fw-bold me-1 text-red"},e)})),l.createElement(d.F2,{name:"imagesFile"},(function(e){var t=e.remove,a=e.form,n=a.values,r=a.setFieldValue;return l.createElement(v,{imagesFile:n.imagesFile,setFieldValue:r,remove:t})}))),l.createElement(s.Z.Group,{className:"mb-3"},l.createElement(s.Z.Label,{className:"font-content fs-5 me-2"},"Product Detail :"),l.createElement(d.gN,{name:"contentTextarea"},(function(e){var t=e.field;return l.createElement(s.Z.Control,(0,n.Z)({as:"textarea",rows:3},t))})),l.createElement(d.Bc,{name:"contentTextarea"},(function(e){return l.createElement(s.Z.Label,{className:"d-flex fw-bold me-1 text-red"},e)}))),l.createElement(s.Z.Group,{className:"mb-3"},l.createElement(s.Z.Label,{className:"font-content fs-5 me-2"},"Detail Images:"),l.createElement(d.gN,{name:"detailImagesFile"},(function(e){e.field;var t=e.form,a=t.values,r=t.setFieldValue;return l.createElement(k,(0,n.Z)({},P,{onChange:function(e){return C({event:e,fieldName:"detailImagesFile",setFieldValue:r,values:a.detailImagesFile})}}))})),l.createElement(d.Bc,{name:"detailImagesFile"},(function(e){return l.createElement(s.Z.Label,{className:"d-flex fw-bold me-1 text-red"},e)})),l.createElement(d.F2,{name:"detailImagesFile"},(function(e){var t=e.remove,a=e.form,n=a.values,r=a.setFieldValue;return l.createElement(v,{imagesFile:n.detailImagesFile,setFieldValue:r,remove:t})}))),l.createElement(u.Z,{type:"submit",variant:"secondary",className:"font-btn fs-5"},"Create Product"))})),a?l.createElement(g.Xx,{className:"end--50 position-relative",onClick:function(){return f()},viewBox:"0 0 18 18",width:"33",height:"33"}):null)))}}}]);
//# sourceMappingURL=582.chunk.js.map