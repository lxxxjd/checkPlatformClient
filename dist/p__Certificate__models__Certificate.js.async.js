(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[29],{SHCy:function(e,a,t){"use strict";t.r(a);var n=t("p0pE"),r=t.n(n),c=t("d6i3"),l=t.n(c),s=t("r1PW"),u=t("0ESM"),o=t("b9LB"),p=t("D33k"),d=t("1l/V"),i=t.n(d),f=t("t3Un");t("Qyje");function y(e){return w.apply(this,arguments)}function w(){return w=i()(l.a.mark(function e(a){return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(f["a"])("/api/readrecord/getAllReadRecords",{method:"POST",data:a}));case 1:case"end":return e.stop()}},e)})),w.apply(this,arguments)}a["default"]={namespace:"certificate",state:{data:[],recordData:[],signData:{},ossPdfResult:{},report:[],sampleDataResult:{},checkResultData:{},sampleDetailForLinkResult:{},checkResultForLinkResult:{},recordinfoResult:{},pdfResult:{},pdfByOssPathResult:{},getMainInfoResult:{},convertWortToPdfResult:{},getModelSelectNameResult:{},getAllUserListByCertCodeResult:{},undoCertResult:{},makeCertFileResult:{},downloadQualityTempResult:{},publishCertResult:{},getAllReadRecordsResult:{},applyAbandonResult:{},abandonCertResult:{}},effects:{getRepeatName:l.a.mark(function e(a,t){var n,r,c,u;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,t.put,e.next=4,c(s["q"],n);case 4:u=e.sent,r&&r(u.data);case 6:case"end":return e.stop()}},e)}),getAbandonApplyReason:l.a.mark(function e(a,t){var n,r,c,u;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,t.put,e.next=4,c(s["g"],n);case 4:u=e.sent,r&&r(u.data);case 6:case"end":return e.stop()}},e)}),abandonCert:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["a"],n);case 4:return o=e.sent,e.next=7,u({type:"abandonCertResult",payload:o});case 7:r&&r(o.data);case 8:case"end":return e.stop()}},e)}),applyAbandon:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["b"],n);case 4:return o=e.sent,e.next=7,u({type:"applyAbandonResult",payload:o});case 7:r&&r(o.data);case 8:case"end":return e.stop()}},e)}),getAllReadRecords:l.a.mark(function e(a,t){var n,r,c,s,u;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,s=t.put,e.next=4,c(y,n);case 4:return u=e.sent,e.next=7,s({type:"getAllReadRecordsResult",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),makeCertFile:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["u"],n);case 4:return o=e.sent,e.next=7,u({type:"makeCertFileResult",payload:o});case 7:r&&r(o);case 8:case"end":return e.stop()}},e)}),undoCert:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["B"],n);case 4:return o=e.sent,e.next=7,u({type:"undoCertResult",payload:o});case 7:r&&r(o.data);case 8:case"end":return e.stop()}},e)}),getAllUserListByCertCode:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["h"],n);case 4:return o=e.sent,e.next=7,u({type:"getAllUserListByCertCodeResult",payload:o});case 7:r&&r(o.data);case 8:case"end":return e.stop()}},e)}),convertWordToPdf:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["c"],n);case 4:return o=e.sent,e.next=7,u({type:"convertWortToPdfResult",payload:o});case 7:r&&r(o.data);case 8:case"end":return e.stop()}},e)}),getCertReports:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["j"],n);case 4:return o=e.sent,e.next=7,u({type:"getCertReport",payload:o});case 7:r&&r(o.data);case 8:case"end":return e.stop()}},e)}),getCertFiles:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["i"],n);case 4:return o=e.sent,e.next=7,u({type:"getCertFile",payload:o});case 7:r&&r(o.data);case 8:case"end":return e.stop()}},e)}),uploadCertFile:l.a.mark(function e(a,t){var n,r,c,u;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,t.put,e.next=4,c(s["C"],n);case 4:u=e.sent,r&&r(u);case 6:case"end":return e.stop()}},e)}),uploadCertFilePdf:l.a.mark(function e(a,t){var n,r,c,u;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,t.put,e.next=4,c(s["D"],n);case 4:u=e.sent,r&&r(u);case 6:case"end":return e.stop()}},e)}),publishCert:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["v"],n);case 4:return o=e.sent,e.next=7,u({type:"publishCertResult",payload:o});case 7:r&&r(o.data);case 8:case"end":return e.stop()}},e)}),deleteCertFile:l.a.mark(function e(a,t){var n,r,c,u;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,t.put,e.next=4,c(s["d"],n);case 4:u=e.sent,r&&r(u);case 6:case"end":return e.stop()}},e)}),signCertFile:l.a.mark(function e(a,t){var n,r,c,u;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,t.put,e.next=4,c(s["A"],n);case 4:u=e.sent,r&&r(u);case 6:case"end":return e.stop()}},e)}),reviewCertFile:l.a.mark(function e(a,t){var n,r,c,u;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,t.put,e.next=4,c(s["y"],n);case 4:u=e.sent,r&&r(u);case 6:case"end":return e.stop()}},e)}),sealCertFile:l.a.mark(function e(a,t){var n,r,c,u;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,t.put,e.next=4,c(s["z"],n);case 4:u=e.sent,r&&r(u);case 6:case"end":return e.stop()}},e)}),getSignature:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["t"],n);case 4:return o=e.sent,e.next=7,u({type:"getSignatureInfo",payload:o});case 7:r&&r(o);case 8:case"end":return e.stop()}},e)}),getMainInfo:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["m"],n);case 4:return o=e.sent,e.next=7,u({type:"getMainInfoResult",payload:o});case 7:r&&r(o.data);case 8:case"end":return e.stop()}},e)}),getOssPdf:l.a.mark(function e(a,t){var n,r,c,s,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,s=t.put,e.next=4,c(u["h"],n);case 4:return o=e.sent,e.next=7,s({type:"getOssPdfInfo",payload:o});case 7:r&&r(o);case 8:case"end":return e.stop()}},e)}),getReport:l.a.mark(function e(a,t){var n,r,c,s,u;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,s=t.put,e.next=4,c(o["r"],n);case 4:return u=e.sent,e.next=7,s({type:"get",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),getSampleDetailFetch:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["r"],n);case 4:return o=e.sent,e.next=7,u({type:"getSampleDetailResult",payload:o});case 7:r&&r(o);case 8:case"end":return e.stop()}},e)}),getSampleRegistersByReportNo:l.a.mark(function e(a,t){var n,r,c,s,u;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,s=t.put,e.next=4,c(p["e"],n);case 4:return u=e.sent,e.next=7,s({type:"getByReportNo",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),downloadQualityTemp:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["e"],n);case 4:return o=e.sent,e.next=7,u({type:"downloadQualityTempResult",payload:o});case 7:r&&r(o.data);case 8:case"end":return e.stop()}},e)}),downloadWeighTemp:l.a.mark(function e(a,t){var n,r,c,u;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,t.put,e.next=4,c(s["f"],n);case 4:u=e.sent,r&&r(u.data);case 6:case"end":return e.stop()}},e)}),getCheckResultFetch:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["k"],n);case 4:return o=e.sent,e.next=7,u({type:"getCheckResultData",payload:o});case 7:r&&r(o);case 8:case"end":return e.stop()}},e)}),getSampleDetailForLink:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["s"],n);case 4:return o=e.sent,e.next=7,u({type:"getSampleDetailForLinkResult",payload:o});case 7:r&&r(o);case 8:case"end":return e.stop()}},e)}),getCheckResultForLink:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["l"],n);case 4:return o=e.sent,e.next=7,u({type:"getCheckResultForLinkResult",payload:o});case 7:r&&r(o);case 8:case"end":return e.stop()}},e)}),getRecordInfo:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["p"],n);case 4:return o=e.sent,e.next=7,u({type:"getRecordInfoResult",payload:o});case 7:r&&r(o);case 8:case"end":return e.stop()}},e)}),getPdfUrlFetch:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["o"],n);case 4:return o=e.sent,e.next=7,u({type:"getPdfUrlResult",payload:o});case 7:r&&r(o);case 8:case"end":return e.stop()}},e)}),getPdfByOssPath:l.a.mark(function e(a,t){var n,r,c,u,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,u=t.put,e.next=4,c(s["n"],n);case 4:return o=e.sent,e.next=7,u({type:"getPdfByOssPathResult",payload:o});case 7:r&&r(o);case 8:case"end":return e.stop()}},e)}),getModelSelectName:l.a.mark(function e(a,t){var n,r,c,s,o;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,c=t.call,s=t.put,e.next=4,c(u["g"],n);case 4:return o=e.sent,e.next=7,s({type:"getRecordInfoResult",payload:o.data});case 7:r&&r(o.data);case 8:case"end":return e.stop()}},e)})},reducers:{getCertReport:function(e,a){var t=a.payload;return r()({},e,{data:t.data})},getCertFile:function(e,a){var t=a.payload;return r()({},e,{recordData:t.data})},get:function(e,a){var t=a.payload;return r()({},e,{report:t.data})},getSignatureInfo:function(e,a){var t=a.payload;return r()({},e,{signData:t.data})},getMainInfoResult:function(e,a){var t=a.payload;return r()({},e,{getMainInfoResult:t.data})},getOssPdfInfo:function(e,a){var t=a.payload;return r()({},e,{ossPdfResult:t.data})},getSampleDetailResult:function(e,a){var t=a.payload;return r()({},e,{sampleDataResult:t})},getCheckResultData:function(e,a){var t=a.payload;return r()({},e,{checkResultData:t})},getSampleDetailForLinkResult:function(e,a){var t=a.payload;return r()({},e,{sampleDetailForLinkResult:t})},getCheckResultForLinkResult:function(e,a){var t=a.payload;return r()({},e,{checkResultForLinkResult:t})},getRecordInfoResult:function(e,a){var t=a.payload;return r()({},e,{recordinfoResult:t})},getPdfUrlResult:function(e,a){var t=a.payload;return r()({},e,{pdfResult:t})},getPdfByOssPathResult:function(e,a){var t=a.payload;return r()({},e,{pdfByOssPathResult:t})},convertWortToPdfResult:function(e,a){var t=a.payload;return r()({},e,{convertWortToPdfResult:t.data})},getModelSelectNameResult:function(e,a){var t=a.payload;return r()({},e,{getModelSelectNameResult:t.data})},getAllUserListByCertCodeResult:function(e,a){var t=a.payload;return r()({},e,{getAllUserListByCertCodeResult:t.data})},undoCertResult:function(e,a){var t=a.payload;return r()({},e,{undoCertResult:t.data})},makeCertFileResult:function(e,a){var t=a.payload;return r()({},e,{makeCertFileResult:t})},downloadQualityTempResult:function(e,a){var t=a.payload;return r()({},e,{downloadQualityTempResult:t.data})},publishCertResult:function(e,a){var t=a.payload;return r()({},e,{publishCertResult:t.data})},getAllReadRecordsResult:function(e,a){var t=a.payload;return r()({},e,{getAllReadRecordsResult:t.data})},applyAbandonResult:function(e,a){var t=a.payload;return r()({},e,{applyAbandonResult:t.data})},abandonCertResult:function(e,a){var t=a.payload;return r()({},e,{abandonCertResult:t.data})}}}}}]);