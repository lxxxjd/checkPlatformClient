(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[61],{"0tbq":function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,o,l,i=a("bx4M"),c=(a("g9YV"),a("wCAj")),s=(a("14J3"),a("BMrR")),d=(a("jCWc"),a("kPKH")),p=(a("+L6B"),a("2/Rp")),u=(a("5NDa"),a("5rEg")),m=(a("DZo9"),a("8z0m")),f=(a("Pwec"),a("CtXQ")),h=(a("miYZ"),a("tsqr")),g=(a("2qtc"),a("kLXV")),v=a("d6i3"),w=a.n(v),y=a("1l/V"),b=a.n(y),E=(a("/xke"),a("TeRw")),C=a("2Taf"),S=a.n(C),k=a("vZ4D"),I=a.n(k),D=a("l4Ni"),V=a.n(D),R=a("ujKo"),M=a.n(R),N=a("MhPg"),x=a.n(N),F=(a("y8nQ"),a("Vl3Y")),L=(a("OaEy"),a("2fM7")),O=a("q1tI"),P=a.n(O),z=a("MuoO"),q=a("zHco"),J=a("wd/R"),Y=a.n(J),j=a("V54k"),B=a.n(j);function U(e){return function(){var t,a=M()(e);if(A()){var n=M()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return V()(this,t)}}function A(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var T=L["a"].Option;function K(e){return new Promise(function(t,a){var n=new FileReader;n.readAsDataURL(e),n.onload=function(){return t(n.result)},n.onerror=function(e){return a(e)}})}var Q=(n=F["a"].create(),r=Object(z["connect"])(function(e){var t=e.company,a=e.loading;return{company:t,loading:a.models.company}}),n(o=r((l=function(e){x()(a,e);var t=U(a);function a(){var e;S()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={visible:!1,downloadVisible:!1,previewVisible:!1,previewImage:"",fileList:[],modelName:[],url:null,showVisible:!1,recordData:[]},e.columns=[{title:"\u6587\u4ef6\u540d\u79f0",dataIndex:"recordname",render:function(e){var t=/\.{1}[a-z]{1,}$/;return null!==t.exec(e)?P.a.createElement("span",null,e.slice(0,t.exec(e).index)):P.a.createElement("span",null,e)}},{title:"\u4e0a\u4f20\u65e5\u671f",dataIndex:"recorddate",render:function(e){return P.a.createElement("span",null,Y()(e).format("YYYY-MM-DD"))}},{title:"\u6587\u4ef6\u7c7b\u578b",dataIndex:"filetype"},{title:"\u64cd\u4f5c",render:function(t,a){return P.a.createElement(O["Fragment"],null,P.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u67e5\u770b"),"\xa0\xa0",P.a.createElement("a",{onClick:function(){return e.deleteItem(t,a)}},"\u5220\u9664"),"\xa0\xa0")}}],e.previewItem=function(t){var a=e.props.dispatch;a({type:"company/getUrl",payload:{url:t.osspath},callback:function(t){if(400===t.code)E["a"].open({message:"\u6253\u5f00\u5931\u8d25",description:t.data});else{var a=t.data;e.setState({url:a}),e.setState({showVisible:!0})}}})},e.deleteItem=function(t){var a=e.props.dispatch;a({type:"company/deleteManRecord",payload:{keyno:t.keyno},callback:function(t){400===t.code?E["a"].open({message:"\u5220\u9664\u5931\u8d25",description:t.data}):(E["a"].open({message:"\u5220\u9664\u6210\u529f",description:t.data}),e.componentDidMount())}})},e.handleOk=function(){var t=e.props,a=t.form.validateFieldsAndScroll,n=t.dispatch;sessionStorage.getItem("reportno");a(function(t,a){if(!t){var r=new FormData,o=JSON.parse(localStorage.getItem("userinfo")),l=sessionStorage.getItem("nameC");a.MultipartFile.fileList.forEach(function(e){r.append("file",e.originFileObj)}),r.append("certcode",o.certCode),r.append("nameC",l),r.append("filetype",a.filetype),r.append("recordname",a.recordname),n({type:"company/uploadManRecord",payload:r,callback:function(t){400===t.code?E["a"].open({message:"\u6dfb\u52a0\u5931\u8d25",description:t.message}):e.componentDidMount()}}),e.setState({visible:!1}),form.resetFields()}console.log(t)})},e.show=function(){var t=e.props,a=t.form;t.dispatch,sessionStorage.getItem("reportno");a.resetFields(),e.setState({fileList:[]}),e.setState({visible:!0})},e.handleCancel=function(){var t=e.props.form;t.resetFields(),e.setState({visible:!1})},e.onChange=function(t){"\u6309\u5355\u4ef7"===t.target.value||"\u6309\u6bd4\u4f8b"===t.target.value?e.setState({showPrice:!0}):e.setState({showPrice:!1})},e.Cancel=function(){return e.setState({previewVisible:!1})},e.handlePreview=function(){var t=b()(w.a.mark(function t(a){return w.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(a.url||a.preview){t.next=4;break}return t.next=3,K(a.originFileObj);case 3:a.preview=t.sent;case 4:e.setState({previewImage:a.url||a.preview,previewVisible:!0});case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),e.handleChange=function(t){var a=t.file,n=t.fileList,r="application/pdf"===a.type,o=a.size/1024/1024<20;r?o?e.setState({fileList:n}):g["a"].error({title:"\u8d85\u8fc720M\u9650\u5236\uff0c\u4e0d\u5141\u8bb8\u4e0a\u4f20~"}):g["a"].error({title:"\u53ea\u80fd\u4e0a\u4f20PDF\u683c\u5f0f\u7684\u56fe\u7247~"})},e.handleBeforeUpload=function(e){return!1},e.showDownloadVisible=function(t){e.setState({downloadVisible:!!t})},e.handleDownloadCancel=function(t){e.setState({downloadVisible:!!t})},e.handleDownloadAdd=function(t){var a=e.props.dispatch,n=sessionStorage.getItem("reportno"),r={reportno:n,tempName:t.tempName,recordName:t.downloadRecordName};a({type:"testRecordEntrustment/downloadPlatFromTemp",payload:r,callback:function(e){e&&h["a"].success("\u4e0b\u8f7d\u6210\u529f")}}),console.log(r),e.setState({downloadVisible:!1})},e.handleOnSelect=function(t){var a=JSON.parse(localStorage.getItem("userinfo")),n="";n="platform"===t?"platform":"company"===t?a.certCode:"person"===t?a.userName:"blank";var r=e.props.dispatch,o={type:t,owner:n};r({type:"testRecordEntrustment/getModelName",payload:o,callback:function(t){t&&(e.state.modelName=t)}})},e.back=function(){e.props.history.goBack()},e.showCancel=function(){e.setState({showVisible:!1})},e}return I()(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.dispatch,a=sessionStorage.getItem("nameC"),n=JSON.parse(localStorage.getItem("userinfo"));t({type:"company/getManRecord",payload:{nameC:a,certCode:n.certCode},callback:function(t){200===t.code&&e.setState({recordData:t.data})}})}},{key:"render",value:function(){var e=P.a.createElement("div",null,P.a.createElement(f["a"],{type:"plus"}),P.a.createElement("div",{className:"ant-upload-text"},"Upload")),t=this.props,a=t.loading,n=t.form.getFieldDecorator,r=this.state,o=r.fileList,l=r.visible,h=r.previewVisible,v=r.previewImage,w=(r.downloadVisible,r.modelName),y=r.url,b=r.showVisible,E=r.recordData,C=(w.map(function(e){return P.a.createElement(T,{key:e,value:e},e)}),sessionStorage.getItem("nameC")),S={nameC:C};return P.a.createElement(q["a"],{text:S},P.a.createElement(g["a"],{title:"\u6587\u4ef6\u4e0a\u4f20",visible:l,onOk:this.handleOk,onCancel:this.handleCancel},P.a.createElement(F["a"],null,P.a.createElement(F["a"].Item,{label:"\u6587\u4ef6\u4e0a\u4f20"},n("MultipartFile",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u4e0a\u4f20\u6587\u4ef6"}]})(P.a.createElement(m["a"],{listType:"picture-card",fileList:o,onPreview:this.handlePreview,beforeUpload:this.handleBeforeUpload,onChange:this.handleChange},o.length>=1?null:e))),P.a.createElement(F["a"].Item,{label:"\u6587\u4ef6\u7c7b\u578b"},n("filetype",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u4ef6\u540d\u79f0"}]})(P.a.createElement(L["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165\u6587\u4ef6\u540d\u79f0"},P.a.createElement(T,{value:"\u8eab\u4efd\u8d44\u6599"},"\u8eab\u4efd\u8d44\u6599"),P.a.createElement(T,{value:"\u80fd\u529b\u4fdd\u6301"},"\u80fd\u529b\u4fdd\u6301"),P.a.createElement(T,{value:"\u5956\u60e9\u60c5\u51b5"},"\u5956\u60e9\u60c5\u51b5"),P.a.createElement(T,{value:"\u8d44\u8d28\u8bc1\u660e"},"\u8d44\u8d28\u8bc1\u660e"),P.a.createElement(T,{value:"\u5176\u4ed6"},"\u5176\u4ed6")))),P.a.createElement(F["a"].Item,{label:"\u6587\u4ef6\u540d\u79f0"},n("recordname",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u4ef6\u540d\u79f0"}]})(P.a.createElement(u["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165\u6587\u4ef6\u540d\u79f0"}))),P.a.createElement(g["a"],{visible:h,footer:null,onCancel:this.Cancel},P.a.createElement("img",{alt:"example",style:{width:"100%"},src:v})))),P.a.createElement(i["a"],{bordered:!1,size:"small"},P.a.createElement(s["a"],null,P.a.createElement(d["a"],{span:22},P.a.createElement(p["a"],{style:{marginBottom:12},type:"primary",onClick:this.show},"\u4e0a\u4f20\u6587\u4ef6")),P.a.createElement(d["a"],{span:2},P.a.createElement(p["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},P.a.createElement(f["a"],{type:"left"}),"\u8fd4\u56de"))),P.a.createElement("div",{className:B.a.tableList},P.a.createElement(c["a"],{size:"middle",loading:a,dataSource:E,columns:this.columns,rowKey:"recordname",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))),P.a.createElement(g["a"],{title:"\u8bb0\u5f55\u8be6\u60c5",visible:b,onCancel:this.showCancel,footer:null,width:800,style:{top:10}},P.a.createElement("embed",{src:y,width:"700",height:"700",type:"application/pdf"})))}}]),a}(O["PureComponent"]),o=l))||o)||o);t["default"]=Q}}]);