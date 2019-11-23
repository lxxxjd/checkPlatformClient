import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

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
  DatePicker,
  notification,
  Upload,
  Icon,
  message,
  InputNumber,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './company.less';
import moment from 'moment'
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;




function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company,
}))
class CompanyUpload extends PureComponent {
  state = {
    visible:false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  columns = [
    {
      title: '记录名',
      dataIndex: 'name',
      render: val => {
        //取文件名
        var pattern = /\.{1}[a-z]{1,}$/;
        if (pattern.exec(val) !== null) {
          return <span>{val.slice(0, pattern.exec(val).index)}</span>;
        } else {
          return <span>{val}</span>;
        }
      }
    },
    {
      title: '上传日期',
      dataIndex: 'recorddate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.editCerticate(text, record)}>编辑</a>
          &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
          &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'testRecord/getRecordInfo',
      payload:{
         reportno : reportno,
         source : '公司',
      }
    });
  }




  editCerticate = text => {

    // var wpsUrl = 'https://wwo.wps.cn/office/w/111?_w_signature=JFUosMy%2bG2Q2lWYOZ2h8I3YjwlE%3d&_w_userid=320318060202&_w_fname=test.doc&_w_appid=0af07f041df14ca27c68a2d9449d7f9f'
    // eslint-disable-next-line camelcase,no-underscore-dangle
    // eslint-disable-next-line camelcase,no-underscore-dangle
    const _w_userid = text.reportno;
    // eslint-disable-next-line camelcase,no-underscore-dangle
    const _w_fname = text.name;
    const { dispatch } = this.props;
    const params={
      _w_userid,
      _w_fname
    };
    dispatch({
        type: 'certificate/getSignature',
        payload: {params},
        callback: (response) => {
          if (response.code === 200) {
            // eslint-disable-next-line camelcase,no-underscore-dangle
            const _w_signature = response.data;
            // eslint-disable-next-line camelcase
            const wpsUrl = `https://localhost:81/certificate?_w_signature=${_w_signature}&_w_userid=${_w_userid}&_w_fname=${_w_fname}`;
            window.open('about:blank').location.href=wpsUrl;
          } else {
            notification.open({
              message: '加载失败',
              description:response.message,
            });
          }
        }
      });

  };

