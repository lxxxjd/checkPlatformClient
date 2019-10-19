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
  Modal,
  Checkbox,
  Radio,
  Table,
  DatePicker, message,
  Icon,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './SampleRegisterDetail.less';
import moment from 'moment';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;


// 修改组件
const ArrivalInvoiceForm = Form.create()(props => {
  const { handleModifyModalVisble, form, modifyModalVisble,sampledata,dispatch,init} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let values = fieldsValue;
      // values.paydate= fieldsValue.paydate;
      // values.invoiceStatus ='已到账';
      dispatch({
        type: 'sample/updateSampleRegistersFetch',
        payload:values,
        callback:(response) => {
          if(response==="success"){
            message.success("修改成功");
          }else{
            message.success('修改失败');
          }
        }
      });
      handleModifyModalVisble();
      init();
    });
  };

  return (
    <Modal
      destroyOnClose
      title="修改样品"
      visible={modifyModalVisble}
      onOk={okHandle}
      onCancel={() => handleModifyModalVisble()}
      width={500}
      style={{ top: 20 }}
    >

      <Form>
        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="样品编号">
          {form.getFieldDecorator('sampleno', {
            rules: [{ required: true, message: '请输入样品编号' }],
            initialValue:sampledata.sampleno
          })(<Input placeholder="请输入样品编号" />)}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="取样点">
          {form.getFieldDecorator('samplename', {
            initialValue:sampledata.samplename
          })(
            <Select placeholder="请选择取样点">
              <Option value="堆场">堆场</Option>
              <Option value="皮带机">皮带机</Option>
              <Option value="卸货平台">卸货平台</Option>
              <Option value="散货船">散货船</Option>
              <Option value="驳船">驳船</Option>
              <Option value="船舱">船舱</Option>
              <Option value="岸罐">岸罐</Option>
              <Option value="管线">管线</Option>
              <Option value="一英尺样">一英尺样</Option>
              <Option value="槽东">槽东</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="样品用途">
          {form.getFieldDecorator('sampleuse', {
            initialValue:sampledata.sampleuse
          })(
            <Select placeholder="请选择样品用途">
              <Option value="水份">水份</Option>
              <Option value="指标测试">指标测试</Option>
              <Option value="留存">留存</Option>
              <Option value="其他">其他</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="样品数量">
          {form.getFieldDecorator('weight', {
            initialValue:sampledata.weight
          })(<Input placeholder="请输入样品编号" />)}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="持有人">
          {form.getFieldDecorator('owner', {
            initialValue:sampledata.owner
          })(
            <Select placeholder="请选择持有人">
              <Option value="本公司">本公司</Option>
              <Option value="分包方">分包方</Option>
              <Option value="收货人">收货人</Option>
              <Option value="发货人">发货人</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="保存天数">
          {form.getFieldDecorator('duration', {
            initialValue:sampledata.duration
          })(
            <Select placeholder="请选择保存天数">
              <Option value="30">30天</Option>
              <Option value="60">60天</Option>
              <Option value="90">90天</Option>
              <Option value="180">180天</Option>
              <Option value="360">360天</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="存放位置">
          {form.getFieldDecorator('position', {
            initialValue:sampledata.position
          })(<Input />)}
        </Form.Item>

        <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="制样日期">
          {form.getFieldDecorator('makingdate', {
            rules: [{ required: true, message: '请输入制样日期' }],
            initialValue:moment(sampledata.makingdate,"YYYY-MM-DD"),
          })(
            <DatePicker
              placeholder="请选择制样日期"
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              getPopupContainer={trigger => trigger.parentNode}
            />,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
});



@Form.create()
@connect(({ sample, loading }) => ({
  sample,
  loading: loading.models.sample,
}))
class SampleRegisterDetail extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    modifyModalVisble:false,
    sampledata:{},
  };

  columns = [
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
      title: '数量',
      dataIndex: 'weight',
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
      title: '制样日期',
      dataIndex: 'makingdate',
      render: val => <span>{ moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
          &nbsp;&nbsp;
          <a onClick={() => this.modifyItem(text, true)}>修改</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    this.init();
  }

  init =() =>{
    const { dispatch } = this.props;
    const reportNo = localStorage.getItem('reportSampleRegisterDetailNo');
    dispatch({
      type: 'sample/getSampleRegistersByReportNo',
      payload: { reportno: reportNo,},
    });
  }

  modifyItem = (text,flag) => {
    this.setState({
      sampledata:text,
    });
    this.handleModifyModalVisble(flag);
  };

  deleteItem = text => {
    const { dispatch } = this.props;
    dispatch({
      type: 'sample/deleteSamleRegister',
      payload: { sampleno: text.sampleno},
      callback: (response) => {
        if (response) {
          message.success("删除成功");
          this.init();
        }else{
          message.success("删除失败");
        }
      }
    });
  };


  handleOk = () =>{
    this.setState({ visible: false });
    const {form,dispatch} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        message.success("添加失败");
        return;
      }
      form.resetFields();
      const reportNo = localStorage.getItem('reportSampleRegisterDetailNo');
      const value ={
        duration: fieldsValue.duration,
        makingdate: fieldsValue.makingdate,
        owner: fieldsValue.owner,
        position: fieldsValue.position,
        samplename: fieldsValue.samplename,
        sampleno: fieldsValue.sampleno,
        sampleuse: fieldsValue.sampleuse,
        weight: fieldsValue.weight,
        reportno:reportNo
      };
      dispatch({
        type: 'sample/addSamleRegister',
        payload: value,
        callback: (response) => {
          if (response) {
            message.success("保存成功");
            this.init();
          }else{
            message.success("保存失败");
          }
        }
      });
    });
  };

  show = () => {
    this.setState({ visible: true });
  };

  handleCancel = () =>{
    this.setState({ visible: false });
  };


  back = () =>{
    this.props.history.goBack();
  };


  // 显示模态框
  handleModifyModalVisble = (flag) => {
    this.setState({
      modifyModalVisble: !!flag,
    });
  };


  render() {

    const {
      loading,
      sample: {sampleDetail},
      form: { getFieldDecorator },
      dispatch,
    } = this.props;


    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const parentMethods = {
      handleModifyModalVisble: this.handleModifyModalVisble,
    };
    const { modifyModalVisble,sampledata} = this.state;


    const reportNo = localStorage.getItem('reportSampleRegisterDetailNo');
    return (
      <PageHeaderWrapper title="样品已登记信息">
        <Modal
          title="新建样品登记"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="样品编号">
              {getFieldDecorator('sampleno', {
                rules: [{ required: true, message: '请输入样品编号' }],
                initialValue:reportNo
              })(<Input placeholder="请输入样品编号" />)}
            </Form.Item>

            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="取样点">
              {getFieldDecorator('samplename', {
              })(
                <Select placeholder="请选择取样点">
                  <Option value="堆场">堆场</Option>
                  <Option value="皮带机">皮带机</Option>
                  <Option value="卸货平台">卸货平台</Option>
                  <Option value="散货船">散货船</Option>
                  <Option value="驳船">驳船</Option>
                  <Option value="船舱">船舱</Option>
                  <Option value="岸罐">岸罐</Option>
                  <Option value="管线">管线</Option>
                  <Option value="一英尺样">一英尺样</Option>
                  <Option value="槽东">槽东</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="样品用途">
              {getFieldDecorator('sampleuse', {
              })(
                <Select placeholder="请选择样品用途">
                  <Option value="水份">水份</Option>
                  <Option value="指标测试">指标测试</Option>
                  <Option value="留存">留存</Option>
                  <Option value="其他">其他</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="样品数量">
              {getFieldDecorator('weight', {
                initialValue:0
              })(<Input placeholder="请输入样品编号" />)}
            </Form.Item>

            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="持有人">
              {getFieldDecorator('owner', {
              })(
                <Select placeholder="请选择持有人">
                  <Option value="本公司">本公司</Option>
                  <Option value="分包方">分包方</Option>
                  <Option value="收货人">收货人</Option>
                  <Option value="发货人">发货人</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="保存天数">
              {getFieldDecorator('duration', {
              })(
                <Select placeholder="请选择保存天数">
                  <Option value="30">30天</Option>
                  <Option value="60">60天</Option>
                  <Option value="90">90天</Option>
                  <Option value="180">180天</Option>
                  <Option value="360">360天</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="存放位置">
              {getFieldDecorator('position', {
              })(<Input />)}
            </Form.Item>


            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="制样日期">
              {getFieldDecorator('makingdate', {
                rules: [{ required: true, message: '请输入制样日期' }],
              })(
                <DatePicker
                  placeholder="请选择制样日期"
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                  getPopupContainer={trigger => trigger.parentNode}
                />,
              )}
            </Form.Item>

          </Form>
        </Modal>

        <ArrivalInvoiceForm {...parentMethods} modifyModalVisble={modifyModalVisble} sampledata={sampledata} dispatch={dispatch} init={this.init} />

        <Card bordered={false}>
          <Row gutter={16} style={{ marginBottom: 5 }}>
            <Col span={22}>
              <Button type="primary" onClick={this.show}>新建</Button>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8  ,paddingLeft:0,paddingRight:15}} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <div className={styles.tableList} size="small">
            <Table
              size="middle"
              loading={loading}
              dataSource={sampleDetail.list}
              columns={this.columns}
              rowKey="sampleno"
              pagination={{ showQuickJumper: true, showSizeChanger: true }}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SampleRegisterDetail;
