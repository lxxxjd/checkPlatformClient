(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[32],{EWoy:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,o,l,s=a("bx4M"),i=(a("g9YV"),a("wCAj")),c=a("jehZ"),u=a.n(c),p=(a("BoS7"),a("Sdc0")),m=(a("Pwec"),a("CtXQ")),d=(a("7Kak"),a("9yH6")),f=(a("O3gP"),a("lrIw")),h=(a("14J3"),a("BMrR")),y=(a("jCWc"),a("kPKH")),v=a("gWZ8"),g=a.n(v),E=(a("miYZ"),a("tsqr")),C=a("2Taf"),k=a.n(C),L=a("vZ4D"),b=a.n(L),S=a("rlhR"),w=a.n(S),F=a("l4Ni"),I=a.n(F),D=a("ujKo"),V=a.n(D),N=a("MhPg"),A=a.n(N),Y=(a("2qtc"),a("kLXV")),M=(a("5NDa"),a("5rEg")),R=(a("+L6B"),a("2/Rp")),x=(a("y8nQ"),a("Vl3Y")),O=(a("OaEy"),a("2fM7")),P=(a("iQDF"),a("+eQT")),B=a("q1tI"),J=a.n(B),T=a("MuoO"),j=a("wd/R"),q=a.n(j),z=a("Y2fQ"),Q=a("zHco"),K=a("glGN"),Z=a.n(K),H=a("cBtN"),W=a.n(H);function G(e){return function(){var t,a=V()(e);if(X()){var n=V()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return I()(this,t)}}function X(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var _=P["a"].RangePicker,U=O["a"].Option,$="YYYY/MM/DD",ee=x["a"].create()(function(e){var t=e.form,a=e.modalAddListVisible,n=e.handleAddListVisible,r=e.handleFormAddList,o=e.total,l=e.paylistno,s=e.approverusersOptions,i=e.paycompany,c=e.getRepeatPayListNo,u=e.onFocusApproverusers,p=function(){t.validateFields(function(e,a){e||(r(a),t.resetFields(),n())})};return J.a.createElement(Y["a"],{destroyOnClose:!0,title:"\u62df\u5236\u6e05\u5355",visible:a,style:{top:100},width:500,onCancel:function(){return n()},footer:[J.a.createElement(R["a"],{type:"primary",onClick:function(){return n()}},"\u5173\u95ed"),J.a.createElement(R["a"],{type:"primary",onClick:function(){return p()}},"\u786e\u8ba4\u62df\u5236")]},J.a.createElement(x["a"],null,J.a.createElement(x["a"].Item,{labelCol:{span:6},wrapperCol:{span:16},label:"\u603b\u91d1\u989d\uff1a"},t.getFieldDecorator("money",{initialValue:{total:o},rules:[{required:!0}]})(J.a.createElement("label",null,o))),J.a.createElement(x["a"].Item,{labelCol:{span:6},wrapperCol:{span:16},label:"\u6e05\u5355\u53f7\uff1a"},t.getFieldDecorator("paylistno",{initialValue:void 0!==l?l:null,rules:[{required:!0,validator:c}]})(J.a.createElement(M["a"],{placeholder:"\u8bf7\u8f93\u5165\u6e05\u5355\u53f7"}))),J.a.createElement(x["a"].Item,{labelCol:{span:6},wrapperCol:{span:16},label:"\u63a5\u6536\u4eba\uff1a"},t.getFieldDecorator("paycompany",{initialValue:i,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u63a5\u6536\u4eba"}]})(J.a.createElement(M["a"],{placeholder:"\u8bf7\u8f93\u5165\u63a5\u6536\u4eba"}))),J.a.createElement(x["a"].Item,{labelCol:{span:6},wrapperCol:{span:16},label:"\u5ba1\u6838\u4eba\uff1a"},t.getFieldDecorator("reviewer",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5ba1\u6838\u4eba"}]})(J.a.createElement(O["a"],{placeholder:"\u8bf7\u9009\u62e9\u5ba1\u6838\u4eba",onFocus:u},s)))))}),te=0,ae=(n=x["a"].create(),r=Object(T["connect"])(function(e){var t=e.cost,a=e.loading;return{cost:t,loading:a.models.cost}}),n(o=r((l=function(e){A()(a,e);var t=G(a);function a(){var e;k()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={costList:[],modalAddListVisible:!1,paycompany:void 0,total:0,paylistno:void 0,approverusers:[],applicantName:[],costListData:[]},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u8d39\u7528\u79cd\u7c7b",dataIndex:"costtype"},{title:"\u8d39\u7528\u540d\u79f0",dataIndex:"costname"},{title:"\u53d1\u751f\u65e5\u671f",dataIndex:"occurdate",render:function(e){return J.a.createElement("span",null,q()(e).format("YYYY-MM-DD"))}},{title:"\u91d1\u989d",dataIndex:"costmoney"},{title:"\u63a5\u6536\u4eba",dataIndex:"reciever"},{title:"\u767b\u8bb0\u4eba",dataIndex:"register"},{title:"\u767b\u8bb0\u65e5\u671f",dataIndex:"registdate",render:function(e){return J.a.createElement("span",null,q()(e).format("YYYY-MM-DD"))}},{title:"\u72b6\u6001",dataIndex:"status"},{title:"\u64cd\u4f5c",render:function(t,a){return J.a.createElement(B["Fragment"],null,J.a.createElement("a",{onClick:function(){return e.makecostItem(t,a)}},"\u62df\u5236 \xa0\xa0"),J.a.createElement("a",{onClick:function(){return e.removeExistItem(t,a)}},"\u5254\u9664 \xa0\xa0"),J.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.init=function(){var t=e.props.dispatch,a=JSON.parse(localStorage.getItem("userinfo"));t({type:"cost/selectCostByConditions",payload:{certCode:a.certCode},callback:function(t){t?e.state.costList=t:E["a"].error("\u52a0\u8f7d\u5931\u8d25")}})},e.handleFormReset=function(){var t=e.props.form;t.resetFields(),e.init(),e.flag=0},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),window.open("/Entrustment/DetailForEntrustment"),localStorage.setItem("reportDetailNo",e.reportno)},e.removeExistItem=function(t){e.listRemoveItem(e.state.costList,t.keyno);var a=g()(e.state.costList);e.setState({costList:a.filter(function(e){return e.keyno!==t.keyno})})},e.listRemoveItem=function(e,t){var a=e.length;while(a--)a in e&&e[a].keyno===t&&e.splice(a,1);return e},e.makecostItem=function(t){if("\u5df2\u767b\u8bb0"===t.status){e.setState({total:t.costmoney}),e.setState({paylistno:t.reportno}),e.setState({paycompany:t.reciever});var a=[];a.push(t),e.setState({costListData:a});var n=e.props.dispatch,r=JSON.parse(localStorage.getItem("userinfo"));n({type:"user/getMan",payload:{certcode:r.certCode,func:"\u6210\u672c\u5ba1\u6838"},callback:function(t){t?e.setState({approverusers:t}):E["a"].error("\u672a\u914d\u7f6e\u5ba1\u6838\u4eba\u7528\u6237\u89d2\u8272")}}),e.handleAddListVisible(!0)}else Y["a"].error({okText:"\u786e\u5b9a",title:"\u6e05\u5355\u8bb0\u5f55\u4e0d\u662f\u5168\u90e8\u2018\u5df2\u767b\u8bb0\u2019\u72b6\u6001\uff01",content:"\u8bf7\u9009\u62e9\u5254\u9664\u6216\u8005\u91cd\u65b0\u67e5\u8be2\uff01"})},e.handleSubmit=function(){var t=w()(e),a=t.state,n=0;if(0!==a.costList.length){for(var r=1,o=0,l=a.costList.length;o<l;o++){if("\u5df2\u767b\u8bb0"!==a.costList[o].status)return void Y["a"].error({okText:"\u786e\u5b9a",title:"\u6e05\u5355\u8bb0\u5f55\u4e0d\u662f\u5168\u90e8\u2018\u5df2\u767b\u8bb0\u2019\u72b6\u6001\uff01",content:"\u8bf7\u9009\u62e9\u5254\u9664\u6216\u8005\u91cd\u65b0\u67e5\u8be2\uff01"});void 0!==a.costList[o].reciever&&(a.paycompany=a.costList[o].reciever),void 0!==a.costList[o].costmoney&&null!==a.costList[o].costmoney&&""!==a.costList[o].costmoney?n+=parseFloat(a.costList[o].costmoney):(n+=0,r=0)}0===r&&E["a"].warn("\u5b58\u5728\u91d1\u989d\u4e3a\u7a7a\u7684\u6210\u672c\uff0c\u8bf7\u5ba1\u9605\u540e\u7ee7\u7eed\uff01"),e.state.total=n,void 0!==a.costList&&(e.state.paylistno=a.costList[0].reportno),e.setState({costListData:a.costList});var s=e.props.dispatch,i=JSON.parse(localStorage.getItem("userinfo"));s({type:"user/getMan",payload:{certcode:i.certCode,func:"\u6210\u672c\u5ba1\u6838"},callback:function(t){t?e.setState({approverusers:t}):E["a"].error("\u672a\u914d\u7f6e\u5ba1\u6838\u4eba\u7528\u6237\u89d2\u8272")}}),e.handleAddListVisible(!0)}else E["a"].error("\u672a\u5220\u9009\u5230\u6761\u76ee\uff0c\u8bf7\u91cd\u8bd5")},e.handleFormAddList=function(t){var a=e.props.dispatch,n=JSON.parse(localStorage.getItem("userinfo")),r={paylistno:t.paylistno,paycompany:t.paycompany,listman:n.nameC,certcode:n.certCode},o={costlist:r,reviewer:t.reviewer,costs:e.state.costListData};a({type:"cost/addList",payload:o,callback:function(t){t?function(){E["a"].success("\u6210\u672c\u6e05\u5355\u6dfb\u52a0\u6210\u529f"),sessionStorage.setItem("CostListDetail_costlist",JSON.stringify(t)),window.open("/CostManage/CostListDetail");for(var a=e.state,n=a.costList,r=a.costListData,o=function(e){n.find(function(t){return t.keyno===r[e].keyno}).status="\u5df2\u62df\u5236"},l=0;l<r.length;l++)o(l);e.setState({costList:n})}():E["a"].error("\u6210\u672c\u6e05\u5355\u6dfb\u52a0\u5931\u8d25")}})},e.handleSearch=function(){var t=e.props,a=t.dispatch,n=t.form;n.validateFields(function(t,r){if(!t){var o=JSON.parse(localStorage.getItem("userinfo")),l=[],s=[],i=[];void 0!==r.reciever&&""!==r.reciever&&(l.push("reciever"),s.push(r.reciever),i.push("=")),void 0!==r.occurdate&&0!==r.occurdate.length&&(l.push("occurdate"),s.push(r.occurdate[0].format("YYYY-MM-DD")),i.push(">="),l.push("occurdate"),s.push(r.occurdate[1].format("YYYY-MM-DD")),i.push("<=")),void 0!==r.status&&0!==r.status.length&&("\u672a\u62df\u5236"===r.status?(l.push("status"),s.push("\u5df2\u767b\u8bb0"),i.push("=")):"\u5df2\u62df\u5236"===r.status&&(l.push("status"),s.push("\u5df2\u767b\u8bb0"),i.push("!=")));var c=n.getFieldValue("keys");for(var u in c){var p=c[u],m=n.getFieldValue("kinds".concat(p)),d=n.getFieldValue("conditions".concat(p)),f=n.getFieldValue("values".concat(p)),h=n.getFieldValue("check".concat(p));!0===h&&void 0!==m&&void 0!==f&&void 0!==d&&(l.push(m),s.push(f),i.push(d))}var y={kinds:l,values:s,conditions:i,certCode:o.certCode};a({type:"cost/selectCostByConditions",payload:y,callback:function(t){t?(e.state.costList=t,E["a"].success("\u67e5\u8be2\u6210\u529f")):E["a"].error("\u67e5\u8be2\u5931\u8d25")}})}})},e.onFocusApproverusers=function(){null!=e.state.approverusers&&0!==e.state.approverusers.length||!1!==e.state.isViewonApproverusers||(Y["a"].info({title:"\u672a\u914d\u7f6e\u6210\u672c\u5ba1\u6838\u7528\u6237\u89d2\u8272",content:"\u8bf7\u7ba1\u7406\u5458\u5728\u201c\u516c\u53f8\u7ba1\u7406-\u7528\u6237\u7ba1\u7406\u201d\u7ed9\u7528\u6237\u4fee\u6539\uff0c\u52a0\u9009\u7528\u6237\u89d2\u8272\uff01\u4e1a\u52a1\u7ecf\u7406\uff0c\u4e1a\u52a1\u526f\u603b\uff0c\u603b\u7ecf\u7406\u89d2\u8272\uff0c\u90fd\u53ef\u6210\u672c\u6e05\u5355\u5ba1\u6838\u3002",okText:"\u77e5\u9053\u4e86",onOk:function(){}}),e.setState({isViewonApproverusers:!0}))},e.handleApplicantSearch=function(t){var a=e.props.dispatch;a({type:"charge/getBusiness",payload:{name:t},callback:function(t){e.setState({applicantName:t})}})},e.remove=function(t){var a=e.props.form,n=a.getFieldValue("keys");e.props.form.validateFields(function(e,t){e||console.log("Received values of form: ",t)}),a.setFieldsValue({keys:n.filter(function(e){return e!==t})})},e.add=function(){var t=e.props.form,a=t.getFieldValue("keys"),n=a.concat(te++);t.setFieldsValue({keys:n})},e.flag=0,e.handleAdvanceSearch=function(){if(0===e.flag){var t=4;while(t>0)e.add(),t--;e.flag=1}},e.handleAddListVisible=function(t){e.setState({modalAddListVisible:!!t})},e.getRepeatPayListNo=function(t,a,n){void 0!==a&&null!==a&&""!==a||n(Object(z["formatMessage"])({id:"validation.paylistno.noexist"}));var r=e.props.dispatch,o=new FormData,l=JSON.parse(localStorage.getItem("userinfo"));o.append("certcode",l.certCode),o.append("paylistno",a),r({type:"charge/getRepeatPayListNo",payload:o,callback:function(e){"repeat"===e?n(Object(z["formatMessage"])({id:"validation.paylistno.repeat"})):"success"===e?n():n(Object(z["formatMessage"])({id:"validation.paylistno.error"}))}})},e}return b()(a,[{key:"componentDidMount",value:function(){this.init()}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator,t=this.state.applicantName,a=t.map(function(e){return J.a.createElement(U,{key:e,value:e},e)});return J.a.createElement(x["a"],{onSubmit:this.handleSearch,layout:"inline"},J.a.createElement(h["a"],{gutter:{md:6,lg:18,xl:5}},J.a.createElement(y["a"],{md:12,sm:20},J.a.createElement("span",{className:Z.a.submitButtons},J.a.createElement(R["a"],{type:"primary",style:{marginLeft:0},onClick:this.handleFormReset},"\u91cd\u7f6e"),J.a.createElement(R["a"],{type:"primary",style:{marginLeft:8},onClick:this.handleAdvanceSearch},"\u9ad8\u7ea7\u68c0\u7d22"),J.a.createElement(R["a"],{type:"primary",style:{marginLeft:8},onClick:this.handleSearch},"\u67e5\u8be2"),J.a.createElement(R["a"],{type:"primary",style:{marginLeft:8},onClick:this.handleSubmit},"\u62df\u5236")))),J.a.createElement(h["a"],{gutter:{md:6,lg:18,xl:5}},J.a.createElement(y["a"],{md:9,sm:20},J.a.createElement(x["a"].Item,{label:"\u63a5\u6536\u4eba",labelCol:{span:5},wrapperCol:{span:6}},e("reciever",{rules:[{message:"\u8bf7\u8f93\u5165\u5168\u79f0"}]})(J.a.createElement(f["a"],{className:"global-search",dataSource:a,onSearch:this.handleApplicantSearch,placeholder:"\u8bf7\u8f93\u5165\u5168\u79f0"},J.a.createElement(M["a"],null))))),J.a.createElement(y["a"],{md:8,sm:20},J.a.createElement(x["a"].Item,{label:"\u53d1\u751f\u65e5\u671f\uff1a",labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("occurdate",{})(J.a.createElement(_,{format:$})))),J.a.createElement(y["a"],{md:6,sm:20},J.a.createElement(x["a"].Item,{label:"\u6210\u672c\u72b6\u6001\uff1a",labelCol:{span:5},wrapperCol:{span:6}},e("status",{rules:[{message:"\u8bf7\u8f93\u5165"}],initialValue:"\u5168\u90e8"})(J.a.createElement(d["a"].Group,{buttonStyle:"solid"},J.a.createElement(d["a"].Button,{value:"\u5168\u90e8"},"\u5168\u90e8"),J.a.createElement(d["a"].Button,{value:"\u672a\u62df\u5236"},"\u672a\u62df\u5236"),J.a.createElement(d["a"].Button,{value:"\u5df2\u62df\u5236"},"\u5df2\u62df\u5236"))))),J.a.createElement(y["a"],{md:1,sm:20},"  ",J.a.createElement(m["a"],{type:"plus-circle",style:{fontSize:24,marginTop:4},theme:"twoTone",twoToneColor:"#00ff00",onClick:this.add}))))}},{key:"render",value:function(){var e=this,t=this.props.loading,a=this.state,n=a.costList,r=a.modalAddListVisible,o=a.total,l=a.paycompany,c=a.paylistno,d=a.approverusers,f=d.map(function(e){return J.a.createElement(U,{key:e.userName,value:e.userName},e.nameC)}),v={handleAddListVisible:this.handleAddListVisible,handleFormAddList:this.handleFormAddList,getRepeatPayListNo:this.getRepeatPayListNo,onFocusApproverusers:this.onFocusApproverusers},g=this.props.form,E=g.getFieldDecorator,C=g.getFieldValue;E("keys",{initialValue:[]});var k=C("keys"),L=k.map(function(t,a){return J.a.createElement("div",null,a%2===0&&0!==k.length?J.a.createElement(h["a"],{className:W.a.rowClass}):null,J.a.createElement(y["a"],{md:1,sm:20},J.a.createElement(x["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},E("check".concat(t),{initialValue:!0,valuePropName:"checked"})(J.a.createElement(p["a"],{checkedChildren:"\u5f00",unCheckedChildren:"\u5173"})))),J.a.createElement(y["a"],{md:3,sm:20},J.a.createElement(x["a"].Item,{style:{marginRight:8},labelCol:{span:5},wrapperCol:{span:6}},E("kinds".concat(t),{rules:[{message:"\u9009\u62e9\u5b57\u6bb5"}]})(J.a.createElement(O["a"],{placeholder:"\u9009\u62e9\u5b57\u6bb5"},J.a.createElement(U,{value:"reportno"}," \u59d4\u6258\u7f16\u53f7"),J.a.createElement(U,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),J.a.createElement(U,{value:"costtype"},"\u8d39\u7528\u79cd\u7c7b"),J.a.createElement(U,{value:"costname"},"\u8d39\u7528\u540d\u79f0"),J.a.createElement(U,{value:"costmoney"},"\u91d1\u989d"),J.a.createElement(U,{value:"register"},"\u767b\u8bb0\u4eba"))))),J.a.createElement(y["a"],{md:3,sm:20},J.a.createElement(x["a"].Item,{style:{marginRight:8},labelCol:{span:5},wrapperCol:{span:6}},E("conditions".concat(t),{rules:[{message:"\u9009\u62e9\u6761\u4ef6"}]})(J.a.createElement(O["a"],{placeholder:"\u9009\u62e9\u6761\u4ef6"},J.a.createElement(U,{value:"="},"\u7b49\u4e8e"),J.a.createElement(U,{value:"!="},"\u4e0d\u7b49\u4e8e"),J.a.createElement(U,{value:"like"},"\u5305\u542b"),J.a.createElement(U,{value:"not like"},"\u4e0d\u5305\u542b"))))),J.a.createElement(y["a"],{md:4,sm:10},J.a.createElement(x["a"].Item,null,E("values".concat(t),{rules:[{message:"\u9009\u62e9\u6570\u503c"}]})(J.a.createElement(M["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),J.a.createElement(y["a"],{md:1,sm:5},k.length>=1?J.a.createElement(m["a"],{style:{fontSize:24,marginLeft:8},type:"minus-circle",theme:"twoTone",twoToneColor:"#ff0000",onClick:function(){return e.remove(t)}}):null))});return J.a.createElement(Q["a"],{title:"\u6e05\u5355\u62df\u5236"},J.a.createElement(s["a"],{bordered:!1,size:"small"},J.a.createElement("div",{className:Z.a.tableList},J.a.createElement(x["a"],{onSubmit:this.handleSubmit},J.a.createElement("div",{className:Z.a.tableListForm},this.renderSimpleForm()),J.a.createElement(h["a"],{className:Z.a.tableListForm},L),J.a.createElement(ee,u()({},v,{approverusersOptions:f,modalAddListVisible:r,costList:n,paylistno:c,total:o,paycompany:l}))),J.a.createElement(i["a"],{style:{marginTop:5},loading:t,dataSource:n,columns:this.columns,rowKey:"keyno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(B["PureComponent"]),o=l))||o)||o);t["default"]=ae}}]);