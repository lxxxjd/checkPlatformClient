(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[130],{yvrG:function(e,t,a){"use strict";a.r(t);a("2qtc");var n,l,r,c=a("kLXV"),i=(a("g9YV"),a("wCAj")),o=(a("IzEo"),a("bx4M")),s=(a("bP8k"),a("gFTJ")),d=(a("/zsF"),a("PArb")),m=(a("14J3"),a("BMrR")),u=(a("+L6B"),a("2/Rp")),p=(a("Pwec"),a("CtXQ")),E=(a("jCWc"),a("kPKH")),f=a("2Taf"),g=a.n(f),I=a("vZ4D"),b=a.n(I),y=a("l4Ni"),h=a.n(y),x=a("ujKo"),w=a.n(x),Y=a("MhPg"),k=a.n(Y),v=(a("tU7J"),a("wFql")),D=a("q1tI"),C=a.n(D),M=a("MuoO"),S=a("zHco"),z=a("/iIO"),R=a.n(z),A=a("wd/R"),J=a.n(A);function F(e){return function(){var t,a=w()(e);if(B()){var n=w()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return h()(this,t)}}function B(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var K=v["a"].Title,P=(n=Object(M["connect"])(function(e){var t=e.businessIncomeDetail,a=e.loading;return{businessIncomeDetail:t,loading:a.models.businessIncomeDetail}}),n((r=function(e){k()(a,e);var t=F(a);function a(){var e;g()(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return e=t.call.apply(t,[this].concat(l)),e.state={cnasInfo:{checkcode:"",checkname:"",domaincode:"",domainname:"",subdomaincode:"",subdomainname:""},checkResult:[],checkRecord:[],test:[],testRecord:[],certFile:[],testInfo:[],pricemaking:{},sample:[],visible:!1,detail:[],sampleCompany:[]},e.columns=[{title:"\u68c0\u67e5\u9879\u76ee",dataIndex:"inspway"},{title:"\u5f00\u59cb\u65e5\u671f",dataIndex:"begindate",render:function(e){if(null!=e)return C.a.createElement("span",null,J()(e).format("YYYY-MM-DD"))}},{title:"\u7ed3\u675f\u65e5\u671f",dataIndex:"finishdate",render:function(e){if(null!=e)return C.a.createElement("span",null,J()(e).format("YYYY-MM-DD"))}},{title:"\u68c0\u67e5\u4eba\u5458",dataIndex:"inspman",render:function(e,t){if(void 0!==typeof e&&null!==e){var a=[];if(a=e.split("|"),a.length<2)return e;for(var n=null,l=C.a.createElement("br",null),r=0;r<a.length;r++)n=0===r?a[r]:C.a.createElement("span",null,n,l,a[r]);return C.a.createElement("div",null,n)}}},{title:"\u6570/\u91cd\u91cf",dataIndex:"weight"}],e.columns1=[{title:"\u8bb0\u5f55\u540d",dataIndex:"recordname",render:function(e){var t=/\.{1}[a-z]{1,}$/;return null!==t.exec(e)?C.a.createElement("span",null,e.slice(0,t.exec(e).index)):C.a.createElement("span",null,e)}},{title:"\u4e0a\u4f20\u65e5\u671f",dataIndex:"recorddate",render:function(e){if(null!=e)return C.a.createElement("span",null,J()(e).format("YYYY-MM-DD"))}},{title:"\u4e0a\u4f20\u4eba",dataIndex:"creator"},{title:"\u64cd\u4f5c",render:function(t,a){return C.a.createElement(D["Fragment"],null,C.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u67e5\u770b"))}}],e.columns2=[{title:"\u68c0\u9a8c\u673a\u6784",dataIndex:"testman"},{title:"\u8f6c\u59d4\u6258\u65e5\u671f",dataIndex:"assigndate",render:function(e){if(null!=e)return C.a.createElement("span",null,J()(e).format("YYYY-MM-DD"))}},{title:"\u8f6c\u59d4\u6258\u4eba",dataIndex:"assignman"},{title:"\u8f6c\u59d4\u6258\u9879\u76ee",dataIndex:"inspway"},{title:"\u8f6c\u59d4\u6258\u8d39\u7528",dataIndex:"totalfee"}],e.columns3=[{title:"\u6837\u54c1\u7f16\u53f7",dataIndex:"sampleno"},{title:"\u6837\u54c1\u540d\u79f0",dataIndex:"samplename"},{title:"\u68c0\u6d4b\u4eba\u5458",dataIndex:"testmans"},{title:"\u6307\u6d3e\u65e5\u671f",dataIndex:"makingdate",render:function(e){if(null!=e)return C.a.createElement("span",null,J()(e).format("YYYY-MM-DD"))}},{title:"\u6307\u6d3e\u4eba",dataIndex:"taskman"},{title:"\u64cd\u4f5c",render:function(t,a){return C.a.createElement(D["Fragment"],null,C.a.createElement("a",{onClick:function(){return e.detailItem(t,a)}},"\u67e5\u770b"))}}],e.columns4=[{title:"\u5b9e\u9a8c\u5ba4/\u68c0\u9a8c\u673a\u6784",dataIndex:"testman"},{title:"\u5206\u5305\u65e5\u671f",dataIndex:"assigndate",render:function(e){return C.a.createElement("span",null,J()(e).format("YYYY-MM-DD"))}},{title:"\u8ba1\u4ef7\u65b9\u5f0f",dataIndex:"priceway"},{title:"\u5355\u4ef7",dataIndex:"price"},{title:"\u603b\u4ef7",dataIndex:"totalfee"},{title:"\u72b6\u6001",dataIndex:"reviewstatus"}],e.columns5=[{title:"\u68c0\u6d4b\u62a5\u544a",dataIndex:"recordname",render:function(e){var t=/\.{1}[a-z]{1,}$/;return null!==t.exec(e)?C.a.createElement("span",null,e.slice(0,t.exec(e).index)):C.a.createElement("span",null,e)}},{title:"\u4e0a\u4f20\u65e5\u671f",dataIndex:"recorddate",render:function(e){if(null!=e)return C.a.createElement("span",null,J()(e).format("YYYY-MM-DD"))}},{title:"\u4e0a\u4f20\u4eba",dataIndex:"creator"},{title:"\u64cd\u4f5c",render:function(t,a){return C.a.createElement(D["Fragment"],null,C.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u67e5\u770b"))}}],e.columns6=[{title:"\u8bc1\u4e66\u540d\u79f0",dataIndex:"name",render:function(e){var t=/\.{1}[a-z]{1,}$/;return null!==t.exec(e)?C.a.createElement("span",null,e.slice(0,t.exec(e).index)):C.a.createElement("span",null,e)}},{title:"\u4e0a\u4f20\u65e5\u671f",dataIndex:"create_time",render:function(e){if(null!=e)return C.a.createElement("span",null,J()(e).format("YYYY-MM-DD"))}},{title:"\u4e0a\u4f20\u4eba",dataIndex:"creator"},{title:"\u72b6\u6001",dataIndex:"status"},{title:"\u64cd\u4f5c",render:function(t,a){return C.a.createElement(D["Fragment"],null,C.a.createElement("a",{onClick:function(){return e.previewCertItem(t,a)}},"\u67e5\u770b"))}}],e.columns7=[{title:"\u6307\u6807\u540d\u79f0",dataIndex:"itemC"},{title:"\u82f1\u6587\u540d\u79f0",dataIndex:"itemE"},{title:"\u68c0\u6d4b\u6807\u51c6",dataIndex:"teststandard"},{title:"\u5355\u4f4d",dataIndex:"unit"},{title:"\u7ed3\u679c",dataIndex:"testresult"},{title:"\u6bd4\u8f83\u65b9\u6cd5",dataIndex:"calWay"},{title:"\u53c2\u8003\u503c",dataIndex:"referValue"},{title:"\u72b6\u6001",dataIndex:"qualityErr"}],e.handleCancel=function(){e.setState({visible:!1})},e.detailItem=function(t){var a=e.props.dispatch;a({type:"businessIncomeDetail/getAllDetails",payload:{reportno:t.reportno,sampleno:t.sampleno},callback:function(t){200===t.code&&e.setState({detail:t.data})}}),e.setState({visible:!0})},e.previewItem=function(t){var a=e.props.dispatch,n=t.filepath;if(void 0!==n&&null!==n){var l=n.substring(n.lastIndexOf(".")+1);if("pdf"===l)a({type:"businessIncomeDetail/getOssPdf",payload:{osspath:n},callback:function(t){if(console.log(t),400===t.code)notification.open({message:"\u6253\u5f00\u5931\u8d25",description:t.data});else{var a=t.data;e.setState({url:a}),console.log(a),window.open(a)}}});else{var r="https://www.smlq.vip/api/cert_report/getFileStream?osspath=".concat(n);window.open(r)}}},e.previewCertItem=function(t){var a=e.props.dispatch,n=(sessionStorage.getItem("reportno"),"");"\u5df2\u62df\u5236"===t.status?n=t.pdfeditorpath:"\u5df2\u590d\u6838"===t.status?n=t.pdfpath:"\u5df2\u7f2e\u5236"===t.status?n=t.titlepdfpath:"\u5df2\u7b7e\u7f72"===t.status||"\u5df2\u53d1\u5e03"===t.status?n=t.certpdfpath:"\u5df2\u4f5c\u5e9f"===t.status&&(n=t.abandonpdfpath),a({type:"businessIncomeDetail/getOssPdf",payload:{osspath:n},callback:function(e){if(400===e.code)notification.open({message:"\u6253\u5f00\u5931\u8d25",description:e.data});else{var t=e.data;window.open(t)}}})},e.back=function(){window.close()},e}return b()(a,[{key:"componentWillMount",value:function(){var e=this,t=sessionStorage.getItem("reportno"),a=this.props.dispatch,n=JSON.parse(localStorage.getItem("userinfo"));a({type:"businessIncomeDetail/getReport",payload:t,callback:function(t){var n=t;void 0!==n.cnasCode&&null!==n.cnasCode&&"1"===n.iscnas&&a({type:"entrustment/getCnasInfo",payload:{checkCode:n.cnasCode},callback:function(t){200===t.code&&e.setState({cnasInfo:t.data})}})}}),a({type:"businessIncomeDetail/getCheckResult",payload:{reportno:t},callback:function(t){200===t.code&&e.setState({checkResult:t.data})}}),a({type:"businessIncomeDetail/getRecordInfo",payload:{reportno:t,source:"\u68c0\u67e5\u8bb0\u5f55"},callback:function(t){200===t.code&&e.setState({checkRecord:t.data})}}),a({type:"businessIncomeDetail/getRecordInfo",payload:{reportno:t,source:"\u6d4b\u8bd5\u62a5\u544a"},callback:function(t){200===t.code&&e.setState({testRecord:t.data})}}),a({type:"businessIncomeDetail/getTestByReportNoAndAssignsort",payload:{reportno:t,assignsort:"\u8f6c\u59d4\u6258"},callback:function(t){200===t.code&&e.setState({test:t.data})}}),a({type:"businessIncomeDetail/getCertFiles",payload:{reportno:t},callback:function(t){200===t.code&&e.setState({certFile:t.data})}}),a({type:"businessIncomeDetail/getPriceMakingList",payload:{reportno:t},callback:function(t){200===t.code&&e.setState({pricemaking:t.data})}}),a({type:"businessIncomeDetail/getAllSampleAndTestMan",payload:{certCode:n.certCode,kind:"reportno",value:t},callback:function(t){200===t.code&&e.setState({sample:t.data})}}),a({type:"businessIncomeDetail/getTestByReportNoAndAssignsort",payload:{reportno:t,assignsort:"\u54c1\u8d28\u5206\u5305"},callback:function(t){200===t.code&&e.setState({sampleCompany:t.data})}})}},{key:"render",value:function(){var e=this.props,t=e.businessIncomeDetail,a=e.loading,n=t.report,l=this.state,r=l.cnasInfo,f=l.checkResult,g=l.checkRecord,I=l.test,b=l.testRecord,y=l.certFile,h=l.pricemaking,x=l.sample,w=l.detail,Y=l.visible,k=l.sampleCompany;return C.a.createElement(S["a"],{loading:a},C.a.createElement(o["a"],{bordered:!1},C.a.createElement(m["a"],{gutter:16},C.a.createElement(E["a"],{span:3},C.a.createElement(K,{level:3},"\u59d4\u6258\u8be6\u60c5")),C.a.createElement(E["a"],{span:19}),C.a.createElement(E["a"],{span:2},C.a.createElement(u["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},C.a.createElement(p["a"],{style:{paddingLeft:5},type:"close"}),"\u5173\u95ed"))),C.a.createElement(d["a"],{style:{marginBottom:32}}),C.a.createElement(s["a"],{size:"large",title:"\u4e1a\u52a1\u4fe1\u606f",style:{marginBottom:32},bordered:!0},C.a.createElement(s["a"].Item,{label:"\u59d4\u6258\u7f16\u53f7"},n.reportno),C.a.createElement(s["a"].Item,{label:"\u59d4\u6258\u65e5\u671f"},J()(n.reportdate).format("YYYY-MM-DD")),C.a.createElement(s["a"].Item,{label:"\u68c0\u9a8c\u8d39"},n.price),C.a.createElement(s["a"].Item,{label:"\u7533\u8bf7\u4eba"},n.applicant),C.a.createElement(s["a"].Item,{label:"\u8054\u7cfb\u4eba"},n.applicantname),C.a.createElement(s["a"].Item,{label:"\u8054\u7cfb\u7535\u8bdd"},n.applicanttel),C.a.createElement(s["a"].Item,{label:"\u4ee3\u7406\u4eba"},n.agent),C.a.createElement(s["a"].Item,{label:"\u8054\u7cfb\u4eba"},n.agentname),C.a.createElement(s["a"].Item,{label:"\u8054\u7cfb\u7535\u8bdd"},n.agenttel),C.a.createElement(s["a"].Item,{label:"\u4ed8\u6b3e\u4eba"},n.payer),C.a.createElement(s["a"].Item,{label:"\u4e1a\u52a1\u6765\u6e90"},n.businesssource),C.a.createElement(s["a"].Item,{label:"\u8d38\u6613\u65b9\u5f0f"},n.tradeway),C.a.createElement(s["a"].Item,{label:"\u8bc1\u4e66\u8981\u6c42"},n.certstyle),C.a.createElement(s["a"].Item,{label:"\u81ea\u7f16\u53f7"},n.reportno20),C.a.createElement(s["a"].Item,{label:"\u4e1a\u52a1\u5206\u7c7b"},n.businesssort),C.a.createElement(s["a"].Item,{label:"\u6267\u884c\u90e8\u95e8"},n.section),C.a.createElement(s["a"].Item,{label:"\u6d77\u5173\u90e8\u95e8"},n.customsName)),C.a.createElement(d["a"],{style:{marginBottom:32}}),C.a.createElement(s["a"],{size:"large",title:"\u68c0\u67e5\u5bf9\u8c61",style:{marginBottom:32},bordered:!0},C.a.createElement(s["a"].Item,{label:"\u68c0\u67e5\u54c1\u540d"},n.cargoname),C.a.createElement(s["a"].Item,{label:"\u4e2d\u6587\u4fd7\u540d"},n.chineselocalname),C.a.createElement(s["a"].Item,{label:"\u8239\u540d\u6807\u8bc6"},n.shipname),C.a.createElement(s["a"].Item,{label:"\u7533\u62a5\u6570\u91cf"},(void 0===n.quantityd||null===n.quantityd?"":n.quantityd)+n.unit),C.a.createElement(s["a"].Item,{label:"\u9884\u68c0\u65e5\u671f"},J()(n.inspdate).format("YYYY-MM-DD")),C.a.createElement(s["a"].Item,{label:"\u68c0\u9a8c\u6e2f\u53e3"},n.fromto),C.a.createElement(s["a"].Item,{label:"\u68c0\u9a8c\u5730\u70b9"},n.inspectplace))),C.a.createElement(o["a"],{title:"\u68c0\u67e5\u9879\u76ee",className:R.a.card,bordered:!1},C.a.createElement("table",{width:"100%",border:1},C.a.createElement("tr",null,C.a.createElement("td",{width:"8%",style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}},"\u8ba4\u53ef\u9886\u57df\u53ca\u4ee3\u7801"),C.a.createElement("td",{width:"8%",style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}},"\u8ba4\u53ef\u5b50\u9886\u57df\u4ee3\u7801"),C.a.createElement("td",{width:"12%",style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}}," \u68c0\u67e5\u9886\u57df/\u68c0\u67e5\u5bf9\u8c61\u53ca\u4ee3\u7801"),C.a.createElement("td",{width:"15%",style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}},"\u68c0\u67e5\u9879\u76ee\u53ca\u4ee3\u7801"),C.a.createElement("td",{style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}}," \u68c0\u67e5\u9879\u76ee\u8be6\u7ec6\u63cf\u8ff0")),C.a.createElement("tr",null,C.a.createElement("td",{style:{padding:"10px"}},r.domaincode,C.a.createElement("br",null),r.domainname),C.a.createElement("td",{style:{padding:"10px"}},r.subdomaincode,C.a.createElement("br",null),r.subdomainname),C.a.createElement("td",{style:{padding:"10px"}},r.checkcode,C.a.createElement("br",null),r.checkname),C.a.createElement("td",{style:{padding:"10px"}},n.cnasProject),C.a.createElement("td",{style:{padding:"10px"}},C.a.createElement(m["a"],null,C.a.createElement(E["a"],{span:24},C.a.createElement("span",null,"\u7533\u8bf7\u9879\u76ee:",n.inspway))),C.a.createElement(m["a"],null,C.a.createElement(E["a"],{span:24},C.a.createElement("span",null,"\u68c0\u9a8c\u5907\u6ce8:",n.inspwaymemo1))))))),C.a.createElement(o["a"],null,C.a.createElement(s["a"],{size:"large",title:"\u5f53\u524d\u72b6\u6001",style:{marginBottom:32},bordered:!0},C.a.createElement(s["a"].Item,{label:"\u72b6\u6001\u65e5\u671f"},null!==n.overalltime?J()(n.overalltime).format("YYYY-MM-DD"):null),C.a.createElement(s["a"].Item,{label:"\u5f53\u524d\u72b6\u6001"},n.overallstate))),C.a.createElement(o["a"],{bordered:!1,title:"\u73b0\u573a\u68c0\u67e5"},C.a.createElement("div",null,C.a.createElement(i["a"],{size:"middle",loading:a,dataSource:f,columns:this.columns,rowKey:"inspway",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))),C.a.createElement(o["a"],{bordered:!1,title:"\u68c0\u67e5\u8bb0\u5f55"},C.a.createElement("div",null,C.a.createElement(i["a"],{size:"middle",loading:a,dataSource:g,columns:this.columns1,rowKey:"recordname",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))),C.a.createElement(o["a"],{bordered:!1,title:"\u8f6c\u59d4\u6258"},C.a.createElement("div",null,C.a.createElement(i["a"],{size:"middle",loading:a,dataSource:I,columns:this.columns2,rowKey:"testman",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))),C.a.createElement(o["a"],{bordered:!1,title:"\u6837\u54c1\u81ea\u6d4b"},C.a.createElement("div",null,C.a.createElement(i["a"],{size:"middle",loading:a,dataSource:x.list,columns:this.columns3,rowKey:"recordname",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))),C.a.createElement(o["a"],{bordered:!1,title:"\u6837\u54c1\u5206\u5305"},C.a.createElement("div",null,C.a.createElement(i["a"],{size:"middle",loading:a,dataSource:k,columns:this.columns4,rowKey:"recordname",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))),C.a.createElement(o["a"],{bordered:!1,title:"\u68c0\u6d4b\u62a5\u544a"},C.a.createElement("div",null,C.a.createElement(i["a"],{size:"middle",loading:a,dataSource:b,columns:this.columns5,rowKey:"recordname",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))),C.a.createElement(o["a"],{bordered:!1,title:"\u8bc1\u7a3f\u8bc1\u4e66"},C.a.createElement("div",null,C.a.createElement(i["a"],{size:"middle",loading:a,dataSource:y,columns:this.columns6,rowKey:"name",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))),C.a.createElement(o["a"],null,C.a.createElement(s["a"],{size:"large",title:"\u8ba1\u6536\u8d39",style:{marginBottom:32},bordered:!0},C.a.createElement(s["a"].Item,{label:"\u5b9a\u4ef7\u65e5\u671f"},null!==h.pricedate?J()(h.pricedate).format("YYYY-MM-DD"):null),C.a.createElement(s["a"].Item,{label:"\u5b9a\u4ef7\u4eba"},h.priceman),C.a.createElement(s["a"].Item,{label:"\u5b9a\u4ef7\u91d1\u989d"},h.total),C.a.createElement(s["a"].Item,{label:"\u6e05\u5355\u65e5\u671f"},null!==h.listdate?J()(h.listdate).format("YYYY-MM-DD"):null),C.a.createElement(s["a"].Item,{label:"\u62df\u5355\u4eba"},h.listman),C.a.createElement(s["a"].Item,{label:"\u6e05\u5355\u53f7"},h.listno),C.a.createElement(s["a"].Item,{label:"\u53d1\u7968\u65e5\u671f"},null!==h.invoiceDate?J()(h.invoiceDate).format("YYYY-MM-DD"):null),C.a.createElement(s["a"].Item,{label:"\u5f00\u7968\u4eba"},h.invoiceMan),C.a.createElement(s["a"].Item,{label:"\u53d1\u7968\u53f7\u7801"},h.invoiceno),C.a.createElement(s["a"].Item,{label:"\u5230\u8d26\u65e5\u671f"},null!==h.paydate?J()(h.paydate).format("YYYY-MM-DD"):null),C.a.createElement(s["a"].Item,{label:"\u5230\u8d26\u767b\u8bb0"},h.payregistMan),C.a.createElement(s["a"].Item,{label:"\u5230\u8d26\u72b6\u6001"},h.paystatus))),C.a.createElement(c["a"],{title:"\u7ed3\u679c\u8be6\u60c5",visible:Y,footer:null,onCancel:this.handleCancel},C.a.createElement(i["a"],{size:"middle",loading:a,dataSource:w,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns7,rowKey:"keyno"})))}}]),a}(D["Component"]),l=r))||l);t["default"]=P}}]);