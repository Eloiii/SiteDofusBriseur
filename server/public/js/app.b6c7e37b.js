(function(e){function t(t){for(var n,c,s=t[0],o=t[1],u=t[2],f=0,m=[];f<s.length;f++)c=s[f],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&m.push(r[c][0]),r[c]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);l&&l(t);while(m.length)m.shift()();return i.push.apply(i,u||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,s=1;s<a.length;s++){var o=a[s];0!==r[o]&&(n=!1)}n&&(i.splice(t--,1),e=c(c.s=a[0]))}return e}var n={},r={app:0},i=[];function c(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.m=e,c.c=n,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(a,n,function(t){return e[t]}.bind(null,n));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],o=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var l=o;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-main",[a("router-view")],1)],1)},i=[],c={name:"App",data:function(){return{}}},s=c,o=a("2877"),u=a("6544"),l=a.n(u),f=a("7496"),m=a("f6c4"),h=Object(o["a"])(s,r,i,!1,null,null,null),p=h.exports;l()(h,{VApp:f["a"],VMain:m["a"]});var v=a("f309");n["a"].use(v["a"]);var d=new v["a"]({}),g=a("8c4f"),b=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-main",[a("v-row",{staticStyle:{"padding-top":"20px"},attrs:{align:"center",justify:"center"}},[a("h1",{staticClass:"display-4"},[e._v("Met toi bien frerot")])]),a("v-row",{staticStyle:{"padding-top":"100px"},attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12",sm:"5"}},[a("v-card",{attrs:{elevation:"7"}},[a("v-card-title",[e._v(" Choisi un item ")]),a("v-card-actions",[a("v-autocomplete",{attrs:{"auto-select-first":"",clearable:"",items:e.items,"item-text":"name","search-input":e.itemRecherche,label:"Item",placeholder:"Recherche un item"},on:{"update:searchInput":function(t){e.itemRecherche=t},"update:search-input":function(t){e.itemRecherche=t},"click:clear":e.clearTable}},[a("div",{attrs:{slot:"prepend-item"},slot:"prepend-item"},[a("v-dialog",{attrs:{persitent:""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,r=t.attrs;return[a("v-btn",e._g(e._b({attrs:{text:"",block:""},on:{click:function(t){e.dialog=!0}}},"v-btn",r,!1),n),[e._v(" Ajouter item ")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("AddItem",{model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}})],1)],1)])],1)],1)],1)],1),a("v-row",{staticStyle:{"padding-top":"50px"},attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12",sm:"5"}},[this.isItemRecherche?a("v-text-field",{attrs:{outlined:"",label:"Coefficient",rules:[e.reglesCoef.required],"prepend-inner-icon":"mdi-percent","append-icon":"mdi-content-save"},on:{"click:append":e.updateCoef},model:{value:e.coef,callback:function(t){e.coef=t},expression:"coef"}}):e._e(),a("v-snackbar",{scopedSlots:e._u([{key:"action",fn:function(t){var n=t.attrs;return[a("v-btn",e._b({attrs:{color:"pink",text:""},on:{click:function(t){e.snackbar=!1}}},"v-btn",n,!1),[e._v(" Fermer ")])]}}]),model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v(" Coefficient enregistré ! ")])],1)],1),a("v-row",{staticStyle:{"padding-top":"50px"},attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12",sm:"8"}},[a("v-data-table",{staticClass:"elevation-2",attrs:{headers:e.headers,items:e.itemTable,"disable-pagination":"","hide-default-footer":!0},scopedSlots:e._u([{key:"item.prixFocus",fn:function(t){return[a("v-chip",{attrs:{color:e.sortPrix(t.item.prixFocus),dark:""}},[e._v(" "+e._s(t.item.prixFocus)+" ")])]}},{key:"item.prixUnit",fn:function(t){return[a("v-edit-dialog",{attrs:{large:"",persistent:""},on:{save:function(a){return e.save({prix:e.newPrix,caracName:t.item.caracName})}},scopedSlots:e._u([{key:"input",fn:function(){return[a("div",{staticClass:"mt-4 title"},[e._v("Changer le prix de la rune")]),a("v-text-field",{attrs:{hint:"Nouveau prix","single-line":"",autofocus:""},model:{value:e.newPrix,callback:function(t){e.newPrix=t},expression:"newPrix"}})]},proxy:!0}],null,!0)},[a("div",[e._v(e._s(t.item.prixUnit))])])]}}])})],1)],1),a("v-row",{staticStyle:{"padding-top":"50px"},attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12",sm:"8"}})],1)],1)],1)},x=[],y=a("2909"),R=a("b85c"),k=a("1da1"),P=(a("b0c0"),a("b64b"),a("2ca0"),a("99af"),a("96cf"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-dialog",{attrs:{persistent:"",value:e.value,width:"1000"}},[a("v-card",{attrs:{"max-width":"1000"}},[a("v-card-title",[e._v("Ajouter un item")]),a("v-card-text",[a("v-form",{ref:"form",attrs:{"lazy-validation":""}},[a("v-text-field",{attrs:{label:"Nom",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._l(e.listCaracs,(function(t,n){return a("div",{key:n},[a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"18",md:"5"}},[a("v-autocomplete",{attrs:{"auto-select-first":"",clearable:"",items:e.items,label:"Caracteristique"},model:{value:t.caracName,callback:function(a){e.$set(t,"caracName",a)},expression:"carac.caracName"}})],1),a("v-col",{attrs:{cols:"18",md:"5"}},[a("v-text-field",{attrs:{label:"Valeur",required:""},model:{value:t.caracValue,callback:function(a){e.$set(t,"caracValue",a)},expression:"carac.caracValue"}})],1),a("v-col",{staticStyle:{"padding-top":"30px"},attrs:{cols:"18",md:"1"}},[a("v-btn",{attrs:{depressed:"",small:"",dark:""},on:{click:function(t){return e.removeCarac(n)}}},[a("v-icon",{attrs:{dark:"",left:""}},[e._v(" mdi-minus-circle ")]),e._v(" Retirer ")],1)],1)],1)],1)}))],2)],1),a("v-card-actions",[e.listCaracs.length>0?a("v-btn",{attrs:{color:"success"},on:{click:function(t){e.addItem(),e.$emit("input",!1)}}},[e._v("Ajouter l'item")]):e._e(),a("v-spacer"),a("v-btn",{on:{click:e.addCarac}},[e._v("Ajouter une caracteristique")]),a("v-spacer"),a("v-btn",{attrs:{elevation:"3",color:"error"},on:{click:function(t){return e.$emit("input",!1)}}},[e._v("Fermer")])],1)],1)],1)}),w=[],C=(a("a434"),a("d4ec")),V=a("bee2"),j=(a("d3b7"),a("bc3a")),N=a.n(j),F="/api/posts",T="/api/posts/coef",O=function(){function e(){Object(C["a"])(this,e)}return Object(V["a"])(e,null,[{key:"getRunes",value:function(){return new Promise((function(e,t){N.a.get(F).then((function(t){var a=t.data;e(a)})).catch((function(e){t(e)}))}))}},{key:"getAllEquipments",value:function(){return new Promise((function(e,t){N.a.get("https://fr.dofus.dofapi.fr/equipments").then((function(t){var a=t.data;e(a)})).catch((function(e){t(e)}))}))}},{key:"getAllWeapons",value:function(){return new Promise((function(e,t){N.a.get("https://fr.dofus.dofapi.fr/weapons").then((function(t){var a=t.data;e(a)})).catch((function(e){t(e)}))}))}},{key:"insertRune",value:function(e){return N.a.post(F,{text:e})}},{key:"getCoefs",value:function(){return new Promise((function(e,t){N.a.get(T).then((function(t){var a=t.data;e(a)})).catch((function(e){t(e)}))}))}},{key:"updateCoef",value:function(e){return N.a.post(T,{itemEtCoef:e})}}]),e}(),_=O,q={name:"add-item",props:["value"],methods:{addItem:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var a,n,r,i,c,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a={},a["name"]=e.name,n=Object(R["a"])(e.listCaracs);try{for(n.s();!(r=n.n()).done;)i=r.value,c=i.caracName,s=i.caracValue,a[c]=s}catch(o){n.e(o)}finally{n.f()}return t.next=6,_.insertPost(a);case 6:case"end":return t.stop()}}),t)})))()},addCarac:function(){this.listCaracs.push({caracName:"",caracValue:""})},removeCarac:function(e){this.listCaracs.splice(e,1)}},data:function(){return{name:"",listCaracs:[],items:["PA","PM","Initiative","Vitalité","PO","Invocation","Prospection","Sagesse","Force","Intelligence","Chance","Agilité","Esquive PA","Esquive PM","Tacle","Fuite","Puissance","Dommages","Dommages Terre","Dommages Feu","Dommages Eau","Dommages Air","Dommages Neutre","Dommages distance","Dommages poussée","Dommages pièges","Dommages mêlée","Dommages sort","Pods","Critiques","Soins","Renvoi","Resistance Poussée","Resistance % Terre","Resistance % Feu","Resistance % Eau","Resistance % Air","Resistance % Neutre","Resistance fixe Terre","Resistance fixe Feu","Resistance fixe Eau","Resistance fixe Air","Resistance fixe Neutre","Esquive PA","Esquive PM","Retrait PA"]}}},A=q,S=a("c6a6"),I=a("8336"),M=a("b0af"),D=a("99d9"),E=a("62ad"),W=a("169a"),U=a("4bd4"),$=a("132d"),L=a("0fd9"),B=a("2fa4"),J=a("8654"),z=Object(o["a"])(A,P,w,!1,null,null,null),H=z.exports;l()(z,{VAutocomplete:S["a"],VBtn:I["a"],VCard:M["a"],VCardActions:D["a"],VCardText:D["b"],VCardTitle:D["c"],VCol:E["a"],VDialog:W["a"],VForm:U["a"],VIcon:$["a"],VRow:L["a"],VSpacer:B["a"],VTextField:J["a"]});var Q={components:{AddItem:H},data:function(){return{dialog:!1,itemRecherche:"",headers:[{text:"Caractéristique",value:"caracName"},{text:"Valeur",value:"caracValue"},{text:"Prix unitaire",value:"prixUnit"},{text:"Quantité (Focus)",value:"qtFocus"},{text:"Prix (Focus)",value:"prixFocus"},{text:"Aucun Focus",value:"qtNoFocus"}],itemTable:[],items:[],equipements:[],weapons:[],runesData:[],newPrix:0,coef:100,coefs:[],snackbar:!1,itemLevel:0,imageLink:"",isItemRecherche:!1,maxPrix:-5,reglesCoef:{required:function(e){return!!e||"Nécessaire."}}}},methods:{sortPrix:function(e){if(console.log(e,this.maxPrix),e>=this.maxPrix)return this.maxPrix=e,"green"},clearTable:function(){this.itemTable=[],this.isItemRecherche=!1,this.maxPrix=-5},save:function(e){var t=this,a=e.caracName,n=e.prix;_.insertRune({carac:a,prix:parseInt(n)}).then((function(){t.getRunes().then((function(){t.maxPrix=-5,t.displayItemStats(t.getItem(t.itemRecherche))}))}))},getRunes:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,_.getRunes();case 3:e.runesData=t.sent,t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](0),console.log(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()},getItem:function(e){var t,a=Object(R["a"])(this.items);try{for(a.s();!(t=a.n()).done;){var n=t.value;if(n.name===e)return n}}catch(r){a.e(r)}finally{a.f()}},getRunePrix:function(e){var t,a=Object(R["a"])(this.runesData);try{for(a.s();!(t=a.n()).done;){var n=t.value;if(n.carac===e)return n.prix}}catch(r){a.e(r)}finally{a.f()}},displayItemStats:function(e){this.itemTable=[];var t,a=Object(R["a"])(e.statistics);try{for(a.s();!(t=a.n()).done;){var n=t.value,r=Object.keys(n),i=r[0],c=/^[0-99]+%/,s=n[i].min;if(s>=0&&!i.startsWith("(")){c.test(i)&&(i=i.substr(1,i.length));var o=this.getRunePrix(i),u={caracName:i,caracValue:s,prixUnit:o};this.itemTable.push(u)}}}catch(l){a.e(l)}finally{a.f()}this.fillTableWithCalculations(),this.fillNoFocus()},getCoefs:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,_.getCoefs();case 3:e.coefs=t.sent,t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](0),console.log(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()},setCoef:function(e){var t,a=Object(R["a"])(this.coefs);try{for(a.s();!(t=a.n()).done;){var n=t.value;n.nom===e&&(this.coef=n.coef)}}catch(r){a.e(r)}finally{a.f()}},updateCoef:function(){var e=this;_.updateCoef({nom:this.itemRecherche,coef:parseInt(this.coef)}).then((function(){e.getCoefs(),e.snackbar=!0,e.displayItemStats(e.getItem(e.itemRecherche))}))},calculateNoFocusPrice:function(){var e,t=Object(R["a"])(this.itemTable);try{for(t.s();!(e=t.n()).done;){var a=e.value;Math.floor(this.quantityNoFocus(a))*this.getRunePrix(a.caracName)}}catch(n){t.e(n)}finally{t.f()}},calculateMaxFocusValue:function(){var e,t=0,a=Object(R["a"])(this.itemTable);try{for(a.s();!(e=a.n()).done;){var n=e.value;t=Math.max(t,Math.floor(this.quantityFocus(n))*this.getRunePrix(n.caracName))}}catch(r){a.e(r)}finally{a.f()}console.log(t)},getUnitWeight:function(e){var t,a=Object(R["a"])(this.runesData);try{for(a.s();!(t=a.n()).done;){var n=t.value;if(n.carac===e)return n.poidsUnité}}catch(r){a.e(r)}finally{a.f()}},getRuneWeight:function(e){var t,a=Object(R["a"])(this.runesData);try{for(a.s();!(t=a.n()).done;){var n=t.value;if(n.carac===e)return n.poidsRune}}catch(r){a.e(r)}finally{a.f()}},quantityNoFocus:function(e){return Math.round(e.caracValue*this.getUnitWeight(e.caracName)/this.getRuneWeight(e.caracName)*this.itemLevel*.025*this.coef/100*.55*100)/100},getTotalWeight:function(){var e,t=0,a=Object(R["a"])(this.itemTable);try{for(a.s();!(e=a.n()).done;){var n=e.value;t+=n.caracValue*this.getUnitWeight(n.caracName)}}catch(r){a.e(r)}finally{a.f()}return t},quantityFocus:function(e){var t=Math.round((this.getTotalWeight()+e.caracValue*this.getUnitWeight(e.caracName))/2/this.getRuneWeight(e.caracName)*this.itemLevel*.025*(this.coef/100)*.55*100)/100;return console.log((Math.round(t)-t)/t*100,t),t-Math.floor(t)<.5?Math.floor(t):(Math.round(t)-t)/t*100>=2?Math.round(t):t},setPrix:function(e){return Math.round(this.quantityFocus(e)*this.getRunePrix(e.caracName))},fillTableWithCalculations:function(){for(var e=0;e<this.itemTable.length;e++){var t={caracName:this.itemTable[e].caracName,caracValue:this.itemTable[e].caracValue,prixUnit:this.itemTable[e].prixUnit,qtFocus:this.quantityFocus(this.itemTable[e]),prixFocus:this.setPrix(this.itemTable[e]),qtNoFocus:this.quantityNoFocus(this.itemTable[e])};this.itemTable[e]=t}},fillNoFocus:function(){var e,t=0,a=Object(R["a"])(this.itemTable);try{for(a.s();!(e=a.n()).done;){var n=e.value;t+=Math.round(this.getRunePrix(n.caracName)*this.quantityNoFocus(n))}}catch(i){a.e(i)}finally{a.f()}var r={caracName:"TOTAL SANS FOCUS",caracValue:"-",prixUnit:"-",qtFocus:"-",prixFocus:t,qtNoFocus:"-"};this.itemTable.push(r)}},watch:{coef:function(e){!e&&e.length>0&&this.getCoefs(),this.maxPrix=-5,this.calculateNoFocusPrice()},dialog:function(e){!e&&this.getItems(),this.maxPrix=-5},itemRecherche:function(e){var t=this.getItem(e);void 0!==t&&(this.isItemRecherche=!0,this.setCoef(t.name),this.itemLevel=t.level,this.displayItemStats(t))}},created:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var a,n,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,_.getAllEquipments();case 3:return e.equipements=t.sent,t.next=6,_.getAllWeapons();case 6:e.weapons=t.sent,e.items=[].concat(Object(y["a"])(e.equipements),Object(y["a"])(e.weapons)),e.items.sort(),e.getRunes(),e.getCoefs(),a=[],n=Object(R["a"])(e.items);try{for(n.s();!(r=n.n()).done;)i=r.value,a.push(i.name)}catch(c){n.e(c)}finally{n.f()}t.next=19;break;case 16:t.prev=16,t.t0=t["catch"](0),console.log(t.t0);case 19:case"end":return t.stop()}}),t,null,[[0,16]])})))()}},G=Q,K=a("cc20"),X=a("8fea"),Y=a("7679"),Z=a("2db4"),ee=Object(o["a"])(G,b,x,!1,null,null,null),te=ee.exports;l()(ee,{VApp:f["a"],VAutocomplete:S["a"],VBtn:I["a"],VCard:M["a"],VCardActions:D["a"],VCardTitle:D["c"],VChip:K["a"],VCol:E["a"],VDataTable:X["a"],VDialog:W["a"],VEditDialog:Y["a"],VMain:m["a"],VRow:L["a"],VSnackbar:Z["a"],VTextField:J["a"]}),n["a"].use(g["a"]);var ae=[{path:"/",name:"Home",component:te}],ne=new g["a"]({routes:ae}),re=ne;n["a"].config.productionTip=!1,new n["a"]({vuetify:d,router:re,render:function(e){return e(p)}}).$mount("#app")}});
//# sourceMappingURL=app.b6c7e37b.js.map