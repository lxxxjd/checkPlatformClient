(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[125],{zbj6:function(e,a,t){"use strict";t.r(a);var n=t("p0pE"),r=t.n(n),s=t("d6i3"),c=t.n(s),l=t("D33k");a["default"]={namespace:"sample",state:{data:{list:[],pagination:{}},sampleDetail:{list:[],pagination:{}},addData:{},deleteResult:{},selectRegisterResult:{list:[],pagination:{}},selectRegisterDestory:{list:[],pagination:{}},stateResult:{},updateResult:{}},effects:{getRepeatSampleNo:c.a.mark(function e(a,t){var n,r,s,p;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,s=t.call,t.put,e.next=4,s(l["d"],n);case 4:p=e.sent,r&&r(p.data);case 6:case"end":return e.stop()}},e)}),getSampleRegister:c.a.mark(function e(a,t){var n,r,s,p,u;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,s=t.call,p=t.put,e.next=4,s(l["c"],n);case 4:return u=e.sent,e.next=7,p({type:"getSampleRegisterInfo",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),getSampleRegistersByReportNo:c.a.mark(function e(a,t){var n,r,s,p,u;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,s=t.call,p=t.put,e.next=4,s(l["e"],n);case 4:return u=e.sent,e.next=7,p({type:"getByReportNo",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),addSamleRegister:c.a.mark(function e(a,t){var n,r,s,p,u;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,s=t.call,p=t.put,e.next=4,s(l["a"],n);case 4:return u=e.sent,e.next=7,p({type:"addRegister",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),deleteSamleRegister:c.a.mark(function e(a,t){var n,r,s,p,u;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,s=t.call,p=t.put,e.next=4,s(l["b"],n);case 4:return u=e.sent,e.next=7,p({type:"deleteRegister",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),getSampleRegisterByConditions:c.a.mark(function e(a,t){var n,r,s,p,u;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,s=t.call,p=t.put,e.next=4,s(l["g"],n);case 4:return u=e.sent,e.next=7,p({type:"selectRegisterByConditions",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),selectSampleByConditionsDestory:c.a.mark(function e(a,t){var n,r,s,p,u;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,s=t.call,p=t.put,e.next=4,s(l["f"],n);case 4:return u=e.sent,e.next=7,p({type:"selectByConditionsDestory",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),setSampleStatus:c.a.mark(function e(a,t){var n,r,s,p,u;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,s=t.call,p=t.put,e.next=4,s(l["h"],n);case 4:return u=e.sent,e.next=7,p({type:"setStatus",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),updateSampleRegistersFetch:c.a.mark(function e(a,t){var n,r,s,p,u;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,s=t.call,p=t.put,e.next=4,s(l["i"],n);case 4:return u=e.sent,e.next=7,p({type:"updateSampleRegistersInfo",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)})},reducers:{getSampleRegisterInfo:function(e,a){var t=a.payload;return r()({},e,{data:t.data})},getByReportNo:function(e,a){var t=a.payload;return r()({},e,{sampleDetail:t.data})},addRegister:function(e,a){var t=a.payload;return r()({},e,{addData:t.data})},deleteRegister:function(e,a){var t=a.payload;return r()({},e,{deleteResult:t.data})},selectRegisterByConditions:function(e,a){var t=a.payload;return r()({},e,{selectRegisterResult:t.data})},selectByConditionsDestory:function(e,a){var t=a.payload;return r()({},e,{selectRegisterDestory:t.data})},setStatus:function(e,a){var t=a.payload;return r()({},e,{stateResult:t.data})},updateSampleRegistersInfo:function(e,a){var t=a.payload;return r()({},e,{updateResult:t.data})}}}}}]);