(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[41],{vgoz:function(e,t,a){"use strict";a.r(t);a("IzEo");var r,n,i,s,o=a("bx4M"),l=(a("5NDa"),a("5rEg")),c=(a("14J3"),a("BMrR")),u=(a("Pwec"),a("CtXQ")),m=(a("jCWc"),a("kPKH")),p=(a("+L6B"),a("2/Rp")),d=(a("7Kak"),a("9yH6")),g=a("p0pE"),h=a.n(g),f=a("eHn4"),y=a.n(f),v=(a("/xke"),a("TeRw")),E=a("2Taf"),w=a.n(E),b=a("vZ4D"),I=a.n(b),k=a("l4Ni"),F=a.n(k),S=a("ujKo"),q=a.n(S),C=a("MhPg"),V=a.n(C),P=(a("OaEy"),a("2fM7")),N=(a("y8nQ"),a("Vl3Y")),M=a("q1tI"),R=a.n(M),O=a("MuoO"),j=a("3a4m"),D=a.n(j),B=a("zHco");a("UNh3");function J(e){return function(){var t,a=q()(e);if(x()){var r=q()(this).constructor;t=Reflect.construct(a,arguments,r)}else t=a.apply(this,arguments);return F()(this,t)}}function x(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}N["a"].Item,P["a"].Option;var A=(r=Object(O["connect"])(function(e){var t=e.charge,a=e.loading;return{charge:t,loading:a.models.charge}}),n=N["a"].create(),r(i=n((s=function(e){V()(a,e);var t=J(a);function a(){var e;w()(this,a);for(var r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return e=t.call.apply(t,[this].concat(n)),e.state={formValues:{},value:"\u6309\u5355\u4ef7",checkProject:[],priceway:""},e.back=function(){e.props.history.goBack()},e.onChange=function(t){e.setState({value:t.target.value});var a=e.props,r=a.form,n=a.dispatch;r.resetFields();var i=sessionStorage.getItem("reportno");t.target.value===e.state.priceway&&n({type:"charge/getPriceMaking",payload:{reportNo:i},callback:function(t){200===t.code?null!=t.data&&(e.setState({value:t.data.priceway.trim()}),r.setFieldsValue({total:t.data.total}),"\u6309\u5355\u4ef7"===t.data.priceway.trim()&&r.setFieldsValue({choose:t.data.choose.trim(),price:parseFloat(t.data.price.trim()),quantity:parseFloat(t.data.quantity.trim())})):v["a"].open({message:"\u83b7\u53d6\u5931\u8d25",description:t.data})}})},e.sum=function(){var t=e.props.form,a=t.getFieldValue("price"),r=t.getFieldValue("quantity");void 0!==r&&""!==r&&""!==a&&void 0!==a&&t.setFieldsValue(y()({},"total",a*r))},e.chooseChange=function(t){var a=e.props,r=a.form,n=a.dispatch;if("\u5176\u4ed6"===t.target.value)r.setFieldsValue(y()({},"quantity",""));else if("\u7533\u62a5\u6570\u91cf"===t.target.value){var i=sessionStorage.getItem("quantityd");"null"!==i?r.setFieldsValue(y()({},"quantity",i)):r.setFieldsValue(y()({},"quantity",""))}else{var s=sessionStorage.getItem("reportno");n({type:"charge/getCheckResultInspway",payload:{reportno:s,inspway:t.target.value},callback:function(e){200===e.code?null!==e.data?r.setFieldsValue({quantity:e.data.weight}):r.setFieldsValue(y()({},"quantity","")):v["a"].open({message:"\u83b7\u53d6\u5931\u8d25",description:e.data})}})}},e.submit=function(){e.sum();var t=e.props,a=t.form.validateFieldsAndScroll,r=t.dispatch;a(function(t,a){var n=JSON.parse(localStorage.getItem("userinfo")),i=sessionStorage.getItem("reportno"),s=sessionStorage.getItem("FinalPriceOrigin"),o=e.state.value;t||r({type:"charge/updatePriceMaking",payload:h()({},a,{reportno:i,priceman:n.nameC,priceway:o}),callback:function(e){200===e.code?(v["a"].open({message:"\u5b9a\u4ef7\u6210\u529f"}),"ListFictionAdd"===s?D.a.push({pathname:"/Charge/ListFictionAdd"}):"FinalPrice"===s&&D.a.push({pathname:"/Charge/FinalPrice"})):v["a"].open({message:"\u6dfb\u52a0\u5931\u8d25",description:e.data})}})})},e}return I()(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props,a=t.dispatch,r=t.form,n=(JSON.parse(localStorage.getItem("userinfo")).certCode,sessionStorage.getItem("reportno")),i=sessionStorage.getItem("inspway").split(" ");i.push("\u7533\u62a5\u6570\u91cf"),i.push("\u5176\u4ed6"),this.setState({checkProject:i}),a({type:"charge/getPriceMaking",payload:{reportNo:n},callback:function(t){200===t.code?null!=t.data&&(e.setState({value:t.data.priceway.trim()}),r.setFieldsValue({total:t.data.total}),e.setState({priceway:t.data.priceway.trim()}),"\u6309\u5355\u4ef7"===t.data.priceway.trim()&&r.setFieldsValue({choose:t.data.choose.trim(),price:parseFloat(t.data.price.trim()),quantity:parseFloat(t.data.quantity.trim())})):v["a"].open({message:"\u83b7\u53d6\u5931\u8d25",description:t.data})}})}},{key:"render",value:function(){var e=this.props,t=(e.charge.data,e.loading,e.form.getFieldDecorator),a=this.state,r=(a.visible,a.value),n=a.checkProject,i=sessionStorage.getItem("reportno"),s=sessionStorage.getItem("reportdate"),g=sessionStorage.getItem("applicant"),h=sessionStorage.getItem("cargoname"),f=sessionStorage.getItem("inspway"),y=n.map(function(e){return R.a.createElement(d["a"],{key:e,value:e},e)}),v={reportno:i,reportdate:s,applicant:g,cargoname:h,inspway:f};return R.a.createElement(B["a"],{text:v},R.a.createElement(o["a"],{bordered:!1},R.a.createElement(c["a"],null,R.a.createElement(m["a"],{sm:22},R.a.createElement(p["a"],{type:"primary",onClick:this.submit},"\u4fdd\u5b58")),R.a.createElement(m["a"],{sm:2},R.a.createElement(p["a"],{type:"primary",style:{marginLeft:16},onClick:this.back},R.a.createElement(u["a"],{type:"left"}),"\u8fd4\u56de"))),R.a.createElement("br",null),R.a.createElement(o["a"],null,R.a.createElement("span",null," \u9009\u62e9\u5b9a\u4ef7\u65b9\u5f0f\uff1a "),R.a.createElement(d["a"].Group,{onChange:this.onChange,value:r,defaultValue:"\u6309\u5355\u4ef7"},R.a.createElement(d["a"],{value:"\u6309\u5355\u4ef7"},"\u6309\u5355\u4ef7"),R.a.createElement(d["a"],{value:"\u6309\u6279\u6b21"},"\u6309\u6279\u6b21")),"\u6309\u5355\u4ef7"===r?[R.a.createElement(N["a"],null,R.a.createElement(N["a"].Item,{label:"\u6570\u91cf\u9009\u62e9"},t("choose",{rules:"\u6309\u5355\u4ef7"===r?[{required:!0,message:"\u8bf7\u9009\u62e9\u6570\u91cf\u9009\u62e9"}]:[]})(R.a.createElement(d["a"].Group,{onChange:this.chooseChange},y))),R.a.createElement(N["a"].Item,{label:"\u5355\u4ef7"},t("price",{rules:"\u6309\u5355\u4ef7"===r?[{required:!0,whitespace:!0,type:"number",transform:function(e){if(e)return Number(e)},message:"\u8bf7\u8f93\u5165\u6570\u5b57"}]:[]})(R.a.createElement(l["a"],{style:{width:"25%"},onBlur:this.sum}))),R.a.createElement(N["a"].Item,{label:"\u6570\u91cf"},t("quantity",{rules:"\u6309\u5355\u4ef7"===r?[{required:!0,whitespace:!0,type:"number",transform:function(e){if(e)return Number(e)},message:"\u8bf7\u8f93\u5165\u6570\u5b57"}]:[]})(R.a.createElement(l["a"],{style:{width:"25%"},onBlur:this.sum}))),R.a.createElement(N["a"].Item,{label:"\u603b\u4ef7"},t("total",{rules:"\u6309\u5355\u4ef7"===r?[{required:!0,whitespace:!0,type:"number",transform:function(e){if(e)return Number(e)},message:"\u8bf7\u8f93\u5165\u6570\u5b57"}]:[]})(R.a.createElement(l["a"],{style:{width:"25%"}}))))]:[],"\u6309\u6279\u6b21"===r?[R.a.createElement(N["a"],null,R.a.createElement(N["a"].Item,{label:"\u68c0\u9a8c\u8d39"},t("total",{rules:"\u6309\u6279\u6b21"===r?[{required:!0,whitespace:!0,type:"number",transform:function(e){if(e)return Number(e)},message:"\u8bf7\u8f93\u5165\u6570\u5b57"}]:[]})(R.a.createElement(l["a"],{style:{width:"25%"}}))))]:[],"\u6309\u534f\u8bae"===r?[R.a.createElement(N["a"],null,R.a.createElement(N["a"].Item,{label:"\u5b9a\u4ef7\u65b9\u5f0f"},t("choose",{rules:"\u6309\u534f\u8bae"===r?[{required:!0,message:"\u8bf7\u8f93\u5165\u5b9a\u4ef7\u65b9\u5f0f"}]:[]})(R.a.createElement(l["a"],{style:{width:"25%"}}))),R.a.createElement(N["a"].Item,{label:"\u603b\u4ef7"},t("total",{rules:"\u6309\u534f\u8bae"===r?[{required:!0,whitespace:!0,type:"number",transform:function(e){if(e)return Number(e)},message:"\u8bf7\u8f93\u5165\u6570\u5b57"}]:[]})(R.a.createElement(l["a"],{style:{width:"25%"}}))))]:[],"\u6309\u9879\u76ee"===r?[R.a.createElement(N["a"],null,R.a.createElement(N["a"].Item,{label:"\u603b\u4ef7"},t("total",{rules:"\u6309\u9879\u76ee"===r?[{required:!0,whitespace:!0,type:"number",transform:function(e){if(e)return Number(e)},message:"\u8bf7\u8f93\u5165\u6570\u5b57"}]:[]})(R.a.createElement(l["a"],{style:{width:"25%"}}))))]:[])))}}]),a}(M["PureComponent"]),i=s))||i)||i);t["default"]=A}}]);