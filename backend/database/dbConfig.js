const ConnectionConfig = {
    server: "127.0.0.1",
    pool: {
      max: 10,
      min: 5,
      idleTimeoutMillis: 30000,
    },
    options: {
      database: "satinalmaDB",
      encrypt: false,
      port: 1433,
      enableArithAbort: true,
      trustServerCertificate: true,
      //instanceName: 'SQLEXPRESS',
    },
    connectionTimeout: 150000,
    authentication: {
      type: "default",
      options: {
        userName: "sa",
        password: "Kadirli8001",
      },
    },
  };
  
  module.exports = ConnectionConfig;
  