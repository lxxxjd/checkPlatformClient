import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { Card, Divider ,Descriptions,Row, Col,  Button,Typography ,Modal,Icon,Table,notification} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './DetailForEntrustment.less';
import moment from 'moment'
import areaOptions from './areaOptions';
const { Title} = Typography;
@connect(({ entrustment,testRecordEntrustment, loading }) => ({
  entrustment,
  testRecordEntrustment,
  loading: loading.models.entrustment,
}))
class DetailForEnturstment extends Component {
  state = {
    visible: false ,
    showVisible:false,
    url:"",
    report:{},
    cnasInfo: {
      checkcode: '',
      checkname: '',
      domaincode: '',
      domainname: '',
      subdomaincode: '',
      subdomainname: '',
    },
  };

  columns = [
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

  componentWillMount() {
    const reportnNo = sessionStorage.getItem("reportno");
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'entrustment/getReport',
      payload: reportnNo,
      callback:response=>{
        const report = response;
        this.setState({report: response});
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
      type: 'testRecordEntrustment/getRecordInfo',
      payload:{
         reportno : reportnNo,
         source : '委托',
      }
    });
  }

  previewItem = text => {
    const { dispatch } = this.props;
    const osspath = text.filepath
    if(osspath === undefined || osspath === null){
      return;
    }
    var extension = osspath.substring(osspath.lastIndexOf(".")+1);
    if(extension==="pdf"){
      const reportno = sessionStorage.getItem('reportno');
      const params = {
        ...text,
        reportno:reportno,
        source : '委托',
      };
      dispatch({
        type: 'testRecordEntrustment/getRecord',
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
            window.open(url);
          }
        }
      });
    }else{
      const picUrl = `https://www.smlq.vip/api/cert_report/getFileStream?osspath=${osspath}`;
      window.open(picUrl);
    }
  };

  handleOk = e => {
    console.log(e);
    const { dispatch, match } = this.props;
    const reportnNo = sessionStorage.getItem("reportno");
    dispatch({
      type: 'entrustment/remove',
      payload: {reportno:reportnNo},
    });
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  deleteReport = () => {
    this.setState({
      visible: true,
    });
  };

  back = () =>{
    window.close();
  };

  showCancel = () =>{
    this.setState({showVisible:false});
  };

  getPlaceFromCode =(val)=>{
    const onelevel = `${val.substring(0,2)}0000`;
    const twolevel = `${val.substring(0,4)}00`;
    const threelevel = val;
    const oneitem = areaOptions.find(item => item.value === onelevel );
    if(oneitem===undefined){
      return <span>{threelevel}</span>;
    }
    const twoitem = oneitem.children.find(item => item.value === twolevel );
    const threeitem = twoitem.children.find(item => item.value === threelevel );
    return <span>{oneitem.label }/{  twoitem.label}/{   threeitem.label}</span>;
  };

  render() {
    const {
      testRecordEntrustment:{recordData},
      loading
    } = this.props;
    const { showVisible ,url, cnasInfo,report} = this.state;
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
          <Modal
            title="确认"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>是否撤销</p>
          </Modal>
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
            <Descriptions.Item label="证书要求">{report.certstyle !== null?["需要/"+report.certstyle]:[]}</Descriptions.Item>
            <Descriptions.Item label="自编号">{report.reportno20}</Descriptions.Item>
            <Descriptions.Item label="业务分类">{report.businesssort}</Descriptions.Item>
            <Descriptions.Item label="执行部门">{report.section}</Descriptions.Item>
            <Descriptions.Item label="海关部门">{report.customsName}</Descriptions.Item>
            <Descriptions.Item label="报关号">{report.customsNo}</Descriptions.Item>

          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="检查对象" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="检查品名">{report.cargoname}</Descriptions.Item>
            <Descriptions.Item label="中文俗名">{report.chineselocalname}</Descriptions.Item>
            <Descriptions.Item label="船名标识">{report.shipname}</Descriptions.Item>
            <Descriptions.Item label="申报数量">{((report.quantityd === undefined || report.quantityd === null ) ? "":report.quantityd+report.unit ) }</Descriptions.Item>
            <Descriptions.Item label="产地卸港">{report.fromto}</Descriptions.Item>
            <Descriptions.Item label="检验时间">{moment(report.inspdate).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="检验地点">{(report.inspplace1===undefined||report.inspplace1===null)?"":this.getPlaceFromCode(report.inspplace1)}</Descriptions.Item>
            <Descriptions.Item label="详细地点">{report.inspplace2}</Descriptions.Item>
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
        <Card bordered={false}  title="委托附件">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={recordData}
              columns={this.columns}
              rowKey="recordname"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Modal
          title="委托附件"
          visible={showVisible}
          onCancel={this.showCancel}
          footer={null}
          width={800}
          style={{ top: 10 }}
        >
          <embed src={url} style={{width:'100%', height:document.body.clientHeight*0.8}} type="application/pdf" />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default DetailForEnturstment;
