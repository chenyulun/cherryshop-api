module.exports = () => {
  return async function(ctx, next) {
    await next();
    if (!ctx.session.populated) return;
    ctx.session.save();
  };
};
