export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // Entrustment
      { path: '/', redirect: '/Entrustment/ApplicationForEntrustment',authority: ['admin', 'user']},

      // // 证书
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     }
      //   ],
      // },
      // //newPage
      // {
      //   path: "/Certificate",
      //   icon: "file",
      //   name: "Certificate",
      //   routes: [
      //     {
      //       path: "/Certificate/Certificate",
      //       name: "Certificate",
      //       component: "./Certificate/Certificate"
      //     }
      //   ],
      // },
      {
        path: "/Entrustment",
        icon: "file",
        name: "Entrustment",
        authority: ['admin', 'user'],
        routes: [
          {
            path: "/Entrustment/ApplicationForEntrustment",
            name: "ApplicationForEntrustment",
            component: "./Entrustment/ApplicationForEntrustment"
          },
          {
            path: "/Entrustment/SearchForEntrustment",
            name: "SearchForEntrustment",
            component: "./Entrustment/SearchForEntrustment"
          },
          {
            path: "/Entrustment/CancelForEntrustment",
            name: "CancelForEntrustment",
            component: "./Entrustment/CancelForEntrustment"
          },
          {
            path: "/Entrustment/DetailForEntrustment",
            name: "DetailForEntrustment",
            component: "./Entrustment/DetailForEntrustment",
            hideInMenu: 'true', //添加页不需要在menu上显示
          },
          {
            path: "/Entrustment/ModifyForEntrustment",
            name: "ModifyForEntrustment",
            component: "./Entrustment/ModifyForEntrustment",
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          // {
          //   path: "/Entrustment/CopyForEntrustment",
          //   name: "CopyForEntrustment",
          //   component: "./Entrustment/CopyForEntrustment",
          //   hideInMenu: 'true',//添加页不需要在menu上显示
          // },
          {
            path: "/Entrustment/CopyForEntrustmentList",
            name: "CopyForEntrustmentList",
            component: "./Entrustment/CopyForEntrustmentList",
          },
          {
            path: '/Entrustment/SubEntrustment',
            name: 'SubEntrustment',
            component: './Entrustment/SubEntrustment',
          },
          {
            path: '/Entrustment/EntrustmentRelevance',
            name: 'EntrustmentRelevance',
            component: './Entrustment/EntrustmentRelevance',
          },
          {
            path: '/Entrustment/DetailForSub',
            name: 'DetailForSub',
            component: './Entrustment/DetailForSub',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Entrustment/ModifyRelevance',
            name: 'ModifyRelevance',
            component: './Entrustment/ModifyRelevance',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
        ],
      },


      // // list
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     }
      //   ],
      // },

      // TaskAppoint
      {
        path: '/TaskAppoint',
        icon: 'table',
        name: 'TaskAppoint',
        routes: [
          {
            path: '/TaskAppoint/CustomerService',
            name: 'CustomerService',
            component: './TaskAppoint/CustomerService',
          },
          {
            path: '/TaskAppoint/Inspector',
            name: 'Inspector',
            component: './TaskAppoint/Inspector',
          },
          {
            path: '/TaskAppoint/CustomerServiceDetail',
            name: 'CustomerServiceDetail',
            component: './TaskAppoint/CustomerServiceDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/TaskAppoint/InspectorDetail',
            name: 'InspectorDetail',
            component: './TaskAppoint/InspectorDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
        ],
      },
      //BusinessTransfer
      // {
      //   path: '/BusinessTransfer',
      //   icon: 'dashboard',
      //   name: 'BusinessTransfer',
      //   routes: [
      //     {
      //       path: '/BusinessTransfer/SubEntrustment',
      //       name: 'SubEntrustment',
      //       component: './BusinessTransfer/SubEntrustment',
      //     },
      //     {
      //       path: '/BusinessTransfer/EntrustmentRelevance',
      //       name: 'EntrustmentRelevance',
      //       component: './BusinessTransfer/EntrustmentRelevance',
      //     },
      //     {
      //       path: '/BusinessTransfer/DetailForSub',
      //       name: 'DetailForSub',
      //       component: './BusinessTransfer/DetailForSub',
      //       hideInMenu: 'true',//添加页不需要在menu上显示
      //     },
      //     {
      //       path: '/BusinessTransfer/ModifyRelevance',
      //       name: 'ModifyRelevance',
      //       component: './BusinessTransfer/ModifyRelevance',
      //       hideInMenu: 'true',//添加页不需要在menu上显示
      //     },
      //   ],
      // },
      //
      {
        path: '/TestRecord',
        icon: 'form',
        name: 'TestRecord',
        routes: [
          {
            path: '/TestRecord/ResultRegistration',
            name: 'ResultRegistration',
            component: './TestRecord/ResultRegistration',
          },
          {
            path: '/TestRecord/ResultDetail',
            name: 'ResultDetail',
            component: './TestRecord/ResultDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/TestRecord/RecordUpload',
            name: 'RecordUpload',
            component: './TestRecord/RecordUpload',
          },
          {
            path: '/TestRecord/UploadDetail',
            name: 'UploadDetail',
            component: './TestRecord/UploadDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
        ],
      },
            // SampleRegister
      {
        path: '/SampleRegister',
        icon: 'profile',
        name: 'SampleRegister',
        routes: [
          {
            path: '/SampleRegister/SampleRegister',
            name: 'SampleRegister',
            component: './SampleRegister/SampleRegister',
          },
          {
            path: '/SampleRegister/SampleQuery',
            name: 'SampleQuery',
            component: './SampleRegister/SampleQuery',
          },
          {
            path: '/SampleRegister/SampleDestory',
            name: 'SampleDestory',
            component: './SampleRegister/SampleDestory',
          },
          {
            path: '/SampleRegister/SampleRegisterDetail',
            name: 'SampleRegisterDetail',
            component: './SampleRegister/SampleRegisterDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
        ],
      },
      // {
      //   path: '/UEditor',
      //   icon: 'table',
      //   name: 'UEditor',
      //   routes: [
      //     {
      //       path: '/UEditor/UEditorText',
      //       name: 'UEditorText',
      //       component: './UEditor/UEditorText',
      //     },
      //   ],
      // },
      {
        path: '/InspectionAnalysis',
        icon: 'table',
        name: 'InspectionAnalysis',
        routes: [
          {
            path: '/InspectionAnalysis/InspectionArrangement',
            name: 'InspectionArrangement',
            component: './InspectionAnalysis/InspectionArrangement',
          },
          {
            path: '/InspectionAnalysis/InspectionArrangementDetail',
            name: 'InspectionArrangementDetail',
            component: './InspectionAnalysis/InspectionArrangementDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/InspectionAnalysis/SampleIndex',
            name: 'SampleIndex',
            component: './InspectionAnalysis/SampleIndex',
          },
          {
            path: '/InspectionAnalysis/SampleDetail',
            name: 'SampleDetail',
            component: './InspectionAnalysis/SampleDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/InspectionAnalysis/SampleModify',
            name: 'SampleModify',
            component: './InspectionAnalysis/SampleModify',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/InspectionAnalysis/ResultUpdate',
            name: 'ResultUpdate',
            component: './InspectionAnalysis/ResultUpdate',
          },
          {
            path: '/InspectionAnalysis/ResultUpdateDetail',
            name: 'ResultUpdateDetail',
            component: './InspectionAnalysis/ResultUpdateDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
        ],
      },


      // Charge
      {
        path: '/Charge',
        icon: 'profile',
        name: 'Charge',
        routes: [
          {
            path: '/Charge/FinalPrice',
            name: 'FinalPrice',
            component: './Charge/FinalPrice',
          },
          {
            path: '/Charge/FinalPriceDetail',
            name: 'FinalPriceDetail',
            component: './Charge/FinalPriceDetail',
          },
          {
            path: '/Charge/ListFiction',
            name: 'ListFiction',
            component: './Charge/ListFiction',
          },
          {
            path: '/Charge/ListReview',
            name: 'ListReview',
            component: './Charge/ListReview',
          },
          {
            path: '/Charge/ListFictionAdd',
            name: 'ListFictionAdd',
            component: './Charge/ListFictionAdd',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Charge/ListFictionReview',
            name: 'ListFictionReview',
            component: './Charge/ListFictionReview',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/Charge/Invoice',
            name: 'Invoice',
            component: './Charge/Invoice',
          },

          {
            path: '/Charge/ListPay',
            name: 'ListPay',
            component: './Charge/ListPay',
          },

          {
            path: '/Charge/Cost',
            name: 'Cost',
            component: './Charge/Cost',
          },

          {
            path: '/Charge/CostEdit',
            name: 'CostEdit',
            component: './Charge/CostEdit',
          },

          {
            path: '/Charge/DetailList',
            name: 'DetailList',
            component: './Charge/DetailList',
           // hideInMenu: 'true',//添加页不需要在menu上显示
          },

        ],
      },

      //Certificate
      {
        path: '/Certificate',
        icon: 'profile',
        name: 'Certificate',
        routes: [
          {
            path: '/Certificate/CertificateUpload',
            name: 'CertificateUpload',
            component: './Certificate/CertificateUpload',
          },
          {
            path: '/Certificate/CertificateUploadDetail',
            name: 'CertificateUploadDetail',
            component: './Certificate/CertificateUploadDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
        ],
      },

      //Archives
      {
        path: '/Archives',
        icon: 'profile',
        name: 'Archives',
        routes: [
          {
            path: '/Archives/ArchivesAdd',
            name: 'ArchivesAdd',
            component: './Archives/ArchivesAdd',
          },
          {
            path: '/Archives/ArchivesDestory',
            name: 'ArchivesDestory',
            component: './Archives/ArchivesDestory',
          },
          {
            path: '/Archives/ArchivesQuery',
            name: 'ArchivesQuery',
            component: './Archives/ArchivesQuery',
          },

        ],
      },

      {
        component: '404',
      },
    ],
  },
];
