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
import styles from './DetailList.less';const { Title} = Typography;

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
    {
      title: '检验地点',
      dataIndex: 'inspplace2',
    },
    {
      title: '申报数量',
      render: (text, record) => this.getQuanlitydUnit(text)
    },
    {
      title: '检验费',
      dataIndex: 'total',
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
    const listView = JSON.parse(sessionStorage.getItem("reportnoForList"));
    this.setState({list:listView});
    const values = {
      listno:listView.listno,
    };
    dispatch({
      type: 'charge/getReportListBylistnoFetch',
      payload:values,
    });
  };

  getQuanlitydUnit=(text)=>{
    if(text.quantityd!==undefined&&text.quantityd!==null){
      return <span>{text.quantityd}{text.unit}</span>
    }
    return [];
  };

  // eslint-disable-next-line no-shadow
  initData=(val,message)=>{
    if(val!==undefined && val!==null){
      return  <span>{message}: &nbsp;{ moment(val).format('YYYY-MM-DD')}</span>;
    }
    return  <span> {message}:</span>;
  };

  // eslint-disable-next-line no-shadow
  initStringData=(val,message)=>{
    if(val!==undefined &&  val !==null){
      return  <span>{message}: &nbsp;{val}</span>;
    }
    return  <span> {message}:</span>;
  };


  back = () =>{
    window.close();
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
            <Col span={3}>
              <Title level={3}>收费清单</Title>
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
              <span level={4}> 清单编号：{list.listno} </span>
            </Col>
            <Col sm={9}>
              <span> 付款人：{list.payer} </span>
            </Col>
            <Col sm={9}>
              {this.initStringData(list.invoiceTitle,'到账账户')}
            </Col>
          </Row>
          <Row className={styles.card2}>
            <Col sm={6}>
              <span> 状态：{list.paystatus} </span>
            </Col>
            <Col sm={6}>
              {this.initData(list.listdate,'拟制日期')}
            </Col>
            <Col sm={6}>
              {this.initData(list.invoiceDate,'开票日期')}
            </Col>
            <Col sm={6}>
              {this.initData(list.paydate,'到账/退账日期')}
            </Col>
          </Row>
          <Row className={styles.card2}>
            <Col sm={6}>
              <span level={4}> 金额：{list.total} </span>
            </Col>
            <Col sm={6}>
              {this.initStringData(list.invoicesort,'发票类型')}
            </Col>
            <Col sm={6}>
              {this.initStringData(list.invoiceno,'发票号码')}
            </Col>
            <Col sm={6}>
              {this.initStringData(list.payway,'付款方式')}
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
