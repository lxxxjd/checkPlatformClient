(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[60],{b2Fo:function(e,t,n){"use strict";n.r(t);n("2qtc");var a,l,r,i,d=n("kLXV"),c=(n("IzEo"),n("bx4M")),o=(n("g9YV"),n("wCAj")),p=(n("14J3"),n("BMrR")),s=(n("+L6B"),n("2/Rp")),g=(n("Pwec"),n("CtXQ")),m=(n("jCWc"),n("kPKH")),u=(n("/xke"),n("TeRw")),h=n("2Taf"),A=n.n(h),y=n("vZ4D"),x=n.n(y),E=n("MhPg"),w=n.n(E),f=n("l4Ni"),F=n.n(f),b=n("ujKo"),k=n.n(b),C=(n("y8nQ"),n("Vl3Y")),v=n("q1tI"),S=n.n(v),Y=n("MuoO"),D=n("zHco"),U=n("wd/R"),M=n.n(U),R=n("V54k"),L=n.n(R);function T(e){return function(){var t,n=k()(e);if(z()){var a=k()(this).constructor;t=Reflect.construct(n,arguments,a)}else t=n.apply(this,arguments);return F()(this,t)}}function z(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var I=(a=C["a"].create(),l=Object(Y["connect"])(function(e){var t=e.company,n=e.loading;return{company:t,loading:n.models.company}}),a(r=l((i=function(e){w()(n,e);var t=T(n);function n(){var e;A()(this,n);for(var a=arguments.length,l=new Array(a),r=0;r<a;r++)l[r]=arguments[r];return e=t.call.apply(t,[this].concat(l)),e.state={url:null,showVisible:!1,recordData:[],usertext:{},headUrl:void 0,signUrl:void 0,photoUrl:void 0},e.columns=[{title:"\u6587\u4ef6\u540d\u79f0",dataIndex:"recordname",render:function(e){var t=/\.{1}[a-z]{1,}$/;return null!==t.exec(e)?S.a.createElement("span",null,e.slice(0,t.exec(e).index)):S.a.createElement("span",null,e)}},{title:"\u4e0a\u4f20\u65e5\u671f",dataIndex:"recorddate",render:function(e){return S.a.createElement("span",null,M()(e).format("YYYY-MM-DD"))}},{title:"\u6587\u4ef6\u7c7b\u578b",dataIndex:"filetype"},{title:"\u64cd\u4f5c",render:function(t,n){return S.a.createElement(v["Fragment"],null,S.a.createElement("a",{onClick:function(){return e.previewItem(t,n)}},"\u67e5\u770b"))}}],e.previewItem=function(t){var n=e.props.dispatch;n({type:"company/getUrl",payload:{url:t.osspath},callback:function(t){if(400===t.code)u["a"].open({message:"\u6253\u5f00\u5931\u8d25",description:t.data});else{var n=t.data;e.setState({url:n}),e.setState({showVisible:!0})}}})},e.back=function(){e.props.history.goBack()},e.showCancel=function(){e.setState({showVisible:!1})},e}return x()(n,[{key:"componentDidMount",value:function(){var e=this,t=this.props.dispatch,n=JSON.parse(sessionStorage.getItem("usertext"));t({type:"company/getManRecord",payload:{nameC:n.nameC,certCode:n.certCode},callback:function(t){200===t.code&&e.setState({recordData:t.data})}}),this.setState({usertext:n}),null!==n.signurl&&t({type:"company/getUrl",payload:{url:n.signurl},callback:function(t){200===t.code&&e.setState({signUrl:t.data})}}),null!==n.authorizeurl&&t({type:"company/getUrl",payload:{url:n.authorizeurl},callback:function(t){200===t.code&&e.setState({headUrl:t.data})}}),null!==n.photourl&&t({type:"company/getUrl",payload:{url:n.photourl},callback:function(t){200===t.code&&e.setState({photoUrl:t.data})}})}},{key:"render",value:function(){var e=this.props.loading,t=this.state,n=t.url,a=t.showVisible,l=t.recordData,r=t.usertext,i=t.signUrl,u=t.headUrl,h=t.photoUrl,A={nameC:r.nameC};return S.a.createElement(D["a"],{text:A},S.a.createElement(c["a"],{bordered:!1,size:"small"},S.a.createElement(p["a"],null,S.a.createElement(m["a"],{span:22}),S.a.createElement(m["a"],{span:2},S.a.createElement(s["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},S.a.createElement(g["a"],{type:"left"}),"\u8fd4\u56de"))),S.a.createElement(p["a"],{style:{paddingLeft:200,paddingRight:200,paddingTop:10,paddingBottom:10}},S.a.createElement(m["a"],{span:24},S.a.createElement("table",{width:"100%",border:1},S.a.createElement("tr",null,S.a.createElement("td",{width:"15%",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}},"\u59d3\u540d"),S.a.createElement("td",{width:"20%",style:{textAlign:"center",padding:"10px"}},r.nameC),S.a.createElement("td",{width:"15%",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}}," \u6027\u522b"),S.a.createElement("td",{width:"20%",style:{textAlign:"center",padding:"10px"}}," ",r.sex),S.a.createElement("td",{width:"30%",rowSpan:"5",colSpan:"2",style:{textAlign:"center",padding:"10px"}},""===h||null===h||void 0===h?[S.a.createElement("div",{style:{marginTop:20,marginLeft:20}},"\u6682\u65e0\u56fe\u7247")]:[S.a.createElement("img",{style:{marginTop:20},src:h,height:"200"})])),S.a.createElement("tr",null,S.a.createElement("td",{width:"15%",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}}," \u6587\u5316\u7a0b\u5ea6"),S.a.createElement("td",{width:"20%",style:{textAlign:"center",padding:"10px"}}," ",r.education),S.a.createElement("td",{width:"15%",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}}," \u4e13\u4e1a"),S.a.createElement("td",{width:"20%",style:{textAlign:"center",padding:"10px"}}," ",r.major)),S.a.createElement("tr",null,S.a.createElement("td",{width:"15%",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}},"\u90e8\u95e8"),S.a.createElement("td",{width:"20%",style:{textAlign:"center",padding:"10px"}},r.section),S.a.createElement("td",{width:"15%",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}}," \u51fa\u751f\u65e5\u671f"),S.a.createElement("td",{width:"20%",style:{textAlign:"center",padding:"10px"}}," ",null!=r.birthday?M()(r.birthday).format("YYYY-MM-DD"):"")),S.a.createElement("tr",null,S.a.createElement("td",{width:"15%",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}},"\u804c\u52a1"),S.a.createElement("td",{width:"20%",style:{textAlign:"center",padding:"10px"}},r.workduty),S.a.createElement("td",{width:"15%",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}}," \u4efb\u804c\u65e5\u671f"),S.a.createElement("td",{width:"20%",style:{textAlign:"center",padding:"10px"}}," ",null!=r.enterdate?M()(r.enterdate).format("YYYY-MM-DD"):"")),S.a.createElement("tr",null,S.a.createElement("td",{width:"15%",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}},"\u5de5\u4f5c\u5e74\u9650"),S.a.createElement("td",{width:"20%",style:{textAlign:"center",padding:"10px"}},r.workyears),S.a.createElement("td",{width:"15%",style:{backgroundColor:"#FAFAFA",textAlign:"center",paddiddng:"10px"}},"\u8eab\u4efd\u8bc1\u53f7"),S.a.createElement("td",{width:"20%",style:{textAlign:"center",padding:"10px"}},r.idcard)),S.a.createElement("tr",null,S.a.createElement("td",{width:"15%",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}},"\u4f4f\u5740"),S.a.createElement("td",{width:"20%",style:{textAlign:"center",padding:"10px"}},r.place),S.a.createElement("td",{width:"15%",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}}," \u624b\u673a\u53f7"),S.a.createElement("td",{width:"20%",style:{textAlign:"center",padding:"10px"}}," ",r.tel),S.a.createElement("td",{width:"12%",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}}," \u6388\u6743\u7b7e\u5b57"),S.a.createElement("td",{width:"8%",style:{textAlign:"center",padding:"10px"}}," ",r.isauthorize)),S.a.createElement("tr",null,S.a.createElement("td",{width:"15%",height:150,colSpan:"1",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}},"\u624b\u5199\u7b7e\u540d"),S.a.createElement("td",{width:"15%",height:150,colSpan:"5",style:{textAlign:"center",padding:"10px"}},""===i||null===i||void 0===i?[S.a.createElement("div",{style:{marginTop:20,marginLeft:20}},"\u6682\u65e0\u56fe\u7247")]:[S.a.createElement("img",{style:{marginTop:20,marginBottom:20},src:i,height:"80"})])),S.a.createElement("tr",null,S.a.createElement("td",{width:"15%",height:200,colSpan:"1",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}},"\u6388\u6743\u56fe\u7247"),S.a.createElement("td",{width:"15%",height:200,colSpan:"5",style:{textAlign:"center",padding:"10px"}},""===u||null===u||void 0===u?[S.a.createElement("div",{style:{marginTop:20,marginLeft:20}},"\u6682\u65e0\u56fe\u7247")]:[S.a.createElement("img",{style:{marginTop:20,marginBottom:20},src:u,height:"150"})])),S.a.createElement("tr",null,S.a.createElement("td",{width:"15%",height:150,colSpan:"1",style:{backgroundColor:"#FAFAFA",textAlign:"center",padding:"10px"}},"\u4e2a\u4eba\u6587\u4ef6"),S.a.createElement("td",{width:"15%",colSpan:"5",style:{textAlign:"center",padding:"10px"}},S.a.createElement("div",{className:L.a.tableList},S.a.createElement(o["a"],{size:"middle",loading:e,dataSource:l,columns:this.columns,rowKey:"recordname",pagination:!1})))))))),S.a.createElement(d["a"],{title:"\u8bb0\u5f55\u8be6\u60c5",visible:a,onCancel:this.showCancel,footer:null,width:800,style:{top:10}},S.a.createElement("embed",{src:n,width:"700",height:"700",type:"application/pdf"})))}}]),n}(v["PureComponent"]),r=i))||r)||r);t["default"]=I}}]);