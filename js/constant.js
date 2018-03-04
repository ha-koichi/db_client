angular.module('values', [])
.value(
  'url', {
    'user_info': 'http://localhost/db_server/user_info.php',
    'login': 'http://localhost/db_server/login.php',
    'value3': 12345
  },
  'test', {
    'value1': 'keyName'
  }

);
