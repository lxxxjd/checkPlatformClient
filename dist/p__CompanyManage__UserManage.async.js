(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[63],{"1HHP":function(e,a,l){"use strict";l.r(a);l("IzEo");var t,r,n,o,c=l("bx4M"),i=(l("g9YV"),l("wCAj")),s=l("jehZ"),m=l.n(s),u=(l("+L6B"),l("2/Rp")),d=(l("miYZ"),l("tsqr")),p=l("p0pE"),E=l.n(p),b=l("2Taf"),h=l.n(b),v=l("vZ4D"),f=l.n(v),g=l("l4Ni"),C=l.n(g),y=l("ujKo"),w=l.n(y),D=l("MhPg"),k=l.n(D),F=(l("2qtc"),l("kLXV")),M=(l("14J3"),l("BMrR")),V=(l("jCWc"),l("kPKH")),N=(l("giR+"),l("fyUT")),I=(l("iQDF"),l("+eQT")),S=(l("7Kak"),l("9yH6")),Y=(l("5NDa"),l("5rEg")),q=(l("OaEy"),l("2fM7")),O=(l("y8nQ"),l("Vl3Y")),U=l("q1tI"),x=l.n(U),j=l("MuoO"),P=l("3a4m"),z=l.n(P),L=l("Y2fQ"),R=l("zHco"),J=l("wd/R"),H=l.n(J),G=l("glGN"),T=l.n(G);function A(e){return function(){var a,l=w()(e);if(B()){var t=w()(this).constructor;a=Reflect.construct(l,arguments,t)}else a=l.apply(this,arguments);return C()(this,a)}}function B(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var Q=O["a"].Item,W=q["a"].Option,K=O["a"].create()(function(e){var a=e.modalVisible,l=e.form,t=e.handleEdit,r=e.handleModalVisible,n=e.modalInfo,o=e.departmentOptions,c=function(){l.validateFields(function(e,a){e||(l.resetFields(),t(a,n))})};return x.a.createElement(F["a"],{destroyOnClose:!0,title:"\u7528\u6237\u4fee\u6539",style:{top:10},width:1100,visible:a,onOk:c,onCancel:function(){return r()}},x.a.createElement(M["a"],null,x.a.createElement(V["a"],{span:13},x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u7528\u6237\u540d",colon:!1},l.getFieldDecorator("userName",{initialValue:n.userName,rules:[{required:!0,message:"\u7528\u6237\u540d\u91cd\u590d\uff0c\u8bf7\u4fee\u6539"}]})(x.a.createElement(Y["a"],{placeholder:"\u7528\u6237\u540d\u7528\u59d3\u540d\u5168\u62fc\uff0c\u5982\u5f20\u4e09\uff1azhangsan",disabled:!0}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u771f\u5b9e\u59d3\u540d",colon:!1},l.getFieldDecorator("nameC",{initialValue:n.nameC,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u771f\u5b9e\u59d3\u540d"}]})(x.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165\u771f\u5b9e\u59d3\u540d"}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u5730\u5740",colon:!1},l.getFieldDecorator("place",{initialValue:n.place,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5730\u5740"}]})(x.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165\u5730\u5740,\u5982\uff1a\u6c5f\u82cf\u9547\u6c5f"}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u624b\u673a",colon:!1},l.getFieldDecorator("tel",{initialValue:n.tel,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u624b\u673a"}]})(x.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165\u624b\u673a"}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u90e8\u95e8",colon:!1},l.getFieldDecorator("section",{initialValue:n.section,rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6240\u5728\u90e8\u95e8"}]})(x.a.createElement(q["a"],{placeholder:"\u8bf7\u9009\u62e9\u6240\u5728\u90e8\u95e8",style:{width:"100%"}},o))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u89d2\u8272",colon:!1},l.getFieldDecorator("role",{initialValue:n.role,rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u89d2\u8272\u6743\u9650\uff0c\u53ef\u4ee5\u9009\u62e9\u4e00\u9879\u6216\u591a\u9879"}]})(x.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u89d2\u8272\uff0c\u53ef\u4ee5\u9009\u62e9\u4e00\u9879\u6216\u591a\u9879",mode:"tags"},x.a.createElement(W,{value:"\u603b\u7ecf\u7406"},"\u603b\u7ecf\u7406"),x.a.createElement(W,{value:"\u4e1a\u52a1\u526f\u603b"},"\u4e1a\u52a1\u526f\u603b"),x.a.createElement(W,{value:"\u8d22\u52a1\u526f\u603b"},"\u8d22\u52a1\u526f\u603b"),x.a.createElement(W,{value:"\u64cd\u4f5c\u7ecf\u7406"},"\u64cd\u4f5c\u7ecf\u7406"),x.a.createElement(W,{value:"\u5b9e\u9a8c\u5ba4\u4e3b\u4efb"},"\u5b9e\u9a8c\u5ba4\u4e3b\u4efb"),x.a.createElement(W,{value:"\u4e1a\u52a1\u7ecf\u7406"},"\u4e1a\u52a1\u7ecf\u7406"),x.a.createElement(W,{value:"\u8d22\u52a1\u7ecf\u7406"},"\u8d22\u52a1\u7ecf\u7406"),x.a.createElement(W,{value:"\u5ba2\u670d\u4eba\u5458"},"\u5ba2\u670d\u4eba\u5458"),x.a.createElement(W,{value:"\u68c0\u9a8c\u4eba\u5458"},"\u68c0\u9a8c\u4eba\u5458"),x.a.createElement(W,{value:"\u68c0\u6d4b\u4eba\u5458"},"\u68c0\u6d4b\u4eba\u5458"),x.a.createElement(W,{value:"\u8d22\u52a1\u4eba\u5458"},"\u8d22\u52a1\u4eba\u5458"),x.a.createElement(W,{value:"\u7ba1\u7406\u5458"},"\u7ba1\u7406\u5458"),x.a.createElement(W,{value:"\u6388\u6743\u7b7e\u5b57\u4eba"},"\u6388\u6743\u7b7e\u5b57\u4eba")))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u662f\u5426\u6388\u6743\u7b7e\u5b57",colon:!1},l.getFieldDecorator("isauthorize",{initialValue:n.isauthorize,rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u662f\u5426\u6388\u6743\u7b7e\u5b57"}]})(x.a.createElement(S["a"].Group,null,x.a.createElement(S["a"],{value:"\u662f"},"\u662f"),x.a.createElement(S["a"],{value:"\u5426"},"\u5426")))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u516c\u53f8\u804c\u52a1",colon:!1},l.getFieldDecorator("workduty",{initialValue:n.workduty,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u516c\u53f8\u804c\u52a1"}]})(x.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u516c\u53f8\u804c\u52a1"},x.a.createElement(W,{value:"\u603b\u7ecf\u7406"},"\u603b\u7ecf\u7406"),x.a.createElement(W,{value:"\u526f\u603b\u7ecf\u7406"},"\u526f\u603b\u7ecf\u7406"),x.a.createElement(W,{value:"\u603b\u76d1"},"\u603b\u76d1"),x.a.createElement(W,{value:"\u7ecf\u7406"},"\u7ecf\u7406"),x.a.createElement(W,{value:"\u526f\u7ecf\u7406"},"\u526f\u7ecf\u7406"),x.a.createElement(W,{value:"\u4ea7\u54c1\u7ecf\u7406"},"\u4ea7\u54c1\u7ecf\u7406"),x.a.createElement(W,{value:"\u4e3b\u7ba1"},"\u4e3b\u7ba1"),x.a.createElement(W,{value:"\u5458\u5de5"},"\u5458\u5de5")))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u8eab\u4efd\u8bc1\u53f7",colon:!1},l.getFieldDecorator("idcard",{initialValue:n.idcard,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8eab\u4efd\u8bc1\u53f7"}]})(x.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8eab\u4efd\u8bc1\u53f7"}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u51fa\u751f\u5e74\u6708",colon:!1},l.getFieldDecorator("birthday",{initialValue:void 0!==n.birthday&&null!==n.birthday?H()(n.birthday,"YYYY-MM-DD"):null})(x.a.createElement(I["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u51fa\u751f\u5e74\u6708",format:"YYYY-MM-DD",getPopupContainer:function(e){return e.parentNode}}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u6587\u5316\u7a0b\u5ea6"},l.getFieldDecorator("education",{initialValue:n.education})(x.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u6587\u5316\u7a0b\u5ea6"},x.a.createElement(W,{value:"\u521d\u4e2d"},"\u521d\u4e2d"),x.a.createElement(W,{value:"\u9ad8\u4e2d"},"\u9ad8\u4e2d"),x.a.createElement(W,{value:"\u4e13\u79d1"},"\u4e13\u79d1"),x.a.createElement(W,{value:"\u672c\u79d1"},"\u672c\u79d1"),x.a.createElement(W,{value:"\u7855\u58eb"},"\u7855\u58eb"),x.a.createElement(W,{value:"\u535a\u58eb"},"\u535a\u58eb")))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u4e13\u4e1a",colon:!1},l.getFieldDecorator("major",{initialValue:n.major})(x.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165\u6240\u5b66\u4e13\u4e1a"}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u6027\u522b",colon:!1},l.getFieldDecorator("sex",{initialValue:n.sex})(x.a.createElement(S["a"].Group,{style:{width:"100%"}},x.a.createElement(S["a"],{value:"\u7537"},"\u7537"),x.a.createElement(S["a"],{value:"\u5973"},"\u5973")))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u5165\u804c\u65e5\u671f",colon:!1},l.getFieldDecorator("enterdate",{initialValue:void 0!==n.enterdate&&null!==n.enterdate?H()(n.enterdate,"YYYY-MM-DD"):null})(x.a.createElement(I["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u5165\u804c\u65e5\u671f",format:"YYYY-MM-DD",getPopupContainer:function(e){return e.parentNode}}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u5165\u804c\u5e74\u9650",colon:!1},l.getFieldDecorator("workyears",{initialValue:n.workyears})(x.a.createElement(N["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u4ece\u4e8b\u7684\u5165\u804c\u5e74\u9650"})))),x.a.createElement(V["a"],{span:11},x.a.createElement("span",null,x.a.createElement("span",{style:{fontWeight:"bold"}},"\u5e73\u53f0\u62df\u5236\u8bc1\u4e66\u8981\u6c42\uff1a\u5982\u679c\u60a8\u9700\u8981\u5728\u5e73\u53f0\u81ea\u52a8\u62df\u5236\u8bc1\u4e66\uff0c",x.a.createElement("br",null)),"\u60a8\u65b0\u589e\u8be5\u7528\u6237\uff0c\u6dfb\u52a0\u6210\u529f\u540e\uff0c\u5728\u64cd\u4f5c\u680f\u9009\u62e9\u201c\u4e0a\u4f20\u56fe\u7247\u201d\uff0c",x.a.createElement("br",null),"\uff081\uff09\u7528\u6237\u77e2\u91cf\u7b7e\u540d\u56fe\uff0cpng\u683c\u5f0f\uff1b",x.a.createElement("br",null),"\uff082\uff09\u6388\u6743\u56fe\u7247\uff1a\u6388\u6743\u7b7e\u5b57\u4eba\u8bc1\u4e66\u7ae0\u548c\u7b7e\u5b57\u5408\u4e3a\u4e00\u4f53\u7684\u77e2\u91cf\u56fe\uff0cpng\u683c\u5f0f\uff1b",x.a.createElement("br",null),"\u5982\u679c\u6ca1\u6709\u4e0a\u4f20\u624b\u7b7e\u7b7e\u540d\u548c\u6388\u6743\u7b7e\u540d\uff0c\u5c06\u4e0d\u80fd\u5728\u5e73\u53f0\u62df\u5236\u8bc1\u4e66\uff01",x.a.createElement("br",null)),x.a.createElement("span",{style:{paddingTop:500}},x.a.createElement("br",null),x.a.createElement("br",null),x.a.createElement("br",null)," ",x.a.createElement("br",null),x.a.createElement("br",null),x.a.createElement("br",null)," ",x.a.createElement("br",null),x.a.createElement("br",null),x.a.createElement("br",null)," ",x.a.createElement("br",null),x.a.createElement("br",null),x.a.createElement("span",{style:{fontWeight:"bold"}},"\u89d2\u8272\u8bf4\u660e\uff1a\u89d2\u8272\u53ef\u4ee5\u9009\u62e9\u4e00\u9879\u6216\u591a\u9879\u3002",x.a.createElement("br",null)),"\uff081\uff09\u59d4\u6258\u4eba\u7f51\u4e0a\u59d4\u6258\u540e\u7684\u63d0\u9192\u77ed\u4fe1\u7ed9\u4e1a\u52a1\u7ecf\u7406\uff1b",x.a.createElement("br",null),"\uff082\uff09\u63a5\u53d7\u59d4\u6258\u540e\uff0c\u77ed\u4fe1\u63d0\u9192\u7ed9\u201c\u64cd\u4f5c\u7ecf\u7406\u201d\uff1b",x.a.createElement("br",null),"\uff083\uff09\u603b\u7ecf\u7406\uff0c\u4e1a\u52a1\u526f\u603b\u89d2\u8272\u53ef\u4ee5\u64a4\u9500\u59d4\u6258\uff1b",x.a.createElement("br",null),"\uff084\uff09\u603b\u7ecf\u7406\u3001\u4e1a\u52a1\u526f\u603b\u3001\u5b9e\u9a8c\u5ba4\u4e3b\u4efb\u53ef\u4ee5\u5ba1\u6838\u68c0\u6d4b\u7ed3\u679c\u3002",x.a.createElement("br",null),"\uff085\uff09\u603b\u7ecf\u7406\u3001\u4e1a\u52a1\u526f\u603b\u3001\u4e1a\u52a1\u7ecf\u7406\u89d2\u8272\u53ef\u4ee5\u53d1\u5e03\u8bc1\u4e66\uff1b",x.a.createElement("br",null),"\uff086\uff09\u603b\u7ecf\u7406\u3001\u4e1a\u52a1\u526f\u603b\u3001\u4e1a\u52a1\u7ecf\u7406\u89d2\u8272\u53ef\u4ee5\u5ba1\u6838\u6536\u8d39\u6e05\u5355\uff1b",x.a.createElement("br",null),"\uff087\uff09\u603b\u7ecf\u7406\u3001\u8d22\u52a1\u526f\u603b\u3001\u8d22\u52a1\u7ecf\u7406\u89d2\u8272\u53ef\u4ee5\u5ba1\u6838\u6210\u672c\u652f\u4ed8\u6e05\u5355\uff1b",x.a.createElement("br",null),"\uff088\uff09\u7ba1\u7406\u5458\u3001\u603b\u7ecf\u7406\u89d2\u8272\u53ef\u4ee5\u4fee\u6539\u5b57\u5178\u7ba1\u7406\u548c\u516c\u53f8\u7ba1\u7406\u5185\u7684\u4fe1\u606f\u3002",x.a.createElement("br",null),"\uff089\uff09\u6388\u6743\u7b7e\u5b57\u4eba\uff0c\u5728\u662f\u5426\u6388\u6743\u7b7e\u5b57\u9009\u201c\u662f\u201d\uff0c\u5e76\u5728\u89d2\u8272\u52a0\u9009\u4e2d\u9009\u62e9\u6388\u6743\u7b7e\u5b57\u4eba"))))}),Z=O["a"].create()(function(e){var a=e.addModalVisible,l=e.form,t=e.handleAdd,r=e.addHandleModalVisible,n=e.departmentOptions,o=e.checkUserNameFetch,c=e.verityUserNameC,i=function(){l.validateFields(function(e,a){e||(l.resetFields(),t(a))})};return x.a.createElement(F["a"],{destroyOnClose:!0,title:"\u7528\u6237\u65b0\u589e",style:{top:10},width:1100,visible:a,onOk:i,onCancel:function(){return r()}},x.a.createElement(M["a"],null,x.a.createElement(V["a"],{span:13},x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u7528\u6237\u540d",colon:!1},l.getFieldDecorator("userName",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u4e0d\u91cd\u590d\u7684\u7528\u6237\u540d"},{validator:o}]})(x.a.createElement(Y["a"],{placeholder:"\u7528\u6237\u540d\u7528\u59d3\u540d\u5168\u62fc\uff0c\u5982\u5f20\u4e09\uff1azhangsan"}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u771f\u5b9e\u59d3\u540d",colon:!1},l.getFieldDecorator("nameC",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u771f\u5b9e\u59d3\u540d"},{validator:c}]})(x.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165\u771f\u5b9e\u59d3\u540d"}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u5730\u5740",colon:!1},l.getFieldDecorator("place",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5730\u5740"}]})(x.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165\u5730\u5740,\u5982\uff1a\u6c5f\u82cf\u9547\u6c5f"}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u624b\u673a",colon:!1},l.getFieldDecorator("tel",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u624b\u673a"}]})(x.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165\u624b\u673a"}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u90e8\u95e8",colon:!1},l.getFieldDecorator("section",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6240\u5728\u90e8\u95e8"}]})(x.a.createElement(q["a"],{placeholder:"\u8bf7\u9009\u62e9\u6240\u5728\u90e8\u95e8",style:{width:"100%"}},n))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u89d2\u8272",colon:!1},l.getFieldDecorator("role",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u89d2\u8272\u6743\u9650\uff0c\u53ef\u4ee5\u9009\u62e9\u4e00\u9879\u6216\u591a\u9879"}]})(x.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u89d2\u8272\uff0c\u53ef\u4ee5\u9009\u62e9\u4e00\u9879\u6216\u591a\u9879",mode:"tags"},x.a.createElement(W,{value:"\u603b\u7ecf\u7406"},"\u603b\u7ecf\u7406"),x.a.createElement(W,{value:"\u4e1a\u52a1\u526f\u603b"},"\u4e1a\u52a1\u526f\u603b"),x.a.createElement(W,{value:"\u8d22\u52a1\u526f\u603b"},"\u8d22\u52a1\u526f\u603b"),x.a.createElement(W,{value:"\u64cd\u4f5c\u7ecf\u7406"},"\u64cd\u4f5c\u7ecf\u7406"),x.a.createElement(W,{value:"\u5b9e\u9a8c\u5ba4\u4e3b\u4efb"},"\u5b9e\u9a8c\u5ba4\u4e3b\u4efb"),x.a.createElement(W,{value:"\u4e1a\u52a1\u7ecf\u7406"},"\u4e1a\u52a1\u7ecf\u7406"),x.a.createElement(W,{value:"\u8d22\u52a1\u7ecf\u7406"},"\u8d22\u52a1\u7ecf\u7406"),x.a.createElement(W,{value:"\u5ba2\u670d\u4eba\u5458"},"\u5ba2\u670d\u4eba\u5458"),x.a.createElement(W,{value:"\u68c0\u9a8c\u4eba\u5458"},"\u68c0\u9a8c\u4eba\u5458"),x.a.createElement(W,{value:"\u68c0\u6d4b\u4eba\u5458"},"\u68c0\u6d4b\u4eba\u5458"),x.a.createElement(W,{value:"\u8d22\u52a1\u4eba\u5458"},"\u8d22\u52a1\u4eba\u5458"),x.a.createElement(W,{value:"\u7ba1\u7406\u5458"},"\u7ba1\u7406\u5458"),x.a.createElement(W,{value:"\u6388\u6743\u7b7e\u5b57\u4eba"},"\u6388\u6743\u7b7e\u5b57\u4eba")))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u662f\u5426\u6388\u6743\u7b7e\u5b57",colon:!1},l.getFieldDecorator("isauthorize",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u662f\u5426\u6388\u6743\u7b7e\u5b57"}]})(x.a.createElement(S["a"].Group,null,x.a.createElement(S["a"],{value:"\u662f"},"\u662f"),x.a.createElement(S["a"],{value:"\u5426"},"\u5426")))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u516c\u53f8\u804c\u52a1",colon:!1},l.getFieldDecorator("workduty",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u516c\u53f8\u804c\u52a1"}]})(x.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u516c\u53f8\u804c\u52a1"},x.a.createElement(W,{value:"\u603b\u7ecf\u7406"},"\u603b\u7ecf\u7406"),x.a.createElement(W,{value:"\u526f\u603b\u7ecf\u7406"},"\u526f\u603b\u7ecf\u7406"),x.a.createElement(W,{value:"\u603b\u76d1"},"\u603b\u76d1"),x.a.createElement(W,{value:"\u7ecf\u7406"},"\u7ecf\u7406"),x.a.createElement(W,{value:"\u526f\u7ecf\u7406"},"\u526f\u7ecf\u7406"),x.a.createElement(W,{value:"\u4ea7\u54c1\u7ecf\u7406"},"\u4ea7\u54c1\u7ecf\u7406"),x.a.createElement(W,{value:"\u4e3b\u7ba1"},"\u4e3b\u7ba1"),x.a.createElement(W,{value:"\u5458\u5de5"},"\u5458\u5de5")))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u8eab\u4efd\u8bc1\u53f7",colon:!1},l.getFieldDecorator("idcard",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8eab\u4efd\u8bc1\u53f7"}]})(x.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8eab\u4efd\u8bc1\u53f7"}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u51fa\u751f\u5e74\u6708",colon:!1},l.getFieldDecorator("birthday",{})(x.a.createElement(I["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u51fa\u751f\u5e74\u6708",format:"YYYY-MM-DD",getPopupContainer:function(e){return e.parentNode}}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u6587\u5316\u7a0b\u5ea6"},l.getFieldDecorator("education",{})(x.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u6587\u5316\u7a0b\u5ea6"},x.a.createElement(W,{value:"\u521d\u4e2d"},"\u521d\u4e2d"),x.a.createElement(W,{value:"\u9ad8\u4e2d"},"\u9ad8\u4e2d"),x.a.createElement(W,{value:"\u4e13\u79d1"},"\u4e13\u79d1"),x.a.createElement(W,{value:"\u672c\u79d1"},"\u672c\u79d1"),x.a.createElement(W,{value:"\u7855\u58eb"},"\u7855\u58eb"),x.a.createElement(W,{value:"\u535a\u58eb"},"\u535a\u58eb")))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u4e13\u4e1a",colon:!1},l.getFieldDecorator("major",{})(x.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165\u6240\u5b66\u4e13\u4e1a"}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u6027\u522b",colon:!1},l.getFieldDecorator("sex",{})(x.a.createElement(S["a"].Group,{style:{width:"100%"}},x.a.createElement(S["a"],{value:"\u7537"},"\u7537"),x.a.createElement(S["a"],{value:"\u5973"},"\u5973")))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u5165\u804c\u65e5\u671f",colon:!1},l.getFieldDecorator("enterdate",{})(x.a.createElement(I["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u5165\u804c\u65e5\u671f",format:"YYYY-MM-DD",getPopupContainer:function(e){return e.parentNode}}))),x.a.createElement(Q,{labelCol:{span:6},wrapperCol:{span:15},label:"\u5165\u804c\u5e74\u9650",colon:!1},l.getFieldDecorator("workyears",{})(x.a.createElement(N["a"],{style:{width:"100%"},placeholder:"\u8bf7\u9009\u62e9\u4ece\u4e8b\u7684\u5165\u804c\u5e74\u9650"})))),x.a.createElement(V["a"],{span:11},x.a.createElement("span",null,x.a.createElement("span",{style:{fontWeight:"bold"}},"\u5e73\u53f0\u62df\u5236\u8bc1\u4e66\u8981\u6c42\uff1a\u5982\u679c\u60a8\u9700\u8981\u5728\u5e73\u53f0\u81ea\u52a8\u62df\u5236\u8bc1\u4e66\uff0c",x.a.createElement("br",null)),"\u60a8\u65b0\u589e\u8be5\u7528\u6237\uff0c\u6dfb\u52a0\u6210\u529f\u540e\uff0c\u5728\u64cd\u4f5c\u680f\u9009\u62e9\u201c\u4e0a\u4f20\u56fe\u7247\u201d\uff0c",x.a.createElement("br",null),"\uff081\uff09\u7528\u6237\u77e2\u91cf\u7b7e\u540d\u56fe\uff0cpng\u683c\u5f0f\uff1b",x.a.createElement("br",null),"\uff082\uff09\u6388\u6743\u56fe\u7247\uff1a\u6388\u6743\u7b7e\u5b57\u4eba\u8bc1\u4e66\u7ae0\u548c\u7b7e\u5b57\u5408\u4e3a\u4e00\u4f53\u7684\u77e2\u91cf\u56fe\uff0cpng\u683c\u5f0f\uff1b",x.a.createElement("br",null),"\u5982\u679c\u6ca1\u6709\u4e0a\u4f20\u624b\u7b7e\u7b7e\u540d\u548c\u6388\u6743\u7b7e\u540d\uff0c\u5c06\u4e0d\u80fd\u5728\u5e73\u53f0\u62df\u5236\u8bc1\u4e66\uff01",x.a.createElement("br",null)),x.a.createElement("span",{style:{paddingTop:500}},x.a.createElement("br",null),x.a.createElement("br",null),x.a.createElement("br",null)," ",x.a.createElement("br",null),x.a.createElement("br",null),x.a.createElement("br",null)," ",x.a.createElement("br",null),x.a.createElement("br",null),x.a.createElement("br",null)," ",x.a.createElement("br",null),x.a.createElement("br",null),x.a.createElement("span",{style:{fontWeight:"bold"}},"\u89d2\u8272\u8bf4\u660e\uff1a\u89d2\u8272\u53ef\u4ee5\u9009\u62e9\u4e00\u9879\u6216\u591a\u9879\u3002",x.a.createElement("br",null)),"\uff081\uff09\u59d4\u6258\u4eba\u7f51\u4e0a\u59d4\u6258\u540e\u7684\u63d0\u9192\u77ed\u4fe1\u7ed9\u4e1a\u52a1\u7ecf\u7406\uff1b",x.a.createElement("br",null),"\uff082\uff09\u63a5\u53d7\u59d4\u6258\u540e\uff0c\u77ed\u4fe1\u63d0\u9192\u7ed9\u201c\u64cd\u4f5c\u7ecf\u7406\u201d\uff1b",x.a.createElement("br",null),"\uff083\uff09\u603b\u7ecf\u7406\uff0c\u4e1a\u52a1\u526f\u603b\u89d2\u8272\u53ef\u4ee5\u64a4\u9500\u59d4\u6258\uff1b",x.a.createElement("br",null),"\uff084\uff09\u603b\u7ecf\u7406\u3001\u4e1a\u52a1\u526f\u603b\u3001\u5b9e\u9a8c\u5ba4\u4e3b\u4efb\u53ef\u4ee5\u5ba1\u6838\u68c0\u6d4b\u7ed3\u679c\u3002",x.a.createElement("br",null),"\uff085\uff09\u603b\u7ecf\u7406\u3001\u4e1a\u52a1\u526f\u603b\u3001\u4e1a\u52a1\u7ecf\u7406\u89d2\u8272\u53ef\u4ee5\u53d1\u5e03\u8bc1\u4e66\uff1b",x.a.createElement("br",null),"\uff086\uff09\u603b\u7ecf\u7406\u3001\u4e1a\u52a1\u526f\u603b\u3001\u4e1a\u52a1\u7ecf\u7406\u89d2\u8272\u53ef\u4ee5\u5ba1\u6838\u6536\u8d39\u6e05\u5355\uff1b",x.a.createElement("br",null),"\uff087\uff09\u603b\u7ecf\u7406\u3001\u8d22\u52a1\u526f\u603b\u3001\u8d22\u52a1\u7ecf\u7406\u89d2\u8272\u53ef\u4ee5\u5ba1\u6838\u6210\u672c\u652f\u4ed8\u6e05\u5355\uff1b",x.a.createElement("br",null),"\uff088\uff09\u7ba1\u7406\u5458\u3001\u603b\u7ecf\u7406\u89d2\u8272\u53ef\u4ee5\u4fee\u6539\u5b57\u5178\u7ba1\u7406\u548c\u516c\u53f8\u7ba1\u7406\u5185\u7684\u4fe1\u606f\u3002",x.a.createElement("br",null),"\uff089\uff09\u6388\u6743\u7b7e\u5b57\u4eba\uff0c\u5728\u662f\u5426\u6388\u6743\u7b7e\u5b57\u9009\u201c\u662f\u201d\uff0c\u5e76\u5728\u89d2\u8272\u52a0\u9009\u4e2d\u9009\u62e9\u6388\u6743\u7b7e\u5b57\u4eba"))))}),X=(t=Object(j["connect"])(function(e){var a=e.company,l=e.loading;return{company:a,loading:l.models.company}}),r=O["a"].create(),t(n=r((o=function(e){k()(l,e);var a=A(l);function l(){var e;h()(this,l);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return e=a.call.apply(a,[this].concat(r)),e.state={modalVisible:!1,addModalVisible:!1,modalInfo:{},dataSource:[],username:null,fileList:[],visible:!1,previewVisible:!1,signUrl:"",departments:[]},e.columns=[{title:"\u7528\u6237\u540d",dataIndex:"userName"},{title:"\u90e8\u95e8",dataIndex:"section"},{title:"\u59d3\u540d",dataIndex:"nameC"},{title:"\u7535\u8bdd",dataIndex:"tel"},{title:"\u6743\u9650\u89d2\u8272",dataIndex:"role",render:function(e,a){var l=[];if(void 0===e||null===e||""===e)return null;if(l=e.split(" "),l.length<2)return e;for(var t=null,r=x.a.createElement("br",null),n=0;n<l.length;n++)t=0===n?l[n]:n%3===0?x.a.createElement("span",null,t,r,l[n]):x.a.createElement("span",null,t,"\xa0",l[n]);return x.a.createElement("div",null,t)}},{title:"\u662f\u5426\u6388\u6743\u7b7e\u5b57\u4eba",dataIndex:"isauthorize"},{title:"\u64cd\u4f5c",render:function(a,l){return x.a.createElement(U["Fragment"],null,x.a.createElement("a",{onClick:function(){return e.viewInfo(a,l)}},"\u67e5\u770b\xa0\xa0"),x.a.createElement("a",{onClick:function(){return e.uploadItem(a,l)}},"\u4e0a\u4f20\u56fe\u7247\xa0\xa0"),x.a.createElement("a",{onClick:function(){return e.fileItem(a,l)}},"\u4e0a\u4f20\u6587\u4ef6\xa0\xa0"),x.a.createElement("a",{onClick:function(){return e.modifyItem(a,l)}},"\u4fee\u6539\xa0\xa0"),x.a.createElement("a",{onClick:function(){return e.resetPassword(a,l)}},"\u91cd\u7f6e\u5bc6\u7801"),"    \xa0\xa0",x.a.createElement("a",{onClick:function(){return e.deleteItem(a,l)}},"\u5220\u9664"))}}],e.checkUserNameFetch=function(a,l,t){var r=e.props.dispatch;r({type:"company/checkUserNameFetch",payload:{username:l},callback:function(e){"repeat"===e?t(Object(L["formatMessage"])({id:"validation.username.repeat"})):"success"===e?t():t(Object(L["formatMessage"])({id:"validation.username.error"}))}})},e.verityUserNameC=function(a,l,t){var r=e.props.dispatch,n=JSON.parse(localStorage.getItem("userinfo"));r({type:"company/verityUserNameC",payload:{nameC:l,certCode:n.certCode},callback:function(e){"repeat"===e?t(Object(L["formatMessage"])({id:"validation.usernamec.repeat"})):"success"===e?t():t(Object(L["formatMessage"])({id:"validation.usernamec.error"}))}})},e.handleChange=function(a){var l=a.file,t=a.fileList,r="image/jpg"===l.type,n="image/jpeg"===l.type,o="image/gif"===l.type,c="image/png"===l.type,i=l.size/1024/1024<20;r||o||n||c?i?e.setState({fileList:t}):F["a"].error({title:"\u8d85\u8fc720M\u9650\u5236\uff0c\u4e0d\u5141\u8bb8\u4e0a\u4f20~"}):F["a"].error({title:"\u53ea\u80fd\u4e0a\u4f20JPG \u3001GIF \u3001PNG\u3001JPEG\u683c\u5f0f\u7684\u56fe\u7247~"})},e.fileItem=function(e){sessionStorage.setItem("nameC",e.nameC),z.a.push({pathname:"/CompanyManage/ManRecord"})},e.viewInfo=function(e){sessionStorage.setItem("usertext",JSON.stringify(e)),z.a.push({pathname:"/CompanyManage/ManDetail"})},e.init=function(){var a=JSON.parse(localStorage.getItem("userinfo")),l=e.props.dispatch,t={certCode:a.certCode};l({type:"company/getAllUserListByCertCode",payload:t,callback:function(a){a&&(e.state.dataSource=a.data)}}),l({type:"company/getDepartmentList",payload:t,callback:function(a){a&&(null!==a.data&&0!==a.data.length||F["a"].info({title:"\u672a\u914d\u7f6e\u516c\u53f8\u90e8\u95e8\uff01",content:"\u8bf7\u7ba1\u7406\u5458\u5728\u201c\u516c\u53f8\u7ba1\u7406-\u90e8\u95e8\u7ba1\u7406\u201d\u4fee\u6539\uff0c\u7528\u6237\u9700\u9009\u62e9\u6240\u5728\u90e8\u95e8\uff01",okText:"\u77e5\u9053\u4e86",onOk:function(){}}),e.state.departments=a.data)}})},e.handleFormReset=function(){var a=e.props.form;a.resetFields(),e.init()},e.handleSearch=function(a){a.preventDefault();var l=e.props,t=l.dispatch,r=l.form;r.validateFields(function(a,l){if(!a){var r=JSON.parse(localStorage.getItem("userinfo")),n=E()({},l,{kind:l.kind.trim(),value:l.value.trim(),certCode:r.certCode});t({type:"company/getAllUserListByCertCode",payload:n,callback:function(a){a&&(e.state.dataSource=a.data)}})}})},e.isValidDate=function(e){return void 0!==e&&null!==e?x.a.createElement("span",null,H()(e).format("YYYY-MM-DD")):[]},e.previewItem=function(a){e.setState({previewVisible:!0});var l=e.props.dispatch;l({type:"company/getUrl",payload:{url:a.signurl},callback:function(a){200===a.code&&e.setState({signUrl:a.data})}})},e.modifyItem=function(a){var l=Object.assign({},a);if(void 0!==l.role&&null!==l.role){var t=l.role.split(" ");l.role=t}else l.role=[];e.setState({modalInfo:l}),e.handleModalVisible(!0)},e.deleteItem=function(a){var l=e.props.dispatch,t={userName:a.userName};console.log(t),l({type:"company/deleteUser",payload:t,callback:function(e){"success"===e?d["a"].success("\u5220\u9664\u6210\u529f"):d["a"].success("\u5220\u9664\u5931\u8d25")}}),e.init()},e.uploadItem=function(a){sessionStorage.setItem("username",a.userName),z.a.push({pathname:"/CompanyManage/ManUpload"}),e.setState({username:a.userName}),e.setState({visible:!0})},e.addItem=function(){e.addHandleModalVisible(!0)},e.handleModalVisible=function(a){e.setState({modalVisible:!!a})},e.addHandleModalVisible=function(a){e.setState({addModalVisible:!!a})},e.resetPassword=function(a){F["a"].confirm({title:"\u786e\u5b9a\u91cd\u7f6e\u5bc6\u7801\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){var l=e.props.dispatch,t=a;t.password="smlq123",l({type:"company/updateUser",payload:E()({},t),callback:function(a){200===a.code?(d["a"].success("\u91cd\u7f6e\u5bc6\u7801\u4e3asmlq123\u6210\u529f"),e.componentDidMount()):d["a"].error("\u91cd\u7f6e\u5bc6\u7801\u5931\u8d25")}})}})},e.handleEdit=function(a,l){var t=e.props.dispatch,r=E()({},l),n="";if(null!==a.role&&void 0!==a.role)for(var o=0;void 0!==a.role.length&&o<a.role.length;o++)o!==a.role.length-1?n+="".concat(a.role[o]," "):n+="".concat(a.role[o]);r.role=n,r.userName=a.userName,r.nameC=a.nameC,r.place=a.place,r.tel=a.tel,r.section=a.section,r.birthday=a.birthday,r.idcard=a.idcard,r.isauthorize=a.isauthorize,r.sex=a.sex,r.workduty=a.workduty,r.major=a.major,r.enterdate=a.enterdate,r.workyears=a.workyears,r.education=a.education,t({type:"company/updateUser",payload:E()({},r),callback:function(a){200===a.code?(d["a"].success("\u4fdd\u5b58\u6210\u529f"),e.componentDidMount()):d["a"].error("\u4fdd\u5b58\u5931\u8d25,\u7528\u6237\u540d\u5df2\u88ab\u5360\u7528\uff0c\u8bf7\u91cd\u65b0\u8bbe\u7f6e")}}),e.setState({modalVisible:!1})},e.handleAdd=function(a){var l=e.props.dispatch,t=JSON.parse(localStorage.getItem("userinfo")),r=E()({},a,{certCode:t.certCode,password:"smlq123"});l({type:"company/addUser",payload:r,callback:function(e){"success"===e?d["a"].success("\u4fdd\u5b58\u6210\u529f"):d["a"].error("\u4fdd\u5b58\u5931\u8d25")}}),e.setState({addModalVisible:!1}),e.init()},e.handleCancel=function(){var a=e.props.form;a.resetFields(),e.setState({visible:!1})},e.handlePreviewCancel=function(){e.setState({previewVisible:!1})},e}return f()(l,[{key:"componentDidMount",value:function(){this.init()}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return x.a.createElement(O["a"],{onSubmit:this.handleSearch,layout:"inline"},x.a.createElement(M["a"],{gutter:{md:8,lg:24,xl:48}},x.a.createElement(V["a"],{md:4,sm:20},x.a.createElement(O["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(x.a.createElement(q["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},x.a.createElement(W,{value:"userName"},"\u7528\u6237\u540d"),x.a.createElement(W,{value:"nameC"},"\u59d3\u540d"),x.a.createElement(W,{value:"place"},"\u5730\u5740"),x.a.createElement(W,{value:"tel"},"\u7535\u8bdd"),x.a.createElement(W,{value:"section"},"\u90e8\u95e8"),x.a.createElement(W,{value:"role"},"\u6743\u9650\u89d2\u8272"))))),x.a.createElement(V["a"],{md:6,sm:20},x.a.createElement(Q,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(x.a.createElement(Y["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),x.a.createElement(V["a"],{md:8,sm:20},x.a.createElement("span",{className:T.a.submitButtons},x.a.createElement(u["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),x.a.createElement(u["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e"),x.a.createElement(u["a"],{type:"primary",style:{marginLeft:8},onClick:this.addItem},"\u65b0\u589e")))))}},{key:"render",value:function(){var e=this.props,a=e.loading,l=e.dispatch,t=this.state,r=t.modalVisible,n=t.modalInfo,o=t.addModalVisible,s=t.dataSource,u=(t.fileList,t.previewVisible),d=t.signUrl,p=t.departments,E={handleEdit:this.handleEdit,handleAdd:this.handleAdd,handleModalVisible:this.handleModalVisible,addHandleModalVisible:this.addHandleModalVisible,handleChange:this.handleChange,handleCancel:this.handleCancel,checkUserNameFetch:this.checkUserNameFetch,verityUserNameC:this.verityUserNameC},b=p.map(function(e){return x.a.createElement(W,{key:e.branchname,value:e.branchname},e.branchname)});return x.a.createElement(R["a"],null,x.a.createElement(c["a"],{bordered:!1,size:"small"},x.a.createElement("div",{className:T.a.tableList},x.a.createElement(K,m()({},E,{modalVisible:r,modalInfo:n,dispatch:l,departmentOptions:b})),x.a.createElement(Z,m()({},E,{addModalVisible:o,dispatch:l,departmentOptions:b})),x.a.createElement("div",{className:T.a.tableListForm},this.renderSimpleForm()),x.a.createElement(i["a"],{size:"middle",loading:a,dataSource:s,columns:this.columns,rowKey:"userName",pagination:{showQuickJumper:!0,showSizeChanger:!0}})),x.a.createElement(F["a"],{title:"\u7b7e\u540d",visible:u,onCancel:this.handlePreviewCancel,footer:null},x.a.createElement("img",{src:d,width:"150"}))))}}]),l}(U["PureComponent"]),n=o))||n)||n);a["default"]=X}}]);