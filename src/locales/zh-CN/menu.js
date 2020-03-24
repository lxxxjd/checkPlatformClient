import InspmanDetail from '../../pages/TaskAppoint/InspmanDetail';
import CertificateReview from '../../pages/Certificate/CertificateReview';
import CostlistEdit from '../../pages/Charge/CostlistEdit';
import ResultReview from '../../pages/InspectionAnalysis/ResultReview';
import ListFile from '../../pages/Charge/ListFile';

export default {
  'menu.home': '首页',
  'menu.login': '登录',
  'menu.register': '注册',
  'menu.Entrustment': '委托申请',
  'menu.register.result': '注册结果',
  'menu.Entrustment.ApplicationForEntrustment':'新建委托',
  'menu.Entrustment.SearchForEntrustment':'修改委托',
  'menu.Entrustment.DetailForEntrustment':'委托详情',
  'menu.Entrustment.CancelForEntrustment':'撤销委托',
  'menu.Entrustment.ModifyForEntrustment':'修改委托',
  'menu.Entrustment.CopyForEntrustmentList':'复制委托',
  'menu.Entrustment.AcceptList':'网上委托',
  'menu.Entrustment.Accept':'委托',
  'menu.Entrustment.DetailForUnAccept':'受理详情',
  'menu.Entrustment.CopyForEntrustment':'复制委托详情',
  'menu.TaskAppoint': '任务指派',
  'menu.TaskAppoint.CustomerService':'客服人员',
  'menu.TaskAppoint.CustomerServiceDetail':'客服详情',
  'menu.TaskAppoint.Inspector':'检验人员',
  'menu.TaskAppoint.InspectorDetail':'检员详情',
  // 'menu.BusinessTransfer': '业务转移',
  'menu.UEditor': '文本编辑',
  'menu.UEditor.UEditorText':'编辑器',
  'menu.Entrustment.EntrustmentRelevance':'委托关联',
  'menu.Entrustment.EntrustmentRecord':'上传文件',
  'menu.Entrustment.SubEntrustment':'转委托',
  'menu.Entrustment.ModifyRelevance':'修改委托关联',
  'menu.Entrustment.DetailForSub':'转委托详情',
  'menu.TestRecord': '现场检查',
  'menu.TestRecord.ResultRegistration':'检查结果',
  'menu.TestRecord.ResultDetail':'结果详情',
  'menu.TestRecord.RecordUpload':'检查记录',
  'menu.TestRecord.UploadDetail':'上传详情',
  'menu.SampleRegister': '样品管理',
  'menu.SampleRegister.SampleRegister':'样品登记',
  'menu.SampleRegister.SampleQuery':'样品查询',
  'menu.SampleRegister.SampleDestory':'样品销毁',
  'menu.Charge':'收费定价',
  'menu.Charge.FinalPrice':'最终定价',
  'menu.Charge.FinalPriceAdd':'定价',
  'menu.Charge.FinalPriceDetail':'最终定价详情',
  'menu.Charge.ListFiction':'收费清单查看',
  'menu.Charge.ListFictionAdd':'收费清单拟制',
  'menu.Charge.ListFictionReview':'清单审核通过详情',
  'menu.Charge.ListFictionReviewBack':'清单审核退回详情',
  'menu.Charge.ListReview':'收费清单审核',
  'menu.Charge.DetailList':'清单详情',
  'menu.Charge.ListPay':'收费到账',
  'menu.Charge.Invoice':'开具发票',
  'menu.CostManage.Cost':'成本登记',
  'menu.CostManage.CostlistEdit':'成本清单查看',
  'menu.CostManage.CostEdit':'成本登记',
  'menu.CostManage.CostListAdd':'成本清单拟制',
  'menu.CostManage.CostListDetail':'成本清单详情',
  'menu.CostManage.CostlistReview':'成本清单审核',
  'menu.CostManage.CostListDetailReviewBack':'成本审核退回',
  'menu.CostManage.CostListDetailReviewPass':'成本审核通过',
  'menu.CostManage.CostlistPay':'成本支付',

  'menu.Charge.ListFile':'收费清单生成',
  'menu.CostManage.CostlistFile':'成本清单生成',
  'menu.CostManage':'成本支出',

  'menu.PersonInfo':'个人设置',
  'menu.PersonInfo.Info':'密码设置',

  'menu.Archives':'业务归档',
  'menu.Archives.ArchivesAdd':'归档',
  'menu.Archives.ArchivesDestory':'退档',
  'menu.Archives.ArchivesQuery':'查档',
  'menu.SampleRegister.SampleRegisterDetail':'样品登记详情',
  'menu.InspectionAnalysis':'分析测试',
  'menu.InspectionAnalysis.InspectionArrangement':'检测安排',
  'menu.InspectionAnalysis.InspectionArrangementDetail':'检验安排详情',
  'menu.InspectionAnalysis.InspmanDetail':'检测人员安排详情',
  'menu.InspectionAnalysis.SampleIndex':'样品指标',
  'menu.InspectionAnalysis.InspectionSubcontract':'样品分包',
  'menu.InspectionAnalysis.SampleModify':'样品结果登记',
  'menu.InspectionAnalysis.SampleDetail':'样品结果详情',
  'menu.InspectionAnalysis.ResultUpdate':'结果录入',
  'menu.InspectionAnalysis.ResultUpdateDetail':'结果录入详情',
  'menu.InspectionAnalysis.ResultDetailReview':'结果审核详情',
  'menu.InspectionAnalysis.ResultReview':'结果审核',
  'menu.InspectionAnalysis.ResultRecord':'测试结果文件',
  'menu.InspectionAnalysis.RecordUpload':'测试报告',
  'menu.Certificate':'证稿证书',
  'menu.Certificate.CertificateUpload':'证稿拟制',
  'menu.Certificate.CertificateUploadDetail':'证稿证书详情',
  'menu.Certificate.CertificateFinishedDetail':'上传证书详情',
  'menu.Certificate.CertificateFinished':'上传证书',


  'menu.Certificate.CertificateReview':'证稿复核',
  'menu.Certificate.CertificateReviewDetail':'证稿复核详情',
  'menu.Certificate.CertificateMake':'证书缮制',
  'menu.Certificate.CertificateMakeDetail':'证书缮制详情',
  'menu.Certificate.CertificateSeal':'授权签字',
  'menu.Certificate.CertificateSealDetail':'授权签字详情',
  'menu.Certificate.CertificatePublish':'证书发布',
  'menu.Certificate.CertificatePublishDetail':'证书发布详情',
  'menu.Certificate.CertificateAbandon':'证书作废',
  'menu.Certificate.CertificateAbandonDetail':'证书作废详情',

  'menu.DictMaintain.StandardList':'标准管理',
  'menu.DictMaintain.ItemList':'指标管理',
  'menu.DictMaintain.CargoList':'货物管理',
  'menu.DictMaintain':'字典管理',
  'menu.DictMaintain.CheckProject':'检验项目',
  'menu.DictMaintain.BusinessSort':'业务分类',
  'menu.DictMaintain.BusinessSource':'业务来源',
  'menu.DictMaintain.InvoiceTitle':'发票信息',
  'menu.DictMaintain.SurveyStandard':'检验标准',
  'menu.DictMaintain.TradeAway':'贸易方式',
  'menu.DictMaintain.Intrusment':'仪器信息',
  'menu.DictMaintain.IntrusmentRecord':'仪器文件',
  'menu.DictMaintain.InvoiceTitleUpload':'发票图片',
  'menu.CompanyManage':'公司管理',
  'menu.CompanyManage.CompanyInfo':'公司信息',
  'menu.CompanyManage.CompanyUpload':'公司图片',
  'menu.CompanyManage.UserManage':'用户管理',
  'menu.CompanyManage.Department':'部门管理',
  'menu.CompanyManage.TestMan':'分包方',
  'menu.CompanyManage.Port':'常用地点',
  'menu.CompanyManage.ManRecord':'上传文件',
  'menu.CompanyManage.ManUpload':'上传图片',
  'menu.CompanyManage.Info':'个人信息',
  'menu.CompanyManage.ManDetail':'用户信息',
  'menu.CompanyManage.CustomReceive':'数据推送',

  'menu.dashboard': 'Dashboard',
  'menu.dashboard.analysis': '分析页',
  'menu.dashboard.monitor': '监控页',
  'menu.dashboard.workplace': '工作台',
  'menu.form': '表单页',
  'menu.form.basicform': '基础表单',
  'menu.form.stepform': '分步表单',
  'menu.form.stepform.info': '分步表单（填写转账信息）',
  'menu.form.stepform.confirm': '分步表单（确认转账信息）',
  'menu.form.stepform.result': '分步表单（完成）',
  'menu.form.advancedform': '高级表单',
  'menu.list': '证书证稿',
  'menu.list.searchtable': '证书拟制',
  'menu.list.basiclist': '标准列表',
  'menu.list.cardlist': '卡片列表',
  'menu.list.searchlist': '搜索列表',
  'menu.list.searchlist.articles': '搜索列表（文章）',
  'menu.list.searchlist.projects': '搜索列表（项目）',
  'menu.list.searchlist.applications': '搜索列表（应用）',
  'menu.profile': '详情页',
  'menu.profile.basic': '基础详情页',
  'menu.profile.advanced': '高级详情页',
  'menu.result': '结果页',
  'menu.result.success': '成功页',
  'menu.result.fail': '失败页',
  'menu.exception': '异常页',
  'menu.exception.not-permission': '403',
  'menu.exception.not-find': '404',
  'menu.exception.server-error': '500',
  'menu.exception.trigger': '触发错误',
  'menu.account': '个人页',
  'menu.account.center': '个人中心',
  'menu.account.settings': '个人设置',
  'menu.account.trigger': '触发报错',
  'menu.account.logout': '退出登录',
  'menu.editor': '图形编辑器',
  'menu.editor.flow': '流程编辑器',
  'menu.editor.mind': '脑图编辑器',
  'menu.editor.koni': '拓扑编辑器',

  'menu.Main': '主页',
  'menu.Main.Main': '主页',

  'menu.Statistics':'数据统计',
  'menu.Statistics.BusinessIncome':'业务收入',
  'menu.Statistics.BusinessIncomeDetail':'业务收入详情',
  'menu.Statistics.CostQuery':'成本统计',
  'menu.Statistics.ReportPriceMakingQuery':'利润分析',
  'menu.Statistics.IncomeDistribution':'收入分配',
  'menu.Statistics.ExpenditureBurden':'支出负担',
  'menu.Statistics.ReportPriceMakingQueryDetail':'支出负担详情',
  'menu.Statistics.CostQueryDetail':'成本统计详情',
  'menu.CNAS':'CNAS管理',
  'menu.CNAS.CNASCheckFourCertCode':'CNAS信息',
  'menu.CNAS.CNASCheckStandard':'CNAS标准',
  'menu.CNAS.CNASCheckInsMan':'CNAS检查人员',
  'menu.CNAS.CNASCheckAuthor':'CNAS授权签字',

};
