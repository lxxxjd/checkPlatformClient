(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[76],{"/Pu1":function(e,t,a){"use strict";a.r(t);a("2qtc");var n,o,r,i,s=a("kLXV"),c=(a("5NDa"),a("5rEg")),l=(a("IzEo"),a("bx4M")),d=(a("g9YV"),a("wCAj")),u=(a("+L6B"),a("2/Rp")),m=a("p0pE"),p=a.n(m),g=(a("/xke"),a("TeRw")),f=a("2Taf"),y=a.n(f),h=a("vZ4D"),v=a.n(h),k=a("l4Ni"),S=a.n(k),b=a("ujKo"),I=a.n(b),E=a("MhPg"),w=a.n(E),C=(a("OaEy"),a("2fM7")),D=(a("y8nQ"),a("Vl3Y")),O=a("q1tI"),M=a.n(O),R=a("MuoO"),x=a("zHco"),N=(a("wd/R"),a("glGN")),T=a.n(N);a("3kts");function z(e){return function(){var t,a=I()(e);if(F()){var n=I()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return S()(this,t)}}function F(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}D["a"].Item,C["a"].Option;var J=(n=Object(R["connect"])(function(e){var t=e.dict,a=e.loading;return{dict:t,loading:a.models.dict}}),o=D["a"].create(),n(r=o((i=function(e){w()(a,e);var t=z(a);function a(){var e;y()(this,a);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return e=t.call.apply(t,[this].concat(o)),e.state={visible:!1,modalInfo:{},keyno:null},e.columns=[{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargonameC"},{title:"\u6307\u6807\u540d\u79f0",dataIndex:"item"},{title:"\u6807\u51c6",dataIndex:"standard"},{title:"\u5355\u4f4d",dataIndex:"unit"},{title:"\u64cd\u4f5c",render:function(e,t){return M.a.createElement(O["Fragment"],null)}}],e.deleteItem=function(t){var a=e.props.dispatch;a({type:"dict/deleteTestStandard",payload:{keyno:t.keyno},callback:function(t){200===t.code?(g["a"].open({message:"\u5220\u9664\u6210\u529f"}),e.componentDidMount()):g["a"].open({message:"\u5220\u9664\u5931\u8d25",description:t.message})}})},e.modifyItem=function(t){var a=e.props.form;e.setState({visible:!0}),e.setState({keyno:t.keyno}),a.setFieldsValue({standard:t.standard,unit:t.unit})},e.handleOk=function(){var t=e.props,a=t.form.validateFieldsAndScroll,n=t.dispatch,o=e.state.keyno;a(function(t,a){var r=JSON.parse(localStorage.getItem("userinfo")),i=sessionStorage.getItem("cargoname"),s=sessionStorage.getItem("item");t||n(null!==o?{type:"dict/updateTestStandard",payload:p()({},a,{keyno:o,item:s,cargoname:i,certcode:r.certCode}),callback:function(t){200===t.code?(g["a"].open({message:"\u4fee\u6539\u6210\u529f"}),e.componentDidMount(),e.setState({visible:!1})):g["a"].open({message:"\u4fee\u6539\u5931\u8d25",description:t.message})}}:{type:"dict/addTestStandard",payload:p()({},a,{cargoname:i,item:s,certcode:r.certCode}),callback:function(t){200===t.code?(g["a"].open({message:"\u6dfb\u52a0\u6210\u529f"}),e.componentDidMount(),e.setState({visible:!1})):g["a"].open({message:"\u6dfb\u52a0\u5931\u8d25",description:t.message})}})})},e.showAdd=function(){e.setState({keyno:null}),e.setState({visible:!0})},e.handleCancel=function(){e.setState({visible:!1})},e.back=function(){e.props.history.goBack()},e}return v()(a,[{key:"componentDidMount",value:function(){JSON.parse(localStorage.getItem("userinfo"));var e=sessionStorage.getItem("cargoname"),t=sessionStorage.getItem("item"),a=this.props.dispatch,n={cargoname:e,item:t};a({type:"dict/getTestStandard",payload:n})}},{key:"render",value:function(){var e=this.props,t=e.dict.standards,a=e.loading,n=(e.dispatch,e.form.getFieldDecorator),o=this.state.visible;return M.a.createElement(x["a"],null,M.a.createElement(l["a"],{bordered:!1,size:"small"},M.a.createElement("div",{className:T.a.tableList},M.a.createElement("div",{className:T.a.tableListForm},M.a.createElement(u["a"],{type:"primary",style:{marginBottom:8},onClick:this.back},"\u8fd4\u56de")),M.a.createElement(d["a"],{size:"middle",loading:a,dataSource:t,columns:this.columns,rowKey:"standard",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))),M.a.createElement(s["a"],{title:"\u4fee\u6539\u8d27\u7269\u4fe1\u606f",visible:o,onOk:this.handleOk,onCancel:this.handleCancel},M.a.createElement(D["a"],null,M.a.createElement(D["a"].Item,{label:"\u6807\u51c6\u540d\u79f0"},n("standard",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6807\u51c6\u540d"}]})(M.a.createElement(c["a"],null))),M.a.createElement(D["a"].Item,{label:"\u5355\u4f4d"},n("unit",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5355\u4f4d"}]})(M.a.createElement(c["a"],null))))))}}]),a}(O["PureComponent"]),r=i))||r)||r);t["default"]=J}}]);