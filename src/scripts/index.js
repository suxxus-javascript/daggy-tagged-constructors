const daggy = require('daggy');

// how it works
const result = daggy.taggedSum('result', {
  success: ['success'],
  error: ['error'],
});

const handleResult = res => {
  return res.cata({
    success: value => value,
    error: value => value,
  });
};

// example
const hasPermission = list => permission => list.includes(permission);

const permissions = daggy.taggedSum('permissions', {
  user: ['user'],
  questionAdmin: ['questionAdmin'],
  answerAdmin: ['answerAdmin'],
  superUser: ['superUser'],
});

const handleUserType = usersPermissions =>
  usersPermissions.cata({
    user: hasPermission(['SECTION_USER']),

    questionAdmin: hasPermission(['SECTION_QUESTIONS_ADMIN', 'SECTION_USER']),

    answerAdmin: hasPermission(['SECTION_ANSWER_ADMIN', 'SECTION_USER']),

    superUser: hasPermission([
      'SECTION_ANSWER_ADMIN',
      'SECTION_QUESTIONS_ADMIN',
      'SECTION_USER',
    ]),
  });

module.exports = {
  result,
  handleResult,
  hasPermission,
  permissions,
  handleUserType,
};
