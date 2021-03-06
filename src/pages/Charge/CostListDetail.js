import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, DatePicker, message, Icon, Modal, Typography,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './DetailList.less';
const { Title} = Typography;
const { Option } = Select;


/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ costlist, loading }) => ({
  costlist,
  loading: loading.models.costlist,
}))
class CostListDetail extends PureComponent {
  state = {
    list:{},
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

  componentDidMount() {
    this.init();
  }

  init =()=>{
    const { dispatch } = this.props;
    const listView = JSON.parse(sessionStorage.getItem("CostListDetail_costlist"));
    const user = JSON.parse(localStorage.getItem("userinfo"));
    this.setState({list:listView});
    const values = new FormData();
    values.append("paylistno",listView.paylistno);
    values.append("certcode",user.certCode);
    dispatch({
      type: 'costlist/getCostBylistNO',
      payload:values,
      callback: (response) => {
        this.state.dataSource = response;
      }
    });
  };

  // eslint-disable-next-line no-shadow
  initData=(val,message)=>{
    if(val!==undefined && val!==null){
      return  <span>{message}: &nbsp;{ moment(val).format('YYYY-MM-DD')}</span>;
    }
    return  <span />;
  };

  // eslint-disable-next-line no-shadow
  initStringData=(val,message)=>{
    if(val!==undefined &&  val !==null){
      return  <span>{message}: &nbsp;{val}</span>;
    }
    return  <span />;
  };


  back = () =>{
    window.close();
  };


    render(){
    const {
      loading,
    } = this.props;

    const {list,dataSource} = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row gutter={8}>
            <Col span={3}>
              <Title level={3}>成本清单</Title>
            </Col>
            <Col span={19} />
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15}} onClick={this.back}>
                <Icon style={{paddingLeft:5}} type="close" />关闭
              </Button>
            </Col>
          </Row>
          <Row className={styles.card}>
            <Col sm={6}>
              <span level={4}> 清单编号：{list.paylistno} </span>
            </Col>
            <Col sm={12}>
              <span> 接收人：{list.paycompany} </span>
            </Col>
          </Row>
          <Row className={styles.card2}>
            <Col sm={6}>
              <span level={4}> 金额：{list.listmoney} </span>
            </Col>
            <Col sm={6}>
              <span> 拟制人：{list.listman} </span>
            </Col>
            <Col sm={6}>
              <span> 状态：{list.status} </span>
            </Col>
            <Col sm={6}>
              {this.initData(list.statusDate,'状态日期')}
            </Col>
          </Row>
          <Row className={styles.card2}>
            <Col sm={6}>
              {this.initStringData(list.reviewer,'审核人')}
            </Col>
            <Col sm={6}>
              {this.initData(list.reviewDate,'审核日期')}
            </Col>
            <Col sm={6}>
              {this.initStringData(list.refundMan,'退款人')}
            </Col>
            <Col sm={6}>
              {this.initData(list.refundDate,'退款日期')}
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="keyno"
              // pagination={false}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CostListDetail;
