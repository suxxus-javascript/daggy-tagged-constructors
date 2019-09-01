const test = require('tape');
const {
  result,
  handleResult,
  hasPermission,
  permissions,
  handleUserType,
} = require('scripts');

const getRandomItemFromList = myArray =>
  myArray[Math.floor(Math.random() * myArray.length)];

test('given a value should return an object with this value', t => {
  let actual;
  let expect;

  actual = JSON.stringify(result.success(1));
  expect = JSON.stringify({ success: 1 });

  t.equal(actual, expect);

  actual = JSON.stringify(result.error('this is an error'));
  expect = JSON.stringify({ error: 'this is an error' });
  t.equal(actual, expect);

  t.end();
});

test('given a value, checks if exists in the list', t => {
  let actual;
  let expect;

  const list = getRandomItemFromList([
    ['duck', 'dog', 'elephant'],
    ['cat', 'lion', 'hipo'],
  ]);

  const value = getRandomItemFromList(list);
  actual = hasPermission(list)(value);
  expect = true;
  t.equal(actual, expect);

  actual = hasPermission(list)('fish');
  expect = false;
  t.equal(actual, expect);

  t.end();
});

test('handleResult do something depending on result', t => {
  let actual;
  let expect;
  let val;

  val = getRandomItemFromList(['success', 'go', 'yes']);
  actual = handleResult(result.success(val));
  expect = val;
  t.equal(actual, expect);

  val = getRandomItemFromList(['error', 'bad', 'no']);
  actual = handleResult(result.error(val));
  expect = val;

  t.equal(actual, expect);
  t.end();
});

test('handleUserTypes return the value depending on the user type', t => {
  let actual;
  let expect;
  let val;

  val = getRandomItemFromList([
    'SECTION_ANSWER_ADMIN',
    'SECTION_QUESTIONS_ADMIN',
    'SECTION_USER',
  ]);
  actual = handleUserType(permissions.superUser(val));
  expect = true;
  t.equal(actual, expect, 'all permissions for super user');

  val = getRandomItemFromList([
    'SECTION_ANSWER_ADMIN',
    'SECTION_QUESTIONS_ADMIN',
  ]);
  actual = handleUserType(permissions.user('SECTION_USER'));
  expect = true;
  t.equal(actual, expect, 'userType: user, section: USER ');

  actual = handleUserType(permissions.user(val));
  expect = false;
  t.equal(
    actual,
    expect,
    'userType: user, no permission for answer or questions sections',
  );

  val = getRandomItemFromList(['SECTION_USER', 'SECTION_QUESTIONS_ADMIN']);
  actual = handleUserType(permissions.questionAdmin(val));
  expect = true;
  t.equal(
    actual,
    expect,
    'userType: questionAdmin, section: USER and QUESTION_ADMIN',
  );

  actual = handleUserType(permissions.questionAdmin('SECTION_ANSWER_ADMIN'));
  expect = false;
  t.equal(
    actual,
    expect,
    'userType: questionAdmin, no permission for answerAdmin section',
  );

  val = getRandomItemFromList(['SECTION_USER', 'SECTION_ANSWER_ADMIN']);
  actual = handleUserType(permissions.answerAdmin(val));
  expect = true;
  t.equal(
    actual,
    expect,
    'userType: answerAdmin, section: USER and ANSWER_ADMIN',
  );

  actual = handleUserType(permissions.answerAdmin('SECTION_QUESTION_ADMIN'));
  expect = false;
  t.equal(
    actual,
    expect,
    'userType: answerAdmin, no permission for questionAdmin section',
  );

  t.end();
});
