(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[108],{uFFq:function(e,t,a){"use strict";a.r(t);a("2qtc");var n,o,r,s,i=a("kLXV"),l=(a("5NDa"),a("5rEg")),c=(a("7Kak"),a("9yH6")),p=(a("iQDF"),a("+eQT")),m=(a("OaEy"),a("2fM7")),u=(a("IzEo"),a("bx4M")),d=(a("14J3"),a("BMrR")),g=(a("+L6B"),a("2/Rp")),f=(a("Pwec"),a("CtXQ")),y=(a("jCWc"),a("kPKH")),h=(a("g9YV"),a("wCAj")),I=a("p0pE"),b=a.n(I),E=(a("/xke"),a("TeRw")),k=a("2Taf"),v=a.n(k),S=a("vZ4D"),w=a.n(S),C=a("l4Ni"),x=a.n(C),D=a("ujKo"),M=a.n(D),Y=a("MhPg"),A=a.n(Y),N=(a("y8nQ"),a("Vl3Y")),O=a("q1tI"),R=a.n(O),P=a("MuoO"),T=a("zHco"),q=a("RdVf"),F=a.n(q),B=a("wd/R"),J=a.n(B);function K(e){return function(){var t,a=M()(e);if(L()){var n=M()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return x()(this,t)}}function L(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var V=[{key:"tab1",tab:"\u4eba\u5458"},{key:"tab2",tab:"\u5206\u5305"}],j=(n=Object(P["connect"])(function(e){var t=e.inspectionAnalysis,a=e.loading;return{inspectionAnalysis:t,loading:a.models.inspectionAnalysis}}),o=N["a"].create(),n(r=o((s=function(e){A()(a,e);var t=K(a);function a(){var e;v()(this,a);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return e=t.call.apply(t,[this].concat(o)),e.state={operationkey:"tab1",visible:!1,allCompanyName:[],showPrice:!1},e.onOperationTabChange=function(t){e.setState({operationkey:t})},e.columns1=[{title:"\u4eba\u5458",dataIndex:"inspman"},{title:"\u624b\u673a",dataIndex:"tel"},{title:"\u4f4f\u5740",dataIndex:"place"},{title:"\u5c97\u4f4d",dataIndex:"position"},{title:"\u5de5\u4f5c\u4efb\u52a1",dataIndex:"inspway"},{title:"\u5de5\u65f6\u8d39",dataIndex:"labourfee"},{title:"\u52b3\u52a1\u8d39",dataIndex:"manhour"},{title:"\u9910\u996e\u8d39",dataIndex:"lunchfee"},{title:"\u4ea4\u901a\u8d39",dataIndex:"trafficfee"}],e.columns2=[{title:"\u68c0\u6d4b\u673a\u6784",dataIndex:"testman"},{title:"\u5206\u5305\u65f6\u95f4",dataIndex:"assigndate",render:function(e){return R.a.createElement("span",null,J()(e).format("YYYY-MM-DD"))}},{title:"\u8ba1\u4ef7\u65b9\u5f0f",dataIndex:"priceway"},{title:"\u5355\u4ef7",dataIndex:"price"},{title:"\u603b\u4ef7",dataIndex:"totalfee"},{title:"\u72b6\u6001",dataIndex:"reviewstatus"},{title:"\u64cd\u4f5c",render:function(t,a){return R.a.createElement(O["Fragment"],null,R.a.createElement("a",{onClick:function(){return e.mobileItem(t,a)}},"\u4fee\u6539"),"\xa0\xa0",R.a.createElement("a",{onClick:function(){return e.deleteItem(t,a)}},"\u5220\u9664"),"\xa0\xa0")}}],e.mobileItem=function(t){var a=e.props,n=(a.dispatch,a.form);n.setFieldsValue({testman:t.testman,assigndate:J()(t.assigndate,"YYYY-MM-DD"),priceway:t.priceway,totalfee:t.totalfee,price:t.price,inspwaymemo1:t.inspwaymemo1}),sessionStorage.setItem("reportno",t.reportno),sessionStorage.setItem("sampleno",t.sampleno),sessionStorage.setItem("keyno",t.keyno),e.setState({visible:!0})},e.deleteItem=function(t){var a=e.props.dispatch;a({type:"inspectionAnalysis/deleteTestBySampleNo",payload:{keyno:t.keyno,reportno:t.reportno,sampleno:t.sampleno},callback:function(t){200===t.code?(e.componentDidMount(),E["a"].open({message:"\u5220\u9664\u6210\u529f"})):E["a"].open({message:"\u5220\u9664\u5931\u8d25",description:t.data})}})},e.back=function(){e.props.history.goBack()},e.onChange=function(t){"\u6309\u5355\u4ef7"===t.target.value||"\u6309\u6bd4\u4f8b"===t.target.value?e.setState({showPrice:!0}):e.setState({showPrice:!1})},e.handleCancel=function(){e.setState({visible:!1})},e.handleOk=function(){var t=e.props,a=t.form.validateFieldsAndScroll,n=t.dispatch;a(function(t,a){var o=JSON.parse(localStorage.getItem("userinfo")),r=sessionStorage.getItem("reportno"),s=sessionStorage.getItem("sampleno"),i=sessionStorage.getItem("keyno");t||n({type:"inspectionAnalysis/updateTestInfo",payload:b()({},a,{assignman:o.nameC,assignsort:"\u54c1\u8d28\u5206\u5305",reportno:r,sampleno:s,keyno:i}),callback:function(t){200===t.code?(e.componentDidMount(),E["a"].open({message:"\u4fee\u6539\u6210\u529f"})):E["a"].open({message:"\u4fee\u6539\u5931\u8d25",description:t.message})}})}),e.setState({visible:!1});var o=e.props.form;o.resetFields()},e}return w()(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.dispatch,a=JSON.parse(localStorage.getItem("userinfo")).certCode,n=sessionStorage.getItem("reportno"),o=sessionStorage.getItem("sampleno");t({type:"inspectionAnalysis/getTestBySampleNo",payload:{reportno:n,sampleno:o}}),t({type:"inspectionAnalysis/getAllTaskInspman",payload:{reportNo:n,sampleno:o,certCode:a}}),t({type:"inspectionAnalysis/getCompany",payload:{certCode:a},callback:function(t){e.setState({allCompanyName:t})}})}},{key:"render",value:function(){var e=this.props,t=e.inspectionAnalysis,a=t.testInfo,n=t.inspman,o=e.loading,r=e.form.getFieldDecorator,s=this.state,I=s.operationkey,b=s.allCompanyName,E=s.showPrice,k=s.visible,v=b.map(function(e){return R.a.createElement(Option,{key:e,value:e},e)}),S=sessionStorage.getItem("reportno"),w=sessionStorage.getItem("shipname"),C=sessionStorage.getItem("applicant"),x={reportno:S,shipname:w,applicant:C},D={tab1:R.a.createElement(h["a"],{pagination:!1,loading:o,dataSource:n,rowKey:"inspman",columns:this.columns1}),tab2:R.a.createElement(h["a"],{pagination:!1,loading:o,dataSource:a,rowKey:"testman",columns:this.columns2})};return R.a.createElement(T["a"],{text:x},R.a.createElement(u["a"],{bordered:!1},R.a.createElement(d["a"],null,R.a.createElement(y["a"],{sm:22}),R.a.createElement(y["a"],{span:2},R.a.createElement(g["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},R.a.createElement(f["a"],{type:"left"}),"\u8fd4\u56de"))),R.a.createElement(u["a"],{className:F.a.tabsCard,bordered:!1,tabList:V,onTabChange:this.onOperationTabChange},D[I])),R.a.createElement(i["a"],{title:"\u5206\u5305",visible:k,onOk:this.handleOk,onCancel:this.handleCancel},R.a.createElement(N["a"],null,R.a.createElement(N["a"].Item,{label:"\u5206\u5305\u5b9e\u9a8c\u5ba4"},r("testman",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5206\u5305\u5b9e\u9a8c\u5ba4"}]})(R.a.createElement(m["a"],{showSearch:!0,placeholder:"\u8bf7\u9009\u62e9",filterOption:!1,onSearch:this.handleSearch},v))),R.a.createElement(N["a"].Item,{label:"\u5206\u5305\u65e5\u671f"},r("assigndate",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5206\u5305\u65e5\u671f"}]})(R.a.createElement(p["a"],{placeholder:"\u59d4\u6258\u65e5\u671f",style:{width:"100%"},format:"YYYY-MM-DD",getPopupContainer:function(e){return e.parentNode}}))),R.a.createElement(N["a"].Item,{label:"\u8ba1\u4ef7\u65b9\u5f0f"},r("priceway",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8ba1\u4ef7\u65b9\u5f0f"}]})(R.a.createElement(c["a"].Group,{onChange:this.onChange},R.a.createElement(c["a"],{value:"\u6309\u5355\u4ef7"},"\u6309\u5355\u4ef7"),R.a.createElement(c["a"],{value:"\u6309\u6279\u6b21"},"\u6309\u6279\u6b21"),R.a.createElement(c["a"],{value:"\u6309\u6bd4\u4f8b"},"\u6309\u6bd4\u4f8b")))),{true:R.a.createElement(N["a"].Item,{label:"\u5355\u4ef7/\u6bd4\u4f8b"},r("price",{rules:!0===E?[{required:"true",message:"\u8bf7\u8f93\u5165\u5355\u4ef7\u6bd4\u4f8b"}]:[]})(R.a.createElement(l["a"],null)))}[E],R.a.createElement(N["a"].Item,{label:"\u603b\u8ba1\u8d39\u7528"},r("totalfee",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u603b\u8ba1\u8d39\u7528"}]})(R.a.createElement(l["a"],null))),R.a.createElement(N["a"].Item,{label:" \u5907\u6ce8"},r("inspwaymemo1",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5907\u6ce8"}]})(R.a.createElement(l["a"],null))))))}}]),a}(O["PureComponent"]),r=s))||r)||r);t["default"]=j}}]);