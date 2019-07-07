export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [

      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          }
        ],
      },
      //newPage
      {
        path: "/Certificate",
        icon: "file",
        name: "Certificate",
        routes: [
          {
            path: "/Certificate/Certificate",
            name: "Certificate",
            component: "./Certificate/Certificate"
          }
        ],
      },
      {
        path: "/Entrustment",
        icon: "file",
        name: "Entrustment",
        routes: [
          {
            path: "/Entrustment/ApplicationForEntrustment",
            name: "ApplicationForEntrustment",
            component: "./Entrustment/ApplicationForEntrustment"
          },
          {
            path: "/Entrustment/SearchForEntrustment",
            name: "SearchForEntrustment",
            component: "./Entrustment/SearchForEntrustment"
          },
          {
            path: "/Entrustment/CancelForEntrustment",
            name: "CancelForEntrustment",
            component: "./Entrustment/CancelForEntrustment"
          },
          {
            path: "/Entrustment/DetailForEntrustment",
            name: "DetailForEntrustment",
            component: "./Entrustment/DetailForEntrustment",
            hideInMenu: 'true', //添加页不需要在menu上显示
          },
          {
            path: "/Entrustment/ModifyForEntrustment",
            name: "ModifyForEntrustment",
            component: "./Entrustment/ModifyForEntrustment",
            //添加页不需要在menu上显示
          },
        ],
      },

      {
        component: '404',
      },
    ],
  },
];
