(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[115],{hUAQ:function(e,t,n){"use strict";n.r(t);n("2qtc");var a,o,r,i,s=n("kLXV"),l=(n("IzEo"),n("bx4M")),c=(n("g9YV"),n("wCAj")),u=n("2Taf"),p=n.n(u),m=n("vZ4D"),d=n.n(m),f=n("l4Ni"),h=n.n(f),I=n("ujKo"),v=n.n(I),y=n("MhPg"),g=n.n(y),w=(n("OaEy"),n("2fM7")),E=(n("sRBo"),n("kaz8")),C=(n("y8nQ"),n("Vl3Y")),b=n("q1tI"),S=n.n(b),x=n("MuoO"),A=n("3a4m"),k=n.n(A),R=n("zHco"),D=n("glGN"),z=n.n(D),N=n("Xt3C");function M(e){return function(){var t,n=v()(e);if(O()){var a=v()(this).constructor;t=Reflect.construct(n,arguments,a)}else t=n.apply(this,arguments);return h()(this,t)}}function O(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var J=C["a"].create()(N["a"]),P=(E["a"].Group,C["a"].Item,w["a"].Option),F=(a=Object(x["connect"])(function(e){var t=e.inspectionAnalysis,n=e.loading;return{inspectionAnalysis:t,loading:n.models.inspectionAnalysis}}),o=C["a"].create(),a(r=o((i=function(e){g()(n,e);var t=M(n);function n(){var e;p()(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return e=t.call.apply(t,[this].concat(o)),e.state={formValues:{},visible:!1,allCompanyName:[],selectEntrustment:null,showPrice:!1,isoperatevisible:!1},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate"},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u6837\u54c1\u7f16\u53f7",dataIndex:"sampleno"},{title:"\u6837\u54c1\u540d\u79f0",dataIndex:"samplename"},{title:"\u72b6\u6001",dataIndex:"state"},{title:"\u64cd\u4f5c",render:function(t,n){return S.a.createElement(b["Fragment"],null,"\u5df2\u53d1\u5e03"!==t.overallstate&&"\u7533\u8bf7\u4f5c\u5e9f"!==t.overallstate&&e.state.isoperatevisible?[S.a.createElement("a",{onClick:function(){return e.mobileItem(t,n)}},"\u5f55\u5165\xa0\xa0")]:[],S.a.createElement("a",{onClick:function(){return e.detailItem(t,n)}},"\u67e5\u770b"),"\xa0\xa0",S.a.createElement("a",{onClick:function(){return e.previewItem(t,n)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.columns1=[{title:"\u6307\u6807\u540d\u79f0",dataIndex:"itemC"},{title:"\u82f1\u6587\u540d\u79f0",dataIndex:"itemE"},{title:"\u68c0\u6d4b\u6807\u51c6",dataIndex:"teststandard"},{title:"\u5355\u4f4d",dataIndex:"unit"},{title:"\u7ed3\u679c",dataIndex:"testresult"}],e.detailItem=function(t){var n=e.props.dispatch;n({type:"inspectionAnalysis/getAllDetails",payload:{reportno:t.reportno,sampleno:t.sampleno}}),e.setState({visible:!0})},e.uploadItem=function(e){sessionStorage.setItem("reportno",e.reportno),k.a.push({pathname:"/InspectionAnalysis/ResultRecord"}),sessionStorage.setItem("ResultRecord_overallstate",e.overallstate)},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),window.open("/Entrustment/DetailForEntrustment"),localStorage.setItem("reportDetailNo",e.reportno)},e.mobileItem=function(e){sessionStorage.setItem("reportno",e.reportno),sessionStorage.setItem("shipname",e.shipname),sessionStorage.setItem("sampleno",e.sampleno),k.a.push({pathname:"/InspectionAnalysis/ResultUpdateDetail"})},e.handleCancel=function(){e.setState({visible:!1})},e}return d()(n,[{key:"componentDidMount",value:function(){var e=this.props.dispatch,t=JSON.parse(localStorage.getItem("userinfo"));-1!==t.role.indexOf("\u68c0\u6d4b\u4eba\u5458")&&(this.state.isoperatevisible=!0),e({type:"inspectionAnalysis/getAllSampleAndTestMan",payload:{certCode:t.certCode,nameC:t.nameC,role:t.role}})}},{key:"render",value:function(){var e=this.props,t=e.inspectionAnalysis,n=t.samples,a=t.detail,o=(e.form.getFieldDecorator,e.loading),r=this.state,i=r.visible,u=r.allCompanyName;r.showPrice,u.map(function(e){return S.a.createElement(P,{key:e,value:e},e)});return S.a.createElement(R["a"],{title:"\u68c0\u9a8c\u5b89\u6392"},S.a.createElement(l["a"],{bordered:!1,size:"small"},S.a.createElement("div",{className:z.a.tableList},S.a.createElement("div",{className:z.a.tableListForm},S.a.createElement(J,null)),S.a.createElement(c["a"],{style:{marginTop:5},size:"middle",loading:o,dataSource:n.list,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns,rowKey:"reportno"}))),S.a.createElement(s["a"],{title:"\u7ed3\u679c\u8be6\u60c5",visible:i,footer:null,width:800,onCancel:this.handleCancel},S.a.createElement(c["a"],{size:"middle",loading:o,dataSource:a,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns1,rowKey:"keyno"})))}}]),n}(b["PureComponent"]),r=i))||r)||r);t["default"]=F}}]);