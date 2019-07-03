export default [
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
        component: '404',
      },
    ],
  },
];
