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
  Table, DatePicker, message, Icon, Modal,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './DetailList.less';

const { Option } = Select;





/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ charge, loading }) => ({
  charge,
  loading: loading.models.charge,
}))
class DetailList extends PureComponent {
  state = {
    list:{},
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
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '检查品名',
      dataIndex: 'cargoname',
    },
    {
      title: '申请项目',
      dataIndex: 'inspway',
    },
    // {
    //   title: '付款人',
    //   dataIndex: 'payer',
    // },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '状态',
      dataIndex: 'process',
    },
  ];

  componentDidMount() {
    this.init();
  }

  init =()=>{
    const { dispatch } = this.props;
    const listView = JSON.parse(sessionStorage.getItem("reportnoForList"));
    this.setState({list:listView});
    const values = {
      listno:listView.listno,
    };
    dispatch({
      type: 'charge/getReportListBylistnoFetch',
      payload:values,
    });
  }

  // eslint-disable-next-line no-shadow
  initData=(val,message)=>{
    if(val!==null){
      return  <span>{message}:{ moment(val).format('YYYY-MM-DD')}</span>;
    }
    return  <span> </span>;
  }


  back = () =>{
    this.props.history.goBack();
  };


    render(){
    const {
      charge:{reportByListno},
      loading,
    } = this.props;

    const {list} = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row gutter={8}>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 1  ,paddingLeft:0,paddingRight:15}} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <Row className={styles.card}>
            <Col sm={5}>
              <span level={4}> 清单编号：{list.listno} </span>
            </Col>
            <Col sm={10}>
              <span> 付款人：{list.payer} </span>
            </Col>
            <Col sm={5}>
              {this.initData(list.listdate,'拟制日期')}
            </Col>
          </Row>
          <Row className={styles.card2}>
            <Col sm={5}>
              <span> 状态：{list.invoiceStatus} </span>
            </Col>
            <Col sm={5}>
              <span level={4}> 金额：{list.total} </span>
            </Col>
            <Col sm={5}>
              {this.initData(list.invoiceDate,'开票日期')}
            </Col>
            <Col sm={5}>
              {this.initData(list.paydate,'到账/退账日期')}
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              dataSource={reportByListno}
              columns={this.columns}
              rowKey="reportno"
              pagination={false}
              // pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DetailList;
