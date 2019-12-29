import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Modal,
  Table,
  notification,
  Upload,
  Icon,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
import styles from './company.less';

const {Option} = Select;

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
@connect(({company, loading}) => ({
  company,
  loading: loading.models.company,
}))
class ManRecord extends PureComponent {
  state = {
    visible: false,
    downloadVisible: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    modelName: [],
    url: null,
    showVisible: false,
    recordData:[]
  };

  columns = [
    {
      title: '文件名称',
      dataIndex: 'recordname',
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
      title: '文件类型',
      dataIndex: 'filetype',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看</a>
          &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
          &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const {dispatch} = this.props;
    const nameC = sessionStorage.getItem('nameC');
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'company/getManRecord',
      payload: {
        nameC,
        certCode: user.certCode,
      },
      callback:(response) =>{
        if (response.code === 200) {
          this.setState({recordData: response.data});
        }
      }
    });
  }

  previewItem = text => {
    const {dispatch} = this.props;
    dispatch({
      type: 'company/getUrl',
      payload: {
        url:text.osspath
      },
      callback: (response) => {
        if (response.code === 400) {
          notification.open({
            message: '打开失败',
            description: response.data,
          });
        } else {
          const url = response.data;
          this.setState({url: url});
          this.setState({showVisible: true});
          //window.open(url);
        }
      }
    });
  };

  deleteItem = text => {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'company/deleteManRecord',
      payload: {
        keyno:text.keyno,
      },
      callback: (response) => {
        if (response.code === 400) {
          notification.open({
            message: '删除失败',
            description: response.data,
          });
        } else {
          notification.open({
            message: '删除成功',
            description: response.data,
          });
          this.componentDidMount();
        }
      }
    });
  };

  handleOk = () => {
    const {
      form: {validateFieldsAndScroll},
      dispatch,
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        let formData = new FormData();
        const user = JSON.parse(localStorage.getItem("userinfo"));
        const nameC = sessionStorage.getItem('nameC');
        values.MultipartFile.fileList.forEach(file => {
          formData.append('file', file.originFileObj);
        });
        formData.append('certcode', user.certCode);
        formData.append('nameC', nameC);
        formData.append('filetype', values.filetype);
        formData.append('recordname', values.recordname);
        dispatch({
          type: 'company/uploadManRecord',
          payload: formData,
          callback: (response) => {
            if (response.code === 400) {
              notification.open({
                message: '添加失败',
                description: response.message,
              });
            } else {
              this.componentDidMount();
            }
          }
        });
        this.setState({visible: false});
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
    this.setState({fileList: []});
    this.setState({visible: true});
  };

  handleCancel = () => {
    const {
      form
    } = this.props;
    form.resetFields();
    this.setState({visible: false});
  };


  onChange = e => {
    if (e.target.value === "按单价" || e.target.value === "按比例") {
      this.setState({showPrice: true});
    } else {
      this.setState({showPrice: false});
    }
  };

  Cancel = () => this.setState({previewVisible: false});

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({file, fileList}) => {
    //限制图片 格式、size、分辨率
    const isPDF = file.type === 'application/pdf'
    const size = file.size / 1024 / 1024 < 20;
    if (!isPDF) {
      Modal.error({
        title: '只能上传PDF格式的图片~',
      });
      return;
    } else if (!size) {
      Modal.error({
        title: '超过20M限制，不允许上传~',
      });
      return;
    }
    this.setState({fileList: fileList});
    console.log(fileList)
  };

  handleBeforeUpload = file => {
    return false;
  };


  // 处理下载模态框打开
  showDownloadVisible = (flag) => {
    this.setState({
      downloadVisible: !!flag,
    });
  };

  // 处理下载模态框取消
  handleDownloadCancel = (flag) => {
    this.setState({
      downloadVisible: !!flag,
    });
  };


  // 处理下载模态框 提交表单
  handleDownloadAdd = (fields) => {
    const {dispatch,} = this.props;
    const reportNo = sessionStorage.getItem('reportno');
    const params = {
      reportno: reportNo,
      tempName: fields.tempName,
      recordName: fields.downloadRecordName,
    };
    dispatch({
      type: 'testRecordEntrustment/downloadPlatFromTemp',
      payload: params,
      callback: (response) => {
        if (response) {
          message.success("下载成功");
        }
      }
    });
    console.log(params);
    this.setState({
      downloadVisible: false,
    });
  }

  // 处理下载模态框 提交表单
  handleOnSelect = (value) => {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    let ownerValue = "";
    if (value === "platform") {
      ownerValue = "platform";
    } else if (value === "company") {
      ownerValue = user.certCode;
    } else if (value === "person") {
      ownerValue = user.userName;
    } else {
      ownerValue = "blank";
    }
    const {dispatch,} = this.props;
    const params = {
      type: value,
      owner: ownerValue
    };
    dispatch({
      type: 'testRecordEntrustment/getModelName',
      payload: params,
      callback: (response) => {
        if (response) {
          this.state.modelName = response;
        }
      }
    });
  };

  back = () => {
    this.props.history.goBack();
  };
  showCancel = () => {
    this.setState({showVisible: false});
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {
      loading,
      form: {getFieldDecorator},
    } = this.props;
    // state 方法
    const {fileList, visible, previewVisible, previewImage, downloadVisible, modelName, url, showVisible, recordData} = this.state
    const typeOptions = modelName.map(d => <Option key={d} value={d}>{d}</Option>);


    const nameC = sessionStorage.getItem('nameC');

    const reprotText = {
        nameC
    };
    return (
      <PageHeaderWrapper text={reprotText}>
        <Modal
          title="文件上传"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="文件上传">
              {getFieldDecorator('MultipartFile', {
                rules: [{required: true, message: '请选择上传文件'}],
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
            <Form.Item label="文件类型">
              {getFieldDecorator('filetype', {
                rules: [{required: true, message: '请输入文件名称'}],
              })(
                <Select style={{width:300}} placeholder="请输入文件名称">
                  <Option value="身份资料">身份资料</Option>
                  <Option value="能力保持">能力保持</Option>
                  <Option value="奖惩情况">奖惩情况</Option>
                  <Option value="资质证明">资质证明</Option>
                  <Option value="其他">其他</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="文件名称">
              {getFieldDecorator('recordname', {
                rules: [{required: true, message: '请输入文件名称'}],
              })(
                <Input style={{width: '100%'}} placeholder="请输入文件名称"/>
              )}
            </Form.Item>
            <Modal visible={previewVisible} footer={null} onCancel={this.Cancel}>
              <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
          </Form>
        </Modal>
        <Card bordered={false} size="small">
          <Row>
            <Col span={22}>
              <Button style={{marginBottom: 12}} type="primary" onClick={this.show}>上传文件</Button>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{marginLeft: 8, paddingLeft: 0, paddingRight: 15}} onClick={this.back}>
                <Icon type="left"/>返回
              </Button>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              size="middle"
              loading={loading}
              dataSource={recordData}
              columns={this.columns}
              rowKey="recordname"
              pagination={{showQuickJumper: true, showSizeChanger: true}}
            />
          </div>
        </Card>
        <Modal
          title="记录详情"
          visible={showVisible}
          onCancel={this.showCancel}
          footer={null}
          width={800}
          style={{top: 10}}
        >
          <embed src={url} width="700" height="700"/>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
export default ManRecord;