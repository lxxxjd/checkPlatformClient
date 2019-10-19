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
  Radio, Popconfirm, Icon, Modal, Descriptions,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../table.less';
import queryStyles from './SampleDestory.less';




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
class SampleDestory extends PureComponent {
  state = {
    formValues: {},
    exist:[],
    dataSource:[],
    modalReviewVisible:false,
    modalInfo :{},
  };


  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
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
          <a onClick={() =>  this.handleReview(true,text)}>查看</a>
          &nbsp;&nbsp;
          <a onClick={() => this.removeExistItem(text, record)}>删除</a>
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
      type: 'sample/selectSampleByConditionsDestory',
      payload: params,
      callback: (response) => {
        if (response){
          this.saveExist(response);
        }
      }
    });
  }

  saveExist = response =>{
    const mlist = response.list;
    var data =[];
    for(let i=0;i<mlist.length;i++) {
      data.push(mlist[i].sampleno);
    }
    this.state.exist = data;
    this.state.dataSource = response.list;
  }




  toCustomerDetail = text => {
    console.log(text);
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

  removeExistItem = text => {
    this.state.exist=this.listRemoveItem(this.state.exist,text.sampleno);
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.sampleno !== text.sampleno) });
  };


  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.init();
  };


  destoryExist = () => {
      this.setDestoryStatus("销毁","销毁成功","销毁失败");
  };

  // 设置销毁状态
  setDestoryStatus =(state,messagesuccess,messagefail)=>{
    const { dispatch } = this.props;
    const params = {
      exist:this.state.exist,
      status:state,
    };
    dispatch({
      type: 'sample/setSampleStatus',
      payload: params,
      callback: (response) => {
        if (response){
          if(response ==='success'){
            const {dataSource,exist} = this.state;
            for(let i =0 ;i<exist.length;i++){
              dataSource.find(item => item.sampleno === exist[i] ).status=state;
            }
            message.success(messagesuccess);
          }else{
            message.success(messagefail);
          }
        }
      }
    });
  };

  undestory = () => {
    this.setDestoryStatus(undefined,"未销毁成功","未销毁失败");
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
      if(fieldsValue.kind !==undefined &&fieldsValue.value !==undefined &&fieldsValue.condition !== undefined ){
        mkinds.push(fieldsValue.kind );
        mvalues.push(fieldsValue.value);
        mconditions.push(fieldsValue.condition );
      }
      const keys = form.getFieldValue('keys');
      for(let key in keys){
        let k = keys[key];
        console.log(k);
        const kind = form.getFieldValue(`kinds${k}`);
        const condition = form.getFieldValue(`conditions${k}`);
        const value = form.getFieldValue(`values${k}`);
        if(kind!==undefined &&value !==undefined &&condition !== undefined ){
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
        duration:fieldsValue.duration,
        status:fieldsValue.status,
      };
      dispatch({
        type: 'sample/selectSampleByConditionsDestory',
        payload: params,
        callback: (response) => {
          if (response){
            this.saveExist(response);
          }
        }
      });
    });
  };


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


  handleReview = (flag,text) => {
    this.handleModalReviewVisible(flag);
    this.state.modalInfo = text;
  };



  handleModalReviewVisible = (flag) => {
    this.setState({
      modalReviewVisible: !!flag,
    });
  };




  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Card bordered={false} size="small">
          <Row gutter={16}>
            <Col span={24}>
              <Button type="primary" onClick={this.destoryExist}>销毁</Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.undestory}>未销毁</Button>
              <Button type="primary" style={{ marginLeft: 8 }} htmlType="submit">
                查询
              </Button>
              <Button onClick={this.handleFormReset} style={{ marginLeft: 8 }}>
                重置
              </Button>
            </Col>
          </Row>
        </Card>

        <Row gutter={16} >
          <Col md={6} sm={4}>
            <Form.Item
              label="状态："
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 10 }}
            >
              {getFieldDecorator('status', {
                initialValue:"全部",
              })(
                // onChange={this.onChange} value={this.state.value}
                <Radio.Group>
                  <Radio value="全部">全部</Radio>
                  <Radio value="销毁">销毁</Radio>
                  <Radio value="未销毁">未销毁</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          <Col md={3} sm={4}>
            <Form.Item
              label="超保存期："
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 4 }}
              colon={false}
            >
              {getFieldDecorator('duration', {
                rules:[{
                  required:false,
                  pattern: new RegExp(/^[1-9]\d*$/, "g"),
                  message: '输入数字'
                }],
              })(
                <Input placeholder="天数"  />
              )}
            </Form.Item>
          </Col>



          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
              // style={{marginLeft:45}}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '选择字段' }],
              })(
                <Select placeholder="选择字段">
                  <Option value="reportno"> 委托编号</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="cargoname">检查品名</Option>
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

          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('condition', {
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
              {getFieldDecorator('value',{rules: [{ message: '选择数值' }],})(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

          <Col md={4} sm={20}>
            <span>
              <Icon type="plus-circle" style={{fontSize:24, marginLeft: 8,marginTop:4}} theme='twoTone' twoToneColor="#00ff00" onClick={this.add} />
            </span>
          </Col>


        </Row>
      </Form>
    );
  }




  render() {
    const {
      sample: {selectRegisterDestory},
      loading,
    } = this.props;

    const {dataSource} = this.state;

    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const { modalReviewVisible,modalInfo } = this.state;
    const parentMethods = {
      handleModalReviewVisible:this.handleModalReviewVisible,
    };


    const formItems = keys.map((k, index) => (
      <div>
        { index %2===0 && keys.length!==0? (
          <Row className={queryStyles.rowClass} />
        ) : null}
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
          <div>
            <Form onSubmit={this.handleSubmit}>
              <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
              <Row className={styles.tableListForm}>{formItems}</Row>
            </Form>
            <Table
              className={styles.tableList}
              size="middle"
              rowKey="sampleno"
              loading={loading}
              dataSource={dataSource}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}

            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SampleDestory;
