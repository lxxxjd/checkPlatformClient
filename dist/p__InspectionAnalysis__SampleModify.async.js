(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[119],{L6HO:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,o,l,s=a("bx4M"),i=(a("5NDa"),a("5rEg")),r=(a("g9YV"),a("wCAj")),c=(a("14J3"),a("BMrR")),d=(a("Pwec"),a("CtXQ")),m=(a("jCWc"),a("kPKH")),p=(a("+L6B"),a("2/Rp")),u=(a("2qtc"),a("kLXV")),g=(a("/xke"),a("TeRw")),y=a("eHn4"),f=a.n(y),h=a("2Taf"),S=a.n(h),I=a("vZ4D"),E=a.n(I),v=a("MhPg"),C=a.n(v),w=a("l4Ni"),k=a.n(w),x=a("ujKo"),D=a.n(x),R=(a("OaEy"),a("2fM7")),b=(a("y8nQ"),a("Vl3Y")),A=a("q1tI"),V=a.n(A),F=a("MuoO"),K=a("3a4m"),M=a.n(K),O=a("zHco"),N=a("RdVf"),L=a.n(N),z=a("p0pE"),J=a.n(z),B=a("e+8u"),W=a.n(B);function T(e){return function(){var t,a=D()(e);if(P()){var n=D()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return k()(this,t)}}function P(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var Q,q,j,H,X=b["a"].Item,Y=R["a"].Option,Z=(n=Object(F["connect"])(function(e){var t=e.inspectionAnalysis,a=e.loading;return{inspectionAnalysis:t,loading:a.models.inspectionAnalysis}}),n((l=function(e){C()(a,e);var t=T(a);function a(){var e;S()(this,a);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return e=t.call.apply(t,[this].concat(o)),e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,o=a.form,l=a.cargoname,s=JSON.parse(localStorage.getItem("userinfo")).certCode;o.validateFields(function(e,t){if(console.log(e),!e){var a=J()({},t,{cargoname:l,certCode:s});n({type:"inspectionAnalysis/getSamplesByFilter",payload:a})}})},e.handleFormReset=function(){var t=e.props,a=t.form,n=t.applicant,o=t.cargoname;a.resetFields();var l=JSON.parse(localStorage.getItem("userinfo")),s=e.props.dispatch;s({type:"inspectionAnalysis/getSamplesByFilter",payload:{kind:"applicant",value:n,cargoname:o,certCode:l.certCode}})},e}return E()(a,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return V.a.createElement(b["a"],{onSubmit:this.handleSearch,layout:"inline",style:{marginBottom:5}},V.a.createElement(c["a"],{gutter:{md:8,lg:24,xl:48}},V.a.createElement(m["a"],{span:6},V.a.createElement(b["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{initialValue:"applicant",rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(V.a.createElement(R["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},V.a.createElement(Y,{value:"applicant"},"\u59d4\u6258\u4eba"),V.a.createElement(Y,{value:"shipname"},"\u8239\u540d"),V.a.createElement(Y,{value:"sampleno"},"\u6837\u54c1\u7f16\u53f7"),V.a.createElement(Y,{value:"samplename"},"\u6837\u54c1\u540d\u79f0"))))),V.a.createElement(m["a"],{span:8},V.a.createElement(X,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(V.a.createElement(i["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),V.a.createElement(m["a"],{md:8,sm:20},V.a.createElement("span",{className:W.a.submitButtons},V.a.createElement(p["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),V.a.createElement(p["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}}]),a}(A["PureComponent"]),o=l))||o),G=Z;function U(e){return function(){var t,a=D()(e);if($()){var n=D()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return k()(this,t)}}function $(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}b["a"].Item;var _=R["a"].Option,ee=b["a"].create()(G),te=(Q=Object(F["connect"])(function(e){var t=e.inspectionAnalysis,a=e.loading;return{inspectionAnalysis:t,loading:a.models.inspectionAnalysis}}),q=b["a"].create(),Q(j=q((H=function(e){C()(a,e);var t=U(a);function a(){var e;S()(this,a);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return e=t.call.apply(t,[this].concat(o)),e.state={formValues:{},addMany:!1,modify:!1,onDelete:!1,selectedRowKeys:[],deleteRowKeys:[],data:[],standard:[],itemName:[],onLoad:!1,onDetail:!1,testDetail:null,orfixed:!1},e.columns=[{title:"\u6307\u6807\u540d\u79f0",dataIndex:"itemC"},{title:"\u82f1\u6587\u540d\u79f0",dataIndex:"itemE"},{title:"\u68c0\u6d4b\u6807\u51c6",dataIndex:"teststandard"},{title:"\u5355\u4f4d",dataIndex:"unit"},{title:"\u53c2\u8003\u503c",dataIndex:"referValue"},{title:"\u6bd4\u8f83\u65b9\u6cd5",dataIndex:"calWay"},{title:"\u4e0a\u4e0b\u6d6e\u52a8",dataIndex:"rangeValue"},{title:"\u5f3a\u5236",dataIndex:"orFixed"},{title:"\u64cd\u4f5c",render:function(t,a){return V.a.createElement(A["Fragment"],null,V.a.createElement("a",{onClick:function(){return e.modifyItem(t,a)}},"\u4fee\u6539 \xa0\xa0"),V.a.createElement("a",{onClick:function(){return e.deleteOne(t,a)}},"\u5220\u9664"))}}],e.columns2=[{title:"\u6307\u6807\u540d\u79f0",dataIndex:"itemC"},{title:"\u82f1\u6587\u540d\u79f0",dataIndex:"itemE"},{title:"\u68c0\u6d4b\u6807\u51c6",dataIndex:"teststandard"},{title:"\u5355\u4f4d",dataIndex:"unit"},{title:"\u53c2\u8003\u503c",dataIndex:"referValue"},{title:"\u6bd4\u8f83\u65b9\u6cd5",dataIndex:"calWay"},{title:"\u4e0a\u4e0b\u6d6e\u52a8",dataIndex:"rangeValue"},{title:"\u5f3a\u5236",dataIndex:"orFixed"}],e.modifyItem=function(t){var a=e.props,n=a.dispatch,o=a.form,l=sessionStorage.getItem("cargoname");JSON.parse(localStorage.getItem("userinfo"));n({type:"inspectionAnalysis/getTestStandard",payload:{cargoname:l,item:t.itemC}}),o.setFieldsValue(f()({},"teststandard",t.teststandard)),o.setFieldsValue(f()({},"referValue",t.referValue)),o.setFieldsValue(f()({},"rangeValue",t.rangeValue)),o.setFieldsValue(f()({},"calWay",t.calWay)),e.setState({testDetail:t}),"\u662f"===t.orFixed?e.setState({orfixed:!0}):e.setState({orfixed:!1}),e.setState({modify:!0})},e.modify=function(t){var a=e.state.testDetail,n=e.props,o=n.dispatch,l=n.form;o({type:"inspectionAnalysis/getDetailByKeyno",payload:{keyno:a.keyno},callback:function(t){if(200===t.code){var a=t.data;l.validateFields(function(t,n){t||(a.teststandard=n.teststandard,a.referValue=n.referValue,a.calWay=n.calWay,a.rangeValue=n.rangeValue,o({type:"inspectionAnalysis/modifyDetail",payload:a,callback:function(t){200===t.code?(g["a"].open({message:"\u4fee\u6539\u6210\u529f"}),e.componentDidMount()):g["a"].open({message:"\u4fee\u6539\u5931\u8d25",description:t.message})}}))}),l.resetFields(),e.setState({modify:!1})}else g["a"].open({message:"\u4fee\u6539\u5931\u8d25",description:t.message})}})},e.deleteOne=function(t){u["a"].confirm({title:"\u786e\u5b9a\u5220\u9664\u6b64\u6307\u6807\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){var a=e.props.dispatch;a({type:"inspectionAnalysis/deleteDetailItem",payload:{keyno:t.keyno},callback:function(t){200===t.code?(e.componentDidMount(),g["a"].open({message:"\u5220\u9664\u6210\u529f"})):g["a"].open({message:"\u5220\u9664\u5931\u8d25",description:t.data})}})}})},e.deleteItem=function(t){var a=e.props.dispatch,n=[];n.push(t.keyno),a({type:"inspectionAnalysis/deleteDetails",payload:{deleteRowKeys:n},callback:function(t){200===t.code?(e.componentDidMount(),g["a"].open({message:"\u5220\u9664\u6210\u529f"})):g["a"].open({message:"\u5220\u9664\u5931\u8d25",description:t.data})}})},e.columns1=[{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate"},{title:"\u59d4\u6258\u4eba",dataIndex:"applicant"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u6837\u54c1\u540d\u79f0",dataIndex:"samplename"},{title:"\u6837\u54c1\u7f16\u53f7",dataIndex:"sampleno"},{title:"\u64cd\u4f5c",render:function(t,a){return V.a.createElement(A["Fragment"],null,V.a.createElement("a",{onClick:function(){return e.loadItem(t,a)}},"\u5bfc\u5165"),"\xa0\xa0",V.a.createElement("a",{onClick:function(){return e.detailItem(t,a)}},"\u67e5\u770b"))}}],e.loadItem=function(t){var a=e.props.dispatch,n=sessionStorage.getItem("reportno"),o=sessionStorage.getItem("sampleno"),l=sessionStorage.getItem("cargoname");a({type:"inspectionAnalysis/loadDetails",payload:{targetReportNo:n,targetSampleNo:o,sourceReportNo:t.reportno,sourceSampleNo:t.sampleno,cargonameC:l},callback:function(t){200===t.code?(e.componentDidMount(),g["a"].open({message:"\u5bfc\u5165\u6210\u529f"})):g["a"].open({message:"\u5bfc\u5165\u5931\u8d25",description:t.message})}}),e.handleCancel()},e.detailItem=function(t){var a=e.props.dispatch,n=t.reportno,o=t.sampleno;a({type:"inspectionAnalysis/getDetails",payload:{reportno:n,sampleno:o}}),e.setState({onDetail:!0})},e.columns3=[{title:"\u6307\u6807\u540d\u79f0",dataIndex:"itemC"},{title:"\u82f1\u6587\u540d\u79f0",dataIndex:"itemE"},{title:"\u68c0\u6d4b\u6807\u51c6",dataIndex:"standard"},{title:"\u5355\u4f4d",dataIndex:"unit"},{title:"\u53c2\u8003\u503c",dataIndex:"referValue"},{title:"\u6bd4\u8f83\u65b9\u6cd5",dataIndex:"calWay"},{title:"\u662f\u5426\u5f3a\u5236",dataIndex:"orFixed"}],e.back=function(){M.a.push({pathname:"/InspectionAnalysis/SampleIndex"})},e.handleCancel=function(){e.setState({modify:!1}),e.setState({addMany:!1}),e.setState({onDelete:!1}),e.setState({onLoad:!1}),e.componentDidMount()},e.handleCancelDetail=function(){e.setState({onDetail:!1})},e.showAddMany=function(){var t=e.props,a=t.dispatch,n=(t.form,sessionStorage.getItem("reportno")),o=sessionStorage.getItem("sampleno"),l=sessionStorage.getItem("cargoname");e.setState({addMany:!0}),a({type:"inspectionAnalysis/getItems",payload:{reportno:n,sampleno:o,cargonameC:l}}),e.setState({selectedRowKeys:[]})},e.showDelete=function(){e.setState({onDelete:!0}),e.setState({deleteRowKeys:[]})},e.onSelectChange=function(t){e.setState({selectedRowKeys:t})},e.onDeleteChange=function(t){e.setState({deleteRowKeys:t})},e.delete=function(){var t=e.state.deleteRowKeys,a=e.props.dispatch;a({type:"inspectionAnalysis/deleteDetails",payload:{deleteRowKeys:t},callback:function(t){200===t.code?(e.componentDidMount(),g["a"].open({message:"\u5220\u9664\u6210\u529f"})):g["a"].open({message:"\u5220\u9664\u5931\u8d25",description:t.data})}}),e.setState({onDelete:!1})},e.handleChange=function(t){var a=e.props,n=a.dispatch,o=a.form,l=sessionStorage.getItem("cargoname");n({type:"inspectionAnalysis/getStandards",payload:{itemC:t,cargonameC:l},callback:function(t){e.setState({standard:t.data})}}),o.setFieldsValue({standard:null})},e.addMany=function(){var t=sessionStorage.getItem("reportno"),a=sessionStorage.getItem("sampleno"),n=sessionStorage.getItem("cargoname"),o=e.state.selectedRowKeys,l=e.props,s=l.dispatch;l.inspectionAnalysis.items;s({type:"inspectionAnalysis/addDetails",payload:{reportno:t,sampleno:a,cargonameC:n,selectedRowKeys:o},callback:function(t){200===t.code?(g["a"].open({message:"\u6dfb\u52a0\u6210\u529f"}),e.componentDidMount()):g["a"].open({message:"\u6dfb\u52a0\u5931\u8d25",description:t.data})}}),e.setState({addMany:!1})},e.showLoad=function(){e.setState({onLoad:!0});var t=sessionStorage.getItem("applicant"),a=sessionStorage.getItem("cargoname"),n=JSON.parse(localStorage.getItem("userinfo")).certCode,o=e.props.dispatch;o({type:"inspectionAnalysis/getSamplesByFilter",payload:{kind:"applicant",value:t,cargoname:a,certCode:n}})},e}return E()(a,[{key:"componentDidMount",value:function(){var e=this.props.dispatch,t=sessionStorage.getItem("reportno"),a=sessionStorage.getItem("sampleno");e({type:"inspectionAnalysis/getAllDetails",payload:{reportno:t,sampleno:a}})}},{key:"render",value:function(){var e=this.props,t=e.inspectionAnalysis,a=t.detail,n=t.items,o=t.reportSample,l=t.details,g=t.testStandards,y=e.loading,f=e.form.getFieldDecorator,h=this.state,S=h.addMany,I=h.onDelete,E=h.selectedRowKeys,v=h.standard,C=h.itemName,w=h.deleteRowKeys,k=h.onLoad,x=h.onDetail,D=h.modify,A=g.map(function(e){return V.a.createElement(_,{key:e.standard,value:e.standard},e.standard)}),F=sessionStorage.getItem("reportno"),K=sessionStorage.getItem("cargoname"),M=sessionStorage.getItem("sampleno"),N=sessionStorage.getItem("applicant"),z={reportno:F,cargoname:K,sampleno:M,applicant:N},J=(v.map(function(e){return V.a.createElement(_,{key:e,value:e},e)}),C.map(function(e){return V.a.createElement(_,{key:e,value:e},e)}),{selectedRowKeys:E,onChange:this.onSelectChange}),B={deleteRowKeys:w,onChange:this.onDeleteChange};return V.a.createElement(O["a"],{text:z},V.a.createElement(s["a"],{bordered:!1},V.a.createElement(c["a"],null,V.a.createElement(m["a"],{sm:22},V.a.createElement(p["a"],{style:{marginBottom:12,marginRight:12},type:"primary",onClick:this.showAddMany},"\u6dfb\u52a0"),V.a.createElement(p["a"],{style:{marginBottom:12,marginRight:12},type:"primary",onClick:this.showDelete},"\u6279\u91cf\u5220\u9664"),V.a.createElement(p["a"],{style:{marginBottom:12,marginRight:12},type:"primary",onClick:this.showLoad},"\u5bfc\u5165")),V.a.createElement(m["a"],{span:2},V.a.createElement(p["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},V.a.createElement(d["a"],{type:"left"}),"\u8fd4\u56de"))),V.a.createElement("div",{className:L.a.tableList},V.a.createElement(r["a"],{size:"middle",loading:y,dataSource:a,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns,rowKey:"reportno"})),V.a.createElement(u["a"],{title:"\u6279\u91cf\u6dfb\u52a0",visible:S,onOk:this.addMany,onCancel:this.handleCancel,width:1e3,okText:"\u6dfb\u52a0"},V.a.createElement(r["a"],{size:"middle",rowKey:"keyno",loading:y,dataSource:n,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns3,rowSelection:J})),V.a.createElement(u["a"],{title:"\u5220\u9664",visible:I,onOk:this.delete,onCancel:this.handleCancel,width:1e3,okText:"\u5220\u9664"},V.a.createElement(r["a"],{size:"middle",rowKey:"keyno",loading:y,dataSource:a,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns2,rowSelection:B})),V.a.createElement(u["a"],{title:"\u5bfc\u5165",visible:k,onOk:this.handleCancel,onCancel:this.handleCancel,width:1e3},V.a.createElement("div",{className:L.a.tableListForm},V.a.createElement(ee,{applicant:N,cargoname:K})),V.a.createElement(r["a"],{size:"middle",rowKey:"keyno",loading:y,dataSource:o,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns1})),V.a.createElement(u["a"],{title:"\u4fee\u6539\u6837\u54c1\u6807\u51c6",visible:D,onOk:this.modify,onCancel:this.handleCancel,width:400},V.a.createElement(b["a"],null,V.a.createElement(b["a"].Item,{label:"\u68c0\u9a8c\u6807\u51c6"},f("teststandard",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u68c0\u9a8c\u6807\u51c6"}]})(V.a.createElement(R["a"],{showSearch:!0,placeholder:"\u8bf7\u9009\u62e9"},A))),V.a.createElement(b["a"].Item,{label:"\u53c2\u8003\u503c"},f("referValue",{rules:[{required:!1,message:"\u8bf7\u8f93\u5165\u6570\u503c"}]})(V.a.createElement(i["a"],{disabled:this.state.orfixed}))),V.a.createElement(b["a"].Item,{label:"\u6bd4\u8f83\u65b9\u6cd5"},f("calWay",{rules:[{required:!1,message:"\u8bf7\u9009\u62e9\u6bd4\u8f83\u65b9\u6cd5"}]})(V.a.createElement(R["a"],{placeholder:"\u8bf7\u9009\u62e9\u6bd4\u8f83\u65b9\u6cd5",disabled:this.state.orfixed},V.a.createElement(_,{value:"\u5c0f\u4e8e"},"\u5c0f\u4e8e"),V.a.createElement(_,{value:"\u5c0f\u4e8e\u7b49\u4e8e"},"\u5c0f\u4e8e\u7b49\u4e8e"),V.a.createElement(_,{value:"\u5927\u4e8e"},"\u5927\u4e8e"),V.a.createElement(_,{value:"\u5927\u4e8e\u7b49\u4e8e"},"\u5927\u4e8e\u7b49\u4e8e"),V.a.createElement(_,{value:"\u7b49\u4e8e"},"\u7b49\u4e8e"),V.a.createElement(_,{value:"\u8303\u56f4\u5185"},"\u8303\u56f4\u5185")))),V.a.createElement(b["a"].Item,{label:"\u5141\u8bb8\u6d6e\u52a8"},f("rangeValue",{rules:[{required:!1,message:"\u8bf7\u8f93\u5165\u6570\u503c"}]})(V.a.createElement(i["a"],{disabled:this.state.orfixed}))))),V.a.createElement(u["a"],{title:"\u6307\u6807\u8be6\u60c5",visible:x,onCancel:this.handleCancelDetail,footer:null,width:900},V.a.createElement(r["a"],{size:"middle",rowKey:"keyno",loading:y,dataSource:l,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns3}))))}}]),a}(A["PureComponent"]),j=H))||j)||j);t["default"]=te}}]);