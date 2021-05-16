import { Select } from 'antd';
import React from 'react';

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

  //authority: ["总经理","业务副总","财务副总","操作经理","实验室主任","业务经理","财务经理","客服人员","检验人员","检测人员","财务人员","授权签字人","管理员"],
  // authority: ["总经理","管理员"],

  {
    path: '/home',
    component: '../layouts/BlankLayout',
    routes: [
      { path: '/home', redirect: '/home/homepage' },
      { path: '/home/homepage', name: 'homepage', component: './HomePage/HomePage' },
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
      { path: '/', redirect: '/home/homepage'},

      {
        path: '/Main',
        icon: 'profile',
        name: 'Main',
        routes: [
          {
            path: '/Main/Main',
            name: 'Main',
            component: './Main/Main',
          },
        ],
      },
      {
        //设置委托申请的权限
        path: "/Entrustment",
        icon: "file",
        name: "Entrustment",
        // authority: ["总经理","业务副总","财务副总","操作经理","实验室主任","业务经理","财务经理","客服人员","检验人员","检测人员","财务人员","授权签字人"],
        authority: ["总经理","业务副总","业务经理","客服人员"],
        routes: [
          {
            //网上委托
            path: '/Entrustment/AcceptList',
            name: 'AcceptList',
            component: './Entrustment/AcceptList',

          },
          //网上委托-受理或拒绝受理
          {
            path: '/Entrustment/Accept',
            name: 'Accept',
            component: './Entrustment/Accept',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            //新建委托
            path: "/Entrustment/ApplicationForEntrustment",
            name: "ApplicationForEntrustment",
            component: "./Entrustment/ApplicationForEntrustment"
          },
          {
            //修改委托
            path: "/Entrustment/SearchForEntrustment",
            name: "SearchForEntrustment",
            component: "./Entrustment/SearchForEntrustment"
          },
          {
            //复制委托-修改
            path: "/Entrustment/ModifyForEntrustment",
            name: "ModifyForEntrustment",
            component: "./Entrustment/ModifyForEntrustment",
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            //撤销委托
            path: "/Entrustment/CancelForEntrustment",
            name: "CancelForEntrustment",
            component: "./Entrustment/CancelForEntrustment",
            authority: ["总经理"],
          },
          {
            //显示委托详情
            path: "/Entrustment/DetailForEntrustment",
            name: "DetailForEntrustment",
            component: "./Entrustment/DetailForEntrustment",
            hideInMenu: 'true', //添加页不需要在menu上显示
          },

          {
            //复制委托
            path: "/Entrustment/CopyForEntrustmentList",
            name: "CopyForEntrustmentList",
            component: "./Entrustment/CopyForEntrustmentList",
          },
          {
            //复制委托-复制
            path: "/Entrustment/CopyForEntrustment",
            name: "CopyForEntrustment",
            component: "./Entrustment/copyForEntrustment",
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            //转委托
            path: '/Entrustment/SubEntrustment',
            name: 'SubEntrustment',
            component: './Entrustment/SubEntrustment',
          },
          {
            //转委托-转委托按钮
            path: '/Entrustment/DetailForSub',
            name: 'DetailForSub',
            component: './Entrustment/DetailForSub',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          //委托关联
          {
            path: '/Entrustment/EntrustmentRelevance',
            name: 'EntrustmentRelevance',
            component: './Entrustment/EntrustmentRelevance',
          },

          {
            path: '/Entrustment/ModifyRelevance',
            name: 'ModifyRelevance',
            component: './Entrustment/ModifyRelevance',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Entrustment/ModifyRelevance',
            name: 'ModifyRelevance',
            component: './Entrustment/ModifyRelevance',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Entrustment/EntrustmentRecord',
            name: 'EntrustmentRecord',
            component: './Entrustment/EntrustmentRecord',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Entrustment/DetailForUnAccept',
            name: 'DetailForUnAccept',
            component: './Entrustment/DetailForUnAccept',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

        ],
      },

      {
        //任务指派
        path: '/TaskAppoint',
        icon: 'table',
        name: 'TaskAppoint',
        authority: ["总经理","业务副总","操作经理","实验室主任","业务经理","客服人员","检验人员","检测人员"],
        routes: [
          {
            //客服人员
            path: '/TaskAppoint/CustomerService',
            name: 'CustomerService',
            component: './TaskAppoint/CustomerService',

          },
          {
            //检验人员
            path: '/TaskAppoint/Inspector',
            name: 'Inspector',
            component: './TaskAppoint/Inspector',
            // authority: ["总经理","业务副总","操作经理"],
          },
          {
            //客服人员-客服人员按钮
            path: '/TaskAppoint/CustomerServiceDetail',
            name: 'CustomerServiceDetail',
            component: './TaskAppoint/CustomerServiceDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
             // authority: ["总经理","业务副总","业务经理"],
          },
          {
            //检验人员-检验人员按钮
            path: '/TaskAppoint/InspectorDetail',
            name: 'InspectorDetail',
            component: './TaskAppoint/InspectorDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
            // authority: ["总经理","业务副总","业务经理"],
          },
        ],
      },

      {
        //现场检查
        path: '/TestRecord',
        icon: 'form',
        name: 'TestRecord',
        authority: ["总经理","业务副总","操作经理","实验室主任","业务经理","客服人员","检验人员","检测人员"],
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

      {
        //样品登记
        path: '/SampleRegister',
        icon: 'profile',
        name: 'SampleRegister',
        authority: ["总经理","业务副总","操作经理","实验室主任","业务经理","客服人员","检验人员","检测人员"],
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
            authority: ["总经理","业务副总","操作经理","实验室主任"],
          },
          {
            path: '/SampleRegister/SampleDestory',
            name: 'SampleDestory',
            component: './SampleRegister/SampleDestory',
            authority: ["总经理","业务副总","操作经理","实验室主任"],
          },
          {
            path: '/SampleRegister/SampleRegisterDetail',
            name: 'SampleRegisterDetail',
            component: './SampleRegister/SampleRegisterDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
        ],
      },

      {
        //分析测试
        path: '/InspectionAnalysis',
        icon: 'table',
        name: 'InspectionAnalysis',
        authority: ["总经理","业务副总","实验室主任","业务经理","客服人员","检测人员"],
        routes: [
          {
            //样品指标
            path: '/InspectionAnalysis/SampleIndex',
            name: 'SampleIndex',
            component: './InspectionAnalysis/SampleIndex',
          },
          {
            //样品指标 指标按钮
            path: '/InspectionAnalysis/SampleModify',
            name: 'SampleModify',
            component: './InspectionAnalysis/SampleModify',
            hideInMenu: 'true',//添加页不需要在menu上显示
            // authority: ["总经理","业务副总","实验室主任","业务经理","客服人员"],
          },
          {
            //检测安排
            path: '/InspectionAnalysis/InspectionArrangement',
            name: 'InspectionArrangement',
            component: './InspectionAnalysis/InspectionArrangement',
            // authority: ["总经理","业务副总","实验室主任"],
          },
          {
            //检测安排
            path: '/InspectionAnalysis/InspectionSubcontractDetail',
            name: 'InspectionSubcontractDetail',
            component: './InspectionAnalysis/InspectionSubcontractDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
            // authority: ["总经理","业务副总","实验室主任","业务经理"],
          },

          {
            //样品分包
            path: '/InspectionAnalysis/InspectionSubcontract',
            name: 'InspectionSubcontract',
            component: './InspectionAnalysis/InspectionSubcontract',
          },
          {
            //样品分包-分包按钮
            path: '/InspectionAnalysis/InspectionArrangementDetail',
            name: 'InspectionArrangementDetail',
            component: './InspectionAnalysis/InspectionArrangementDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            //样品分包-分包查看
            path: '/InspectionAnalysis/InspectionSubcontractDetailView',
            name: 'InspectionSubcontractDetailView',
            component: './InspectionAnalysis/InspectionSubcontractDetailView',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/InspectionAnalysis/SampleDetail',
            name: 'SampleDetail',
            component: './InspectionAnalysis/SampleDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            //结果录入
            path: '/InspectionAnalysis/ResultUpdate',
            name: 'ResultUpdate',
            component: './InspectionAnalysis/ResultUpdate',
          },
          {
            //结果录入-编辑
            path: '/InspectionAnalysis/ResultUpdateDetail',
            name: 'ResultUpdateDetail',
            component: './InspectionAnalysis/ResultUpdateDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            //测试报告
            path: '/InspectionAnalysis/RecordUpload',
            name: 'RecordUpload',
            component: './InspectionAnalysis/RecordUpload',
          },

          {
            //结果审核
            path: '/InspectionAnalysis/ResultReview',
            name: 'ResultReview',
            component: './InspectionAnalysis/ResultReview',
            authority: ["总经理","业务副总","实验室主任"],
          },

          {
            //结果审核-审核或退回键
            path: '/InspectionAnalysis/ResultDetailReview',
            name: 'ResultDetailReview',
            component: './InspectionAnalysis/ResultDetailReview',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/InspectionAnalysis/InspmanDetail',
            name: 'InspmanDetail',
            component: './TaskAppoint/InspmanDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/InspectionAnalysis/ResultRecord',
            name: 'ResultRecord',
            component: './InspectionAnalysis/ResultRecord',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
        ],
      },

      {
        path: '/Certificate',
        icon: 'profile',
        name: 'Certificate',
        authority: ["总经理","业务副总","业务经理","客服人员","授权签字人"],
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

          {
            path: '/Certificate/CertificateReview',
            name: 'CertificateReview',
            component: './Certificate/CertificateReview',
          },
          {
            path: '/Certificate/CertificateReviewDetail',
            name: 'CertificateReviewDetail',
            component: './Certificate/CertificateReviewDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/Certificate/CertificateMake',
            name: 'CertificateMake',
            component: './Certificate/CertificateMake',
          },
          {
            path: '/Certificate/CertificateMakeDetail',
            name: 'CertificateMakeDetail',
            component: './Certificate/CertificateMakeDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/Certificate/CertificateSeal',
            name: 'CertificateSeal',
            component: './Certificate/CertificateSeal',
            authority: ["授权签字人"],
          },
          {
            path: '/Certificate/CertificateSealDetail',
            name: 'CertificateSealDetail',
            component: './Certificate/CertificateSealDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/Certificate/CertificateFinished',
            name: 'CertificateFinished',
            component: './Certificate/CertificateFinished',
          },

          {
            path: '/Certificate/CertificateFinishedDetail',
            name: 'CertificateFinishedDetail',
            component: './Certificate/CertificateFinishedDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/Certificate/CertificatePublish',
            name: 'CertificatePublish',
            component: './Certificate/CertificatePublish',
            authority: ["总经理","业务副总","业务经理"],
          },

          {
            path: '/Certificate/CertificatePublishDetail',
            name: 'CertificatePublishDetail',
            component: './Certificate/CertificatePublishDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
            // authority: ["总经理","业务经理","业务副总"],
          },

          {
            path: '/Certificate/CertificateAbandon',
            name: 'CertificateAbandon',
            component: './Certificate/CertificateAbandon',
             authority: ["总经理","业务经理","业务副总","实验室主任"],
          },

          {
            path: '/Certificate/CertificateAbandonDetail',
            name: 'CertificateAbandonDetail',
            component: './Certificate/CertificateAbandonDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

        ],
      },

      // Charge
      {
        path: '/Charge',
        icon: 'profile',
        name: 'Charge',
        authority: ["总经理","业务副总","财务副总","业务经理","财务经理","财务人员","客服人员"],
        routes: [
          {
            path: '/Charge/FinalPrice',
            name: 'FinalPrice',
            component: './Charge/FinalPrice',
            authority: ["总经理","业务副总","业务经理","客服人员"],
          },
          {
            path: '/Charge/FinalPriceDetail',
            name: 'FinalPriceDetail',
            component: './Charge/FinalPriceDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Charge/ListFiction',
            name: 'ListFiction',
            component: './Charge/ListFiction',
            authority: ["总经理","业务副总","业务经理","客服人员"],
          },
          //
          {
            path: '/Charge/ListFictionAdd',
            name: 'ListFictionAdd',
            component: './Charge/ListFictionAdd',
            authority: ["总经理","业务副总","业务经理","客服人员"],
          },
          {
            path: '/Charge/ListFictionDelete',
            name: 'ListFictionDelete',
            component: './Charge/ListFictionDelete',
            authority: ["总经理","业务副总","业务经理","客服人员"],
          },
          {
            path: '/Charge/ListReview',
            name: 'ListReview',
            component: './Charge/ListReview',
            authority: ["总经理","业务经理","业务副总"],
          },

          {
            path: '/Charge/ListFile',
            name: 'ListFile',
            component: './Charge/ListFile',
            authority: ["总经理","业务副总","业务经理","客服人员"],
          },

          {
            path: '/Charge/ListFictionReview',
            name: 'ListFictionReview',
            component: './Charge/ListFictionReview',
            hideInMenu: 'true',//添加页不需要在menu上显示
            authority: ["总经理","业务副总","业务经理"],
          },

          {
            path: '/Charge/ListFictionReviewBack',
            name: 'ListFictionReviewBack',
            component: './Charge/ListFictionReviewBack',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            //开具发票
            path: '/Charge/Invoice',
            name: 'Invoice',
            component: './Charge/Invoice',
            authority: ["总经理","财务副总","财务经理","财务人员"],
          },

          {
            // 收费到账
            path: '/Charge/ListPay',
            name: 'ListPay',
            component: './Charge/ListPay',
            authority: ["总经理","财务副总","财务经理","财务人员"],
          },

          {
            path: '/Charge/FinalPriceAdd',
            name: 'FinalPriceAdd',
            component: './Charge/FinalPriceAdd',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {

            path: '/Charge/DetailList',
            name: 'DetailList',
            component: './Charge/DetailList',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

        ],
      },

      // 成本支出
      {
        path: '/CostManage',
        icon: 'profile',
        name: 'CostManage',
        //authority: ["总经理","业务副总","财务副总","操作经理","实验室主任","业务经理","财务经理","财务人员","授权签字人"],
        routes: [
          {
            path: '/CostManage/Cost',
            name: 'Cost',
            component: './Charge/Cost',
          },

          {
            path: '/CostManage/CostlistEdit',
            name: 'CostlistEdit',
            component: './Charge/CostlistEdit',
          },

          {
            path: '/CostManage/CostListAdd',
            name: 'CostListAdd',
            component: './Charge/CostListAdd',
          },
          {
            path: '/CostManage/CostlistDelete',
            name: 'CostlistDelete',
            component: './Charge/CostlistDelete',
          },

          {
            path: '/CostManage/CostlistReview',
            name: 'CostlistReview',
            component: './Charge/CostlistReview',
            authority: ["总经理","财务经理","财务副总"],
          },

          {
            path: '/CostManage/CostlistFile',
            name: 'CostlistFile',
            component: './Charge/CostlistFile',
          },

          {
            path: '/CostManage/CostlistPay',
            name: 'CostlistPay',
            component: './Charge/CostlistPay',
            authority: ["总经理","财务经理","财务副总","财务人员"],
          },

          {
            path: '/CostManage/CostEdit',
            name: 'CostEdit',
            component: './Charge/CostEdit',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/CostManage/CostListDetail',
            name: 'CostListDetail',
            component: './Charge/CostListDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/CostManage/CostListDetailReviewPass',
            name: 'CostListDetailReviewPass',
            component: './Charge/CostListDetailReviewPass',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },


          {
            path: '/CostManage/CostListDetailReviewBack',
            name: 'CostListDetailReviewBack',
            component: './Charge/CostListDetailReviewBack',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/CostManage/FinalPriceAdd',
            name: 'FinalPriceAdd',
            component: './Charge/FinalPriceAdd',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },


        ],
      },



      //Archives
      {
        path: '/Archives',
        icon: 'profile',
        name: 'Archives',
        authority: ["总经理","业务副总","业务经理","客服人员"],
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

      //字典
      {
        path: '/DictMaintain',
        icon: 'profile',
        name: 'DictMaintain',
        authority: ["总经理","管理员"],
        routes: [

          {
            path: '/DictMaintain/Intrusment',
            name: 'Intrusment',
            component: './DictMaintain/Intrusment',
          },

          {
            path: '/DictMaintain/SurveyStandard',
            name: 'SurveyStandard',
            component: './DictMaintain/SurveyStandard',
          },

          {
            path: '/DictMaintain/CargoList',
            name: 'CargoList',
            component: './DictMaintain/CargoList',
          },
          {
            path: '/DictMaintain/ItemList',
            name: 'ItemList',
            component: './DictMaintain/ItemList',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/DictMaintain/StandardList',
            name: 'StandardList',
            component: './DictMaintain/StandardList',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/DictMaintain/CheckProject',
            name: 'CheckProject',
            component: './DictMaintain/CheckProject',
          },

          {
            path: '/DictMaintain/BusinessSource',
            name: 'BusinessSource',
            component: './DictMaintain/BusinessSource',
          },

          {
            path: '/DictMaintain/BusinessSort',
            name: 'BusinessSort',
            component: './DictMaintain/BusinessSort',
          },

          {
            path: '/DictMaintain/TradeAway',
            name: 'TradeAway',
            component: './DictMaintain/TradeAway',
          },

          {
            path: '/DictMaintain/InvoiceTitle',
            name: 'InvoiceTitle',
            component: './DictMaintain/InvoiceTitle',
          },
          {
            path: '/DictMaintain/IntrusmentRecord',
            name: 'IntrusmentRecord',
            component: './DictMaintain/IntrusmentRecord',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/DictMaintain/InvoiceTitleUpload',
            name: 'InvoiceTitleUpload',
            component: './DictMaintain/InvoiceTitleUpload',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
        ],
      },

      //公司管理
      {
        path: '/CompanyManage',
        icon: 'profile',
        name: 'CompanyManage',
        authority: ["总经理","管理员"],
        routes: [
          {
            path: '/CompanyManage/UserManage',
            name: 'UserManage',
            component: './CompanyManage/UserManage',
            authority: ["总经理","管理员","admin"],
          },

          {
            path: '/CompanyManage/Department',
            name: 'Department',
            component: './CompanyManage/Department',
          },
          {
            path: '/CompanyManage/TestMan',
            name: 'TestMan',
            component: './CompanyManage/TestMan',
          },
          {
            path: '/CompanyManage/Port',
            name: 'Port',
            component: './CompanyManage/Port',
          },

          {
            path: '/CompanyManage/CompanyInfo',
            name: 'CompanyInfo',
            component: './CompanyManage/CompanyInfo',
          },
          {
            path: '/CompanyManage/CompanyUpload',
            name: 'CompanyUpload',
            component: './CompanyManage/CompanyUpload',
          },
          // {
          //   path: '/CompanyManage/Info',
          //   name: 'Info',
          //   component: './CompanyManage/Info',
          // },
          {
            path: '/CompanyManage/CustomReceive',
            name: 'CustomReceive',
            component: './CompanyManage/CustomReceive',
          },

          {
            path: '/CompanyManage/ManRecord',
            name: 'ManRecord',
            component: './CompanyManage/ManRecord',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/CompanyManage/ManUpload',
            name: 'ManUpload',
            component: './CompanyManage/ManUpload',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/CompanyManage/ManDetail',
            name: 'ManDetail',
            component: './CompanyManage/ManDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
        ],
      },



      // analysis
      {
        path: '/Statistics',
        icon: 'profile',
        name: 'Statistics',
        authority: ["总经理","业务副总","财务副总","操作经理","实验室主任","业务经理","财务经理"],
        routes: [

          {
            path: '/Statistics/BusinessIncome',
            name: 'BusinessIncome',
            component: './Statistics/BusinessIncomeQuery',
          },
          {
            path: '/Statistics/BusinessIncomeDetail',
            name: 'BusinessIncomeDetail',
            component: './Statistics/BusinessIncomeDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
          {
            path: '/Statistics/CostQuery',
            name: 'CostQuery',
            component: './Statistics/CostQuery',
          },
          {
            path: '/Statistics/CostQueryDetail',
            name: 'CostQueryDetail',
            component: './Statistics/CostQueryDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/Statistics/ReportPriceMakingQuery',
            name: 'ReportPriceMakingQuery',
            component: './Statistics/ReportPriceMakingQuery',
          },
          {
            path: '/Statistics/ReportPriceMakingQueryDetail',
            name: 'ReportPriceMakingQueryDetail',
            component: './Statistics/ReportPriceMakingQueryDetail',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },


          {
            path: '/Statistics/IncomeDistribution',
            name: 'IncomeDistribution',
            component: './Statistics/IncomeDistributionQuery',
          },

          {
            path: '/Statistics/ExpenditureBurden',
            name: 'ExpenditureBurden',
            component: './Statistics/ExpenditureBurdenQuery',
          }
        ],
      },

      //CNAS审查
      {
        path: '/CNAS',
        icon: 'profile',
        name: 'CNAS',
        authority: ["总经理","管理员"],
        routes: [
          {
            path: '/CNAS/CNASCheckFourCertCode',
            name: 'CNASCheckFourCertCode',
            component: './CNAS/CNASCheckFourCertCode',
          },

          {
            path: '/CNAS/CNASCheckStandard',
            name: 'CNASCheckStandard',
            component: './CNAS/CNASCheckStandard',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/CNAS/CNASCheckInsMan',
            name: 'CNASCheckInsMan',
            component: './CNAS/CNASCheckInsMan',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },

          {
            path: '/CNAS/CNASCheckAuthor',
            name: 'CNASCheckAuthor',
            component: './CNAS/CNASCheckAuthor',
            hideInMenu: 'true',//添加页不需要在menu上显示
          },
        ],
      },

      //Dict
      {
        path: '/PersonInfo',
        icon: 'profile',
        name: 'PersonInfo',
        routes: [
          {
            path: '/PersonInfo/Info',
            name: 'Info',
            component: './CompanyManage/Info',
          },
        ],
      },



      {
        component: '404',
      },
    ],
  },
];
