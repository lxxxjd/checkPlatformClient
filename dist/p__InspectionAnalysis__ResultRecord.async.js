(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[112],{"4tnR":function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,o,i,l=a("bx4M"),s=(a("g9YV"),a("wCAj")),c=(a("14J3"),a("BMrR")),p=(a("jCWc"),a("kPKH")),d=(a("+L6B"),a("2/Rp")),u=(a("O3gP"),a("lrIw")),m=(a("5NDa"),a("5rEg")),f=(a("DZo9"),a("8z0m")),g=(a("Pwec"),a("CtXQ")),h=(a("miYZ"),a("tsqr")),v=(a("2qtc"),a("kLXV")),w=a("d6i3"),y=a.n(w),b=a("1l/V"),R=a.n(b),S=(a("/xke"),a("TeRw")),E=a("p0pE"),I=a.n(E),k=a("2Taf"),C=a.n(k),V=a("vZ4D"),D=a.n(V),N=a("l4Ni"),P=a.n(N),F=a("ujKo"),M=a.n(F),O=a("MhPg"),x=a.n(O),j=(a("y8nQ"),a("Vl3Y")),L=(a("OaEy"),a("2fM7")),z=(a("sRBo"),a("kaz8")),B=a("q1tI"),Y=a.n(B),J=a("MuoO"),A=(a("RdVf"),a("Y2fQ")),q=a("zHco"),G=a("wd/R"),U=a.n(G);function Q(e){return function(){var t,a=M()(e);if(T()){var n=M()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return P()(this,t)}}function T(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}z["a"].Group;var K=L["a"].Option;function Z(e){return new Promise(function(t,a){var n=new FileReader;n.readAsDataURL(e),n.onload=function(){return t(n.result)},n.onerror=function(e){return a(e)}})}var H=(n=j["a"].create(),r=Object(J["connect"])(function(e){var t=e.testRecord,a=e.loading;return{testRecord:t,loading:a.models.testRecord}}),n(o=r((i=function(e){x()(a,e);var t=Q(a);function a(){var e;C()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={formValues:{},visible:!1,downloadVisible:!1,checkProject:[],allCompanyName:[],selectEntrustment:null,showPrice:!1,previewVisible:!1,previewImage:"",fileList:[],modelName:[],url:null,showVisible:!1,overallstate:"",dataSource:[],registerInReportno:[]},e.columns=[{title:"\u6587\u4ef6\u540d",dataIndex:"recordname"},{title:"\u4e0a\u4f20\u65e5\u671f",dataIndex:"recorddate",render:function(t){return e.isValidDate(t)}},{title:"\u64cd\u4f5c",render:function(t,a){return Y.a.createElement(B["Fragment"],null,Y.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u67e5\u770b   \xa0\xa0"),Y.a.createElement("a",{onClick:function(){return e.deleteItem(t,a)}},"\u5220\u9664 \xa0\xa0"))}}],e.columns2=[{title:"\u6587\u4ef6\u540d",dataIndex:"recordname"},{title:"\u4e0a\u4f20\u65e5\u671f",dataIndex:"recorddate",render:function(t){return e.isValidDate(t)}},{title:"\u64cd\u4f5c",render:function(t,a){return Y.a.createElement(B["Fragment"],null,Y.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u67e5\u770b   \xa0\xa0"))}}],e.init=function(){e.setState({overallstate:sessionStorage.getItem("ResultRecord_overallstate")});var t=e.props.dispatch,a=sessionStorage.getItem("reportno");t({type:"testRecord/getRecordInfo",payload:{reportno:a,source:"\u6d4b\u8bd5\u62a5\u544a"},callback:function(t){t&&e.setState({dataSource:t})}})},e.isValidDate=function(e){return void 0!==e&&null!==e?Y.a.createElement("span",null,U()(e).format("YYYY-MM-DD")):[]},e.previewItem=function(t){var a=e.props.dispatch,n=sessionStorage.getItem("reportno"),r=I()({},t,{reportno:n,source:"\u6d4b\u8bd5\u62a5\u544a"});a({type:"testRecord/getRecord",payload:r,callback:function(t){if(400===t.code)S["a"].open({message:"\u6253\u5f00\u5931\u8d25",description:t.data});else{var a=t.data;e.setState({url:a})}}}),e.setState({showVisible:!0})},e.deleteItem=function(t){var a=e.props.dispatch,n=sessionStorage.getItem("reportno"),r=I()({},t,{reportno:n});a({type:"testRecord/deleteRecordInfo",payload:r,callback:function(t){400===t.code?S["a"].open({message:"\u5220\u9664\u5931\u8d25",description:t.data}):e.componentDidMount()}})},e.handleOk=function(){var t=e.props,a=t.form.validateFieldsAndScroll,n=t.dispatch,r=sessionStorage.getItem("reportno");a(function(t,a){if(!t){var o=new FormData;a.MultipartFile.fileList.forEach(function(e){o.append("files",e.originFileObj)}),o.append("reportno",r),o.append("source","\u6d4b\u8bd5\u62a5\u544a"),o.append("fileName",a.recordname),n({type:"testRecord/uploadFile",payload:o,callback:function(t){400===t.code?S["a"].open({message:"\u6dfb\u52a0\u5931\u8d25",description:t.message}):(e.componentDidMount(),S["a"].open({message:"\u6dfb\u52a0\u6210\u529f"}))}}),e.setState({visible:!1}),form.resetFields()}console.log(t)})},e.show=function(){var t=e.props,a=t.form;t.dispatch,sessionStorage.getItem("reportno");a.resetFields(),e.setState({fileList:[]}),e.setState({visible:!0})},e.handleCancel=function(){var t=e.props.form;t.resetFields(),e.setState({visible:!1})},e.onChange=function(t){"\u6309\u5355\u4ef7"===t.target.value||"\u6309\u6bd4\u4f8b"===t.target.value?e.setState({showPrice:!0}):e.setState({showPrice:!1})},e.Cancel=function(){return e.setState({previewVisible:!1})},e.handlePreview=function(){var t=R()(y.a.mark(function t(a){return y.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(a.url||a.preview){t.next=4;break}return t.next=3,Z(a.originFileObj);case 3:a.preview=t.sent;case 4:e.setState({previewImage:a.url||a.preview,previewVisible:!0});case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),e.handleChange=function(t){var a=t.file,n=t.fileList,r="image/jpg"===a.type,o="image/jpeg"===a.type,i="image/gif"===a.type,l="image/png"===a.type,s="application/pdf"===a.type,c=a.size/1024/1024<20;r||o||i||l||s?c?e.setState({fileList:n}):v["a"].error({title:"\u8d85\u8fc720M\u9650\u5236\uff0c\u4e0d\u5141\u8bb8\u4e0a\u4f20~"}):v["a"].error({title:"\u53ea\u80fd\u4e0a\u4f20JPG \u3001JPEG \u3001GIF\u3001 PNG\u3001 PDF\u683c\u5f0f\u7684\u56fe\u7247~"})},e.handleBeforeUpload=function(e){return!1},e.showDownloadVisible=function(t){e.setState({downloadVisible:!!t})},e.handleDownloadCancel=function(t){e.setState({downloadVisible:!!t})},e.handleDownloadAdd=function(t){var a=e.props.dispatch,n=sessionStorage.getItem("reportno"),r={reportno:n,tempName:t.tempName,recordName:t.downloadRecordName};a({type:"testRecord/downloadPlatFromTemp",payload:r,callback:function(e){e&&h["a"].success("\u4e0b\u8f7d\u6210\u529f")}}),console.log(r),e.setState({downloadVisible:!1})},e.handleOnSelect=function(t){var a=JSON.parse(localStorage.getItem("userinfo")),n="";n="platform"===t?"platform":"company"===t?a.certCode:"person"===t?a.userName:"blank";var r=e.props.dispatch,o={type:t,owner:n};r({type:"testRecord/getModelName",payload:o,callback:function(t){t&&(e.state.modelName=t)}})},e.back=function(){e.props.history.goBack()},e.showCancel=function(){e.setState({showVisible:!1})},e.getRepeatRecordName=function(t,a,n){void 0!==a&&null!==a&&""!==a||n(Object(A["formatMessage"])({id:"validation.recordinfo.noexist"}));var r=e.props.dispatch,o=sessionStorage.getItem("reportno"),i=new FormData;i.append("reportno",o),i.append("recordname",a),i.append("source","\u6d4b\u8bd5\u62a5\u544a"),r({type:"InspectionAnalysis_testRecord/getRepeatRecordName",payload:i,callback:function(e){"repeat"===e?n(Object(A["formatMessage"])({id:"validation.recordinfo.repeat"})):"success"===e?n():n(Object(A["formatMessage"])({id:"validation.recordinfo.error"}))}})},e}return D()(a,[{key:"componentDidMount",value:function(){var e=this;this.init();var t=this.props.dispatch,a=sessionStorage.getItem("reportno");t({type:"testRecord/getSampleByReportno",payload:{reportno:a},callback:function(t){t&&(e.setState({registerInReportno:t}),console.log(e.state.registerInReportno))}})}},{key:"render",value:function(){var e=Y.a.createElement("div",null,Y.a.createElement(g["a"],{type:"plus"}),Y.a.createElement("div",{className:"ant-upload-text"},"Upload")),t=this.props,a=t.loading,n=t.form.getFieldDecorator,r=this.state,o=r.fileList,i=r.visible,h=r.previewVisible,w=r.previewImage,y=(r.downloadVisible,r.modelName),b=r.url,R=r.showVisible,S=r.overallstate,E=r.dataSource,I=r.registerInReportno,k=(y.map(function(e){return Y.a.createElement(K,{key:e,value:e},e)}),I.map(function(e){return Y.a.createElement(K,{key:e.sampleno,value:"".concat(e.sampleno+e.samplename,"\u62a5\u544a")},e.sampleno,e.samplename,"\u62a5\u544a")})),C=sessionStorage.getItem("reportno"),V=sessionStorage.getItem("shipname"),D=sessionStorage.getItem("applicant"),N={reportno:C,shipname:V,applicant:D};return Y.a.createElement(q["a"],{text:N},Y.a.createElement(v["a"],{title:"\u8bb0\u5f55\u4e0a\u4f20",visible:i,onOk:this.handleOk,onCancel:this.handleCancel},Y.a.createElement(j["a"],null,Y.a.createElement(j["a"].Item,{label:"\u6587\u4ef6\u4e0a\u4f20"},n("MultipartFile",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u4e0a\u4f20\u6587\u4ef6"}]})(Y.a.createElement(f["a"],{listType:"picture-card",fileList:o,onPreview:this.handlePreview,beforeUpload:this.handleBeforeUpload,onChange:this.handleChange},o.length>=1?null:e))),Y.a.createElement(j["a"].Item,{label:"\u6587\u4ef6\u540d\u79f0"},n("recordname",{rules:[{required:!0,validator:this.getRepeatRecordName}]})(Y.a.createElement(u["a"],{className:"global-search",dataSource:k,style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165\u6587\u4ef6\u540d\u79f0"},Y.a.createElement(m["a"],null)))),Y.a.createElement(v["a"],{visible:h,footer:null,onCancel:this.Cancel},Y.a.createElement("img",{alt:"example",style:{width:"100%"},src:w})))),Y.a.createElement(l["a"],{bordered:!1,size:"small"},Y.a.createElement(c["a"],null,Y.a.createElement(p["a"],{span:22},"\u5df2\u53d1\u5e03"===S||"\u7533\u8bf7\u4f5c\u5e9f"===S?[]:[Y.a.createElement(d["a"],{style:{marginBottom:12},type:"primary",onClick:this.show},"\u4e0a\u4f20\u6587\u4ef6")]),Y.a.createElement(p["a"],{span:2},Y.a.createElement(d["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},Y.a.createElement(g["a"],{type:"left"}),"\u8fd4\u56de"))),Y.a.createElement(s["a"],{size:"middle",loading:a,dataSource:E,columns:"\u5df2\u53d1\u5e03"===S||"\u7533\u8bf7\u4f5c\u5e9f"===S?this.columns2:this.columns,rowKey:"id",pagination:{showQuickJumper:!0,showSizeChanger:!0}})),Y.a.createElement(v["a"],{title:"\u8bb0\u5f55\u8be6\u60c5",visible:R,onCancel:this.showCancel,footer:null,width:800,style:{top:10}},Y.a.createElement("embed",{src:b,width:"700",height:"700",type:"application/pdf"})))}}]),a}(B["PureComponent"]),o=i))||o)||o);t["default"]=H}}]);