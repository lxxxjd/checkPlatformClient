(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{jDsA:function(e,a,t){"use strict";t.r(a);t("IzEo");var n,r,l,o,i=t("bx4M"),c=(t("g9YV"),t("wCAj")),s=t("jehZ"),d=t.n(s),m=(t("14J3"),t("BMrR")),p=(t("+L6B"),t("2/Rp")),u=(t("jCWc"),t("kPKH")),h=(t("miYZ"),t("tsqr")),f=t("p0pE"),v=t.n(f),E=t("2Taf"),g=t.n(E),y=t("vZ4D"),b=t.n(y),I=t("l4Ni"),D=t.n(I),C=t("ujKo"),M=t.n(C),S=t("MhPg"),Y=t.n(S),w=(t("2qtc"),t("kLXV")),V=(t("iQDF"),t("+eQT")),k=(t("5NDa"),t("5rEg")),F=(t("OaEy"),t("2fM7")),R=(t("y8nQ"),t("Vl3Y")),A=t("q1tI"),x=t.n(A),N=t("MuoO"),O=t("3a4m"),J=t.n(O),j=t("zHco"),z=t("wd/R"),L=t.n(z),P=t("glGN"),Q=t.n(P);function q(e){return function(){var a,t=M()(e);if(B()){var n=M()(this).constructor;a=Reflect.construct(t,arguments,n)}else a=t.apply(this,arguments);return D()(this,a)}}function B(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var K=R["a"].Item,T=F["a"].Option,Z=R["a"].create()(function(e){var a=e.modalVisible,t=e.form,n=e.handleAdd,r=e.handleModalVisible,l=e.modalInfo,o=function(){t.validateFields(function(e,a){e||(t.resetFields(),n(a,l))})};return x.a.createElement(w["a"],{destroyOnClose:!0,title:"\u7f16\u8f91\u5f52\u6863",visible:a,onOk:o,onCancel:function(){return r()}},x.a.createElement(K,{labelCol:{span:5},wrapperCol:{span:15},label:"\u5f52\u6863\u4f4d\u7f6e"},t.getFieldDecorator("archiveplace",{initialValue:l.archiveplace})(x.a.createElement(k["a"],{placeholder:"\u8bf7\u8f93\u5165\u5f52\u6863\u4f4d\u7f6e"}))),x.a.createElement(R["a"].Item,{labelCol:{span:5},wrapperCol:{span:15},label:"\u5f52\u6863\u65f6\u95f4"},t.getFieldDecorator("archivesdate",{initialValue:L()(l.archivesdate,"YYYY-MM-DD")})(x.a.createElement(V["a"],{style:{width:"100%"},format:"YYYY-MM-DD",placeholder:"\u8bf7\u9009\u62e9\u5f52\u6863\u65f6\u95f4"}))))}),H=(n=Object(N["connect"])(function(e){var a=e.archives,t=e.loading;return{archives:a,loading:t.models.archives}}),r=R["a"].create(),n(l=r((o=function(e){Y()(t,e);var a=q(t);function t(){var e;g()(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return e=a.call.apply(a,[this].concat(r)),e.state={modalVisible:!1,modalInfo:{}},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return x.a.createElement("span",null,L()(e).format("YYYY-MM-DD"))}},{title:"\u59d4\u6258\u4eba",dataIndex:"applicant"},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u5f52\u6863\u4f4d\u7f6e",dataIndex:"archiveplace"},{title:"\u5f52\u6863\u65e5\u671f",dataIndex:"archivesdate",render:function(a){return e.isValidDate(a)}},{title:"\u64cd\u4f5c",render:function(a,t){return x.a.createElement(A["Fragment"],null,x.a.createElement("a",{onClick:function(){return e.modifyItem(a,t)}},"\u4fee\u6539"),"\xa0\xa0",x.a.createElement("a",{onClick:function(){return e.previewItem(a,t)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.handleFormReset=function(){var a=JSON.parse(localStorage.getItem("userinfo")),t={certCode:a.certCode},n=e.props.form;n.resetFields();var r=e.props.dispatch;r({type:"archives/getAllReports",payload:t})},e.handleSearch=function(a){a.preventDefault();var t=e.props,n=t.dispatch,r=t.form;r.validateFields(function(e,a){if(!e){var t=JSON.parse(localStorage.getItem("userinfo")),r=v()({},a,{kind:a.kind,value:a.value,certCode:t.certCode});n({type:"archives/getAllReports",payload:r})}})},e.isValidDate=function(e){return void 0!==e&&null!==e?x.a.createElement("span",null,L()(e).format("YYYY-MM-DD")):[]},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),localStorage.setItem("reportDetailNo",e.reportno),J.a.push({pathname:"/Entrustment/DetailForEntrustment"})},e.modifyItem=function(a){e.setState({modalInfo:a}),e.handleModalVisible(!0)},e.handleModalVisible=function(a){e.setState({modalVisible:!!a})},e.handleAdd=function(a,t){var n=e.props.dispatch,r=t;r.archiveplace=a.archiveplace,r.archivesdate=a.archivesdate;var l=v()({},r);n({type:"archives/updateArchivesFetch",payload:l,callback:function(e){e&&h["a"].success("\u4fdd\u5b58\u6210\u529f")}}),e.setState({modalVisible:!1})},e}return b()(t,[{key:"componentDidMount",value:function(){var e=JSON.parse(localStorage.getItem("userinfo")),a=this.props.dispatch,t={certCode:e.certCode};a({type:"archives/getAllReports",payload:t})}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return x.a.createElement(R["a"],{onSubmit:this.handleSearch,layout:"inline"},x.a.createElement(m["a"],{gutter:{md:8,lg:24,xl:48}},x.a.createElement(u["a"],{md:4,sm:20},x.a.createElement(R["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(x.a.createElement(F["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},x.a.createElement(T,{value:"reportno"},"\u59d4\u6258\u7f16\u53f7"),x.a.createElement(T,{value:"applicant"},"\u59d4\u6258\u4eba"),x.a.createElement(T,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),x.a.createElement(T,{value:"cargoname"},"\u68c0\u67e5\u54c1\u540d"),x.a.createElement(T,{value:"archiveplace"},"\u5f52\u6863\u4f4d\u7f6e"))))),x.a.createElement(u["a"],{md:6,sm:20},x.a.createElement(K,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(x.a.createElement(k["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),x.a.createElement(u["a"],{md:8,sm:20},x.a.createElement("span",{className:Q.a.submitButtons},x.a.createElement(p["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),x.a.createElement(p["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this.props,a=e.archives.report,t=e.loading,n=e.dispatch,r=this.state,l=r.modalVisible,o=r.modalInfo,s={handleAdd:this.handleAdd,handleModalVisible:this.handleModalVisible};return x.a.createElement(j["a"],null,x.a.createElement(i["a"],{bordered:!1,size:"small"},x.a.createElement("div",{className:Q.a.tableList},x.a.createElement(Z,d()({},s,{modalVisible:l,modalInfo:o,dispatch:n})),x.a.createElement("div",{className:Q.a.tableListForm},this.renderSimpleForm()),x.a.createElement(c["a"],{size:"middle",loading:t,dataSource:a.list,columns:this.columns,rowKey:"reportno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),t}(A["PureComponent"]),l=o))||l)||l);a["default"]=H}}]);