(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[58],{qBqK:function(e,a,t){"use strict";t.r(a);t("IzEo");var n,l,r,i,o=t("bx4M"),c=(t("g9YV"),t("wCAj")),d=t("jehZ"),s=t.n(d),m=(t("14J3"),t("BMrR")),u=(t("+L6B"),t("2/Rp")),p=(t("jCWc"),t("kPKH")),f=(t("miYZ"),t("tsqr")),h=t("p0pE"),b=t.n(h),y=t("2Taf"),E=t.n(y),v=t("vZ4D"),g=t.n(v),V=t("l4Ni"),S=t.n(V),C=t("ujKo"),M=t.n(C),k=t("MhPg"),I=t.n(k),D=(t("2qtc"),t("kLXV")),w=(t("5NDa"),t("5rEg")),F=(t("OaEy"),t("2fM7")),O=(t("y8nQ"),t("Vl3Y")),N=t("q1tI"),R=t.n(N),J=t("MuoO"),L=(t("Y2fQ"),t("zHco")),Y=t("wd/R"),q=t.n(Y),H=t("glGN"),A=t.n(H);function j(e){return function(){var a,t=M()(e);if(z()){var n=M()(this).constructor;a=Reflect.construct(t,arguments,n)}else a=t.apply(this,arguments);return S()(this,a)}}function z(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var x=O["a"].Item,B=F["a"].Option,K=O["a"].create()(function(e){var a=e.modalVisible,t=e.form,n=e.handleEdit,l=e.handleModalVisible,r=e.modalInfo,i=function(){t.validateFields(function(e,a){e||(t.resetFields(),n(a,r))})};return R.a.createElement(D["a"],{destroyOnClose:!0,title:"\u90e8\u95e8\u4fee\u6539",style:{top:100},visible:a,onOk:i,onCancel:function(){return l()}},R.a.createElement(x,{labelCol:{span:5},wrapperCol:{span:15},label:"\u90e8\u95e8\u540d\u79f0"},t.getFieldDecorator("branchname",{initialValue:r.branchname,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u90e8\u95e8\u540d\u79f0"}]})(R.a.createElement(w["a"],{placeholder:"\u8bf7\u8f93\u5165\u90e8\u95e8\u540d\u79f0"}))))}),P=O["a"].create()(function(e){var a=e.addModalVisible,t=e.form,n=e.handleAdd,l=e.addHandleModalVisible,r=function(){t.validateFields(function(e,a){e||(t.resetFields(),n(a))})};return R.a.createElement(D["a"],{destroyOnClose:!0,title:"\u90e8\u95e8\u65b0\u589e",style:{top:100},visible:a,onOk:r,onCancel:function(){return l()}},R.a.createElement(x,{labelCol:{span:5},wrapperCol:{span:15},label:"\u90e8\u95e8\u540d\u79f0"},t.getFieldDecorator("branchname",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u90e8\u95e8\u540d\u79f0"}]})(R.a.createElement(w["a"],{placeholder:"\u8bf7\u8f93\u5165\u90e8\u95e8\u540d\u79f0"}))))}),Q=(n=Object(J["connect"])(function(e){var a=e.company,t=e.loading;return{company:a,loading:t.models.company}}),l=O["a"].create(),n(r=l((i=function(e){I()(t,e);var a=j(t);function t(){var e;E()(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return e=a.call.apply(a,[this].concat(l)),e.state={modalVisible:!1,addModalVisible:!1,modalInfo:{},dataSource:[]},e.columns=[{title:"\u90e8\u95e8\u540d\u79f0",dataIndex:"branchname"},{title:"\u64cd\u4f5c",render:function(a,t){return R.a.createElement(N["Fragment"],null,R.a.createElement("a",{onClick:function(){return e.modifyItem(a,t)}},"\u4fee\u6539"),"\xa0\xa0",R.a.createElement("a",{onClick:function(){return e.deleteItem(a,t)}},"\u5220\u9664"))}}],e.init=function(){var a=JSON.parse(localStorage.getItem("userinfo")),t=e.props.dispatch,n={certCode:a.certCode};t({type:"company/getDepartmentList",payload:n,callback:function(a){a&&(e.state.dataSource=a.data)}})},e.handleFormReset=function(){var a=e.props.form;a.resetFields(),e.init()},e.handleSearch=function(a){a.preventDefault();var t=e.props,n=t.dispatch,l=t.form;l.validateFields(function(a,t){if(!a){var l=JSON.parse(localStorage.getItem("userinfo")),r=b()({},t,{kind:t.kind.trim(),value:t.value.trim(),certCode:l.certCode});n({type:"company/getDepartmentList",payload:r,callback:function(a){a&&(e.state.dataSource=a.data)}})}})},e.isValidDate=function(e){return void 0!==e&&null!==e?R.a.createElement("span",null,q()(e).format("YYYY-MM-DD")):[]},e.modifyItem=function(a){e.setState({modalInfo:a}),e.handleModalVisible(!0)},e.deleteItem=function(a){var t=e.props.dispatch,n=b()({},a);t({type:"company/deleteDepartment",payload:n,callback:function(a){"success"===a?(e.init(),f["a"].success("\u5220\u9664\u6210\u529f")):f["a"].success("\u5220\u9664\u5931\u8d25")}})},e.addItem=function(){e.addHandleModalVisible(!0)},e.handleModalVisible=function(a){e.setState({modalVisible:!!a})},e.addHandleModalVisible=function(a){e.setState({addModalVisible:!!a})},e.handleEdit=function(a,t){var n=e.props.dispatch,l=JSON.parse(localStorage.getItem("userinfo")),r=t;r.branchname=a.branchname;var i=b()({},r,{certcode:l.certCode});n({type:"company/updateDepartment",payload:i,callback:function(a){"success"===a?(f["a"].success("\u4fdd\u5b58\u6210\u529f"),e.init()):f["a"].error("\u4fdd\u5b58\u5931\u8d25")}}),e.setState({modalVisible:!1})},e.handleAdd=function(a){var t=e.props.dispatch,n=JSON.parse(localStorage.getItem("userinfo")),l=b()({},a,{certcode:n.certCode});e.setState({addModalVisible:!1}),e.state.dataSource.find(function(e){return e.branchname===a.branchname})?f["a"].success("\u6dfb\u52a0\u90e8\u95e8\u5df2\u5b58\u5728"):t({type:"company/addDepartment",payload:l,callback:function(a){"success"===a?(f["a"].success("\u4fdd\u5b58\u6210\u529f"),e.init()):f["a"].error("\u4fdd\u5b58\u5931\u8d25")}})},e}return g()(t,[{key:"componentDidMount",value:function(){this.init()}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return R.a.createElement(O["a"],{onSubmit:this.handleSearch,layout:"inline"},R.a.createElement(m["a"],{gutter:{md:8,lg:24,xl:48}},R.a.createElement(p["a"],{md:3,sm:20},R.a.createElement(O["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{initialValue:"branchname",rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(R.a.createElement(F["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},R.a.createElement(B,{value:"branchname"},"\u90e8\u95e8\u540d\u79f0"))))),R.a.createElement(p["a"],{md:6,sm:20},R.a.createElement(x,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(R.a.createElement(w["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),R.a.createElement(p["a"],{md:8,sm:20},R.a.createElement("span",{className:A.a.submitButtons},R.a.createElement(u["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),R.a.createElement(u["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e"),R.a.createElement(u["a"],{type:"primary",style:{marginLeft:8},onClick:this.addItem},"\u65b0\u589e")))))}},{key:"render",value:function(){var e=this.props,a=e.loading,t=e.dispatch,n=this.state,l=n.modalVisible,r=n.modalInfo,i=n.addModalVisible,d=n.dataSource,m={handleEdit:this.handleEdit,handleAdd:this.handleAdd,handleModalVisible:this.handleModalVisible,addHandleModalVisible:this.addHandleModalVisible};return R.a.createElement(L["a"],null,R.a.createElement(o["a"],{bordered:!1,size:"small"},R.a.createElement("div",{className:A.a.tableList},R.a.createElement(K,s()({},m,{modalVisible:l,modalInfo:r,dispatch:t})),R.a.createElement(P,s()({},m,{addModalVisible:i,dispatch:t})),R.a.createElement("div",{className:A.a.tableListForm},this.renderSimpleForm()),R.a.createElement(c["a"],{size:"middle",loading:a,dataSource:d,columns:this.columns,rowKey:"keyno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),t}(N["PureComponent"]),r=i))||r)||r);a["default"]=Q}}]);