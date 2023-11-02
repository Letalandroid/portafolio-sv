const index = require('./app');

const PORT = process.env.PORT || 5000

index.listen(PORT, () => console.log(`🚀 Server active on port: ${PORT}`));