(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[149],{H75j:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,o,l,i=a("bx4M"),s=(a("g9YV"),a("wCAj")),c=(a("14J3"),a("BMrR")),d=(a("jCWc"),a("kPKH")),p=a("jehZ"),m=a.n(p),u=(a("DZo9"),a("8z0m")),f=(a("Pwec"),a("CtXQ")),h=(a("miYZ"),a("tsqr")),g=a("eHn4"),v=a.n(g),w=a("d6i3"),y=a.n(w),b=a("1l/V"),E=a.n(b),S=(a("/xke"),a("TeRw")),k=a("p0pE"),R=a.n(k),C=a("2Taf"),I=a.n(C),D=a("vZ4D"),F=a.n(D),N=a("l4Ni"),V=a.n(N),O=a("ujKo"),x=a.n(O),P=a("MhPg"),M=a.n(P),j=(a("2qtc"),a("kLXV")),T=(a("5NDa"),a("5rEg")),L=(a("+L6B"),a("2/Rp")),z=(a("y8nQ"),a("Vl3Y")),q=(a("OaEy"),a("2fM7")),A=(a("sRBo"),a("kaz8")),J=a("q1tI"),Y=a.n(J),B=a("MuoO"),U=a("Y2fQ"),G=a("zHco"),H=a("UKeP"),K=a.n(H),Q=a("wd/R"),Z=a.n(Q);function X(e){return function(){var t,a=x()(e);if($()){var n=x()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return V()(this,t)}}function $(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}A["a"].Group;var _=q["a"].Option,W=z["a"].create()(function(e){var t=e.downloadVisible,a=e.form,n=e.handleDownloadAdd,r=e.handleDownloadCancel,o=e.typeOptions,l=e.handleOnSelect,i=function(){a.validateFields(function(e,t){e?console.log(e):(a.resetFields(),n(t))})},s=function(){a.resetFields("tempName",[])};return Y.a.createElement(j["a"],{destroyOnClose:!0,title:"\u6a21\u677f\u4e0b\u8f7d",visible:t,onOk:i,onCancel:function(){return r()},footer:[Y.a.createElement(L["a"],{key:"back",type:"primary",onClick:function(){return r()}}," \u53d6\u6d88"),Y.a.createElement(L["a"],{key:"submit",type:"primary",onClick:i},"\u4e0b\u8f7d")]},Y.a.createElement(z["a"].Item,{label:"\u8bb0\u5f55\u540d\u79f0"},a.getFieldDecorator("downloadRecordName",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8bb0\u5f55\u540d\u79f0"}]})(Y.a.createElement(T["a"],{style:{width:"100%"},placeholder:"\u8bb0\u5f55\u540d\u79f0"}))),Y.a.createElement(z["a"].Item,{label:"\u6587\u4ef6\u6765\u6e90"},a.getFieldDecorator("type",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6587\u4ef6\u6765\u6e90"}]})(Y.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u6587\u4ef6\u6765\u6e90",onSelect:l,onChange:s},Y.a.createElement(_,{value:"platform"},"\u5e73\u53f0\u6a21\u677f"),Y.a.createElement(_,{value:"company"},"\u516c\u53f8\u6a21\u677f"),Y.a.createElement(_,{value:"person"},"\u4e2a\u4eba\u6a21\u677f"),Y.a.createElement(_,{value:"blank"},"\u7a7a\u767d\u6a21\u677f")))),Y.a.createElement(z["a"].Item,{label:"\u6a21\u677f\u540d\u79f0"},a.getFieldDecorator("tempName",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6a21\u677f\u540d\u79f0"}]})(Y.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u6a21\u677f\u540d\u79f0"},o))))});function ee(e){return new Promise(function(t,a){var n=new FileReader;n.readAsDataURL(e),n.onload=function(){return t(n.result)},n.onerror=function(e){return a(e)}})}var te=(n=z["a"].create(),r=Object(B["connect"])(function(e){var t=e.mTestRecord,a=e.loading;return{mTestRecord:t,loading:a.models.mTestRecord}}),n(o=r((l=function(e){M()(a,e);var t=X(a);function a(){var e;I()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={formValues:{},visible:!1,downloadVisible:!1,checkProject:[],allCompanyName:[],selectEntrustment:null,showPrice:!1,previewVisible:!1,previewImage:"",fileList:[],modelName:[],url:null,showVisible:!1,overallstate:void 0},e.columns=[{title:"\u8bb0\u5f55\u540d",dataIndex:"recordname",render:function(e){var t=/\.{1}[a-z]{1,}$/;return null!==t.exec(e)?Y.a.createElement("span",null,e.slice(0,t.exec(e).index)):Y.a.createElement("span",null,e)}},{title:"\u4e0a\u4f20\u65e5\u671f",dataIndex:"recorddate",render:function(e){return Y.a.createElement("span",null,Z()(e).format("YYYY-MM-DD"))}},{title:"\u4e0a\u4f20\u4eba",dataIndex:"creator"},{title:"\u64cd\u4f5c",render:function(t,a){return Y.a.createElement(J["Fragment"],null,Y.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u67e5\u770b"),"\xa0\xa0","\u7533\u8bf7\u4f5c\u5e9f"===e.state.overallstate||"\u5df2\u53d1\u5e03"===e.state.overallstate?[]:[Y.a.createElement("a",{onClick:function(){return e.deleteItem(t,a)}},"\u5220\u9664\xa0\xa0")])}}],e.previewItem=function(t){var a=e.props.dispatch,n=sessionStorage.getItem("reportno"),r=R()({},t,{reportno:n,source:"\u68c0\u67e5\u8bb0\u5f55"});a({type:"mTestRecord/getRecord",payload:r,callback:function(t){if(400===t.code)S["a"].open({message:"\u6253\u5f00\u5931\u8d25",description:t.data});else{var a=t.data;e.setState({url:a})}}}),e.setState({showVisible:!0})},e.deleteItem=function(t){var a=e.props.dispatch,n=sessionStorage.getItem("reportno"),r=R()({},t,{reportno:n});a({type:"mTestRecord/deleteRecordInfo",payload:r,callback:function(t){400===t.code?S["a"].open({message:"\u5220\u9664\u5931\u8d25",description:t.data}):e.componentDidMount()}})},e.handleOk=function(){var t=e.props,a=t.form.validateFieldsAndScroll,n=t.dispatch,r=sessionStorage.getItem("reportno");a(function(t,a){if(!t){var o=new FormData,l=JSON.parse(localStorage.getItem("userinfo"));a.MultipartFile.fileList.forEach(function(e){o.append("files",e.originFileObj)}),o.append("reportno",r),o.append("source","\u68c0\u67e5\u8bb0\u5f55"),o.append("fileName",a.recordname),o.append("creator",l.nameC),n({type:"mTestRecord/uploadFile",payload:o,callback:function(t){400===t.code?S["a"].open({message:"\u6dfb\u52a0\u5931\u8d25",description:t.data}):e.componentDidMount()}}),e.setState({visible:!1}),form.resetFields()}console.log(t)})},e.show=function(){var t=e.props,a=t.form;t.dispatch,sessionStorage.getItem("reportno");a.resetFields(),e.setState({fileList:[]}),e.setState({visible:!0})},e.handleCancel=function(){var t=e.props.form;t.resetFields(),e.setState({visible:!1})},e.onChange=function(t){"\u6309\u5355\u4ef7"===t.target.value||"\u6309\u6bd4\u4f8b"===t.target.value?e.setState({showPrice:!0}):e.setState({showPrice:!1})},e.Cancel=function(){return e.setState({previewVisible:!1})},e.handlePreview=function(){var t=E()(y.a.mark(function t(a){return y.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(a.url||a.preview){t.next=4;break}return t.next=3,ee(a.originFileObj);case 3:a.preview=t.sent;case 4:e.setState({previewImage:a.url||a.preview,previewVisible:!0});case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),e.handleChange=function(t){var a=t.file,n=t.fileList,r="image/jpg"===a.type,o="image/jpeg"===a.type,l="image/gif"===a.type,i="image/png"===a.type,s="application/pdf"===a.type,c=a.size/1024/1024<20;if(r||o||l||i||s)if(c){var d=a.name,p=/\.{1}[a-z]{1,}$/;null!==p.exec(d)&&(d=d.slice(0,p.exec(d).index));var m=e.props.form;m.setFieldsValue(v()({},"recordname",d)),e.setState({fileList:n})}else j["a"].error({title:"\u8d85\u8fc720M\u9650\u5236\uff0c\u4e0d\u5141\u8bb8\u4e0a\u4f20~"});else j["a"].error({title:"\u53ea\u80fd\u4e0a\u4f20JPG \u3001JPEG \u3001GIF\u3001 PNG\u3001 PDF\u683c\u5f0f\u7684\u56fe\u7247~"})},e.handleBeforeUpload=function(e){return!1},e.showDownloadVisible=function(t){e.setState({downloadVisible:!!t})},e.handleDownloadCancel=function(t){e.setState({downloadVisible:!!t})},e.handleDownloadAdd=function(t){var a=e.props.dispatch,n=sessionStorage.getItem("reportno"),r={reportno:n,tempName:t.tempName,recordName:t.downloadRecordName};a({type:"mTestRecord/downloadPlatFromTemp",payload:r,callback:function(e){e&&h["a"].success("\u4e0b\u8f7d\u6210\u529f")}}),e.setState({downloadVisible:!1})},e.handleOnSelect=function(t){var a=JSON.parse(localStorage.getItem("userinfo")),n="";n="platform"===t?"platform":"company"===t?a.certCode:"person"===t?a.userName:"blank";var r=e.props.dispatch,o={type:t,owner:n};r({type:"mTestRecord/getModelName",payload:o,callback:function(t){t&&(e.state.modelName=t)}})},e.back=function(){e.props.history.goBack()},e.showCancel=function(){e.setState({showVisible:!1})},e.getRepeatRecordName=function(t,a,n){void 0!==a&&null!==a&&""!==a||n(Object(U["formatMessage"])({id:"validation.recordinfo.noexist"}));var r=e.props.dispatch,o=sessionStorage.getItem("reportno"),l=new FormData;l.append("reportno",o),l.append("recordname",a),l.append("source","\u68c0\u67e5\u8bb0\u5f55"),r({type:"recordinfo_testRecord/getRepeatRecordName",payload:l,callback:function(e){"repeat"===e?n(Object(U["formatMessage"])({id:"validation.recordinfo.repeat"})):"success"===e?n():n(Object(U["formatMessage"])({id:"validation.recordinfo.error"}))}})},e}return F()(a,[{key:"componentDidMount",value:function(){this.setState({overallstate:sessionStorage.getItem("reacordupload_overallstate")});var e=this.props.dispatch,t=sessionStorage.getItem("reportno");e({type:"mTestRecord/getRecordInfo",payload:{reportno:t,source:"\u68c0\u67e5\u8bb0\u5f55"}})}},{key:"render",value:function(){var e=Y.a.createElement("div",null,Y.a.createElement(f["a"],{type:"plus"}),Y.a.createElement("div",{className:"ant-upload-text"},"Upload")),t=this.props,a=t.mTestRecord.recordData,n=t.loading,r=t.form.getFieldDecorator,o=this.state,l=o.fileList,p=o.visible,h=o.previewVisible,g=o.previewImage,v=o.downloadVisible,w=o.modelName,y=o.url,b=o.showVisible,E=o.overallstate,S=w.map(function(e){return Y.a.createElement(_,{key:e,value:e},e)}),k={handleDownloadAdd:this.handleDownloadAdd,showDownloadVisible:this.showDownloadVisible,handleDownloadCancel:this.handleDownloadCancel,handleOnSelect:this.handleOnSelect},R=sessionStorage.getItem("reportno"),C=sessionStorage.getItem("shipname"),I=sessionStorage.getItem("applicant"),D={reportno:R,shipname:C,applicant:I};return Y.a.createElement(G["a"],{text:D},Y.a.createElement(j["a"],{title:"\u8bb0\u5f55\u4e0a\u4f20",visible:p,onOk:this.handleOk,onCancel:this.handleCancel},Y.a.createElement(z["a"],null,Y.a.createElement(z["a"].Item,{label:"\u6587\u4ef6\u4e0a\u4f20"},r("MultipartFile",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u4e0a\u4f20\u6587\u4ef6"}]})(Y.a.createElement(u["a"],{listType:"picture-card",fileList:l,onPreview:this.handlePreview,beforeUpload:this.handleBeforeUpload,onChange:this.handleChange},l.length>=1?null:e))),Y.a.createElement(z["a"].Item,{label:"\u6587\u4ef6\u540d\u79f0"},r("recordname",{rules:[{required:!0,validator:this.getRepeatRecordName}]})(Y.a.createElement(T["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165\u6587\u4ef6\u540d\u79f0"}))),Y.a.createElement(j["a"],{visible:h,footer:null,onCancel:this.Cancel},Y.a.createElement("img",{alt:"example",style:{width:"100%"},src:g})))),Y.a.createElement(W,m()({},k,{downloadVisible:v,typeOptions:S})),Y.a.createElement(i["a"],{bordered:!1,size:"small"},Y.a.createElement(c["a"],null,Y.a.createElement(d["a"],{span:22},"\u7533\u8bf7\u4f5c\u5e9f"===E||"\u5df2\u53d1\u5e03"===E?[]:[Y.a.createElement(L["a"],{style:{marginBottom:12},type:"primary",onClick:this.show},"\u4e0a\u4f20\u6587\u4ef6")]),Y.a.createElement(d["a"],{span:2},Y.a.createElement(L["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},Y.a.createElement(f["a"],{type:"left"}),"\u8fd4\u56de"))),Y.a.createElement("div",{className:K.a.tableList},Y.a.createElement(s["a"],{size:"middle",loading:n,dataSource:a,columns:this.columns,rowKey:"recordname",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))),Y.a.createElement(j["a"],{title:"\u8bb0\u5f55\u8be6\u60c5",visible:b,onCancel:this.showCancel,footer:null,style:{top:10},width:800},Y.a.createElement("embed",{src:y,width:"700",height:"600",type:"application/pdf"})))}}]),a}(J["PureComponent"]),o=l))||o)||o);t["default"]=te}}]);