(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[149],{G8tC:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,l,r,s,i=a("bx4M"),o=(a("g9YV"),a("wCAj")),d=(a("Pwec"),a("CtXQ")),c=(a("iQDF"),a("+eQT")),p=(a("8R5B"),a("aJyg")),u=(a("14J3"),a("BMrR")),m=(a("jCWc"),a("kPKH")),h=a("jehZ"),f=a.n(h),g=a("gWZ8"),y=a.n(g),v=(a("/xke"),a("TeRw")),w=(a("5Dmo"),a("3S7+")),k=a("2Taf"),b=a.n(k),S=a("vZ4D"),E=a.n(S),C=a("rlhR"),I=a.n(C),R=a("l4Ni"),Y=a.n(R),D=a("ujKo"),P=a.n(D),V=a("MhPg"),x=a.n(V),M=(a("y8nQ"),a("Vl3Y")),F=(a("2qtc"),a("kLXV")),O=(a("bP8k"),a("gFTJ")),T=(a("+L6B"),a("2/Rp")),j=(a("5NDa"),a("5rEg")),A=(a("OaEy"),a("2fM7")),K=(a("sRBo"),a("kaz8")),J=a("q1tI"),N=a.n(J),B=a("MuoO"),q=a("zHco"),L=a("wd/R"),z=a.n(L),W=a("UKeP"),Q=a.n(W);function H(e){return function(){var t,a=P()(e);if(Z()){var n=P()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return Y()(this,t)}}function Z(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}K["a"].Group;var G=A["a"].Option,X=j["a"].TextArea,_=function(e){var t=e.modalReviewVisible,a=e.handleModalReviewVisible,n=e.modalInfo,l=function(e){return void 0!==e&&null!==e?N.a.createElement("span",null,z()(e).format("YYYY-MM-DD")):null};l(n.makingdate);return N.a.createElement(F["a"],{destroyOnClose:!0,title:"\u67e5\u770b\u8be6\u60c5",visible:t,style:{top:100},width:.75*document.body.clientWidth,onCancel:function(){return a()},footer:[N.a.createElement(T["a"],{type:"primary",onClick:function(){return a()}},"\u5173\u95ed")]},N.a.createElement(O["a"],{bordered:!0},N.a.createElement(O["a"].Item,{label:"\u68c0\u9a8c\u9879\u76ee"},n.inspway),N.a.createElement(O["a"].Item,{label:"\u5f00\u59cb\u65e5\u671f"},l(n.begindate)),N.a.createElement(O["a"].Item,{label:"\u7ed3\u675f\u65e5\u671f"},l(n.finishdate)),N.a.createElement(O["a"].Item,{label:"\u91cd\u91cf"},n.weight),N.a.createElement(O["a"].Item,{label:"\u4eba\u5458",span:2},n.inspman),N.a.createElement(O["a"].Item,{label:"\u4eea\u5668",span:3},N.a.createElement("div",{style:{"white-space":"pre"}},n.instrument)),N.a.createElement(O["a"].Item,{label:"\u68c0\u9a8c\u6807\u51c6",span:3},N.a.createElement("div",{style:{"white-space":"pre"}},n.standard)),N.a.createElement(O["a"].Item,{label:"\u7ed3\u679c\u63cf\u8ff0",span:3},n.result)))},U=(n=M["a"].create(),l=Object(B["connect"])(function(e){var t=e.checkResult,a=e.loading;return{checkResult:t,loading:a.models.checkResult}}),n(r=l((s=function(e){x()(a,e);var t=H(a);function a(){var e;b()(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return e=t.call.apply(t,[this].concat(l)),e.state={standards:[],standardsAll:[],targetStandards:[],selectedStandards:[],instrument:[],targetInstrument:[],selectedInstrument:[],people:[],targetPeople:[],selectedPeople:[],keyno:null,overallstate:void 0,modalReviewVisible:!1,modalInfo:{},modalType:""},e.columns=[{title:"\u68c0\u9a8c\u9879\u76ee",dataIndex:"inspway"},{title:"\u5f00\u59cb\u65e5\u671f",dataIndex:"begindate",render:function(t){return e.isValidDate(t)}},{title:"\u7ed3\u675f\u65e5\u671f",dataIndex:"finishdate",render:function(t){return e.isValidDate(t)}},{title:"\u4eba\u5458",dataIndex:"inspman",render:function(e,t){if(void 0!==typeof e&&null!==e){var a=[];if(a=e.split("|"),a.length<2)return e;for(var n=null,l=N.a.createElement("br",null),r=0;r<a.length;r++)n=0===r?a[r]:N.a.createElement("span",null,n,l,a[r]);return N.a.createElement("div",null,n)}}},{title:"\u91cd\u91cf",dataIndex:"weight"},{title:"\u7ed3\u679c\u63cf\u8ff0",dataIndex:"result",key:"desc",onCell:function(){return{style:{maxWidth:150,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",cursor:"pointer"}}},render:function(e){return N.a.createElement(w["a"],{placement:"topLeft",arrowPointAtCenter:!0,title:e},e)}},{title:"\u64cd\u4f5c",render:function(t,a){return N.a.createElement(J["Fragment"],null,N.a.createElement("a",{onClick:function(){return e.modifyItem(t,a)}},"\u4fee\u6539"),"  \xa0\xa0",N.a.createElement("a",{onClick:function(){return e.handleReview(!0,t)}},"\u67e5\u770b"),"  \xa0\xa0",N.a.createElement("a",{onClick:function(){return e.deleteItem(t,a)}},"\u5220\u9664"))}}],e.columns2=[{title:"\u7533\u8bf7\u9879\u76ee",dataIndex:"inspway"},{title:"\u91cd\u91cf",dataIndex:"weight"},{title:"\u4eba\u5458",dataIndex:"inspman",render:function(e,t){if(void 0!==typeof e&&null!==e){var a=[];if(a=e.split("|"),a.length<2)return e;for(var n=null,l=N.a.createElement("br",null),r=0;r<a.length;r++)n=0===r?a[r]:N.a.createElement("span",null,n,l,a[r]);return N.a.createElement("div",null,n)}}},{title:"\u5f00\u59cb\u65e5\u671f",dataIndex:"begindate",render:function(t){return e.isValidDate(t)}},{title:"\u7ed3\u675f\u65e5\u671f",dataIndex:"finishdate",render:function(t){return e.isValidDate(t)}},{title:"\u7ed3\u679c\u63cf\u8ff0",dataIndex:"result",key:"desc",onCell:function(){return{style:{maxWidth:150,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",cursor:"pointer"}}},render:function(e){return N.a.createElement(w["a"],{placement:"topLeft",arrowPointAtCenter:!0,title:e},e)}},{title:"\u64cd\u4f5c",render:function(t,a){return N.a.createElement(J["Fragment"],null,N.a.createElement("a",{onClick:function(){return e.handleReview(t,a)}},"\u67e5\u770b"),"  \xa0\xa0")}}],e.isValidDate=function(e){return void 0!==e&&null!==e?N.a.createElement("span",null,z()(e).format("YYYY-MM-DD")):[]},e.handleReview=function(t,a){e.handleModalReviewVisible(t);var n=I()(e),l=n.state,r=[],s="";if(null!==a.instrument){r=a.instrument.split("|");for(var i=function(e){var t=l.instrument.find(function(t){return t.key===r[e]});void 0!==t&&null!==t&&(s+="".concat(r[e],"-").concat(t.description,"\n"))},o=0;o<r.length;o++)i(o)}var d=[],c="";if(null!==a.standard){d=a.standard.split("|");for(var p=function(e){var t=l.standardsAll.find(function(t){return t.key===d[e]});void 0!==t&&(c+="".concat(d[e],"-").concat(t.description,"\n"))},u=0;u<d.length;u++)p(u)}var m={inspway:a.inspway,begindate:a.begindate,finishdate:a.finishdate,weight:a.weight,inspman:void 0!==a.inspman&&null!==a.inspman?a.inspman.replace("|"," "):"",standard:c,instrument:s,result:a.result};e.state.modalInfo=m},e.handleModalReviewVisible=function(t){e.setState({modalReviewVisible:!!t})},e.modifyItem=function(t){e.setState({modalType:"\u4fee\u6539"});var a=e.props,n=a.form,l=a.dispatch;if(n.setFieldsValue({inspway:t.inspway}),n.setFieldsValue({result:t.result}),n.setFieldsValue({weight:t.weight}),void 0!==t.standard&&null!==t.standard){var r=t.standard.split("|");e.setState({targetStandards:r}),n.setFieldsValue({standard:t.standard.split("|")})}if(void 0!==t.instrument&&null!==t.instrument){var s=t.instrument.split("|");e.setState({targetInstrument:s}),n.setFieldsValue({instrument:t.instrument.split("|")})}if(void 0!==t.inspman&&null!==t.inspman){var i=t.inspman.split("|");e.setState({targetPeople:i}),n.setFieldsValue({inspman:t.inspman.split("|")})}void 0!==t.begindate&&null!=t.begindate&&n.setFieldsValue({begindate:z()(t.begindate,"YYYY-MM-DD")}),void 0!==t.finishdate&&null!=t.finishdate&&n.setFieldsValue({finishdate:z()(t.finishdate,"YYYY-MM-DD")});var o=sessionStorage.getItem("reportno");l({type:"checkResult/getProject",payload:{reportno:o}}),l({type:"checkResult/getTaskByReportNoAndInspway",payload:{reportno:o,inspway:t.inspway},callback:function(t){if(400===t.code)v["a"].open({message:"\u83b7\u53d6\u5931\u8d25",description:t.data});else for(var a=t.data,n=[],l=0;l<a.length;l++)n.push({key:a[l]});e.setState({people:n})}});var d=JSON.parse(localStorage.getItem("userinfo"));l({type:"checkResult/getStandard",payload:{kind:"field",value:t.inspway,certCode:d.certCode},callback:function(t){if(400===t.code)v["a"].open({message:"\u83b7\u53d6\u5931\u8d25",description:t.data});else for(var a=t.data,n=[],l=0;l<a.length;l++)n.push({title:a[l].standarde,description:a[l].standardc,key:a[l].standarde});e.setState({standards:n})}}),e.setState({visible:!0}),e.setState({keyno:t.keyno})},e.deleteItem=function(t){F["a"].confirm({title:"\u786e\u5b9a\u5220\u9664\u8be5\u6761\u8bb0\u5f55\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){var a=e.props.dispatch,n=sessionStorage.getItem("reportno");a({type:"checkResult/deleteCheckResult",payload:{keyno:t.keyno},callback:function(e){400===e.code?v["a"].open({message:"\u5220\u9664\u5931\u8d25",description:e.data}):a({type:"checkResult/getCheckResult",payload:{reportno:n}})}})}})},e.back=function(){e.props.history.goBack()},e.handleOk=function(){var t=e.props,a=t.form.validateFieldsAndScroll,n=t.dispatch,l=e.state.keyno,r=sessionStorage.getItem("reportno");a(function(t,a){if(!t){var s={inspway:a.inspway,weight:a.weight,standard:void 0,inspman:void 0,begindate:a.begindate,finishdate:a.finishdate,instrument:void 0,result:a.result,reportno:r};if(void 0!==a.inspman&&null!==a.inspman){var i=a.inspman.join("|");s.inspman=i}if(void 0!==a.standard&&null!==a.standard){var o=a.standard.join("|");s.standard=o}if(void 0!==a.instrument&&null!==a.instrument){var d=a.instrument.join("|");s.instrument=d}null!==l?(s.keyno=l,n({type:"checkResult/updateCheckResult",payload:s,callback:function(e){400===e.code?v["a"].open({message:"\u6dfb\u52a0\u5931\u8d25",description:e.data}):n({type:"checkResult/getCheckResult",payload:{reportno:r}})}})):n({type:"checkResult/addCheckResult",payload:s,callback:function(e){400===e.code?v["a"].open({message:"\u6dfb\u52a0\u5931\u8d25",description:e.data}):n({type:"checkResult/getCheckResult",payload:{reportno:r}})}}),e.setState({keyno:null}),e.setState({visible:!1}),e.setState({targetPeople:[]}),e.setState({targetInstrument:[]}),e.setState({targetStandards:[]}),form.resetFields()}})},e.show=function(){e.setState({standards:[]}),e.setState({modalType:"\u65b0\u589e"});var t=e.props,a=t.form,n=t.dispatch,l=sessionStorage.getItem("reportno");n({type:"checkResult/getProject",payload:{reportno:l}}),a.resetFields(),e.setState({visible:!0})},e.handleCancel=function(){var t=e.props.form;t.resetFields(),e.setState({visible:!1})},e.onInspwayChange=function(t){var a=e.props.dispatch,n=sessionStorage.getItem("reportno"),l=JSON.parse(localStorage.getItem("userinfo"));a({type:"checkResult/getStandard",payload:{kind:"field",value:t,certCode:l.certCode},callback:function(t){if(400===t.code)v["a"].open({message:"\u83b7\u53d6\u5931\u8d25",description:t.data});else{if(null===t.data||0===t.data.length)return"\u68c0\u9a8c\u6807\u51c6\u4fe1\u606f\u672a\u914d\u7f6e",void F["a"].info({title:"\u5f53\u524d\u68c0\u67e5\u9879\u76ee\u7684\u68c0\u9a8c\u6807\u51c6\u4fe1\u606f\u672a\u914d\u7f6e",content:"\u8bf7\u7ba1\u7406\u5458\u5728\u201c\u516c\u53f8\u7ba1\u7406-\u68c0\u9a8c\u6807\u51c6\u201d\u83dc\u5355\u914d\u7f6e",okText:"\u77e5\u9053\u4e86",onOk:function(){}});for(var a=t.data,n=[],l=0;l<a.length;l++)n.push({title:a[l].standarde,description:a[l].standardc,key:a[l].standarde})}e.setState({standards:n})}}),a({type:"checkResult/getTaskByReportNoAndInspway",payload:{reportno:n,inspway:t},callback:function(t){if(400===t.code)v["a"].open({message:"\u83b7\u53d6\u5931\u8d25",description:t.data});else{if(null===t.data||0===t.data.length)return void F["a"].info({title:"\u68c0\u9a8c\u4eba\u5458\u672a\u5b89\u6392\uff01",content:"\u8bf7\u5728\u201c\u4efb\u52a1\u6307\u6d3e-\u68c0\u9a8c\u4eba\u5458\u201d\u4e3a\u59d4\u6258\u5b89\u6392\u68c0\u9a8c\u4eba\u5458\uff01",okText:"\u77e5\u9053\u4e86",onOk:function(){}});for(var a=t.data,n=[],l=0;l<a.length;l++)n.push({key:a[l]})}e.setState({people:n})}})},e.isValidDate=function(e){return void 0!==e&&null!==e?N.a.createElement("span",null,z()(e).format("YYYY-MM-DD")):[]},e.onChange=function(t){"\u6309\u5355\u4ef7"===t.target.value||"\u6309\u6bd4\u4f8b"===t.target.value?e.setState({showPrice:!0}):e.setState({showPrice:!1})},e.handleChange=function(t,a,n){e.setState({targetStandards:t})},e.handleSelectChange=function(t,a){e.setState({selectedStandards:[].concat(y()(t),y()(a))})},e.handleChangeInstrument=function(t,a,n){e.setState({targetInstrument:t})},e.handleSelectChangeInstrument=function(t,a){e.setState({selectedInstrument:[].concat(y()(t),y()(a))})},e.handleChangePeople=function(t,a,n){e.setState({targetPeople:t})},e.handleSelectChangePeople=function(t,a){e.setState({selectedPeople:[].concat(y()(t),y()(a))})},e}return E()(a,[{key:"componentDidMount",value:function(){var e=this;this.setState({overallstate:sessionStorage.getItem("resultdetail_overallstate")});var t=this.props.dispatch,a=sessionStorage.getItem("reportno"),n=JSON.parse(localStorage.getItem("userinfo"));t({type:"checkResult/getCheckResult",payload:{reportno:a}}),t({type:"checkResult/getInstrument",payload:{certCode:n.certCode},callback:function(t){if(400===t.code)v["a"].open({message:"\u83b7\u53d6\u5931\u8d25",description:t.data});else for(var a=t.data,n=[],l=0;l<a.length;l++)n.push({key:a[l].diviceid,title:a[l].diviceid,description:a[l].divicename});e.setState({instrument:n})}}),t({type:"checkResult/getStandard",payload:{certCode:n.certCode},callback:function(t){if(400===t.code)v["a"].open({message:"\u83b7\u53d6\u5931\u8d25",description:t.data});else for(var a=t.data,n=[],l=0;l<a.length;l++)n.push({title:a[l].standarde,description:a[l].standardc,key:a[l].standarde});e.setState({standardsAll:n})}})}},{key:"render",value:function(){var e=this.props,t=e.checkResult,a=t.data,n=t.projectData,l=e.loading,r=e.form.getFieldDecorator,s=this.state,h=s.targetStandards,g=s.selectedStandards,y=s.standards,v=s.instrument,w=s.targetInstrument,k=s.selectedInstrument,b=s.people,S=s.targetPeople,E=s.selectedPeople,C=s.modalInfo,I=s.modalReviewVisible,R=s.modalType,Y={handleModalReviewVisible:this.handleModalReviewVisible},D=sessionStorage.getItem("reportno"),P=sessionStorage.getItem("shipname"),V=sessionStorage.getItem("applicant"),x=sessionStorage.getItem("resultdetail_quanlity"),O={reportno:D,shipname:P,applicant:V},K=n.map(function(e){return N.a.createElement(G,{key:e,value:e},e)});return N.a.createElement(q["a"],{text:O},N.a.createElement(_,f()({},Y,{modalReviewVisible:I,modalInfo:C})),N.a.createElement(F["a"],{title:"\u7ed3\u679c\u767b\u8bb0",visible:this.state.visible,onOk:this.handleOk,onCancel:this.handleCancel,width:.9*document.body.clientWidth,style:{top:10}},N.a.createElement(M["a"],null,N.a.createElement(u["a"],null,N.a.createElement(m["a"],{span:12},"\u65b0\u589e"===R?[N.a.createElement(M["a"].Item,{label:"\u7533\u8bf7\u9879\u76ee\uff1a",labelCol:{span:4},wrapperCol:{span:20},colon:!1},r("inspway",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u60a8\u8981\u767b\u8bb0\u7684\u68c0\u67e5\u9879\u76ee"}]})(N.a.createElement(A["a"],{showSearch:!0,placeholder:"\u8bf7\u9009\u62e9\u60a8\u8981\u767b\u8bb0\u7684\u68c0\u67e5\u9879\u76ee",filterOption:!1,onChange:this.onInspwayChange,style:{width:"98%"}},K)))]:[N.a.createElement(M["a"].Item,{label:"\u7533\u8bf7\u9879\u76ee\uff1a",labelCol:{span:4},wrapperCol:{span:20},colon:!1},r("inspway",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u60a8\u8981\u767b\u8bb0\u7684\u68c0\u67e5\u9879\u76ee"}]})(N.a.createElement(j["a"],{disabled:!0,style:{width:"98%"}})))]),N.a.createElement(m["a"],{span:8},N.a.createElement(M["a"].Item,{label:"\u91cd\u91cf\uff1a",labelCol:{span:4},wrapperCol:{span:20},colon:!1},r("weight",{rules:[{type:"number",transform:function(e){if(e)return Number(e)},message:"\u8bf7\u8f93\u5165\u6570\u5b57"}]})(N.a.createElement(j["a"],{style:{width:"98%"},placeholder:"\u672c\u6b21\u68c0\u67e5\u5982\u679c\u6709\u6570\u91cd\u91cf\u7ed3\u679c\uff0c\u8bf7\u8f93\u5165"})))),N.a.createElement(m["a"],{span:4},N.a.createElement(M["a"].Item,{labelCol:{span:4},wrapperCol:{span:20},colon:!1},N.a.createElement("span",null,"\u7533\u62a5\u6570\u91cf\uff1a",x)))),N.a.createElement(u["a"],null,N.a.createElement(m["a"],{span:24},N.a.createElement(M["a"].Item,{label:"\u6807\u51c6",labelCol:{span:2},wrapperCol:{span:22}},r("standard",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6807\u51c6"}]})(N.a.createElement(p["a"],{listStyle:{width:"45%"},dataSource:y,titles:["\u5f85\u9009\u6807\u51c6","\u5df2\u9009\u6807\u51c6"],targetKeys:h,selectedKeys:g,onChange:this.handleChange,onSelectChange:this.handleSelectChange,render:function(e){return"".concat(e.title,"-").concat(e.description)}}))))),N.a.createElement(u["a"],null,N.a.createElement(m["a"],{span:12},N.a.createElement(M["a"].Item,{label:"\u4eba\u5458",labelCol:{span:4},wrapperCol:{span:20}},r("inspman",{rules:[{required:!0,message:"\u8bf7\u4ece\u5de6\u8fb9\u7684\u6307\u6d3e\u68c0\u67e5\u4eba\u5458\u9009\u53d6\u5b9e\u9645\u53c2\u4e0e\u68c0\u67e5\u7684\u4eba\u5458"}]})(N.a.createElement(p["a"],{listStyle:{width:"45%"},dataSource:b,titles:["\u5f85\u9009\u4eba\u5458","\u5df2\u9009\u4eba\u5458"],searchPlaceholder:"\u8bf7\u4ece\u5de6\u8fb9\u7684\u6307\u6d3e\u68c0\u67e5\u4eba\u5458\u9009\u53d6\u5b9e\u9645\u53c2\u4e0e\u68c0\u67e5\u7684\u4eba\u5458",targetKeys:S,selectedKeys:E,onChange:this.handleChangePeople,onSelectChange:this.handleSelectChangePeople,render:function(e){return e.key}})))),N.a.createElement(m["a"],{span:12},N.a.createElement(M["a"].Item,{label:"\u4eea\u5668",labelCol:{span:4},wrapperCol:{span:20}},r("instrument",{})(N.a.createElement(p["a"],{listStyle:{width:"45%"},dataSource:v,titles:["\u5f85\u9009\u4eea\u5668","\u5df2\u9009\u4eea\u5668"],searchPlaceholder:"\u5de6\u8fb9\u9009\u53d6\u672c\u6b21\u68c0\u9a8c\u7684\u4eea\u5668\u8bbe\u5907",targetKeys:w,selectedKeys:k,onChange:this.handleChangeInstrument,onSelectChange:this.handleSelectChangeInstrument,render:function(e){return"".concat(e.title,"-").concat(e.description)}}))))),N.a.createElement(u["a"],null,N.a.createElement(m["a"],{span:12},N.a.createElement(M["a"].Item,{label:"\u5f00\u59cb\u65e5\u671f",labelCol:{span:4},wrapperCol:{span:20}},r("begindate",{})(N.a.createElement(c["a"],{placeholder:"\u5f00\u59cb\u65e5\u671f",style:{width:"98%"},format:"YYYY-MM-DD"})))),N.a.createElement(m["a"],{span:12},N.a.createElement(M["a"].Item,{label:"\u7ed3\u675f\u65e5\u671f",labelCol:{span:4},wrapperCol:{span:20}},r("finishdate",{})(N.a.createElement(c["a"],{placeholder:"\u7ed3\u675f\u65e5\u671f",style:{width:"98%"},format:"YYYY-MM-DD"}))))),N.a.createElement(u["a"],null,N.a.createElement(M["a"].Item,{label:"\u7ed3\u679c\u63cf\u8ff0",labelCol:{span:2},wrapperCol:{span:22}},r("result",{})(N.a.createElement(X,{style:{minHeight:32},rows:5,placeholder:"\u8bf7\u5c06\u672c\u6b21\u68c0\u67e5\u7684\u8fc7\u7a0b\u7ed3\u679c\u3001\u5f02\u5e38\u60c5\u51b5\u548c\u539f\u56e0\u5206\u6790\u7b49\u7b80\u8ff0\u5982\u4e0b\uff0c\u4e0d\u8d85\u8fc7500\u5b57----\u975e\u5fc5\u586b\u9879"})))))),N.a.createElement(i["a"],{bordered:!1,size:"small"},N.a.createElement(u["a"],null,N.a.createElement(m["a"],{span:22},"\u5df2\u53d1\u5e03"===this.state.overallstate||"\u7533\u8bf7\u4f5c\u5e9f"===this.state.overallstate?[]:[N.a.createElement(T["a"],{style:{marginBottom:12},type:"primary",onClick:this.show},"\u65b0\u5efa")]),N.a.createElement(m["a"],{span:2},N.a.createElement(T["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},N.a.createElement(d["a"],{type:"left"}),"\u8fd4\u56de"))),N.a.createElement("div",{className:Q.a.tableList},N.a.createElement(o["a"],{size:"middle",loading:l,dataSource:a,columns:"\u5df2\u53d1\u5e03"===this.state.overallstate||"\u7533\u8bf7\u4f5c\u5e9f"===this.state.overallstate?this.columns2:this.columns,rowKey:"keyno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(J["PureComponent"]),r=s))||r)||r);t["default"]=U}}]);