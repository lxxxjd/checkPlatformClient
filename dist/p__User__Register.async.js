(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[154],{"5WY0":function(e,a,t){e.exports={main:"antd-pro-pages-user-register-main",getCaptcha:"antd-pro-pages-user-register-getCaptcha",submit:"antd-pro-pages-user-register-submit",login:"antd-pro-pages-user-register-login",error:"antd-pro-pages-user-register-error",success:"antd-pro-pages-user-register-success",warning:"antd-pro-pages-user-register-warning","progress-pass":"antd-pro-pages-user-register-progress-pass",progress:"antd-pro-pages-user-register-progress"}},cq3J:function(e,a,t){"use strict";t.r(a);t("14J3");var r,s,n,i,o=t("BMrR"),c=(t("+L6B"),t("2/Rp")),l=(t("jCWc"),t("kPKH")),p=(t("Q9mQ"),t("diRs")),d=(t("MXD1"),t("CFYs")),m=t("p0pE"),u=t.n(m),g=(t("2qtc"),t("kLXV")),f=t("2Taf"),h=t.n(f),v=t("vZ4D"),b=t.n(v),E=t("l4Ni"),w=t.n(E),y=t("ujKo"),M=t.n(y),k=t("MhPg"),O=t.n(k),j=(t("5NDa"),t("5rEg")),F=(t("OaEy"),t("2fM7")),C=(t("y8nQ"),t("Vl3Y")),P=t("q1tI"),S=t.n(P),D=t("MuoO"),q=t("Y2fQ"),N=t("wY1l"),R=t.n(N),x=t("3a4m"),z=t.n(x),V=t("5WY0"),T=t.n(V);function I(e){return function(){var a,t=M()(e);if(Y()){var r=M()(this).constructor;a=Reflect.construct(t,arguments,r)}else a=t.apply(this,arguments);return w()(this,a)}}function Y(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var W=C["a"].Item,J=F["a"].Option,Q=j["a"].Group,U={ok:S.a.createElement("div",{className:T.a.success},S.a.createElement(q["FormattedMessage"],{id:"validation.password.strength.strong"})),pass:S.a.createElement("div",{className:T.a.warning},S.a.createElement(q["FormattedMessage"],{id:"validation.password.strength.medium"})),poor:S.a.createElement("div",{className:T.a.error},S.a.createElement(q["FormattedMessage"],{id:"validation.password.strength.short"}))},A={ok:"success",pass:"normal",poor:"exception"},B=(r=Object(D["connect"])(function(e){var a=e.register,t=e.loading;return{register:a,submitting:t.effects["register/submit"]}}),s=C["a"].create(),r(n=s((i=function(e){O()(t,e);var a=I(t);function t(){var e;h()(this,t);for(var r=arguments.length,s=new Array(r),n=0;n<r;n++)s[n]=arguments[n];return e=a.call.apply(a,[this].concat(s)),e.state={count:0,confirmDirty:!1,visible:!1,help:"",prefix:"86"},e.onGetCaptcha=function(){var a=59;e.setState({count:a}),e.interval=setInterval(function(){a-=1,e.setState({count:a}),0===a&&clearInterval(e.interval)},1e3);var t=e.props,r=t.form,s=t.dispatch,n=r.getFieldValue("mobile");void 0===n?message.success("\u7535\u8bdd\u53f7\u7801\u4e0d\u80fd\u4e3a\u7a7a"):s({type:"register/sendVerify",payload:{tel:n},callback:function(e){e&&("success"===e?message.success("\u53d1\u9001\u6210\u529f"):g["a"].info({title:Object(q["formatMessage"])({id:"app.login.verification-code-warning.noExist"})}))}})},e.getPasswordStatus=function(){var a=e.props.form,t=a.getFieldValue("password");return t&&t.length>9?"ok":t&&t.length>5?"pass":"poor"},e.handleSubmit=function(a){a.preventDefault();var t=e.props,r=t.form,s=t.dispatch;r.validateFields({force:!0},function(e,a){if(!e){var t=a.mobile,r=a.captcha,n={tel:t,verifyCode:r};s({type:"register/verifyTel",payload:n,callback:function(e){e?"success"===e?s({type:"register/addUser",payload:u()({},a),callback:function(e){e?"success"===e?(message.success("\u6ce8\u518c\u6210\u529f"),z.a.push({pathname:"/Applicant/DetailForAccept"})):"\u624b\u673a\u53f7\u672a\u9a8c\u8bc1"===e?message.success("\u624b\u673a\u53f7\u672a\u9a8c\u8bc1"):"\u516c\u53f8\u91cd\u590d\u6ce8\u518c"===e?message.success("\u516c\u53f8\u91cd\u590d\u6ce8\u518c"):message.success("\u6ce8\u518c\u5931\u8d25"):message.success("\u6ce8\u518c\u5931\u8d25")}}):message.success("\u9a8c\u8bc1\u7801\u9519\u8bef"):message.success("\u9a8c\u8bc1\u7801\u5931\u8d25")}})}})},e.getRepeatTel=function(a,t,r){var s=e.props.dispatch;s({type:"register/getRepeatTel",payload:{tel:t},callback:function(e){void 0===e||null===e?r("\u53f7\u7801\u5df2\u6ce8\u518c"):"\u53f7\u7801\u5df2\u6ce8\u518c"===e?r("\u53f7\u7801\u5df2\u6ce8\u518c"):r()}})},e.handleConfirmBlur=function(a){var t=a.target.value,r=e.state.confirmDirty;e.setState({confirmDirty:r||!!t})},e.checkConfirm=function(a,t,r){var s=e.props.form;t&&t!==s.getFieldValue("password")?r(Object(q["formatMessage"])({id:"validation.password.twice"})):r()},e.checkPassword=function(a,t,r){var s=e.state,n=s.visible,i=s.confirmDirty;if(t)if(e.setState({help:""}),n||e.setState({visible:!!t}),t.length<6)r("error");else{var o=e.props.form;t&&i&&o.validateFields(["confirm"],{force:!0}),r()}else e.setState({help:Object(q["formatMessage"])({id:"validation.password.required"}),visible:!!t}),r("error")},e.changePrefix=function(a){e.setState({prefix:a})},e.renderPasswordProgress=function(){var a=e.props.form,t=a.getFieldValue("password"),r=e.getPasswordStatus();return t&&t.length?S.a.createElement("div",{className:T.a["progress-".concat(r)]},S.a.createElement(d["a"],{status:A[r],className:T.a.progress,strokeWidth:6,percent:10*t.length>100?100:10*t.length,showInfo:!1})):null},e}return b()(t,[{key:"componentDidUpdate",value:function(){var e=this.props,a=e.form,t=e.register,r=a.getFieldValue("mail");"ok"===t.status&&z.a.push({pathname:"/user/register-result",state:{account:r}})}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=this.props,a=e.form,t=e.submitting,r=a.getFieldDecorator,s=this.state,n=s.count,i=s.prefix,d=s.help,m=s.visible;return S.a.createElement("div",{className:T.a.main},S.a.createElement("h3",null,S.a.createElement(q["FormattedMessage"],{id:"app.register.register"})),S.a.createElement(C["a"],{onSubmit:this.handleSubmit},S.a.createElement(W,null,r("mail",{rules:[{required:!0,message:Object(q["formatMessage"])({id:"validation.email.required"})},{type:"email",message:Object(q["formatMessage"])({id:"validation.email.wrong-format"})}]})(S.a.createElement(j["a"],{size:"large",placeholder:Object(q["formatMessage"])({id:"form.email.placeholder"})}))),S.a.createElement(W,{help:d},S.a.createElement(p["a"],{getPopupContainer:function(e){return e.parentNode},content:S.a.createElement("div",{style:{padding:"4px 0"}},U[this.getPasswordStatus()],this.renderPasswordProgress(),S.a.createElement("div",{style:{marginTop:10}},S.a.createElement(q["FormattedMessage"],{id:"validation.password.strength.msg"}))),overlayStyle:{width:240},placement:"right",visible:m},r("password",{rules:[{validator:this.checkPassword}]})(S.a.createElement(j["a"],{size:"large",type:"password",placeholder:Object(q["formatMessage"])({id:"form.password.placeholder"})})))),S.a.createElement(W,null,r("confirm",{rules:[{required:!0,message:Object(q["formatMessage"])({id:"validation.confirm-password.required"})},{validator:this.checkConfirm}]})(S.a.createElement(j["a"],{size:"large",type:"password",placeholder:Object(q["formatMessage"])({id:"form.confirm-password.placeholder"})}))),S.a.createElement(W,null,S.a.createElement(Q,{compact:!0},S.a.createElement(F["a"],{size:"large",value:i,onChange:this.changePrefix,style:{width:"20%"}},S.a.createElement(J,{value:"86"},"+86"),S.a.createElement(J,{value:"87"},"+87")),r("mobile",{rules:[{required:!0,message:Object(q["formatMessage"])({id:"validation.phone-number.required"})},{pattern:/^\d{11}$/,message:Object(q["formatMessage"])({id:"validation.phone-number.wrong-format"})},{validator:this.getRepeatTel}]})(S.a.createElement(j["a"],{size:"large",style:{width:"80%"},placeholder:Object(q["formatMessage"])({id:"form.phone-number.placeholder"})})))),S.a.createElement(W,null,S.a.createElement(o["a"],{gutter:8},S.a.createElement(l["a"],{span:16},r("captcha",{rules:[{required:!0,message:Object(q["formatMessage"])({id:"validation.verification-code.required"})}]})(S.a.createElement(j["a"],{size:"large",placeholder:Object(q["formatMessage"])({id:"form.verification-code.placeholder"})}))),S.a.createElement(l["a"],{span:8},S.a.createElement(c["a"],{size:"large",disabled:n,className:T.a.getCaptcha,onClick:this.onGetCaptcha},n?"".concat(n," s"):Object(q["formatMessage"])({id:"app.register.get-verification-code"}))))),S.a.createElement(W,null,S.a.createElement(c["a"],{size:"large",loading:t,className:T.a.submit,type:"primary",htmlType:"submit"},S.a.createElement(q["FormattedMessage"],{id:"app.register.register"})),S.a.createElement(R.a,{className:T.a.login,to:"/User/Login"},S.a.createElement(q["FormattedMessage"],{id:"app.register.sign-in"})))))}}]),t}(P["Component"]),n=i))||n)||n);a["default"]=B}}]);