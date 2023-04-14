export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'password',
    autoLoadEntities: true,
    synchronize: true,
  },
  api: {
    key: process.env.API_KEY || 'api-key',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secretkey',
    expirationTime: process.env.JWT_EXPIRATION_TIME || '1d',
  },
  stripe: {
    secret_key: process.env.STRIPE_SECRET_KEY || 'stripe_secret_key',
    currency: process.env.STRIPE_CURRENCY || 'usd',
    country: process.env.STRIPE_COUNTRY || 'us',
    account_holder_type: process.env.STRIPE_ACCOUNT_HOLDER_TYPE || 'company',
    webhook_secret_key: {
      account: process.env.STRIPE_WEBHOOK_SECRET_KEY || 'stripe-webhook-secret-key',
      connect:
        process.env.STRIPE_EXTERNAL_WEBHOOK_SECRET_KEY || 'stripe-external-webhook-secret-key',
    }
  },
  twilio: {
    sid: process.env.TWILIO_SID || 'twilio_sid',
    authToken: process.env.TWILIO_AUTH_TOKEN || 'twilio_token',
    sidService: process.env.TWILIO_SID_SERVICE || 'twilio_sid_service',
    number: process.env.TWILIO_NUMBER || 'twilio_number',
  },
  aws: {
    bucketName: process.env.AWS_BUCKET_NAME || 'hold-deposit-logo',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'aws_access_key',
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY || 'aws_secret_access_key',
    region: process.env.AWS_REGION || 'us-east-1',
  },
  sendGrid: process.env.SENDGRID_KEY || 'sendGrid_key',
  nodeEnvironment: process.env.NODE_ENVIRONMENT || 'development',
});
