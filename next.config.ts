// next.config.mjs
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  sassOptions: 
  {
    includePaths: [
      path.join(__dirname, 'src/app/presentation/common_scss_abstracts'),
    ],
  },
  
};

export default nextConfig;