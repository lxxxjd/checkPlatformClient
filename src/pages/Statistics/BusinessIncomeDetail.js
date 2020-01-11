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
  };

  columns = [
    {
      title: '检查项目',
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
      title: '开始日期',
      dataIndex: 'recorddate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '结束日期',
      dataIndex: 'recorddate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '检查人员',
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
      title: '数/重量',
      dataIndex: 'recordname',
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
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
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
      dataIndex: 'recordname',
    },
    {
      title: '转委托日期',
      dataIndex: 'recorddate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '转委托人',
      dataIndex: 'recorddate',
    },
    {
      title: '转委托项目',
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
      title: '转委托费用',
      dataIndex: 'recordname',
    },
  ];

  columns3 = [
    {
      title: '样品编号',
      dataIndex: 'recordname',
    },
    {
      title: '样品名称',
      dataIndex: 'recorddate',
    },
    {
      title: '指派日期',
      dataIndex: 'recorddate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '检测人员',
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
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];

  columns4 = [
    {
      title: '分包日期',
      dataIndex: 'recordname',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '实验室',
      dataIndex: 'recorddate',
    },
    {
      title: '状态日期',
      dataIndex: 'recorddate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '状态',
      dataIndex: 'recordname',
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
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '上传人',
      dataIndex: 'recorddate',
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
      title: '操作日期',
      dataIndex: 'recorddate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '操作人',
      dataIndex: 'recorddate',
    },
    {
      title: '状态',
      dataIndex: 'recorddate',
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
  componentWillMount() {
    const reportno = sessionStorage.getItem("reportno");
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'businessIncomeDetail/getReport',
      payload: reportno,
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
      type: 'businessIncomeDetail/getTestByReportNo',
      payload:{
         reportno,
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
  }

  componentDidMount(){
    const {
      businessIncomeDetail:{ report  },
      dispatch
    } = this.props;

    if(report.cnasCode!==undefined && report.cnasCode!==null  ){
      if(report.iscnas === 1){
        dispatch({
          type: 'businessIncomeDetail/getCnasInfo',
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
  previewItem = text => {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const params = {
      ...text,
      reportno:reportno
    };
    dispatch({
      type: 'businessIncomeDetail/getRecord',
      payload:params,
      callback:(response) =>{
        if(response.code === 400){
          notification.open({
            message: '打开失败',
            description:response.data,
          });
        }else{
          const url = response.data;
          this.setState({url:url});
          //window.open(url);
        }
      }
    });
  };


  back = () =>{
    this.props.history.goBack();
  };

  render() {
    const {
      businessIncomeDetail,
      loading
    } = this.props;
    const { report  } = businessIncomeDetail;
    const { cnasInfo, checkResult, checkRecord, test, testRecord, certFile} = this.state;
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
                <Icon type="left" />返回
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
            <Descriptions.Item label="海关部门">{report.costomsName}</Descriptions.Item>

          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="检查对象" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="检查品名">{report.cargoname}</Descriptions.Item>
            <Descriptions.Item label="中文俗名">{report.chineselocalname}</Descriptions.Item>
            <Descriptions.Item label="船名标识">{report.shipname}</Descriptions.Item>
            <Descriptions.Item label="申报数量和单位">{((report.quantityd === undefined || report.quantityd === null ) ? "":report.quantityd  )+report.unit }</Descriptions.Item>
            <Descriptions.Item label="检验时间">{moment(report.inspdate).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="检查港口">{report.inspplace2}</Descriptions.Item>
            <Descriptions.Item label="检验地点">{report.inspplace1}</Descriptions.Item>
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
            <Descriptions.Item label="状态日期">{report.overalltime}</Descriptions.Item>
            <Descriptions.Item label="当前状态">{report.overallstate}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card bordered={false}  title="检查结果">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={checkResult}
              columns={this.columns}
              rowKey="recordname"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Card bordered={false}  title="检查记录">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={testRecord}
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
              rowKey="recordname"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Card bordered={false}  title="样品自测">
          <div>
            <Table
              size="middle"
              loading={loading}
              //dataSource={recordData}
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
              //dataSource={recordData}
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
        <Card bordered={false}  title="证书">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={certFile}
              columns={this.columns6}
              rowKey="recordname"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BusinessIncomeDetail;
