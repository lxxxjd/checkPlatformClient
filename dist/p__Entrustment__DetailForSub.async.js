(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[91],{Lse9:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,o,s,r,i=a("bx4M"),l=(a("g9YV"),a("wCAj")),c=(a("14J3"),a("BMrR")),p=(a("Pwec"),a("CtXQ")),m=(a("jCWc"),a("kPKH")),d=(a("+L6B"),a("2/Rp")),u=(a("giR+"),a("fyUT")),f=(a("7Kak"),a("9yH6")),y=a("p0pE"),g=a.n(y),h=a("eHn4"),v=a.n(h),I=(a("/xke"),a("TeRw")),w=(a("2qtc"),a("kLXV")),S=a("2Taf"),k=a.n(S),b=a("vZ4D"),E=a.n(b),C=a("MhPg"),F=a.n(C),x=a("l4Ni"),V=a.n(x),O=a("ujKo"),N=a.n(O),P=(a("y8nQ"),a("Vl3Y")),q=(a("5NDa"),a("5rEg")),R=(a("OaEy"),a("2fM7")),T=(a("sRBo"),a("kaz8")),j=a("q1tI"),L=a.n(j),M=a("MuoO"),D=a("zHco"),A=a("oODe"),J=a.n(A);function B(e){return function(){var t,a=N()(e);if(z()){var n=N()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return V()(this,t)}}function z(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var H=T["a"].Group,K=R["a"].Option,Q=q["a"].TextArea,G=(n=P["a"].create(),o=Object(M["connect"])(function(e){var t=e.testInfo,a=e.loading;return{testInfo:t,loading:a.models.testInfo}}),n(s=o((r=function(e){F()(a,e);var t=B(a);function a(){var e;k()(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return e=t.call.apply(t,[this].concat(o)),e.state={visible:!1,checkProject:[],allCompanyName:[],selectEntrustment:null,showPrice:"\u6309\u5355\u4ef7",report:null,priceMakeing:null,overallstate:void 0,isViewCompany:!1,dataSource:[],modalInfo:{}},e.columns=[{title:"\u53d7\u59d4\u6258\u516c\u53f8",dataIndex:"testman"},{title:"\u8f6c\u59d4\u6258\u9879\u76ee",dataIndex:"inspway"},{title:"\u8ba1\u4ef7\u65b9\u5f0f",dataIndex:"priceway"},{title:"\u5355\u4ef7",dataIndex:"price"},{title:"\u603b\u4ef7",dataIndex:"totalfee"},{title:"\u8f6c\u59d4\u6258\u8981\u6c42",dataIndex:"inspwaymemo1"},{title:"\u64cd\u4f5c",render:function(t,a){return L.a.createElement(j["Fragment"],null,"\u5df2\u53d1\u5e03"!==e.state.overallstate&&"\u7533\u8bf7\u4f5c\u5e9f"!==e.state.overallstate?[L.a.createElement("a",{onClick:function(){return e.modifyItem(t,a)}},"\u4fee\u6539\xa0\xa0")]:[],"\u5df2\u53d1\u5e03"!==e.state.overallstate&&"\u7533\u8bf7\u4f5c\u5e9f"!==e.state.overallstate?[L.a.createElement("a",{onClick:function(){return e.deleteItem(t,a)}},"\u5220\u9664\xa0\xa0")]:[])}}],e.columns2=[{title:"\u53d7\u59d4\u6258\u516c\u53f8",dataIndex:"testman"},{title:"\u8f6c\u59d4\u6258\u9879\u76ee",dataIndex:"inspway"},{title:"\u8ba1\u4ef7\u65b9\u5f0f",dataIndex:"priceway"},{title:"\u5355\u4ef7",dataIndex:"price"},{title:"\u603b\u4ef7",dataIndex:"totalfee"},{title:"\u8f6c\u59d4\u6258\u8981\u6c42",dataIndex:"inspwaymemo1"}],e.deleteItem=function(t){var a=e.props.dispatch;w["a"].confirm({title:"\u786e\u5b9a\u5220\u9664\u6b64\u8bb0\u5f55\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){a({type:"testInfo/deleteTestBySampleNo",payload:{keyno:t.keyno},callback:function(t){200===t.code?(I["a"].open({message:"\u5220\u9664\u6210\u529f"}),e.init()):I["a"].open({message:"\u5220\u9664\u5931\u8d25",description:t.data})}})}})},e.init=function(){var t=e.props.dispatch,a=sessionStorage.getItem("reportno"),n=JSON.parse(localStorage.getItem("userinfo"));t({type:"testInfo/getTestByReportNoAndAssignsort",payload:{reportno:a,assignsort:"\u8f6c\u59d4\u6258",nameC:n.nameC},callback:function(t){200===t.code&&e.setState({dataSource:t.data})}})},e.modifyItem=function(t){var a=e.props.form;if(e.setState({selectEntrustment:t}),t.inspway&&"undefined"!==typeof t.inspway){var n=t.inspway.split(" ");a.setFieldsValue(v()({},"inspway",n))}var o=sessionStorage.getItem("inspway").split(" ");e.setState({checkProject:o}),a.setFieldsValue(v()({},"testman",t.testman)),a.setFieldsValue(v()({},"price",t.price)),a.setFieldsValue(v()({},"priceway",t.priceway)),a.setFieldsValue(v()({},"totalfee",t.totalfee)),a.setFieldsValue(v()({},"inspwaymemo1",t.inspwaymemo1)),e.setState({showPrice:t.priceway}),e.setState({modalInfo:t}),e.setState({visible:!0})},e.sumPrice=function(t){var a=JSON.parse(sessionStorage.getItem("DetailForSub_text")),n=e.props.form,o=a.quantityd,s=t;if(void 0!==o&&""!==o&&""!==s&&void 0!==s){var r=s*o;r=r.toFixed(2),n.setFieldsValue(v()({},"totalfee",r))}},e.handleOk=function(){var t=e.props,a=t.form.validateFieldsAndScroll,n=t.dispatch,o=e.state.selectEntrustment;a(function(t,a){if(!t){var s=JSON.parse(localStorage.getItem("userinfo")).nameC;if(o&&"undefined"!==typeof o){a.keyno=o.keyno,a.reportno=o.reportno,a.assignman=s,a.inspway=a.inspway.join(" "),a.assignsort="\u8f6c\u59d4\u6258";var r=g()({},a,{nameC:s});n({type:"testInfo/updateTestInfo",payload:r,callback:function(t){e.init(),200===t.code?I["a"].open({message:"\u4fee\u6539\u6210\u529f"}):I["a"].open({message:"\u4fee\u6539\u5931\u8d25",description:t.data})}})}else{var i=sessionStorage.getItem("reportno");a.reportno=i,a.inspway=a.inspway.join(" "),a.assignman=s;var l=g()({},a,{nameC:s});n({type:"testInfo/addTestInfo",payload:l,callback:function(t){e.init(),200===t.code?I["a"].open({message:"\u6dfb\u52a0\u6210\u529f"}):I["a"].open({message:"\u6dfb\u52a0\u5931\u8d25",description:t.data})}})}e.setState({selectEntrustment:null}),e.setState({visible:!1}),form.resetFields()}})},e.show=function(){var t=e.state.report,a=sessionStorage.getItem("inspway").split(" ");e.setState({checkProject:a});var n=e.props.form;n.resetFields(),n.setFieldsValue(v()({},"inspwaymemo1",t.inspwaymemo1)),e.setState({visible:!0}),e.setState({modalInfo:void 0})},e.handleCancel=function(){e.setState({visible:!1})},e.onChange=function(t){e.setState({showPrice:t.target.value})},e.back=function(){e.props.history.goBack()},e.sum=function(){var t=e.props.form,a=e.state,n=a.report,o=a.priceMakeing,s=a.showPrice,r=t.getFieldValue("price");""!==r&&void 0!==r&&("\u6309\u5355\u4ef7"===s?""!==o.quantity&&null!==o.quantity?t.setFieldsValue(v()({},"totalfee",r*parseFloat(o.quantity))):""!==n.quantityd&&null!==n.quantityd&&t.setFieldsValue(v()({},"totalfee",Number(r)*parseFloat(n.quantityd))):"\u6309\u6bd4\u4f8b"===s&&""!==o.total&&null!==o.total&&t.setFieldsValue(v()({},"totalfee",r*parseFloat(o.total))))},e.onAllCompanyNameFocus=function(t){void 0!==e.state.allCompanyName&&0!==e.state.allCompanyName.length||!1!==e.state.isViewCompany||(w["a"].info({title:"\u8f6c\u59d4\u6258\u4fe1\u606f\u672a\u914d\u7f6e",content:"\u8bf7\u7ba1\u7406\u5458\u5728\u201c\u516c\u53f8\u7ba1\u7406-\u5206\u5305\u65b9\u201d\u83dc\u5355\u914d\u7f6e\uff01",okText:"\u77e5\u9053\u4e86",onOk:function(){}}),e.state.isViewCompany=!0)},e}return E()(a,[{key:"componentDidMount",value:function(){var e=this,t=sessionStorage.getItem("overallstate");this.setState({overallstate:t});var a=this.props.dispatch,n=JSON.parse(localStorage.getItem("userinfo")).certCode,o=sessionStorage.getItem("reportno");this.init(),a({type:"testInfo/getCompany",payload:{certCode:n,type:"\u68c0\u9a8c\u673a\u6784"},callback:function(t){e.setState({allCompanyName:t})}}),a({type:"testInfo/getPriceMaking",payload:{reportno:o},callback:function(t){e.setState({priceMakeing:t})}}),a({type:"testInfo/getReport",payload:{reportno:o},callback:function(t){e.setState({report:t})}})}},{key:"render",value:function(){var e=this.props,t=e.loading,a=e.form.getFieldDecorator,n=sessionStorage.getItem("reportno"),o=sessionStorage.getItem("shipname"),s=sessionStorage.getItem("applicant"),r={reportno:n,shipname:o,applicant:s},y=this.state,g=y.showPrice,h=y.checkProject,v=y.allCompanyName,I=y.visible,S=y.dataSource,k=y.modalInfo,b=v.map(function(e){return L.a.createElement(K,{key:e,value:e},e)});return L.a.createElement(D["a"],{text:r},L.a.createElement(w["a"],{title:"\u8f6c\u59d4\u6258",visible:I,onOk:this.handleOk,onCancel:this.handleCancel},L.a.createElement(P["a"],null,L.a.createElement(P["a"].Item,{label:"\u53d7\u59d4\u6258\u516c\u53f8"},a("testman",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8f6c\u59d4\u6258\u516c\u53f8"}]})(L.a.createElement(R["a"],{showSearch:!0,placeholder:"\u8bf7\u9009\u62e9",filterOption:!1,onSearch:this.handleSearch,onFocus:this.onAllCompanyNameFocus},b))),L.a.createElement(P["a"].Item,{label:"\u8f6c\u59d4\u6258\u9879\u76ee"},a("inspway",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8f6c\u59d4\u6258\u9879\u76ee"}]})(L.a.createElement(H,{options:h}))),L.a.createElement(P["a"].Item,{label:"\u8ba1\u4ef7\u65b9\u5f0f"},a("priceway",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8ba1\u4ef7\u65b9\u5f0f"}]})(L.a.createElement(f["a"].Group,{onChange:this.onChange},L.a.createElement(f["a"],{value:"\u6309\u5355\u4ef7"},"\u6309\u5355\u4ef7"),L.a.createElement(f["a"],{value:"\u6309\u6279\u6b21"},"\u6309\u6279\u6b21")))),"\u6309\u5355\u4ef7"===g?[L.a.createElement(P["a"].Item,{label:"\u5355\u4ef7"},a("price",{initialValue:void 0!==k&&void 0!==k.price?k.price:[],rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5355\u4ef7"}]})(L.a.createElement(u["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165\u5355\u4ef7",min:0,step:.01,onChange:this.sumPrice})))]:[],L.a.createElement(P["a"].Item,{label:"\u603b\u8ba1\u8d39\u7528"},a("totalfee",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u603b\u8ba1\u8d39\u7528"}]})(L.a.createElement(u["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165\u5355\u4ef7",min:0,step:.01}))),L.a.createElement(P["a"].Item,{label:"\u8f6c\u59d4\u6258\u8981\u6c42"},a("inspwaymemo1")(L.a.createElement(Q,{style:{minHeight:32},rows:4}))))),L.a.createElement(i["a"],{bordered:!1,size:"small"},L.a.createElement(c["a"],null,L.a.createElement(m["a"],{span:22},"\u5df2\u53d1\u5e03"===this.state.overallstate||"\u7533\u8bf7\u4f5c\u5e9f"===this.state.overallstate?[]:L.a.createElement(d["a"],{style:{marginBottom:12},type:"primary",onClick:this.show},"\u65b0\u5efa")),L.a.createElement(m["a"],{span:2},L.a.createElement(d["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},L.a.createElement(p["a"],{type:"left"}),"\u8fd4\u56de"))),L.a.createElement("div",{className:J.a.tableList},L.a.createElement(l["a"],{style:{marginTop:5},size:"middle",loading:t,dataSource:S,columns:this.columns,rowKey:"testman",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(j["PureComponent"]),s=r))||s)||s);t["default"]=G},oODe:function(e,t,a){e.exports={tableList:"antd-pro-pages-entrustment-detail-for-sub-tableList",tableListOperator:"antd-pro-pages-entrustment-detail-for-sub-tableListOperator",card:"antd-pro-pages-entrustment-detail-for-sub-card",headerInfo:"antd-pro-pages-entrustment-detail-for-sub-headerInfo"}}}]);