(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[66],{"2oMN":function(t,e,a){"use strict";a.r(e);var n=a("p0pE"),r=a.n(n),s=a("d6i3"),u=a.n(s),c=a("1l/V"),p=a.n(c),l=a("t3Un");a("Qyje");function i(t){return d.apply(this,arguments)}function d(){return d=p()(u.a.mark(function t(e){return u.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",Object(l["a"])("/api/testman/getTestmanList",{method:"POST",data:r()({},e)}));case 1:case"end":return t.stop()}},t)})),d.apply(this,arguments)}function o(t){return m.apply(this,arguments)}function m(){return m=p()(u.a.mark(function t(e){return u.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",Object(l["a"])("/api/testman/addTestman",{method:"POST",data:r()({},e)}));case 1:case"end":return t.stop()}},t)})),m.apply(this,arguments)}function f(t){return w.apply(this,arguments)}function w(){return w=p()(u.a.mark(function t(e){return u.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",Object(l["a"])("/api/testman/updateTestman",{method:"POST",data:r()({},e)}));case 1:case"end":return t.stop()}},t)})),w.apply(this,arguments)}function h(t){return y.apply(this,arguments)}function y(){return y=p()(u.a.mark(function t(e){return u.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",Object(l["a"])("/api/testman/deleteTestman",{method:"POST",data:r()({},e)}));case 1:case"end":return t.stop()}},t)})),y.apply(this,arguments)}e["default"]={namespace:"testman",state:{getTestmanListResult:{},addTestmanResult:{},updateTestmanResult:{},deleteTestmanResult:{}},effects:{getTestmanList:u.a.mark(function t(e,a){var n,r,s,c,p;return u.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=e.callback,s=a.call,c=a.put,t.next=4,s(i,n);case 4:return p=t.sent,t.next=7,c({type:"getDepartmentListResult",payload:p});case 7:r&&r(p);case 8:case"end":return t.stop()}},t)}),addTestman:u.a.mark(function t(e,a){var n,r,s,c,p;return u.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=e.callback,s=a.call,c=a.put,t.next=4,s(o,n);case 4:return p=t.sent,t.next=7,c({type:"addDepartmentResult",payload:p});case 7:r&&r(p.data);case 8:case"end":return t.stop()}},t)}),updateTestman:u.a.mark(function t(e,a){var n,r,s,c,p;return u.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=e.callback,s=a.call,c=a.put,t.next=4,s(f,n);case 4:return p=t.sent,t.next=7,c({type:"updateDepartmentResult",payload:p});case 7:r&&r(p.data);case 8:case"end":return t.stop()}},t)}),deleteTestman:u.a.mark(function t(e,a){var n,r,s,c,p;return u.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=e.callback,s=a.call,c=a.put,t.next=4,s(h,n);case 4:return p=t.sent,t.next=7,c({type:"deleteDepartmentResult",payload:p});case 7:r&&r(p.data);case 8:case"end":return t.stop()}},t)})},reducers:{getTestmanListResult:function(t,e){var a=e.payload;return r()({},t,{getTestmanListResult:a})},addTestmanResult:function(t,e){var a=e.payload;return r()({},t,{addTestmanResult:a.data})},updateTestmanResult:function(t,e){var a=e.payload;return r()({},t,{updateTestmanResult:a.data})},deleteTestmanResult:function(t,e){var a=e.payload;return r()({},t,{deleteTestmanResult:a.data})}}}}}]);