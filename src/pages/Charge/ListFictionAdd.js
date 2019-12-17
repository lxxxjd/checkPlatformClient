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
  Table, DatePicker, message, Icon, Switch,Radio
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import queryStyles from '../SampleRegister/SampleQuery.less';

const {  RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

let id = 0;
// eslint-disable-next-line no-class-assign,react/no-multi-comp
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

  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
    this.flag = 0;
  };

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
  };


  back = () => {
    router.push({
      pathname:'/Charge/ListFiction',
    });
  };

  handleSearch =()=>{
    const { dispatch, form } = this.props;
    const {state} = this;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
    });
  };



  // eslint-disable-next-line react/sort-comp
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 18, xl: 5 }}>
          <Col md={12} sm={20}>
            <span className={styles.submitButtons}>
              <Button style={{ marginLeft: 0 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleAdvanceSearch}>
                高级检索
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleSearch}>
                查询
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleSubmit}>拟制
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.back}>返回</Button>
            </span>
          </Col>
        </Row>
        <Row gutter={{ md: 6, lg: 18, xl: 5 }}>
          <Col md={8} sm={20}>
            <Form.Item
              label="付款人"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('payer',{rules: [{ message: '请输入' }],})(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={20}>
            <Form.Item
              label="委托日期："
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('reportdate', {
              })(
                <RangePicker
                  defaultValue={[moment('1960/10/1', dateFormat), moment('2019/10/10', dateFormat)]}
                  format={dateFormat}
                />
              )}
            </Form.Item>
          </Col>
          <Col md={7} sm={20}>
            <Form.Item
              label="收费状态："
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('status',{rules: [{ message: '请输入' }],})(
                <Radio.Group defaultValue="全部" buttonStyle="solid">
                  <Radio.Button value="全部">全部</Radio.Button>
                  <Radio.Button value="未定价">未定价</Radio.Button>
                  <Radio.Button value="已定价未拟制">已定价未拟制</Radio.Button>
                </Radio.Group>)}
            </Form.Item>
          </Col>
          <Col md={1} sm={20}>  <Icon type="plus-circle" style={{fontSize:24,marginTop:4}} theme='twoTone' twoToneColor="#00ff00" onClick={this.add} /></Col>
        </Row>


      </Form>
    );
  }


  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    // if (keys.length === 1) {
    //   return;
    // }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });


  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // eslint-disable-next-line no-plusplus
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };


  flag = 0;

  handleAdvanceSearch =()=>{
    if(this.flag ===0){
      let i =4;
      while(i>0){
        this.add();
        // eslint-disable-next-line no-plusplus
        i--;
      }
      this.flag = 1;
    }
  };

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

    const {priceMaking} = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <div>
        { index %2===0 && keys.length!==0? (
          <Row className={queryStyles.rowClass} />
        ) : null}
        <Col md={1} sm={20}>
          <Form.Item
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
            colon={false}
          >
            {getFieldDecorator(`check${k}`, {
              initialValue: true,
              valuePropName: 'checked',
            })(
              <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
            )}
          </Form.Item>
        </Col>
        <Col md={3} sm={20}>
          <Form.Item
            style={{marginRight:8}}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
          >
            {getFieldDecorator(`kinds${k}`, {
              rules: [{  message: '选择字段' }],
            })(
              <Select placeholder="选择字段">
                <Option value="reportno"> 委托编号</Option>
                <Option value="shipname">船名标识</Option>
                <Option value="cargoname">检查品名</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col md={3} sm={20}>
          <Form.Item
            style={{marginRight:8}}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
          >
            {getFieldDecorator(`conditions${k}`, {
              rules: [{  message: '选择条件' }],
            })(
              <Select placeholder="选择条件">
                <Option value="=">等于</Option>
                <Option value="!=">不等于</Option>
                <Option value="like">包含</Option>
                <Option value="not like">不包含</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col md={4} sm={10}>
          <Form.Item>
            {getFieldDecorator(`values${k}`,{rules: [{ message: '选择数值' }],})(<Input placeholder="请输入" />)}
          </Form.Item>
        </Col>
        <Col md={1} sm={5}>
          {keys.length >= 1 ? (
            <Icon style={{fontSize:24,marginLeft:8}} type="minus-circle" theme='twoTone' twoToneColor="#ff0000" onClick={() => this.remove(k)} />
          ) : null}
        </Col>
      </div>
    ));

    return (
      <PageHeaderWrapper title="清单拟制">
        <Card bordered={false} size="small">

          <div className={styles.tableList}>
            <Form onSubmit={this.handleSubmit}>
              <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
              <Row className={styles.tableListForm}>{formItems}</Row>
            </Form>
            <Table
              style={{marginTop:5}}
              loading={loading}
              dataSource={priceMaking}
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

export default ListFictionAdd;
