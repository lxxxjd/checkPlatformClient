(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{FENU:function(e,a,t){"use strict";t.r(a);t("IzEo");var n,r,o,l,i=t("bx4M"),c=t("jehZ"),d=t.n(c),s=(t("14J3"),t("BMrR")),p=(t("jCWc"),t("kPKH")),u=t("p0pE"),m=t.n(u),f=(t("/xke"),t("TeRw")),b=(t("miYZ"),t("tsqr")),h=t("2Taf"),y=t.n(h),A=t("vZ4D"),v=t.n(A),E=t("l4Ni"),g=t.n(E),R=t("ujKo"),V=t.n(R),C=t("MhPg"),w=t.n(C),k=(t("g9YV"),t("wCAj")),D=(t("2qtc"),t("kLXV")),I=(t("+L6B"),t("2/Rp")),x=(t("y8nQ"),t("Vl3Y")),F=(t("5NDa"),t("5rEg")),S=(t("OaEy"),t("2fM7")),M=t("q1tI"),Y=t.n(M),N=t("MuoO"),O=t("3a4m"),z=t.n(O),J=t("zHco"),T=t("glGN"),j=t.n(T),L=t("wd/R"),K=t.n(L);function P(e){return function(){var a,t=V()(e);if(q()){var n=V()(this).constructor;a=Reflect.construct(t,arguments,n)}else a=t.apply(this,arguments);return g()(this,a)}}function q(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var B=S["a"].Option,Q=F["a"].TextArea,Z=x["a"].create()(function(e){var a=e.form,t=e.modalApplyAbandonVisible,n=e.handleApplyAbandonVisible,r=e.handleFormApplyAbandon,o=function(){a.validateFields(function(e,t){e||(r(t),a.resetFields(),n())})};return Y.a.createElement(D["a"],{destroyOnClose:!0,title:"\u7533\u8bf7\u4f5c\u5e9f",visible:t,style:{top:100},width:800,onCancel:function(){return n()},footer:[Y.a.createElement(I["a"],{type:"primary",onClick:function(){return n()}},"\u5173\u95ed"),Y.a.createElement(I["a"],{type:"primary",onClick:function(){return o()}},"\u7533\u8bf7\u4f5c\u5e9f")]},Y.a.createElement(x["a"],null,Y.a.createElement(x["a"].Item,{label:"\u7533\u8bf7\u7406\u7531"},a.getFieldDecorator("dealreason",{})(Y.a.createElement(Q,{rows:5,placeholder:"\u8bf7\u8f93\u5165\u7533\u8bf7\u4f5c\u5e9f\u7406\u7531"})))))}),H=x["a"].create()(function(e){var a=e.form,t=e.modalAbandonVisible,n=e.handleAbandonVisible,r=e.handleAbandon,o=e.applyreason,l=function(){a.validateFields(function(e,t){e||(r(t),a.resetFields(),n())})};return Y.a.createElement(D["a"],{destroyOnClose:!0,title:"\u4f5c\u5e9f",visible:t,style:{top:100},width:800,onCancel:function(){return n()},footer:[Y.a.createElement(I["a"],{type:"primary",onClick:function(){return n()}},"\u5173\u95ed"),Y.a.createElement(I["a"],{type:"primary",onClick:function(){return l()}},"\u4f5c\u5e9f")]},Y.a.createElement(x["a"],null,Y.a.createElement(x["a"].Item,{label:"\u4f5c\u5e9f\u7406\u7531"},a.getFieldDecorator("abandonreason",{initialValue:void 0!==o&&null!==o?o:null})(Y.a.createElement(Q,{rows:5,placeholder:"\u8bf7\u8f93\u5165\u4f5c\u5e9f\u7406\u7531"})))))}),G=function(e){var a=e.modalReadRecordVisible,t=e.handleModalReadRecordVisible,n=e.ReadRecordData,r=e.loading,o=function(e){return void 0!==e&&null!==e?Y.a.createElement("span",null,K()(e).format("YYYY-MM-DD")):null},l=[{title:"\u59d3\u540d",dataIndex:"realname"},{title:"\u7535\u8bdd",dataIndex:"tel"},{title:"\u516c\u53f8\u7ec4\u7ec7",dataIndex:"organization"},{title:"\u5ba1\u9605\u65e5\u671f",dataIndex:"readdate",render:function(e){return o(e)}},{title:"\u72b6\u6001",dataIndex:"state"}];return Y.a.createElement(D["a"],{destroyOnClose:!0,title:"\u67e5\u770b\u5df2\u9605\u8bfb\u4eba",visible:a,style:{top:100},width:800,onCancel:function(){return t()},footer:[Y.a.createElement(I["a"],{type:"primary",onClick:function(){return t()}},"\u5173\u95ed")]},Y.a.createElement(k["a"],{size:"middle",loading:r,dataSource:n,columns:l,rowKey:"keyno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))},U=(n=x["a"].create(),r=Object(N["connect"])(function(e){var a=e.certificate,t=e.loading;return{certificate:a,loading:t.models.certificate}}),n(o=r((l=function(e){w()(t,e);var a=P(t);function t(){var e;y()(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=a.call.apply(a,[this].concat(r)),e.state={modalReadRecordVisible:!1,modalApplyAbandonVisible:!1,modalAbandonVisible:!1,AbandonText:{},ReadRecordData:[],applyreason:""},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return Y.a.createElement("span",null,K()(e).format("YYYY-MM-DD"))}},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u72b6\u6001\u65e5\u671f",dataIndex:"overalltime",render:function(a){return e.isValidDate(a)}},{title:"\u72b6\u6001",dataIndex:"overallstate"},{title:"\u8bc1\u4e66\u8bc1\u7a3f",dataIndex:"certnames",render:function(e,a){if(null!==e){var t=[];t=e.split("|");for(var n=null,r=Y.a.createElement("br",null),o=/\.{1}[a-z]{1,}$/,l=0;l<t.length;l++)n=0===l?null!==o.exec(t[l])?t[l].slice(0,o.exec(t[l]).index):t[l]:null!==o.exec(t[l])?Y.a.createElement("span",null,n,r,t[l].slice(0,o.exec(t[l]).index)):Y.a.createElement("span",null,n,r,t[l]);return Y.a.createElement("div",null,n)}}},{title:"\u64cd\u4f5c",render:function(a,t){return Y.a.createElement(M["Fragment"],null,"\u5df2\u53d1\u5e03"===a.overallstate?[Y.a.createElement("a",{onClick:function(){return e.applyAbandon(a,t)}},"\u7533\u8bf7\u4f5c\u5e9f\xa0\xa0")]:[],"\u7533\u8bf7\u4f5c\u5e9f"===a.overallstate||"\u5df2\u53d1\u5e03"===a.overallstate?[Y.a.createElement("a",{onClick:function(){return e.AbandonView(a,t)}},"\u4f5c\u5e9f\xa0\xa0")]:[],Y.a.createElement("a",{onClick:function(){return e.viewReadRecord(a,t)}},"\u5df2\u9605\u4eba")," \xa0\xa0",Y.a.createElement("a",{onClick:function(){return e.modifyItem(a,t)}},"\u67e5\u770b")," \xa0\xa0",Y.a.createElement("a",{onClick:function(){return e.previewItem(a,t)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.init=function(){var a=e.props.dispatch,t=JSON.parse(localStorage.getItem("userinfo"));a({type:"certificate/getCertReports",payload:{certCode:t.certCode,nameC:t.nameC,role:t.role}})},e.isValidDate=function(e){return void 0!==e&&null!==e?Y.a.createElement("span",null,K()(e).format("YYYY-MM-DD")):[]},e.applyAbandon=function(a){var t=e.props.dispatch,n=new FormData;n.append("reportno",a.reportno),t({type:"certificate/getAllReadRecords",payload:n,callback:function(t){if(t){for(var n=0,r=0;void 0!==t.length&&r<t.length;r++)if("\u5df2\u9605"===t[r].state){n=1;break}1===n?(e.handleApplyAbandonVisible(!0),e.state.AbandonText=a):D["a"].success({content:"\u4e0d\u5b58\u5728\u5df2\u9605\u4eba\u8bb0\u5f55\uff0c\u76f4\u63a5\u4f5c\u5e9f\u5373\u53ef\uff01"})}else D["a"].error({content:"\u8bf7\u6c42\u670d\u52a1\u5668\u9519\u8bef\uff0c\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458\uff01"})}})},e.AbandonView=function(a){var t=e.props.dispatch,n=new FormData;n.append("reportno",a.reportno),t({type:"certificate/getAllReadRecords",payload:n,callback:function(t){if(t){for(var n=0,r=0;void 0!==t.length&&r<t.length;r++)if("\u5df2\u9605"===t[r].state){n=1;break}1===n?D["a"].success({content:"\u8bf7\u5148\u67e5\u770b\u5df2\u9605\u4eba\uff0c\u7136\u540e\u7533\u8bf7\u4f5c\u5e9f\uff0c\u5e76\u8054\u7cfb\u5df2\u9605\u4eba\u9000\u56de\uff01"}):e.Abandon(a)}else e.Abandon(a)}})},e.Abandon=function(a){var t=e.props.dispatch,n=new FormData;n.append("reportno",a.reportno),t({type:"certificate/getAbandonApplyReason",payload:n,callback:function(t){e.state.applyreason=t?t.applyreason:void 0,e.handleAbandonVisible(!0),e.state.AbandonText=a}})},e.handleFormApplyAbandon=function(a){var t=e.props.dispatch,n=e.state.AbandonText,r=JSON.parse(localStorage.getItem("userinfo")),o=new FormData;o.append("reportno",n.reportno),o.append("applyname",r.userName),o.append("reason",a.dealreason),t({type:"certificate/applyAbandon",payload:o,callback:function(a){"success"===a?(b["a"].success("\u7533\u8bf7\u4f5c\u5e9f\u6210\u529f"),e.init()):b["a"].error("\u7533\u8bf7\u4f5c\u5e9f\u5931\u8d25")}})},e.handleAbandon=function(a){b["a"].success("\u6b63\u5728\u4f5c\u5e9f\u6240\u6709\u8bc1\u4e66\uff0c\u8bf7\u7a0d\u7b49\u51e0\u79d2...");var t=e.props.dispatch,n=e.state.AbandonText,r=JSON.parse(localStorage.getItem("userinfo")),o=new FormData;o.append("reportno",n.reportno),o.append("abandoner",r.userName),o.append("abandonreason",a.abandonreason),t({type:"certificate/abandonCert",payload:o,callback:function(a){"success"===a?(b["a"].success("\u4f5c\u5e9f\u6210\u529f"),e.init()):b["a"].error("\u4f5c\u5e9f\u5931\u8d25")}})},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),window.open("/Entrustment/DetailForEntrustment")},e.viewReadRecord=function(a){var t=e.props.dispatch,n=new FormData;n.append("reportno",a.reportno),t({type:"certificate/getAllReadRecords",payload:n,callback:function(a){a?e.state.ReadRecordData=a:f["a"].open({message:"\u8bf7\u6c42\u6570\u636e\u5931\u8d25",description:"\u8bf7\u6c42\u6570\u636e\u5931\u8d25"})}}),e.handleModalReadRecordVisible(!0)},e.modifyItem=function(e){sessionStorage.setItem("reportno",e.reportno),sessionStorage.setItem("shipname",e.shipname),sessionStorage.setItem("applicant",e.applicant),z.a.push({pathname:"/Certificate/CertificateAbandonDetail"})},e.handleSearch=function(a){a.preventDefault();var t=e.props,n=t.dispatch,r=t.form;r.validateFields(function(e,a){if(console.log(e),!e){var t=JSON.parse(localStorage.getItem("userinfo")),r=m()({},a,{certCode:t.certCode,nameC:t.nameC,role:t.role});n({type:"certificate/getCertReports",payload:r})}})},e.handleFormReset=function(){e.componentDidMount()},e.handleModalReadRecordVisible=function(a){e.setState({modalReadRecordVisible:!!a})},e.handleApplyAbandonVisible=function(a){e.setState({modalApplyAbandonVisible:!!a})},e.handleAbandonVisible=function(a){e.setState({modalAbandonVisible:!!a})},e}return v()(t,[{key:"componentDidMount",value:function(){this.init()}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return Y.a.createElement(x["a"],{onSubmit:this.handleSearch,layout:"inline"},Y.a.createElement(s["a"],{gutter:{md:8,lg:24,xl:48}},Y.a.createElement(p["a"],{md:4,sm:20},Y.a.createElement(x["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(Y.a.createElement(S["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},Y.a.createElement(B,{value:"reportno"},"\u59d4\u6258\u7f16\u53f7"),Y.a.createElement(B,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),Y.a.createElement(B,{value:"cargoname"},"\u68c0\u67e5\u54c1\u540d"))))),Y.a.createElement(p["a"],{span:6},Y.a.createElement(x["a"].Item,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(Y.a.createElement(F["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),Y.a.createElement(p["a"],{span:5},Y.a.createElement("span",{className:j.a.submitButtons},Y.a.createElement(I["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),Y.a.createElement(I["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this.props,a=e.certificate.data,t=e.loading,n=this.state,r=n.modalReadRecordVisible,o=n.ReadRecordData,l=n.modalApplyAbandonVisible,c=n.modalAbandonVisible,s=n.applyreason,p={handleModalReadRecordVisible:this.handleModalReadRecordVisible,handleApplyAbandonVisible:this.handleApplyAbandonVisible,handleAbandonVisible:this.handleAbandonVisible,handleFormApplyAbandon:this.handleFormApplyAbandon,handleAbandon:this.handleAbandon};return Y.a.createElement(J["a"],null,Y.a.createElement(i["a"],{bordered:!1,size:"small"},Y.a.createElement("div",{className:j.a.tableList},Y.a.createElement("div",{className:j.a.tableListForm},this.renderSimpleForm()),Y.a.createElement(G,d()({},p,{modalReadRecordVisible:r,ReadRecordData:o,loading:t})),Y.a.createElement(Z,d()({},p,{modalApplyAbandonVisible:l})),Y.a.createElement(H,d()({},p,{modalAbandonVisible:c,applyreason:s})),Y.a.createElement(k["a"],{size:"middle",loading:t,dataSource:a,columns:this.columns,rowKey:"reportno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),t}(M["PureComponent"]),o=l))||o)||o);a["default"]=U}}]);