(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[24],{Yfrv:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,l,i,o=a("bx4M"),c=(a("Pwec"),a("CtXQ")),s=(a("g9YV"),a("wCAj")),d=(a("bP8k"),a("gFTJ")),u=a("jehZ"),m=a.n(u),p=a("d6i3"),f=a.n(p),h=a("1l/V"),v=a.n(h),y=(a("/xke"),a("TeRw")),g=a("p0pE"),b=a.n(g),w=a("2Taf"),E=a.n(w),k=a("vZ4D"),I=a.n(k),C=a("l4Ni"),x=a.n(C),S=a("ujKo"),F=a.n(S),D=a("MhPg"),O=a.n(D),R=(a("2qtc"),a("kLXV")),Y=(a("14J3"),a("BMrR")),V=(a("jCWc"),a("kPKH")),L=(a("+L6B"),a("2/Rp")),M=(a("miYZ"),a("tsqr")),P=(a("y8nQ"),a("Vl3Y")),N=(a("B9cy"),a("Ol7k")),z=(a("ozfa"),a("MJZm")),A=(a("OaEy"),a("2fM7")),T=(a("sRBo"),a("kaz8")),B=a("q1tI"),_=a.n(B),j=a("MuoO"),H=a("zHco"),J=a("wd/R"),q=a.n(J),K=a("O02X"),U=a.n(K),Q=(a("gNGo"),a("hotG"));function Z(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=G(e))){var t=0,a=function(){};return{s:a,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,r,l=!0,i=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return l=e.done,e},e:function(e){i=!0,r=e},f:function(){try{l||null==n.return||n.return()}finally{if(i)throw r}}}}function G(e,t){if(e){if("string"===typeof e)return X(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?X(e,t):void 0}}function X(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function W(e){return function(){var t,a=F()(e);if($()){var n=F()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return x()(this,t)}}function $(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}T["a"].Group;var ee=A["a"].Option,te=z["a"].TreeNode,ae=(N["a"].Header,N["a"].Footer,N["a"].Sider),ne=N["a"].Content,re=P["a"].create()(function(e){var t=e.form,a=e.option,n=e.showVisible,r=e.showCancel,l=e.value,i=e.onSelect,o=e.treeData,c=e.reviewCertFile,s=e.renderFileInfo,d=e.renderTreeNodes,u=e.approverusersOptions,m=e.text,p=function(){t.validateFields(function(e,n){e||("\u590d\u6838"===a&&c(n),t.resetFields())})},f=function(e,t,a){void 0===t?M["a"].error("\u60a8\u6ca1\u6709\u9009\u62e9\u8bc1\u4e66\u7f2e\u5236\u4eba"):a()};return _.a.createElement(R["a"],{title:a,visible:n,onCancel:r,destroyOnClose:function(){return!0},footer:[_.a.createElement("div",null,_.a.createElement("span",null,"\u7f2e\u5236\u4eba\uff1a"),t.getFieldDecorator("approver",{rules:[{validator:f},{required:!0,message:"\u9009\u62e9\u8bc1\u4e66\u7f2e\u5236\u4eba"}]})(_.a.createElement(A["a"],{style:{width:150,marginRight:10,marginLeft:10},placeholder:"\u9009\u62e9\u8bc1\u4e66\u7f2e\u5236\u4eba"},u)),_.a.createElement(L["a"],{key:"cancel",type:"primary",onClick:r}," \u53d6\u6d88"),"\u590d\u6838"===a?[_.a.createElement(L["a"],{key:"submit2",type:"primary",onClick:p},"\u590d\u6838")]:null)],style:{top:10},width:.95*document.body.clientWidth,height:.6*document.body.clientHeight},_.a.createElement(N["a"],null,_.a.createElement(ne,{style:{margin:15}},_.a.createElement("div",null,_.a.createElement(Y["a"],null,_.a.createElement(V["a"],{span:24},s(l))))),_.a.createElement(ae,{theme:"light",width:380,style:{paddingLeft:60}},_.a.createElement("div",null,"\u62df\u5236\u4eba\uff1a",m.signNameC),_.a.createElement(z["a"],{showLine:!0,defaultSelectedKeys:[l],defaultExpandAll:!0,onSelect:i},d(o)))))});function le(e){return new Promise(function(t,a){var n=new FileReader;n.readAsDataURL(e),n.onload=function(){return t(n.result)},n.onerror=function(e){return a(e)}})}var ie=(n=P["a"].create(),r=Object(j["connect"])(function(e){var t=e.certificate,a=e.loading;return{certificate:t,loading:a.models.certificate}}),n(l=r((i=function(e){O()(a,e);var t=W(a);function a(){var e;E()(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return e=t.call.apply(t,[this].concat(r)),e.state={showVisible:!1,text:{},urls:"",value:"",checkData:{},reportDetail:{},treeData:[],renderFormData:[],renderFormColumns:[],approverusers:[],ishasApprover:!1,sampleColumnsLink:[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u6837\u54c1\u7f16\u53f7",dataIndex:"sampleno"},{title:"\u6837\u54c1\u540d\u79f0",dataIndex:"samplename"},{title:"\u68c0\u67e5\u9879\u76ee",dataIndex:"itemC"},{title:"\u68c0\u9a8c\u6807\u51c6",dataIndex:"teststandard"},{title:"\u7ed3\u679c",dataIndex:"testresult"}]},e.columns=[{title:"\u8bc1\u4e66\u8bc1\u7a3f",dataIndex:"name",render:function(e){var t=/\.{1}[a-z]{1,}$/;return null!==t.exec(e)?_.a.createElement("span",null,e.slice(0,t.exec(e).index)):_.a.createElement("span",null,e)}},{title:"\u590d\u6838\u65e5\u671f",dataIndex:"reviewdate",render:function(t){return e.isValidDate(t)}},{title:"\u590d\u6838\u4eba",dataIndex:"reviewNameC"},{title:"\u72b6\u6001\u65e5\u671f",render:function(t,a){return e.getStatusDate(t)}},{title:"\u72b6\u6001",dataIndex:"status"},{title:"\u64cd\u4f5c",render:function(t,a){return _.a.createElement(B["Fragment"],null,"\u5df2\u62df\u5236"===t.status?[_.a.createElement("a",{onClick:function(){return e.reivewItem(t,a)}},"\u590d\u6838\xa0\xa0")]:[],"\u5df2\u590d\u6838"===t.status?[_.a.createElement("a",{onClick:function(){return e.undoCert(t,a)}},"\u9000\u56de\xa0\xa0")]:[],"\u5f85\u62df\u5236"!==t.status?[_.a.createElement("a",{onClick:function(){return e.ViewItem(t,a)}},"\u67e5\u770b\xa0\xa0")]:[_.a.createElement("div",{style:{color:"grey"}},"\u67e5\u770b")],"\u5df2\u4f5c\u5e9f"===t.status?[_.a.createElement("a",{onClick:function(){return e.viewAbandonItem(t,a)}},"\u4f5c\u5e9f\u539f\u56e0\xa0\xa0")]:[])}}],e.viewAbandonItem=function(e){R["a"].info({title:"\u4f5c\u5e9f\u539f\u56e0",okText:"\u77e5\u9053\u4e86",content:_.a.createElement("div",null,_.a.createElement("p",null,e.abandonreason)),onOk:function(){}})},e.getStatusDate=function(e){var t=void 0;return"\u5f85\u62df\u5236"===e.status?t=e.uploaddate:"\u5df2\u62df\u5236"===e.status?t=e.signdate:"\u5df2\u590d\u6838"===e.status?t=e.reviewdate:"\u5df2\u7f2e\u5236"===e.status?t=e.makedate:"\u5df2\u7b7e\u7f72"===e.status?t=e.authordate:"\u5df2\u53d1\u5e03"===e.status?t=e.publishdate:"\u5df2\u4f5c\u5e9f"===e.status?t=e.abandondate:"\u7533\u8bf7\u4f5c\u5e9f"===e.status&&(t=e.applydate),void 0===t?[]:_.a.createElement("span",null,q()(t).format("YYYY-MM-DD"))},e.undoCert=function(t){var a=e.props.dispatch;a({type:"certificate/undoCert",payload:{keyno:t.keyno},callback:function(e){if("success"===e){M["a"].success("\u56de\u9000\u6210\u529f");var t=sessionStorage.getItem("reportno");a({type:"certificate/getCertFiles",payload:{reportno:t}})}else M["a"].success("\u56de\u9000\u5931\u8d25")}})},e.ViewItem=function(t){var a,n=e.props.dispatch;"\u5df2\u62df\u5236"===t.status?a=t.pdfeditorpath:"\u5df2\u590d\u6838"===t.status?a=t.pdfpath:"\u5df2\u7f2e\u5236"===t.status?a=t.titlepdfpath:"\u5df2\u7b7e\u7f72"===t.status||"\u5df2\u53d1\u5e03"===t.status?a=t.certpdfpath:"\u5df2\u4f5c\u5e9f"===t.status?a=t.abandonpdfpath:void 0!==a||void 0!==t.filepath&&null!==t.filepath||(a=t.certpdfpath),n({type:"certificate/getPdfByOssPath",payload:{osspath:a},callback:function(e){200===e.code?window.open(e.data):M["a"].success("\u6253\u5f00\u6587\u4ef6\u5931\u8d25")}})},e.reviewCertFile=function(t){M["a"].success("\u6b63\u5728\u590d\u6838\uff0c\u8bf7\u7a0d\u7b49\u51e0\u79d2...");var a=e.state.text,n=e.props.dispatch,r=sessionStorage.getItem("reportno"),l=JSON.parse(localStorage.getItem("userinfo"));a.reviewer=l.userName,void 0!==t.approver?(a.maker=t.approver,n({type:"certificate/reviewCertFile",payload:b()({},a),callback:function(e){"success"===e.data?(M["a"].success("\u590d\u6838\u6210\u529f"),n({type:"certificate/getCertFiles",payload:{reportno:r},callback:function(e){}})):M["a"].error("\u590d\u6838\u5931\u8d25")}})):M["a"].error("\u590d\u6838\u5931\u8d25"),e.setState({showVisible:!1})},e.reivewItem=function(t){var a=e.props.dispatch,n={osspath:t.pdfeditorpath};a({type:"certificate/getOssPdf",payload:n,callback:function(a){200===a.code?(e.state.treeData[0].children[0].children[0].data=a.data,e.state.treeData[0].children[0].children[0].title=t.name,e.setState({option:"\u590d\u6838"}),e.setState({urls:a.data}),e.setState({value:"presentCert"}),e.setState({showVisible:!0}),e.setState({text:t})):M["a"].success("\u6253\u5f00\u590d\u6838\u6587\u4ef6\u5931\u8d25")}})},e.editCerticate=function(t){var a=t.reportno,n=t.name,r=e.props.dispatch,l={_w_userid:a,_w_fname:n};r({type:"certificate/getSignature",payload:{params:l},callback:function(e){if(200===e.code){var t=e.data,r="https://www.smlq.vip/wpscertificate?_w_signature=".concat(t,"&_w_userid=").concat(a,"&_w_fname=").concat(n);window.open("about:blank").location.href=r}else y["a"].open({message:"\u52a0\u8f7d\u5931\u8d25",description:e.message})}})},e.deleteItem=function(t){var a=e.props.dispatch,n={keyno:t.keyno},r=sessionStorage.getItem("reportno");a({type:"certificate/deleteCertFile",payload:n,callback:function(e){400===e.code?y["a"].open({message:"\u5220\u9664\u5931\u8d25",description:e.data}):(y["a"].open({message:"\u5220\u9664\u6210\u529f",description:e.data}),a({type:"certificate/getCertFiles",payload:{reportno:r}}))}})},e.handleCancel=function(){var t=e.props.form;t.resetFields(),e.setState({visible:!1})},e.Cancel=function(){return e.setState({previewVisible:!1})},e.handlePreview=function(){var t=v()(f.a.mark(function t(a){return f.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(a.url||a.preview){t.next=4;break}return t.next=3,le(a.originFileObj);case 3:a.preview=t.sent;case 4:e.setState({previewImage:a.url||a.preview,previewVisible:!0});case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),e.back=function(){e.props.history.goBack()},e.showCancel=function(){e.setState({showVisible:!1})},e.onSelect=function(t,a){var n=e.props.dispatch;if(void 0===t||void 0===t[0])return null;if("presentCert"===t[0])e.state.urls=e.state.treeData[0].children[0].children[0].data,e.setState({value:t[0]});else if("reportDetail"===t[0])e.state.reportDetail=e.state.treeData[0].children[1].children[0].data,e.setState({value:t[0]});else if(0===t[0].indexOf("checkitem"))e.state.checkData=e.state.treeData[0].children[2].children[0].children[t[0].substring(9)].data,e.setState({value:t[0]});else if(0===t[0].indexOf("testitem"))e.state.renderFormData=e.state.treeData[0].children[3].children[0].children[t[0].substring(8)].data,e.state.renderFormColumns=e.state.sampleColumnsLink,e.setState({value:t[0]});else if(0===t[0].indexOf("recordinfo")){var r=t[0].substring(10);n({type:"certificate/getPdfUrlFetch",payload:{id:r},callback:function(t){t&&(e.state.urls=t.data)}}),e.setState({value:t[0]})}else if(0===t[0].indexOf("certpdf")){var l=t[0].substring(7);n({type:"certificate/getPdfByOssPath",payload:{osspath:l},callback:function(t){t&&(e.state.urls=t.data)}}),e.setState({value:t[0]})}else if(0===t[0].indexOf("abandon")){console.log(t[0]);var i=t[0].substring(7);n({type:"certificate/getPdfByOssPath",payload:{osspath:i},callback:function(t){t&&(e.state.urls=t.data,e.forceUpdate())}}),e.setState({value:t[0]})}return null},e.isValidDate=function(e){return void 0!==e&&null!==e?_.a.createElement("span",null,q()(e).format("YYYY-MM-DD")):[]},e.getPlaceFromCode=function(e){var t="".concat(e.substring(0,2),"0000"),a="".concat(e.substring(0,4),"00"),n=e,r=Q["a"].find(function(e){return e.value===t});if(void 0===r)return _.a.createElement("span",null,n);var l=r.children.find(function(e){return e.value===a}),i=l.children.find(function(e){return e.value===n});return _.a.createElement("span",null,r.label,"/",l.label,"/",i.label)},e.renderTreeNodes=function(t){return t.map(function(t){return t.children?_.a.createElement(te,{title:t.title,key:t.key,dataRef:t},e.renderTreeNodes(t.children)):_.a.createElement(te,m()({key:t.key},t,{dataRef:t}))})},e.renderFileInfo=function(t){return"presentCert"===t?e.renderLinkFileForm():"reportDetail"===t?e.renderReportForm():0===t.indexOf("checkitem")?e.renderCheckForm():0===t.indexOf("testitem")?e.renderForm():0===t.indexOf("recordinfo")?e.renderLinkFileForm():0===t.indexOf("certpdf")?e.renderLinkFileForm():0===t.indexOf("abandon")?e.renderLinkFileForm():null},e}return I()(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.dispatch,a=sessionStorage.getItem("reportno");t({type:"certificate/getCertFiles",payload:{reportno:a},callback:function(e){}});var n=JSON.parse(localStorage.getItem("userinfo"));t({type:"user/getMan",payload:{certcode:n.certCode,func:"\u8bc1\u7a3f\u590d\u6838"},callback:function(t){if(t){if(void 0===t||null===t||0===t.length)return void R["a"].info({title:"\u672a\u914d\u7f6e\u7f2e\u5236\u4eba\u7528\u6237\u89d2\u8272\uff0c\u4e0d\u80fd\u63d0\u4ea4\uff01",content:"\u8bf7\u7ba1\u7406\u5458\u5728\u201c\u516c\u53f8\u7ba1\u7406-\u7528\u6237\u7ba1\u7406\u201d\u7ed9\u7528\u6237\u4fee\u6539\uff0c\u52a0\u9009\u7528\u6237\u89d2\u8272\uff01\u9664\u4e1a\u52a1\u526f\u603b\uff0c\u8d22\u52a1\u526f\u603b\uff0c\u6388\u6743\u7b7e\u5b57\u4eba\uff0c\u603b\u7ecf\u7406\u5916\u5168\u90e8\u89d2\u8272\uff0c\u90fd\u53ef\u7f2e\u5236\u8bc1\u4e66\u3002",okText:"\u77e5\u9053\u4e86",onOk:function(){}});e.setState({approverusers:t})}else M["a"].error("\u672a\u914d\u7f6e\u7f2e\u5236\u4eba\u7528\u6237\u89d2\u8272")}});var r=a;t({type:"certificate/getReport",payload:r,callback:function(t){e.setState({reportDetail:t})}}),t({type:"certificate/getRecordInfo",payload:{reportno:r},callback:function(t){if(t&&void 0!==t.data&&null!==t.data&&t.data.length>0){var a,n=Z(t.data);try{for(n.s();!(a=n.n()).done;){var r=a.value,l={title:r.recordname,key:r.id};e.state.treeData[2].children.push(l)}}catch(e){n.e(e)}finally{n.f()}}}}),t({type:"certificate/getMainInfo",payload:{reportno:r},callback:function(t){if(t){e.state.treeData.push(t);var a={title:"\u5f53\u524d\u8bc1\u4e66",key:"\u5f53\u524d\u8bc1\u4e66",isLeaf:!1,selectable:!1,children:[{title:"",key:"presentCert",isLeaf:!0,children:[],data:t.data,selectable:!1}],data:null};e.state.treeData[0].children.unshift(a)}}})}},{key:"renderReportForm",value:function(){var e=this.state.reportDetail;return _.a.createElement("div",{style:{width:"100%",height:1.2*document.body.clientHeight,backgroundColor:"white",padding:10}},_.a.createElement(d["a"],{style:{marginBottom:10},size:"small",title:"\u4e1a\u52a1\u4fe1\u606f",bordered:!0,column:{xxl:4,xl:3,lg:3,md:3,sm:2,xs:1}},_.a.createElement(d["a"].Item,{label:"\u59d4\u6258\u7f16\u53f7"},e.reportno),_.a.createElement(d["a"].Item,{label:"\u59d4\u6258\u65e5\u671f"},q()(e.reportdate).format("YYYY-MM-DD")),_.a.createElement(d["a"].Item,{label:"\u68c0\u9a8c\u8d39"},e.price),_.a.createElement(d["a"].Item,{label:"\u7533\u8bf7\u4eba"},e.applicant),_.a.createElement(d["a"].Item,{label:"\u8054\u7cfb\u4eba"},e.applicantname),_.a.createElement(d["a"].Item,{label:"\u8054\u7cfb\u7535\u8bdd"},e.applicanttel),_.a.createElement(d["a"].Item,{label:"\u4ee3\u7406\u4eba"},e.agent),_.a.createElement(d["a"].Item,{label:"\u8054\u7cfb\u4eba"},e.agentname),_.a.createElement(d["a"].Item,{label:"\u8054\u7cfb\u7535\u8bdd"},e.agenttel),_.a.createElement(d["a"].Item,{label:"\u4ed8\u6b3e\u4eba"},e.payer),_.a.createElement(d["a"].Item,{label:"\u4e1a\u52a1\u6765\u6e90"},e.businesssource),_.a.createElement(d["a"].Item,{label:"\u8d38\u6613\u65b9\u5f0f"},e.tradeway),_.a.createElement(d["a"].Item,{label:"\u8bc1\u4e66\u8981\u6c42"},e.certstyle),_.a.createElement(d["a"].Item,{label:"\u81ea\u7f16\u53f7"},e.reportno20),_.a.createElement(d["a"].Item,{label:"\u4e1a\u52a1\u5206\u7c7b"},e.businesssort)),_.a.createElement(d["a"],{style:{marginBottom:10},size:"small",title:"\u68c0\u67e5\u5bf9\u8c61",bordered:!0,column:{xxl:4,xl:3,lg:3,md:3,sm:2,xs:1}},_.a.createElement(d["a"].Item,{label:"\u68c0\u67e5\u54c1\u540d"},e.cargoname),_.a.createElement(d["a"].Item,{label:"\u4e2d\u6587\u4fd7\u540d"},e.chineselocalname),_.a.createElement(d["a"].Item,{label:"\u8239\u540d\u6807\u8bc6"},e.shipname),_.a.createElement(d["a"].Item,{label:"\u7533\u62a5\u6570\u91cf\u548c\u5355\u4f4d"},e.quantityd+e.unit),_.a.createElement(d["a"].Item,{label:"\u68c0\u9a8c\u65f6\u95f4"},q()(e.inspdate).format("YYYY-MM-DD")),_.a.createElement(d["a"].Item,{label:"\u68c0\u67e5\u6e2f\u53e3"},e.inspplace2),_.a.createElement(d["a"].Item,{label:"\u5230\u8fbe\u5730\u70b9"},void 0===e.inspplace1||null===e.inspplace1?"":this.getPlaceFromCode(e.inspplace1))),_.a.createElement(d["a"],{style:{marginBottom:10},size:"small",title:"\u68c0\u67e5\u9879\u76ee",bordered:!0,column:{xxl:4,xl:3,lg:3,md:3,sm:2,xs:1}},_.a.createElement(d["a"].Item,{label:"\u7533\u8bf7\u9879\u76ee"},e.inspway),_.a.createElement(d["a"].Item,{label:"\u68c0\u9a8c\u5907\u6ce8"},e.inspwaymemo1)))}},{key:"renderCheckForm",value:function(){var e=this.state.checkData;return _.a.createElement("div",{style:{width:"100%",height:1.2*document.body.clientHeight,backgroundColor:"white",padding:10}},_.a.createElement(d["a"],{style:{marginBottom:10},size:"small",title:"\u73b0\u573a\u68c0\u67e5",bordered:!0,column:{xxl:4,xl:3,lg:3,md:3,sm:2,xs:1}},_.a.createElement(d["a"].Item,{label:"\u68c0\u9a8c\u9879\u76ee"},e.inspway),_.a.createElement(d["a"].Item,{label:"\u5f00\u59cb\u65e5\u671f"},this.isValidDate(e.begindate)),_.a.createElement(d["a"].Item,{label:"\u7ed3\u675f\u65e5\u671f"},this.isValidDate(e.finishdate)),_.a.createElement(d["a"].Item,{label:"\u91cd\u91cf"},e.weight),_.a.createElement(d["a"].Item,{label:"\u4eba\u5458",span:2},e.inspman),_.a.createElement(d["a"].Item,{label:"\u4eea\u5668",span:3},_.a.createElement("div",{style:{"white-space":"pre"}},e.instrument)),_.a.createElement(d["a"].Item,{label:"\u68c0\u9a8c\u6807\u51c6",span:3},_.a.createElement("div",{style:{"white-space":"pre"}},e.standard)),_.a.createElement(d["a"].Item,{label:"\u7ed3\u679c\u63cf\u8ff0",span:3},e.result)))}},{key:"renderLinkFileForm",value:function(){var e=this.state.urls;return _.a.createElement("div",{style:{width:"100%",height:1.2*document.body.clientHeight,backgroundColor:"white",padding:10}},_.a.createElement("embed",{runat:"server",src:e,style:{width:"100%",height:1.2*document.body.clientHeight},type:"application/pdf"}))}},{key:"renderForm",value:function(){var e=this.state,t=e.renderFormData,a=e.renderFormColumns,n=this.props.loading;return _.a.createElement("div",{style:{width:"100%",height:1.2*document.body.clientHeight,backgroundColor:"white",padding:10}},_.a.createElement(s["a"],{size:"middle",dataSource:t,columns:a,rowKey:"keyno",loading:n,pagination:{showQuickJumper:!0,showSizeChanger:!0}}))}},{key:"render",value:function(){_.a.createElement("div",null,_.a.createElement(c["a"],{type:"plus"}),_.a.createElement("div",{className:"ant-upload-text"},"Upload"));var e=this.props,t=e.certificate.recordData,a=e.loading,n=(e.form.getFieldDecorator,this.state),r=n.showVisible,l=n.value,i=n.option,d=n.treeData,u=n.approverusers,p=n.text,f={handleOnSelect:this.handleOnSelect,showCancel:this.showCancel,onSelect:this.onSelect,reviewCertFile:this.reviewCertFile,renderFileInfo:this.renderFileInfo,renderTreeNodes:this.renderTreeNodes},h=u.map(function(e){return _.a.createElement(ee,{key:e.userName,value:e.userName},e.nameC)}),v=sessionStorage.getItem("reportno"),y=sessionStorage.getItem("shipname"),g=sessionStorage.getItem("applicant"),b={reportno:v,shipname:y,applicant:g};return _.a.createElement(H["a"],{text:b},_.a.createElement(re,m()({},f,{showVisible:r,option:i,treeData:d,value:l,text:p,approverusersOptions:h})),_.a.createElement(o["a"],{bordered:!1,size:"small"},_.a.createElement(Y["a"],null,_.a.createElement(V["a"],{span:22}),_.a.createElement(V["a"],{span:2},_.a.createElement(L["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},_.a.createElement(c["a"],{type:"left"}),"\u8fd4\u56de"))),_.a.createElement("div",{className:U.a.tableList},_.a.createElement(s["a"],{style:{marginTop:5},size:"middle",loading:a,dataSource:t,columns:this.columns,rowKey:"name",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(B["PureComponent"]),l=i))||l)||l);t["default"]=ie}}]);