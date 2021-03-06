import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { Card, Divider ,Descriptions,Row, Col,  Button,Typography ,Modal,Icon,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BusinessIncomeQuery.less';
import moment from 'moment'
const { Title} = Typography;
@connect(({ businessIncomeDetail, loading }) => ({
  businessIncomeDetail,
  loading: loading.models.businessIncomeDetail,
}))
class BusinessIncomeDetail extends Component {
  state = {
    cnasInfo: {
      checkcode: '',
      checkname: '',
      domaincode: '',
      domainname: '',
      subdomaincode: '',
      subdomainname: '',
    },
    checkResult:[],
    checkRecord:[],
    test:[],
    testRecord:[],
    certFile:[],
    testInfo:[],
    pricemaking:{},
    sample:[],
    visible:false,
    detail:[],
    sampleCompany:[],
  };

  columns = [
    {
      title: '检查项目',
      dataIndex: 'inspway',
    },
    {
      title: '开始日期',
      dataIndex: 'begindate',
      render: val => {
        if(val != null){
          return <span>{moment(val).format('YYYY-MM-DD')}</span>
        }
      }
    },
    {
      title: '结束日期',
      dataIndex: 'finishdate',
      render: val => {
        if(val != null){
          return <span>{moment(val).format('YYYY-MM-DD')}</span>
        }
      }
    },
    {
      title: '检查人员',
      dataIndex: 'inspman',
      render: (text, record) => {
        if(typeof(text) === undefined || text === null){
          return;
        }
        let  contentStr = [];
        contentStr = text.split("|");
        if (contentStr.length < 2) {
          return text;
        }
        let result = null;
        const br = <br></br>;
        for( let  j=0 ; j < contentStr.length ; j++){
          if(j===0){
             result=contentStr[j];
          }else{
            result=<span>{result}{br}{contentStr[j]}</span>;
          }
        }
        return <div>{result}</div>;
      },
    },
    {
      title: '数/重量',
      dataIndex: 'weight',
    },
    // {
    //   title: '操作',
    //   render: (text, record) => (
    //     <Fragment>
    //       <a onClick={() => this.previewItem(text, record)}>查看</a>
    //     </Fragment>
    //   ),
    // },
  ];

  columns1 = [
    {
      title: '记录名',
      dataIndex: 'recordname',
      render: val => {
        //取文件名
        var pattern = /\.{1}[a-z]{1,}$/;
        if (pattern.exec(val) !== null) {
          return <span>{val.slice(0, pattern.exec(val).index)}</span>;
        } else {
          return <span>{val}</span>;
        }
      }
    },
    {
      title: '上传日期',
      dataIndex: 'recorddate',
      render: val => {
        if(val != null){
          return <span>{moment(val).format('YYYY-MM-DD')}</span>
        }
      }
    },
    {
      title: '上传人',
      dataIndex: 'creator',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];


  columns2 = [
    {
      title: '检验机构',
      dataIndex: 'testman',
    },
    {
      title: '转委托日期',
      dataIndex: 'assigndate',
      render: val => {
        if(val != null){
          return <span>{moment(val).format('YYYY-MM-DD')}</span>
        }
      }
    },
    {
      title: '转委托人',
      dataIndex: 'assignman',
    },
    {
      title: '转委托项目',
      dataIndex: 'inspway',
    },
    {
      title: '转委托费用',
      dataIndex: 'totalfee',
    },
  ];

  columns3 = [
    {
      title: '样品编号',
      dataIndex: 'sampleno',
    },
    {
      title: '样品名称',
      dataIndex: 'samplename',
    },
    {
      title: '检测人员',
      dataIndex: 'testmans',
    },
    {
      title: '指派日期',
      dataIndex: 'makingdate',
      render: val => {
        if(val != null){
          return <span>{moment(val).format('YYYY-MM-DD')}</span>
        }
      }
    },
    {
    title: '指派人',
      dataIndex: 'taskman',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.detailItem(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];

  columns4 = [
    {
      title: '实验室/检验机构',
      dataIndex: 'testman',
    },
    {
      title: '分包日期',
      dataIndex: 'assigndate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '计价方式',
      dataIndex: 'priceway',
    },
    {
      title: '单价',
      dataIndex: 'price',
    },
    {
      title: '总价',
      dataIndex: 'totalfee',
    },
    {
      title: '状态',
      dataIndex: 'reviewstatus',
    },
  ];

  columns5 = [
    {
      title: '检测报告',
      dataIndex: 'recordname',
      render: val => {
        //取文件名
        var pattern = /\.{1}[a-z]{1,}$/;
        if (pattern.exec(val) !== null) {
          return <span>{val.slice(0, pattern.exec(val).index)}</span>;
        } else {
          return <span>{val}</span>;
        }
      }
    },
    {
      title: '上传日期',
      dataIndex: 'recorddate',
      render: val => {
        if(val != null){
          return <span>{moment(val).format('YYYY-MM-DD')}</span>
        }
      }
    },
    {
      title: '上传人',
      dataIndex: 'creator',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];

  columns6 = [
    {
      title: '证书名称',
      dataIndex: 'name',
      render: val => {
        //取文件名
        var pattern = /\.{1}[a-z]{1,}$/;
        if (pattern.exec(val) !== null) {
          return <span>{val.slice(0, pattern.exec(val).index)}</span>;
        } else {
          return <span>{val}</span>;
        }
      }
    },
    {
      title: '上传日期',
      dataIndex: 'create_time',
      render: val => {
        if(val != null){
          return <span>{moment(val).format('YYYY-MM-DD')}</span>
        }
      }
    },
    {
      title: '上传人',
      dataIndex: 'creator',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewCertItem(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];

  columns7 = [
    {
      title: '指标名称',
      dataIndex: 'itemC',
    },
    {
      title: '英文名称',
      dataIndex: 'itemE',
    },
    {
      title: '检测标准',
      dataIndex: 'teststandard',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '结果',
      dataIndex: 'testresult',
    },
    {
      title: '比较方法',
      dataIndex: 'calWay',
    },
    {
      title: '参考值',
      dataIndex: 'referValue',
    },
    {
      title: '状态',
      dataIndex: 'qualityErr',
    },
  ];

  componentWillMount() {
    const reportno = sessionStorage.getItem("reportno");
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'businessIncomeDetail/getReport',
      payload: reportno,
      callback:response=>{
        const report = response;
        if(report.cnasCode !==undefined && report.cnasCode !==null  ){
          if(report.iscnas === "1"){
            dispatch({
              type: 'entrustment/getCnasInfo',
              payload: {
                checkCode:report.cnasCode,
              },
              callback: (response) => {
                if (response.code === 200) {
                  this.setState({cnasInfo: response.data});
                }
              }
            });
          }
        }
      }
    });
    dispatch({
      type: 'businessIncomeDetail/getCheckResult',
      payload:{
         reportno,
      },
      callback:response=>{
        if(response.code === 200){
          this.setState({checkResult:response.data});
        }
      }
    });
    dispatch({
      type: 'businessIncomeDetail/getRecordInfo',
      payload:{
         reportno,
         source:'检查记录'
      },
      callback:response=>{
        if(response.code === 200){
          this.setState({checkRecord:response.data});
        }
      }
    });
    dispatch({
      type: 'businessIncomeDetail/getRecordInfo',
      payload:{
         reportno,
         source:'测试报告'
      },
      callback:response=>{
        if(response.code === 200){
          this.setState({testRecord:response.data});
        }
      }
    });
    dispatch({
      type: 'businessIncomeDetail/getTestByReportNoAndAssignsort',
      payload:{
         reportno,
        assignsort:'转委托',
      },
      callback:response=>{
        if(response.code === 200){
          this.setState({test:response.data});
        }
      }
    });
    dispatch({
      type: 'businessIncomeDetail/getCertFiles',
      payload:{
         reportno,
      },
      callback:response=>{
        if(response.code === 200){
          this.setState({certFile:response.data});
        }
      }
    });
    dispatch({
      type: 'businessIncomeDetail/getPriceMakingList',
      payload:{
         reportno,
      },
      callback:response=>{
        if(response.code === 200){
          this.setState({pricemaking:response.data});
        }
      }
    });
    dispatch({
      type: 'businessIncomeDetail/getAllSampleAndTestMan',
      payload:{
         certCode : user.certCode,
         kind:'reportno',
         value:reportno
      },
      callback:response=>{
        if(response.code === 200){
          this.setState({sample:response.data});
        }
      }
    });
    dispatch({
      type: 'businessIncomeDetail/getTestByReportNoAndAssignsort',
      payload:{
        reportno,
        assignsort:'品质分包',
      },
      callback:response=>{
        if(response.code === 200){
          this.setState({sampleCompany:response.data});
        }
      }
    });
  };

  handleCancel = () =>{
    this.setState({visible:false});
  };

  detailItem = text => {
    const { dispatch } = this.props;
    dispatch({
      type: 'businessIncomeDetail/getAllDetails',
      payload:{
         reportno : text.reportno ,
         sampleno : text.sampleno ,
      },
      callback:response=>{
        if(response.code === 200){
          this.setState({detail:response.data});
        }
      }
    });
    this.setState({ visible : true });
  };

  previewItem = text => {
    const { dispatch } = this.props;
    const osspath = text.filepath
    if(osspath === undefined || osspath === null){
      return;
    }
    var extension = osspath.substring(osspath.lastIndexOf(".")+1);
    if(extension==="pdf"){
      dispatch({
        type: 'businessIncomeDetail/getOssPdf',
        payload:{
          osspath
        },
        callback:(response) =>{
          console.log(response);
          if(response.code === 400){
            notification.open({
              message: '打开失败',
              description:response.data,
            });
          }else{
            const url = response.data;
            this.setState({url:url});
            console.log(url);
            window.open(url);
          }
        }
      });
    }else{
      const picUrl = `https://www.smlq.vip/api/cert_report/getFileStream?osspath=${osspath}`;
      window.open(picUrl);
    }
    // this.setState({showVisible:true});
  };

  previewCertItem = text =>{
  const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    var path = "";
    if (text.status === "已拟制") { 
      path = text.pdfeditorpath; 
    }else if(text.status === "已复核"){ 
      path = text.pdfpath; 
    }else if(text.status === "已缮制"){ 
      path = text.titlepdfpath; 
    }else if(text.status === "已签署" || text.status === "已发布"){ 
      path = text.certpdfpath; 
    }else if (text.status === "已作废"){ 
      path = text.abandonpdfpath;
    }
    dispatch({
      type: 'businessIncomeDetail/getOssPdf',
      payload:{
        osspath:path
      },
      callback:(response) =>{
        if(response.code === 400){
          notification.open({
            message: '打开失败',
            description:response.data,
          });
        }else{
          const url = response.data;
          window.open(url);
        }
      }
    });
  };

  back = () =>{
    window.close();
  };

  render() {
    const {
      businessIncomeDetail,
      loading
    } = this.props;
    const { report  } = businessIncomeDetail;
    const { cnasInfo, checkResult, checkRecord, test, testRecord, certFile, pricemaking, sample, detail, visible, sampleCompany} = this.state;
    return (
      <PageHeaderWrapper loading={loading}>
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={3}>
              <Title level={3}>委托详情</Title>
            </Col>
            <Col span={19}>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15}} onClick={this.back}>
                <Icon style={{paddingLeft:5}} type="close" />关闭
              </Button>
            </Col>
          </Row>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="业务信息" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="委托编号">{report.reportno}</Descriptions.Item>
            <Descriptions.Item label="委托日期">{moment(report.reportdate).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="检验费">{report.price}</Descriptions.Item>
            <Descriptions.Item label="申请人">{report.applicant}</Descriptions.Item>
            <Descriptions.Item label="联系人">{report.applicantname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{report.applicanttel}</Descriptions.Item>
            <Descriptions.Item label="代理人">{report.agent}</Descriptions.Item>
            <Descriptions.Item label="联系人">{report.agentname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{report.agenttel}</Descriptions.Item>
            <Descriptions.Item label="付款人">{report.payer}</Descriptions.Item>
            <Descriptions.Item label="业务来源">{report.businesssource}</Descriptions.Item>
            <Descriptions.Item label="贸易方式">{report.tradeway}</Descriptions.Item>
            <Descriptions.Item label="证书要求" >{report.certstyle}</Descriptions.Item>
            <Descriptions.Item label="自编号">{report.reportno20}</Descriptions.Item>
            <Descriptions.Item label="业务分类">{report.businesssort}</Descriptions.Item>
            <Descriptions.Item label="执行部门">{report.section}</Descriptions.Item>
            <Descriptions.Item label="海关部门">{report.customsName}</Descriptions.Item>

          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="检查对象" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="检查品名">{report.cargoname}</Descriptions.Item>
            <Descriptions.Item label="中文俗名">{report.chineselocalname}</Descriptions.Item>
            <Descriptions.Item label="船名标识">{report.shipname}</Descriptions.Item>
            <Descriptions.Item label="申报数量">{((report.quantityd === undefined || report.quantityd === null ) ? "":report.quantityd  )+report.unit }</Descriptions.Item>
            <Descriptions.Item label="预检日期">{moment(report.inspdate).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="检验港口">{report.fromto}</Descriptions.Item>
            <Descriptions.Item label="检验地点">{report.inspectplace}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="检查项目" className={styles.card} bordered={false}>
          <table width="100%" border={1}>
            <tr>
              <td width="8%" style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}>认可领域及代码</td>
              <td width="8%" style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}>认可子领域代码</td>
              <td width="12%" style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}> 检查领域/检查对象及代码
              </td>
              <td width="15%" style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}>检查项目及代码
              </td>
              <td style={{backgroundColor: '#E5E5E5', 'textAlign': 'center', 'padding': '10px'}}> 检查项目详细描述</td>
            </tr>
            <tr>
              <td style={{'padding': '10px'}}>{cnasInfo.domaincode}{<br />}{cnasInfo.domainname}</td>
              <td style={{'padding': '10px'}}>{cnasInfo.subdomaincode}{<br />}{cnasInfo.subdomainname}</td>
              <td style={{'padding': '10px'}}>{cnasInfo.checkcode}{<br />}{cnasInfo.checkname}</td>
              <td style={{'padding': '10px'}}>
              {report.cnasProject}
              </td>
              <td style={{'padding': '10px'}}>
                <Row>
                  <Col span={24}>
                    <span>申请项目:{report.inspway}</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span>检验备注:{report.inspwaymemo1}</span>
                  </Col>
                </Row>
              </td>
            </tr>
          </table>
        </Card>
        <Card>
          <Descriptions size="large" title="当前状态" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="状态日期">{report.overalltime !== null ? moment(report.overalltime).format('YYYY-MM-DD'):null}</Descriptions.Item>
            <Descriptions.Item label="当前状态">{report.overallstate}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card bordered={false}  title="现场检查">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={checkResult}
              columns={this.columns}
              rowKey="inspway"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Card bordered={false}  title="检查记录">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={checkRecord}
              columns={this.columns1}
              rowKey="recordname"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Card bordered={false}  title="转委托">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={test}
              columns={this.columns2}
              rowKey="testman"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Card bordered={false}  title="样品自测">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={sample.list}
              columns={this.columns3}
              rowKey="recordname"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Card bordered={false}  title="样品分包">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={sampleCompany}
              columns={this.columns4}
              rowKey="recordname"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Card bordered={false}  title="检测报告">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={testRecord}
              columns={this.columns5}
              rowKey="recordname"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Card bordered={false}  title="证稿证书">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={certFile}
              columns={this.columns6}
              rowKey="name"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Card>
          <Descriptions size="large" title="计收费" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="定价日期">{pricemaking.pricedate !== null ? moment(pricemaking.pricedate).format('YYYY-MM-DD'):null}</Descriptions.Item>
            <Descriptions.Item label="定价人">{pricemaking.priceman}</Descriptions.Item>
            <Descriptions.Item label="定价金额">{pricemaking.total}</Descriptions.Item>
            <Descriptions.Item label="清单日期">{pricemaking.listdate !== null ? moment(pricemaking.listdate).format('YYYY-MM-DD'):null}</Descriptions.Item>
            <Descriptions.Item label="拟单人">{pricemaking.listman}</Descriptions.Item>
            <Descriptions.Item label="清单号">{pricemaking.listno}</Descriptions.Item>
            <Descriptions.Item label="发票日期">{pricemaking.invoiceDate !== null ? moment(pricemaking.invoiceDate).format('YYYY-MM-DD'):null}</Descriptions.Item>
            <Descriptions.Item label="开票人">{pricemaking.invoiceMan}</Descriptions.Item>
            <Descriptions.Item label="发票号码">{pricemaking.invoiceno}</Descriptions.Item>
            <Descriptions.Item label="到账日期">{pricemaking.paydate !== null ? moment(pricemaking.paydate).format('YYYY-MM-DD'):null}</Descriptions.Item>
            <Descriptions.Item label="到账登记">{pricemaking.payregistMan}</Descriptions.Item>
            <Descriptions.Item label="到账状态">{pricemaking.paystatus}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Modal
            title="结果详情"
            visible={visible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <Table
              size="middle"
              loading={loading}
              dataSource={detail}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns7}
              rowKey="keyno"
            />
          </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default BusinessIncomeDetail;
