(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[113],{nzxe:function(e,t,n){"use strict";n.r(t);n("IzEo");var a,r,i,l,o=n("bx4M"),s=(n("g9YV"),n("wCAj")),c=n("jehZ"),u=n.n(c),d=(n("14J3"),n("BMrR")),m=(n("Pwec"),n("CtXQ")),p=(n("jCWc"),n("kPKH")),f=(n("miYZ"),n("tsqr")),h=n("2Taf"),g=n.n(h),y=n("vZ4D"),v=n.n(y),b=n("MhPg"),R=n.n(b),I=n("l4Ni"),E=n.n(I),w=n("ujKo"),x=n.n(w),k=(n("2qtc"),n("kLXV")),S=(n("bP8k"),n("gFTJ")),V=(n("+L6B"),n("2/Rp")),C=(n("y8nQ"),n("Vl3Y")),T=n("q1tI"),M=n.n(T),A=n("MuoO"),L=n("zHco"),P=n("RdVf"),O=n.n(P);n("wd/R");function q(e){return function(){var t,n=x()(e);if(j()){var a=x()(this).constructor;t=Reflect.construct(n,arguments,a)}else t=n.apply(this,arguments);return E()(this,t)}}function j(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var z=C["a"].create()(function(e){var t=e.modalReviewVisible,n=e.handleModalReviewVisible,a=e.modalInfo;return M.a.createElement(k["a"],{destroyOnClose:!0,title:"\u67e5\u770b\u6307\u6807\u8be6\u60c5",visible:t,width:.7*document.body.clientWidth,height:.7*document.body.clientHeight,style:{top:100},onCancel:function(){return n()},footer:[M.a.createElement(V["a"],{type:"primary",onClick:function(){return n()}},"\u5173\u95ed")]},M.a.createElement(S["a"],{bordered:!0},M.a.createElement(S["a"].Item,{label:"\u59d4\u6258\u7f16\u53f7"},a.reportno),M.a.createElement(S["a"].Item,{label:"\u6837\u54c1\u7f16\u53f7"},a.sampleno),M.a.createElement(S["a"].Item,{label:"\u6307\u6807\u540d\u79f0"},a.itemC),M.a.createElement(S["a"].Item,{label:"\u82f1\u6587\u540d\u79f0"},a.itemE),M.a.createElement(S["a"].Item,{label:"\u68c0\u6d4b\u6807\u51c6"},a.teststandard),M.a.createElement(S["a"].Item,{label:"\u7ed3\u679c\u5355\u4f4d"},a.unit),M.a.createElement(S["a"].Item,{label:"\u53c2\u8003\u503c"},a.referValue),M.a.createElement(S["a"].Item,{label:"\u5141\u8bb8\u6d6e\u52a8"},a.rangeValue),M.a.createElement(S["a"].Item,{label:"\u6bd4\u8f83\u65b9\u6cd5"},a.calWay),M.a.createElement(S["a"].Item,{label:"\u68c0\u6d4b\u7ed3\u679c"},a.testresult),M.a.createElement(S["a"].Item,{label:"\u7ed3\u679c\u504f\u5dee"},a.diffvalue),M.a.createElement(S["a"].Item,{label:"\u68c0\u6d4b\u4eba\u5458"},a.inspector),M.a.createElement(S["a"].Item,{label:"\u6240\u7528\u4eea\u5668"},a.instrument)))}),B=(a=Object(A["connect"])(function(e){var t=e.inspectionAnalysis,n=e.loading;return{inspectionAnalysis:t,loading:n.models.inspectionAnalysis}}),r=C["a"].create(),a(i=r((l=function(e){R()(n,e);var t=q(n);function n(){var e;g()(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return e=t.call.apply(t,[this].concat(r)),e.state={dataSource:[],modalReviewVisible:!1,modalInfo:{}},e.columns=[{title:"\u6307\u6807\u4e2d\u6587",dataIndex:"itemC",render:function(t,n){return e.setRedText(t,n)}},{title:"\u6307\u6807\u82f1\u6587",dataIndex:"itemE",render:function(t,n){return e.setRedText(t,n)}},{title:"\u5355\u4f4d",dataIndex:"unit",render:function(t,n){return e.setRedText(t,n)}},{title:"\u7ed3\u679c",dataIndex:"testresult",render:function(t,n){return e.setRedText(t,n)}},{title:"\u53c2\u8003\u503c",dataIndex:"referValue",render:function(t,n){return e.setRedText(t,n)}},{title:"\u5141\u8bb8\u6d6e\u52a8",dataIndex:"rangeValue",render:function(t,n){return e.setRedText(t,n)}},{title:"\u5dee\u503c",dataIndex:"diffvalue",render:function(t,n){return e.setRedText(t,n)}},{title:"\u68c0\u6d4b\u4eba\u5458",dataIndex:"inspector",render:function(t,n){return e.setRedText(t,n)}},{title:"\u72b6\u6001",dataIndex:"qualityErr",render:function(t,n){return e.setRedText(t,n)}},{title:"\u64cd\u4f5c",render:function(t,n){return M.a.createElement(T["Fragment"],null,M.a.createElement("a",{onClick:function(){return e.handleReview(t,n)}},"\u67e5\u770b"))}}],e.handleReview=function(t,n){e.state.modalInfo=n,e.handleModalReviewVisible(t)},e.handleModalReviewVisible=function(t){e.setState({modalReviewVisible:!!t})},e.init=function(){var t=e.props.dispatch,n=sessionStorage.getItem("reportno"),a=sessionStorage.getItem("sampleno");t({type:"inspectionAnalysis/getAllDetails",payload:{reportno:n,sampleno:a},callback:function(t){if(t&&void 0!==t.length){for(var n=0;n<t.length;n++)void 0!==t[n].testresult&&null!==t[n].testresult||(t[n].testresult=0);e.state.dataSource=t}}})},e.setRedText=function(e,t){return"\u5f02\u5e38"===t.qualityErr?M.a.createElement("span",{style:{color:"red"}},e):M.a.createElement("span",null,e)},e.setRowClassName=function(e){return"\u5f02\u5e38"===e.qualityErr?O.a.rowStyle:null},e.reviewPass=function(){var t=e.props.dispatch,n=sessionStorage.getItem("reportno"),a=sessionStorage.getItem("sampleno");k["a"].confirm({title:"\u786e\u5b9a\u5ba1\u6838\u901a\u8fc7\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){t({type:"inspectionAnalysis/reviewSampleRegister",payload:{reportno:n,sampleno:a},callback:function(e){"success"===e?f["a"].success("\u590d\u6838\u901a\u8fc7"):f["a"].error("\u590d\u6838\u5931\u8d25")}})}})},e.reviewReturn=function(){var t=e.props.dispatch,n=sessionStorage.getItem("reportno"),a=sessionStorage.getItem("sampleno");k["a"].confirm({title:"\u786e\u5b9a\u5ba1\u6838\u9000\u56de\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){t({type:"inspectionAnalysis/returnSampleRegister",payload:{reportno:n,sampleno:a},callback:function(e){"success"===e?f["a"].success("\u9000\u56de\u6210\u529f"):f["a"].error("\u64cd\u4f5c\u5931\u8d25")}})}})},e.back=function(){e.props.history.goBack()},e}return v()(n,[{key:"componentDidMount",value:function(){this.init()}},{key:"render",value:function(){var e=this.props.loading,t={handleModalSaveListVisible:this.handleModalSaveListVisible,handleSaveList:this.handleSaveList,handleVisible:this.handleVisible,handleOk:this.handleOk,handleModalReviewVisible:this.handleModalReviewVisible},n=this.state,a=n.dataSource,r=n.modalReviewVisible,i=n.modalInfo,l=sessionStorage.getItem("reportno"),c=sessionStorage.getItem("shipname"),f=sessionStorage.getItem("sampleno"),h=sessionStorage.getItem("result_review_pass_or_return"),g={reportno:l,shipname:c,sampleno:f};return M.a.createElement(L["a"],{text:g},M.a.createElement(o["a"],{bordered:!1,size:"small"},M.a.createElement(d["a"],null,M.a.createElement(p["a"],{sm:22},"pass"===h?M.a.createElement(V["a"],{style:{marginBottom:12,marginRight:12},type:"primary",onClick:this.reviewPass},"\u901a\u8fc7"):[],"return"===h?M.a.createElement(V["a"],{style:{marginBottom:12,marginRight:12},type:"primary",onClick:this.reviewReturn},"\u9000\u56de"):[]),M.a.createElement(p["a"],{span:2},M.a.createElement(V["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},M.a.createElement(m["a"],{type:"left"}),"\u8fd4\u56de"))),M.a.createElement(z,u()({},t,{modalReviewVisible:r,modalInfo:i})),M.a.createElement("div",{className:O.a.tableList},M.a.createElement(s["a"],{dataSource:a,columns:this.columns,pagination:{showQuickJumper:!0,showSizeChanger:!0},loading:e,rowKey:"keyno",rowClassName:this.setRowClassName}))))}}]),n}(T["PureComponent"]),i=l))||i)||i);t["default"]=B}}]);