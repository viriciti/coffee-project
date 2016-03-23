var level, ref, winston;

winston = require("winston");

level = "info";

if ((ref = process.env.DEBUG) === "1" || ref === "true") {
  level = "debug";
}

module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: level
    })
  ]
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9sb2cuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSOztBQUVWLEtBQUEsR0FBUTs7QUFDUixXQUFtQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQVosS0FBc0IsR0FBdEIsSUFBQSxHQUFBLEtBQTJCLE1BQTlDO0VBQUEsS0FBQSxHQUFRLFFBQVI7OztBQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQXFCLElBQUEsT0FBTyxDQUFDLE1BQVIsQ0FDcEI7RUFBQSxVQUFBLEVBQVk7SUFDUCxJQUFBLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBbkIsQ0FDSDtNQUFBLFFBQUEsRUFBVSxJQUFWO01BQ0EsS0FBQSxFQUFVLEtBRFY7S0FERyxDQURPO0dBQVo7Q0FEb0IiLCJmaWxlIjoibGliL2xvZy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIndpbnN0b24gPSByZXF1aXJlIFwid2luc3RvblwiXG5cbmxldmVsID0gXCJpbmZvXCJcbmxldmVsID0gXCJkZWJ1Z1wiIGlmIHByb2Nlc3MuZW52LkRFQlVHIGluIFtcIjFcIiwgXCJ0cnVlXCJdXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IHdpbnN0b24uTG9nZ2VyXG5cdHRyYW5zcG9ydHM6IFtcblx0XHRuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGVcblx0XHRcdGNvbG9yaXplOiB0cnVlXG5cdFx0XHRsZXZlbDogICAgbGV2ZWxcblx0XSJdfQ==
