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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliL2xvZy5qcyIsInNvdXJjZXMiOlsibGliL2xvZy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVI7O0FBRVYsS0FBQSxHQUFROztBQUNSLFdBQW1CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBWixLQUFzQixHQUF0QixJQUFBLEdBQUEsS0FBMkIsTUFBOUM7RUFBQSxLQUFBLEdBQVEsUUFBUjs7O0FBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsSUFBSSxPQUFPLENBQUMsTUFBWixDQUNoQjtFQUFBLFVBQUEsRUFBWTtJQUNYLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUF2QixDQUNDO01BQUEsUUFBQSxFQUFVLElBQVY7TUFDQSxLQUFBLEVBQVUsS0FEVjtLQURELENBRFc7R0FBWjtDQURnQiIsInNvdXJjZXNDb250ZW50IjpbIndpbnN0b24gPSByZXF1aXJlIFwid2luc3RvblwiXG5cbmxldmVsID0gXCJpbmZvXCJcbmxldmVsID0gXCJkZWJ1Z1wiIGlmIHByb2Nlc3MuZW52LkRFQlVHIGluIFtcIjFcIiwgXCJ0cnVlXCJdXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IHdpbnN0b24uTG9nZ2VyXG5cdHRyYW5zcG9ydHM6IFtcblx0XHRuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGVcblx0XHRcdGNvbG9yaXplOiB0cnVlXG5cdFx0XHRsZXZlbDogICAgbGV2ZWxcblx0XSJdfQ==
