(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"89wU":function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,l,o,i=a("bx4M"),c=(a("g9YV"),a("wCAj")),s=a("jehZ"),d=a.n(s),m=(a("14J3"),a("BMrR")),u=(a("+L6B"),a("2/Rp")),p=(a("5NDa"),a("5rEg")),h=(a("jCWc"),a("kPKH")),f=(a("miYZ"),a("tsqr")),v=a("p0pE"),E=a.n(v),g=a("2Taf"),y=a.n(g),b=a("vZ4D"),I=a.n(b),D=a("l4Ni"),w=a.n(D),C=a("ujKo"),M=a.n(C),S=a("MhPg"),Y=a.n(S),V=(a("2qtc"),a("kLXV")),k=(a("iQDF"),a("+eQT")),F=(a("OaEy"),a("2fM7")),R=(a("y8nQ"),a("Vl3Y")),x=a("q1tI"),A=a.n(x),N=a("MuoO"),O=a("zHco"),J=a("wd/R"),j=a.n(J),z=a("glGN"),L=a.n(z);function P(e){return function(){var t,a=M()(e);if(Q()){var n=M()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return w()(this,t)}}function Q(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var q=R["a"].Item,B=F["a"].Option,K=R["a"].create()(function(e){var t=e.modalVisible,a=e.form,n=e.handleAdd,r=e.handleModalVisible,l=e.modalInfo,o=function(){a.validateFields(function(e,t){e||(a.resetFields(),n(t,l))})};return A.a.createElement(V["a"],{destroyOnClose:!0,title:"\u7f16\u8f91\u5f52\u6863",visible:t,onOk:o,onCancel:function(){return r()}},A.a.createElement(R["a"].Item,{labelCol:{span:5},wrapperCol:{span:15},label:"\u9000\u6863\u65f6\u95f4"},a.getFieldDecorator("archivesdate",{initialValue:j()(new Date,"YYYY-MM-DD")})(A.a.createElement(k["a"],{style:{width:"100%"},format:"YYYY-MM-DD",placeholder:"\u9000\u6863\u65f6\u95f4"}))))}),T=(n=Object(N["connect"])(function(e){var t=e.archives,a=e.loading;return{archives:t,loading:a.models.archives}}),r=R["a"].create(),n(l=r((o=function(e){Y()(a,e);var t=P(a);function a(){var e;y()(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return e=t.call.apply(t,[this].concat(r)),e.state={modalVisible:!1,modalInfo:{}},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return A.a.createElement("span",null,j()(e).format("YYYY-MM-DD"))}},{title:"\u59d4\u6258\u4eba",dataIndex:"applicant"},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u5f52\u6863\u4f4d\u7f6e",dataIndex:"archiveplace"},{title:"\u5f52\u6863/\u9000\u6863\u65e5\u671f",dataIndex:"archivesdate",render:function(t){return e.isValidDate(t)}},{title:"\u64cd\u4f5c",render:function(t,a){return A.a.createElement(x["Fragment"],null,A.a.createElement("a",{onClick:function(){return e.modifyItem(t,a)}},"\u9000\u6863"),"\xa0\xa0",A.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.handleFormReset=function(){var t=JSON.parse(localStorage.getItem("userinfo")),a={certCode:t.certCode},n=e.props.form;n.resetFields();var r=e.props.dispatch;r({type:"archives/getAllReports",payload:a})},e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,r=a.form;r.validateFields(function(e,t){if(!e){var a=JSON.parse(localStorage.getItem("userinfo")),r=E()({},t,{kind:t.kind,value:t.value,certCode:a.certCode});n({type:"archives/getAllReports",payload:r})}})},e.isValidDate=function(e){return void 0!==e&&null!==e?A.a.createElement("span",null,j()(e).format("YYYY-MM-DD")):[]},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),localStorage.setItem("reportDetailNo",e.reportno),window.open("/Entrustment/DetailForEntrustment")},e.modifyItem=function(t){void 0!==t.archiveplace&&null!==t.archiveplace&&""!==t.archiveplace?(e.setState({modalInfo:t}),e.handleModalVisible(!0)):f["a"].success("\u672a\u5f52\u6863\uff0c\u65e0\u9700\u9000\u6863")},e.handleModalVisible=function(t){e.setState({modalVisible:!!t})},e.handleAdd=function(t,a){var n=e.props.dispatch,r=a;r.archiveplace="",r.archivesdate=t.archivesdate;var l=E()({},r);n({type:"archives/updateArchivesFetch",payload:l,callback:function(e){e&&f["a"].success("\u4fdd\u5b58\u6210\u529f")}}),e.setState({modalVisible:!1})},e}return I()(a,[{key:"componentDidMount",value:function(){var e=JSON.parse(localStorage.getItem("userinfo")),t=this.props.dispatch,a={certCode:e.certCode};t({type:"archives/getAllReports",payload:a})}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return A.a.createElement(R["a"],{onSubmit:this.handleSearch,layout:"inline"},A.a.createElement(m["a"],{gutter:{md:8,lg:24,xl:48}},A.a.createElement(h["a"],{md:4,sm:20},A.a.createElement(R["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(A.a.createElement(F["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},A.a.createElement(B,{value:"reportno"},"\u59d4\u6258\u7f16\u53f7"),A.a.createElement(B,{value:"applicant"},"\u59d4\u6258\u4eba"),A.a.createElement(B,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),A.a.createElement(B,{value:"cargoname"},"\u68c0\u67e5\u54c1\u540d"),A.a.createElement(B,{value:"archiveplace"},"\u5f52\u6863\u4f4d\u7f6e"))))),A.a.createElement(h["a"],{md:6,sm:20},A.a.createElement(q,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(A.a.createElement(p["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),A.a.createElement(h["a"],{md:8,sm:20},A.a.createElement("span",{className:L.a.submitButtons},A.a.createElement(u["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),A.a.createElement(u["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this.props,t=e.archives.report,a=e.loading,n=e.dispatch,r=this.state,l=r.modalVisible,o=r.modalInfo,s={handleAdd:this.handleAdd,handleModalVisible:this.handleModalVisible};return A.a.createElement(O["a"],null,A.a.createElement(i["a"],{bordered:!1,size:"small"},A.a.createElement("div",{className:L.a.tableList},A.a.createElement(K,d()({},s,{modalVisible:l,modalInfo:o,dispatch:n})),A.a.createElement("div",{className:L.a.tableListForm},this.renderSimpleForm()),A.a.createElement(c["a"],{size:"middle",loading:a,dataSource:t.list,columns:this.columns,rowKey:"reportno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(x["PureComponent"]),l=o))||l)||l);t["default"]=T}}]);