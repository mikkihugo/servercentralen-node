module.exports = {
  CORS_WHITE_LIST: [
    'http://localhost:8081', // frontend dev
    'http://localhost:8080', // admin dev
  ],
  // admin
  USER_ROLES: [
    'manager',
    'admin',
    'user',
  ],
  UPLOAD_TEMP_DIR: '/tmp/upload',
};
