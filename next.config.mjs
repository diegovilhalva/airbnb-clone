/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{
        ignoreBuildErrors:true
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"avatars.githubusercontent.com",
                pathname:"**"
            },
            {
                protocol:"https",
                hostname:"lh3.googleusercontent.com",
                pathname:"**"
            },
            {
                protocol:"https",
                hostname:"res.cloudinary.com",
                pathname:"**"
            }
        ]
    }
};

export default nextConfig;
