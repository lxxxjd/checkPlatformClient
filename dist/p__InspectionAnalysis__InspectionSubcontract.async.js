(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[107],{BwD7:function(e,t,a){"use strict";a.r(t);a("5NDa");var n,r,o,l=a("5rEg"),s=(a("7Kak"),a("9yH6")),i=(a("iQDF"),a("+eQT")),c=(a("IzEo"),a("bx4M")),m=(a("g9YV"),a("wCAj")),p=(a("2qtc"),a("kLXV")),u=(a("miYZ"),a("tsqr")),d=a("p0pE"),f=a.n(d),h=a("2Taf"),g=a.n(h),y=a("vZ4D"),v=a.n(y),E=a("l4Ni"),S=a.n(E),I=a("ujKo"),C=a.n(I),b=a("MhPg"),k=a.n(b),w=(a("OaEy"),a("2fM7")),A=(a("y8nQ"),a("Vl3Y")),D=(a("sRBo"),a("kaz8")),O=a("q1tI"),R=a.n(O),x=a("MuoO"),N=a("3a4m"),F=a.n(N),M=a("zHco"),P=a("glGN"),Y=a.n(P),T=a("wd/R"),J=a.n(T),q=(a("14J3"),a("BMrR")),V=(a("+L6B"),a("2/Rp")),z=(a("jCWc"),a("kPKH")),j=a("e+8u"),B=a.n(j);function L(e){return function(){var t,a=C()(e);if(K()){var n=C()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return S()(this,t)}}function K(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var Q,G,H,Z,W=A["a"].Item,X=w["a"].Option,U=(n=Object(x["connect"])(function(e){var t=e.inspectionAnalysis,a=e.loading;return{inspectionAnalysis:t,loading:a.models.inspectionAnalysis}}),n((o=function(e){k()(a,e);var t=L(a);function a(){var e;g()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,r=a.form,o=JSON.parse(localStorage.getItem("userinfo")).certCode;r.validateFields(function(e,t){if(console.log(e),!e){var a=f()({},t,{certCode:o,kind:t.kind,value:t.value});n({type:"inspectionAnalysis/getAllSampleAndTestCompany",payload:a})}})},e.handleFormReset=function(){var t=e.props.form;t.resetFields(),e.setState({formValues:{}});var a=JSON.parse(localStorage.getItem("userinfo")).certCode,n=e.props.dispatch;n({type:"inspectionAnalysis/getAllSampleAndTestCompany",payload:{certCode:a}})},e}return v()(a,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return R.a.createElement(A["a"],{onSubmit:this.handleSearch,layout:"inline"},R.a.createElement(q["a"],{gutter:{md:8,lg:24,xl:48}},R.a.createElement(z["a"],{md:4,sm:20},R.a.createElement(A["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(R.a.createElement(w["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},R.a.createElement(X,{value:"m.reportno"},"\u59d4\u6258\u7f16\u53f7"),R.a.createElement(X,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),R.a.createElement(X,{value:"cargoname"},"\u68c0\u67e5\u54c1\u540d"),R.a.createElement(X,{value:"sr.sampleno"},"\u6837\u54c1\u7f16\u53f7"),R.a.createElement(X,{value:"samplename"},"\u6837\u54c1\u540d\u79f0"))))),R.a.createElement(z["a"],{md:6,sm:20},R.a.createElement(W,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(R.a.createElement(l["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),R.a.createElement(z["a"],{md:8,sm:20},R.a.createElement("span",{className:B.a.submitButtons},R.a.createElement(V["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),R.a.createElement(V["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}}]),a}(O["PureComponent"]),r=o))||r),$=U;function _(e){return function(){var t,a=C()(e);if(ee()){var n=C()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return S()(this,t)}}function ee(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}D["a"].Group,A["a"].Item;var te=w["a"].Option,ae=A["a"].create()($),ne=(Q=Object(x["connect"])(function(e){var t=e.inspectionAnalysis,a=e.loading;return{inspectionAnalysis:t,loading:a.models.inspectionAnalysis}}),G=A["a"].create(),Q(H=G((Z=function(e){k()(a,e);var t=_(a);function a(){var e;g()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={formValues:{},visible:!1,allCompanyName:[],selectEntrustment:null,showPrice:!0},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return R.a.createElement("span",null,J()(e).format("YYYY-MM-DD"))}},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u6837\u54c1\u7f16\u53f7",dataIndex:"sampleno"},{title:"\u6837\u54c1\u540d\u79f0",dataIndex:"samplename"},{title:"\u5206\u5305\u516c\u53f8",dataIndex:"testman"},{title:"\u72b6\u6001",dataIndex:"state"},{title:"\u64cd\u4f5c",render:function(t,a){return R.a.createElement(O["Fragment"],null,"\u5df2\u53d1\u5e03"===t.overallstate||"\u7533\u8bf7\u4f5c\u5e9f"===t.overallstate?[]:[R.a.createElement("a",{onClick:function(){return e.show(t,a)}},"\u5206\u5305\xa0\xa0")],R.a.createElement("a",{onClick:function(){return e.detailItem(t,a)}},"\u67e5\u770b\xa0\xa0"),R.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),F.a.push({pathname:"/Entrustment/DetailForEntrustment"}),localStorage.setItem("reportDetailNo",e.reportno)},e.detailItem=function(e){sessionStorage.setItem("reportno",e.reportno),sessionStorage.setItem("shipname",e.shipname),sessionStorage.setItem("applicant",e.applicant),sessionStorage.setItem("sampleno",e.sampleno),F.a.push({pathname:"/InspectionAnalysis/InspectionArrangementDetail"})},e.handleOk=function(){var t=e.props,a=t.form.validateFieldsAndScroll,n=t.dispatch;a(function(t,a){var r=JSON.parse(localStorage.getItem("userinfo")),o=sessionStorage.getItem("reportno"),l=sessionStorage.getItem("sampleno");t||(n({type:"inspectionAnalysis/assign",payload:f()({},a,{assignman:r.nameC,assignsort:"\u54c1\u8d28\u5206\u5305",nameC:r.nameC,reportno:o,sampleno:l}),callback:function(t){if(200===t.code){var a=JSON.parse(localStorage.getItem("userinfo")).certCode;n({type:"inspectionAnalysis/getAllSample",payload:{certCode:a}}),u["a"].success("\u5206\u5305\u6210\u529f"),e.componentDidMount()}else u["a"].error("\u5206\u5305\u5931\u8d25");e.setState({visible:!1})}}),form.resetFields())})},e.show=function(t){null===t.testman||void 0===t.testman?"\u5df2\u767b\u8bb0"===t.state?p["a"].confirm({title:"\u672a\u6dfb\u52a0\u6307\u6807\uff0c\u786e\u5b9a\u7ee7\u7eed\u5206\u5305\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){e.subcontract(t)}}):e.subcontract(t):p["a"].info({okText:"\u786e\u5b9a",title:"\u6837\u54c1\u5df2\u5206\u5305\uff0c\u8bf7\u67e5\u770b\u540e\u5220\u9664\uff0c\u53ef\u91cd\u65b0\u5206\u5305"})},e.subcontract=function(t){var a=e.props,n=a.form,r=a.dispatch;sessionStorage.setItem("reportno",t.reportno),sessionStorage.setItem("sampleno",t.sampleno),r({type:"inspectionAnalysis/getReport",payload:{reportno:t.reportno},callback:function(e){200===e.code&&n.setFieldsValue({inspwaymemo1:e.data.inspwaymemo1})}}),e.setState({visible:!0})},e.onChange=function(t){"\u6309\u5355\u4ef7"===t.target.value||"\u6309\u6bd4\u4f8b"===t.target.value?e.setState({showPrice:!0}):e.setState({showPrice:!1})},e.handleCancel=function(){e.setState({visible:!1})},e}return v()(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.dispatch,a=JSON.parse(localStorage.getItem("userinfo")).certCode;t({type:"inspectionAnalysis/getAllSampleAndTestCompany",payload:{certCode:a}}),t({type:"inspectionAnalysis/getCompany",payload:{certCode:a,type:"\u5b9e\u9a8c\u5ba4"},callback:function(t){e.setState({allCompanyName:t}),null!==t&&0!==t.length||p["a"].info({title:"\u5206\u5305\u65b9\u4fe1\u606f\u672a\u914d\u7f6e",content:"\u8bf7\u7ba1\u7406\u5458\u5728\u201c\u516c\u53f8\u7ba1\u7406-\u5206\u5305\u65b9\u201d\u83dc\u5355\u914d\u7f6e\uff01",okText:"\u77e5\u9053\u4e86",onOk:function(){}})}})}},{key:"render",value:function(){var e=this.props,t=e.inspectionAnalysis.samplesSubcontact,a=e.form.getFieldDecorator,n=e.loading,r=this.state,o=r.visible,u=r.allCompanyName,d=r.showPrice,f=u.map(function(e){return R.a.createElement(te,{key:e,value:e},e)});return R.a.createElement(M["a"],{title:"\u68c0\u9a8c\u5b89\u6392"},R.a.createElement(c["a"],{bordered:!1,size:"small"},R.a.createElement("div",{className:Y.a.tableList},R.a.createElement("div",{className:Y.a.tableListForm},R.a.createElement(ae,null)),R.a.createElement(m["a"],{size:"middle",loading:n,dataSource:t.list,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns,rowKey:"sampleno"}))),R.a.createElement(p["a"],{title:"\u5206\u5305",visible:o,onOk:this.handleOk,onCancel:this.handleCancel,style:{top:10}},R.a.createElement(A["a"],null,R.a.createElement(A["a"].Item,{label:"\u5206\u5305\u5b9e\u9a8c\u5ba4"},a("testman",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5206\u5305\u5b9e\u9a8c\u5ba4"}]})(R.a.createElement(w["a"],{showSearch:!0,placeholder:"\u8bf7\u9009\u62e9",filterOption:!1,onSearch:this.handleSearch},f))),R.a.createElement(A["a"].Item,{label:"\u5206\u5305\u65e5\u671f"},a("assigndate",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5206\u5305\u65e5\u671f"}]})(R.a.createElement(i["a"],{placeholder:"\u59d4\u6258\u65e5\u671f",style:{width:"100%"},format:"YYYY-MM-DD",getPopupContainer:function(e){return e.parentNode}}))),R.a.createElement(A["a"].Item,{label:"\u8ba1\u4ef7\u65b9\u5f0f"},a("priceway",{initialValue:"\u6309\u5355\u4ef7",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8ba1\u4ef7\u65b9\u5f0f"}]})(R.a.createElement(s["a"].Group,{onChange:this.onChange},R.a.createElement(s["a"],{value:"\u6309\u5355\u4ef7"},"\u6309\u5355\u4ef7"),R.a.createElement(s["a"],{value:"\u6309\u6279\u6b21"},"\u6309\u6279\u6b21")))),{true:R.a.createElement(A["a"].Item,{label:"\u5355\u4ef7"},a("price",{rules:!0===d?[{required:"true",message:"\u8bf7\u8f93\u5165\u5355\u4ef7"}]:[]})(R.a.createElement(l["a"],{placeholder:"\u8bf7\u8f93\u5165\u5355\u4ef7"})))}[d],R.a.createElement(A["a"].Item,{label:"\u603b\u8ba1\u8d39\u7528"},a("totalfee",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u603b\u8ba1\u8d39\u7528"}]})(R.a.createElement(l["a"],{placeholder:"\u8bf7\u8f93\u5165\u603b\u8ba1\u8d39\u7528"}))),R.a.createElement(A["a"].Item,{label:" \u5907\u6ce8"},a("inspwaymemo1",{rules:[]})(R.a.createElement(l["a"],{placeholder:"\u8bf7\u8f93\u5165\u5907\u6ce8"}))))))}}]),a}(O["PureComponent"]),H=Z))||H)||H);t["default"]=ne}}]);