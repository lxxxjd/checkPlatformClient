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
  Table, message, Icon,
  Checkbox,
  Image, Modal, Descriptions, Switch, DatePicker,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import queryStyles from './CostQuery.less'
import styles from '../table.less';





// 查看框
const ReviewFrom = (props => {
  const { modalReviewVisible, handleModalReviewVisible,modalInfo  } = props;

  // 处理操作时间
  const handleDate = (val) => {
    if(val!==undefined && val!==null){
      return  <span>{ moment(val).format('YYYY-MM-DD')}</span>;
    }
    return null;
  };
  // 处理操作时间
  const date = handleDate(modalInfo.makingdate);
  return (
    <Modal
      destroyOnClose
      title="查看样品详情"
      visible={modalReviewVisible}
      style={{ top: 100 }}
      width={800}
      onCancel={() => handleModalReviewVisible()}
      footer={[
        <Button type="primary" onClick={() => handleModalReviewVisible()}>
          关闭
        </Button>
      ]}
    >
      <Descriptions bordered>
        <Descriptions.Item label="委托编号">{modalInfo.reportno}</Descriptions.Item>
        <Descriptions.Item label="船名标识">{modalInfo.shipname}</Descriptions.Item>
        <Descriptions.Item label="检查品名">{modalInfo.cargoname}</Descriptions.Item>
        <Descriptions.Item label="样品编号">{modalInfo.cargoname}</Descriptions.Item>
        <Descriptions.Item label="样品名称">{modalInfo.samplename}</Descriptions.Item>
        <Descriptions.Item label="样品用途">{modalInfo.sampleuse}</Descriptions.Item>
        <Descriptions.Item label="持有人">{modalInfo.duration}</Descriptions.Item>
        <Descriptions.Item label="保存天数">{modalInfo.reportno}</Descriptions.Item>
        <Descriptions.Item label="存放位置">{modalInfo.position}</Descriptions.Item>
        <Descriptions.Item label="制备日期">{date}</Descriptions.Item>
        <Descriptions.Item label="状态">{modalInfo.status}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
});




let id = 0;

// 正文页面
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ cost, loading }) => ({
  cost,
  loading: loading.models.cost,
}))
@Form.create()
class CostQuery extends PureComponent {
  state = {
    formValues: {},
    modalReviewVisible:false,
    modalInfo :{},
    costResult:[],
    costsum:'0',
  };

  columns = [
    {
      title: '发生日期',
      dataIndex: 'occurdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '费用种类',
      dataIndex: 'costtype',
    },
    {
      title: '费用名称',
      dataIndex: 'costname',
    },
    {
      title: '金额',
      dataIndex: 'costmoney',
    },
    {
      title: '清单号',
      dataIndex: 'paylistno',
    },
    {
      title: '接收人',
      dataIndex: 'reciever',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() =>  this.handleReview(true,text)}>查看</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    this.init();
  }

