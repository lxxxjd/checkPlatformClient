(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[130],{"I/H1":function(e,t,a){"use strict";a.r(t);a("IzEo");var n,l,o,r,c=a("bx4M"),s=(a("g9YV"),a("wCAj")),i=a("jehZ"),m=a.n(i),u=(a("Pwec"),a("CtXQ")),d=(a("5NDa"),a("5rEg")),p=(a("BoS7"),a("Sdc0")),f=(a("14J3"),a("BMrR")),h=(a("jCWc"),a("kPKH")),v=(a("iQDF"),a("+eQT")),g=a("2Taf"),E=a.n(g),y=a("vZ4D"),b=a.n(y),C=a("l4Ni"),k=a.n(C),w=a("ujKo"),I=a.n(w),S=a("MhPg"),F=a.n(S),V=(a("OaEy"),a("2fM7")),Y=(a("y8nQ"),a("Vl3Y")),D=(a("2qtc"),a("kLXV")),R=(a("bP8k"),a("gFTJ")),M=(a("+L6B"),a("2/Rp")),L=a("q1tI"),N=a.n(L),x=a("MuoO"),B=a("3a4m"),O=a.n(B),J=a("wd/R"),P=a.n(J),T=a("zHco"),q=a("wfHX"),z=a.n(q),Q=a("glGN"),j=a.n(Q);function H(e){return function(){var t,a=I()(e);if(A()){var n=I()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return k()(this,t)}}function A(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var X=function(e){var t=e.modalReviewVisible,a=e.handleModalReviewVisible,n=e.modalInfo,l=function(e){return void 0!==e&&null!==e?N.a.createElement("span",null,P()(e).format("YYYY-MM-DD")):null},o=l(n.makingdate);return N.a.createElement(D["a"],{destroyOnClose:!0,title:"\u67e5\u770b\u6837\u54c1\u8be6\u60c5",visible:t,style:{top:100},width:800,onCancel:function(){return a()},footer:[N.a.createElement(M["a"],{type:"primary",onClick:function(){return a()}},"\u5173\u95ed")]},N.a.createElement(R["a"],{bordered:!0},N.a.createElement(R["a"].Item,{label:"\u59d4\u6258\u7f16\u53f7"},n.reportno),N.a.createElement(R["a"].Item,{label:"\u8239\u540d\u6807\u8bc6"},n.shipname),N.a.createElement(R["a"].Item,{label:"\u68c0\u67e5\u54c1\u540d"},n.cargoname),N.a.createElement(R["a"].Item,{label:"\u6837\u54c1\u7f16\u53f7"},n.cargoname),N.a.createElement(R["a"].Item,{label:"\u6837\u54c1\u540d\u79f0"},n.samplename),N.a.createElement(R["a"].Item,{label:"\u6837\u54c1\u7528\u9014"},n.sampleuse),N.a.createElement(R["a"].Item,{label:"\u6301\u6709\u4eba"},n.duration),N.a.createElement(R["a"].Item,{label:"\u4fdd\u5b58\u5929\u6570"},n.reportno),N.a.createElement(R["a"].Item,{label:"\u5b58\u653e\u4f4d\u7f6e"},n.position),N.a.createElement(R["a"].Item,{label:"\u5236\u5907\u65e5\u671f"},o),N.a.createElement(R["a"].Item,{label:"\u72b6\u6001"},n.status)))},K=0,W=Y["a"].Item,Z=V["a"].Option,G=(n=Object(x["connect"])(function(e){var t=e.cost,a=e.loading;return{cost:t,loading:a.models.cost}}),l=Y["a"].create(),n(o=l((r=function(e){F()(a,e);var t=H(a);function a(){var e;E()(this,a);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return e=t.call.apply(t,[this].concat(l)),e.state={formValues:{},modalReviewVisible:!1,modalInfo:{},costResult:[],costsum:"0"},e.columns=[{title:"\u53d1\u751f\u65e5\u671f",dataIndex:"occurdate",render:function(e){return N.a.createElement("span",null,P()(e).format("YYYY-MM-DD"))}},{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u8d39\u7528\u79cd\u7c7b",dataIndex:"costtype"},{title:"\u8d39\u7528\u540d\u79f0",dataIndex:"costname"},{title:"\u91d1\u989d",dataIndex:"costmoney"},{title:"\u6e05\u5355\u53f7",dataIndex:"paylistno"},{title:"\u63a5\u6536\u4eba",dataIndex:"reciever"},{title:"\u72b6\u6001",dataIndex:"status"},{title:"\u64cd\u4f5c",render:function(t,a){return N.a.createElement(L["Fragment"],null,N.a.createElement("a",{onClick:function(){return e.handleReview(!0,t)}},"\u67e5\u770b"))}}],e.init=function(){var t=JSON.parse(localStorage.getItem("userinfo")),a=e.props.dispatch,n={certCode:t.certCode};a({type:"cost/selectCostByConditions",payload:n,callback:function(t){e.state.costResult=t,a({type:"cost/selectCostByConditionsSumMoney",payload:n,callback:function(t){200===t.code&&e.setState({costsum:t.data})}})}})},e.previewItem=function(e){window.open("/Entrustment/DetailForEntrustment"),localStorage.setItem("reportDetailNo",e.reportno)},e.handleFormReset=function(){var t=e.props.form;t.resetFields(),e.init(),e.flag=0},e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,l=a.form;l.validateFields(function(t,a){if(t)console.log(t);else{var o=JSON.parse(localStorage.getItem("userinfo")),r=[],c=[],s=[];void 0!==a.occurdate&&void 0!==a.occurdate&&0!==a.occurdate.length&&(r.push("occurdate"),r.push("occurdate"),s.push(">="),c.push(P()(a.occurdate[0]).format("YYYY-MM-DD")),s.push("<="),c.push(P()(a.occurdate[1]).format("YYYY-MM-DD")));var i=l.getFieldValue("keys");for(var m in i){var u=i[m];console.log(u);var d=l.getFieldValue("kinds".concat(u)),p=l.getFieldValue("conditions".concat(u)),f=l.getFieldValue("values".concat(u)),h=l.getFieldValue("check".concat(u));!0===h&&void 0!==d&&void 0!==f&&void 0!==p&&(r.push(d),c.push(f),s.push(p))}var v={kinds:r,values:c,conditions:s,certCode:o.certCode};n({type:"cost/selectCostByConditions",payload:v,callback:function(t){e.state.costResult=t,n({type:"cost/selectCostByConditionsSumMoney",payload:v,callback:function(t){200===t.code&&e.setState({costsum:t.data})}})}})}})},e.handleTotalSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,l=a.form;l.validateFields(function(t,a){if(t)console.log(t);else{var o=JSON.parse(localStorage.getItem("userinfo")),r=[],c=[],s=[];void 0!==a.occurdate&&void 0!==a.occurdate&&0!==a.occurdate.length&&(r.push("occurdate"),r.push("occurdate"),s.push(">="),c.push(P()(a.occurdate[0]).format("YYYY-MM-DD")),s.push("<="),c.push(P()(a.occurdate[1]).format("YYYY-MM-DD")));var i=l.getFieldValue("keys");for(var m in i){var u=i[m];console.log(u);var d=l.getFieldValue("kinds".concat(u)),p=l.getFieldValue("conditions".concat(u)),f=l.getFieldValue("values".concat(u)),h=l.getFieldValue("check".concat(u));!0===h&&void 0!==d&&void 0!==f&&void 0!==p&&(r.push(d),c.push(f),s.push(p))}var v={kinds:r,values:c,conditions:s,certCode:o.certCode};n({type:"cost/selectCostByConditionsSumMoney",payload:v,callback:function(t){200===t.code&&e.setState({costsum:t.data})}})}})},e.handleReview=function(e,t){sessionStorage.setItem("reportno",t.reportno),localStorage.setItem("reportDetailNo",t.reportno),sessionStorage.setItem("CostListDetail_costlist",JSON.stringify(t)),O.a.push({pathname:"/Statistics/CostQueryDetail"})},e.handleModalReviewVisible=function(t){e.setState({modalReviewVisible:!!t})},e.remove=function(t){var a=e.props.form,n=a.getFieldValue("keys");e.props.form.validateFields(function(e,t){}),a.setFieldsValue({keys:n.filter(function(e){return e!==t})})},e.add=function(){var t=e.props.form,a=t.getFieldValue("keys"),n=a.concat(K++);t.setFieldsValue({keys:n})},e.flag=0,e.handleAdvanceSearch=function(){if(0===e.flag){var t=4;while(t>0)e.add(),t--;e.flag=1}},e}return b()(a,[{key:"componentDidMount",value:function(){this.init()}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator,t=this.state.costsum,a=v["a"].RangePicker;return N.a.createElement(Y["a"],{onSubmit:this.handleSearch,layout:"inline"},N.a.createElement(f["a"],{gutter:16},N.a.createElement(h["a"],{span:4,style:{marginBottom:5}},N.a.createElement("h3",{style:{fontWeight:"bold"}},"\u7edf\u8ba1\u7ed3\u679c:")),N.a.createElement(h["a"],{span:12,style:{marginBottom:5,marginLeft:200,marginRight:200}},N.a.createElement("h3",{style:{fontWeight:"bold"}},"\u6210\u672c\u603b\u989d\uff1a",void 0!==t&&null!==t?t:0))),N.a.createElement(f["a"],{gutter:{md:6,lg:18,xl:5}},N.a.createElement(h["a"],{span:9},N.a.createElement(Y["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},label:"\u53d1\u751f\u65e5\u671f",colon:!1},e("occurdate",{})(N.a.createElement(a,{format:"YYYY-MM-DD"})))),N.a.createElement(h["a"],{md:8,sm:20},N.a.createElement("span",{className:j.a.submitButtons},N.a.createElement(M["a"],{type:"primary",style:{marginLeft:8},htmlType:"submit"},"\u67e5\u8be2"),N.a.createElement(M["a"],{type:"primary",style:{marginLeft:8},onClick:this.handleTotalSearch},"\u67e5\u8be2\u603b\u989d"),N.a.createElement(M["a"],{style:{marginLeft:8},onClick:this.handleAdvanceSearch},"\u9ad8\u7ea7\u68c0\u7d22"),N.a.createElement(M["a"],{style:{marginLeft:0},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this,t=this.props.loading,a=this.props.form,n=a.getFieldDecorator,l=a.getFieldValue;n("keys",{initialValue:[]});var o=l("keys"),r=this.state,i=r.modalReviewVisible,v=r.modalInfo,g=r.costResult,E={handleModalReviewVisible:this.handleModalReviewVisible},y=o.map(function(t,a){return N.a.createElement("div",null,a%2===0&&0!==o.length?N.a.createElement(f["a"],{className:z.a.rowClass}):null,N.a.createElement(h["a"],{md:1,sm:20},N.a.createElement(Y["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},n("check".concat(t),{initialValue:!0,valuePropName:"checked"})(N.a.createElement(p["a"],{checkedChildren:"\u5f00",unCheckedChildren:"\u5173",defaultChecked:!0})))),N.a.createElement(h["a"],{md:3,sm:20},N.a.createElement(Y["a"].Item,{style:{marginRight:8},labelCol:{span:5},wrapperCol:{span:6}},n("kinds".concat(t),{rules:[{message:"\u9009\u62e9\u5b57\u6bb5"}]})(N.a.createElement(V["a"],{placeholder:"\u9009\u62e9\u5b57\u6bb5"},N.a.createElement(Z,{value:"reportno"}," \u59d4\u6258\u7f16\u53f7"),N.a.createElement(Z,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),N.a.createElement(Z,{value:"cargoname"},"\u68c0\u67e5\u54c1\u540d"),N.a.createElement(Z,{value:"cargoname"},"\u68c0\u67e5\u9879\u76ee"),N.a.createElement(Z,{value:"cargosort"},"\u8d27\u7269\u79cd\u7c7b"),N.a.createElement(Z,{value:"inspectplace"},"\u68c0\u9a8c\u5730\u70b9"),N.a.createElement(Z,{value:"section"},"\u6267\u884c\u90e8\u95e8"),N.a.createElement(Z,{value:"applicant"},"\u59d4\u6258\u4eba"),N.a.createElement(Z,{value:"agent"},"\u4ee3\u7406\u4eba"),N.a.createElement(Z,{value:"payer"},"\u4ed8\u6b3e\u4eba"),N.a.createElement(Z,{value:"costtype"},"\u8d39\u7528\u79cd\u7c7b"),N.a.createElement(Z,{value:"costname"},"\u8d39\u7528\u540d\u79f0"),N.a.createElement(Z,{value:"reciever"},"\u63a5\u6536\u4eba"))))),N.a.createElement(h["a"],{md:3,sm:20},N.a.createElement(Y["a"].Item,{style:{marginRight:8},labelCol:{span:5},wrapperCol:{span:6}},n("conditions".concat(t),{rules:[{message:"\u9009\u62e9\u6761\u4ef6"}]})(N.a.createElement(V["a"],{placeholder:"\u9009\u62e9\u6761\u4ef6"},N.a.createElement(Z,{value:"="},"\u7b49\u4e8e"),N.a.createElement(Z,{value:"!="},"\u4e0d\u7b49\u4e8e"),N.a.createElement(Z,{value:"like"},"\u5305\u542b"),N.a.createElement(Z,{value:"not like"},"\u4e0d\u5305\u542b"))))),N.a.createElement(h["a"],{md:4,sm:10},N.a.createElement(W,null,n("values".concat(t),{rules:[{message:"\u9009\u62e9\u6570\u503c"}]})(N.a.createElement(d["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),N.a.createElement(h["a"],{md:1,sm:5},o.length>=1?N.a.createElement(u["a"],{style:{fontSize:24,marginLeft:8},type:"minus-circle",theme:"twoTone",twoToneColor:"#ff0000",onClick:function(){return e.remove(t)}}):null))});return N.a.createElement(T["a"],{title:"\u6837\u54c1\u67e5\u8be2"},N.a.createElement(X,m()({},E,{modalReviewVisible:i,modalInfo:v})),N.a.createElement(c["a"],{bordered:!1,size:"small"},N.a.createElement(Y["a"],{onSubmit:this.handleSubmit},N.a.createElement("div",{className:j.a.tableListForm},this.renderSimpleForm()),N.a.createElement(f["a"],{className:j.a.tableListForm},y)),N.a.createElement("div",{className:j.a.tableList},N.a.createElement(s["a"],{size:"middle",rowKey:"keyno",loading:t,dataSource:g,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns}))))}}]),a}(L["PureComponent"]),o=r))||o)||o);t["default"]=G},wfHX:function(e,t,a){e.exports={rowClass:"antd-pro-pages-statistics-cost-query-rowClass","dynamic-delete-button":"antd-pro-pages-statistics-cost-query-dynamic-delete-button",tableList:"antd-pro-pages-statistics-cost-query-tableList",tableListOperator:"antd-pro-pages-statistics-cost-query-tableListOperator",tableListForm:"antd-pro-pages-statistics-cost-query-tableListForm"}}}]);