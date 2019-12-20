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
  Typography
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import moment from 'moment';

const { Text } = Typography;
const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))

@Form.create()
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
    perApprove:[]
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'applicant',
    },
    {
      title: '检验日期',
      dataIndex: 'inspdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
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
          {text.overallstate === '未受理' ? [<a onClick={() => this.acceptItem(text, record)}>受理&nbsp;&nbsp;</a>]:[]}
          {text.overallstate === '未受理' ? [<a onClick={() => this.deleteItem(text, record)}>拒绝受理&nbsp;&nbsp;</a>]:[]}
          <a onClick={() => this.previewItem(text, record)}>申请详情</a>
        </Fragment>
      ),
    },
  ];
  columns1 = [
    {
      title: '审批内容',
      dataIndex: 'applicant',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {text.overallstate === '未受理' ? [<a onClick={() => this.acceptItem(text, record)}>受理&nbsp;&nbsp;</a>]:[]}
          {text.overallstate === '未受理' ? [<a onClick={() => this.deleteItem(text, record)}>拒绝受理&nbsp;&nbsp;</a>]:[]}
          <a onClick={() => this.previewItem(text, record)}>申请详情</a>
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
        certCode:user.certCode
      },
      callback: response =>{
        this.setState({reportNum:response.data});
      }
    });
    dispatch({
      type: 'main/getBillTotalDay',
      payload: {
        certCode:user.certCode
      },
      callback: response =>{
        this.setState({dayDillTotal:response.data});
      }
    });
    dispatch({
      type: 'main/getBillTotalMonth',
      payload: {
        certCode:user.certCode
      },
      callback: response =>{
        this.setState({mouthBillTotal:response.data});
      }
    });
    dispatch({
      type: 'main/getBillTotalYear',
      payload: {
        certCode:user.certCode
      },
      callback: response =>{
        this.setState({yearBillTotal:response.data});
      }
    });
    dispatch({
      type: 'main/getPayTotalYear',
      payload: {
        certCode:user.certCode
      },
      callback: response =>{
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
        approver:user.nameC,
      },
      callback: response =>{
        this.setState({perApprove:response.data});
      }
    });
  }

  acceptItem = text => {
    sessionStorage.setItem('prereportno',text.prereportno);
    router.push({
      pathname:'/Entrustment/Accept',
    });
  };

  previewItem = text => {
    sessionStorage.setItem('prereportno',text.prereportno);
    router.push({
      pathname:'/Entrustment/DetailForUnAccept',
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



  render() {
    const {
      //preMainInfo: {preMainInfoList},
      loading,
    } = this.props;
    const {reportNum, dayDillTotal, mouthBillTotal, yearBillTotal, yearPayTotal, perTask, perApprove} = this.state;
    return (
      <PageHeaderWrapper>
          <Row gutter={16}>
            <Col span={6}>
              <Card size='small' bordered={false}>
                <Text>今日开票{dayDillTotal}</Text>
                <br/>
                <Text>今日委托{reportNum}</Text>  
              </Card>
            </Col>
            <Col span={6}>
              <Card size='small' bordered={false}>
              {mouthBillTotal[0]>mouthBillTotal[1]?[<Text type="danger">今年本月开票{mouthBillTotal[0]}</Text>]:[<span style={{color:'#52c41a'}}>今年本月开票{mouthBillTotal[0]}</span>]}
                <br/>
                <Text>去年本月开票{mouthBillTotal[1]}</Text>    
              </Card>
            </Col>
            <Col span={6}>
              <Card size='small' bordered={false}>
              {yearBillTotal[0]>yearBillTotal[1]?[<Text type="danger">今年累计开票{yearBillTotal[0]}</Text>]:[<span style={{color:'#52c41a'}}>今年累计开票{yearBillTotal[0]}</span>]}
                <br/>
                <Text>去年累计开票{yearBillTotal[1]}</Text>             
              </Card>
            </Col>
            <Col span={6}>
              <Card size='small' bordered={false}>
              {yearPayTotal[0]>yearPayTotal[1]?[<Text type="danger">今年累计到账{yearPayTotal[0]}</Text>]:[<span style={{color:'#52c41a'}}>今年累计到账{yearPayTotal[0]}</span>]}
                <br/>
                <Text>去年累计到账{yearPayTotal[1]}</Text>  
              </Card>
            </Col>          
          </Row>
          <br/>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="我的任务" size='small' bordered={false}>
                <Table
                  size="middle"
                  //className={styles.antTable}
                  //rowClassName={styles.antTable2}
                  loading={loading}
                  rowKey='prereportno'
                  dataSource={perTask}
                  columns={this.columns}
                  pagination={{showQuickJumper:true,showSizeChanger:true}}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="我的审批" size='small' bordered={false}>
                <Table
                  size="middle"
                  //className={styles.antTable}
                  //rowClassName={styles.antTable2}
                  loading={loading}
                  rowKey='prereportno'
                  dataSource={perApprove}
                  columns={this.columns1}
                  pagination={{showQuickJumper:true,showSizeChanger:true}}
                />
              </Card>
            </Col>
          </Row>

      </PageHeaderWrapper>
    );
  }
}

export default Main;
