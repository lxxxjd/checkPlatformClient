(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[114],{gZ96:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,i,l,r,s=a("bx4M"),o=(a("g9YV"),a("wCAj")),c=a("jehZ"),d=a.n(c),u=(a("14J3"),a("BMrR")),m=(a("Pwec"),a("CtXQ")),p=(a("jCWc"),a("kPKH")),f=a("gWZ8"),v=a.n(f),h=(a("/xke"),a("TeRw")),g=a("p0pE"),y=a.n(g),b=a("2Taf"),E=a.n(b),S=a("vZ4D"),w=a.n(S),k=a("l4Ni"),I=a.n(k),C=a("ujKo"),V=a.n(C),R=a("MhPg"),x=a.n(R),L=a("Y/ft"),O=a.n(L),M=(a("O3gP"),a("lrIw")),D=(a("5NDa"),a("5rEg")),A=(a("2qtc"),a("kLXV")),F=(a("bP8k"),a("gFTJ")),N=(a("+L6B"),a("2/Rp")),P=(a("OaEy"),a("2fM7")),q=(a("y8nQ"),a("Vl3Y")),J=a("q1tI"),T=a.n(J),U=a("MuoO"),B=a("zHco"),j=a("RdVf"),z=a.n(j),W=a("sURl"),Z=a.n(W);a("17x9"),a("wd/R");function H(e){return function(){var t,a=V()(e);if(K()){var n=V()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return I()(this,t)}}function K(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}q["a"].Item;var Q=P["a"].Option,Y=q["a"].create()(function(e){var t=e.modalReviewVisible,a=e.handleModalReviewVisible,n=e.modalInfo;return T.a.createElement(A["a"],{destroyOnClose:!0,title:"\u67e5\u770b\u5177\u4f53\u6307\u6807",visible:t,width:.6*document.body.clientWidth,height:.6*document.body.clientHeight,style:{top:100},onCancel:function(){return a()},footer:[T.a.createElement(N["a"],{type:"primary",onClick:function(){return a()}},"\u5173\u95ed")]},T.a.createElement(F["a"],{bordered:!0},T.a.createElement(F["a"].Item,{label:"\u59d4\u6258\u7f16\u53f7"},n.reportno),T.a.createElement(F["a"].Item,{label:"\u6837\u54c1\u7f16\u53f7"},n.sampleno)))}),X=q["a"].create()(function(e){var t=e.form,a=e.modalSaveListVisible,n=e.handleModalSaveListVisible,i=e.handleSaveList,l=e.reviewUsersOptions,r=function(){t.validateFields(function(e,a){e||(i(a),t.resetFields(),n())})};return T.a.createElement(A["a"],{destroyOnClose:!0,title:"\u63d0\u4ea4\u5ba1\u6838",visible:a,style:{top:100},width:500,onCancel:function(){return n()},footer:[T.a.createElement(N["a"],{type:"primary",onClick:function(){return n()}},"\u5173\u95ed"),T.a.createElement(N["a"],{type:"primary",onClick:function(){return r()}},"\u4fdd\u5b58")]},T.a.createElement(q["a"],null,T.a.createElement(q["a"].Item,{labelCol:{span:6},wrapperCol:{span:16},label:"\u5ba1\u6838\u4eba\uff1a"},t.getFieldDecorator("reviewer",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5ba1\u6838\u4eba"}]})(T.a.createElement(P["a"],{placeholder:"\u8bf7\u9009\u62e9\u5ba1\u6838\u4eba"},l)))))}),G=q["a"].create()(function(e){var t=e.form,a=e.visible,n=e.handleVisible,i=e.handleOk,l=(e.result,e.testDetail),r=e.instrumentsOptions,s=e.inspmansOptions,o=function(){t.validateFields(function(e,a){e||(i(a),t.resetFields(),n())})};return T.a.createElement(A["a"],{destroyOnClose:!0,title:"\u5f55\u5165\u6837\u54c1\u6307\u6807",visible:a,style:{top:100},width:600,onCancel:function(){return n()},footer:[T.a.createElement(N["a"],{type:"primary",onClick:function(){return n()}},"\u5173\u95ed"),T.a.createElement(N["a"],{type:"primary",onClick:function(){return o()}},"\u4fdd\u5b58")]},T.a.createElement(q["a"],null,T.a.createElement(q["a"].Item,{label:"\u7ed3\u679c"},t.getFieldDecorator("result",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7ed3\u679c"}],initialValue:l.testresult})(T.a.createElement(D["a"],{placeholder:"\u8bf7\u8f93\u5165\u7ed3\u679c"}))),T.a.createElement(q["a"].Item,{label:"\u68c0\u6d4b\u4eba\u5458"},t.getFieldDecorator("inspector",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u68c0\u6d4b\u4eba\u5458"}],initialValue:l.inspector})(T.a.createElement(M["a"],{className:"global-search",dataSource:s},T.a.createElement(D["a"],{style:{width:"100%"}})))),T.a.createElement(q["a"].Item,{label:"\u4eea\u5668\u8bbe\u5907"},t.getFieldDecorator("instrument",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u4eea\u5668\u8bbe\u5907"}],initialValue:l.instrument})(T.a.createElement(M["a"],{className:"global-search",dataSource:r},T.a.createElement(D["a"],{style:{width:"100%"}}))))))}),$=T.a.createContext(),_=function(e){var t=e.form,a=(e.index,O()(e,["form","index"]));return T.a.createElement($.Provider,{value:t},T.a.createElement("tr",a))},ee=q["a"].create()(_),te=function(e){x()(a,e);var t=H(a);function a(){var e;E()(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return e=t.call.apply(t,[this].concat(i)),e.state={editing:!1},e.toggleEdit=function(){var t=!e.state.editing;e.setState({editing:t},function(){t&&e.input.focus()})},e.save=function(t){var a=e.props,n=a.record,i=a.handleSave;e.form.validateFields(function(a,l){a&&a[t.currentTarget.id]||(e.toggleEdit(),i(y()({},n,l)))})},e.renderCell=function(t){e.form=t;var a=e.props,n=a.children,i=a.dataIndex,l=a.record,r=a.title,s=a.inspmans,o=a.instruments,c=e.state.editing,d=s.map(function(e){return T.a.createElement(Q,{key:e,value:e},e)}),u=o.map(function(e){return T.a.createElement(Q,{key:e,value:e},e)}),m=function(e){return"inspector"===e?d:"instrument"===e?u:null};return c?T.a.createElement(q["a"].Item,{style:{margin:0}},t.getFieldDecorator(i,{rules:[{required:!0,message:"".concat(r," is required.")}],initialValue:l[i]})(T.a.createElement(M["a"],{className:"global-search",dataSource:m(i)},T.a.createElement(D["a"],{style:{width:"100%"},ref:function(t){return e.input=t},onPressEnter:e.save,onBlur:e.save})))):T.a.createElement("div",{className:Z.a.editableCellValueWrap,style:{paddingRight:24},onClick:e.toggleEdit},n," \xa0")},e}return w()(a,[{key:"render",value:function(){var e=this.props,t=e.editable,a=(e.dataIndex,e.title,e.record,e.index,e.handleSave,e.children),n=O()(e,["editable","dataIndex","title","record","index","handleSave","children"]);return T.a.createElement("td",n,t?T.a.createElement($.Consumer,null,this.renderCell):a)}}]),a}(T.a.Component),ae=(n=Object(U["connect"])(function(e){var t=e.inspectionAnalysis,a=e.loading;return{inspectionAnalysis:t,loading:a.models.inspectionAnalysis}}),i=q["a"].create(),n(l=i((r=function(e){x()(a,e);var t=H(a);function a(){var e;E()(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return e=t.call.apply(t,[this].concat(i)),e.state={formValues:{},visible:!1,testDetail:{},dataSource:[],modalSaveListVisible:!1,modalReviewVisible:!1,reviewUsers:[],modalInfo:{},inspmans:[],instruments:[]},e.columns=[{title:"\u6307\u6807\u540d\u79f0",dataIndex:"itemC"},{title:"\u68c0\u6d4b\u6807\u51c6",dataIndex:"teststandard"},{title:"\u5355\u4f4d",dataIndex:"unit"},{title:"\u53c2\u8003\u503c",dataIndex:"referValue"},{title:"\u7ed3\u679c",dataIndex:"testresult",editable:!0},{title:"\u6bd4\u8f83\u65b9\u6cd5",dataIndex:"calWay"},{title:"\u68c0\u6d4b\u4eba\u5458",dataIndex:"inspector",editable:!0},{title:"\u4eea\u5668\u8bbe\u5907",dataIndex:"instrument",editable:!0},{title:"\u64cd\u4f5c",render:function(t,a){return T.a.createElement(J["Fragment"],null,T.a.createElement("a",{onClick:function(){return e.modifyItem(t,a)}},"\u4fee\u6539\xa0\xa0"),T.a.createElement("a",{onClick:function(){return e.handleReview(t,a)}},"\u67e5\u770b"))}}],e.handleReview=function(t,a){e.state.modalInfo=a,e.handleModalReviewVisible(t)},e.handleModalReviewVisible=function(t){e.setState({modalReviewVisible:!!t})},e.init=function(){var t=e.props.dispatch,a=sessionStorage.getItem("reportno"),n=sessionStorage.getItem("sampleno");t({type:"inspectionAnalysis/getAllDetails",payload:{reportno:a,sampleno:n},callback:function(t){if(t&&void 0!==t.length){for(var a=0;a<t.length;a++)void 0!==t[a].testresult&&null!==t[a].testresult||(t[a].testresult=0);e.state.dataSource=t}}}),t({type:"inspectionAnalysis/getInspman",payload:{reportno:a,inspmanType:"\u68c0\u6d4b\u4eba\u5458"},callback:function(t){200===t.code&&(e.state.inspmans=t.data)}});var i=JSON.parse(localStorage.getItem("userinfo"));t({type:"inspectionAnalysis/getInstrumentIDName",payload:{certCode:i.certCode},callback:function(t){200===t.code&&(e.state.instruments=t.data)}})},e.back=function(){e.props.history.goBack()},e.handleModalSaveListVisible=function(t){e.setState({modalSaveListVisible:!!t})},e.handleSaveList=function(t){e.saveAll(t.reviewer)},e.handleOk=function(t){var a=e.state.testDetail,n=a,i=e.props.dispatch;n.testresult=t.result,n.instrument=t.instrument,n.inspector=t.inspector,i({type:"inspectionAnalysis/addResult",payload:n,callback:function(e){200===e.code?h["a"].open({message:"\u5f55\u5165\u6210\u529f"}):h["a"].open({message:"\u5f55\u5165\u5931\u8d25",description:e.data})}}),e.setState({visible:!1})},e.handleCancel=function(){e.setState({visible:!1})},e.handleVisible=function(t){e.setState({visible:!!t})},e.modifyItem=function(t){e.setState({testDetail:t}),e.handleVisible(!0)},e.openSaveModal=function(){var t=e.props.dispatch,a=JSON.parse(localStorage.getItem("userinfo"));t({type:"user/getMan",payload:{certcode:a.certCode,func:"\u7ed3\u679c\u590d\u6838"},callback:function(t){void 0===t||null===t||0===t.length?A["a"].info({title:"\u5b9e\u9a8c\u5ba4\u4e3b\u4efb\u4fe1\u606f\u672a\u914d\u7f6e",content:"\u8bf7\u7ba1\u7406\u5458\u5728\u201c\u516c\u53f8\u7ba1\u7406-\u7528\u6237\u7ba1\u7406\u201d\u83dc\u5355\u914d\u7f6e\uff0c\u5e76\u5728\u89d2\u8272\u4e2d\u52a0\u9009\u5b9e\u9a8c\u5ba4\u4e3b\u4efb\u89d2\u8272\uff01",okText:"\u77e5\u9053\u4e86",onOk:function(){}}):(e.setState({reviewUsers:t}),e.handleModalSaveListVisible(!0))}})},e.handleSave=function(t){var a=v()(e.state.dataSource),n=a.findIndex(function(e){return t.keyno===e.keyno}),i=a[n];a.splice(n,1,y()({},i,t)),e.setState({dataSource:a})},e.saveAll=function(t){for(var a=e.state.dataSource,n=[],i=0,l=0;l<a.length;l++)n.push(a[l]),null!==a[l].testresult&&void 0!==a[l].testresult&&"0"!==a[l].testresult||(i=1);1===i?A["a"].confirm({title:"\u5b58\u5728\u6307\u6807\u7ed3\u679c\u4e3a0\uff0c\u786e\u8ba4\u63d0\u4ea4\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){e.saveAllList(t,n)}}):e.saveAllList(t,n)},e.saveAllList=function(t,a){var n=JSON.parse(localStorage.getItem("userinfo")),i=e.props.dispatch,l={details:a,reviewer:t,certcode:n.certCode};i({type:"inspectionAnalysis/saveResultList",payload:l,callback:function(t){"success"===t?(h["a"].open({message:"\u4fdd\u5b58\u6210\u529f"}),e.init()):h["a"].open({message:"\u4fdd\u5b58\u5931\u8d25",description:t.data})}})},e}return w()(a,[{key:"componentDidMount",value:function(){this.init()}},{key:"render",value:function(){var e=this,t=this.props.loading,a=this.state,n=a.visible,i=a.dataSource,l=a.modalSaveListVisible,r=a.reviewUsers,c=a.testDetail,f=a.modalReviewVisible,v=a.modalInfo,h=a.instruments,g=a.inspmans,b=r.map(function(e){return T.a.createElement(Q,{value:e.userName},e.nameC)}),E=h.map(function(e){return T.a.createElement(Q,{key:e,value:e},e)}),S=g.map(function(e){return T.a.createElement(Q,{key:e,value:e},e)}),w={handleModalSaveListVisible:this.handleModalSaveListVisible,handleSaveList:this.handleSaveList,handleVisible:this.handleVisible,handleOk:this.handleOk,handleModalReviewVisible:this.handleModalReviewVisible},k=sessionStorage.getItem("reportno"),I=sessionStorage.getItem("shipname"),C=sessionStorage.getItem("sampleno"),V={reportno:k,shipname:I,sampleno:C},R={body:{row:ee,cell:te}},x=this.columns.map(function(t){return t.editable?y()({},t,{onCell:function(a){return{record:a,editable:t.editable,dataIndex:t.dataIndex,title:t.title,handleSave:e.handleSave,selectable:t.selectable,inspmans:g,instruments:h}}}):t});return T.a.createElement(B["a"],{text:V},T.a.createElement(s["a"],{bordered:!1,size:"small"},T.a.createElement(u["a"],null,T.a.createElement(p["a"],{sm:22},T.a.createElement(N["a"],{style:{marginBottom:12,marginRight:12},type:"primary",onClick:this.openSaveModal},"\u63d0\u4ea4"),T.a.createElement(N["a"],{style:{marginBottom:12,marginRight:12},type:"primary",onClick:this.init},"\u91cd\u7f6e")),T.a.createElement(p["a"],{span:2},T.a.createElement(N["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},T.a.createElement(m["a"],{type:"left"}),"\u8fd4\u56de"))),T.a.createElement(X,d()({},w,{modalSaveListVisible:l,reviewUsersOptions:b})),T.a.createElement(G,d()({},w,{visible:n,testDetail:c,instrumentsOptions:E,inspmansOptions:S})),T.a.createElement(Y,d()({},w,{modalReviewVisible:f,modalInfo:v})),T.a.createElement("div",{className:z.a.tableList},T.a.createElement(o["a"],{size:"middle",components:R,dataSource:i,columns:x,pagination:{showQuickJumper:!0,showSizeChanger:!0},loading:t,rowKey:"keyno"}))))}}]),a}(J["PureComponent"]),l=r))||l)||l);t["default"]=ae},sURl:function(e,t,a){e.exports={"editable-cell":"antd-pro-pages-inspection-analysis-result-update-editable-cell","editable-cell-value-wrap":"antd-pro-pages-inspection-analysis-result-update-editable-cell-value-wrap","editable-row":"antd-pro-pages-inspection-analysis-result-update-editable-row"}}}]);