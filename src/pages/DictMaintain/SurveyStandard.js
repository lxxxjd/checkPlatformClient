import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva/index';
import router from 'umi/router';
import { formatMessage } from 'umi-plugin-react/locale/index';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, message, Modal, DatePicker, Checkbox,
} from 'antd/lib/index';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment/moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;




// 修改的Form
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleEdit, handleModalVisible,modalInfo,fieldList,cargosortOptions} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleEdit(fieldsValue,modalInfo);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="标准信息修改"
      style={{ top: 100 }}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="英文名称">
        {form.getFieldDecorator('standarde', {
          initialValue: modalInfo.standarde,
          rules: [
            {
              required: true,
              message: "请输入英文名称",
            },
          ],
        })(<Input placeholder="请输入英文名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="中文名称">
        {form.getFieldDecorator('standardc', {
          initialValue: modalInfo.standardc,
          rules: [
            {
              required: true,
              message: "请输入中文名称",
            },
          ],
        })(<Input placeholder="请输入中文名称" />)}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="货物种类">
        {form.getFieldDecorator('cargosort', {
          initialValue: modalInfo.cargosort,
          rules: [
            {
              required: true,
              message: "请选择货物种类",
            },
          ],
        })(
          <Select placeholder="请选择货物种类" style={{ width: '100%' }}>
            {cargosortOptions}
          </Select>
        )}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="检查领域">
        {form.getFieldDecorator('field', {
          initialValue: (modalInfo.field===undefined || modalInfo.field===null)?[]:modalInfo.field.split(" "),
          rules: [
            {
              required: true,
              message: "请选择检查领域",
            },
          ],
        })(
          <CheckboxGroup
            options={fieldList}
          />
        )}

      </FormItem>
    </Modal>
  );
});


const AddForm = Form.create()(props => {
  const { addModalVisible, form, handleAdd, addHandleModalVisible,fieldList,cargosortOptions } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="标准信息新增"
      style={{ top: 100 }}
      visible={addModalVisible}
      onOk={okHandle}
      onCancel={() => addHandleModalVisible()}
    >


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="英文名称">
        {form.getFieldDecorator('standarde', {
          rules: [
            {
              required: true,
              message: "请输入英文名称",
            },
          ],
        })(<Input placeholder="请输入英文名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="中文名称">
        {form.getFieldDecorator('standardc', {
          rules: [
            {
              required: true,
              message: "请输入中文名称",
            },
          ],
        })(<Input placeholder="请输入中文名称" />)}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="货物种类">
        {form.getFieldDecorator('cargosort', {
          rules: [
            {
              required: true,
              message: "请选择货物种类",
            },
          ],
        })(
          <Select placeholder="请选择货物种类" style={{ width: '100%' }}>
            {cargosortOptions}
          </Select>
        )}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="检查领域">
        {form.getFieldDecorator('field', {
          rules: [
            {
              required: true,
              message: "请选择检查领域",
            },
          ],
        })(
          <CheckboxGroup
            options={fieldList}
          />
        )}
      </FormItem>

    </Modal>
  );
});


@connect(({ standard, loading }) => ({
  standard,
  loading: loading.models.standard,
}))
@Form.create()
class SurveyStandard extends PureComponent {
  state = {
    modalVisible: false,
    addModalVisible:false,
    modalInfo :{},
    dataSource:[],

    fieldList:[], // 检查领域
    cargosortList:[], // 货物种类

  };

  columns = [
    {
      title: '英文名称',
      dataIndex: 'standarde',
    },

    {
      title: '中文名称',
      dataIndex: 'standardc',
    },

    {
      title: '货物种类',
      dataIndex: 'cargosort',
    },

    {
      title: '领域',
      dataIndex: 'field',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.modifyItem(text, record)}>修改</a>
          &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
    this.init();
  }

  init =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'standard/getSurveyStandard',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.dataSource = response;
        }
      }
    });


  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
  };

  handleSearch = e=> {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        certCode:user.certCode,
      };
      dispatch({
        type: 'standard/getSurveyStandard',
        payload: values,
        callback: (response) => {
          if (response){
            this.state.dataSource = response;
          }
        }
      });
    });
  };

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };

  initSelectData =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      certCode:user.certCode
    };
    dispatch({
      type: 'standard/getCheckProjectList',
      payload: params,
      callback: (response) => {
        if (response){
          let res =[];
          if(response!==undefined && response!=null){
            for(let i=0;i<response.length;i++){
              res.push(response[i].project);
            }
          }
          this.state.fieldList = res;
        }
      }
    });

    dispatch({
      type: 'standard/getCargosort1List',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.cargosortList = response;
        }
      }
    });


  };

  modifyItem = text => {
    this.initSelectData();
    this.setState({
      modalInfo:text,
    });
    this.handleModalVisible(true);
  };

  deleteItem = text =>{
    const { dispatch } = this.props;
    const formData = new FormData();
    formData.append("keyno",text.keyno);
    dispatch({
      type: 'standard/deleteSurveyStandard',
      payload:formData,
      callback: (response) => {
        if(response==="success"){
          this.init();
          message.success("删除成功");
        } else{
          message.success("删除失败");
        }
      }
    });
  };


  addItem = () => {
    this.initSelectData();
    this.addHandleModalVisible(true);
  };




  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  addHandleModalVisible = (flag) => {
    this.setState({
      addModalVisible: !!flag,
    });
  };

  handleEdit = (fields,modalInfo) => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    let prams = modalInfo;
    prams.standarde =  fields.standarde;
    prams.standardc =  fields.standardc;
    prams.cargosort =  fields.cargosort;
    prams.field =  fields.field.join(" ");
    prams.certcode =  user.certCode;
    const values = {
      ...prams
    };
    dispatch({
      type: 'standard/updateSurveystandard',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("保存成功");
          this.init();
        } else {
          message.success("保存失败");
        }
      }
    });
    this.setState({
      modalVisible: false,
    });
  };

  handleAdd = (fields) => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const values = {
      ...fields,
      certcode:user.certCode,
    };
    values.field = values.field.join(" ");

    this.setState({
      addModalVisible: false,
    });

    if( this.state.dataSource.find(item=>(item.standarde === fields.standarde||item.standardc === fields.standardc))){
      message.success("添加项目已存在");
      return;
    }

    dispatch({
      type: 'standard/addSurveryStandard',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("保存成功");
          this.init();
        } else{
          message.success("保存失败");
        }
      }
    });


  };




  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                initialValue:"standardc",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="standardc">中文名称</Option>
                  <Option value="standarde">英文名称</Option>
                  <Option value="cargosort">货物种类</Option>
                  <Option value="field">检查领域</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={6} sm={20}>
            <FormItem>
              {getFieldDecorator('value',{rules: [{ message: '搜索数据' }],})(<Input placeholder="请输入" />)}
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
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.addItem}>
                新增
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }




  render() {
    const {
      loading,
      dispatch,
    } = this.props;

    const {  modalVisible,modalInfo,addModalVisible,dataSource,fieldList,cargosortList} = this.state;
    const parentMethods = {
      handleEdit: this.handleEdit,
      handleAdd:this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      addHandleModalVisible:this.addHandleModalVisible,
    };

    const cargosortOptions = cargosortList.map(d => <Option key={d.sort1} value={d.sort1}>{d.sort1}</Option>);

    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} dispatch={dispatch} fieldList={fieldList} cargosortOptions={cargosortOptions} />
            <AddForm {...parentMethods} addModalVisible={addModalVisible} dispatch={dispatch} fieldList={fieldList} cargosortOptions={cargosortOptions} />
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="itemno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SurveyStandard;
