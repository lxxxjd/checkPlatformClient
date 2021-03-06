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
import styles from './ListFictionReview.less';

const { Option } = Select;







/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ charge, loading }) => ({
  charge,
  loading: loading.models.charge,
}))
class ListFictionReviewBack extends PureComponent {
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
      title: '定价方式',
      dataIndex: 'priceway',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
    },
    {
      title: '单价',
      dataIndex: 'price',
    },
    {
      title: '总价',
      dataIndex: 'total',
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    // },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
          &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.init();
  }

  init =()=>{
    const { dispatch } = this.props;
    const listView = JSON.parse(localStorage.getItem("listListFictionReviewBack"));
    this.setState({list:listView});
    const values = {
      listno:listView.listno,
    };
    dispatch({
      type: 'charge/getReportListBylistnoFetch',
      payload:values,
    });
  };

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
   window.open("/Entrustment/DetailForEntrustment");
    localStorage.setItem('reportDetailNo',text.reportno);
  };




  handlePass = () => {
    this.handleReview('审核通过',"审核通过成功");
  };

  handleReview  =(state,text) => {
    const { dispatch} = this.props;
    let  values = this.state.list;
    values.paystatus=state;
    dispatch({
      type: 'charge/passListFictionFetch',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          localStorage.setItem("listListFictionReviewBack",JSON.stringify(values));
          this.state.list = values;
          message.success(text);
        }else{
          message.success('操作失败');
        }
      }
    });
  };

  handleNoPass = () => {
    Modal.confirm({
      title: '确定退回吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.handleReview('审核退回',"审核退回成功");
      }
    });

  };


  back = () => {
    router.push({
      pathname:'/Charge/ListReview',
    });
  };



    render(){
    const {
      charge:{reportByListno},
      loading,
    } = this.props;



    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row gutter={8}>
            <Col span={2}>
              <Button type="primary" onClick={this.handleNoPass} style={{ marginLeft: 1 }}>退回</Button>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 1  ,paddingLeft:0,paddingRight:15}} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <Row className={styles.card}>
            <Col sm={5}>
              <span level={4}> 清单编号：{this.state.list.listno} </span>
            </Col>
            <Col sm={17}>
              <span> 付款人：{this.state.list.payer} </span>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              dataSource={reportByListno}
              columns={this.columns}
              rowKey="reportno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ListFictionReviewBack;
