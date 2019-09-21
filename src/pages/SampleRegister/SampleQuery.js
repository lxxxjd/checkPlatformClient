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
  Table, message,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';



const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ sample, loading }) => ({
  sample,
  loading: loading.models.sample,
}))

@Form.create()
class SampleQuery extends PureComponent {
  state = {
    formValues: {},
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '运输工具',
      dataIndex: 'shipname',
    },
    {
      title: '货名',
      dataIndex: 'cargoname',
    },
    {
      title: '样品编号',
      dataIndex: 'sampleno',
    },
    {
      title: '样品名称',
      dataIndex: 'samplename',
    },

    {
      title: '样品用途',
      dataIndex: 'sampleuse',
    },

    {
      title: '持有人',
      dataIndex: 'owner',
    },
    {
      title: '保存天数',
      dataIndex: 'duration',
    },
    {
      title: '存放位置',
      dataIndex: 'position',
    },
    {
      title: '制备日期',
      dataIndex: 'makingdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.toCustomerDetail(text, record)}>样品浏览</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    this.init();
  }

  init =() =>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'sample/getSampleRegisterByConditions',
      payload: params,
    });
  }

  previewItem = text => {
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
    });
    localStorage.setItem('reportDetailNo',text.reportno);
  };

  toCustomerDetail = text => {
    // localStorage.setItem('reportinfo',JSON.stringify(text));
    // router.push({
    //   pathname:'/TaskAppoint/CustomerServiceDetail',
    // });
    console.log(text);
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.init();
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
      if(fieldsValue.kind1 !==undefined &&fieldsValue.value1 !==undefined &&fieldsValue.condition1 !== undefined ){
        mkinds.push(fieldsValue.kind1 );
        mvalues.push(fieldsValue.value1);
        mconditions.push(fieldsValue.condition1 );
      }
      if(fieldsValue.kind2 !==undefined &&fieldsValue.value2 !==undefined &&fieldsValue.condition2 !== undefined ){
        mkinds.push(fieldsValue.kind2 );
        mvalues.push(fieldsValue.value2);
        mconditions.push(fieldsValue.condition2 );
      }
      if(fieldsValue.kind3 !==undefined &&fieldsValue.value3 !==undefined &&fieldsValue.condition3 !== undefined ){
        mkinds.push(fieldsValue.kind3 );
        mvalues.push(fieldsValue.value3);
        mconditions.push(fieldsValue.condition3 );
      }
      const params = {
        kinds :mkinds,
        values: mvalues,
        conditions:mconditions,
        certCode:user.certCode,
      };
      dispatch({
        type: 'sample/getSampleRegisterByConditions',
        payload: params,
      });
    });
  };



  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">


        <Row gutter={{ md: 6, lg: 18, xl: 5 }}>
          <Col md={3} sm={20}>
            <Form.Item
              className={styles.searchCondition}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind1', {
                rules: [{  message: '选择字段' }],
              })(
                <Select placeholder="选择字段">
                  <Option value="reportno"> 委托编号</Option>
                  <Option value="shipname">运输工具</Option>
                  <Option value="cargoname">货名</Option>
                  <Option value="sampleno">样品编号</Option>
                  <Option value="samplename">样品名称</Option>
                  <Option value="sampleuse">样品用途</Option>
                  <Option value="owner">持有人</Option>
                  <Option value="duration">保存天数</Option>
                  <Option value="position">存放位置</Option>
                  <Option value="status">状态</Option>
                </Select>
              )}
            </Form.Item>
          </Col>

          <Col md={2} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('condition1', {
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
          <Col md={5} sm={10}>
            <FormItem>
              {getFieldDecorator('value1',{rules: [{ message: '选择数值' }],})(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

          <Col md={3} sm={20}>
            <Form.Item
              className={styles.searchCondition}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind2', {
                rules: [{  message: '选择字段' }],
              })(
                <Select placeholder="选择字段">
                  <Option value="reportno"> 委托编号</Option>
                  <Option value="shipname">运输工具</Option>
                  <Option value="cargoname">货名</Option>
                  <Option value="sampleno">样品编号</Option>
                  <Option value="samplename">样品名称</Option>
                  <Option value="sampleuse">样品用途</Option>
                  <Option value="owner">持有人</Option>
                  <Option value="duration">保存天数</Option>
                  <Option value="position">存放位置</Option>
                  <Option value="status">状态</Option>
                </Select>
              )}
            </Form.Item>
          </Col>

          <Col md={2} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('condition2', {
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
          <Col md={5} sm={10}>
            <FormItem>
              {getFieldDecorator('value2',{rules: [{ message: '选择数值' }],})(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={{ md: 6, lg: 18, xl: 5 }} >

          <Col md={3} sm={20}>
            <Form.Item
              className={styles.searchCondition}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind3', {
                rules: [{  message: '选择字段' }],
              })(
                <Select placeholder="选择字段">
                  <Option value="reportno"> 委托编号</Option>
                  <Option value="shipname">运输工具</Option>
                  <Option value="cargoname">货名</Option>
                  <Option value="sampleno">样品编号</Option>
                  <Option value="samplename">样品名称</Option>
                  <Option value="sampleuse">样品用途</Option>
                  <Option value="owner">持有人</Option>
                  <Option value="duration">保存天数</Option>
                  <Option value="position">存放位置</Option>
                  <Option value="status">状态</Option>
                </Select>
              )}
            </Form.Item>
          </Col>

          <Col md={2} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('condition3', {
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
          <Col md={5} sm={10}>
            <FormItem>
              {getFieldDecorator('value3',{rules: [{ message: '选择数值' }],})(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

          <Col md={8} sm={20}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>


      </Form>
    );
  }




  render() {
    const {
      sample: {selectRegisterResult},
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="样品查询">

        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              rowKey="sampleno"
              loading={loading}
              dataSource={selectRegisterResult.list}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SampleQuery;
