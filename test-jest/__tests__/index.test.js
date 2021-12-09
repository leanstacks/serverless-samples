const { _hello, _root } = require('../index');

test('path / should return default greeting', () => {
  const req = {};
  const res = {
    text: '',
    send: function (input) { this.text = input }
  };

  _root(req, res);

  expect(res.text).toBe('Hello world!');
});

test('path /hello/:name should return bespoke greeting', () => {
  const req = {
    params: {
      name: 'LeanStacks'
    }
  };
  const res = {
    text: '',
    send: function (input) { this.text = input }
  };

  _hello(req, res);

  expect(res.text).toBe('Hello LeanStacks!');
});