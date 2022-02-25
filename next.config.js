module.exports = {
    serverRuntimeConfig: {
      // Will only be available on the server side
      secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        staticFolder: '/static',
        cloudinary: {
            upload_preset: 'upload_preset',
            api_key: 'api_key',
            cloud_name: 'cloud_name'
        },
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
  }