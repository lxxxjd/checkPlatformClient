(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[32],{EWoy:function(e,t,a){"use strict";a.r(t);a("IzEo");var r,n,l,o,s=a("bx4M"),i=(a("g9YV"),a("wCAj")),c=a("jehZ"),u=a.n(c),p=(a("BoS7"),a("Sdc0")),m=(a("Pwec"),a("CtXQ")),d=(a("7Kak"),a("9yH6")),f=(a("14J3"),a("BMrR")),h=(a("jCWc"),a("kPKH")),v=a("gWZ8"),y=a.n(v),g=(a("miYZ"),a("tsqr")),E=a("2Taf"),C=a.n(E),b=a("vZ4D"),k=a.n(b),L=a("rlhR"),F=a.n(L),w=a("l4Ni"),S=a.n(w),I=a("ujKo"),V=a.n(I),D=a("MhPg"),A=a.n(D),N=(a("2qtc"),a("kLXV")),Y=(a("5NDa"),a("5rEg")),R=(a("+L6B"),a("2/Rp")),M=(a("y8nQ"),a("Vl3Y")),x=(a("OaEy"),a("2fM7")),O=(a("iQDF"),a("+eQT")),P=a("q1tI"),B=a.n(P),J=a("MuoO"),T=a("3a4m"),j=a.n(T),q=a("wd/R"),z=a.n(q),Q=a("Y2fQ"),K=a("zHco"),Z=a("glGN"),H=a.n(Z),W=a("cBtN"),G=a.n(W);function X(e){return function(){var t,a=V()(e);if(_()){var r=V()(this).constructor;t=Reflect.construct(a,arguments,r)}else t=a.apply(this,arguments);return S()(this,t)}}function _(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var U=O["a"].RangePicker,$=x["a"].Option,ee="YYYY/MM/DD",te=M["a"].create()(function(e){var t=e.form,a=e.modalAddListVisible,r=e.handleAddListVisible,n=e.handleFormAddList,l=e.total,o=e.paylistno,s=e.approverusersOptions,i=(e.costList,e.paycompany),c=e.getRepeatPayListNo,u=e.onFocusApproverusers,p=function(){t.validateFields(function(e,a){e||(n(a),t.resetFields(),r())})};return B.a.createElement(N["a"],{destroyOnClose:!0,title:"\u62df\u5236\u6e05\u5355",visible:a,style:{top:100},width:500,onCancel:function(){return r()},footer:[B.a.createElement(R["a"],{type:"primary",onClick:function(){return r()}},"\u5173\u95ed"),B.a.createElement(R["a"],{type:"primary",onClick:function(){return p()}},"\u786e\u8ba4\u62df\u5236")]},B.a.createElement(M["a"],null,B.a.createElement(M["a"].Item,{labelCol:{span:6},wrapperCol:{span:16},label:"\u603b\u91d1\u989d\uff1a"},t.getFieldDecorator("money",{initialValue:{total:l},rules:[{required:!0}]})(B.a.createElement("label",null,l))),B.a.createElement(M["a"].Item,{labelCol:{span:6},wrapperCol:{span:16},label:"\u6e05\u5355\u53f7\uff1a"},t.getFieldDecorator("paylistno",{initialValue:void 0!==o?o:null,rules:[{required:!0,validator:c}]})(B.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165\u6e05\u5355\u53f7"}))),B.a.createElement(M["a"].Item,{labelCol:{span:6},wrapperCol:{span:16},label:"\u63a5\u6536\u4eba\uff1a"},t.getFieldDecorator("paycompany",{initialValue:i,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u63a5\u6536\u4eba"}]})(B.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165\u63a5\u6536\u4eba"}))),B.a.createElement(M["a"].Item,{labelCol:{span:6},wrapperCol:{span:16},label:"\u5ba1\u6838\u4eba\uff1a"},t.getFieldDecorator("reviewer",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5ba1\u6838\u4eba"}]})(B.a.createElement(x["a"],{placeholder:"\u8bf7\u9009\u62e9\u5ba1\u6838\u4eba",onFocus:u},s)))))}),ae=0,re=(r=M["a"].create(),n=Object(J["connect"])(function(e){var t=e.cost,a=e.loading;return{cost:t,loading:a.models.cost}}),r(l=n((o=function(e){A()(a,e);var t=X(a);function a(){var e;C()(this,a);for(var r=arguments.length,n=new Array(r),l=0;l<r;l++)n[l]=arguments[l];return e=t.call.apply(t,[this].concat(n)),e.state={costList:[],modalAddListVisible:!1,paycompany:void 0,total:0,paylistno:void 0,approverusers:[]},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u8d39\u7528\u79cd\u7c7b",dataIndex:"costtype"},{title:"\u8d39\u7528\u540d\u79f0",dataIndex:"costname"},{title:"\u53d1\u751f\u65e5\u671f",dataIndex:"occurdate",render:function(e){return B.a.createElement("span",null,z()(e).format("YYYY-MM-DD"))}},{title:"\u91d1\u989d",dataIndex:"costmoney"},{title:"\u63a5\u6536\u4eba",dataIndex:"reciever"},{title:"\u767b\u8bb0\u4eba",dataIndex:"register"},{title:"\u767b\u8bb0\u65e5\u671f",dataIndex:"registdate",render:function(e){return B.a.createElement("span",null,z()(e).format("YYYY-MM-DD"))}},{title:"\u72b6\u6001",dataIndex:"status"},{title:"\u64cd\u4f5c",render:function(t,a){return B.a.createElement(P["Fragment"],null,B.a.createElement("a",{onClick:function(){return e.removeExistItem(t,a)}},"\u5220\u9664"),"\xa0\xa0",B.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"),"\xa0\xa0")}}],e.init=function(){var t=e.props.dispatch,a=JSON.parse(localStorage.getItem("userinfo"));t({type:"cost/selectCostByConditions",payload:{certCode:a.certCode},callback:function(t){t?e.state.costList=t:g["a"].error("\u52a0\u8f7d\u5931\u8d25")}})},e.handleFormReset=function(){var t=e.props.form;t.resetFields(),e.init(),e.flag=0},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),j.a.push({pathname:"/Entrustment/DetailForEntrustment"}),localStorage.setItem("reportDetailNo",e.reportno)},e.removeExistItem=function(t){e.listRemoveItem(e.state.costList,t.keyno);var a=y()(e.state.costList);e.setState({costList:a.filter(function(e){return e.keyno!==t.keyno})})},e.listRemoveItem=function(e,t){var a=e.length;while(a--)a in e&&e[a].keyno===t&&e.splice(a,1);return e},e.handleSubmit=function(){var t=F()(e),a=t.state,r=0;if(0!==a.costList.length){for(var n=0,l=a.costList.length;n<l;n++){if("\u5df2\u767b\u8bb0"!==a.costList[n].status)return void g["a"].error("\u5b58\u5728\u5df2\u62df\u5236\u7684\u6761\u76ee\uff0c\u8bf7\u67e5\u8be2\u5b8c\u91cd\u8bd5");void 0!==a.costList[n].reciever&&(a.paycompany=a.costList[n].reciever),r+=parseFloat(a.costList[n].costmoney)}e.state.total=r,void 0!==a.costList&&(e.state.paylistno=a.costList[0].reportno);var o=e.props.dispatch,s=JSON.parse(localStorage.getItem("userinfo"));o({type:"user/getMan",payload:{certcode:s.certCode,func:"\u6210\u672c\u5ba1\u6838"},callback:function(t){t?e.setState({approverusers:t}):g["a"].error("\u672a\u914d\u7f6e\u5ba1\u6838\u4eba\u7528\u6237\u89d2\u8272")}}),e.handleAddListVisible(!0)}else g["a"].error("\u672a\u5220\u9009\u5230\u6761\u76ee\uff0c\u8bf7\u91cd\u8bd5")},e.handleFormAddList=function(t){var a=e.props.dispatch,r=JSON.parse(localStorage.getItem("userinfo")),n={paylistno:t.paylistno,paycompany:t.paycompany,listman:r.nameC,certcode:r.certCode},l={costlist:n,reviewer:t.reviewer,costs:e.state.costList};a({type:"cost/addList",payload:l,callback:function(e){e?(g["a"].success("\u6210\u672c\u6e05\u5355\u6dfb\u52a0\u6210\u529f"),sessionStorage.setItem("CostListDetail_costlist",JSON.stringify(e)),j.a.push({pathname:"/CostManage/CostListDetail"})):g["a"].error("\u6210\u672c\u6e05\u5355\u6dfb\u52a0\u5931\u8d25")}})},e.handleSearch=function(){var t=e.props,a=t.dispatch,r=t.form;r.validateFields(function(t,n){if(!t){var l=JSON.parse(localStorage.getItem("userinfo")),o=[],s=[],i=[];void 0!==n.reciever&&""!==n.reciever&&(o.push("reciever"),s.push(n.reciever),i.push("=")),void 0!==n.occurdate&&0!==n.occurdate.length&&(o.push("occurdate"),s.push(n.occurdate[0].format("YYYY-MM-DD")),i.push(">="),o.push("occurdate"),s.push(n.occurdate[1].format("YYYY-MM-DD")),i.push("<=")),void 0!==n.status&&0!==n.status.length&&("\u672a\u62df\u5236"===n.status?(o.push("status"),s.push("\u5df2\u767b\u8bb0"),i.push("=")):"\u5df2\u62df\u5236"===n.status&&(o.push("status"),s.push("\u5df2\u767b\u8bb0"),i.push("!=")));var c=r.getFieldValue("keys");for(var u in c){var p=c[u],m=r.getFieldValue("kinds".concat(p)),d=r.getFieldValue("conditions".concat(p)),f=r.getFieldValue("values".concat(p)),h=r.getFieldValue("check".concat(p));!0===h&&void 0!==m&&void 0!==f&&void 0!==d&&(o.push(m),s.push(f),i.push(d))}var v={kinds:o,values:s,conditions:i,certCode:l.certCode};a({type:"cost/selectCostByConditions",payload:v,callback:function(t){t?(e.state.costList=t,g["a"].success("\u67e5\u8be2\u6210\u529f")):g["a"].error("\u67e5\u8be2\u5931\u8d25")}})}})},e.onFocusApproverusers=function(){null!=e.state.approverusers&&0!==e.state.approverusers.length||!1!==e.state.isViewonApproverusers||(N["a"].info({title:"\u672a\u914d\u7f6e\u6210\u672c\u5ba1\u6838\u7528\u6237\u89d2\u8272",content:"\u8bf7\u7ba1\u7406\u5458\u5728\u201c\u516c\u53f8\u7ba1\u7406-\u7528\u6237\u7ba1\u7406\u201d\u7ed9\u7528\u6237\u4fee\u6539\uff0c\u52a0\u9009\u7528\u6237\u89d2\u8272\uff01\u4e1a\u52a1\u7ecf\u7406\uff0c\u4e1a\u52a1\u526f\u603b\uff0c\u603b\u7ecf\u7406\u89d2\u8272\uff0c\u90fd\u53ef\u6210\u672c\u6e05\u5355\u5ba1\u6838\u3002",okText:"\u77e5\u9053\u4e86",onOk:function(){}}),e.setState({isViewonApproverusers:!0}))},e.remove=function(t){var a=e.props.form,r=a.getFieldValue("keys");e.props.form.validateFields(function(e,t){e||console.log("Received values of form: ",t)}),a.setFieldsValue({keys:r.filter(function(e){return e!==t})})},e.add=function(){var t=e.props.form,a=t.getFieldValue("keys"),r=a.concat(ae++);t.setFieldsValue({keys:r})},e.flag=0,e.handleAdvanceSearch=function(){if(0===e.flag){var t=4;while(t>0)e.add(),t--;e.flag=1}},e.handleAddListVisible=function(t){e.setState({modalAddListVisible:!!t})},e.getRepeatPayListNo=function(t,a,r){void 0!==a&&null!==a&&""!==a||r(Object(Q["formatMessage"])({id:"validation.paylistno.noexist"}));var n=e.props.dispatch,l=new FormData,o=JSON.parse(localStorage.getItem("userinfo"));l.append("certcode",o.certCode),l.append("paylistno",a),n({type:"charge/getRepeatPayListNo",payload:l,callback:function(e){"repeat"===e?r(Object(Q["formatMessage"])({id:"validation.paylistno.repeat"})):"success"===e?r():r(Object(Q["formatMessage"])({id:"validation.paylistno.error"}))}})},e}return k()(a,[{key:"componentDidMount",value:function(){this.init()}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return B.a.createElement(M["a"],{onSubmit:this.handleSearch,layout:"inline"},B.a.createElement(f["a"],{gutter:{md:6,lg:18,xl:5}},B.a.createElement(h["a"],{md:12,sm:20},B.a.createElement("span",{className:H.a.submitButtons},B.a.createElement(R["a"],{type:"primary",style:{marginLeft:0},onClick:this.handleFormReset},"\u91cd\u7f6e"),B.a.createElement(R["a"],{type:"primary",style:{marginLeft:8},onClick:this.handleAdvanceSearch},"\u9ad8\u7ea7\u68c0\u7d22"),B.a.createElement(R["a"],{type:"primary",style:{marginLeft:8},onClick:this.handleSearch},"\u67e5\u8be2"),B.a.createElement(R["a"],{type:"primary",style:{marginLeft:8},onClick:this.handleSubmit},"\u62df\u5236")))),B.a.createElement(f["a"],{gutter:{md:6,lg:18,xl:5}},B.a.createElement(h["a"],{md:9,sm:20},B.a.createElement(M["a"].Item,{label:"\u63a5\u6536\u4eba",labelCol:{span:5},wrapperCol:{span:6}},e("reciever",{rules:[{message:"\u8bf7\u8f93\u5165"}]})(B.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),B.a.createElement(h["a"],{md:8,sm:20},B.a.createElement(M["a"].Item,{label:"\u53d1\u751f\u65e5\u671f\uff1a",labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("occurdate",{})(B.a.createElement(U,{format:ee})))),B.a.createElement(h["a"],{md:6,sm:20},B.a.createElement(M["a"].Item,{label:"\u6210\u672c\u72b6\u6001\uff1a",labelCol:{span:5},wrapperCol:{span:6}},e("status",{rules:[{message:"\u8bf7\u8f93\u5165"}],initialValue:"\u5168\u90e8"})(B.a.createElement(d["a"].Group,{buttonStyle:"solid"},B.a.createElement(d["a"].Button,{value:"\u5168\u90e8"},"\u5168\u90e8"),B.a.createElement(d["a"].Button,{value:"\u672a\u62df\u5236"},"\u672a\u62df\u5236"),B.a.createElement(d["a"].Button,{value:"\u5df2\u62df\u5236"},"\u5df2\u62df\u5236"))))),B.a.createElement(h["a"],{md:1,sm:20},"  ",B.a.createElement(m["a"],{type:"plus-circle",style:{fontSize:24,marginTop:4},theme:"twoTone",twoToneColor:"#00ff00",onClick:this.add}))))}},{key:"render",value:function(){var e=this,t=this.props.loading,a=this.state,r=a.costList,n=a.modalAddListVisible,l=a.total,o=a.paycompany,c=a.paylistno,d=a.approverusers,v=d.map(function(e){return B.a.createElement($,{key:e.userName,value:e.userName},e.nameC)}),y={handleAddListVisible:this.handleAddListVisible,handleFormAddList:this.handleFormAddList,getRepeatPayListNo:this.getRepeatPayListNo,onFocusApproverusers:this.onFocusApproverusers},g=this.props.form,E=g.getFieldDecorator,C=g.getFieldValue;E("keys",{initialValue:[]});var b=C("keys"),k=b.map(function(t,a){return B.a.createElement("div",null,a%2===0&&0!==b.length?B.a.createElement(f["a"],{className:G.a.rowClass}):null,B.a.createElement(h["a"],{md:1,sm:20},B.a.createElement(M["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},E("check".concat(t),{initialValue:!0,valuePropName:"checked"})(B.a.createElement(p["a"],{checkedChildren:"\u5f00",unCheckedChildren:"\u5173"})))),B.a.createElement(h["a"],{md:3,sm:20},B.a.createElement(M["a"].Item,{style:{marginRight:8},labelCol:{span:5},wrapperCol:{span:6}},E("kinds".concat(t),{rules:[{message:"\u9009\u62e9\u5b57\u6bb5"}]})(B.a.createElement(x["a"],{placeholder:"\u9009\u62e9\u5b57\u6bb5"},B.a.createElement($,{value:"reportno"}," \u59d4\u6258\u7f16\u53f7"),B.a.createElement($,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),B.a.createElement($,{value:"costtype"},"\u8d39\u7528\u79cd\u7c7b"),B.a.createElement($,{value:"costname"},"\u8d39\u7528\u540d\u79f0"),B.a.createElement($,{value:"costmoney"},"\u91d1\u989d"),B.a.createElement($,{value:"register"},"\u767b\u8bb0\u4eba"))))),B.a.createElement(h["a"],{md:3,sm:20},B.a.createElement(M["a"].Item,{style:{marginRight:8},labelCol:{span:5},wrapperCol:{span:6}},E("conditions".concat(t),{rules:[{message:"\u9009\u62e9\u6761\u4ef6"}]})(B.a.createElement(x["a"],{placeholder:"\u9009\u62e9\u6761\u4ef6"},B.a.createElement($,{value:"="},"\u7b49\u4e8e"),B.a.createElement($,{value:"!="},"\u4e0d\u7b49\u4e8e"),B.a.createElement($,{value:"like"},"\u5305\u542b"),B.a.createElement($,{value:"not like"},"\u4e0d\u5305\u542b"))))),B.a.createElement(h["a"],{md:4,sm:10},B.a.createElement(M["a"].Item,null,E("values".concat(t),{rules:[{message:"\u9009\u62e9\u6570\u503c"}]})(B.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),B.a.createElement(h["a"],{md:1,sm:5},b.length>=1?B.a.createElement(m["a"],{style:{fontSize:24,marginLeft:8},type:"minus-circle",theme:"twoTone",twoToneColor:"#ff0000",onClick:function(){return e.remove(t)}}):null))});return B.a.createElement(K["a"],{title:"\u6e05\u5355\u62df\u5236"},B.a.createElement(s["a"],{bordered:!1,size:"small"},B.a.createElement("div",{className:H.a.tableList},B.a.createElement(M["a"],{onSubmit:this.handleSubmit},B.a.createElement("div",{className:H.a.tableListForm},this.renderSimpleForm()),B.a.createElement(f["a"],{className:H.a.tableListForm},k),B.a.createElement(te,u()({},y,{approverusersOptions:v,modalAddListVisible:n,costList:r,paylistno:c,total:l,paycompany:o}))),B.a.createElement(i["a"],{style:{marginTop:5},loading:t,dataSource:r,columns:this.columns,rowKey:"keyno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(P["PureComponent"]),l=o))||l)||l);t["default"]=re}}]);