// middlewares/validate.js
const { ZodError } = require("zod");

function validate(schema, source = "body") {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req[source]);
      req[source] = parsed; 
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.errors.map(e => e.message) });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}

module.exports = validate;
