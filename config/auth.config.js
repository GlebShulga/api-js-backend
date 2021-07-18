module.exports = {
  secret: 'top-secret-key',
  app: 'Blank API for backend developer',
  port: 8087,
  jwt_ttl: 604800,
  log: {
    path: 'test_task_api.log',
    console: true,
    debug: true,
  },
  company_id: '12',
  contact_id: '16',
  uploads_dir: './uploads',
  images_dir: 'public/images/',
  thumb_size: 160,
};
