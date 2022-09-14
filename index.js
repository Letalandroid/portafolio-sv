const index = require('./app');

index.listen(process.env.PORT || 80, () => console.log(`🚀 Server active on port: ${process.env.PORT || 80}`));