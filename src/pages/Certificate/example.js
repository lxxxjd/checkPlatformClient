// 必须引入
import React, { PureComponent } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
// 引入阿里dva框架，不然不能和服务端交互,必须引入
import { connect } from "dva";
// 引入less
// import styles from "./Certificate.less";

// 这个注解解释起来有点麻烦，但要注意以下几点
// 1.@connect必须放在export default class前面
// 2.这个不写，你在这个页面里面获取不到服务器返回给你的数据
// 3.采用解构赋值的方式，第一个参数newPage是命名空间，我们数据就是从这里拿到的
@connect(({ Certificate, loading }) => ({
  data: Certificate.data, // 将data赋值给
  loading
}))

class Certificate extends PureComponent {
  // componentWillMount渲染之前调用，一般处理ajax异步回来的数据，
  // 等下面render渲染的时候好绑定
  componentWillMount() {
    console.log("渲染之前调用");
    console.log("之调用一次");
  }

  // 每次调用render之前渲染
  componentDidMount() {
    // 分发器,用dispatch一定要写@connect注解
    const { dispatch } = this.props;
    // 分发器调用models发起请求，具体流程是dispatch=>models=>services
    dispatch({
      // newPage命名空间，fetch是该文件中的方法，对应src/models/newPage.js，因为newPage的namespace的值newPage
      type: "Certificate/fetch",
      // 参数，一般采用json格式
      payload: { a: "1", b: "2" }
    });
  }

  render() {
    // 这里也采用了解构赋值
    const { data } = this.props;
    return (
      <PageHeaderWrapper>
        <div>
          姓名：{data.userName}<br/>
          学号：{data.studentNo}<br/>
          年龄：{data.age}<br/>
          性别：{data.sex}<br/>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Certificate;