  // eslint-disable-next-line react/sort-comp
  init =() =>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'cost/selectCostByConditions',
      payload: params,
      callback: (response) => {
          this.state.costResult = response;
        dispatch({
          type: 'cost/selectCostByConditionsSumMoney',
          payload: params,
          callback: (response2) => {
            if(response2.code ===200){
              this.setState({costsum:response2.data});
            }
          }
        });
      }
    });
  };

  previewItem = text => {
   window.open("/Entrustment/DetailForEntrustment");
    localStorage.setItem('reportDetailNo',text.reportno);
  };


  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
    this.flag = 0;

  };





  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err){
        console.log(err);
        return;
      }
      const user = JSON.parse(localStorage.getItem("userinfo"));
      let mkinds=[];
      let mvalues=[];
      let mconditions=[];


      // 日期条件，日期间隔statisticFields
      if(fieldsValue.occurdate !== undefined){
        if(fieldsValue.occurdate !== undefined && fieldsValue.occurdate.length!==0){
          mkinds.push("occurdate");
          mkinds.push("occurdate");
          mconditions.push(">=");
          mvalues.push(moment(fieldsValue.occurdate[0]).format('YYYY-MM-DD'));
          mconditions.push("<=");
          mvalues.push(moment(fieldsValue.occurdate[1]).format('YYYY-MM-DD'));
        }
      }

      const keys = form.getFieldValue('keys');
      for(let key in keys){
        let k = keys[key];
        console.log(k);
        const kind = form.getFieldValue(`kinds${k}`);
        const condition = form.getFieldValue(`conditions${k}`);
        const value = form.getFieldValue(`values${k}`);
        const checkk = form.getFieldValue(`check${k}`);
        if( checkk ===true &&  kind!==undefined &&value !==undefined &&condition !== undefined ){
          mkinds.push(kind );
          mvalues.push(value);
          mconditions.push(condition);
        }
      }
      const params = {
        kinds :mkinds,
        values: mvalues,
        conditions:mconditions,
        certCode:user.certCode,
      };
      dispatch({
        type: 'cost/selectCostByConditions',
        payload: params,
        callback: (response) => {
          this.state.costResult = response;
          dispatch({
            type: 'cost/selectCostByConditionsSumMoney',
            payload: params,
            callback: (response2) => {
              if(response2.code ===200){
                this.setState({costsum:response2.data});
              }
            }
          });
        }
      });

    });
  };

  handleTotalSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err){
        console.log(err);
        return;
      }
      const user = JSON.parse(localStorage.getItem("userinfo"));
      let mkinds=[];
      let mvalues=[];
      let mconditions=[];


      // 日期条件，日期间隔statisticFields
      if(fieldsValue.occurdate !== undefined){
        if(fieldsValue.occurdate !== undefined && fieldsValue.occurdate.length!==0){
          mkinds.push("occurdate");
          mkinds.push("occurdate");
          mconditions.push(">=");
          mvalues.push(moment(fieldsValue.occurdate[0]).format('YYYY-MM-DD'));
          mconditions.push("<=");
          mvalues.push(moment(fieldsValue.occurdate[1]).format('YYYY-MM-DD'));
        }
      }

      const keys = form.getFieldValue('keys');
      for(let key in keys){
        let k = keys[key];
        console.log(k);
        const kind = form.getFieldValue(`kinds${k}`);
        const condition = form.getFieldValue(`conditions${k}`);
        const value = form.getFieldValue(`values${k}`);
        const checkk = form.getFieldValue(`check${k}`);
        if( checkk ===true &&  kind!==undefined &&value !==undefined &&condition !== undefined ){
          mkinds.push(kind );
          mvalues.push(value);
          mconditions.push(condition);
        }
      }
      const params = {
        kinds :mkinds,
        values: mvalues,
        conditions:mconditions,
        certCode:user.certCode,
      };
      dispatch({
        type: 'cost/selectCostByConditionsSumMoney',
        payload: params,
        callback: (response2) => {
          if(response2.code ===200){
            this.setState({costsum:response2.data});
          }
        }
      });
    });
  };

  handleReview = (flag,text) => {
    sessionStorage.setItem('reportno',text.reportno);
    localStorage.setItem('reportDetailNo',text.reportno);
    sessionStorage.setItem('CostListDetail_costlist',JSON.stringify(text));
    window.open("/Statistics/CostQueryDetail");
  };



  handleModalReviewVisible = (flag) => {
    this.setState({
      modalReviewVisible: !!flag,
    });
  };



  // eslint-disable-next-line react/sort-comp
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {costsum} = this.state;
    const { RangePicker } = DatePicker;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={16}>
          <Col span={4} style={{marginBottom:5}}>
            <h3 style={{fontWeight:'bold'}}>统计结果:</h3>
          </Col>
          <Col span={12} style={{marginBottom:5,marginLeft:200,marginRight:200}}>
            <h3 style={{fontWeight:'bold'}}>成本总额：{costsum!==undefined&&costsum!==null? costsum:0}</h3>
          </Col>
        </Row>
        <Row gutter={{ md: 6, lg: 18, xl: 5 }}>
          <Col span={9}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              label="发生日期"
              colon={false}
            >
              {getFieldDecorator("occurdate", {
              })(
                <RangePicker
                  format="YYYY-MM-DD"
                />
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={20}>
            <span className={styles.submitButtons}>
              <Button type="primary" style={{ marginLeft: 8 }} htmlType="submit">
                查询
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleTotalSearch}>
                查询总额
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleAdvanceSearch}>
                高级检索
              </Button>
              <Button style={{ marginLeft: 0 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
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





  render() {
    const {
      // cost: {getAllCostResult},
      loading,
    } = this.props;


    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const { modalReviewVisible,modalInfo ,costResult} = this.state;
    const parentMethods = {
      handleModalReviewVisible:this.handleModalReviewVisible,
    };

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
                <Option value="cargoname">检查项目</Option>
                <Option value="cargosort">货物种类</Option>
                <Option value="inspectplace">检验地点</Option>
                <Option value="section">执行部门</Option>
                <Option value="applicant">委托人</Option>
                <Option value="agent">代理人</Option>
                <Option value="payer">付款人</Option>
                <Option value="costtype">费用种类</Option>
                <Option value="costname">费用名称</Option>
                <Option value="reciever">接收人</Option>
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
          <FormItem>
            {getFieldDecorator(`values${k}`,{rules: [{ message: '选择数值' }],})(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={1} sm={5}>
          {keys.length >= 1 ? (
            <Icon style={{fontSize:24,marginLeft:8}} type="minus-circle" theme='twoTone' twoToneColor="#ff0000" onClick={() => this.remove(k)} />
              ) : null}
        </Col>
      </div>
    ));



    return (
      <PageHeaderWrapper title="样品查询">
        <ReviewFrom {...parentMethods} modalReviewVisible={modalReviewVisible} modalInfo={modalInfo} />
        <Card bordered={false} size="small">
          <Form onSubmit={this.handleSubmit}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Row className={styles.tableListForm}>{formItems}</Row>
          </Form>
          <div className={styles.tableList}>
            <Table
              size="middle"
              rowKey="keyno"
              loading={loading}
              dataSource={costResult}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CostQuery;
