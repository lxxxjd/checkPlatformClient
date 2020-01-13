import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Modal, Select, Row, Col, Popover, Progress, Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import testImg from './img/timg.png'
import styles from './HomePage.less'
import home1 from './img/home1.png'
import home2 from './img/home2.png'

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const { Search } = Input;
const { Footer } = Layout;




@connect(({ home, loading }) => ({
  home,
  submitting: loading.home,
}))
@Form.create()
class HomePage extends Component {
  state = {

  };

  componentWillUnmount() {

  }

  toCompany = ()=>{
    window.open("http://localhost:82/user/login")
  };

  toConsignor = ()=>{
    window.open("http://localhost:84/user/login")
  };

  toCustoms = ()=>{
    window.open("http://localhost:85/user/login")
  };

  toCNAS = ()=>{
    window.open("http://localhost:86/user/login")
  };

  toMain = ()=>{
    window.open("http://localhost:83/user/login")
  };

  toTry = ()=>{
    window.open("http://localhost:83/user/register")
  };




  render() {
    const { form } = this.props;
    const FooterView = () => (
      <Footer style={{ height:100,backgroundColor:'white'}}>
        <GlobalFooter
          copyright={
            <Fragment className={styles.content}>
              Copyright <Icon type="copyright" /> 检验机构业务管理系统
            </Fragment>
          }
        />
      </Footer>
    );

    return (
      <div>
        <Row>
          <Col span={10}>
            <img alt="404" src={testImg} style={{height:130,padding:20}} />
          </Col>
          <Col span={4}>
            <Search
              placeholder="搜索你想要的..."
              onSearch={value => console.log(value)}
              style={{ width: 200,marginTop:30 }}
            />
          </Col>
          <Col span={10}>
            <div style={{marginTop:30}}>
              <Button style={{marginLeft:10}} onClick={this.toConsignor}>委托人</Button>
              <Button style={{marginLeft:10}} onClick={this.toCompany}>检验机构</Button>
              <Button style={{marginLeft:10}} onClick={this.toCustoms}>海关</Button>
              <Button style={{marginLeft:10}} onClick={this.toCNAS}>CNAS</Button>
              <Button style={{marginLeft:10}} onClick={this.toMain}>平台管理</Button>
              <Button style={{marginLeft:10}} onClick={this.toTry}>申请试用</Button>
            </div>
            <div style={{marginLeft:60,marginTop:10}}>
              <h3>平台服务投诉电话：0512-671261239</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <img alt="404" src={home1} style={{width:'100%',paddingRight:10}} />
          </Col>
          <Col span={12}>
            <img alt="404" src={home2} style={{width:'100%',paddingLeft:10}} />
          </Col>
        </Row>
        <Row>
          <FooterView />
        </Row>
      </div>
    );
  }
}

export default HomePage;
