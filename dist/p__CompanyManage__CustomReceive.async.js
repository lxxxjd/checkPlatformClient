(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[57],{ugtX:function(e,a,t){"use strict";t.r(a);t("IzEo");var l,n,o,r,i=t("bx4M"),s=(t("g9YV"),t("wCAj")),c=t("jehZ"),d=t.n(c),u=(t("14J3"),t("BMrR")),p=(t("+L6B"),t("2/Rp")),m=(t("jCWc"),t("kPKH")),f=(t("miYZ"),t("tsqr")),h=t("p0pE"),y=t.n(h),g=t("2Taf"),v=t.n(g),b=t("vZ4D"),E=t.n(b),C=t("rlhR"),V=t.n(C),O=t("l4Ni"),S=t.n(O),k=t("ujKo"),M=t.n(k),I=t("MhPg"),w=t.n(I),F=(t("2qtc"),t("kLXV")),D=(t("6UJt"),t("DFOY")),R=(t("5NDa"),t("5rEg")),x=(t("OaEy"),t("2fM7")),N=(t("y8nQ"),t("Vl3Y")),J=t("q1tI"),A=t.n(J),q=t("MuoO"),H=t("Y2fQ"),P=t("zHco"),Y=t("wd/R"),j=t.n(Y),L=t("glGN"),T=t.n(L);function z(e){return function(){var a,t=M()(e);if(B()){var l=M()(this).constructor;a=Reflect.construct(t,arguments,l)}else a=t.apply(this,arguments);return S()(this,a)}}function B(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var K=N["a"].Item,Q=x["a"].Option,Z=R["a"].TextArea,X=N["a"].create()(function(e){var a=e.modalVisible,t=e.form,l=e.handleEdit,n=e.handleModalVisible,o=e.modalInfo,r=e.customsOption,i=e.getValidation,s=function(){t.validateFields(function(e,a){e||(t.resetFields(),l(a,o))})};return A.a.createElement(F["a"],{destroyOnClose:!0,title:"\u63a8\u9001\u6d77\u5173\u4fee\u6539",style:{top:100},visible:a,onOk:s,onCancel:function(){return n()}},A.a.createElement(K,{labelCol:{span:5},wrapperCol:{span:15},label:"\u6d77\u5173\u540d\u79f0"},t.getFieldDecorator("customsname",{initialValue:o.customsname,rules:[{required:!0,validator:i}]})(A.a.createElement(D["a"],{style:{width:"100%"},options:r,placeholder:"\u8bf7\u9009\u62e9\u6d77\u5173\u540d\u79f0"}))),A.a.createElement(K,{labelCol:{span:5},wrapperCol:{span:15},label:"\u63d0\u4ea4\u4eba"},t.getFieldDecorator("applyman",{initialValue:o.applyman,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u63d0\u4ea4\u4eba"}]})(A.a.createElement(R["a"],{placeholder:"\u8bf7\u8f93\u5165\u63d0\u4ea4\u4eba"}))),A.a.createElement(K,{labelCol:{span:5},wrapperCol:{span:15},label:"\u8054\u7cfb\u7535\u8bdd"},t.getFieldDecorator("applytel",{initialValue:o.applytel,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8054\u7cfb\u7535\u8bdd"}]})(A.a.createElement(R["a"],{placeholder:"\u8bf7\u8f93\u5165\u8054\u7cfb\u7535\u8bdd"}))),A.a.createElement(K,{labelCol:{span:5},wrapperCol:{span:15},label:"\u5907\u6ce8\u8bf4\u660e"},t.getFieldDecorator("applyreason",{initialValue:o.applyreason,rules:[{message:"\u8bf7\u8f93\u5165\u5907\u6ce8\u8bf4\u660e"}]})(A.a.createElement(Z,{placeholder:"\u8bf7\u8f93\u5165\u5907\u6ce8\u8bf4\u660e",style:{minHeight:32},rows:5}))))}),G=N["a"].create()(function(e){var a=e.addModalVisible,t=e.form,l=e.handleAdd,n=e.addHandleModalVisible,o=e.customsOption,r=e.getValidation,i=function(){t.validateFields(function(e,a){e||(t.resetFields(),l(a))})},s=JSON.parse(localStorage.getItem("userinfo"));return A.a.createElement(F["a"],{destroyOnClose:!0,title:"\u9009\u62e9\u6570\u636e\u63a8\u9001\u7684\u6d77\u5173",style:{top:100},visible:a,onOk:i,okText:"\u63d0\u4ea4",onCancel:function(){return n()}},A.a.createElement(K,{labelCol:{span:5},wrapperCol:{span:15},label:"\u6d77\u5173\u540d\u79f0"},t.getFieldDecorator("customsname",{rules:[{required:!0,validator:r}]})(A.a.createElement(D["a"],{style:{width:"100%"},options:o,placeholder:"\u8bf7\u9009\u62e9\u6d77\u5173\u540d\u79f0"}))),A.a.createElement(K,{labelCol:{span:5},wrapperCol:{span:15},label:"\u63d0\u4ea4\u4eba"},t.getFieldDecorator("applyman",{initialValue:s.nameC,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u63d0\u4ea4\u4eba"}]})(A.a.createElement(R["a"],{placeholder:"\u8bf7\u8f93\u5165\u63d0\u4ea4\u4eba"}))),A.a.createElement(K,{labelCol:{span:5},wrapperCol:{span:15},label:"\u8054\u7cfb\u7535\u8bdd"},t.getFieldDecorator("applytel",{initialValue:s.tel,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8054\u7cfb\u7535\u8bdd"}]})(A.a.createElement(R["a"],{placeholder:"\u8bf7\u8f93\u5165\u8054\u7cfb\u7535\u8bdd"}))),A.a.createElement(K,{labelCol:{span:5},wrapperCol:{span:15},label:"\u5907\u6ce8\u8bf4\u660e"},t.getFieldDecorator("applyreason",{rules:[{message:"\u8bf7\u8f93\u5165\u5907\u6ce8\u8bf4\u660e"}]})(A.a.createElement(Z,{placeholder:"\u8bf7\u8f93\u5165\u5907\u6ce8\u8bf4\u660e",style:{minHeight:32},rows:5}))))}),U=(l=Object(q["connect"])(function(e){var a=e.company,t=e.loading;return{company:a,loading:t.models.company}}),n=N["a"].create(),l(o=n((r=function(e){w()(t,e);var a=z(t);function t(){var e;v()(this,t);for(var l=arguments.length,n=new Array(l),o=0;o<l;o++)n[o]=arguments[o];return e=a.call.apply(a,[this].concat(n)),e.state={modalVisible:!1,addModalVisible:!1,modalInfo:{},dataSource:[],customsOption:[]},e.columns=[{title:"\u96b6\u5c5e\u5173",dataIndex:"customsname"},{title:"\u63d0\u4ea4\u4eba",dataIndex:"applyman"},{title:"\u63d0\u4ea4\u65f6\u95f4",dataIndex:"applydate",render:function(a){return e.isValidDate(a)}},{title:"\u6709\u6548\u65f6\u95f4",dataIndex:"validdate",render:function(a){return e.isValidDate(a)}},{title:"\u53ef\u63a5\u6536",dataIndex:"status"},{title:"\u64cd\u4f5c",render:function(a,t){return A.a.createElement(J["Fragment"],null,"\u5df2\u5907\u6848"!==a.status?[A.a.createElement("a",{onClick:function(){return e.modifyItem(a,t)}},"\u4fee\u6539\xa0\xa0")]:[A.a.createElement("span",null,"\u4fee\u6539\xa0\xa0")],"\u5df2\u5907\u6848"!==a.status?[A.a.createElement("a",{onClick:function(){return e.deleteItem(a,t)}},"\u64a4\u9500\xa0\xa0")]:[A.a.createElement("span",null,"\u64a4\u9500\xa0\xa0")])}}],e.init=function(){var a=JSON.parse(localStorage.getItem("userinfo")),t=e.props.dispatch,l={certCode:a.certCode};t({type:"company/getPreCustomReceiveList",payload:l,callback:function(a){a&&(e.state.dataSource=a.data)}})},e.handleFormReset=function(){var a=e.props.form;a.resetFields(),e.init()},e.getValidation=function(a,t,l){(void 0===t||null===t||t.length<=1)&&l(Object(H["formatMessage"])({id:"validation.customreceive.noexist"}));var n=e.props.dispatch,o=JSON.parse(localStorage.getItem("userinfo")),r={certcode:o.certCode,customsname:t[1]};n({type:"company/getAllReceive",payload:r,callback:function(e){"1"===e?l(Object(H["formatMessage"])({id:"validation.customreceive.error1"})):n({type:"company/getMonthReceive",payload:r,callback:function(e){"2"===e?l(Object(H["formatMessage"])({id:"validation.customreceive.error2"})):l()}})}})},e.handleSearch=function(a){a.preventDefault();var t=e.props,l=t.dispatch,n=t.form;n.validateFields(function(a,t){if(!a){var n=JSON.parse(localStorage.getItem("userinfo")),o=y()({},t,{kind:t.kind.trim(),value:t.value.trim(),certCode:n.certCode});l({type:"company/getPreCustomReceiveList",payload:o,callback:function(a){a&&(e.state.dataSource=a.data)}})}})},e.isValidDate=function(e){return void 0!==e&&null!==e?A.a.createElement("span",null,j()(e).format("YYYY-MM-DD")):[]},e.modifyItem=function(a){var t=y()({},a);t.customsname=e.getCustomsArr(t.customsname),e.setState({modalInfo:t}),console.log(t),e.handleModalVisible(!0)},e.getCustomsArr=function(a){for(var t=[],l=V()(e),n=l.state,o=0;void 0!==n.customsOption.length&&o<n.customsOption.length;o++){var r=n.customsOption[o];if(void 0!==n.customsOption[o].children&&null!==n.customsOption[o].children&&void 0!==n.customsOption[o].children.length)for(var i=0;i<n.customsOption[o].children.length;i++){var s=n.customsOption[o].children[i];if(s.value===a)return t.push(r.value),t.push(s.value),t}}return t},e.deleteItem=function(a){F["a"].confirm({title:"\u786e\u5b9a\u64a4\u9500\u6b64\u6b21\u5907\u6848\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){var t=e.props.dispatch,l=y()({},a);t({type:"company/deletePreCustomReceive",payload:l,callback:function(a){"success"===a?(e.init(),f["a"].success("\u64a4\u9500\u6210\u529f")):f["a"].success("\u64a4\u9500\u5931\u8d25")}})}})},e.addItem=function(){e.addHandleModalVisible(!0)},e.handleModalVisible=function(a){e.setState({modalVisible:!!a})},e.addHandleModalVisible=function(a){e.setState({addModalVisible:!!a})},e.handleEdit=function(a,t){var l=e.props.dispatch,n=JSON.parse(localStorage.getItem("userinfo")),o=t;o.customsname=a.customsname,o.applyman=a.applyman,o.applytel=a.applytel,o.applyreason=a.applyreason;var r=y()({},o,{certcode:n.certCode});l({type:"company/updatePreCustomReceive",payload:r,callback:function(a){"success"===a?(f["a"].success("\u4fdd\u5b58\u6210\u529f"),e.init()):f["a"].error("\u4fdd\u5b58\u5931\u8d25")}}),e.setState({modalVisible:!1})},e.handleAdd=function(a){var t=e.props.dispatch,l=JSON.parse(localStorage.getItem("userinfo")),n=y()({},a,{certcode:l.certCode});e.setState({addModalVisible:!1}),t({type:"company/addPreCustomReceive",payload:n,callback:function(a){"success"===a?(f["a"].success("\u4fdd\u5b58\u6210\u529f"),e.init()):f["a"].error("\u4fdd\u5b58\u5931\u8d25")}})},e}return E()(t,[{key:"componentDidMount",value:function(){var e=this,a=this.props.dispatch;a({type:"company/getCustomInfos",payload:{},callback:function(a){e.setState({customsOption:a.data})}}),this.init()}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return A.a.createElement(N["a"],{onSubmit:this.handleSearch,layout:"inline"},A.a.createElement(u["a"],{gutter:{md:8,lg:24,xl:48}},A.a.createElement(m["a"],{md:3,sm:20},A.a.createElement(N["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{initialValue:"customsname",rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(A.a.createElement(x["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},A.a.createElement(Q,{value:"customsname"},"\u6d77\u5173\u540d\u79f0"),A.a.createElement(Q,{value:"applyman"},"\u63d0\u4ea4\u4eba"))))),A.a.createElement(m["a"],{md:6,sm:20},A.a.createElement(K,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(A.a.createElement(R["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),A.a.createElement(m["a"],{md:8,sm:20},A.a.createElement("span",{className:T.a.submitButtons},A.a.createElement(p["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),A.a.createElement(p["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e"),A.a.createElement(p["a"],{type:"primary",style:{marginLeft:8},onClick:this.addItem},"\u6570\u636e\u63a8\u9001")))))}},{key:"render",value:function(){var e=this.props,a=e.loading,t=e.dispatch,l=this.state,n=l.modalVisible,o=l.modalInfo,r=l.addModalVisible,c=l.dataSource,u=l.customsOption,p={handleEdit:this.handleEdit,handleAdd:this.handleAdd,handleModalVisible:this.handleModalVisible,addHandleModalVisible:this.addHandleModalVisible,getValidation:this.getValidation};return A.a.createElement(P["a"],null,A.a.createElement(i["a"],{bordered:!1,size:"small"},A.a.createElement("div",{className:T.a.tableList},A.a.createElement(X,d()({},p,{modalVisible:n,modalInfo:o,dispatch:t,customsOption:u})),A.a.createElement(G,d()({},p,{addModalVisible:r,dispatch:t,customsOption:u})),A.a.createElement("div",{className:T.a.tableListForm},this.renderSimpleForm()),A.a.createElement(s["a"],{size:"middle",loading:a,dataSource:c,columns:this.columns,rowKey:"keyno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),t}(J["PureComponent"]),o=r))||o)||o);a["default"]=U}}]);