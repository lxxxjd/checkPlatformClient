(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[138],{GqBr:function(t,e,n){"use strict";n.r(e);var s=n("p0pE"),a=n.n(s),o=n("d6i3"),i=n.n(o),c=n("lUgV");e["default"]={namespace:"incomeDistribution",state:{selectListInfosByConditionsResult:[],selectListInfoTotalByConditionsResult:{}},effects:{selectListInfosByConditions:i.a.mark(function t(e,n){var s,a,o,l,r;return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return s=e.payload,a=e.callback,o=n.call,l=n.put,t.next=4,o(c["c"],s);case 4:return r=t.sent,t.next=7,l({type:"selectListInfosByConditionsResult",payload:r});case 7:a&&a(r.data);case 8:case"end":return t.stop()}},t)}),selectListInfoTotalByConditions:i.a.mark(function t(e,n){var s,a,o,l,r;return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return s=e.payload,a=e.callback,o=n.call,l=n.put,t.next=4,o(c["b"],s);case 4:return r=t.sent,t.next=7,l({type:"selectListInfoTotalByConditionsResult",payload:r});case 7:a&&a(r.data);case 8:case"end":return t.stop()}},t)})},reducers:{selectListInfosByConditionsResult:function(t,e){var n=e.payload;return a()({},t,{selectListInfosByConditionsResult:n.data})},selectListInfoTotalByConditionsResult:function(t,e){var n=e.payload;return a()({},t,{selectListInfoTotalByConditionsResult:n.data})}}}}}]);