  deleteItem = text => {
    const {
      dispatch,
    } = this.props;
    const params = {
      keyno:text.keyno
    }
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'certificate/deleteCertFile',
      payload:params,
      callback: (response) => {
        if(response.code === 400){
          notification.open({
            message: '删除失败',
            description:response.data,
          });
        }else{
          dispatch({
            type: 'certificate/getCertFiles',
            payload:{
              reportno : reportno,
            }
          });
        }
      }
    });
  };

  handleOk = () =>{
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const user = JSON.parse(localStorage.getItem("userinfo"));
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        let formData = new FormData();
        values.MultipartFile.fileList.forEach(file => {
          formData.append('file', file.originFileObj);
          formData.append('size', file.size);
        });
        formData.append('creator', user.nameC);
        formData.append('modifier', user.nameC);
        formData.append('reportno', reportno);
        formData.append('name', values.recordname);
        console.log(formData.get('files'));
        dispatch({
          type: 'certificate/uploadCertFile',
          payload : formData,
          callback: (response) => {
            if(response.code === 400){
              notification.open({
                message: '添加失败',
                description:response.data,
              });
            }else{
              dispatch({
                type: 'certificate/getCertFiles',
                payload:{
                  reportno : reportno,
                }
              });
            }
          }
        });
        this.setState({ visible: false });
        form.resetFields();
      }
      console.log(error);
    });
  };

  show = () => {
    const {
      form,
      dispatch,
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    form.resetFields();
    this.setState({fileList:[]});
    this.setState({ visible: true });
  };

  handleCancel = () =>{
    const {
      form
    } = this.props;
    form.resetFields();
    this.setState({ visible: false });
  };



  Cancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ file,fileList }) => {
    //限制图片 格式、size、分辨率
    const isDOC = file.type === 'application/msword';
    const isDOCX = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const size = file.size / 1024 / 1024 < 20;
    if (!(isDOC || isDOCX )) {
      Modal.error({
        title: '只能上传DOC 、DOCX 格式的图片~',
      });
      return;
    } else if (!size) {
      Modal.error({
        title: '超过20M限制，不允许上传~',
      });
      return;
    }
    this.setState({ fileList:fileList});
    console.log(fileList)
  };

  handleBeforeUpload = file => {
    return false;
  };



  back = () =>{
    this.props.history.goBack();
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };


    // state 方法
    const {fileList,visible,previewVisible,previewImage} = this.state

    // 下载模板 模态框方法
    return (
      <PageHeaderWrapper >
        <Modal
          title="记录上传"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="文件上传">
              {getFieldDecorator('MultipartFile', {
                rules: [{ required: true, message: '请选择上传文件' }],
              })(
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  beforeUpload={this.handleBeforeUpload}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              )}
            </Form.Item>
            <Form.Item label="证书名称">
              {getFieldDecorator('recordname', {
                rules: [{ required: true, message: '请输入证书名称' }],
              })(
                <Input style={{ width: '100%' }} placeholder="请输入证书名称" />
              )}
            </Form.Item>
            <Modal visible={previewVisible} footer={null} onCancel={this.Cancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form>
        </Modal>
        <Card bordered={false} size="small">
          <Row>
            <Col md={8} sm={20}>
              <span className={styles.submitButtons}>
                <Button type="primary" onClick={this.show}>上传抬头</Button>
                <Button type="primary" style={{ marginLeft: 8 }} onClick={this.show}>上传盖章</Button>
                <Button type="primary" style={{  marginLeft: 8 }} onClick={this.show}>保存公司</Button>
              </span>
            </Col>
          </Row>

          <div className={styles.tableList}>
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
              <FormItem {...formItemLayout} label={<FormattedMessage id="form.title.label" />}>
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.title.required' }),
                    },
                  ],
                })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
              </FormItem>
              <FormItem {...formItemLayout} label={<FormattedMessage id="form.date.label" />}>
                {getFieldDecorator('date', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.date.required' }),
                    },
                  ],
                })(
                  <RangePicker
                    style={{ width: '100%' }}
                    placeholder={[
                      formatMessage({ id: 'form.date.placeholder.start' }),
                      formatMessage({ id: 'form.date.placeholder.end' }),
                    ]}
                  />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={<FormattedMessage id="form.goal.label" />}>
                {getFieldDecorator('goal', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.goal.required' }),
                    },
                  ],
                })(
                  <TextArea
                    style={{ minHeight: 32 }}
                    placeholder={formatMessage({ id: 'form.goal.placeholder' })}
                    rows={4}
                  />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={<FormattedMessage id="form.standard.label" />}>
                {getFieldDecorator('standard', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.standard.required' }),
                    },
                  ],
                })(
                  <TextArea
                    style={{ minHeight: 32 }}
                    placeholder={formatMessage({ id: 'form.standard.placeholder' })}
                    rows={4}
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={
                  <span>
                    <FormattedMessage id="form.client.label" />
                    <em className={styles.optional}>
                      <FormattedMessage id="form.optional" />
                      <Tooltip title={<FormattedMessage id="form.client.label.tooltip" />}>
                        <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                      </Tooltip>
                    </em>
                  </span>
                }
              >
                {getFieldDecorator('client')(
                  <Input placeholder={formatMessage({ id: 'form.client.placeholder' })} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={
                  <span>
                    <FormattedMessage id="form.invites.label" />
                    <em className={styles.optional}>
                      <FormattedMessage id="form.optional" />
                    </em>
                  </span>
                }
              >
                {getFieldDecorator('invites')(
                  <Input placeholder={formatMessage({ id: 'form.invites.placeholder' })} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={
                  <span>
                    <FormattedMessage id="form.weight.label" />
                    <em className={styles.optional}>
                      <FormattedMessage id="form.optional" />
                    </em>
                  </span>
                }
              >
                {getFieldDecorator('weight')(
                  <InputNumber
                    placeholder={formatMessage({ id: 'form.weight.placeholder' })}
                    min={0}
                    max={100}
                  />
                )}
                <span className="ant-form-text">%</span>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<FormattedMessage id="form.public.label" />}
                help={<FormattedMessage id="form.public.label.help" />}
              >
                <div>
                  {getFieldDecorator('public', {
                    initialValue: '1',
                  })(
                    <Radio.Group>
                      <Radio value="1">
                        <FormattedMessage id="form.public.radio.public" />
                      </Radio>
                      <Radio value="2">
                        <FormattedMessage id="form.public.radio.partially-public" />
                      </Radio>
                      <Radio value="3">
                        <FormattedMessage id="form.public.radio.private" />
                      </Radio>
                    </Radio.Group>
                  )}
                  <FormItem style={{ marginBottom: 0 }}>
                    {getFieldDecorator('publicUsers')(
                      <Select
                        mode="multiple"
                        placeholder={formatMessage({ id: 'form.publicUsers.placeholder' })}
                        style={{
                          margin: '8px 0',
                          display: getFieldValue('public') === '2' ? 'block' : 'none',
                        }}
                      >
                        <Option value="1">
                          <FormattedMessage id="form.publicUsers.option.A" />
                        </Option>
                        <Option value="2">
                          <FormattedMessage id="form.publicUsers.option.B" />
                        </Option>
                        <Option value="3">
                          <FormattedMessage id="form.publicUsers.option.C" />
                        </Option>
                      </Select>
                    )}
                  </FormItem>
                </div>
              </FormItem>
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  <FormattedMessage id="form.submit" />
                </Button>
                <Button style={{ marginLeft: 8 }}>
                  <FormattedMessage id="form.save" />
                </Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CompanyUpload;
