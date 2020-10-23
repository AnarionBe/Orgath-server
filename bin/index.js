"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _event = _interopRequireDefault(require("./routes/event"));

var _todo = _interopRequireDefault(require("./routes/todo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();

_mongoose["default"].connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(function (_) {
  return console.log('connected to MongoDb');
})["catch"](function (err) {
  return console.error(err);
});

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use('/event', _event["default"]);
app.use('/todo', _todo["default"]);
app.get('/', function (req, res) {
  res.send('Hello world');
});
app.listen(8000, function () {
  console.log('Server running on port 8000');
});
//# sourceMappingURL=index.js.map