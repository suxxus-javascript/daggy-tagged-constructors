const daggy = require('daggy');

// how it works
const result = daggy.taggedSum('result', {
  success: ['success'],
  error: ['error'],
});

const handleResult = res => {
  console.log(res);
  return res.cata({
    success: value => value,
    error: value => value,
  });
};

// example

const permissions = daggy.taggedSum('permissions', {
  user: ['user'],
  questionAdmin: ['questionAdmin'],
  answerAdmin: ['answerAdmin'],
  superUser: ['superUser'],
});

const handleUserType = users =>
  users.cata({
    user: section => ['SECTION_USER'].includes(section),

    questionAdmin: section =>
      ['SECTION_QUESTIONS_ADMIN', 'SECTION_USER'].includes(section),

    answerAdmin: section =>
      ['SECTION_ANSWER_ADMIN', 'SECTION_USER'].includes(section),

    superUser: section =>
      [
        'SECTION_ANSWER_ADMIN',
        'SECTION_QUESTIONS_ADMIN',
        'SECTION_USER',
      ].includes(section),
  });

module.exports = {
  result,
  handleResult,
  permissions,
  handleUserType,
};
