(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[28],{FQrt:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,l,i,o=a("bx4M"),s=(a("DZo9"),a("8z0m")),c=(a("Pwec"),a("CtXQ")),d=(a("g9YV"),a("wCAj")),p=(a("bP8k"),a("gFTJ")),m=a("jehZ"),u=a.n(m),f=a("eHn4"),h=a.n(f),g=a("d6i3"),y=a.n(g),v=a("1l/V"),b=a.n(v),w=(a("/xke"),a("TeRw")),E=a("p0pE"),k=a.n(E),C=a("2Taf"),S=a.n(C),I=a("vZ4D"),D=a.n(I),F=a("l4Ni"),x=a.n(F),O=a("ujKo"),N=a.n(O),R=a("MhPg"),V=a.n(R),P=(a("5NDa"),a("5rEg")),M=(a("2qtc"),a("kLXV")),L=(a("14J3"),a("BMrR")),T=(a("jCWc"),a("kPKH")),Y=(a("+L6B"),a("2/Rp")),z=(a("miYZ"),a("tsqr")),A=(a("y8nQ"),a("Vl3Y")),B=(a("B9cy"),a("Ol7k")),j=(a("ozfa"),a("MJZm")),q=(a("OaEy"),a("2fM7")),J=(a("sRBo"),a("kaz8")),_=a("q1tI"),H=a.n(_),U=a("MuoO"),Q=a("Y2fQ"),K=a("zHco"),Z=a("wd/R"),W=a.n(Z),X=a("O02X"),G=a.n(X),$=(a("gNGo"),a("hotG"));function ee(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=te(e))){var t=0,a=function(){};return{s:a,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,r,l=!0,i=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return l=e.done,e},e:function(e){i=!0,r=e},f:function(){try{l||null==n.return||n.return()}finally{if(i)throw r}}}}function te(e,t){if(e){if("string"===typeof e)return ae(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?ae(e,t):void 0}}function ae(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function ne(e){return function(){var t,a=N()(e);if(re()){var n=N()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return x()(this,t)}}function re(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}J["a"].Group;var le=q["a"].Option,ie=j["a"].TreeNode,oe=(B["a"].Header,B["a"].Footer,B["a"].Sider),se=B["a"].Content,ce=A["a"].create()(function(e){var t=e.form,a=e.option,n=e.showVisible,r=e.showCancel,l=e.value,i=e.onSelect,o=e.treeData,s=e.handleSign,c=e.reviewCertFile,d=e.renderFileInfo,p=e.renderTreeNodes,m=e.approverusersOptions,u=e.text,f=function(){t.validateFields(function(e,n){e||("\u62df\u5236"===a?s(n):"\u590d\u6838"===a&&c(n),t.resetFields())})},h=function(e,t,a){void 0===t?z["a"].error("\u60a8\u6ca1\u6709\u9009\u62e9\u8bc1\u7a3f\u5ba1\u6838\u4eba"):a()};return H.a.createElement(M["a"],{title:a,visible:n,onCancel:r,destroyOnClose:function(){return!0},footer:[H.a.createElement("div",null,H.a.createElement("span",null,"\u5ba1\u6838\u4eba\uff1a"),t.getFieldDecorator("approver",{rules:[{validator:h},{required:!0,message:"\u9009\u62e9\u5ba1\u6838\u4eba"}]})(H.a.createElement(q["a"],{style:{width:150,marginRight:10,marginLeft:10},placeholder:"\u9009\u62e9\u5ba1\u6838\u4eba"},m)),H.a.createElement(Y["a"],{key:"cancel",type:"primary",onClick:r}," \u53d6\u6d88"),"\u62df\u5236"===a?[H.a.createElement(Y["a"],{key:"submit1",type:"primary",onClick:f},"\u63d0\u4ea4")]:null,"\u590d\u6838"===a?[H.a.createElement(Y["a"],{key:"submit2",type:"primary",onClick:f},"\u590d\u6838")]:null)],style:{top:10},width:.95*document.body.clientWidth,height:.6*document.body.clientHeight},H.a.createElement(B["a"],null,H.a.createElement(se,{style:{margin:15}},H.a.createElement("div",null,H.a.createElement(L["a"],null,H.a.createElement(T["a"],{span:24},d(l))))),H.a.createElement(oe,{theme:"light",width:380,style:{paddingLeft:60}},H.a.createElement("div",null,"\u62df\u5236\u4eba\uff1a",u.signNameC),H.a.createElement(j["a"],{showLine:!0,defaultSelectedKeys:[l],defaultExpandAll:!0,onSelect:i},p(o)))))}),de=A["a"].create()(function(e){var t=e.downloadVisible,a=e.form,n=e.handleDownloadAdd,r=e.handleDownloadCancel,l=e.typeOptions,i=e.handleOnSelect,o=e.handleOnModelSelect,s=e.modelPlatformType,c=e.sampleRegisterOptions,d=e.checkResultOptions,p=e.getRepeatName,m=function(){a.validateFields(function(e,t){e||(a.resetFields(),n(t))})},u=function(){a.resetFields("tempName",[])};return H.a.createElement(M["a"],{destroyOnClose:!0,title:"\u6a21\u677f\u4e0b\u8f7d",visible:t,onOk:m,onCancel:function(){return r()},footer:[H.a.createElement(Y["a"],{key:"back",type:"primary",onClick:function(){return r()}}," \u53d6\u6d88"),H.a.createElement(Y["a"],{key:"submit",type:"primary",onClick:m},"\u4e0b\u8f7d")]},H.a.createElement(A["a"].Item,{label:"\u8bc1\u7a3f\u540d\u79f0"},a.getFieldDecorator("fileName",{rules:[{required:!0,validator:p}]})(H.a.createElement(P["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165\u8bc1\u7a3f\u540d\u79f0"}))),H.a.createElement(A["a"].Item,{label:"\u6587\u4ef6\u6765\u6e90"},a.getFieldDecorator("type",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6587\u4ef6\u6765\u6e90"}]})(H.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u6587\u4ef6\u6765\u6e90",onSelect:i,onChange:u},H.a.createElement(le,{value:"platform"},"\u5e73\u53f0\u6a21\u677f")))),H.a.createElement(A["a"].Item,{label:"\u6a21\u677f\u540d\u79f0"},a.getFieldDecorator("id",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6a21\u677f\u540d\u79f0"}]})(H.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u6a21\u677f\u540d\u79f0",onSelect:o},l))),"\u8d28\u91cf\u8bc1\u4e66.doc"===s?[H.a.createElement(A["a"].Item,{label:"\u6837\u54c1\u7f16\u53f7\u540d\u79f0"},a.getFieldDecorator("sampleno",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6837\u54c1\u7f16\u53f7\u540d\u79f0"}]})(H.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u6837\u54c1\u7f16\u53f7\u540d\u79f0"},c)))]:null,"\u91cd\u91cf\u8bc1\u4e66.doc"===s?[H.a.createElement(A["a"].Item,{label:"\u7533\u8bf7\u9879\u76ee"},a.getFieldDecorator("inspway",{})(H.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u7533\u8bf7\u9879\u76ee"},d)))]:null)});function pe(e){return new Promise(function(t,a){var n=new FileReader;n.readAsDataURL(e),n.onload=function(){return t(n.result)},n.onerror=function(e){return a(e)}})}var me=(n=A["a"].create(),r=Object(U["connect"])(function(e){var t=e.certificate,a=e.loading;return{certificate:t,loading:a.models.certificate}}),n(l=r((i=function(e){V()(a,e);var t=ne(a);function a(){var e;S()(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return e=t.call.apply(t,[this].concat(r)),e.state={overallstate:"",visible:!1,downloadVisible:!1,previewVisible:!1,previewImage:"",fileList:[],modelName:[],showVisible:!1,text:{},urls:"",value:"",checkData:{},reportDetail:{},treeData:[],renderFormData:[],renderFormColumns:[],approverusers:[],modelPlatformType:"",ishasApprover:!1,checkResult:[],sampleRegister:[],sampleColumnsLink:[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u6837\u54c1\u7f16\u53f7",dataIndex:"sampleno"},{title:"\u6837\u54c1\u540d\u79f0",dataIndex:"samplename"},{title:"\u68c0\u67e5\u9879\u76ee",dataIndex:"itemC"},{title:"\u68c0\u9a8c\u6807\u51c6",dataIndex:"teststandard"},{title:"\u7ed3\u679c",dataIndex:"testresult"}]},e.columns=[{title:"\u8bc1\u4e66\u8bc1\u7a3f",dataIndex:"name",render:function(e){var t=/\.{1}[a-z]{1,}$/;return null!==t.exec(e)?H.a.createElement("span",null,e.slice(0,t.exec(e).index)):H.a.createElement("span",null,e)}},{title:"\u62df\u5236\u65e5\u671f",dataIndex:"signdate",render:function(t){return e.isValidDate(t)}},{title:"\u62df\u5236\u4eba",dataIndex:"signNameC"},{title:"\u72b6\u6001\u65e5\u671f",render:function(t,a){return e.getStatusDate(t)}},{title:"\u72b6\u6001",dataIndex:"status"},{title:"\u64cd\u4f5c",render:function(t,a){return H.a.createElement(_["Fragment"],null,"\u5f85\u62df\u5236"===t.status?[H.a.createElement("a",{onClick:function(){return e.editCerticate(t,a)}},"\u7f16\u8f91\xa0\xa0")]:[],"\u5f85\u62df\u5236"===t.status?[H.a.createElement("a",{onClick:function(){return e.signItem(t,a)}},"\u63d0\u4ea4\xa0\xa0")]:[],"\u5df2\u62df\u5236"===t.status?[H.a.createElement("a",{onClick:function(){return e.undoCert(t,a)}},"\u9000\u56de\xa0\xa0")]:[],"\u5f85\u62df\u5236"===t.status?[H.a.createElement("a",{onClick:function(){return e.deleteItem(t,a)}},"\u5220\u9664\xa0\xa0")]:[],"\u5f85\u62df\u5236"!==t.status?[H.a.createElement("a",{onClick:function(){return e.ViewItem(t,a)}},"\u67e5\u770b\xa0\xa0")]:[],"\u5df2\u4f5c\u5e9f"===t.status?[H.a.createElement("a",{onClick:function(){return e.viewAbandonItem(t,a)}},"\u4f5c\u5e9f\u539f\u56e0\xa0\xa0")]:[])}}],e.viewAbandonItem=function(e){M["a"].info({title:"\u4f5c\u5e9f\u539f\u56e0",okText:"\u77e5\u9053\u4e86",content:H.a.createElement("div",null,H.a.createElement("p",null,e.abandonreason)),onOk:function(){}})},e.undoCert=function(t){var a=e.props.dispatch;a({type:"certificate/undoCert",payload:{keyno:t.keyno},callback:function(e){if("success"===e){z["a"].success("\u56de\u9000\u6210\u529f");var t=sessionStorage.getItem("reportno");a({type:"certificate/getCertFiles",payload:{reportno:t}})}else z["a"].success("\u56de\u9000\u5931\u8d25")}})},e.getStatusDate=function(e){var t=void 0;return"\u5f85\u62df\u5236"===e.status?t=e.uploaddate:"\u5df2\u62df\u5236"===e.status?t=e.signdate:"\u5df2\u590d\u6838"===e.status?t=e.reviewdate:"\u5df2\u7f2e\u5236"===e.status?t=e.makedate:"\u5df2\u7b7e\u7f72"===e.status?t=e.authordate:"\u5df2\u53d1\u5e03"===e.status?t=e.publishdate:"\u5df2\u4f5c\u5e9f"===e.status?t=e.abandondate:"\u7533\u8bf7\u4f5c\u5e9f"===e.status&&(t=e.applydate),void 0===t?[]:H.a.createElement("span",null,W()(t).format("YYYY-MM-DD"))},e.ViewItem=function(t){var a,n=e.props.dispatch;"\u5df2\u62df\u5236"===t.status?a=t.pdfeditorpath:"\u5df2\u590d\u6838"===t.status?a=t.pdfpath:"\u5df2\u7f2e\u5236"===t.status?a=t.titlepdfpath:"\u5df2\u7b7e\u7f72"===t.status||"\u5df2\u53d1\u5e03"===t.status?a=t.certpdfpath:"\u5df2\u4f5c\u5e9f"===t.status?a=t.abandonpdfpath:void 0!==a||void 0!==t.filepath&&null!==t.filepath||(a=t.certpdfpath),n({type:"certificate/getPdfByOssPath",payload:{osspath:a},callback:function(e){200===e.code?window.open(e.data):z["a"].success("\u6253\u5f00\u6587\u4ef6\u5931\u8d25")}})},e.handleSign=function(t){if(void 0!==t.approver){z["a"].success("\u6b63\u5728\u62df\u5236\uff0c\u8bf7\u7a0d\u7b49\u51e0\u79d2...");var a=e.state.text,n=e.props.dispatch,r=sessionStorage.getItem("reportno"),l=JSON.parse(localStorage.getItem("userinfo"));a.signer=l.userName,void 0!==t.approver?(a.reviewer=t.approver,n({type:"certificate/signCertFile",payload:k()({},a),callback:function(e){"success"===e.data?(z["a"].success("\u62df\u5236\u6210\u529f"),n({type:"certificate/getCertFiles",payload:{reportno:r},callback:function(e){}})):z["a"].error("\u62df\u5236\u51fa\u73b0\u9519\u8bef,\u8bf7\u4fdd\u8bc1\u7528\u6237\u7684\u7b7e\u540d\u56fe\u7247\u5df2\u4e0a\u4f20")}})):z["a"].error("\u62df\u5236\u51fa\u73b0\u9519\u8bef,\u8bf7\u4fdd\u8bc1\u7528\u6237\u7684\u7b7e\u540d\u56fe\u7247\u5df2\u4e0a\u4f20"),e.setState({showVisible:!1})}else z["a"].error("\u60a8\u6ca1\u6709\u9009\u62e9\u8bc1\u7a3f\u5ba1\u6838\u4eba")},e.signItem=function(t){z["a"].success("\u6b63\u5728\u62c9\u53d6\u6570\u636e\uff0c\u8bf7\u7a0d\u7b49\u51e0\u79d2...");var a=e.props.dispatch,n=k()({},t);a({type:"certificate/convertWordToPdf",payload:n,callback:function(n){if(n){var r={osspath:n.pdf1path};a({type:"certificate/getOssPdf",payload:r,callback:function(a){200===a.code?(e.state.treeData[0].children[0].children[0].data=a.data,e.state.treeData[0].children[0].children[0].title=t.name,e.setState({option:"\u62df\u5236"}),e.setState({urls:a.data}),e.setState({value:"presentCert"}),e.setState({showVisible:!0}),e.setState({text:t})):z["a"].success("\u6253\u5f00\u62df\u5236\u6587\u4ef6\u5931\u8d25")}})}}})},e.editCerticate=function(t){if(void 0!==t.filepath&&null!==t.filepath){var a=t.reportno,n=t.name,r=e.props.dispatch,l={_w_userid:a,_w_fname:n};r({type:"certificate/getSignature",payload:{params:l},callback:function(e){if(200===e.code){var t=e.data,r="https://www.smlq.vip/wpscertificate?_w_signature=".concat(t,"&_w_userid=").concat(a,"&_w_fname=").concat(n);window.open(r)}else w["a"].open({message:"\u52a0\u8f7d\u5931\u8d25",description:e.message})}})}else w["a"].open({message:"\u6b64\u8bc1\u4e66\u901a\u8fc7\u4e0a\u4f20\u4ea7\u751f\uff0c\u4e0d\u53ef\u7f16\u8f91",description:"\u6b64\u8bc1\u4e66\u901a\u8fc7\u4e0a\u4f20\u4ea7\u751f\uff0c\u4e0d\u53ef\u7f16\u8f91"})},e.deleteItem=function(t){M["a"].confirm({title:"\u786e\u5b9a\u5220\u9664\u8bc1\u7a3f\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){var a=e.props.dispatch,n={keyno:t.keyno},r=sessionStorage.getItem("reportno");a({type:"certificate/deleteCertFile",payload:n,callback:function(e){400===e.code?z["a"].error("\u5220\u9664\u5931\u8d25"):(z["a"].success("\u5220\u9664\u6210\u529f"),a({type:"certificate/getCertFiles",payload:{reportno:r}}))}})}})},e.handleOk=function(){var t=e.props,a=t.form.validateFieldsAndScroll,n=t.dispatch,r=sessionStorage.getItem("reportno"),l=JSON.parse(localStorage.getItem("userinfo"));a(function(t,a){if(!t){var i=new FormData;a.MultipartFile.fileList.forEach(function(e){i.append("file",e.originFileObj),i.append("size",e.size)}),i.append("creator",l.nameC),i.append("modifier",l.nameC),i.append("signer",l.userName),i.append("reportno",r),i.append("name",a.recordname),i.append("certcode",l.certCode),n({type:"certificate/uploadCertFile",payload:i,callback:function(e){400===e.code?w["a"].open({message:"\u6dfb\u52a0\u5931\u8d25",description:e.data}):n({type:"certificate/getCertFiles",payload:{reportno:r}})}}),e.setState({visible:!1}),form.resetFields()}})},e.show=function(){var t=e.props,a=t.form;t.dispatch,sessionStorage.getItem("reportno");a.resetFields(),e.setState({fileList:[]}),e.setState({visible:!0})},e.handleCancel=function(){var t=e.props.form;t.resetFields(),e.setState({visible:!1})},e.onChange=function(t){"\u6309\u5355\u4ef7"===t.target.value||"\u6309\u6bd4\u4f8b"===t.target.value?e.setState({showPrice:!0}):e.setState({showPrice:!1})},e.Cancel=function(){return e.setState({previewVisible:!1})},e.handlePreview=function(){var t=b()(y.a.mark(function t(a){return y.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(a.url||a.preview){t.next=4;break}return t.next=3,pe(a.originFileObj);case 3:a.preview=t.sent;case 4:e.setState({previewImage:a.url||a.preview,previewVisible:!0});case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),e.handleChange=function(t){var a=t.file,n=t.fileList,r="application/msword"===a.type,l="application/vnd.openxmlformats-officedocument.wordprocessingml.document"===a.type,i=a.size/1024/1024<20;if(r||l)if(i){var o=a.name,s=/\.{1}[a-z]{1,}$/;null!==s.exec(o)&&(o=o.slice(0,s.exec(o).index));var c=e.props.form;c.setFieldsValue(h()({},"recordname",o)),e.setState({fileList:n})}else M["a"].error({title:"\u8d85\u8fc720M\u9650\u5236\uff0c\u4e0d\u5141\u8bb8\u4e0a\u4f20~"});else M["a"].error({title:"\u53ea\u80fd\u4e0a\u4f20DOC \u3001DOCX \u683c\u5f0f\u7684\u56fe\u7247~"})},e.handleBeforeUpload=function(e){return!1},e.showDownloadVisible=function(t){var a=e.props.dispatch,n=sessionStorage.getItem("reportno");a({type:"certificate/getCheckResultFetch",payload:{reportno:n},callback:function(t){t.data&&(e.state.checkResult=t.data)}}),a({type:"certificate/getSampleRegistersByReportNo",payload:{reportno:n},callback:function(t){void 0!==t.list&&(e.state.sampleRegister=t.list)}}),e.setState({downloadVisible:!!t})},e.handleDownloadCancel=function(t){e.setState({downloadVisible:!!t})},e.handleDownloadAdd=function(t){var a=JSON.parse(localStorage.getItem("userinfo")),n=sessionStorage.getItem("reportno"),r=e.props.dispatch,l=new FormData;l.append("id",t.id),l.append("reportno",n),l.append("creator",a.nameC),l.append("signer",a.userName),l.append("modifier",a.nameC),l.append("fileName",t.fileName),l.append("certcode",a.certCode),"\u91cd\u91cf\u8bc1\u4e66.doc"===e.state.modelPlatformType?(l.append("inspway",t.inspway),r({type:"certificate/downloadWeighTemp",payload:l,callback:function(e){"success"===e?(z["a"].success("\u64cd\u4f5c\u6210\u529f"),r({type:"certificate/getCertFiles",payload:{reportno:n}})):z["a"].error("\u68c0\u6d4b\u7ed3\u679c\u4e0d\u5b58\u5728")}})):"\u8d28\u91cf\u8bc1\u4e66.doc"===e.state.modelPlatformType&&(l.append("sampleno",t.sampleno),r({type:"certificate/downloadQualityTemp",payload:l,callback:function(e){"success"===e?(z["a"].success("\u64cd\u4f5c\u6210\u529f"),r({type:"certificate/getCertFiles",payload:{reportno:n}})):z["a"].error("\u68c0\u6d4b\u7ed3\u679c\u4e0d\u5b58\u5728")}})),e.setState({downloadVisible:!1})},e.handleOnModelSelect=function(t,a){e.state.modelPlatformType=a.key,e.forceUpdate()},e.handleOnSelect=function(t){var a=JSON.parse(localStorage.getItem("userinfo")),n="";n="platform"===t?"platform":"company"===t?a.certCode:"person"===t?a.userName:"blank";var r=e.props.dispatch,l={type:t,owner:n};r({type:"certificate/getModelSelectName",payload:l,callback:function(t){t&&(e.state.modelName=t)}})},e.back=function(){e.props.history.goBack()},e.showCancel=function(){e.setState({showVisible:!1})},e.onSelect=function(t,a){var n=e.props.dispatch;if(void 0===t||void 0===t[0])return null;if("presentCert"===t[0])e.state.urls=e.state.treeData[0].children[0].children[0].data,e.setState({value:t[0]});else if("reportDetail"===t[0])e.state.reportDetail=e.state.treeData[0].children[1].children[0].data,e.setState({value:t[0]});else if(0===t[0].indexOf("checkitem"))e.state.checkData=e.state.treeData[0].children[2].children[0].children[t[0].substring(9)].data,e.setState({value:t[0]});else if(0===t[0].indexOf("testitem"))e.state.renderFormData=e.state.treeData[0].children[3].children[0].children[t[0].substring(8)].data,e.state.renderFormColumns=e.state.sampleColumnsLink,e.setState({value:t[0]});else if(0===t[0].indexOf("recordinfo")){var r=t[0].substring(10);n({type:"certificate/getPdfUrlFetch",payload:{id:r},callback:function(t){t&&(e.state.urls=t.data)}}),e.setState({value:t[0]})}else if(0===t[0].indexOf("certpdf")){var l=t[0].substring(7);n({type:"certificate/getPdfByOssPath",payload:{osspath:l},callback:function(t){t&&(e.state.urls=t.data)}}),e.setState({value:t[0]})}else if(0===t[0].indexOf("abandon")){console.log(t[0]);var i=t[0].substring(7);n({type:"certificate/getPdfByOssPath",payload:{osspath:i},callback:function(t){t&&(e.state.urls=t.data,e.forceUpdate())}}),e.setState({value:t[0]})}return null},e.isValidDate=function(e){return void 0!==e&&null!==e?H.a.createElement("span",null,W()(e).format("YYYY-MM-DD")):[]},e.getPlaceFromCode=function(e){var t="".concat(e.substring(0,2),"0000"),a="".concat(e.substring(0,4),"00"),n=e,r=$["a"].find(function(e){return e.value===t});if(void 0===r)return H.a.createElement("span",null,n);var l=r.children.find(function(e){return e.value===a}),i=l.children.find(function(e){return e.value===n});return H.a.createElement("span",null,r.label,"/",l.label,"/",i.label)},e.renderTreeNodes=function(t){return t.map(function(t){return t.children?H.a.createElement(ie,{title:t.title,key:t.key,dataRef:t},e.renderTreeNodes(t.children)):H.a.createElement(ie,u()({key:t.key},t,{dataRef:t}))})},e.renderFileInfo=function(t){return"presentCert"===t?e.renderLinkFileForm():"reportDetail"===t?e.renderReportForm():0===t.indexOf("checkitem")?e.renderCheckForm():0===t.indexOf("testitem")?e.renderForm():0===t.indexOf("recordinfo")?e.renderLinkFileForm():0===t.indexOf("certpdf")?e.renderLinkFileForm():0===t.indexOf("abandon")?e.renderLinkFileForm():null},e.getRepeatName=function(t,a,n){void 0!==a&&null!==a&&""!==a||n(Object(Q["formatMessage"])({id:"validation.certname.noexist"}));var r=e.props.dispatch,l=sessionStorage.getItem("reportno"),i=new FormData;i.append("reportno",l),i.append("name",a),r({type:"certificate/getRepeatName",payload:i,callback:function(e){"repeat"===e?n(Object(Q["formatMessage"])({id:"validation.certname.repeat"})):"success"===e?n():n(Object(Q["formatMessage"])({id:"validation.certname.error"}))}})},e}return D()(a,[{key:"componentDidMount",value:function(){var e=this;this.setState({overallstate:sessionStorage.getItem("CertificateUploadDetail_overallstate")});var t=this.props.dispatch,a=sessionStorage.getItem("reportno");t({type:"certificate/getCertFiles",payload:{reportno:a}});var n=JSON.parse(localStorage.getItem("userinfo"));t({type:"user/getMan",payload:{certcode:n.certCode,func:"\u8bc1\u7a3f\u590d\u6838"},callback:function(t){if(t){if(void 0===t||null===t||0===t.length)return void M["a"].info({title:"\u672a\u914d\u7f6e\u590d\u6838\u4eba\u7528\u6237\u89d2\u8272\uff0c\u4e0d\u80fd\u63d0\u4ea4\uff01",content:"\u8bf7\u7ba1\u7406\u5458\u5728\u201c\u516c\u53f8\u7ba1\u7406-\u7528\u6237\u7ba1\u7406\u201d\u7ed9\u7528\u6237\u4fee\u6539\uff0c\u52a0\u9009\u7528\u6237\u89d2\u8272\uff01\u9664\u4e1a\u52a1\u526f\u603b\uff0c\u8d22\u52a1\u526f\u603b\uff0c\u6388\u6743\u7b7e\u5b57\u4eba\uff0c\u603b\u7ecf\u7406\u5916\u5168\u90e8\u89d2\u8272\uff0c\u90fd\u53ef\u590d\u6838\u8bc1\u7a3f\u3002",okText:"\u77e5\u9053\u4e86",onOk:function(){}});e.setState({approverusers:t})}else z["a"].error("\u590d\u6838\u4eba\u76f8\u5173\u7528\u6237\u89d2\u8272\u63a5\u53e3\u9519\u8bef")}});var r=a;t({type:"certificate/getReport",payload:r,callback:function(t){e.setState({reportDetail:t})}}),t({type:"certificate/getRecordInfo",payload:{reportno:r},callback:function(t){if(t&&void 0!==t.data&&null!==t.data&&t.data.length>0){var a,n=ee(t.data);try{for(n.s();!(a=n.n()).done;){var r=a.value,l={title:r.recordname,key:r.id};e.state.treeData[2].children.push(l)}}catch(e){n.e(e)}finally{n.f()}}}}),t({type:"certificate/getMainInfo",payload:{reportno:r},callback:function(t){if(t){e.state.treeData.push(t);var a={title:"\u5f53\u524d\u8bc1\u4e66",key:"\u5f53\u524d\u8bc1\u4e66",isLeaf:!1,selectable:!1,children:[{title:"",key:"presentCert",isLeaf:!0,children:[],data:t.data,selectable:!1}],data:null};e.state.treeData[0].children.unshift(a)}}})}},{key:"renderReportForm",value:function(){var e=this.state.reportDetail;return H.a.createElement("div",{style:{width:"100%",height:1.2*document.body.clientHeight,backgroundColor:"white",padding:10}},H.a.createElement(p["a"],{style:{marginBottom:10},size:"small",title:"\u4e1a\u52a1\u4fe1\u606f",bordered:!0,column:{xxl:4,xl:3,lg:3,md:3,sm:2,xs:1}},H.a.createElement(p["a"].Item,{label:"\u59d4\u6258\u7f16\u53f7"},e.reportno),H.a.createElement(p["a"].Item,{label:"\u59d4\u6258\u65e5\u671f"},W()(e.reportdate).format("YYYY-MM-DD")),H.a.createElement(p["a"].Item,{label:"\u68c0\u9a8c\u8d39"},e.price),H.a.createElement(p["a"].Item,{label:"\u7533\u8bf7\u4eba"},e.applicant),H.a.createElement(p["a"].Item,{label:"\u8054\u7cfb\u4eba"},e.applicantname),H.a.createElement(p["a"].Item,{label:"\u8054\u7cfb\u7535\u8bdd"},e.applicanttel),H.a.createElement(p["a"].Item,{label:"\u4ee3\u7406\u4eba"},e.agent),H.a.createElement(p["a"].Item,{label:"\u8054\u7cfb\u4eba"},e.agentname),H.a.createElement(p["a"].Item,{label:"\u8054\u7cfb\u7535\u8bdd"},e.agenttel),H.a.createElement(p["a"].Item,{label:"\u4ed8\u6b3e\u4eba"},e.payer),H.a.createElement(p["a"].Item,{label:"\u4e1a\u52a1\u6765\u6e90"},e.businesssource),H.a.createElement(p["a"].Item,{label:"\u8d38\u6613\u65b9\u5f0f"},e.tradeway),H.a.createElement(p["a"].Item,{label:"\u8bc1\u4e66\u8981\u6c42"},e.certstyle),H.a.createElement(p["a"].Item,{label:"\u81ea\u7f16\u53f7"},e.reportno20),H.a.createElement(p["a"].Item,{label:"\u4e1a\u52a1\u5206\u7c7b"},e.businesssort)),H.a.createElement(p["a"],{style:{marginBottom:10},size:"small",title:"\u68c0\u67e5\u5bf9\u8c61",bordered:!0,column:{xxl:4,xl:3,lg:3,md:3,sm:2,xs:1}},H.a.createElement(p["a"].Item,{label:"\u68c0\u67e5\u54c1\u540d"},e.cargoname),H.a.createElement(p["a"].Item,{label:"\u4e2d\u6587\u4fd7\u540d"},e.chineselocalname),H.a.createElement(p["a"].Item,{label:"\u8239\u540d\u6807\u8bc6"},e.shipname),H.a.createElement(p["a"].Item,{label:"\u7533\u62a5\u6570\u91cf\u548c\u5355\u4f4d"},e.quantityd+e.unit),H.a.createElement(p["a"].Item,{label:"\u68c0\u9a8c\u65f6\u95f4"},W()(e.inspdate).format("YYYY-MM-DD")),H.a.createElement(p["a"].Item,{label:"\u68c0\u67e5\u6e2f\u53e3"},e.inspplace2),H.a.createElement(p["a"].Item,{label:"\u5230\u8fbe\u5730\u70b9"},void 0===e.inspplace1||null===e.inspplace1?"":this.getPlaceFromCode(e.inspplace1))),H.a.createElement(p["a"],{style:{marginBottom:10},size:"small",title:"\u68c0\u67e5\u9879\u76ee",bordered:!0,column:{xxl:4,xl:3,lg:3,md:3,sm:2,xs:1}},H.a.createElement(p["a"].Item,{label:"\u7533\u8bf7\u9879\u76ee"},e.inspway),H.a.createElement(p["a"].Item,{label:"\u68c0\u9a8c\u5907\u6ce8"},e.inspwaymemo1)))}},{key:"renderCheckForm",value:function(){var e=this.state.checkData;return H.a.createElement("div",{style:{width:"100%",height:1.2*document.body.clientHeight,backgroundColor:"white",padding:10}},H.a.createElement(p["a"],{style:{marginBottom:10},size:"small",title:"\u73b0\u573a\u68c0\u67e5",bordered:!0,column:{xxl:4,xl:3,lg:3,md:3,sm:2,xs:1}},H.a.createElement(p["a"].Item,{label:"\u68c0\u9a8c\u9879\u76ee"},e.inspway),H.a.createElement(p["a"].Item,{label:"\u5f00\u59cb\u65e5\u671f"},this.isValidDate(e.begindate)),H.a.createElement(p["a"].Item,{label:"\u7ed3\u675f\u65e5\u671f"},this.isValidDate(e.finishdate)),H.a.createElement(p["a"].Item,{label:"\u91cd\u91cf"},e.weight),H.a.createElement(p["a"].Item,{label:"\u4eba\u5458",span:2},e.inspman),H.a.createElement(p["a"].Item,{label:"\u4eea\u5668",span:3},H.a.createElement("div",{style:{"white-space":"pre"}},e.instrument)),H.a.createElement(p["a"].Item,{label:"\u68c0\u9a8c\u6807\u51c6",span:3},H.a.createElement("div",{style:{"white-space":"pre"}},e.standard)),H.a.createElement(p["a"].Item,{label:"\u7ed3\u679c\u63cf\u8ff0",span:3},e.result)))}},{key:"renderLinkFileForm",value:function(){var e=this.state.urls;return H.a.createElement("div",{style:{width:"100%",height:1.2*document.body.clientHeight,backgroundColor:"white",padding:10}},H.a.createElement("embed",{runat:"server",src:e,style:{width:"100%",height:1.2*document.body.clientHeight},type:"application/pdf"}))}},{key:"renderForm",value:function(){var e=this.state,t=e.renderFormData,a=e.renderFormColumns,n=this.props.loading;return H.a.createElement("div",{style:{width:"100%",height:1.2*document.body.clientHeight,backgroundColor:"white",padding:10}},H.a.createElement(d["a"],{size:"middle",dataSource:t,columns:a,rowKey:"keyno",loading:n,pagination:{showQuickJumper:!0,showSizeChanger:!0}}))}},{key:"render",value:function(){var e=H.a.createElement("div",null,H.a.createElement(c["a"],{type:"plus"}),H.a.createElement("div",{className:"ant-upload-text"},"Upload")),t=this.props,a=t.certificate.recordData,n=t.loading,r=t.form.getFieldDecorator,l=this.state,i=l.fileList,p=l.visible,m=l.previewVisible,f=l.previewImage,h=l.downloadVisible,g=l.modelName,y=l.showVisible,v=l.value,b=l.option,w=l.treeData,E=l.approverusers,k=l.modelPlatformType,C=l.sampleRegister,S=l.checkResult,I=l.text,D=l.overallstate,F=g.map(function(e){return H.a.createElement(le,{key:e.name,value:e.id},e.name)}),x=S.map(function(e){return H.a.createElement(le,{key:e.inspway,value:e.inspway},e.inspway)}),O=C.map(function(e){return H.a.createElement(le,{key:e.sampleno,value:e.sampleno},e.sampleno,e.samplename)}),N={handleDownloadAdd:this.handleDownloadAdd,showDownloadVisible:this.showDownloadVisible,handleDownloadCancel:this.handleDownloadCancel,handleOnSelect:this.handleOnSelect,showCancel:this.showCancel,onSelect:this.onSelect,handleSign:this.handleSign,reviewCertFile:this.reviewCertFile,renderFileInfo:this.renderFileInfo,renderTreeNodes:this.renderTreeNodes,handleOnModelSelect:this.handleOnModelSelect,getRepeatName:this.getRepeatName},R=E.map(function(e){return H.a.createElement(le,{key:e.userName,value:e.userName},e.nameC)}),V=sessionStorage.getItem("reportno"),z=sessionStorage.getItem("shipname"),B=sessionStorage.getItem("applicant"),j={reportno:V,shipname:z,applicant:B};return H.a.createElement(K["a"],{text:j},H.a.createElement(M["a"],{title:"\u8bc1\u7a3f\u4e0a\u4f20",visible:p,onOk:this.handleOk,onCancel:this.handleCancel},H.a.createElement(A["a"],null,H.a.createElement(A["a"].Item,{label:"\u6587\u4ef6\u4e0a\u4f20"},r("MultipartFile",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u4e0a\u4f20\u6587\u4ef6"}]})(H.a.createElement(s["a"],{listType:"picture-card",fileList:i,onPreview:this.handlePreview,beforeUpload:this.handleBeforeUpload,onChange:this.handleChange},i.length>=1?null:e))),H.a.createElement(A["a"].Item,{label:"\u8bc1\u7a3f\u540d\u79f0"},r("recordname",{rules:[{required:!0,validator:this.getRepeatName}]})(H.a.createElement(P["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165\u8bc1\u7a3f\u540d\u79f0,\u4e0d\u8d85\u8fc710\u4e2a\u5b57\u7b26",maxLength:10}))),H.a.createElement(M["a"],{visible:m,footer:null,onCancel:this.Cancel},H.a.createElement("img",{alt:"example",style:{width:"100%"},src:f})))),H.a.createElement(de,u()({},N,{downloadVisible:h,typeOptions:F,modelPlatformType:k,checkResultOptions:x,sampleRegisterOptions:O})),H.a.createElement(ce,u()({},N,{showVisible:y,option:b,treeData:w,value:v,approverusersOptions:R,text:I})),H.a.createElement(o["a"],{bordered:!1,size:"small"},H.a.createElement(L["a"],null,H.a.createElement(T["a"],{span:22},"\u5df2\u53d1\u5e03"===D||"\u7533\u8bf7\u4f5c\u5e9f"===D?[]:[H.a.createElement(Y["a"],{style:{marginBottom:12},type:"primary",onClick:this.show},"\u4e0a\u4f20\u6587\u4ef6")],"\u5df2\u53d1\u5e03"===D||"\u7533\u8bf7\u4f5c\u5e9f"===D?[]:[H.a.createElement(Y["a"],{style:{marginBottom:12,marginLeft:12},type:"primary",onClick:this.showDownloadVisible},"\u4e0b\u8f7d\u6a21\u677f")]),H.a.createElement(T["a"],{span:2},H.a.createElement(Y["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},H.a.createElement(c["a"],{type:"left"}),"\u8fd4\u56de"))),H.a.createElement("div",{className:G.a.tableList},H.a.createElement(d["a"],{style:{marginTop:5},size:"middle",loading:n,dataSource:a,columns:this.columns,rowKey:"name",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(_["PureComponent"]),l=i))||l)||l);t["default"]=me}}]);