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
  Table, DatePicker, message, Icon,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';

const { Option } = Select;


class Query  extends PureComponent {
  state = {}

  handleQuerySearch = e => {
    e.preventDefault();
    const { dispatch, form} = this.props;
    const {handleStateData} = this.props;


    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        ...fieldsValue,
        payer: fieldsValue.selectPayer,
        begindate: fieldsValue.begindate,
        enddate: fieldsValue.enddate,
        certCode: user.certCode,
      };
      dispatch({
        type: 'charge/getReportsFetch',
        payload:values,
        callback: (response) => {
          handleStateData(response);
        }
      });
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };


  // eslint-disable-next-line react/require-render-return
  render() {
    const { form,allReporterName} = this.props
    const { getFieldDecorator } = form;
    const reportNameOptions = allReporterName.map(d => <Option key={d} value={d}>{d}</Option>);
    return (
      <Form onSubmit={this.handleQuerySearch} layout="inline">

        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>

          <Col md={5} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
              label="查询条件：在"
            >
              {getFieldDecorator('begindate', {
              })(
                <DatePicker
                  placeholder="开始日期"
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                />
              )}
            </Form.Item>
          </Col>

          <Col md={5} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
              label=" &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;到"
            >
              {getFieldDecorator('enddate', {
              })(
                <DatePicker
                  placeholder="结束日期"
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                />
              )}
            </Form.Item>
          </Col>

          <Col md={6} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
              label="付款人"
            >
              {getFieldDecorator('selectPayer', {
                rules: [{  message: '请选择付款人' }],
              })(
                <Select placeholder="请选择付款人">
                  {reportNameOptions}
                </Select>
              )}
            </Form.Item>
          </Col>

          <Col md={8} sm={20}>
            <span className={styles.submitButtons}>
              <Button type="primary" onClick={this.handleQuerySearch}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                清空条件
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
}


// eslint-disable-next-line no-class-assign
Query = Form.create()(Query)

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ charge,loading }) => ({
  charge,
  loading: loading.models.charge,
}))
class ListFictionAdd extends PureComponent {
  state = {
    selectedRowKeys: [],
    priceMaking:[],
    allReporterName: [],
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
      title: '付款人',
      dataIndex: 'payer',
    },
    {
      title: '价格',
      dataIndex: 'total',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.mobileItem(text)}>定价</a>
          &nbsp;&nbsp;
          <a onClick={() => this.removeExistItem(text, record)}>删除</a>
          &nbsp;&nbsp;
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
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'charge/getReportsFetch',
      payload:{
        certCode:user.certCode
      },
      callback: (response) => {
        if(response){
            this.state.priceMaking=response;
        }else{
          message.success('加载失败');
        }
      }
    });

    dispatch({
      type: 'charge/getClientName',
      payload: {},
      callback: (response) => {
        this.setState({allReporterName: response})
      }
    });

  }

  handleFormReset = ()=>{
    const { form } = this.props;
    form.resetFields();
    this.init();
  }

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
    localStorage.setItem('reportDetailNo',text.reportno);
  };

  removeExistItem = text => {
    this.state.exist=this.listRemoveItem(this.state.priceMaking,text.reportno);
    const dataSource = [...this.state.priceMaking];
    this.setState({ priceMaking: dataSource.filter(item => item.reportno !== text.reportno) });
  };

  listRemoveItem = (source, match)=>{
    var len = source.length;
    while (len--) {
      if (len in source && source[len] === match) {
        source.splice(len, 1);
      }
    }
    return source;
  };




  handleSubmit = () => {
    const { dispatch, form } = this.props;
    const {state} = this;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      let priceMakingSelect=[];
      // eslint-disable-next-line no-restricted-syntax
      for( const i of state.selectedRowKeys){
        let itemPrice = state.priceMaking.find(item => item.reportno === i );
        if(itemPrice) {
          priceMakingSelect.push(itemPrice);
        }
      }
      const values = {
        ...fieldsValue,
        priceMakings:priceMakingSelect,
        certcode:user.certCode,
        listman:user.userName,
      };
      dispatch({
        type: 'charge/addListFetch',
        payload:values,
        callback: (response) => {
          console.log(response);
          if(response==="success"){
            message.success('添加成功');
          }else{
            message.success('清单号已存在，添加失败');
          }
        }
      });
    });
  }


  back = () => {
    router.push({
      pathname:'/Charge/ListFiction',
    });
  };


  renderSimpleForm() {
  const {
    form: { getFieldDecorator },
  } = this.props;

    const {allReporterName} = this.state;
    const reportNameOptions = allReporterName.map(d => <Option key={d} value={d}>{d}</Option>);

  return (
    <Form onSubmit={this.handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col span={6}>
          <Form.Item
            label="清单号"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            colon={false}>
            {getFieldDecorator('listno', {
              rules: [{ required: true,message:"请输入清单" }],
            })(<Input title="清单号" style={{ width: '100%' }} placeholder="请输入清单号" />)}
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
            colon={false}
            label="付款人"
          >
            {getFieldDecorator('payer', {
              rules: [{ required: true,message:"请选择付款人"}],
            })(
              <Select placeholder="请选择付款人">
                {reportNameOptions}
              </Select>
            )}
          </Form.Item>
        </Col>

      </Row>
    </Form>
  );
  }


  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  handleStateData =(res)=>{
    this.state.priceMaking = res;
    console.log("test");
    console.log(this.state.priceMaking);
  }

  // 定价
  mobileItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('reportdate',text.reportdate);
    sessionStorage.setItem('applicant',text.applicant);
    sessionStorage.setItem('cargoname',text.cargoname);
    sessionStorage.setItem('inspway',text.inspway);
    sessionStorage.setItem('FinalPriceOrigin','ListFictionAdd');

    router.push({
      pathname:'/Charge/FinalPriceDetail',
    });
  };





  render(){
    const {
      charge:{reports},
      loading,
    } = this.props;

      const parentMethods = {
        handleStateData: this.handleStateData,
      };

    const {priceMaking} = this.state;
    const {  selectedRowKeys,allReporterName } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.process !== '已定价' || record.price==="", // Column configuration not to be checked
        process: record.process,
      }),
    }

    return (
      <PageHeaderWrapper title="清单拟制">
        <Card bordered={false} size="small">

          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={20}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                  拟制
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15}} onClick={this.back}>  <Icon type="left" />返回</Button>
              </span>
            </Col>
          </Row>

          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListForm}><Query dispatch={this.props.dispatch} {...parentMethods} init={this.init} allReporterName={allReporterName} /></div>
            <Table
              loading={loading}
              dataSource={priceMaking}
              columns={this.columns}
              rowKey="reportno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              rowSelection={rowSelection}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ListFictionAdd;
