import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { Card, Divider ,Descriptions,Row, Col,  Button,Typography ,Modal,Icon,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BusinessIncomeQuery.less';
import moment from 'moment'
const { Title} = Typography;

@connect(({ businessIncomeDetail,loading }) => ({
  businessIncomeDetail,
  loading: loading.models.businessIncomeDetail,
}))
class CostQueryDetail extends Component {
  state = {
    cnasInfo: {
      checkcode: '',
      checkname: '',
      domaincode: '',
      domainname: '',
      subdomaincode: '',
      subdomainname: '',
    },
    dataSource:[],
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '检查品名',
      dataIndex: 'cargoname',
    },
    {
      title: '费用名称',
      dataIndex: 'costname',
    },
    {
      title: '费用种类',
      dataIndex: 'costtype',
    },

    {
      title: '发生日期',
      dataIndex: 'occurdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '金额',
      dataIndex: 'costmoney',
    },
    {
      title: '接收人',
      dataIndex: 'reciever',
    },

    {
      title: '登记日期',
      dataIndex: 'registdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '登记人',
      dataIndex: 'register',
    },
    {
      title: '状态',
      dataIndex: 'status',
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
              callback: (response2) => {
                if (response2.code === 200) {
                  this.setState({cnasInfo: response2.data});
                }
              }
            });
          }
        }
      }
    });


    const listView = JSON.parse(sessionStorage.getItem("CostListDetail_costlist"));
    const values = new FormData();
    values.append("paylistno",listView.paylistno);
    values.append("certcode",user.certCode);
    dispatch({
      type: 'businessIncomeDetail/getCostBylistNO',
      payload:values,
      callback: (response) => {
        this.state.dataSource = response;
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
    const { cnasInfo,dataSource} = this.state;
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
            <Descriptions.Item label="状态日期">{report.overalltime !== null ? moment(report.overalltime).format('YYYY-MM-DD'):null}</Descriptions.Item>
            <Descriptions.Item label="当前状态">{report.overallstate}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="成本详情" bordered>
          <Table
            loading={loading}
            dataSource={dataSource}
            columns={this.columns}
            rowKey="keyno"
            pagination={{showQuickJumper:true,showSizeChanger:true}}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CostQueryDetail;
