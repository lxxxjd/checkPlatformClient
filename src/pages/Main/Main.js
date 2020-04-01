import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table,
  notification,
  Modal,
  Typography, message,Icon,Tooltip
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import moment from 'moment';
import { Bar } from '@/components/Charts';
import { ChartCard} from '@/components/Charts';
import Yuan from '@/utils/Yuan';

const { Text } = Typography;
const FormItem = Form.Item;
const { Option } = Select;


/* eslint react/no-multi-comp:0 */
@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))
class Main extends PureComponent {
  state = {
    visible:false,
    prereportno:null,
    reportNum:0,
    dayDillTotal:0,
    mouthBillTotal:[0,0],
    yearBillTotal:[0,0],
    yearPayTotal:[0,0],
    perTask:[],
    perApprove:[],
    totalPay:[],
    mouthBill:[],
    yearBill:[],
    yearPay:[],
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    // {
    //   title: '检验日期',
    //   dataIndex: 'inspdate',
    //   render: val => <span>{
    //     moment(val).format('YYYY-MM-DD')
    //   }</span>
    // },
    {
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {text.overallstate==="检查中" || text.overallstate==="检查完毕"?[<a onClick={() => this.resultItem(text, record)}>检查结果&nbsp;</a>]:[]}
          {text.overallstate==="检查中"|| text.overallstate==="检查完毕"?[<a onClick={() => this.recordItem(text, record)}>检查记录&nbsp;</a>]:[]}
          {text.overallstate==="测试中"?[<a onClick={() => this.InspectionArrangementItem(text, record)}>检测安排 &nbsp;</a>]:[]}
          {text.overallstate==="测试中"|| text.overallstate==="测试完毕"?[<a onClick={() => this.ResultUpdateMobileItem(text, record)}>结果录入&nbsp;</a>]:[]}
          {text.overallstate==="测试中"|| text.overallstate==="测试完毕"|| text.overallstate==="拟证中"|| text.overallstate==="拟证完毕"?[<a onClick={() => this.CertModifyItem(text, record)}>证书拟制&nbsp;</a>]:[]}
        </Fragment>
      ),
    },
  ];

  columns2 = [
    {
      title: '付款人',
      dataIndex: 'payer',
    },
    {
      title: '未定价',
      dataIndex: 'cost_1',
    },
    {
      title: '已定价未拟制',
      dataIndex: 'cost_2',
    },
    {
      title: '已拟制未开具',
      dataIndex: 'cost_3',
    },
    {
      title: '已开具未收讫',
      dataIndex: 'cost_4',
    },
    {
      title: '已收讫',
      dataIndex: 'cost_5',
    },
  ];

  columns1 = [
    {
      title: '委托编号/清单编号',
      dataIndex: 'sourceId2',
    },
    {
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '审批内容',
      dataIndex: 'source',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.approveItem(text, record)}>审批</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    dispatch({
      type: 'main/getReportNumDay',
      payload: {
        certcode:user.certCode
      },
      callback: response =>{
        this.setState({reportNum:response.data});
      }
    });
    dispatch({
      type: 'main/getBillTotalDay',
      payload: {
        certcode:user.certCode
      },
      callback: response =>{
        this.setState({dayDillTotal:response.data});
      }
    });
    dispatch({
      type: 'main/getBillTotalMonth',
      payload: {
        certcode:user.certCode
      },
      callback: response =>{
        var temp = [];
        temp.push({
          'x':'去年',
          'y':response.data[1]/10000,
        })
        temp.push({
          'x':'今年',
          'y':response.data[0]/10000
        })
        this.setState({mouthBill:temp});
        this.setState({mouthBillTotal:response.data});
      }
    });
    dispatch({
      type: 'main/getBillTotalYear',
      payload: {
        certcode:user.certCode
      },
      callback: response =>{
        var temp = [];
        temp.push({
          'x':'去年',
          'y':response.data[1]/10000,
        })
        temp.push({
          'x':'今年',
          'y':response.data[0]/10000
        })
        this.setState({yearBill:temp});
        this.setState({yearBillTotal:response.data});
      }
    });
    dispatch({
      type: 'main/getPayTotalYear',
      payload: {
        certcode:user.certCode
      },
      callback: response =>{
        var temp = [];
        temp.push({
          'x':'去年',
          'y':response.data[1]/10000,
        })
        temp.push({
          'x':'今年',
          'y':response.data[0]/10000
        });
        this.setState({yearPay:temp});
        this.setState({yearPayTotal:response.data});
      }
    });
    dispatch({
      type: 'main/getPerTask',
      payload: {
        inspman:user.nameC,
        certcode:user.certCode
      },
      callback: response =>{
        this.setState({perTask:response.data});
      }
    });
    dispatch({
      type: 'main/getPerApprove',
      payload: {
        approver:user.userName,
      },
      callback: response =>{
        this.setState({perApprove:response.data});
      }
    });
    dispatch({
      type: 'main/getTotalPay',
      payload: {
        username:user.userName ,
        certcode:user.certCode
      },
      callback: response =>{
        this.setState({totalPay:response.data});
      }
    });
  }

  approveItem = text => {
    /*
      检测结果待复核
      证书待拟制
      证书待复核
      证书待缮制
      证书待授权
      证书待发布
      清单待审核
      成本待审核
     */
    sessionStorage.setItem('reportno',text.sourceId2);
    sessionStorage.setItem('shipname',"");
    sessionStorage.setItem('applicant',"");
    if(text.source.trim() === "证书待拟制"){
      router.push({
        pathname:'/Certificate/CertificateUploadDetail',
      });
    }else if(text.source.trim() === "证书待复核"){
      router.push({
        pathname:'/Certificate/CertificateReviewDetail',
      });
    }else if(text.source.trim() === "证书待缮制"){
      router.push({
        pathname:'/Certificate/CertificateMakeDetail',
      });
    }else if(text.source.trim() === "证书待授权"){
      router.push({
        pathname:'/Certificate/CertificateSealDetail',
      });
    }else if(text.source.trim() === "证书待发布"){
      router.push({
        pathname:'/Certificate/CertificatePublishDetail',
      });
    }else if(text.source.trim() === "清单待审核"){
      const{dispatch} = this.props;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      dispatch({
        type: 'main/getListBylistno',
        payload: {
          certcode:user.certCode,
          listno:text.sourceId2,
        },
        callback: (response) => {
          if (response) {
            localStorage.setItem('listListFictionReview',JSON.stringify(response));
            router.push({
              pathname:'/Charge/ListFictionReview',
            });
          }
        }
      });
    }else if(text.source.trim() === "成本待审核"){
      const{dispatch} = this.props;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      dispatch({
        type: 'main/getCostListByPayListNo',
        payload: {
          certcode:user.certCode,
          paylistno:text.sourceId2,
        },
        callback: (response) => {
          if (response) {
            sessionStorage.setItem('CostListDetailReviewPass_costlist',JSON.stringify(response));
            router.push({
              pathname:'/CostManage/CostListDetailReviewPass',
            });
          }
        }
      });
    }else if(text.source.trim() === "检测结果待复核"){
      sessionStorage.setItem('result_review_pass_or_return',"pass");
      router.push({
        pathname:'/InspectionAnalysis/ResultDetailReview',
      });
    }
  };

  resultItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('applicant',"");
    router.push({
      pathname:'/TestRecord/ResultDetail',
    });
  };

  recordItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('applicant',"");
    router.push({
      pathname:'/TestRecord/UploadDetail',
    });
  };

  InspectionArrangementItem = text =>{
    localStorage.setItem('taskInspmanDetail',JSON.stringify(text));
    sessionStorage.setItem('overallstate_InspmanDetail',text.overallstate);
    router.push({
      pathname:'/InspectionAnalysis/InspmanDetail',
    });
  };

  ResultUpdateMobileItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('sampleno',text.sampleno);
    router.push({
      pathname:'/InspectionAnalysis/ResultUpdateDetail',
    });
  };

  CertModifyItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('shipname',text.shipname);
    sessionStorage.setItem('applicant',text.applicant);
    router.push({
      pathname:'/Certificate/CertificateUploadDetail',
    });
  };

  deleteItem = text => {
    const { dispatch } = this.props;
    dispatch({
      type: 'preMainInfo/unAcceptPremaininfo',
      payload: {
        prereportno:text.prereportno,
      },
      callback:response =>{
        if (response.code === 200) {
          notification.open({
            message: '拒绝成功',
          });
          this.componentDidMount();
        }else {
          notification.open({
            message: '拒绝失败',
            description: response.data,
          });
        }
      }
    });
  };

  transfor = value =>{
    return (value / 10000).toFixed(2) +"万元"
  };

  render() {
    const {
      //preMainInfo: {preMainInfoList},
      loading,
    } = this.props;
    // const user = JSON.parse(localStorage.getItem("userinfo"));
    const {reportNum, dayDillTotal, mouthBillTotal, yearBillTotal, yearPayTotal, perTask, perApprove, totalPay, salesData, mouthBill, yearBill, yearPay} = this.state;
    return (
      <PageHeaderWrapper>
          <Row gutter={16}>
            <Col span={6}>
              <Card size='small' bordered={false}>
                {/*<div>*/}
                {/*  <div align="center" style={{backgroundColor:'white',height:200}}>*/}
                {/*    <img src="https://checkplatform2.oss-cn-hangzhou.aliyuncs.com/platform/main/mainpic.png" style={{width:'100%',paddingLeft:10,paddingRight:10,height:180,paddingTop:20}} />*/}
                {/*  </div>*/}
                {/*  <div align="center">*/}
                {/*    <Text style={{color:'#52c41a'}}>今日开票{this.transfor(dayDillTotal)}</Text>*/}
                {/*    <br />*/}
                {/*    <Text>今日委托{reportNum}</Text>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <div>
                  <div align="center" style={{backgroundColor:'white',height:200}}>
                    <ChartCard
                      style={{backgroundColor:'white',height:100}}
                      bordered={false}
                      title="今日开票"
                      action={
                        <Tooltip
                          title="指标说明：今日开票的金额（元）"
                        >
                          <Icon type="info-circle-o" />
                        </Tooltip>
                      }
                      loading={loading}
                      total={() => <Yuan>{this.transfor(dayDillTotal)}单</Yuan>}
                      contentHeight={46}
                    />
                    <ChartCard
                      bordered={false}
                      title="今日委托"
                      action={
                        <Tooltip
                          title="指标说明：今日委托的数量"
                        >
                          <Icon type="info-circle-o" />
                        </Tooltip>
                      }
                      loading={loading}
                      total={() => <span>{reportNum}</span>}
                      contentHeight={46}
                    />
                  </div>
                  <div align="center" style={{backgroundColor:'white',width:'100%'}}>
                    <Text style={{fontWeight:'bold',color:'#52c41a',fontFamily:"楷体",fontSize:20}}>祝您开心每一天！</Text>
                    <br />
                    <br />
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size='small' bordered={false}>
                <Bar
                  height={200}
                  //title=''
                  data={mouthBill}
                />
                <div align="center">
                  {mouthBillTotal[0]>mouthBillTotal[1]?[<Text style={{fontWeight:'bold',fontFamily:"楷体",color:'#52c41a'}}>今年本月开票{this.transfor(mouthBillTotal[0])}</Text>]:[<span style={{fontWeight:'bold',fontFamily:"楷体",color:'#52c41a'}}>今年本月开票{this.transfor(mouthBillTotal[0])}</span>]}
                  <br />
                  <Text style={{fontWeight:'bold',fontFamily:"楷体"}}>去年本月开票{this.transfor(mouthBillTotal[1])}</Text>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size='small' bordered={false}>
                <Bar
                  height={200}
                  //title=''
                  data={yearBill}
                />
                <div align="center">
                  {yearBillTotal[0]>yearBillTotal[1]?[<Text style={{fontWeight:'bold',fontFamily:"楷体",color:'#52c41a'}}>今年累计开票{this.transfor(yearBillTotal[0])}</Text>]:[<span style={{fontWeight:'bold',fontFamily:"楷体",color:'#52c41a'}}>今年累计开票{this.transfor(yearBillTotal[0])}</span>]}
                  <br />
                  <Text style={{fontWeight:'bold',fontFamily:"楷体"}}>去年累计开票{this.transfor(yearBillTotal[1])}</Text>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size='small' bordered={false} >
                <Bar
                  height={200}
                  //title=''
                  data={yearPay}
                />
                <div align="center">
                  {yearPayTotal[0]>yearPayTotal[1]?[<Text style={{fontWeight:'bold',fontFamily:"楷体",color:'#52c41a'}}>今年累计到账{this.transfor(yearPayTotal[0])}</Text>]:[<span style={{fontWeight:'bold',fontFamily:"楷体",color:'#52c41a'}}>今年累计到账{this.transfor(yearPayTotal[0])}</span>]}
                  <br/>
                  <Text style={{fontWeight:'bold',fontFamily:"楷体"}}>去年累计到账{this.transfor(yearPayTotal[1])}</Text>
                </div>
              </Card>
            </Col>
          </Row>
          <br/>
          <Card title="我的收费统计" size='small' bordered={false}>

              <Table
                size="middle"
                loading={loading}
                rowKey='payer'
                bordered
                dataSource={totalPay}
                columns={this.columns2}
                pagination={{showQuickJumper:true,showSizeChanger:true}}
              />
          </Card>
          <br/>
          <Row gutter={16}>
            <Col span={13}>
              <Card title="我的任务" size='small' bordered={false}>
                  <Table
                    size="middle"
                    loading={loading}
                    rowKey='reportno'
                    dataSource={perTask}
                    columns={this.columns}
                    pagination={{showQuickJumper:true,pageSize: 3}}
                  />
              </Card>
            </Col>
            <Col span={11}>
              <Card title="我的审批" size='small' bordered={false}>
                <Table
                  size="middle"
                  loading={loading}
                  rowKey='keyno'
                  dataSource={perApprove}
                  columns={this.columns1}
                  pagination={{showQuickJumper:true,pageSize: 3}}
                />
              </Card>
            </Col>
          </Row>

      </PageHeaderWrapper>
    );
  }
}

export default Main;
